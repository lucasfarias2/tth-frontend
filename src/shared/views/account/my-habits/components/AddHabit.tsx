import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/toast/ToastContext';
import FormInput from '@/shared/components/ui/input/FormInput';
import WeekSelector from '@/shared/components/week-selector/WeekSelector';
import createHabit from '@/shared/queries/create-habit';
import EQueryKeys from '@/shared/queries/query-keys';

interface IFormData {
  name: string;
  starting_week: number;
}

const getWeek = (date: Date) => {
  const onejan = new Date(date.getFullYear(), 0, 1);
  const millisecsInDay = 86400000;
  return Math.ceil(((date.getTime() - onejan.getTime()) / millisecsInDay + onejan.getDay() + 1) / 7);
};

const AddHabit = ({ setAddHabitMode }: { setAddHabitMode: (bool: boolean) => void }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const createHabitMutation = useMutation(createHabit, {
    onMutate: () => {
      // loading
    },
    onError: () => {
      showToast(
        'Error while creating new habit',
        'error',
        'There has been an error while creating habit, please try again later.'
      );
    },
    onSuccess: () => {
      navigate('/account/habits');
      queryClient.invalidateQueries([EQueryKeys.Habits]);
      showToast('Habit created successfully', 'success');
      setAddHabitMode(false);
    },
    onSettled: () => {
      // off loading
    },
  });

  const onSubmit: SubmitHandler<IFormData> = async data => {
    const { name, starting_week } = data;

    createHabitMutation.mutate({
      name,
      starting_week,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg rounded-lg border bg-white p-4 shadow-sm">
        <div className="flex flex-col items-start">
          <FormInput
            name="name"
            label="Name"
            required
            control={control}
            errors={errors}
            inputProps={{ type: 'text', placeholder: 'Name of your habit' }}
          />

          <div className="mt-2">
            <label className="mb-1 text-sm font-semibold">Starting week</label>
            <Controller
              name="starting_week"
              control={control}
              defaultValue={getWeek(new Date())}
              render={({ field }) => <WeekSelector {...field} currentWeek={getWeek(new Date())} />}
            />
          </div>
        </div>

        <Link
          onClick={() => {
            setAddHabitMode(false);
          }}
          to="/account/habits"
          className="mr-2 inline-block rounded-lg border bg-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-gray-50"
        >
          Cancel
        </Link>

        <input
          type="submit"
          className="mt-4 cursor-pointer rounded-lg border border-rose-400 bg-rose-400 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500"
        />
      </form>
    </div>
  );
};

export default AddHabit;
