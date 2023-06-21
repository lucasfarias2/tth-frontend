import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/shared/components/toast/ToastContext';
import CircleFilledIcon from '@/shared/components/ui/icons/CircleFilledIcon';
import CircleIcon from '@/shared/components/ui/icons/CircleIcon';
import EditIcon from '@/shared/components/ui/icons/EditIcon';
import RemoveIcon from '@/shared/components/ui/icons/RemoveIcon';
import deleteHabit from '@/shared/queries/delete-habit';
import EQueryKeys from '@/shared/queries/query-keys';

const Habit = ({ id, name, starting_week, color, expected_effort }: IProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showActions, setShowActions] = useState(false);
  const { showToast } = useToast();

  const deleteHabitMutation = useMutation(deleteHabit, {
    onMutate: () => {
      // loading
    },
    onError: e => {
      console.log('e', e);
      showToast('Error while deleting habit', 'error', 'Please try again later.');
    },
    onSuccess: () => {
      showToast('Habit was successfully removed', 'success');
      queryClient.invalidateQueries([EQueryKeys.Habits]);
    },
    onSettled: () => {
      // off loading
    },
  });

  const handleClickRemove = e => {
    e.preventDefault();
    deleteHabitMutation.mutate(id);
  };

  const handleClickEdit = () => {
    navigate(`/account/habits/${id}`);
  };

  return (
    <Link
      to={`/account/habits/${id}`}
      onMouseEnter={() => {
        setShowActions(true);
      }}
      onMouseLeave={() => {
        setShowActions(false);
      }}
      className="mb-2 mr-2 flex items-center justify-between rounded-md border bg-white p-4 text-sm shadow-sm"
    >
      <div
        className={`mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-${color}-500 font-semibold uppercase text-white`}
      >
        {name[0]}
      </div>
      <div className="flex-1">
        <div className="mr-2 text-lg font-medium">{name}</div>
        <div className="text-xs text-gray-500">From week {starting_week}</div>
      </div>

      <div className="mr-4 flex items-center justify-center">
        {Array.from({ length: 7 }).map((e, i) => {
          return i < expected_effort ? (
            <CircleFilledIcon key={i} className="mr-[1px] fill-rose-500" />
          ) : (
            <CircleIcon key={i} className="mr-[1px] text-rose-500" />
          );
        })}
      </div>
      {showActions && (
        <div className="flex cursor-pointer items-center text-base text-gray-400">
          <div onClick={handleClickEdit} className="mr-3 hover:text-black">
            <EditIcon />
          </div>
          <div onClick={handleClickRemove} className="hover:text-black">
            <RemoveIcon />
          </div>
        </div>
      )}
    </Link>
  );
};

interface IProps extends IComponent {
  id: string;
  name: string;
  starting_week: number;
  color: string;
  expected_effort: number;
}

export default Habit;
