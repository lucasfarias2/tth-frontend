import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useToast } from '@/shared/components/toast/ToastContext';
import Badge from '@/shared/components/ui/badge/Badge';
import FormInput from '@/shared/components/ui/input/FormInput';
import FormSelect from '@/shared/components/ui/select/FormSelect';
import EQueryKeys from '@/shared/queries/query-keys';
import editGoal from '@/shared/queries/services/edit-goal';
import DetailRow from './DetailRow';

const ViewGoalDetails = ({
  editMode,
  setEditMode,
  goalId,
  goal,
}: {
  goalId: string;
  editMode: boolean;
  setEditMode: (b: boolean) => void;
  goal: TTHGoal;
}) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({ defaultValues: { year: Number(goal?.year) } });

  const editGoalMutation = useMutation(editGoal, {
    onMutate: () => {
      // loading
    },
    onError: () => {
      showToast(
        'Error while editing goal',
        'error',
        'There has been an error while editing your goal, please try again later.'
      );
    },
    onSuccess: () => {
      showToast('Goal was edited successfully', 'success');
      queryClient.invalidateQueries([EQueryKeys.Goals]);
      queryClient.invalidateQueries([EQueryKeys.Goal, goalId]);
      setEditMode(false);
    },
    onSettled: () => {
      // off loading
    },
  });

  useEffect(() => {
    if (goal) {
      setValue('year', Number(goal.year));
      setValue('name', goal.name);
      setValue('color', goal.color);
    }
  }, [goal, setValue]);

  if (!goal) {
    return null;
  }

  const onSubmit: SubmitHandler<IFormData> = async data => {
    const { name, year, color } = data;

    editGoalMutation.mutate({
      id: goalId,
      name,
      year: Number(year),
      color,
    });
  };

  return (
    <div className={`rounded-lg border ${editMode ? 'bg-gray-100' : 'bg-white'} p-3 shadow-sm`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="border-b px-2 pb-2 text-xs font-medium text-gray-400">Goal details</p>

        <DetailRow title="Name" subtitle="Set a name for your goal.">
          {editMode ? (
            <FormInput name="name" control={control} errors={errors} inputProps={{ type: 'text' }} />
          ) : (
            <p className="text-sm">{goal.name}</p>
          )}
        </DetailRow>

        <DetailRow title="Color" subtitle="Give your goal a color to help you identify it better.">
          {editMode ? (
            <FormSelect
              name="color"
              // defaultValue={goal.color}
              options={[{ id: 'blue', name: 'Blue' }]}
              errors={errors}
              control={control}
            />
          ) : (
            <Badge>{goal?.color}</Badge>
          )}
        </DetailRow>

        <DetailRow title="Year" subtitle="In which year will you plan achieve this goal?">
          {editMode ? (
            <FormInput name="year" required control={control} errors={errors} inputProps={{ type: 'number' }} />
          ) : (
            <Badge>{goal.year}</Badge>
          )}
        </DetailRow>

        {editMode && (
          <>
            <button
              type="button"
              className="mr-2 inline-block rounded-lg border bg-white px-4 py-2 text-sm font-semibold shadow-sm"
              onClick={() => {
                setEditMode(false);
              }}
            >
              Cancel
            </button>

            <input
              type="submit"
              className="mt-4 cursor-pointer rounded-lg border border-rose-400 bg-rose-400 px-4 py-2 text-sm font-semibold text-white shadow-sm"
            />
          </>
        )}
      </form>
    </div>
  );
};

interface IFormData {
  name: string;
  year: number;
  color: string;
}

export default ViewGoalDetails;
