import { QueryFunction } from '@tanstack/react-query';
import EQueryKeys from '@/shared/queries/query-keys';
import apiRestClient from '@/shared/utils/rest-client';

const fetchHome: QueryFunction<TTHHome[], [EQueryKeys.Home]> = async () => {
  const response = await apiRestClient.get('/home');

  if (!response.data) {
    throw new Error(`Home failed fetching`);
  }

  return response.data;
};

export default fetchHome;
