import apiRestClient from '@/shared/utils/rest-client';

const editObjective = async (data: IEditObjectiveRequest) => {
  if (!data.id) {
    return {};
  }

  const response = await apiRestClient.put(`/objectives/${data.id}`, { confirmed: true });

  if (!response.data) {
    throw new Error(`Failed to edit objective`);
  }

  return response.data;
};

export default editObjective;
