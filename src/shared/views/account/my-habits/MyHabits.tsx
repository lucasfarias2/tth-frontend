import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import AddPackageIcon from '@/shared/components/ui/icons/AddPackageIcon';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import fetchHabits from '@/shared/queries/fetch-habits';
import EQueryKeys from '@/shared/queries/query-keys';
import HabitsTable from './components/HabitsTable';

const MyHabits = () => {
  const { data: habits } = useQuery([EQueryKeys.Habits], fetchHabits);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <PageTitle title="My habits" subtitle="Here you can manage your habits." className="mb-4" />
        <Link
          className="mr-2 flex items-center rounded-lg border bg-white py-2 px-3 text-sm font-medium text-rose-600 shadow-sm hover:bg-gray-50"
          to="/account/habits/add"
        >
          <AddPackageIcon className="mr-2 flex items-center text-2xl" /> Add new habit
        </Link>
      </div>

      <HabitsTable habits={habits} />
    </div>
  );
};

export default MyHabits;
