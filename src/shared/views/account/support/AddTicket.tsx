import { useEffect } from 'react';
import PageBack from '@/shared/components/ui/page-back/PageBack';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import trackEvent from '@/shared/utils/ga-tracking';
import EmailForm from '../../home/contact-us/EmailForm';

const AddTicket = () => {
  useEffect(() => {
    trackEvent('page_view', { title: 'account_support_add_ticket' });
  }, []);

  return (
    <div className="with-navbar-max-height-mobile p-6">
      <PageBack to="/account/support" />
      <PageTitle title="New ticket" subtitle="Open a new support ticket." className="mb-4" />

      <div className="mt-4 max-w-2xl md:rounded-lg md:border md:bg-white md:p-4 md:shadow-sm">
        <EmailForm />
      </div>
    </div>
  );
};

export default AddTicket;
