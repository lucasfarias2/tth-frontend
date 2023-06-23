import React, { useEffect, useState } from 'react';
import CircleIcon from '@/shared/components/ui/icons/CircleIcon';
import getColorClasses from '@/shared/utils/get-color-classes';

interface EffortLevelProps {
  maxLevel?: number;
  initialLevel?: number;
  onLevelChange?: (level: number) => void;
  readOnly?: boolean;
  color?: string;
}

const EffortLevel = React.forwardRef<HTMLDivElement, EffortLevelProps>(
  ({ maxLevel = 7, initialLevel = 1, onLevelChange, readOnly = false, color = 'neutral' }: EffortLevelProps, ref) => {
    const [selectedLevel, setSelectedLevel] = useState<number>(initialLevel);
    const [hoverLevel, setHoverLevel] = useState<number>(0);

    useEffect(() => {
      setSelectedLevel(initialLevel);
    }, [initialLevel]);

    const { textColor, fillColor } = getColorClasses(color);

    const levels = Array.from({ length: maxLevel }, (_, i) => i + 1);

    const handleMouseOver = (level: number) => {
      setHoverLevel(level);
    };

    const handleMouseOut = () => {
      setHoverLevel(0);
    };

    const handleClick = (level: number) => {
      setSelectedLevel(level);
      if (onLevelChange) {
        onLevelChange(level);
      }
    };

    return (
      <div className="flex" ref={ref}>
        {levels.map(level => {
          const isActive = level <= (hoverLevel || selectedLevel);
          return (
            <div
              key={level}
              className={`mr-[1px] cursor-pointer text-lg ${textColor} hover:opacity-70`}
              onMouseOver={!readOnly ? () => handleMouseOver(level) : undefined}
              onMouseOut={!readOnly ? handleMouseOut : undefined}
              onClick={() => handleClick(level)}
            >
              <CircleIcon className={isActive ? fillColor : textColor} />
            </div>
          );
        })}
      </div>
    );
  }
);

EffortLevel.displayName = 'EffortLevel';

export default EffortLevel;
