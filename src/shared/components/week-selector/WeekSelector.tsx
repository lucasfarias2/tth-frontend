import React, { useState } from 'react';

// Define getWeek as a standalone function
const getWeek = (date: Date) => {
  const onejan = new Date(date.getFullYear(), 0, 1);
  const millisecsInDay = 86400000;
  return Math.ceil(((date.getTime() - onejan.getTime()) / millisecsInDay + onejan.getDay() + 1) / 7);
};

const WeekSelector = () => {
  const [currentWeek, setCurrentWeek] = useState(getWeek(new Date()));

  const scrollWeek = (direction: number) => {
    setCurrentWeek((prevWeek: number) => {
      let newWeek = prevWeek + direction;
      if (newWeek < 1) newWeek = 52;
      if (newWeek > 52) newWeek = 1;
      return newWeek;
    });
  };

  const selectWeek = (weekNumber: number) => {
    setCurrentWeek(weekNumber);
  };

  const renderWeeks = () => {
    const weeks = [];
    for (let i = currentWeek - 3; i <= currentWeek + 3; i++) {
      let weekNumber = i;
      if (weekNumber < 1) weekNumber += 52;
      if (weekNumber > 52) weekNumber -= 52;
      weeks.push(
        <div
          key={weekNumber}
          className={`mx-1 cursor-pointer rounded-md px-1 py-2 text-center text-sm last:border-r-0 hover:bg-gray-50 ${
            weekNumber === currentWeek ? 'border font-semibold' : 'text-gray-400'
          }`}
          onClick={() => selectWeek(weekNumber)}
        >
          Week {weekNumber}
        </div>
      );
    }
    return weeks;
  };

  return (
    <div className="flex items-center justify-center rounded-md border px-2 py-1 shadow-sm">
      <button onClick={() => scrollWeek(-1)} className="px-2">
        {'<'}
      </button>
      <div className="flex items-center justify-center">{renderWeeks()}</div>
      <button onClick={() => scrollWeek(1)} className="px-2">
        {'>'}
      </button>
    </div>
  );
};

export default WeekSelector;
