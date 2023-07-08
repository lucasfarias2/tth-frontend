import { QueryFunction } from '@tanstack/react-query';
import EQueryKeys from '@/shared/queries/query-keys';
import apiRestClient from '@/shared/utils/rest-client';

const fetchUsers: QueryFunction<TTHUser[], [EQueryKeys.Users]> = async () => {
  const response = await apiRestClient.get('/backoffice/users');

  if (!response.data) {
    throw new Error(`Users failed fetching`);
  }

  return response.data;
};

export default fetchUsers;
