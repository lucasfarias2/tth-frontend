import { useQuery, useQueryClient } from '@tanstack/react-query';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import fetchHabits from '@/shared/queries/fetch-habits';
import fetchEffortsByWeek from '@/shared/queries/fetch-week-efforts';
import EQueryKeys from '@/shared/queries/query-keys';
import getWeek from '@/shared/utils/get-week';
import EditableHabit from './component/EditableHabit';

const Home = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData([EQueryKeys.User]) as TTHUser;
  const currentWeek = getWeek(new Date());
  const { data: habits } = useQuery([EQueryKeys.Habits], fetchHabits);
  const { data: efforts } = useQuery([EQueryKeys.Efforts, currentWeek], fetchEffortsByWeek);

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
        <h2 className="text-xl font-medium">Week {currentWeek}</h2>
        <p className="mb-4 text-gray-500">{`Add this week's efforts`}</p>
        {habits?.map(habit => {
          return <EditableHabit key={habit.id} {...habit} efforts={efforts} />;
        })}
      </div>
    </div>
  );
};

export default Home;
