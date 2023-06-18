import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/toast/ToastContext';
import FormInput from '@/shared/components/ui/input/FormInput';
import PageBack from '@/shared/components/ui/page-back/PageBack';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import FormSelect from '@/shared/components/ui/select/FormSelect';
import EQueryKeys from '@/shared/queries/query-keys';
import createGoal from '@/shared/queries/services/create-goal';

const AddGoal = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const createGoalMutation = useMutation(createGoal, {
    onMutate: () => {
      // loading
    },
    onError: () => {
      showToast(
        'Error while creating new goal',
        'error',
        'There has been an error while creating goal, please try again later.'
      );
    },
    onSuccess: () => {
      navigate('/account');
      queryClient.invalidateQueries([EQueryKeys.Goals]);
      showToast('Goal created successfully', 'success');
    },
    onSettled: () => {
      // off loading
    },
  });

  const onSubmit: SubmitHandler<IFormData> = async data => {
    const { name, year, color } = data;

    createGoalMutation.mutate({
      name,
      year,
      color,
    });
  };

  return (
    <div className="p-8">
      <PageBack to="/account/goals" />
      <PageTitle title="Add new goal" subtitle="Here you can add a new yearly goal." className="mb-4" />
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex flex-col items-start">
            <FormInput
              name="name"
              label="Name"
              required
              control={control}
              errors={errors}
              inputProps={{ type: 'text', placeholder: 'Become a master chef' }}
            />

            <FormSelect
              name="color"
              label="Color"
              options={[
                { id: 'red', name: 'Red' },
                { id: 'blue', name: 'Blue' },
              ]}
              errors={errors}
              control={control}
              required
            />

            <FormInput
              name="year"
              label="Year"
              required
              control={control}
              errors={errors}
              inputProps={{ type: 'number', placeholder: 'Enter the year' }}
            />
          </div>

          <Link
            to="/account/goals"
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
    </div>
  );
};

interface IFormData {
  name: string;
  year: number;
  color: string;
}

export default AddGoal;
