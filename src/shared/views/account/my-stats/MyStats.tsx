import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { useQuery } from '@tanstack/react-query';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import EQueryKeys from '@/shared/queries/query-keys';
import fetchGlobalPerformance from '@/shared/queries/stats/fetch-global-performance';
import fetchRecentCompletion from '@/shared/queries/stats/fetch-recent-completion';
import getColorClasses from '@/shared/utils/get-color-classes';
import getWeek from '@/shared/utils/get-week';

const MyStats = () => {
  const { data: globalPerformance } = useQuery([EQueryKeys.GlobalPerformance], fetchGlobalPerformance);
  const { data: recentCompletion } = useQuery(
    [EQueryKeys.RecentCompletion, getWeek(new Date())],
    fetchRecentCompletion
  );

  // prepare data for the pie charts
  const performanceData = globalPerformance?.map(item => ({
    id: item.habit.id,
    label: item.habit.name,
    value: item.performance_percentage,
    color: getColorClasses(item.habit.color).hex400,
  }));

  const contributionData = globalPerformance?.map(item => ({
    id: item.habit.id,
    label: item.habit.name,
    value: item.contribution_percentage,
    color: getColorClasses(item.habit.color).hex400,
  }));

  const recentCompletionData = recentCompletion?.map(item => ({
    id: item.week,
    week: item.week,
    completion: Math.round(item.completion_percentage),
    difference: Math.round(item.difference),
  }));

  const ContributionTooltip = ({ datum }) => (
    <div className="rounded-lg border bg-white p-2 shadow-lg">
      <p className="text-sm font-medium">{datum.label}</p>
      <p>{datum.value}%</p>
    </div>
  );

  const PerformanceTooltip = ({ data }) => (
    <div className="rounded-lg border bg-white p-2 shadow-lg">
      <p className="text-sm font-medium">{data.label}</p>
      <p>{data.value}%</p>
    </div>
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

          <div className="mt-4 border-t">
            <h3 className="mt-4">Total contribution</h3>
            <p className="text-xs text-gray-500">
              This metric reflects how much of total effort are you were dedicating to each habit.
            </p>
            <div className="h-64 w-full">
              {contributionData && (
                <ResponsivePie
                  data={contributionData}
                  margin={{ top: 48, right: 24, bottom: 24, left: 24 }}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={3}
                  colors={d => d.data.color}
                  tooltip={ContributionTooltip}
                  arcLinkLabel="label"
                  arcLinkLabelsColor={{ from: 'color' }}
                  arcLinkLabelsThickness={2}
                  arcLabelsTextColor={'#ffffff'}
                  valueFormat={value => `${value}%`}
                />
              )}
            </div>
          </div>

          <div className="mt-4 border-t">
            <h3 className="mt-4">Performance</h3>
            <p className="text-xs text-gray-500">This metric reflects how performant you where with your habits.</p>
            <div className="h-64 w-full">
              {performanceData && (
                <ResponsiveBar
                  data={performanceData}
                  margin={{ top: 48, right: 72, bottom: 24, left: 96 }}
                  colors={d => d.data.color}
                  labelTextColor={'#ffffff'}
                  tooltip={PerformanceTooltip}
                  valueFormat={value => `${value}%`}
                  indexBy="label"
                  legends={[
                    {
                      dataFrom: 'indexes',
                      anchor: 'bottom-right',
                      direction: 'column',
                      justify: false,
                      translateX: 120,
                      translateY: 0,
                      itemsSpacing: 2,
                      itemWidth: 100,
                      itemHeight: 20,
                      itemDirection: 'left-to-right',
                      itemOpacity: 0.85,
                      symbolSize: 20,
                    },
                  ]}
                />
              )}
            </div>
          </div>
        </div>
        <div className="w-full rounded-lg border bg-white p-4 shadow-sm">
          <h2 className="text-lg font-medium">Recent completion</h2>
          <p className="text-sm text-gray-500">This is your completion from the past 2 weeks.</p>

          <div className="mt-4 border-t">
            <h3 className="mt-4">Past 2 weeks</h3>
            <p className="text-xs text-gray-500">This metric reflects how performant you were in the last two weeks.</p>
            <div className="h-64 w-full">
              {recentCompletionData && (
                <ResponsiveBar
                  data={recentCompletionData}
                  keys={['completion']}
                  margin={{ top: 48, right: 72, bottom: 24, left: 96 }}
                  labelTextColor={'#ffffff'}
                  indexBy="week"
                  valueFormat={value => `${value}%`}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyStats;
