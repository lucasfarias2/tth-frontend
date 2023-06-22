import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import AddIcon from '@/shared/components/ui/icons/AddIcon';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import fetchHabits from '@/shared/queries/fetch-habits';
import EQueryKeys from '@/shared/queries/query-keys';
import Habit from './components/Habit';

const MyHabits = () => {
  const { data: habits } = useQuery([EQueryKeys.Habits], fetchHabits);
  return (
    <div className="p-8">
      <div className="flex max-w-2xl items-center justify-between">
        <PageTitle title="My habits" subtitle="Here you can manage your habits." className="mb-4" />
        <Link
          to="/account/habits/add"
          className="flex cursor-pointer items-center rounded-lg border bg-white py-2 px-3 text-sm font-medium text-rose-600 shadow-sm hover:bg-gray-50"
        >
          <AddIcon className="mr-1" />
          Add new habit
        </Link>
      </div>

      <div className="mb-4 max-w-2xl flex-1">
        {habits?.map(habit => {
          return <Habit key={habit.id} {...habit} />;
        })}
      </div>
    </div>
  );
};

export default MyHabits;
