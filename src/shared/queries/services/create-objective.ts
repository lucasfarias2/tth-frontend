import apiRestClient from '@/shared/utils/rest-client';

const createObjective = async (data: ICreateObjectiveRequest) => {
  const response = await apiRestClient.post('/objectives', data);

  if (!response.data) {
    throw new Error(`Failed to create objective`);
  }

  return response.data;
};

export default createObjective;
