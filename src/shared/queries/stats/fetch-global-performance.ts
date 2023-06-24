import { QueryFunction } from '@tanstack/react-query';
import apiRestClient from '@/shared/utils/rest-client';
import EQueryKeys from '../query-keys';

const fetchGlobalPerformance: QueryFunction<TTHGlobalPerformance[], [EQueryKeys.GlobalPerformance]> = async () => {
  const response = await apiRestClient.get(`/stats/performance/global`);

  if (!response.data) {
    throw new Error(`Failed fetching global performance`);
  }

  return response.data;
};

export default fetchGlobalPerformance;
