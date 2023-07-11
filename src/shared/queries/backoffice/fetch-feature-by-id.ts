import { QueryFunction } from '@tanstack/react-query';
import apiRestClient from '@/shared/utils/rest-client';
import EQueryKeys from '../query-keys';

const fetchFeatureById: QueryFunction<TTHFeature, [EQueryKeys.Feature, string?]> = async ({ queryKey }) => {
  const id = queryKey[1];

  if (!id) {
    return {};
  }

  const response = await apiRestClient.get(`/backoffice/features/${id}`);

  if (!response.data) {
    throw new Error(`Feature by id failed fetching`);
  }

  return response.data;
};

export default fetchFeatureById;
