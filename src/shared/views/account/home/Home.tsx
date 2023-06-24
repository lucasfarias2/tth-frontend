import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import CalendarIcon from '@/shared/components/ui/icons/CalendarIcon';
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
  const { data: efforts } = useQuery([EQueryKeys.Efforts, week], fetchEffortsByWeek);

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
        currentWeek={currentWeek}
        value={week}
        onChange={value => {
          setWeek(value);
          queryClient.invalidateQueries([EQueryKeys.Efforts, value]);
        }}
      />

      <div className="mb-4  rounded-b-lg border bg-white p-4 shadow-sm">
        {currentWeek === week && (
          <div className="mb-2 flex items-center rounded-lg bg-gray-50 p-3 text-sm text-gray-500">
            <CalendarIcon className="mr-2 mb-[2px] text-lg" /> This is the ongoing week.
          </div>
        )}
        {habits &&
          habits?.map(habit => {
            return <HomeHabit key={habit.id} {...habit} efforts={efforts} week={week} />;
          })}
        <div className="mt-4 text-xs text-gray-400">
          <span className="font-semibold">Note:</span> Add how much have you done of each habit to track your weekly
          progress.
        </div>
      </div>
    </div>
  );
};

export default Home;
