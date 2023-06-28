import apiRestClient from '@/shared/utils/rest-client';

const updateUser = async (data: IUpdateUserRequest) => {
  const response = await apiRestClient.patch('/user/profile', data);

  if (!response.data) {
    throw new Error(`Failed to update user profile`);
  }

  return response.data;
};

export default updateUser;
