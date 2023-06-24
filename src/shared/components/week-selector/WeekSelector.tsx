import React from 'react';
import ChevronLeftIcon from '../ui/icons/ChevronLeftIcon';
import ChevronRightIcon from '../ui/icons/ChevronRightIcon';

interface WeekSelectorProps extends IComponent {
  value: number;
  onChange: (value: number) => void;
  currentWeek: number;
}

const WeekSelector = React.forwardRef<HTMLDivElement, WeekSelectorProps>(
  ({ value, onChange, currentWeek, className }: WeekSelectorProps, ref) => {
    const scrollWeek = (direction: number) => {
      let newWeek = value + direction;
      if (newWeek < 1) newWeek = 52;
      if (newWeek > 52) newWeek = 1;
      onChange(newWeek);
    };

    const selectWeek = (weekNumber: number) => {
      onChange(weekNumber);
    };

    const renderWeeks = () => {
      const weeks = [];
      for (let i = value - 3; i <= value + 3; i++) {
        let weekNumber = i;
        if (weekNumber < 1) weekNumber += 52;
        if (weekNumber > 52) weekNumber -= 52;
        weeks.push(
          <div
            key={weekNumber}
            className={`mx-1 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-white p-2 text-center text-sm hover:bg-gray-50 ${
              weekNumber === value ? 'h-16 border font-semibold text-gray-800 shadow-sm' : 'text-xs'
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
        className={`${className} flex h-14 items-center justify-between rounded-lg border bg-white px-2 py-1 shadow-sm`}
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
