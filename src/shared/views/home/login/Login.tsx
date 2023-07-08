import { useEffect } from 'react';
import trackEvent from '@/shared/utils/ga-tracking';
import LoginForm from './components/LoginForm';

const Login = () => {
  useEffect(() => {
    trackEvent('page_view', { title: 'login' });
  }, []);

  return (
    <div className="with-navbar-max-height-mobile bg-gray-50 p-6">
      <div className="mb-4 text-center">
        <h1 className="mb-1 text-4xl font-bold">Sign in</h1>
        <span>{`Don't have an account yet?`} </span>
        <a href="/signup" className="text-rose-500">
          Create a new account.
        </a>
      </div>

      <LoginForm />
    </div>
  );
};

export default Login;
