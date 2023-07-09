import apiRestClient from '@/shared/utils/rest-client';

const editTicket = async (data: IEditTicketRequest) => {
  if (!data.id) {
    return {};
  }

  const response = await apiRestClient.patch(`/backoffice/tickets/${data.id}`, data);

  if (!response.data) {
    throw new Error(`Failed to edit ticket`);
  }

  return response.data;
};

export default editTicket;
