import SignupForm from '@/shared/views/home/signup/components/SignupForm';

const Signup = () => {
  return (
    <div className="with-navbar-max-height-mobile bg-white p-6">
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
