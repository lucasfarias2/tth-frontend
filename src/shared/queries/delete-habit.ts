import apiRestClient from '@/shared/utils/rest-client';

const deleteHabit = async (id: string) => {
  const response = await apiRestClient.delete(`/habits/${id}`);

  if (response.status !== 200) {
    throw new Error(`Failed to delete habit`);
  }

  return response.data;
};

export default deleteHabit;
