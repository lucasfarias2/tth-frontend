import apiRestClient from '@/shared/utils/rest-client';

const createTask = async (data: ICreateTaskRequest) => {
  const response = await apiRestClient.post('/tasks', data);

  if (!response.data) {
    throw new Error(`Failed to create task`);
  }

  return response.data;
};

export default createTask;
