import { useContext } from 'react';
import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DeviceContext } from '@/shared/contexts/DeviceContext';
import getColorClasses from '@/shared/utils/get-color-classes';
import ChartTooltip from './ChartTooltip';

interface IProps {
  globalPerformance?: TTHGlobalPerformance[];
}

const GlobalPerformanceChart = ({ globalPerformance }: IProps) => {
  const device = useContext(DeviceContext);

  const desktopMargins = { top: 48, right: 140, bottom: 24, left: 96 };
  const mobileMargins = { top: 48, right: 32, bottom: 0, left: -24 };

  const data = globalPerformance
    ?.filter(item => item.performance_percentage > 0)
    .sort((a, b) => b.performance_percentage - a.performance_percentage)
    .map(item => ({
      id: item.habit.id,
      label: item.habit.name,
      value: item.performance_percentage,
      valueLabel: `${Math.round(item.performance_percentage)}%`,
      color: getColorClasses(item.habit.color).hex400,
    }));

  return (
    <>
      <h3 className="font-medium">Global performance</h3>
      <p className="text-xs text-gray-500">
        This is how you are performing this year. We take into account your performance from all previous weeks to the
        current week.
      </p>
      <div className="h-72">
        {data && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={device.type === 'desktop' ? desktopMargins : mobileMargins}
              barCategoryGap={2}
            >
              <XAxis dataKey="label" fontSize={10} />
              <YAxis fontSize={12} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: 'transparent' }} />
              <Bar dataKey="value">
                <LabelList dataKey="valueLabel" position="top" fontSize={12} />
                {data.map((entry, index) => {
                  return <Cell key={`cell-${index}`} fill={entry.color} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="mt-6 text-xs text-gray-400">
        <span className="font-semibold">Note:</span>{' '}
        {`Habits that don't have a recorded effort will be excluded from the
        calculation.`}
      </div>
    </>
  );
};

export default GlobalPerformanceChart;
