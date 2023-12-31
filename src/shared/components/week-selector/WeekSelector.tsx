import React, { useContext } from 'react';
import ChevronLeftIcon from '@/shared/components/ui/icons/ChevronLeftIcon';
import ChevronRightIcon from '@/shared/components/ui/icons/ChevronRightIcon';
import { DeviceContext } from '@/shared/contexts/DeviceContext';

interface WeekSelectorProps extends IComponent {
  value?: number | null;
  onChange: (value: number) => void;
  currentWeek: number;
}

const WeekSelector = React.forwardRef<HTMLDivElement, WeekSelectorProps>(
  ({ value, onChange, currentWeek, className }: WeekSelectorProps, ref) => {
    const device = useContext(DeviceContext);
    const isDesktop = device.type === 'desktop';

    const scrollWeek = (direction: number) => {
      let newWeek = (value || currentWeek) + direction;
      if (newWeek < 1) newWeek = 52;
      if (newWeek > 52) newWeek = 1;
      onChange(newWeek);
    };

    const selectWeek = (weekNumber: number) => {
      onChange(weekNumber);
    };

    const renderWeeks = () => {
      const weeks = [];
      for (
        let i = (value || currentWeek) - (isDesktop ? 3 : 2);
        i <= (value || currentWeek) + (isDesktop ? 3 : 2);
        i++
      ) {
        let weekNumber = i;
        if (weekNumber < 1) weekNumber += 52;
        if (weekNumber > 52) weekNumber -= 52;
        weeks.push(
          <div
            key={weekNumber}
            className={`w-18 mx-1 flex cursor-pointer flex-col items-center justify-center bg-white p-2 text-center text-xs hover:bg-gray-50 ${
              weekNumber === value ? 'h-14 border-x bg-gray-50 font-semibold text-gray-800' : 'rounded-lg'
            } ${weekNumber === currentWeek ? 'text-rose-500' : 'text-gray-400'}`}
            onClick={() => selectWeek(weekNumber)}
          >
            Week {weekNumber}
          </div>
        );
      }
      return weeks;
    };

    return (
      <div
        className={`${className} relative flex h-14 items-center justify-between overflow-hidden rounded-lg border-x border-t bg-white px-2 py-1`}
        ref={ref}
      >
        <button onClick={() => scrollWeek(-1)} type="button">
          <ChevronLeftIcon className="text-lg" />
        </button>
        <div className="flex items-center justify-center">{renderWeeks()}</div>
        <button onClick={() => scrollWeek(1)} className="text-lg" type="button">
          <ChevronRightIcon />
        </button>
      </div>
    );
  }
);

WeekSelector.displayName = 'WeekSelector';

export default WeekSelector;
