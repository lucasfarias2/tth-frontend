import { QueryFunction } from '@tanstack/react-query';
import EQueryKeys from '@/shared/queries/query-keys';
import apiRestClient from '@/shared/utils/rest-client';

const fetchFeaturesPublic: QueryFunction<TTHFeature[], [EQueryKeys.FeaturesPublic]> = async () => {
  const response = await apiRestClient.get('/features');

  if (!response.data) {
    throw new Error('Features public failed fetching');
  }

  return response.data;
};

export default fetchFeaturesPublic;
