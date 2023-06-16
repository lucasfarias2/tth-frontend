import { Route, Routes } from 'react-router-dom';
import Page from '@/shared/components/page/Page';
import UserPanel from './components/user-panel/UserPanel';
import Home from './home/Home';
import MySettings from './my-settings/MySettings';

const AccountRouter = (props: IViewProps) => {
  return (
    <Page initialState={props.initialState}>
      <div className="flex h-full">
        <UserPanel />
        <div className="flex-1 overflow-y-scroll bg-gray-50">
          <Routes>
            <Route path="/account" element={<Home />} />
            <Route path="/account/tasks/*" element={<TasksRouter />} />
            <Route path="/account/objectives/*" element={<ObjectivesRouter />} />
            <Route path="/account/goals/*" element={<GoalsRouter />} />
            <Route path="/account/settings" element={<MySettings />} />
          </Routes>
        </div>
      </div>
    </Page>
  );
};

const TasksRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MyTasks />} />
      <Route path="/add" element={<AddTask />} />
      <Route path="/:id" element={<ViewTask />} />
    </Routes>
  );
};

const ObjectivesRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MyObjectives />} />
      <Route path="/add" element={<AddObjective />} />
      <Route path="/:id" element={<ViewObjective />} />
    </Routes>
  );
};

const GoalsRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MyGoals />} />
      <Route path="/add" element={<AddGoal />} />
      <Route path="/:id" element={<ViewGoal />} />
    </Routes>
  );
};

export default AccountRouter;
