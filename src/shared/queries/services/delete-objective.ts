import apiRestClient from '@/shared/utils/rest-client';

const deleteObjective = async (id: string) => {
  const response = await apiRestClient.delete(`/objectives/${id}`);

  if (!response.data) {
    throw new Error(`Failed to delete objective`);
  }

  return response.data;
};

export default deleteObjective;
