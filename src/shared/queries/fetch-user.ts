import { QueryFunction } from '@tanstack/react-query';
import EQueryKeys from '@/shared/queries/query-keys';
import apiRestClient from '@/shared/utils/rest-client';

const fetchUser: QueryFunction<TTHUser, [EQueryKeys.User]> = async () => {
  const response = await apiRestClient.get('/auth/user');

  if (!response.data) {
    throw new Error(`users failed fetching`);
  }

  return response.data;
};

export default fetchUser;
