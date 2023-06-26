const ChartTooltip = ({ payload }: IProps) => {
  const data = payload?.[0]?.payload;

  return (
    <div className="rounded-lg border bg-white p-2 shadow-lg">
      <p className="text-xs text-gray-500">{data?.label}</p>
      <p className="font-medium">{data?.value}%</p>
    </div>
  );
};

interface ITooltipData {
  id: string;
  label: string;
  value: number;
  color: string;
}

interface IProps {
  payload?: { payload: ITooltipData }[];
}

export default ChartTooltip;
