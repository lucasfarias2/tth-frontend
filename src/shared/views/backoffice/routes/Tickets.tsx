import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Badge from '@/shared/components/badge/Badge';
import { EmailClosedIcon, EmailOpenIcon } from '@/shared/components/ui/icons';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import { DeviceContext } from '@/shared/contexts/DeviceContext';
import fetchTickets from '@/shared/queries/backoffice/fetch-tickets';
import EQueryKeys from '@/shared/queries/query-keys';
import { formatDate } from '@/shared/utils/date';

const Tickets = () => {
  const { data: tickets } = useQuery([EQueryKeys.Tickets], fetchTickets);
  const device = useContext(DeviceContext);

  const EmailOpen = <EmailOpenIcon className="mr-4 h-5 w-5 text-sky-400 md:h-6 md:w-6" />;
  const EmailClosed = <EmailClosedIcon className="mr-4 h-5 w-5 text-red-400 md:h-6 md:w-6" />;
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
                <div className="mt-1 text-[10px] text-black/40">Created at: {formatDate(ticket.creation_date)}</div>
              </div>
            </div>
            <div className="flex items-center">
              {device.type === 'desktop' && (
                <span className="inline-block">
                  {ticket.status === 'open' ? (
                    <Badge color="blue" text="Open" size="xs" />
                  ) : ticket.status === 'closed' ? (
                    <Badge color="red" text="Closed" size="xs" />
                  ) : (
                    <Badge color="green" text="Resolved" size="xs" />
                  )}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Tickets;
