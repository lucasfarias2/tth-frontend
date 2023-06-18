import { QueryFunction } from '@tanstack/react-query';
import EQueryKeys from '@/shared/queries/query-keys';
import apiRestClient from '@/shared/utils/rest-client';

const fetchTasks: QueryFunction<TTHGoal[], [EQueryKeys.Tasks]> = async () => {
  const response = await apiRestClient.get('/tasks');

  if (!response.data) {
    throw new Error(`Tasks failed fetching`);
  }

  return response.data;
};

export default fetchTasks;
