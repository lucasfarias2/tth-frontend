import apiRestClient from '@/shared/utils/rest-client';

const createTicket = async (data: ICreateTicketRequest) => {
  const response = await apiRestClient.post('/tickets', data);

  if (!response.data) {
    throw new Error(`Failed to create ticket`);
  }

  return response.data;
};

export default createTicket;
