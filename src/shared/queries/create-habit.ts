import apiRestClient from '@/shared/utils/rest-client';

const createHabit = async (data: ICreateHabitRequest) => {
  const response = await apiRestClient.post('/habits', data);

  if (!response.data) {
    throw new Error(`Failed to create habit`);
  }

  return response.data;
};

export default createHabit;
