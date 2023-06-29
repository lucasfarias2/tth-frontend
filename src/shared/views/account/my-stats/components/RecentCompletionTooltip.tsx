const RecentCompletionTooltip = ({ payload }: IProps) => {
  const data = payload?.[0]?.payload;

  const isDifferencePositive = data && data.difference > 0;

  return (
    <div className="rounded-lg border bg-white p-2 shadow-lg">
      <p className="text-xs text-gray-500">Week {data?.week}</p>
      <div className="flex items-center">
        <p className={`inline-block rounded-lg font-medium`}>{data?.completion}%</p>
        {data?.difference ? (
          <p
            className={`${
              isDifferencePositive ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'
            } ml-1 inline-block rounded-lg p-1 text-[10px] font-medium`}
          >
            {isDifferencePositive ? '+' : ''}
            {data?.difference}%
          </p>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

interface ITooltipData {
  id: string;
  week: number;
  difference: number;
  completion: number;
}

interface IProps {
  payload?: { payload: ITooltipData }[];
}

export default RecentCompletionTooltip;
