import { SubmitHandler, useForm } from 'react-hook-form';
import { useToast } from '@/components/toast/ToastContext';
import FormInput from '@/components/ui/input/FormInput';
import trackEvent from '@/shared/utils/ga-tracking';
import apiRestClient from '@/shared/utils/rest-client';

const SignupForm = () => {
  const { showToast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  const onSubmit: SubmitHandler<IFormData> = async data => {
    const { password, email, first_name, last_name } = data;

    try {
      const response = await apiRestClient.post(`/signup`, {
        password,
        email,
        first_name,
        last_name,
      });

      if (response.data) {
        window.location.href = '/';
        trackEvent('signup_success', { email });
      }
    } catch {
      trackEvent('signup_error', { email });
      showToast('Error signing up', 'error', 'There has been an error while signing up, please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto my-0 flex max-w-lg flex-1 flex-col">
      <FormInput
        name="first_name"
        label="First name"
        required
        control={control}
        errors={errors}
        inputProps={{ type: 'text', placeholder: 'First name', autoComplete: 'first_name' }}
      />

      <FormInput
        name="last_name"
        label="Last name"
        required
        control={control}
        errors={errors}
        inputProps={{ type: 'text', placeholder: 'Last name', autoComplete: 'last_name' }}
      />

      <FormInput
        name="email"
        label="Email"
        required
        control={control}
        errors={errors}
        inputProps={{ type: 'email', placeholder: 'Email', autoComplete: 'email' }}
      />

      <FormInput
        name="password"
        label="Password"
        required
        control={control}
        errors={errors}
        inputProps={{ type: 'password', placeholder: 'Password', autoComplete: 'new-password' }}
      />

      <button type="submit" className="mt-4 cursor-pointer rounded-lg bg-rose-400 p-2 font-semibold text-white">
        Submit
      </button>
    </form>
  );
};

interface IFormData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export default SignupForm;
