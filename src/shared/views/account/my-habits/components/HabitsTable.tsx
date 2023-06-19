import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/shared/components/toast/ToastContext';
import Badge from '@/shared/components/ui/badge/Badge';
import EditIcon from '@/shared/components/ui/icons/EditIcon';
import RemoveIcon from '@/shared/components/ui/icons/RemoveIcon';
import deleteHabit from '@/shared/queries/delete-habit';
import EQueryKeys from '@/shared/queries/query-keys';
import TableHeadRow from './TableHeadRow';
import TableRow from './TableRow';

interface IProps {
  habits?: TTHHabit[];
}

const HabitsTable = ({ habits }: IProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useToast();

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
      showToast('Habits was removed successfully', 'success');
      queryClient.invalidateQueries([EQueryKeys.Habits]);
    },
    onSettled: () => {
      // off loading
    },
  });

  const handleClickRemove = (id: string) => {
    deleteHabitMutation.mutate(id);
  };

  const handleClickEdit = (id: string) => {
    navigate(`/account/habits/${id}`);
  };

  return (
    <div className="overflow-x-hidden rounded-md border bg-white shadow-sm">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left">
            <th className="w-20"></th>
            <TableHeadRow>Name</TableHeadRow>
            <TableHeadRow>Starting week</TableHeadRow>
          </tr>
        </thead>
        <tbody>
          {habits?.map((habit: TTHHabit, index: number) => (
            <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/70'} border-b`}>
              <TableRow>
                <div className="px-3">color</div>
              </TableRow>
              <TableRow
                className="cursor-pointer font-medium"
                onClick={() => {
                  navigate(`/account/habits/${habit.id}`);
                }}
              >
                {habit.name}
              </TableRow>
              <TableRow className="w-[100px]">
                <Badge>{habit.starting_week}</Badge>
              </TableRow>
              <TableRow className="w-[80px]">
                <button className="mr-4" onClick={() => handleClickEdit(habit.id)}>
                  <EditIcon className="text-lg" />
                </button>
                <button onClick={() => handleClickRemove(habit.id)}>
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

export default HabitsTable;
