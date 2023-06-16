import { QueryFunction } from '@tanstack/react-query';
import apiRestClient from '@/shared/utils/rest-client';
import EQueryKeys from './query-keys';

const fetchTaskById: QueryFunction<TTHTask, [EQueryKeys.Task, string?]> = async ({ queryKey }) => {
  const id = queryKey[1];

  if (!id) {
    return {};
  }

  const response = await apiRestClient.get(`/tasks/${id}`);

  if (!response.data) {
    throw new Error(`Task by id failed fetching`);
  }

  return response.data;
};

export default fetchTaskById;
