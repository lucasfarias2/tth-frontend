import apiRestClient from '@/shared/utils/rest-client';

const deleteGoal = async (id: string) => {
  const response = await apiRestClient.delete(`/goals/${id}`);

  if (!response.data) {
    throw new Error(`Failed to delete goal`);
  }

  return response.data;
};

export default deleteGoal;
