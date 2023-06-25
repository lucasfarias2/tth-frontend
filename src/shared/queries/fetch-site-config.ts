import { QueryFunction } from '@tanstack/react-query';
import EQueryKeys from '@/shared/queries/query-keys';
import apiRestClient from '@/shared/utils/rest-client';

const fetchSiteConfig: QueryFunction<TTHUser, [EQueryKeys.User]> = async () => {
  const response = await apiRestClient.get('/site-config');

  if (!response.data) {
    throw new Error(`Site config failed fetching`);
  }

  return response.data;
};

export default fetchSiteConfig;
