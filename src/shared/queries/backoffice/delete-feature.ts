import apiRestClient from '@/shared/utils/rest-client';

const deleteFeature = async (id?: string) => {
  if (!id) {
    return {};
  }

  const response = await apiRestClient.delete(`/backoffice/features/${id}`);

  if (response.status !== 200) {
    throw new Error(`Failed to delete feature`);
  }

  return response.data;
};

export default deleteFeature;
