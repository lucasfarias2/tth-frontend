import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import EmailForm from './EmailForm';

const ContactUs = () => {
  return (
    <div className="with-navbar-max-height-mobile p-6 md:px-16 2xl:px-48">
      <PageTitle
        title="Contact us"
        subtitle="Please fill out the form and we will reach back to you as soon as possible."
      />
      <div className="mt-4 max-w-lg md:rounded-lg md:border md:bg-white md:p-4 md:shadow-sm">
        <EmailForm />
      </div>
    </div>
  );
};

export default ContactUs;
