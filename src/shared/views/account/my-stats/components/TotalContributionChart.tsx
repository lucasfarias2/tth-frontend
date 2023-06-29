import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import getColorClasses from '@/shared/utils/get-color-classes';
import ChartTooltip from './ChartTooltip';

const TotalContributionChart = ({ globalPerformance }: IProps) => {
  const data = globalPerformance
    ?.filter(item => item.contribution_percentage > 0)
    .map(item => {
      return {
        id: item.habit.id,
        label: item.habit.name,
        value: item.contribution_percentage,
        color: getColorClasses(item.habit.color).hex400,
      };
    });

  return (
    <div className="mr-4 w-full border-r">
      <h3 className="font-medium">Total contribution</h3>
      <p className="text-xs text-gray-500">
        This metric reflects how much of total effort are you dedicating to each habit.
      </p>
      <div className="h-72 w-full">
        {data && (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Tooltip content={<ChartTooltip />} />
              <Pie data={data} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="mt-6 text-xs text-gray-400">
        <span className="font-semibold">Note:</span>{' '}
        {`Habits that don't have a recorded effort will be excluded from the
        calculation.`}
      </div>
    </div>
  );
};

interface IProps {
  globalPerformance?: TTHGlobalPerformance[];
}

export default TotalContributionChart;
