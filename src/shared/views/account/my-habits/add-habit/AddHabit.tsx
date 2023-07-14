import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/shared/components/toast/ToastContext';
import PageBack from '@/shared/components/ui/page-back/PageBack';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import { DeviceContext } from '@/shared/contexts/DeviceContext';
import createHabit from '@/shared/queries/create-habit';
import EQueryKeys from '@/shared/queries/query-keys';
import trackEvent from '@/shared/utils/ga-tracking';
import HabitForm from '../components/HabitForm';

const AddHabit = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const device = useContext(DeviceContext);

  useEffect(() => {
    trackEvent('page_view', { title: 'account_add_habit' });
  }, []);

  const createHabitMutation = useMutation(createHabit, {
    onMutate: () => {
      // loading
    },
    onError: () => {
      trackEvent('add_habit_error');

      showToast(
        'Error while creating new habit',
        'error',
        'There has been an error while creating habit, please try again later.'
      );
    },
    onSuccess: () => {
      trackEvent('add_habit_success');

      navigate('/account/habits');
      queryClient.invalidateQueries([EQueryKeys.Habits]);
      showToast('Habit created successfully', 'success');
    },
    onSettled: () => {
      // off loading
    },
  });

  const onSubmit = (data: IFormData) => {
    const { name, starting_week, expected_effort, color, ending_week } = data;

    createHabitMutation.mutate({
      name,
      ending_week,
      starting_week,
      expected_effort,
      color,
    });
  };

  const fullScreenClasses = device.type === 'mobile' ? 'h-full bg-gray-50 fixed top-0 overflow-y-scroll' : '';

  return (
    <div className={`p-6 ${fullScreenClasses}`}>
      <PageBack to="/account/habits" />
      <div className="flex items-center justify-between">
        {<PageTitle title="Add a new habit" subtitle="A new habit will be added to your list." className="mb-4" />}
      </div>

      <div className="mb-4 max-w-2xl rounded-lg md:border md:bg-white md:p-4 md:shadow-sm">
        <HabitForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

interface IFormData {
  name: string;
  starting_week: number;
  expected_effort: number;
  color: string;
  ending_week?: number | null;
}

export default AddHabit;
