import { FC } from 'react';

interface IProps {
  checked: boolean;
  onToggle: () => void;
}

const Toggle: FC<IProps> = ({ checked, onToggle }) => {
  return (
    <button
      type="button"
      className={`relative h-7 w-[60px] cursor-pointer appearance-none rounded-full shadow-inner outline-none transition-colors duration-300 ease-in-out ${
        checked ? 'bg-rose-500' : 'bg-gray-300'
      }`}
      onClick={onToggle}
      aria-pressed={checked}
    >
      <span
        className={`absolute top-0 mt-1 block h-[20px] w-[20px] transform rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out`}
        style={{
          transform: checked ? 'translateX(calc(180%))' : 'translateX(24%)',
        }}
      />
    </button>
  );
};

export default Toggle;
