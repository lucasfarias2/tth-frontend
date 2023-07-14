import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import FormInput from '@/shared/components/ui/input/FormInput';
import FormSelect from '@/shared/components/ui/select/FormSelect';

interface IFormData {
  title: string;
  status?: TTHFeatureStatus;
  id?: string;
}

const FeatureForm = ({
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
    const { title, status } = data;

    onSubmit({
      title,
      status,
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
          inputProps={{ type: 'text', placeholder: 'Title of the feature (shown to users)' }}
        />

        <FormSelect
          name="status"
          label="Status"
          placeholder="Select a status"
          options={[
            { id: 'ontrack', name: 'On track' },
            { id: 'live', name: 'Live' },
          ]}
          errors={errors}
          control={control}
          required
        />
      </div>

      <Link
        to="/backoffice/features"
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

export default FeatureForm;
