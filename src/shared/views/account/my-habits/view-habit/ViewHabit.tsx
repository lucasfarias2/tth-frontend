import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/shared/components/toast/ToastContext';
import PageBack from '@/shared/components/ui/page-back/PageBack';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import fetchHabitbyId from '@/shared/queries/fetch-habit-by-id';
import EQueryKeys from '@/shared/queries/query-keys';

const ViewHabit = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { id } = useParams();

  const { data: habit } = useQuery([EQueryKeys.Habit, id], fetchHabitbyId);
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="p-8">
      <PageBack to="/account/habits" />
      <div className="flex items-center justify-between">
        {habit && <PageTitle title={habit.name} subtitle={`Starting week ${habit?.starting_week}`} className="mb-4" />}
      </div>

      {habit?.name}
    </div>
  );
};

export default ViewHabit;
