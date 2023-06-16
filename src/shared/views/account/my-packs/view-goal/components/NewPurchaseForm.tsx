import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useToast } from '@/components/toast/ToastContext';
import FormDatePicker from '@/shared/components/ui/date-picker/FormDatePicker';
import FormInput from '@/shared/components/ui/input/FormInput';
import createPurchase from '@/shared/queries/create-purchase';
import EQueryKeys from '@/shared/queries/query-keys';

const NewPurchaseForm = ({ setEditMode }: { setEditMode: (b: boolean) => void }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  const { packId } = useParams();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const createPurchaseMutation = useMutation(createPurchase, {
    onMutate: () => {
      // loading
    },
    onError: () => {
      showToast(
        'Error while adding new purchase',
        'error',
        'There has been an error while adding the purchase, please try again later.'
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries([EQueryKeys.Purchases, packId]);
      showToast('Purchase added successfully', 'success');
      setEditMode(false);
    },
    onSettled: () => {
      // off loading
    },
  });

  const onSubmit: SubmitHandler<IFormData> = async data => {
    const { purchasedAt, price } = data;

    createPurchaseMutation.mutate({
      purchasedAt: purchasedAt.startDate,
      price,
      packId,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg rounded-lg border bg-gray-100 p-4 shadow-sm">
      <div className="flex flex-col items-start">
        <FormDatePicker
          name="purchasedAt"
          label="Purchased at"
          rules={{ required: true }}
          control={control}
          errors={errors}
        />

        <FormInput
          name="price"
          label="Price"
          rules={{ required: true }}
          control={control}
          errors={errors}
          inputProps={{ type: 'number', placeholder: 'How much did you pay?' }}
        />
      </div>

      <button
        type="button"
        className="mr-2 inline-block rounded-lg border bg-white px-4 py-2 text-sm font-semibold shadow-sm hover:shadow"
        onClick={() => {
          setEditMode(false);
        }}
      >
        Cancel
      </button>

      <input
        type="submit"
        className="mt-4 cursor-pointer rounded-lg border border-orange-400 bg-orange-400 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:shadow"
      />
    </form>
  );
};

interface IFormData {
  purchasedAt: {
    startDate: Date;
    endDate: Date;
  };
  price: number;
}

export default NewPurchaseForm;
