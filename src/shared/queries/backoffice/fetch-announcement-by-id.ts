import { QueryFunction } from '@tanstack/react-query';
import apiRestClient from '@/shared/utils/rest-client';
import EQueryKeys from '../query-keys';

const fetchAnnouncementById: QueryFunction<TTHAnnouncement, [EQueryKeys.Announcement, string?]> = async ({
  queryKey,
}) => {
  const id = queryKey[1];

  if (!id) {
    return {};
  }

  const response = await apiRestClient.get(`/backoffice/announcements/${id}`);

  if (!response.data) {
    throw new Error(`Announcement by id failed fetching`);
  }

  return response.data;
};

export default fetchAnnouncementById;
