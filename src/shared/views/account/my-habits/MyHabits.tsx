import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import fetchHabits from '@/shared/queries/fetch-habits';
import EQueryKeys from '@/shared/queries/query-keys';
import AddHabit from './components/AddHabit';
import Habit from './components/Habit';

const MyHabits = () => {
  const { data: habits, isLoading } = useQuery([EQueryKeys.Habits], fetchHabits);
  const [addHabitMode, setAddHabitMode] = useState(false);

  if (isLoading) {
    return <div className="p-24 text-4xl">Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <PageTitle title="My habits" subtitle="Here you can manage your habits." className="mb-4" />
      </div>

      <div className="mb-4 max-w-lg">
        {habits?.map(habit => {
          return <Habit key={habit.id} {...habit} />;
        })}
      </div>

      {!addHabitMode ? (
        <div
          onClick={() => {
            setAddHabitMode(true);
          }}
          className="mr-2 inline-block cursor-pointer items-center rounded-lg border bg-white py-2 px-3 text-sm font-medium text-rose-600 shadow-sm hover:bg-gray-50"
        >
          Add new habit
        </div>
      ) : (
        <AddHabit setAddHabitMode={setAddHabitMode} />
      )}
    </div>
  );
};

export default MyHabits;
