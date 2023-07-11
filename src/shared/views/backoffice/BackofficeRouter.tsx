import { Route, Routes } from 'react-router-dom';
import Page from '@/shared/components/page/Page';
import AdminPanel from './components/user-panel/AdminPanel';
import Announcements from './routes/Announcements';
import AddAnnouncement from './routes/announcements/AddAnnouncement';
import ViewAnnouncement from './routes/announcements/ViewAnnouncement';
import Dashboard from './routes/Dashboard';
import Features from './routes/Features';
import AddFeature from './routes/features/AddFeature';
import ViewFeature from './routes/features/ViewFeature';
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
            <Route path="/backoffice/announcements/*" element={<AnnouncementsRouter />} />
            <Route path="/backoffice/tickets/*" element={<TicketsRouter />} />
            <Route path="/backoffice/features/*" element={<FeaturesRouter />} />
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

const AnnouncementsRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Announcements />} />
      <Route path="/:id" element={<ViewAnnouncement />} />
      <Route path="/add" element={<AddAnnouncement />} />
    </Routes>
  );
};

const FeaturesRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Features />} />
      <Route path="/:id" element={<ViewFeature />} />
      <Route path="/add" element={<AddFeature />} />
    </Routes>
  );
};

export default BackofficeRouter;
