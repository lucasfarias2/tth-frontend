import apiRestClient from '@/shared/utils/rest-client';

const deleteTask = async (id: string) => {
  const response = await apiRestClient.delete(`/tasks/${id}`);

  if (!response.data) {
    throw new Error(`Failed to delete task`);
  }

  return response.data;
};

export default deleteTask;
