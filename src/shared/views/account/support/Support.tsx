import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Badge from '@/shared/components/badge/Badge';
import { AddIcon, EmailClosedIcon, EmailOpenIcon } from '@/shared/components/ui/icons';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import { DeviceContext } from '@/shared/contexts/DeviceContext';
import fetchUserTickets from '@/shared/queries/fetch-user-tickets';
import EQueryKeys from '@/shared/queries/query-keys';
import { formatDate } from '@/shared/utils/date';
import trackEvent from '@/shared/utils/ga-tracking';

const Support = () => {
  const { data: tickets } = useQuery([EQueryKeys.UserTickets], fetchUserTickets);

  const device = useContext(DeviceContext);

  const EmailOpen = <EmailOpenIcon className="mr-4 h-5 w-5 text-sky-400 md:h-6 md:w-6" />;
  const EmailClosed = <EmailClosedIcon className="mr-4 h-5 w-5 text-red-400 md:h-6 md:w-6" />;
  const EmailClosedResolved = <EmailClosedIcon className="mr-4 h-5 w-5 text-green-400 md:h-6 md:w-6" />;

  useEffect(() => {
    trackEvent('page_view', { title: 'account_support' });
  }, []);

  return (
    <div className="p-6">
      <div className="flex max-w-2xl items-center justify-between">
        <PageTitle title="Support" subtitle="Manage your support tickets." />
        <Link
          to="/account/support/add"
          className="flex cursor-pointer items-center rounded-lg border bg-white py-2 px-3 text-xs font-medium shadow-sm hover:bg-gray-50 md:text-sm"
        >
          <AddIcon className="mr-2 text-lg" />
          New ticket
        </Link>
      </div>

      <div className="mt-4 max-w-2xl overflow-hidden rounded-lg border  bg-white shadow-sm dark:border-white/5 dark:bg-white/5">
        {tickets?.map((ticket, i) => (
          <div
            className={`flex justify-between border-b py-3 px-4 last:mb-0 last:border-b-0 md:items-center ${
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
                <div className="mt-1 text-[10px] text-black/40">Created at: {formatDate(ticket.creation_date)}</div>
                {device.type === 'mobile' && (
                  <div className="mt-2 flex items-center">
                    {ticket.status === 'open' ? (
                      <Badge color="blue" text="Open" size="xs" />
                    ) : ticket.status === 'closed' ? (
                      <Badge color="red" text="Closed" size="xs" />
                    ) : (
                      <Badge color="green" text="Resolved" size="xs" />
                    )}
                  </div>
                )}
              </div>
            </div>
            {device.type === 'desktop' && (
              <div className="mt-1 flex items-center">
                {ticket.status === 'open' ? (
                  <Badge color="blue" text="Open" size="xs" />
                ) : ticket.status === 'closed' ? (
                  <Badge color="red" text="Closed" size="xs" />
                ) : (
                  <Badge color="green" text="Resolved" size="xs" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Support;
