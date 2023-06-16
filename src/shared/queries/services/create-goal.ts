import apiRestClient from '@/shared/utils/rest-client';

const createGoal = async (data: ICreateGoalRequest) => {
  const response = await apiRestClient.post('/goals', data);

  if (!response.data) {
    throw new Error(`Failed to create goal`);
  }

  return response.data;
};

export default createGoal;
