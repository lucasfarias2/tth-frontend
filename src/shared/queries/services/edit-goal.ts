import apiRestClient from '@/shared/utils/rest-client';

const editGoal = async (data: IEditGoalRequest) => {
  if (!data.id) {
    return {};
  }

  const response = await apiRestClient.put(`/goals/${data.id}`, { confirmed: true });

  if (!response.data) {
    throw new Error(`Failed to edit goal`);
  }

  return response.data;
};

export default editGoal;
