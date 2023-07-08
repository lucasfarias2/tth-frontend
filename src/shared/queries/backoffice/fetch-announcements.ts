import { QueryFunction } from '@tanstack/react-query';
import EQueryKeys from '@/shared/queries/query-keys';
import apiRestClient from '@/shared/utils/rest-client';

const fetchAnnouncements: QueryFunction<TTHAnnouncement[], [EQueryKeys.Announcements]> = async () => {
  const response = await apiRestClient.get('/backoffice/announcements');

  if (!response.data) {
    throw new Error(`Announcements failed fetching`);
  }

  return response.data;
};

export default fetchAnnouncements;
