import React, { useState } from 'react';
import getColorClasses from '@/shared/utils/get-color-classes';
import AddIcon from '../ui/icons/AddIcon';
import MinusIcon from '../ui/icons/MinusIcon';

interface IProps {
  minimumValue?: number;
  currentValue?: number;
  expectedValue: number;
  color: string;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  showTarget?: boolean;
}

const EffortProgressBar = ({
  minimumValue = 0,
  currentValue = 0,
  expectedValue,
  color,
  onChange,
  readOnly,
  showTarget = false,
}: IProps) => {
  const { bgColor } = getColorClasses(color);
  const filledBarStyle = `h-5 ${bgColor} border-r-2 border-white ${readOnly ? 'last:border-r-0' : ''}`;
  const halfFilledBarStyle = `h-5 bg-${color}-100 border-r-2 border-white ${readOnly ? 'last:border-r-0' : ''}`;
  const emptyBarStyle = `h-5 bg-gray-50 border-r-2 border-white ${readOnly ? 'last:border-r-0' : ''}`;

  const [hoverValue, setHoverValue] = useState<number | null>(null);

  let percentageCompleted = 0;
  let extraCompleted = 0;
  if (currentValue !== undefined) {
    percentageCompleted = Math.round((currentValue / expectedValue) * 100);
    extraCompleted = Math.round(percentageCompleted - 100);
  }

  const handleClick = (value: number) => {
    if (onChange) {
      onChange(value);
    }
  };

  const incrementValue = () => {
    if (currentValue < 7 && onChange) {
      onChange(currentValue + 1);
    }
  };

  const decrementValue = () => {
    if (currentValue > minimumValue && onChange) {
      onChange(currentValue - 1);
    }
  };

  return (
    <div className="flex items-center">
      <div className="flex overflow-hidden rounded-lg border-4 border-white shadow">
        {!readOnly && (
          <button
            type="button"
            className="flex h-5 items-center rounded-l-lg bg-white px-2 text-[10px] text-gray-500 hover:bg-gray-50"
            onClick={decrementValue}
          >
            <MinusIcon className="text-xs" />
          </button>
        )}
        <div className="w-36">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              style={{ width: '14.2857%' }} // equivalent to 1/7
              className={`
                float-left 
                cursor-pointer
                transition-all duration-200 ease-in-out
                  ${
                    (currentValue && i < currentValue) || (hoverValue !== null && i < hoverValue)
                      ? filledBarStyle
                      : i < expectedValue
                      ? halfFilledBarStyle
                      : emptyBarStyle
                  }
                `}
              onMouseOver={!readOnly ? () => setHoverValue(i + 1) : undefined}
              onMouseOut={!readOnly ? () => setHoverValue(null) : undefined}
              onClick={() => handleClick(i + 1)}
            />
          ))}
        </div>
        {!readOnly && (
          <button
            type="button"
            className="flex h-5 items-center rounded-r-lg bg-white px-2 text-[10px] text-gray-500 hover:bg-gray-50"
            onClick={incrementValue}
          >
            <AddIcon className="text-xs" />
          </button>
        )}
      </div>

      {!readOnly &&
        (showTarget ? (
          <div className="flex w-36 flex-col items-center px-3 text-center leading-tight">
            <p className="mr-2 text-lg text-gray-500">{`${currentValue || 0}/7`}</p>
            {percentageCompleted > 99 ? (
              <p className="text-[10px] text-green-400">
                Weekly effort completed! {extraCompleted > 0 && `+${extraCompleted}%`}
              </p>
            ) : (
              <p className="text-[10px] text-gray-400">{percentageCompleted}% of weekly target</p>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center px-4 text-center leading-tight">
            <p className="mr-2 text-lg text-gray-500">{currentValue}</p>
          </div>
        ))}
    </div>
  );
};

export default EffortProgressBar;
