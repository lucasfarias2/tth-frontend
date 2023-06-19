import { QueryFunction } from '@tanstack/react-query';
import EQueryKeys from '@/shared/queries/query-keys';
import apiRestClient from '@/shared/utils/rest-client';

const fetchHabits: QueryFunction<TTHHabit[], [EQueryKeys.Habits]> = async () => {
  const response = await apiRestClient.get('/habits');

  if (!response.data) {
    throw new Error(`Habits failed fetching`);
  }

  return response.data;
};

export default fetchHabits;
