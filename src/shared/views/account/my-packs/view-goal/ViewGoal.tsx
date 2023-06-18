import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/shared/components/toast/ToastContext';
import EditIcon from '@/shared/components/ui/icons/EditIcon';
import RemoveIcon from '@/shared/components/ui/icons/EditIcon';
import PageBack from '@/shared/components/ui/page-back/PageBack';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import fetchGoalById from '@/shared/queries/fetch-goal-by-id';
import EQueryKeys from '@/shared/queries/query-keys';
import deleteGoal from '@/shared/queries/services/delete-goal';
import ViewGoalDetails from './components/ViewGoalDetails';

const ViewGoal = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { goalId } = useParams();
  const { data: goal } = useQuery([EQueryKeys.Goal, goalId], fetchGoalById);
  const [editMode, setEditMode] = useState(false);

  const deleteGoalMutation = useMutation(deleteGoal, {
    onMutate: () => {
      // loading
    },
    onError: () => {
      showToast(
        'Error while deleting goal',
        'error',
        'There has been an error while deleting your goal, please try again later.'
      );
    },
    onSuccess: () => {
      showToast('Goal was removed successfully', 'success');
      queryClient.invalidateQueries([EQueryKeys.Goals]);
      navigate('/account/goals');
    },
    onSettled: () => {
      // off loading
    },
  });

  const handleClickDeleteGoal = (id: string) => {
    deleteGoalMutation.mutate(id);
  };

  return (
    <div className="p-8">
      <PageBack to="/account" />
      <div className="mb-3 flex items-end justify-between">
        <div className="flex items-center">{goal && <PageTitle title={goal.name} subtitle={`${goal.year}`} />}</div>
        <div className="flex items-center">
          {!editMode && (
            <button
              className="mr-2 flex items-center rounded-lg border bg-white py-2 px-3 text-sm font-medium text-sky-600 shadow-sm"
              onClick={() => {
                setEditMode(true);
              }}
            >
              <EditIcon className="mr-2 text-xl" /> Edit goal
            </button>
          )}
          <button
            className="flex items-center rounded-lg border bg-white py-2 px-3 text-sm font-medium text-rose-600 shadow-sm"
            onClick={() => handleClickDeleteGoal(goal?.id as string)}
          >
            <RemoveIcon className="mr-2 text-xl" /> Delete goal
          </button>
        </div>
      </div>

      {goal && goalId && <ViewGoalDetails goal={goal} editMode={editMode} setEditMode={setEditMode} goalId={goalId} />}
    </div>
  );
};

export default ViewGoal;
