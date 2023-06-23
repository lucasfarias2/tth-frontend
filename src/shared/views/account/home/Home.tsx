import { useQueryClient } from '@tanstack/react-query';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import WeekSelector from '@/shared/components/week-selector/WeekSelector';
import EQueryKeys from '@/shared/queries/query-keys';
import getWeek from '@/shared/utils/get-week';

const Home = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData([EQueryKeys.User]) as TTHUser;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <PageTitle
          title={`Welcome, ${user.first_name?.split(' ')?.[0]}.`}
          subtitle="Here is an overview of your account."
          className="mb-4"
        />
      </div>

      <div className="mb-4 max-w-2xl rounded-lg border bg-white p-4 shadow-sm">
        <h2 className="text-xl font-medium">{`Week ${getWeek(new Date())}`}</h2>
        <p className="mb-4 text-gray-500">{`This week's efforts`}</p>
        <WeekSelector currentWeek={getWeek(new Date())} onChange={() => {}} value={1} />
      </div>
    </div>
  );
};

export default Home;
