import { Link } from 'react-router-dom';
import EffortProgressBar from '@/shared/components/effort-progress-bar/EffortProgressBar';

const Habit = ({ id, name, starting_week, color, expected_effort, ending_week }: IProps) => {
  return (
    <Link
      to={`/account/habits/${id}`}
      className="mb-2 flex flex-col justify-between rounded-lg border bg-white py-2 px-4 text-sm shadow-sm hover:bg-gray-50 md:flex-row md:items-center"
    >
      <div className="flex items-center">
        <div
          className={`mr-4 flex h-6 w-6 items-center justify-center rounded-full md:h-7 md:w-7 bg-${color}-500 font-semibold uppercase text-white`}
        >
          {name[0]}
        </div>
        <div className="flex-1">
          <div className="mr-2 font-medium">{name}</div>
          <div className="text-xs text-gray-500">
            Starts: Week {starting_week}{' '}
            {ending_week && <span className="text-xs text-gray-500"> - Finishes: Week {ending_week}</span>}
          </div>
        </div>
      </div>

      <div className="mr-4 mt-4 flex items-center md:mt-0">
        <EffortProgressBar currentValue={expected_effort} expectedValue={expected_effort} color={color} readOnly />
        <span className="ml-4 text-xs text-gray-400">Weekly target: {expected_effort}</span>
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
  ending_week: number;
}

export default Habit;
