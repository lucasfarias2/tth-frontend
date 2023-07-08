import { useQuery } from '@tanstack/react-query';
import { CheckIcon, CloseIcon, EmailClosedIcon, EmailOpenIcon } from '@/shared/components/ui/icons';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import fetchTickets from '@/shared/queries/backoffice/fetch-tickets';
import EQueryKeys from '@/shared/queries/query-keys';
import { formatDate } from '@/shared/utils/date';

const Tickets = () => {
  const { data: tickets } = useQuery([EQueryKeys.Tickets], fetchTickets);

  const EmailOpen = <EmailOpenIcon className="mr-4 h-5 w-5 text-sky-400 md:h-6 md:w-6" />;
  const EmailClosed = <EmailClosedIcon className="mr-4 h-5 w-5 text-gray-400 md:h-6 md:w-6" />;

  return (
    <div className="p-6">
      <PageTitle title="Tickets" subtitle="Here you can manage the tickets." />

      <div className="mt-4 max-w-2xl overflow-hidden rounded-lg border  bg-white shadow-sm dark:border-white/5 dark:bg-white/5">
        {tickets?.map((ticket, i) => (
          <div
            className={`flex items-center justify-between border-b py-3 px-4 last:mb-0 last:border-b-0 ${
              i % 2 === 0 ? 'bg-white' : 'bg-gray-50'
            } flex-wrap`}
            key={ticket.id}
          >
            <div className="flex items-center">
              {ticket.status === 'open' ? EmailOpen : EmailClosed}
              <div className="flex-1 leading-snug">
                <div className="flex items-center text-sm font-medium">
                  <div className="mr-2">{ticket.title}</div>
                  <span className="inline-block">
                    {ticket.status === 'open' && (
                      <div className="rounded-lg border border-sky-200 bg-sky-100 px-1 text-[10px] text-sky-500">
                        Open
                      </div>
                    )}
                  </span>
                </div>
                <div className="text-xs text-black/50">{ticket.sender}</div>
              </div>
            </div>
            <div className="mt-4 flex items-center md:mt-0">
              <div className="text-[10px] text-gray-500 md:ml-2 md:text-right">
                <div>Created at: {formatDate(ticket.creation_date)}</div>
                <div>Last update: {formatDate(ticket.updated_date)}</div>
              </div>
              <div>
                <button
                  type="button"
                  className="ml-4 rounded-lg border bg-white p-1 text-red-600 shadow-sm hover:bg-gray-50"
                >
                  <CloseIcon className="text-lg" />
                </button>
                <button
                  type="button"
                  className="ml-1 rounded-lg border bg-white p-1 text-green-600 shadow-sm hover:bg-gray-50"
                >
                  <CheckIcon className="text-lg" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tickets;
