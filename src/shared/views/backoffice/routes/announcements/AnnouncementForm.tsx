import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import FormDatePicker from '@/shared/components/ui/date-picker/FormDatePicker';
import FormInput from '@/shared/components/ui/input/FormInput';
import FormSelect from '@/shared/components/ui/select/FormSelect';
import FormTextArea from '@/shared/components/ui/text-field/FormTextArea';

interface IFormData {
  title: string;
  content: string;
  type: TTHAnnouncementType;
  date: {
    startDate: string;
    endDate: string;
  };
}

const AnnouncementForm = ({
  initialValues,
  onSubmit,
}: {
  initialValues?: IFormData;
  onSubmit: (data: IFormData) => void;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({ defaultValues: initialValues });

  const internalOnSubmit: SubmitHandler<IFormData> = data => {
    const { title, content, type, date } = data;

    onSubmit({
      title,
      content,
      type,
      date,
    });
  };

  return (
    <form onSubmit={handleSubmit(internalOnSubmit)}>
      <div className="flex flex-col items-start">
        <FormInput
          name="title"
          label="Title"
          required
          control={control}
          errors={errors}
          inputProps={{ type: 'text', placeholder: 'Title of the announcement (shown to users)' }}
        />

        <FormTextArea
          name="content"
          label="Content"
          required
          control={control}
          errors={errors}
          inputProps={{ type: 'text', placeholder: 'Write the text here...', autoComplete: 'content' }}
        />

        <FormSelect
          name="type"
          label="Type"
          placeholder="Select a type"
          options={[
            { id: 'alert', name: 'Alert' },
            { id: 'info', name: 'Information' },
          ]}
          errors={errors}
          control={control}
          required
        />

        <FormDatePicker name="date" label="Date range" rules={{ required: true }} control={control} errors={errors} />
      </div>

      <Link
        to="/backoffice/announcements"
        className="mr-2 inline-block rounded-lg border bg-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-gray-50"
      >
        Cancel
      </Link>

      <input
        type="submit"
        className="mt-4 cursor-pointer rounded-lg border border-rose-400 bg-rose-400 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500"
      />
    </form>
  );
};

export default AnnouncementForm;
