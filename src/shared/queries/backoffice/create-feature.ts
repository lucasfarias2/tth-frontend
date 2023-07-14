import apiRestClient from '@/shared/utils/rest-client';

const createFeature = async (data: ICreateFeatureRequest) => {
  const response = await apiRestClient.post('/backoffice/features', data);

  if (!response.data) {
    throw new Error(`Failed to create feature`);
  }

  return response.data;
};

export default createFeature;
