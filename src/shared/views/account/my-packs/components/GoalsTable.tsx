import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/shared/components/toast/ToastContext';
import Badge from '@/shared/components/ui/badge/Badge';
import EditIcon from '@/shared/components/ui/icons/EditIcon';
import RemoveIcon from '@/shared/components/ui/icons/RemoveIcon';
import EQueryKeys from '@/shared/queries/query-keys';
import deleteGoal from '@/shared/queries/services/delete-goal';
import TableHeadRow from './TableHeadRow';
import TableRow from './TableRow';

interface IProps {
  goals?: TTHGoal[];
}

const GoalsTable = ({ goals }: IProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useToast();

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
    },
    onSettled: () => {
      // off loading
    },
  });

  const handleClickRemove = (id: string) => {
    deleteGoalMutation.mutate(id);
  };

  const handleClickEdit = (id: string) => {
    navigate(`/account/goals/${id}`);
  };

  return (
    <div className="overflow-x-hidden rounded-md border bg-white shadow-sm">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left">
            <th className="w-20"></th>
            <TableHeadRow>Name</TableHeadRow>
            <TableHeadRow>Year</TableHeadRow>
            <TableHeadRow>Actions</TableHeadRow>
          </tr>
        </thead>
        <tbody>
          {goals?.map((goal: TTHGoal, index: number) => (
            <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/70'} border-b`}>
              <TableRow>
                <div className="px-3">{goal.color}</div>
              </TableRow>
              <TableRow
                className="cursor-pointer font-medium"
                onClick={() => {
                  navigate(`/account/goals/${goal.id}`);
                }}
              >
                {goal.name}
              </TableRow>
              <TableRow className="w-[100px]">
                <Badge>{goal.year}</Badge>
              </TableRow>
              <TableRow className="w-[80px]">
                <button className="mr-4" onClick={() => handleClickEdit(goal.id)}>
                  <EditIcon className="text-lg" />
                </button>
                <button onClick={() => handleClickRemove(goal.id)}>
                  <RemoveIcon className="text-lg" />
                </button>
              </TableRow>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GoalsTable;
