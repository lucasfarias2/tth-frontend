import { QueryFunction } from '@tanstack/react-query';
import EQueryKeys from '@/shared/queries/query-keys';
import apiRestClient from '@/shared/utils/rest-client';

const fetchTickets: QueryFunction<TTHTicket[], [EQueryKeys.Tickets]> = async () => {
  const response = await apiRestClient.get('/backoffice/tickets');

  if (!response.data) {
    throw new Error(`Tickets failed fetching`);
  }

  return response.data;
};

export default fetchTickets;
