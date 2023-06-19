import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/shared/components/toast/ToastContext';
import EditIcon from '@/shared/components/ui/icons/EditIcon';
import RemoveIcon from '@/shared/components/ui/icons/EditIcon';
import PageBack from '@/shared/components/ui/page-back/PageBack';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import deleteHabit from '@/shared/queries/delete-habit';
import fetchHabitbyId from '@/shared/queries/fetch-habit-by-id';
import EQueryKeys from '@/shared/queries/query-keys';
import ViewHabitDetails from './components/ViewHabitDetails';

const ViewHabit = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { habitId } = useParams();
  const { data: habit } = useQuery([EQueryKeys.Habit, habitId], fetchHabitbyId);
  const [editMode, setEditMode] = useState(false);

  const deleteHabitMutation = useMutation(deleteHabit, {
    onMutate: () => {
      // loading
    },
    onError: () => {
      showToast(
        'Error while deleting habit',
        'error',
        'There has been an error while deleting your habit, please try again later.'
      );
    },
    onSuccess: () => {
      showToast('Habit was removed successfully', 'success');
      queryClient.invalidateQueries([EQueryKeys.Habits]);
      navigate('/account/habits');
    },
    onSettled: () => {
      // off loading
    },
  });

  const handleClickDeleteHabit = (id: string) => {
    deleteHabitMutation.mutate(id);
  };

  return (
    <div className="p-8">
      <PageBack to="/account" />
      <div className="mb-3 flex items-end justify-between">
        <div className="flex items-center">
          {habit && <PageTitle title={habit.name} subtitle={`Starting from week ${habit.starting_week}`} />}
        </div>
        <div className="flex items-center">
          {!editMode && (
            <button
              className="mr-2 flex items-center rounded-lg border bg-white py-2 px-3 text-sm font-medium text-sky-600 shadow-sm"
              onClick={() => {
                setEditMode(true);
              }}
            >
              <EditIcon className="mr-2 text-xl" /> Edit habit
            </button>
          )}
          <button
            className="flex items-center rounded-lg border bg-white py-2 px-3 text-sm font-medium text-rose-600 shadow-sm"
            onClick={() => handleClickDeleteHabit(habit?.id as string)}
          >
            <RemoveIcon className="mr-2 text-xl" /> Delete habit
          </button>
        </div>
      </div>

      {habit && habitId && (
        <ViewHabitDetails habit={habit} editMode={editMode} setEditMode={setEditMode} habitId={habitId} />
      )}
    </div>
  );
};

export default ViewHabit;
