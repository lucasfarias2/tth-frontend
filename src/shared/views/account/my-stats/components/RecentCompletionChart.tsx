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
    color: i === 2 ? getColorClasses('rose').hex400 : getColorClasses('neutral').hex400,
  }));

  const RecentCompletionTooltip = ({ data: { difference, completion, week } }: { data: ITooltipData }) => {
    const isDifferencePositive = difference > 0;
    return (
      <div className="rounded-lg border bg-white p-2 shadow-lg">
        <p className="text-xs text-gray-500">Week {week}</p>
        <p className={`inline-block rounded-lg font-medium`}>{completion}%</p>
        {difference && (
          <p
            className={`${
              isDifferencePositive ? 'text-green-500' : 'text-red-500'
            } inline-block rounded-lg p-1 text-xs font-medium`}
          >
            {`(`}
            {isDifferencePositive ? '+' : ''}
            {difference}%{`)`}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      <h3 className="font-medium">Past 2 weeks</h3>
      <p className="text-xs text-gray-500">This metric reflects how performant you were in the last two weeks.</p>
      <div className="h-72 w-full">
        {data && (
          <ResponsiveBar
            data={data}
            keys={['completion']}
            colors={d => d.data.color}
            margin={{ top: 48, right: 96, bottom: 24, left: 96 }}
            axisLeft={null}
            labelTextColor={'#ffffff'}
            valueFormat={value => `${value}%`}
            tooltip={RecentCompletionTooltip}
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
