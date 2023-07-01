import { Link } from 'react-router-dom';
import EffortProgressBar from '@/shared/components/effort-progress-bar/EffortProgressBar';

const Habit = ({ id, name, starting_week, color, expected_effort }: IProps) => {
  return (
    <Link
      to={`/account/habits/${id}`}
      className="mb-2 flex flex-col justify-between rounded-lg border bg-white py-2 px-4 text-sm shadow-sm hover:bg-gray-50 md:flex-row md:items-center"
    >
      <div className="flex items-center">
        <div
          className={`mr-4 flex h-6 w-6 items-center justify-center rounded-full md:h-8 md:w-8 bg-${color}-500 font-semibold uppercase text-white`}
        >
          {name[0]}
        </div>
        <div className="flex-1">
          <div className="mr-2 font-medium">{name}</div>
          <div className="text-xs text-gray-500">Started on week {starting_week}</div>
        </div>
      </div>

      <div className="mr-4 mt-4 flex items-center md:mt-0 md:flex-col">
        <span className="mr-2 text-xs text-gray-400 md:mb-1">Weekly target: {expected_effort}</span>
        <EffortProgressBar currentValue={expected_effort} expectedValue={expected_effort} color={color} readOnly />
      </div>
    </Link>
  );
};

interface IProps extends IComponent {
  id: string;
  name: string;
  starting_week: number;
  color: string;
  expected_effort: number;
}

export default Habit;
