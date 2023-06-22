import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/toast/ToastContext';
import EffortLevel from '@/shared/components/effort-level/EffortLevel';
import FormInput from '@/shared/components/ui/input/FormInput';
import FormSelect from '@/shared/components/ui/select/FormSelect';
import WeekSelector from '@/shared/components/week-selector/WeekSelector';
import createHabit from '@/shared/queries/create-habit';
import EQueryKeys from '@/shared/queries/query-keys';

interface IFormData {
  name: string;
  starting_week: number;
  expected_effort: number;
  color: string;
}

// Only tailwind colors
const LIST_OF_COLORS = [
  { id: 'red', name: 'Red' },
  { id: 'blue', name: 'Blue' },
  { id: 'cyan', name: 'Cyan' },
  { id: 'yellow', name: 'Yellow' },
  { id: 'orange', name: 'Orange' },
  { id: 'pink', name: 'Pink' },
  { id: 'purple', name: 'Purple' },
  { id: 'indigo', name: 'Indigo' },
  { id: 'green', name: 'Green' },
  { id: 'teal', name: 'Teal' },
  { id: 'gray', name: 'Gray' },
  { id: 'emerald', name: 'Emerald' },
  { id: 'rose', name: 'Rose' },
  { id: 'sky', name: 'Sky' },
  { id: 'amber', name: 'Amber' },
];

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

  const onSubmit: SubmitHandler<IFormData> = data => {
    const { name, starting_week, expected_effort, color } = data;

    createHabitMutation.mutate({
      name,
      starting_week,
      expected_effort: Number(expected_effort),
      color,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg border bg-white p-4 shadow-sm">
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
            <label className="text-sm font-semibold">Starting week</label>
            <p className="mb-2 text-xs text-gray-500">When are you going to start with this habit.</p>
            <Controller
              name="starting_week"
              control={control}
              defaultValue={getWeek(new Date())}
              render={({ field }) => <WeekSelector {...field} currentWeek={getWeek(new Date())} />}
            />
          </div>

          <FormSelect
            name="color"
            label="Color"
            placeholder="Select a color"
            options={LIST_OF_COLORS}
            errors={errors}
            control={control}
            required
          />

          <label className="mt-4 text-sm font-semibold">Target effort</label>
          <p className="mb-2 text-xs text-gray-500">Amout of work devoted to this habit per week.</p>
          <Controller
            name="expected_effort"
            control={control}
            defaultValue={1}
            render={({ field }) => (
              <EffortLevel maxLevel={7} initialLevel={field.value} onLevelChange={level => field.onChange(level)} />
            )}
          />
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
