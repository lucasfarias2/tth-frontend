import { useQuery } from '@tanstack/react-query';
import { AlertInfoIcon, AnnouncementIcon } from '@/shared/components/ui/icons';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import fetchAnnouncements from '@/shared/queries/backoffice/fetch-announcements';
import EQueryKeys from '@/shared/queries/query-keys';
import { formatDate } from '@/shared/utils/date';

const Announcements = () => {
  const { data: announcements } = useQuery([EQueryKeys.Announcements], fetchAnnouncements);

  const TypeInfoIcon = <AnnouncementIcon className="mr-4 h-5 w-5 text-black/40 md:h-6 md:w-6" />;
  const TypeAlertIcon = <AlertInfoIcon className="mr-4 h-5 w-5 text-black/40 md:h-6 md:w-6" />;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'info':
        return TypeInfoIcon;
      case 'alert':
        return TypeAlertIcon;
      default:
        return TypeInfoIcon;
    }
  };

  return (
    <div className="p-6">
      <PageTitle title="Announcements" subtitle="Here you can manage the announcements in the platform." />

      <div className="mt-4 max-w-2xl overflow-hidden rounded-lg border  bg-white shadow-sm dark:border-white/5 dark:bg-white/5">
        {announcements?.map((announcement, i) => {
          return (
            <div
              className={`flex flex-wrap items-center justify-between border-b py-3 px-4 last:mb-0 last:border-b-0 ${
                i % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              }`}
              key={announcement.id}
            >
              <div className="flex items-center">
                {getTypeIcon(announcement.type)}
                <div className="flex-1 leading-snug">
                  <div className="flex items-center text-sm font-medium">
                    <div className="mr-2">{announcement.title}</div>
                  </div>
                  <div className="text-xs capitalize text-black/50">{announcement.type}</div>
                </div>
              </div>
              <div className="mt-4 flex items-center md:mt-0">
                <div className="text-[10px] text-gray-500 md:ml-2 md:text-right">
                  <span className="inline-block">
                    {announcement.status === 'ON' ? (
                      <div className="mb-1 rounded-lg border border-green-200 bg-green-100 p-1 text-[10px] text-green-500">
                        On
                      </div>
                    ) : (
                      <div className="mb-1 rounded-lg border border-gray-200 bg-gray-100 p-1 text-[10px] text-gray-500">
                        Off
                      </div>
                    )}
                  </span>
                  <div>On until: {formatDate(announcement.end_date)}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Announcements;
