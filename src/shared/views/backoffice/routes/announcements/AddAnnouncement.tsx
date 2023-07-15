import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/shared/components/toast/ToastContext';
import PageBack from '@/shared/components/ui/page-back/PageBack';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import createAnnouncement from '@/shared/queries/backoffice/create-announcement';
import EQueryKeys from '@/shared/queries/query-keys';
import AnnouncementForm from './AnnouncementForm';

const AddAnnouncement = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const createAnnouncementMutation = useMutation(createAnnouncement, {
    onMutate: () => {
      // loading
    },
    onError: () => {
      showToast(
        'Error while creating new announcement',
        'error',
        'There has been an error while creating announcement, please try again later.'
      );
    },
    onSuccess: () => {
      navigate('/backoffice/announcements');
      queryClient.invalidateQueries([EQueryKeys.Announcements]);
      showToast('Announcement created successfully', 'success');
    },
    onSettled: () => {
      // off loading
    },
  });

  const onSubmit = (data: IFormData) => {
    const { title, content, type, date } = data;

    createAnnouncementMutation.mutate({
      title,
      content,
      type,
      starting_date: date.startDate,
      end_date: date.endDate,
    });
  };

  return (
    <div className="with-navbar-max-height-mobile p-6">
      <PageBack to="/backoffice/announcements" />
      <PageTitle title="New announcement" subtitle="Create a new feature" className="mb-4" />

      <div className="mt-4 max-w-2xl md:rounded-lg md:border md:bg-white md:p-4 md:shadow-sm">
        <AnnouncementForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

interface IFormData {
  title: string;
  content: string;
  type: TTHAnnouncementType;
  date: {
    startDate: string;
    endDate: string;
  };
  id?: string;
}

export default AddAnnouncement;
