import React from 'react';
import 'tailwindcss/tailwind.css';

interface ProgressBarProps {
  currentValue?: number;
  expectedValue: number;
  color: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentValue, expectedValue, color }) => {
  const filledBarStyle = `h-6 bg-${color}-500 border-r-2 border-white`;
  const halfFilledBarStyle = `h-6 bg-${color}-100 border-r-2 border-white last:border-0`;

  let percentageCompleted = 0;
  if (currentValue !== undefined) {
    percentageCompleted = Math.round((currentValue / expectedValue) * 100);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex">
        <div className="w-64">
          <div className="h-6 w-full overflow-hidden rounded-md border-2 border-white bg-gray-50 shadow-sm">
            {[...Array(7)].map((_, idx) => (
              <div
                key={idx}
                style={{ width: '14.2857%' }} // equivalent to 1/7
                className={`
                            float-left 
                            ${
                              currentValue && idx < currentValue
                                ? filledBarStyle
                                : idx < expectedValue
                                ? halfFilledBarStyle
                                : ''
                            }
                        `}
              />
            ))}
          </div>
          <p className="text-[10px] uppercase italic text-gray-400">{percentageCompleted}% of your target.</p>
        </div>
        <p className="right-2 mt-[2px] ml-4 text-[20px] opacity-20">{`${currentValue || 0}/7`}</p>
      </div>
    </div>
  );
};

export default ProgressBar;
