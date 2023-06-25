import { Link } from 'react-router-dom';
import EffortProgressBar from '@/shared/components/effort-progress-bar/EffortProgressBar';

const Habit = ({ id, name, starting_week, color, expected_effort }: IProps) => {
  return (
    <Link
      to={`/account/habits/${id}`}
      className="mb-2 flex items-center justify-between rounded-lg border bg-white py-2 px-4 text-sm shadow-sm hover:bg-gray-50"
    >
      <div
        className={`mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-${color}-500 font-semibold uppercase text-white`}
      >
        {name[0]}
      </div>
      <div className="flex-1">
        <div className="mr-2 font-medium">{name}</div>
        <div className="text-xs text-gray-500">Started on week {starting_week}</div>
      </div>

      <div className="mr-4 flex flex-col">
        <EffortProgressBar currentValue={expected_effort} expectedValue={expected_effort} color={color} readOnly />
        <span className="mr-2 mt-1 text-xs text-gray-400">Weekly target: {expected_effort}</span>
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
