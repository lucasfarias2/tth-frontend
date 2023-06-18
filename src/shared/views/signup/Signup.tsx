import Page from '@/components/page/Page';
import SignupForm from '@/shared/views/signup/components/SignupForm';

const Signup = (props: IViewProps) => {
  return (
    <Page className="p-8" initialState={props.initialState} withNavbar>
      <div className="mb-4 text-center">
        <h1 className="mb-1 text-4xl font-bold">Create new account</h1>
        <span className="text-center">Already have an account? </span>
        <a href="/login" className="text-rose-500">
          Sign in.
        </a>
      </div>
      <SignupForm />
    </Page>
  );
};

export default Signup;
