import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Badge from '@/shared/components/badge/Badge';
import { useToast } from '@/shared/components/toast/ToastContext';
import ConfirmModal from '@/shared/components/ui/confirm-modal/ConfirmModal';
import { RemoveIcon } from '@/shared/components/ui/icons';
import PageBack from '@/shared/components/ui/page-back/PageBack';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import { DeviceContext } from '@/shared/contexts/DeviceContext';
import deleteAnnouncement from '@/shared/queries/backoffice/delete-announcement';
import editAnnouncement from '@/shared/queries/backoffice/edit-announcement';
import fetchAnnouncementById from '@/shared/queries/backoffice/fetch-announcement-by-id';
import EQueryKeys from '@/shared/queries/query-keys';
import AnnouncementForm from './AnnouncementForm';

const ViewAnnouncement = () => {
  const { id } = useParams();
  const { data: announcement } = useQuery([EQueryKeys.Announcement, id], fetchAnnouncementById);
  const device = useContext(DeviceContext);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const editAnnouncementMutation = useMutation(editAnnouncement, {
    onMutate: () => {
      // loading
    },
    onError: () => {
      showToast(
        'Error while editing announcement',
        'error',
        'There has been an error while editing announcement, please try again later.'
      );
    },
    onSuccess: () => {
      navigate('/backoffice/announcements');

      queryClient.invalidateQueries([EQueryKeys.Announcements]);
      queryClient.invalidateQueries([EQueryKeys.Announcement, id]);
      showToast('Announcement updated successfully', 'success');
    },
    onSettled: () => {
      // off loading
    },
  });

  const deleteAnnouncementMutation = useMutation(deleteAnnouncement, {
    onMutate: () => {
      // loading
    },
    onError: () => {
      showToast('Error while deleting announcement', 'error', 'Please try again later.');
    },
    onSuccess: () => {
      navigate('/backoffice/announcements');
      showToast('Announcement was successfully removed', 'success');
      queryClient.invalidateQueries([EQueryKeys.Announcements]);
    },
    onSettled: () => {
      // off loading
    },
  });

  const handleClickRemove = () => {
    deleteAnnouncementMutation.mutate(id);
  };

  const onSubmit = (data: IFormData) => {
    const { title, content, type, date } = data;

    editAnnouncementMutation.mutate({
      id,
      title,
      content,
      type,
      starting_date: date.startDate,
      end_date: date.endDate,
    });
  };

  const fullScreenClasses = device.type === 'mobile' ? 'h-full bg-gray-50 fixed top-0 w-full' : '';

  return (
    <div className={`p-6 md:max-w-2xl ${fullScreenClasses}`}>
      <PageBack to="/backoffice/announcements" />
      <div className="mb-4 flex items-end justify-between">
        {announcement && (
          <>
            <div className="flex items-center justify-center">
              <PageTitle title={announcement.title} subtitle={`Type: ${announcement.type}`} />
              <div className="ml-4">
                {announcement.status === 'ON' ? (
                  <Badge color="green" text="Active" size="xs" />
                ) : (
                  <Badge color="red" text="Inactive" size="xs" />
                )}
              </div>
            </div>
          </>
        )}
        <div className="mt-4 flex md:mt-0">
          <div
            onClick={() => setIsConfirmModalOpen(true)}
            className="flex cursor-pointer items-center rounded-lg border bg-white p-2 text-xs font-medium text-red-600 shadow-sm hover:bg-gray-50"
          >
            <RemoveIcon className="mr-1 text-base" /> Delete
          </div>
        </div>
      </div>

      {announcement && (
        <div className="mb-2 rounded-lg border bg-white p-4 shadow-sm">
          <AnnouncementForm
            initialValues={{
              title: announcement.title,
              content: announcement.content,
              type: announcement.type,
              date: { startDate: announcement.starting_date, endDate: announcement.end_date },
            }}
            onSubmit={onSubmit}
          />
        </div>
      )}

      <ConfirmModal
        title="Delete feature"
        text="Are you sure you want to delete this feature?"
        confirmButtonText="Confirm"
        cancelButtonText="Cancel"
        onConfirm={handleClickRemove}
        onCancel={() => setIsConfirmModalOpen(false)}
        isOpen={isConfirmModalOpen}
      />
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

export default ViewAnnouncement;
