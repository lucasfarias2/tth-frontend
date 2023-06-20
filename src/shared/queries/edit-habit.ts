import apiRestClient from '@/shared/utils/rest-client';

const editHabit = async (data: IEditHabitRequest) => {
  if (!data.id) {
    return {};
  }

  const response = await apiRestClient.patch(`/habits/${data.id}`, data);

  if (!response.data) {
    throw new Error(`Failed to edit habit`);
  }

  return response.data;
};

export default editHabit;
