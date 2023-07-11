import PageBack from '@/shared/components/ui/page-back/PageBack';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import AnnouncementForm from './AnnouncementForm';

const AddAnnouncement = () => {
  return (
    <div className="with-navbar-max-height-mobile p-6">
      <PageBack to="/backoffice/announcements" />
      <PageTitle title="New announcement" subtitle="Create a new announcement" className="mb-4" />

      <div className="mt-4 max-w-2xl md:rounded-lg md:border md:bg-white md:p-4 md:shadow-sm">
        <AnnouncementForm />
      </div>
    </div>
  );
};

export default AddAnnouncement;
