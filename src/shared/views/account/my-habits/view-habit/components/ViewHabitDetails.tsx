import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useToast } from '@/shared/components/toast/ToastContext';
import Badge from '@/shared/components/ui/badge/Badge';
import FormInput from '@/shared/components/ui/input/FormInput';
import editHabit from '@/shared/queries/edit-habit';
import EQueryKeys from '@/shared/queries/query-keys';
import DetailRow from './DetailRow';

const ViewHabitDetails = ({
  editMode,
  setEditMode,
  habitId,
  habit,
}: {
  habitId: string;
  editMode: boolean;
  setEditMode: (b: boolean) => void;
  habit: TTHHabit;
}) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({ defaultValues: { starting_week: Number(habit?.starting_week) } });

  const editHabitMutation = useMutation(editHabit, {
    onMutate: () => {
      // loading
    },
    onError: () => {
      showToast(
        'Error while editing habit',
        'error',
        'There has been an error while editing your habit, please try again later.'
      );
    },
    onSuccess: () => {
      showToast('Habit was edited successfully', 'success');
      queryClient.invalidateQueries([EQueryKeys.Habits]);
      queryClient.invalidateQueries([EQueryKeys.Habit, habitId]);
      setEditMode(false);
    },
    onSettled: () => {
      // off loading
    },
  });

  useEffect(() => {
    if (habit) {
      setValue('starting_week', Number(habit.starting_week));
      setValue('name', habit.name);
    }
  }, [habit, setValue]);

  if (!habit) {
    return null;
  }

  const onSubmit: SubmitHandler<IFormData> = async data => {
    const { name, starting_week } = data;

    editHabitMutation.mutate({
      id: habitId,
      name,
      starting_week: Number(starting_week),
    });
  };

  return (
    <div className={`rounded-lg border ${editMode ? 'bg-gray-100' : 'bg-white'} p-3 shadow-sm`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="border-b px-2 pb-2 text-xs font-medium text-gray-400">Habit details</p>

        <DetailRow title="Name" subtitle="Set a name for your habit.">
          {editMode ? (
            <FormInput name="name" control={control} errors={errors} inputProps={{ type: 'text' }} />
          ) : (
            <p className="text-sm">{habit.name}</p>
          )}
        </DetailRow>

        <DetailRow title="Starting week" subtitle="When does this habit start counting">
          {editMode ? (
            <FormInput
              name="starting_week"
              required
              control={control}
              errors={errors}
              inputProps={{ type: 'number' }}
            />
          ) : (
            <Badge>{habit.starting_week}</Badge>
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
  starting_week: number;
}

export default ViewHabitDetails;
