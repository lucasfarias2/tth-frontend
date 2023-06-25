import { QueryFunction } from '@tanstack/react-query';
import apiRestClient from '@/shared/utils/rest-client';
import EQueryKeys from '../query-keys';

const fetchRecentCompletion: QueryFunction<TTHRecentCompletion[], [EQueryKeys.RecentCompletion, number?]> = async ({
  queryKey,
}) => {
  const week = queryKey[1];

  if (!week) {
    return [];
  }

  const response = await apiRestClient.get(`/stats/completion/${week}/recent`);

  if (!response.data) {
    throw new Error(`Failed fetching recent completion`);
  }

  return response.data;
};

export default fetchRecentCompletion;
