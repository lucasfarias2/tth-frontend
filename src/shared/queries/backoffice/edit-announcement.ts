import apiRestClient from '@/shared/utils/rest-client';

const editAnnouncement = async (data: IEditAnnouncementRequest) => {
  if (!data.id) {
    return {};
  }

  const response = await apiRestClient.patch(`/backoffice/announcements/${data.id}`, data);

  if (!response.data) {
    throw new Error(`Failed to edit announcement`);
  }

  return response.data;
};

export default editAnnouncement;
