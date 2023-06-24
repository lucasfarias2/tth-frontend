import ProgressBar from '@/shared/components/progress-bar/ProgressBar';

const AssignableHabit = ({ id, name, color, expected_effort, efforts }: IProps) => {
  const habitEffort = efforts?.find(effort => effort.habit.id === id);

  return (
    <div className={`mb-2 flex items-center justify-between rounded-lg p-2 text-sm hover:bg-gray-50`}>
      <div
        className={`mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-${color}-500 font-semibold uppercase text-white`}
      >
        {name[0]}
      </div>
      <div className="flex-1">
        <div className="mr-2 font-medium">{name}</div>
      </div>

      <ProgressBar currentValue={habitEffort?.level} expectedValue={expected_effort} color={color} showTarget />

      {/* <div className="mr-4 flex items-center justify-center">
    <EffortLevel readOnly maxLevel={habit.expected_effort} color={habit.color} />
  </div> */}
    </div>
  );
};

interface IProps extends IComponent {
  id: string;
  name: string;
  color: string;
  expected_effort: number;
  efforts?: TTHEffort[];
}

export default AssignableHabit;
