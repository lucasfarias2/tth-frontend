import { QueryFunction } from '@tanstack/react-query';
import EQueryKeys from '@/shared/queries/query-keys';
import apiRestClient from '@/shared/utils/rest-client';

const fetchGoals: QueryFunction<TTHGoal[], [EQueryKeys.Goals]> = async () => {
  const response = await apiRestClient.get('/goals');

  if (!response.data) {
    throw new Error(`Goals failed fetching`);
  }

  return response.data;
};

export default fetchGoals;
