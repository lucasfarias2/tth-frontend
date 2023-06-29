import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useToast } from '@/components/toast/ToastContext';
import FormInput from '@/components/ui/input/FormInput';
import EQueryKeys from '@/shared/queries/query-keys';
import updateUser from '@/shared/queries/update-user';

interface IProps {
  setEditMode: (value: boolean) => void;
}

const UserProfileForm = ({ setEditMode }: IProps) => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData([EQueryKeys.User]) as TTHUser;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: { first_name: user.first_name, last_name: user.last_name, email: user.email },
  });

  const updateUserProfileMutation = useMutation(updateUser, {
    onMutate: () => {
      // loading
    },
    onError: () => {
      showToast(
        'Error while updating your profile',
        'error',
        'There has been an error while saving, please try again later.'
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries([EQueryKeys.User]);
      showToast('User updated successfully', 'success');
      setEditMode(false);
    },
    onSettled: () => {
      // off loading
    },
  });

  const onSubmit: SubmitHandler<IFormData> = data => {
    const { email, password, currentPassword, last_name, first_name } = data;

    updateUserProfileMutation.mutate({
      email,
      password: password ? password : undefined,
      old_password: currentPassword,
      last_name,
      first_name,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="flex flex-col">
        <div className="mb-4 flex items-start justify-between border-b px-2 pb-6">
          <p className="text-xs text-gray-500">First name</p>
          <span className="w-1/2 font-medium">
            <FormInput
              name="first_name"
              control={control}
              errors={errors}
              inputProps={{ type: 'text', placeholder: 'First name', autoComplete: 'first_name' }}
            />
          </span>
        </div>

        <div className="mb-4 flex items-start justify-between border-b px-2 pb-6">
          <p className="text-xs text-gray-500">Last name</p>
          <span className="w-1/2 font-medium">
            <FormInput
              name="last_name"
              control={control}
              errors={errors}
              inputProps={{ type: 'text', placeholder: 'Last name', autoComplete: 'last_name' }}
            />
          </span>
        </div>

        <div className="mb-4 flex items-start justify-between border-b px-2 pb-6">
          <p className="text-xs text-gray-500">Email</p>
          <span className="w-1/2 font-medium">
            <FormInput
              name="email"
              control={control}
              errors={errors}
              inputProps={{ type: 'email', placeholder: 'Email', autoComplete: 'email' }}
            />
          </span>
        </div>

        <div className="mb-4 flex items-start justify-between border-b px-2 pb-6">
          <p className="text-xs text-gray-500">New password</p>
          <span className="w-1/2 font-medium">
            <FormInput
              name="password"
              control={control}
              errors={errors}
              inputProps={{ type: 'password', placeholder: 'New password', autoComplete: 'new-password' }}
            />
          </span>
        </div>

        <div className="flex items-start justify-between border-b px-2 pb-6">
          <p className="text-xs text-gray-500">Current password</p>
          <span className="w-1/2 font-medium">
            <FormInput
              name="currentPassword"
              required
              control={control}
              errors={errors}
              inputProps={{ type: 'password', placeholder: 'Current password', autoComplete: 'old-password' }}
            />
          </span>
        </div>
      </div>

      <button
        onClick={() => {
          setEditMode(false);
        }}
        type="button"
        className="mr-2 inline-block rounded-lg border bg-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-gray-50"
      >
        Cancel
      </button>

      <input
        type="submit"
        className="mt-4 cursor-pointer rounded-lg border border-rose-400 bg-rose-400 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500"
      />
    </form>
  );
};

interface IFormData {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  currentPassword: string;
}

export default UserProfileForm;
