import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import EffortProgressBar from '@/shared/components/effort-progress-bar/EffortProgressBar';
import { useToast } from '@/shared/components/toast/ToastContext';
import createEffort from '@/shared/queries/create-effort';
import editEffort from '@/shared/queries/edit-effort';
import EQueryKeys from '@/shared/queries/query-keys';

interface IFormData {
  level: number;
}

interface IProps extends IComponent {
  id: string;
  name: string;
  color: string;
  expected_effort: number;
  week: number;
  efforts?: TTHEffort[];
}

const HomeHabit = ({ id, name, color, expected_effort, efforts, week }: IProps) => {
  const habitEffort = efforts?.find(effort => effort.habit.id === id);
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { handleSubmit, control, reset } = useForm<IFormData>({
    defaultValues: { level: habitEffort?.level || 0 },
  });

  useEffect(() => {
    reset({ level: habitEffort?.level || 0 });
  }, [habitEffort, reset]);

  const createEffortMutation = useMutation(createEffort, {
    onSuccess: () => {
      showToast('Effort updated successfully', 'success');
      queryClient.invalidateQueries([EQueryKeys.Efforts]);
      queryClient.invalidateQueries([EQueryKeys.WeekCompletion, week]);
    },
    onError: () => {
      showToast(
        'Error while creating new habit',
        'error',
        'There has been an error while creating habit, please try again later.'
      );
    },
  });

  const editEffortMutation = useMutation(editEffort, {
    onSuccess: () => {
      showToast('Effort updated successfully', 'success');
      queryClient.invalidateQueries([EQueryKeys.Efforts]);
      queryClient.invalidateQueries([EQueryKeys.WeekCompletion, week]);
    },
    onError: () => {
      showToast(
        'Error while creating new habit',
        'error',
        'There has been an error while creating habit, please try again later.'
      );
    },
  });

  const onSubmit = async (data: IFormData) => {
    if (habitEffort) {
      editEffortMutation.mutate({
        id: habitEffort.id,
        habit: Number(id),
        week,
        level: data.level,
      });
    } else {
      createEffortMutation.mutate({
        habit: Number(id),
        week,
        level: data.level,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`flex flex-col justify-between border-b px-2 py-3 text-sm md:flex-row md:items-center`}>
        <div className="flex items-center">
          <div
            className={`mr-4 flex h-6 w-6 items-center justify-center rounded-full md:h-8 md:w-8 bg-${color}-500 font-semibold uppercase text-white`}
          >
            {name[0]}
          </div>
          <div className="flex-1">
            <div className="mr-2 font-medium">{name}</div>
          </div>
        </div>

        <Controller
          name="level"
          control={control}
          render={({ field }) => (
            <EffortProgressBar
              currentValue={field.value}
              expectedValue={expected_effort}
              color={color}
              showTarget
              onChange={async (value: number) => {
                field.onChange(value);
                await onSubmit({ level: value });
              }}
            />
          )}
        />
      </div>
    </form>
  );
};

export default HomeHabit;
