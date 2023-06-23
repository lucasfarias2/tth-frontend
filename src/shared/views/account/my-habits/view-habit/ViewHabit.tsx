import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/shared/components/toast/ToastContext';
import RemoveIcon from '@/shared/components/ui/icons/RemoveIcon';
import PageBack from '@/shared/components/ui/page-back/PageBack';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import deleteHabit from '@/shared/queries/delete-habit';
import editHabit from '@/shared/queries/edit-habit';
import fetchHabitbyId from '@/shared/queries/fetch-habit-by-id';
import EQueryKeys from '@/shared/queries/query-keys';
import HabitForm from '../components/HabitForm';

const ViewHabit = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { id } = useParams();
  const { data: habit } = useQuery([EQueryKeys.Habit, id], fetchHabitbyId);
  const [editMode, setEditMode] = useState(false);

  const editHabitMutation = useMutation(editHabit, {
    onMutate: () => {
      // loading
    },
    onError: () => {
      showToast(
        'Error while editing new habit',
        'error',
        'There has been an error while editing habit, please try again later.'
      );
    },
    onSuccess: () => {
      navigate('/account/habits');
      queryClient.invalidateQueries([EQueryKeys.Habits]);
      queryClient.invalidateQueries([EQueryKeys.Habit, id]);
      showToast('Habit updated successfully', 'success');
    },
    onSettled: () => {
      // off loading
    },
  });

  const onSubmit = (data: IFormData) => {
    const { name, starting_week, expected_effort, color } = data;

    editHabitMutation.mutate({
      id,
      name,
      starting_week,
      expected_effort,
      color,
    });
  };

  const deleteHabitMutation = useMutation(deleteHabit, {
    onMutate: () => {
      // loading
    },
    onError: e => {
      console.log('e', e);
      showToast('Error while deleting habit', 'error', 'Please try again later.');
    },
    onSuccess: () => {
      navigate('/account/habits');
      showToast('Habit was successfully removed', 'success');
      queryClient.invalidateQueries([EQueryKeys.Habits]);
    },
    onSettled: () => {
      // off loading
    },
  });

  const handleClickRemove = () => {
    deleteHabitMutation.mutate(id);
  };

  return (
    <div className="max-w-2xl p-8">
      <PageBack to="/account/habits" />
      <div className="mb-4 flex items-end justify-between">
        <div className="flex items-center justify-center">
          <div
            className={`mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-${habit?.color}-500 font-semibold uppercase text-white`}
          >
            {habit?.name[0]}
          </div>
          {habit && <PageTitle title={habit.name} subtitle={`Starting week ${habit?.starting_week}`} />}
        </div>
        <div
          onClick={handleClickRemove}
          className="flex cursor-pointer items-center rounded-lg border bg-white p-2 text-sm font-medium text-rose-600 shadow-sm hover:bg-gray-50"
        >
          <RemoveIcon className="mr-2 text-lg" /> Delete habit
        </div>
      </div>

      {habit && (
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <HabitForm initialValues={habit} onSubmit={onSubmit} />
        </div>
      )}
    </div>
  );
};

interface IFormData {
  name: string;
  starting_week: number;
  expected_effort: number;
  color: string;
}

export default ViewHabit;
