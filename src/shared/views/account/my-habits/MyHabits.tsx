import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '@/shared/components/ui/icons/AddIcon';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import fetchHabits from '@/shared/queries/fetch-habits';
import EQueryKeys from '@/shared/queries/query-keys';
import trackEvent from '@/shared/utils/ga-tracking';
import Habit from './components/Habit';

const MyHabits = () => {
  const { data: habits } = useQuery([EQueryKeys.Habits], fetchHabits);
  const [currentTab, setCurrentTab] = useState('open');

  useEffect(() => {
    trackEvent('page_view', { title: 'account_habits' });
  }, []);

  return (
    <div className="p-6">
      <div className="flex max-w-2xl items-center justify-between">
        <PageTitle title="My habits" subtitle="Here you can manage your habits." className="mb-4" />
        <Link
          to="/account/habits/add"
          className="flex cursor-pointer items-center rounded-lg border bg-white py-2 px-3 text-xs font-medium shadow-sm hover:bg-gray-50 md:text-sm"
        >
          <AddIcon className="mr-1" />
          Add new habit
        </Link>
      </div>

      <div className="mb-4 max-w-2xl flex-1">
        <div className="mb-2 flex cursor-pointer justify-between overflow-hidden rounded-lg border bg-gray-100 text-center text-sm font-medium leading-none shadow-sm">
          <div
            className={`mr-1 flex w-1/2 flex-col items-center justify-center rounded-lg p-2 ${
              currentTab === 'open' ? 'bg-white shadow' : 'text-black/40'
            }`}
            onClick={() => {
              setCurrentTab('open');
            }}
          >
            <div className="mb-1">Open</div>
            <span className="text-[10px] font-normal">End after current week</span>
          </div>
          <div
            className={`w-1/2 flex-col items-center justify-center rounded-lg p-2 ${
              currentTab === 'finished' ? 'bg-white shadow' : 'text-black/40'
            }`}
            onClick={() => {
              setCurrentTab('finished');
            }}
          >
            <div className="">Finished</div>
            <span className="text-[10px] font-normal">Ended before current week</span>
          </div>
        </div>
        {habits
          ?.filter(habit => {
            if (currentTab === 'open') {
              return habit.status === 'open';
            } else {
              return habit.status === 'finished';
            }
          })
          .map(habit => {
            return <Habit key={habit.id} {...habit} />;
          })}
      </div>
    </div>
  );
};

export default MyHabits;
