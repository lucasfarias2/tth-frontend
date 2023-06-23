import React, { useEffect, useState } from 'react';
import CircleIcon from '@/shared/components/ui/icons/CircleIcon';

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

function getColorClasses(color: string) {
  let textColor, fillColor;
  switch (color) {
    case 'red':
      textColor = 'text-red-500';
      fillColor = 'fill-red-500';
      break;
    case 'blue':
      textColor = 'text-blue-500';
      fillColor = 'fill-blue-500';
      break;
    case 'cyan':
      textColor = 'text-cyan-500';
      fillColor = 'fill-cyan-500';
      break;
    case 'yellow':
      textColor = 'text-yellow-500';
      fillColor = 'fill-yellow-500';
      break;
    case 'orange':
      textColor = 'text-orange-500';
      fillColor = 'fill-orange-500';
      break;
    case 'pink':
      textColor = 'text-pink-500';
      fillColor = 'fill-pink-500';
      break;
    case 'purple':
      textColor = 'text-purple-500';
      fillColor = 'fill-purple-500';
      break;
    case 'indigo':
      textColor = 'text-indigo-500';
      fillColor = 'fill-indigo-500';
      break;
    case 'green':
      textColor = 'text-green-500';
      fillColor = 'fill-green-500';
      break;
    case 'teal':
      textColor = 'text-teal-500';
      fillColor = 'fill-teal-500';
      break;
    case 'gray':
      textColor = 'text-gray-500';
      fillColor = 'fill-gray-500';
      break;
    case 'black':
      textColor = 'text-black';
      fillColor = 'fill-black';
      break;
    case 'emerald':
      textColor = 'text-emerald-500';
      fillColor = 'fill-emerald-500';
      break;
    case 'rose':
      textColor = 'text-rose-500';
      fillColor = 'fill-rose-500';
      break;
    case 'sky':
      textColor = 'text-sky-500';
      fillColor = 'fill-sky-500';
      break;
    case 'amber':
      textColor = 'text-amber-500';
      fillColor = 'fill-amber-500';
      break;
    default:
      textColor = 'text-gray-500';
      fillColor = 'fill-gray-500';
      break;
  }
  return { textColor, fillColor };
}

EffortLevel.displayName = 'EffortLevel';

export default EffortLevel;
