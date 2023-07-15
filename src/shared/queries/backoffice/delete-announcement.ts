import apiRestClient from '@/shared/utils/rest-client';

const deleteAnnouncement = async (id?: string) => {
  if (!id) {
    return {};
  }

  const response = await apiRestClient.delete(`/backoffice/announcements/${id}`);

  if (response.status !== 200) {
    throw new Error(`Failed to delete announcement`);
  }

  return response.data;
};

export default deleteAnnouncement;
