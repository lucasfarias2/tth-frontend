import { QueryFunction } from '@tanstack/react-query';
import apiRestClient from '@/shared/utils/rest-client';
import EQueryKeys from './query-keys';

const fetchEffortsByWeek: QueryFunction<TTHEffort, [EQueryKeys.Efforts, number?]> = async ({ queryKey }) => {
  const week = queryKey[1];

  if (!week) {
    return {};
  }

  const response = await apiRestClient.get(`/efforts/week/${week}`);

  if (!response.data) {
    throw new Error(`Efforts by week failed fetching`);
  }

  return response.data;
};

export default fetchEffortsByWeek;
