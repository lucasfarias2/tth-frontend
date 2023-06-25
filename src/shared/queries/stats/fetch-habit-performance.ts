import { QueryFunction } from '@tanstack/react-query';
import apiRestClient from '@/shared/utils/rest-client';
import EQueryKeys from '../query-keys';

const fetchHabitPerformance: QueryFunction<TTHHabitPerformance, [EQueryKeys.HabitPerformance, number?]> = async ({
  queryKey,
}) => {
  const habit = queryKey[1];

  if (!habit) {
    return [];
  }

  const response = await apiRestClient.get(`/stats/performance/${habit}`);

  if (!response.data) {
    throw new Error(`Failed fetching habit performance`);
  }

  return response.data;
};

export default fetchHabitPerformance;
