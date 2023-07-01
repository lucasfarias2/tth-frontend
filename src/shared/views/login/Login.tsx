import Page from '@/components/page/Page';
import LoginForm from './components/LoginForm';

const Login = (props: IViewProps) => {
  const { device, initialState } = props;

  return (
    <Page className="p-8" initialState={initialState} device={device} withNavbar>
      <div className="mb-4 text-center">
        <h1 className="mb-1 text-4xl font-bold">Sign in</h1>
        <span>{`Don't have an account yet?`} </span>
        <a href="/signup" className="text-rose-500">
          Create a new account.
        </a>
      </div>

      <LoginForm />
    </Page>
  );
};

export default Login;
