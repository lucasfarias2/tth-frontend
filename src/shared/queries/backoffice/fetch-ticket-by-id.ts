import { QueryFunction } from '@tanstack/react-query';
import apiRestClient from '@/shared/utils/rest-client';
import EQueryKeys from '../query-keys';

const fetchTicketById: QueryFunction<TTHTicket, [EQueryKeys.Ticket, string?]> = async ({ queryKey }) => {
  const id = queryKey[1];

  if (!id) {
    return {};
  }

  const response = await apiRestClient.get(`/backoffice/tickets/${id}`);

  if (!response.data) {
    throw new Error(`Ticket by id failed fetching`);
  }

  return response.data;
};

export default fetchTicketById;
