import { SubmitHandler, useForm } from 'react-hook-form';
import { useToast } from '@/components/toast/ToastContext';
import FormInput from '@/components/ui/input/FormInput';
import apiRestClient from '@/shared/utils/rest-client';

const SignupForm = () => {
  const { showToast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  const onSubmit: SubmitHandler<IFormData> = async data => {
    const { password, email, name } = data;

    try {
      const response = await apiRestClient.post(`/signup`, {
        password,
        email,
        name,
      });

      if (response.data) {
        window.location.href = '/';
      }
    } catch {
      showToast('Error signing up', 'error', 'There has been an error while signing up, please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto my-0 flex max-w-lg flex-1 flex-col">
      <FormInput
        name="name"
        label="Name"
        required
        control={control}
        errors={errors}
        inputProps={{ type: 'text', placeholder: 'Name', autoComplete: 'name' }}
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

      <button type="submit" className="mt-4 cursor-pointer rounded-lg bg-orange-400 p-2 font-semibold text-white">
        Submit
      </button>
    </form>
  );
};

interface IFormData {
  email: string;
  password: string;
  name: string;
}

export default SignupForm;
