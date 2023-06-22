import React from 'react';
import ChevronLeftIcon from '../ui/icons/ChevronLeftIcon';
import ChevronRightIcon from '../ui/icons/ChevronRightIcon';

interface WeekSelectorProps {
  value: number;
  onChange: (value: number) => void;
  currentWeek: number;
}

const WeekSelector = React.forwardRef<HTMLDivElement, WeekSelectorProps>(
  ({ value, onChange, currentWeek }: WeekSelectorProps, ref) => {
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
      for (let i = value - 2; i <= value + 2; i++) {
        let weekNumber = i;
        if (weekNumber < 1) weekNumber += 52;
        if (weekNumber > 52) weekNumber -= 52;
        weeks.push(
          <div
            key={weekNumber}
            className={`mx-1 cursor-pointer rounded-md px-1 py-2 text-center text-sm last:border-r-0 hover:bg-gray-50 ${
              weekNumber === value ? 'border font-semibold' : 'text-gray-400'
            }`}
            onClick={() => selectWeek(weekNumber)}
          >
            Week {weekNumber}{' '}
            {currentWeek === weekNumber && (
              <span className="rounded-full bg-gray-100 px-2 py-1 text-[10px] font-normal uppercase text-gray-500">{`Current`}</span>
            )}
          </div>
        );
      }
      return weeks;
    };

    return (
      <div className="flex items-center justify-center rounded-md border px-2 py-1 shadow-sm" ref={ref}>
        <button onClick={() => scrollWeek(-1)}>
          <ChevronLeftIcon className="text-lg" />
        </button>
        <div className="flex items-center justify-center">{renderWeeks()}</div>
        <button onClick={() => scrollWeek(1)} className="text-lg">
          <ChevronRightIcon />
        </button>
      </div>
    );
  }
);

WeekSelector.displayName = 'WeekSelector';

export default React.memo(WeekSelector);
