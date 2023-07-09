import { QueryFunction } from '@tanstack/react-query';
import EQueryKeys from '@/shared/queries/query-keys';
import apiRestClient from '@/shared/utils/rest-client';

const fetchUserTickets: QueryFunction<TTHTicket[], [EQueryKeys.UserTickets]> = async () => {
  const response = await apiRestClient.get('/tickets');

  if (!response.data) {
    throw new Error('User tickets failed fetching');
  }

  return response.data;
};

export default fetchUserTickets;
