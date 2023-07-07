import LoginForm from './components/LoginForm';

const Login = () => {
  return (
    <div className="with-navbar-max-height-mobile bg-white p-6">
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
