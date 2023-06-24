import { QueryFunction } from '@tanstack/react-query';
import EQueryKeys from '@/shared/queries/query-keys';
import apiRestClient from '@/shared/utils/rest-client';

const fetchHabits: QueryFunction<TTHHabit[], [EQueryKeys.Habits, number?]> = async ({ queryKey }) => {
  const week = queryKey[1];

  const response = await apiRestClient.get('/habits', { params: { week } });

  if (!response.data) {
    throw new Error(`Habits failed fetching`);
  }

  return response.data;
};

export default fetchHabits;
