import apiRestClient from '@/shared/utils/rest-client';

const createAnnouncement = async (data: ICreateAnnouncementRequest) => {
  const response = await apiRestClient.post('/announcements', data);

  if (!response.data) {
    throw new Error(`Failed to create announcement`);
  }

  return response.data;
};

export default createAnnouncement;
