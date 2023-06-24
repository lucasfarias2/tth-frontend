import apiRestClient from '@/shared/utils/rest-client';

const editEffort = async (data: IEditEffortRequest) => {
  if (!data.id) {
    return {};
  }

  const response = await apiRestClient.patch(`/efforts/${data.id}`, data);

  if (!response.data) {
    throw new Error(`Failed to edit effort`);
  }

  return response.data;
};

export default editEffort;
