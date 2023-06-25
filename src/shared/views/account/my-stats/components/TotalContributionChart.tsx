import { ResponsivePie } from '@nivo/pie';
import getColorClasses from '@/shared/utils/get-color-classes';

interface ITooltipData {
  label: string | number;
  value: number;
  id: string | number;
  color: string;
}

const TotalContributionChart = ({ globalPerformance }: IProps) => {
  const ContributionTooltip = ({ datum }: { datum: ITooltipData }) => (
    <div className="rounded-lg border bg-white p-2 shadow-lg">
      <p className="text-xs text-gray-500">{datum.label}</p>
      <p className="font-medium">{datum.value}%</p>
    </div>
  );

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
          <ResponsivePie
            data={data}
            margin={{ top: 48, right: 24, bottom: 24, left: 24 }}
            innerRadius={0.01}
            padAngle={1}
            cornerRadius={3}
            colors={d => d.data.color}
            tooltip={ContributionTooltip}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLinkLabelsThickness={2}
            arcLinkLabelsOffset={0}
            arcLinkLabelsStraightLength={24}
            arcLinkLabelsDiagonalLength={24}
            arcLinkLabelsTextOffset={8}
            arcLinkLabelsSkipAngle={12}
            arcLabelsTextColor={'#ffffff'}
            arcLinkLabel="label"
            valueFormat={value => (value > 6 ? `${Math.round(value)}%` : '')}
          />
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
