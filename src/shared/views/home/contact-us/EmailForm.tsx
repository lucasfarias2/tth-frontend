import { SubmitHandler, useForm } from 'react-hook-form';
import { useToast } from '@/components/toast/ToastContext';
import FormInput from '@/components/ui/input/FormInput';
import FormTextArea from '@/shared/components/ui/text-field/FormTextArea';
import createTicket from '@/shared/queries/create-ticket';

const EmailForm = () => {
  const { showToast } = useToast();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>();

  const onSubmit: SubmitHandler<IFormData> = async data => {
    const { title, content, sender } = data;

    try {
      const response = await createTicket({ title, content, sender });

      if (response) {
        reset();
        showToast(
          'Message sent successfully',
          'success',
          'Please check your inbox, we will reach back to you as soon as possible.'
        );
      }
    } catch {
      showToast(
        'Error submitting form',
        'error',
        'There has been an error while submitting the form, please try again later.'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-lg flex-1 flex-col">
      <FormInput
        name="title"
        label="Title"
        required
        control={control}
        errors={errors}
        inputProps={{ type: 'text', placeholder: 'Title', autoComplete: 'title' }}
      />

      <FormTextArea
        name="content"
        label="Content"
        required
        control={control}
        errors={errors}
        inputProps={{ type: 'text', placeholder: 'Write a message here...', autoComplete: 'content' }}
      />

      <FormInput
        name="sender"
        label="Email"
        required
        control={control}
        errors={errors}
        inputProps={{ type: 'email', placeholder: 'Email', autoComplete: 'email' }}
      />

      <button
        type="button"
        class="my-4 rounded-lg bg-rose-500 py-2 px-4 text-white"
        onClick={() => {
          showToast(
            'Message sent successfully',
            'success',
            'Please check your inbox, we will reach back to you as soon as possible.'
          );
        }}
      >
        asd
      </button>

      <button type="submit" className="mt-4 cursor-pointer rounded-lg bg-rose-400 p-2 font-semibold text-white">
        Send
      </button>
    </form>
  );
};

interface IFormData {
  title: string;
  content: string;
  sender: string;
}

export default EmailForm;
