import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import AddPackageIcon from '@/shared/components/ui/icons/AddPackageIcon';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import fetchGoals from '@/shared/queries/fetch-goals';
import EQueryKeys from '@/shared/queries/query-keys';
import GoalsTable from './components/GoalsTable';

const MyGoals = () => {
  const { data: goals } = useQuery([EQueryKeys.Goals], fetchGoals);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <PageTitle title="My goals" subtitle="Here you can manage your goals." className="mb-4" />
        <Link
          className="mr-2 flex items-center rounded-lg border bg-white py-2 px-3 text-sm font-medium text-rose-600 shadow-sm hover:bg-gray-50"
          to="/account/goals/add"
        >
          <AddPackageIcon className="mr-2 flex items-center text-2xl" /> Add new goal
        </Link>
      </div>

      <GoalsTable goals={goals} />
    </div>
  );
};

export default MyGoals;
