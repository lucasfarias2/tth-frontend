import Page from '@/components/page/Page';
import SignupForm from '@/shared/views/signup/components/SignupForm';

const Signup = (props: IViewProps) => {
  const { device, initialState } = props;

  return (
    <Page className="p-8" initialState={initialState} withNavbar device={device}>
      <div className="mb-4 text-center">
        <h1 className="mb-1 text-4xl font-bold">Sign up</h1>
        <span>Already have an account? </span>
        <a href="/login" className="text-rose-500">
          Sign in.
        </a>
      </div>
      <SignupForm />
    </Page>
  );
};

export default Signup;
