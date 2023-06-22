import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import AddIcon from '@/shared/components/ui/icons/AddIcon';
import LogoIcon from '@/shared/components/ui/icons/LogoIcon';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import fetchHabits from '@/shared/queries/fetch-habits';
import EQueryKeys from '@/shared/queries/query-keys';
import AddHabit from './components/AddHabit';
import Habit from './components/Habit';

const MyHabits = () => {
  const { data: habits } = useQuery([EQueryKeys.Habits], fetchHabits);
  const [addHabitMode, setAddHabitMode] = useState(false);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <PageTitle title="My habits" subtitle="Here you can manage your habits." className="mb-4" />
      </div>

      <div className="flex flex-wrap">
        <div className="mb-4 max-w-2xl flex-1">
          {habits?.map(habit => {
            return <Habit key={habit.id} {...habit} />;
          })}
        </div>

        <div className="ml-6 w-[450px]">
          {addHabitMode && <AddHabit setAddHabitMode={setAddHabitMode} />}
          {!addHabitMode && (
            <div className="flex flex-col items-center">
              <LogoIcon className="fill-gray-400 text-9xl opacity-10" />{' '}
              <div
                onClick={() => {
                  setAddHabitMode(true);
                }}
                className="flex cursor-pointer items-center rounded-lg border bg-white py-2 px-3 text-sm font-medium text-rose-600 shadow-sm hover:bg-gray-50"
              >
                <AddIcon className="mr-1" />
                Add new habit
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyHabits;
