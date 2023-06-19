import { QueryFunction } from '@tanstack/react-query';
import apiRestClient from '@/shared/utils/rest-client';
import EQueryKeys from './query-keys';

const fetchHabitbyId: QueryFunction<TTHHabit, [EQueryKeys.Habit, string?]> = async ({ queryKey }) => {
  const id = queryKey[1];

  if (!id) {
    return {};
  }

  const response = await apiRestClient.get(`/habits/${id}`);

  if (!response.data) {
    throw new Error(`Habit by id failed fetching`);
  }

  return response.data;
};

export default fetchHabitbyId;
