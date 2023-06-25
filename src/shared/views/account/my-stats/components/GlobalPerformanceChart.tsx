import { ResponsiveBar } from '@nivo/bar';
import getColorClasses from '@/shared/utils/get-color-classes';

interface ITooltipData {
  id: string;
  label: string;
  value: number;
  color: string;
}

const GlobalPerformanceChart = ({ globalPerformance }: IProps) => {
  const data = globalPerformance
    ?.filter(item => item.performance_percentage > 0)
    .sort((a, b) => b.performance_percentage - a.performance_percentage)
    .map(item => ({
      id: item.habit.id,
      label: item.habit.name,
      value: item.performance_percentage,
      color: getColorClasses(item.habit.color).hex400,
    }));

  const PerformanceTooltip = ({ data }: { data: ITooltipData }) => (
    <div className="rounded-lg border bg-white p-2 shadow-lg">
      <p className="text-xs text-gray-500">{data.label}</p>
      <p className="font-medium">{data.value}%</p>
    </div>
  );

  return (
    <>
      <h3 className="font-medium">Global performance</h3>
      <p className="text-xs text-gray-500">
        This is how you are performing this year. We take in account your perfromance from all previous weeks to the
        current week.
      </p>
      <div className="h-72 w-full">
        {data && (
          <ResponsiveBar
            data={data}
            margin={{ top: 32, right: 188, bottom: 24, left: 48 }}
            colors={d => d.data.color}
            labelTextColor={'#ffffff'}
            tooltip={PerformanceTooltip}
            valueFormat={value => `${Math.round(value)}%`}
            indexBy="label"
            axisLeft={null}
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
      <div className="mt-6 text-xs text-gray-400">
        <span className="font-semibold">Note:</span>{' '}
        {`Habits that don't have a recorded effort will be excluded from the
        calculation.`}
      </div>
    </>
  );
};

interface IProps {
  globalPerformance?: TTHGlobalPerformance[];
}

export default GlobalPerformanceChart;
