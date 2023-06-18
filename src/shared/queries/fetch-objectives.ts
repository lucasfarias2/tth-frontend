import { QueryFunction } from '@tanstack/react-query';
import EQueryKeys from '@/shared/queries/query-keys';
import apiRestClient from '@/shared/utils/rest-client';

const fetchObjectives: QueryFunction<TTHGoal[], [EQueryKeys.Objectives]> = async () => {
  const response = await apiRestClient.get('/objectives');

  if (!response.data) {
    throw new Error(`Objectives failed fetching`);
  }

  return response.data;
};

export default fetchObjectives;
