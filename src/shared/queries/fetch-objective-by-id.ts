import { QueryFunction } from '@tanstack/react-query';
import apiRestClient from '@/shared/utils/rest-client';
import EQueryKeys from './query-keys';

const fetchObjectiveById: QueryFunction<TTHObjective, [EQueryKeys.Objective, string?]> = async ({ queryKey }) => {
  const id = queryKey[1];

  if (!id) {
    return {};
  }

  const response = await apiRestClient.get(`/objectives/${id}`);

  if (!response.data) {
    throw new Error(`Objective by id failed fetching`);
  }

  return response.data;
};

export default fetchObjectiveById;
