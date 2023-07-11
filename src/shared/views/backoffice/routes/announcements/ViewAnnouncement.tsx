import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Badge from '@/shared/components/badge/Badge';
import PageBack from '@/shared/components/ui/page-back/PageBack';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import { DeviceContext } from '@/shared/contexts/DeviceContext';
import fetchAnnouncementById from '@/shared/queries/backoffice/fetch-announcement-by-id';
import EQueryKeys from '@/shared/queries/query-keys';
import { formatDate } from '@/shared/utils/date';

const ViewAnnouncement = () => {
  const { id } = useParams();
  const { data: announcement } = useQuery([EQueryKeys.Announcement, id], fetchAnnouncementById);
  const device = useContext(DeviceContext);

  const fullScreenClasses = device.type === 'mobile' ? 'h-full bg-gray-50 fixed top-0 w-full' : '';

  return (
    <div className={`p-6 md:max-w-2xl ${fullScreenClasses}`}>
      <PageBack to="/backoffice/announcements" />
      <div className="mb-4 flex items-end justify-between">
        {announcement && (
          <>
            <div className="flex items-center justify-center">
              <PageTitle title={announcement.title} subtitle={`Type: ${announcement.type}`} />
            </div>
            {announcement.status === 'ON' ? (
              <Badge color="green" text="On" size="xs" />
            ) : (
              <Badge color="red" text="Off" size="xs" />
            )}
          </>
        )}
      </div>

      {announcement && (
        <div className="mb-2 rounded-lg border bg-white p-4 shadow-sm">
          <p className="text-xs text-black/50">Starts at: {formatDate(announcement.starting_date)}</p>
          <p className="mb-4 text-xs text-black/50">Ends by: {announcement.end_date}</p>
          <p>{announcement.content}</p>
        </div>
      )}
    </div>
  );
};

export default ViewAnnouncement;
