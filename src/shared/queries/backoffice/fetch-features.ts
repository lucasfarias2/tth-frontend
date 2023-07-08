import { QueryFunction } from '@tanstack/react-query';
import EQueryKeys from '@/shared/queries/query-keys';
import apiRestClient from '@/shared/utils/rest-client';

const fetchFeatures: QueryFunction<TTHFeature[], [EQueryKeys.Features]> = async () => {
  const response = await apiRestClient.get('/backoffice/features');

  if (!response.data) {
    throw new Error('Features failed fetching');
  }

  return response.data;
};

export default fetchFeatures;
