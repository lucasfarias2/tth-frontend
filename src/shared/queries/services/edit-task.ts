import apiRestClient from '@/shared/utils/rest-client';

const editTask = async (data: IEditTaskRequest) => {
  if (!data.id) {
    return {};
  }

  const response = await apiRestClient.put(`/tasks/${data.id}`, { confirmed: true });

  if (!response.data) {
    throw new Error(`Failed to edit task`);
  }

  return response.data;
};

export default editTask;
