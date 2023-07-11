import apiRestClient from '@/shared/utils/rest-client';

const editFeature = async (data: IEditFeatureRequest) => {
  if (!data.id) {
    return {};
  }

  const response = await apiRestClient.patch(`/backoffice/features/${data.id}`, data);

  if (!response.data) {
    throw new Error(`Failed to edit feature`);
  }

  return response.data;
};

export default editFeature;
