import { Route, Routes } from 'react-router-dom';
import Page from '@/shared/components/page/Page';
import AdminPanel from './components/user-panel/AdminPanel';
import Announcements from './routes/Announcements';
import Dashboard from './routes/Dashboard';
import Users from './routes/Users';

const BackofficeRouter = (props: IViewProps) => {
  const { device, initialState } = props;

  return (
    <Page initialState={initialState} device={device} flow="backoffice" withNavbar={device.type === 'mobile'} darkMode>
      <div className="flex h-full">
        {device.type === 'desktop' && <AdminPanel />}
        <div className="flex-1 overflow-y-scroll bg-neutral-800/95">
          <Routes>
            <Route path="/backoffice" element={<Dashboard />} />
            <Route path="/backoffice/users" element={<Users />} />
            <Route path="/backoffice/announcements" element={<Announcements />} />
          </Routes>
        </div>
      </div>
    </Page>
  );
};

export default BackofficeRouter;
