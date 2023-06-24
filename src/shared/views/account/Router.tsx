import { Route, Routes } from 'react-router-dom';
import Page from '@/shared/components/page/Page';
import UserPanel from './components/user-panel/UserPanel';
import Home from './home/Home';
import AddHabit from './my-habits/add-habit/AddHabit';
import MyHabits from './my-habits/MyHabits';
import ViewHabit from './my-habits/view-habit/ViewHabit';
import MySettings from './my-settings/MySettings';
import MyStats from './my-stats/MyStats';

const AccountRouter = (props: IViewProps) => {
  return (
    <Page initialState={props.initialState}>
      <div className="flex h-full">
        <UserPanel />
        <div className="flex-1 overflow-y-scroll bg-gray-50">
          <Routes>
            <Route path="/account" element={<Home />} />
            <Route path="/account/habits/*" element={<HabitsRouter />} />
            <Route path="/account/stats" element={<MyStats />} />
            <Route path="/account/settings" element={<MySettings />} />
          </Routes>
        </div>
      </div>
    </Page>
  );
};

const HabitsRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MyHabits />} />
      <Route path="/add" element={<AddHabit />} />
      <Route path="/:id" element={<ViewHabit />} />
    </Routes>
  );
};

export default AccountRouter;
