import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useToast } from '@/shared/components/toast/ToastContext';
import EditIcon from '@/shared/components/ui/icons/EditIcon';
import RemoveIcon from '@/shared/components/ui/icons/RemoveIcon';
import deleteHabit from '@/shared/queries/delete-habit';
import EQueryKeys from '@/shared/queries/query-keys';

const Habit = ({ id, name, starting_week, color, effort_goal }: IProps) => {
  const queryClient = useQueryClient();

  const [showActions, setShowActions] = useState(false);
  const [editMode, setEditMode] = useState(false);
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

  const handleClickRemove = () => {
    deleteHabitMutation.mutate(id);
  };

  const handleClickEdit = () => {
    setEditMode(true);
  };

  return (
    <div
      onMouseEnter={() => {
        setShowActions(true);
      }}
      onMouseLeave={() => {
        setShowActions(false);
      }}
      className="mb-2 mr-2 flex items-center justify-between rounded-md border bg-white p-4 text-sm shadow-sm"
    >
      <div>
        {editMode ? <div>input</div> : <div className="font-medium">{name}</div>}
        {editMode ? (
          <div>week selector</div>
        ) : (
          <div className="text-xs text-gray-500">Starting from week {starting_week}</div>
        )}
      </div>
      {!editMode && showActions && (
        <div className="flex cursor-pointer items-center text-base text-gray-400">
          <div onClick={handleClickEdit} className="mr-3 hover:text-black">
            <EditIcon />
          </div>
          <div onClick={handleClickRemove} className="hover:text-black">
            <RemoveIcon />
          </div>
        </div>
      )}
      {editMode && (
        <button
          onClick={() => {
            setEditMode(false);
          }}
          type="button"
          className="mr-2 inline-block rounded-lg border bg-white px-2 py-1 text-xs font-semibold shadow-sm hover:bg-gray-50"
        >
          Cancel
        </button>
      )}
    </div>
  );
};

interface IProps extends IComponent {
  id: string;
  name: string;
  starting_week: number;
  color: string;
  effort_goal: number;
}

export default Habit;
