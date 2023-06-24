import apiRestClient from '@/shared/utils/rest-client';

const createEffort = async (data: ICreateEffortRequest) => {
  const response = await apiRestClient.post('/efforts', data);

  if (!response.data) {
    throw new Error(`Failed to create effort`);
  }

  return response.data;
};

export default createEffort;
