import { useQueryClient } from '@tanstack/react-query';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import EffortProgressBar from '@/shared/components/effort-progress-bar/EffortProgressBar';
import FormInput from '@/shared/components/ui/input/FormInput';
import FormSelect from '@/shared/components/ui/select/FormSelect';
import WeekSelector from '@/shared/components/week-selector/WeekSelector';
import EQueryKeys from '@/shared/queries/query-keys';
import LIST_OF_COLORS from '@/shared/utils/colors';

interface IFormData {
  name: string;
  starting_week: number;
  expected_effort: number;
  color: string;
}

const HabitForm = ({ initialValues, onSubmit }: { initialValues?: IFormData; onSubmit: (data: IFormData) => void }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { current_week: currentWeek } = queryClient.getQueryData([EQueryKeys.SiteConfig]) as TTHSiteConfig;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({ defaultValues: initialValues });

  const internalOnSubmit: SubmitHandler<IFormData> = data => {
    const { name, starting_week, expected_effort, color } = data;

    onSubmit({
      name,
      starting_week,
      expected_effort: Number(expected_effort),
      color,
    });
  };

  return (
    <form onSubmit={handleSubmit(internalOnSubmit)}>
      <div className="flex flex-col items-start">
        <FormInput
          name="name"
          label="Name"
          required
          control={control}
          errors={errors}
          inputProps={{ type: 'text', placeholder: 'Name of your habit' }}
        />

        <FormSelect
          name="color"
          label="Color"
          placeholder="Select a color"
          options={LIST_OF_COLORS}
          errors={errors}
          control={control}
          required
        />

        <div className="mt-4 w-full">
          <label className="text-sm font-semibold">Starting week</label>
          <p className="mb-2 text-xs text-gray-500">When are you going to start with this habit.</p>
          <Controller
            name="starting_week"
            control={control}
            defaultValue={currentWeek}
            render={({ field }) => <WeekSelector {...field} currentWeek={currentWeek} className="border-b shadow-sm" />}
          />
        </div>

        <div className="my-4">
          <label className="text-sm font-semibold">Target effort</label>
          <p className="mb-2 text-xs text-gray-500">Amout of work devoted to this habit per week.</p>
          <Controller
            name="expected_effort"
            control={control}
            defaultValue={1}
            render={({ field }) => (
              <EffortProgressBar
                minimumValue={1}
                expectedValue={7}
                currentValue={field.value}
                color="gray"
                onChange={(level: number) => field.onChange(level)}
              />
            )}
          />
        </div>
      </div>

      <Link
        onClick={() => {
          navigate('/account/habits');
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
  );
};

export default HabitForm;
