import { Route, Routes } from 'react-router-dom';
import Page from '@/shared/components/page/Page';
import AdminPanel from './components/user-panel/AdminPanel';
import Announcements from './routes/Announcements';
import Dashboard from './routes/Dashboard';
import Features from './routes/Features';
import Tickets from './routes/Tickets';
import ViewTicket from './routes/tickets/ViewTicket';
import Users from './routes/Users';

const BackofficeRouter = (props: IViewProps) => {
  const { device, initialState } = props;

  return (
    <Page initialState={initialState} device={device} flow="backoffice" withNavbar={device.type === 'mobile'}>
      <div className="flex h-full dark:text-white/75">
        {device.type === 'desktop' && <AdminPanel />}
        <div className="flex-1 overflow-y-scroll bg-gray-50 dark:bg-neutral-800/95">
          <Routes>
            <Route path="/backoffice" element={<Dashboard />} />
            <Route path="/backoffice/users" element={<Users />} />
            <Route path="/backoffice/announcements" element={<Announcements />} />
            <Route path="/backoffice/tickets/*" element={<TicketsRouter />} />
            <Route path="/backoffice/features" element={<Features />} />
          </Routes>
        </div>
      </div>
    </Page>
  );
};

const TicketsRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Tickets />} />
      <Route path="/:id" element={<ViewTicket />} />
    </Routes>
  );
};

export default BackofficeRouter;
