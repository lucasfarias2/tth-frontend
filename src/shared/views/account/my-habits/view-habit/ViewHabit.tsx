import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/shared/components/toast/ToastContext';
import ConfirmModal from '@/shared/components/ui/confirm-modal/ConfirmModal';
import { CloseIcon } from '@/shared/components/ui/icons';
import RemoveIcon from '@/shared/components/ui/icons/RemoveIcon';
import PageBack from '@/shared/components/ui/page-back/PageBack';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import { DeviceContext } from '@/shared/contexts/DeviceContext';
import deleteHabit from '@/shared/queries/delete-habit';
import editHabit from '@/shared/queries/edit-habit';
import fetchHabitbyId from '@/shared/queries/fetch-habit-by-id';
import EQueryKeys from '@/shared/queries/query-keys';
import trackEvent from '@/shared/utils/ga-tracking';
import HabitForm from '../components/HabitForm';

const ViewHabit = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { id } = useParams();
  const { data: habit } = useQuery([EQueryKeys.Habit, id], fetchHabitbyId);
  const siteConfig = queryClient.getQueryData([EQueryKeys.SiteConfig]) as TTHSiteConfig;
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isConfirmFinishModalOpen, setIsConfirmFinishModalOpen] = useState(false);
  const device = useContext(DeviceContext);

  useEffect(() => {
    trackEvent('page_view', { title: 'account_view_habit' });
  }, []);

  const editHabitMutation = useMutation(editHabit, {
    onMutate: () => {
      // loading
    },
    onError: () => {
      trackEvent('edit_habit_success');

      showToast(
        'Error while editing new habit',
        'error',
        'There has been an error while editing habit, please try again later.'
      );
    },
    onSuccess: () => {
      navigate('/account/habits');
      trackEvent('edit_habit_error');

      queryClient.invalidateQueries([EQueryKeys.Habits]);
      queryClient.invalidateQueries([EQueryKeys.Habit, id]);
      showToast('Habit updated successfully', 'success');
    },
    onSettled: () => {
      // off loading
    },
  });

  const onSubmit = (data: IFormData) => {
    const { name, starting_week, expected_effort, color, ending_week } = data;

    editHabitMutation.mutate({
      id,
      name,
      starting_week,
      expected_effort,
      color,
      ending_week,
    });
  };

  const deleteHabitMutation = useMutation(deleteHabit, {
    onMutate: () => {
      // loading
    },
    onError: () => {
      trackEvent('remove_habit_failed');
      showToast('Error while deleting habit', 'error', 'Please try again later.');
    },
    onSuccess: () => {
      navigate('/account/habits');
      showToast('Habit was successfully removed', 'success');
      queryClient.invalidateQueries([EQueryKeys.Habits]);
      trackEvent('remove_habit_success');
    },
    onSettled: () => {
      // off loading
    },
  });

  const handleClickRemove = () => {
    deleteHabitMutation.mutate(id);
  };

  const handleClickFinish = () => {
    trackEvent('finish_habit');

    editHabitMutation.mutate({
      id,
      ending_week: siteConfig?.current_week - 1,
    });
  };

  const fullScreenClasses = device.type === 'mobile' ? 'h-full bg-gray-50 fixed top-0' : '';

  return (
    <div className={`max-w-2xl p-6 ${fullScreenClasses}`}>
      <PageBack to="/account/habits" />
      <div className="mb-4 flex flex-wrap items-end justify-between">
        <div className="flex items-center justify-center">
          <div
            className={`mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-${habit?.color}-500 font-semibold uppercase text-white`}
          >
            {habit?.name[0]}
          </div>
          {habit && <PageTitle title={habit.name} subtitle={`Starting week ${habit?.starting_week}`} />}
        </div>
        <div className="mt-4 flex md:mt-0">
          <div
            onClick={() => setIsConfirmFinishModalOpen(true)}
            className="mr-2 flex cursor-pointer items-center rounded-lg border bg-white p-2 text-xs font-medium text-gray-600 shadow-sm hover:bg-gray-50"
          >
            <CloseIcon className="mr-1 text-base" /> Finish habit
          </div>
          <div
            onClick={() => setIsConfirmModalOpen(true)}
            className="flex cursor-pointer items-center rounded-lg border bg-white p-2 text-xs font-medium text-red-600 shadow-sm hover:bg-gray-50"
          >
            <RemoveIcon className="mr-1 text-base" /> Delete habit
          </div>
        </div>
      </div>

      {habit && (
        <div className="rounded-lg md:border md:bg-white md:p-4 md:shadow-sm">
          <HabitForm initialValues={habit} onSubmit={onSubmit} />
        </div>
      )}

      <ConfirmModal
        title="Delete habit"
        text="Are you sure you want to delete this habit? The number of the last week will be applied as an ending week."
        confirmButtonText="Confirm"
        cancelButtonText="Cancel"
        onConfirm={handleClickRemove}
        onCancel={() => setIsConfirmModalOpen(false)}
        isOpen={isConfirmModalOpen}
      />

      <ConfirmModal
        title="Finish habit"
        text="Are you sure you want set this habit as finished?"
        confirmButtonText="Confirm"
        cancelButtonText="Cancel"
        onConfirm={handleClickFinish}
        onCancel={() => setIsConfirmFinishModalOpen(false)}
        isOpen={isConfirmFinishModalOpen}
      />
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

export default ViewHabit;
