import { useQuery, useQueryClient } from '@tanstack/react-query';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import EQueryKeys from '@/shared/queries/query-keys';
import fetchGlobalPerformance from '@/shared/queries/stats/fetch-global-performance';
import fetchRecentCompletion from '@/shared/queries/stats/fetch-recent-completion';
import GlobalPerformanceChart from './components/GlobalPerformanceChart';
import RecentCompletionChart from './components/RecentCompletionChart';
import TotalContributionChart from './components/TotalContributionChart';

const MyStats = () => {
  const queryClient = useQueryClient();
  const { data: globalPerformance } = useQuery([EQueryKeys.GlobalPerformance], fetchGlobalPerformance);
  const siteConfig = queryClient.getQueryData([EQueryKeys.SiteConfig]) as TTHSiteConfig;
  const { data: recentCompletion } = useQuery(
    [EQueryKeys.RecentCompletion, siteConfig?.current_week],
    fetchRecentCompletion
  );

  return (
    <div className="p-6">
      <PageTitle title="My statistics" subtitle="Here you can have an overview of your performance." className="mb-4" />

      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <GlobalPerformanceChart globalPerformance={globalPerformance} />

        <div className="mt-4 flex flex-col border-t py-4 md:flex-row">
          <TotalContributionChart globalPerformance={globalPerformance} />
          <RecentCompletionChart recentCompletion={recentCompletion} />
        </div>
      </div>
    </div>
  );
};

export default MyStats;
