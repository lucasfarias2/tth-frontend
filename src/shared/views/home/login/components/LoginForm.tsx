import { SubmitHandler, useForm } from 'react-hook-form';
import { useToast } from '@/components/toast/ToastContext';
import FormInput from '@/components/ui/input/FormInput';
import apiRestClient from '@/shared/utils/rest-client';

const LoginForm = () => {
  const { showToast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  const onSubmit: SubmitHandler<IFormData> = async data => {
    const { password, email } = data;

    try {
      const response = await apiRestClient.post(`/login`, {
        password,
        email,
      });

      if (response.data) {
        window.location.href = '/';
      }
    } catch {
      showToast(
        'Error while logging in',
        'error',
        'There has been an error while signing you in, please try again later.'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-0 mx-auto flex max-w-lg flex-1 flex-col">
      <FormInput
        name="email"
        label="Email"
        required
        control={control}
        errors={errors}
        inputProps={{ type: 'text', placeholder: 'Email', autoComplete: 'email' }}
      />

      <FormInput
        name="password"
        label="Password"
        required
        control={control}
        errors={errors}
        inputProps={{ type: 'password', placeholder: 'Password', autoComplete: 'current-password' }}
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
}

export default LoginForm;
