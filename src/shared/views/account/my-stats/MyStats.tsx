import { useQuery } from '@tanstack/react-query';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import EQueryKeys from '@/shared/queries/query-keys';
import fetchGlobalPerformance from '@/shared/queries/stats/fetch-global-performance';
import fetchRecentCompletion from '@/shared/queries/stats/fetch-recent-completion';
import getWeek from '@/shared/utils/get-week';

const MyStats = () => {
  const { data: globalPerformance } = useQuery([EQueryKeys.GlobalPerformance], fetchGlobalPerformance);
  const { data: recentCompletion } = useQuery(
    [EQueryKeys.RecentCompletion, getWeek(new Date())],
    fetchRecentCompletion
  );

  return (
    <div className="p-8">
      <PageTitle title="My statistics" subtitle="Here you can have an overview of your performance." className="mb-4" />
      <div className="flex">
        <div className="mr-2 w-full rounded-lg border bg-white p-4 shadow-sm">
          <h2 className="text-lg font-medium">Global performance</h2>
          <p className="text-sm text-gray-500">
            This is how are you performing this year. We take in account your perfromance in all weeks the current week.
          </p>
        </div>
        <div className="w-full rounded-lg border bg-white p-4 shadow-sm">
          <h2 className="text-lg font-medium">Recent completion</h2>
          <p className="text-sm text-gray-500">This is your completion from the past 2 weeks.</p>
        </div>
      </div>
    </div>
  );
};

export default MyStats;
