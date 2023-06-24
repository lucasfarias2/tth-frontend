import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import WeekSelector from '@/shared/components/week-selector/WeekSelector';
import fetchHabits from '@/shared/queries/fetch-habits';
import fetchEffortsByWeek from '@/shared/queries/fetch-week-efforts';
import EQueryKeys from '@/shared/queries/query-keys';
import getWeek from '@/shared/utils/get-week';
import HomeHabit from './component/HomeHabit';

const Home = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData([EQueryKeys.User]) as TTHUser;
  const currentWeek = getWeek(new Date());
  const [week, setWeek] = useState(currentWeek);
  const { data: habits } = useQuery([EQueryKeys.Habits], fetchHabits);
  const { data: efforts } = useQuery([EQueryKeys.Efforts, currentWeek], fetchEffortsByWeek);

  return (
    <div className="max-w-2xl p-8">
      <div className="flex items-center justify-between">
        <PageTitle
          title={`Welcome, ${user.first_name?.split(' ')?.[0]}.`}
          subtitle="Here is an overview of your account."
          className="mb-4"
        />
      </div>

      <WeekSelector
        className="relative mb-[-4px] rounded-b-none"
        currentWeek={week}
        value={week}
        onChange={value => {
          setWeek(value);
          queryClient.invalidateQueries([EQueryKeys.Efforts, value]);
        }}
      />

      <div className="mb-4  rounded-b-lg border bg-white p-4 shadow-sm">
        <h2 className="text-xl font-medium">Week {week}</h2>
        <p className="mb-4 text-gray-500">{`Add your weekly efforts`}</p>
        {habits?.map(habit => {
          return <HomeHabit key={habit.id} {...habit} efforts={efforts} week={week} />;
        })}
      </div>
    </div>
  );
};

export default Home;
