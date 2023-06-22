import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EffortLevel from '@/shared/components/effort-level/EffortLevel';
import { useToast } from '@/shared/components/toast/ToastContext';
import deleteHabit from '@/shared/queries/delete-habit';
import EQueryKeys from '@/shared/queries/query-keys';

const Habit = ({ id, name, starting_week, color, expected_effort }: IProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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

  return (
    <Link
      to={`/account/habits/${id}`}
      className="mb-2 flex items-center justify-between rounded-md border bg-white py-2 px-4 text-sm shadow-sm hover:bg-gray-50"
    >
      <div
        className={`mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-${color}-500 font-semibold uppercase text-white`}
      >
        {name[0]}
      </div>
      <div className="flex-1">
        <div className="mr-2 font-medium">{name}</div>
        <div className="text-xs text-gray-500">From week {starting_week}</div>
      </div>

      <div className="mr-4 flex items-center justify-center">
        <EffortLevel readOnly initialLevel={expected_effort} color={color} />
      </div>
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
