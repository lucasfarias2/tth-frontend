import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { EmailClosedIcon, EmailOpenIcon } from '@/shared/components/ui/icons';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import fetchTickets from '@/shared/queries/backoffice/fetch-tickets';
import EQueryKeys from '@/shared/queries/query-keys';
import { formatDate } from '@/shared/utils/date';

const Tickets = () => {
  const { data: tickets } = useQuery([EQueryKeys.Tickets], fetchTickets);

  const EmailOpen = <EmailOpenIcon className="mr-4 h-5 w-5 text-sky-400 md:h-6 md:w-6" />;
  const EmailClosed = <EmailClosedIcon className="mr-4 h-5 w-5 text-gray-400 md:h-6 md:w-6" />;
  const EmailClosedResolved = <EmailClosedIcon className="mr-4 h-5 w-5 text-green-400 md:h-6 md:w-6" />;

  return (
    <div className="p-6">
      <PageTitle title="Tickets" subtitle="Here you can manage the tickets." />

      <div className="mt-4 max-w-2xl overflow-hidden rounded-lg border  bg-white shadow-sm dark:border-white/5 dark:bg-white/5">
        {tickets?.map((ticket, i) => (
          <Link
            to={`/backoffice/tickets/${ticket.id}`}
            className={`flex cursor-pointer justify-between border-b py-3 px-4 last:mb-0 last:border-b-0 md:items-center ${
              i % 2 === 0 ? 'bg-white' : 'bg-gray-50'
            } flex-col md:flex-row ${(ticket.status === 'closed' || ticket.status === 'resolved') && 'opacity-50'}`}
            key={ticket.id}
          >
            <div className="flex items-center">
              {ticket.status === 'open' ? EmailOpen : ticket.status === 'closed' ? EmailClosed : EmailClosedResolved}
              <div className="flex-1 leading-snug">
                <div className="flex items-center text-sm font-medium">
                  <div className="mr-2">{ticket.title}</div>
                </div>
                <div className="text-xs text-black/50">{ticket.sender}</div>
              </div>
            </div>
            <div className="mt-4 flex items-center md:mt-0">
              <div className="text-[10px] text-gray-500 md:ml-2 md:text-right">
                <span className="inline-block">
                  {ticket.status === 'open' ? (
                    <div className="mb-1 rounded-lg border border-sky-200 bg-sky-100 px-1 text-[10px] text-sky-500">
                      Open
                    </div>
                  ) : ticket.status === 'closed' ? (
                    <div className="mb-1 rounded-lg border border-red-200 bg-red-100 px-1 text-[10px] text-red-500">
                      Closed
                    </div>
                  ) : (
                    <div className="mb-1 rounded-lg border border-green-200 bg-green-100 px-1 text-[10px] text-green-500">
                      Resolved
                    </div>
                  )}
                </span>
                <div>Created at: {formatDate(ticket.creation_date)}</div>
                <div>Last update: {formatDate(ticket.updated_date)}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Tickets;
