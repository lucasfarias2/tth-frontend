import { useEffect } from 'react';
import trackEvent from '@/shared/utils/ga-tracking';
import SignupForm from '@/shared/views/home/signup/components/SignupForm';

const Signup = () => {
  useEffect(() => {
    trackEvent('page_view', { title: 'signup' });
  }, []);

  return (
    <div className="with-navbar-max-height-mobile bg-gray-50 p-6">
      <div className="mb-4 text-center">
        <h1 className="mb-1 text-4xl font-bold">Sign up</h1>
        <span>Already have an account? </span>
        <a href="/login" className="text-rose-500">
          Sign in.
        </a>
      </div>
      <SignupForm />
    </div>
  );
};

export default Signup;
