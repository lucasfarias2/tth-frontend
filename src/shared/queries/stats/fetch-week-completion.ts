import { QueryFunction } from '@tanstack/react-query';
import apiRestClient from '@/shared/utils/rest-client';
import EQueryKeys from '../query-keys';

const fetchWeekCompletion: QueryFunction<TTHWeekCompletion, [EQueryKeys.WeekCompletion, number?]> = async ({
  queryKey,
}) => {
  const week = queryKey[1];

  if (!week) {
    return {};
  }

  const response = await apiRestClient.get(`/stats/completion/${week}`);

  if (!response.data) {
    throw new Error(`Failed fetching week completion`);
  }

  return response.data;
};

export default fetchWeekCompletion;
