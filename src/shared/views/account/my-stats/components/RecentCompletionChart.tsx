import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import getColorClasses from '@/shared/utils/get-color-classes';
import RecentCompletionTooltip from './RecentCompletionTooltip';

const RecentCompletionChart = ({ recentCompletion = [] }: IProps) => {
  const data = recentCompletion?.map((item, i) => ({
    id: item.week,
    week: item.week,
    weekLabel: `Week ${item.week}`,
    completion: Math.round(item.completion_percentage),
    completionLabel: `${Math.round(item.completion_percentage)}%`,
    difference: item.difference,
    color: i === recentCompletion.length - 1 ? getColorClasses('rose').hex400 : getColorClasses('neutral').hex400,
  }));

  return (
    <div className="mt-4 w-full border-t pt-4 md:mt-0 md:border-none md:pt-0">
      <h3 className="font-medium">Past 4 weeks</h3>
      <p className="text-xs text-gray-500">This metric reflects your performance from the past four weeks.</p>
      <div className="h-72 w-full">
        {data && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 48, right: 48, left: 48 }} barCategoryGap={4}>
              <XAxis dataKey="weekLabel" fontSize={12} />
              <Tooltip content={<RecentCompletionTooltip />} cursor={{ fill: 'transparent' }} />
              <Bar dataKey="completion">
                <LabelList dataKey="completionLabel" position="top" fontSize={12} />
                {data.map((entry, index) => {
                  return <Cell key={`cell-${index}`} fill={entry.color} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

interface IProps {
  recentCompletion?: TTHRecentCompletion[];
}

export default RecentCompletionChart;
