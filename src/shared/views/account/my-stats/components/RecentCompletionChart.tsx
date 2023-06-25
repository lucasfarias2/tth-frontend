import { ResponsiveBar } from '@nivo/bar';
import getColorClasses from '@/shared/utils/get-color-classes';

interface ITooltipData {
  difference: number;
  completion: number;
  week: number;
}

const RecentCompletionChart = ({ recentCompletion }: IProps) => {
  const data = recentCompletion?.map((item, i) => ({
    id: item.week,
    week: item.week,
    completion: item.completion_percentage,
    difference: item.difference,
    color: i === recentCompletion.length - 1 ? getColorClasses('rose').hex400 : getColorClasses('neutral').hex400,
  }));

  const RecentCompletionTooltip = ({ data: { difference, completion, week } }: { data: ITooltipData }) => {
    const isDifferencePositive = difference > 0;
    return (
      <div className="rounded-lg border bg-white p-2 shadow-lg">
        <p className="text-xs text-gray-500">Week {week}</p>
        <div className="flex items-center">
          <p className={`inline-block rounded-lg font-medium`}>{completion}%</p>
          {difference && (
            <p
              className={`${
                isDifferencePositive ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'
              } ml-1 inline-block rounded-lg p-1 text-[10px] font-medium`}
            >
              {isDifferencePositive ? '+' : ''}
              {difference}%
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <h3 className="font-medium">Past 4 weeks</h3>
      <p className="text-xs text-gray-500">This metric reflects your performance from the past four weeks.</p>
      <div className="h-72 w-full">
        {data && (
          <ResponsiveBar
            data={data}
            keys={['completion']}
            colors={d => d.data.color}
            margin={{ top: 48, right: 48, bottom: 24, left: 36 }}
            axisLeft={null}
            labelTextColor={'#ffffff'}
            valueFormat={value => `${Math.round(value)}%`}
            tooltip={RecentCompletionTooltip}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Week',
              legendPosition: 'middle',
              legendOffset: 32,
              format: value => `Week ${value}`,
            }}
          />
        )}
      </div>
    </div>
  );
};

interface IProps {
  recentCompletion?: TTHRecentCompletion[];
}

export default RecentCompletionChart;
