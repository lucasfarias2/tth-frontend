import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import CalendarIcon from '@/shared/components/ui/icons/CalendarIcon';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import WeekProgressBar from '@/shared/components/week-progress-bar/WeekProgressBar';
import WeekSelector from '@/shared/components/week-selector/WeekSelector';
import fetchHabits from '@/shared/queries/fetch-habits';
import fetchEffortsByWeek from '@/shared/queries/fetch-week-efforts';
import EQueryKeys from '@/shared/queries/query-keys';
import fetchWeekCompletion from '@/shared/queries/stats/fetch-week-completion';
import HomeHabit from './component/HomeHabit';

const Home = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData([EQueryKeys.User]) as TTHUser;
  const siteConfig = queryClient.getQueryData([EQueryKeys.SiteConfig]) as TTHSiteConfig;
  const [week, setWeek] = useState(siteConfig.current_week);
  const { data: habits } = useQuery([EQueryKeys.Habits, week], fetchHabits);
  const { data: efforts } = useQuery([EQueryKeys.Efforts, week], fetchEffortsByWeek);
  const { data: weekCompletion } = useQuery([EQueryKeys.WeekCompletion, week], fetchWeekCompletion);

  return (
    <div className="max-w-2xl p-6">
      <div className="flex items-center justify-between">
        <PageTitle
          title={`Welcome, ${user?.first_name?.split(' ')?.[0]}.`}
          subtitle="Here is an overview of your account."
          className="mb-4"
        />
      </div>

      <WeekSelector
        className="relative rounded-b-none"
        currentWeek={siteConfig?.current_week}
        value={week}
        onChange={value => {
          setWeek(value);
          queryClient.invalidateQueries([EQueryKeys.Efforts, value]);
          queryClient.invalidateQueries([EQueryKeys.WeekCompletion, value]);
        }}
      />

      <div className="rounded-b-lg border bg-white shadow-sm">
        {habits && habits.length > 0 && weekCompletion && (
          <WeekProgressBar progress={weekCompletion?.completion_percentage} />
        )}

        <div className="px-4 pb-4">
          {siteConfig?.current_week === week && (
            <div className="mt-4 flex items-center rounded-lg bg-gray-50 p-3 text-sm text-gray-500">
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
    </div>
  );
};

export default Home;
