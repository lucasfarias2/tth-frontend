import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useToast } from '@/shared/components/toast/ToastContext';
import Badge from '@/shared/components/ui/badge/Badge';
import CheckIcon from '@/shared/components/ui/icons/CheckIcon';
import ErrorIcon from '@/shared/components/ui/icons/ErrorIcon';
import FrequencyIcon from '@/shared/components/ui/icons/FrequencyIcon';
import PackageIcon from '@/shared/components/ui/icons/PackageIcon';
import FormInput from '@/shared/components/ui/input/FormInput';
import FormSelect from '@/shared/components/ui/select/FormSelect';
import FormSwitch from '@/shared/components/ui/switch/FormSwitch';
import editPack from '@/shared/queries/edit-pack';
import fetchCategories from '@/shared/queries/fetch-categories';
import EQueryKeys from '@/shared/queries/query-keys';
import PackDetailsRow from '../../../components/pack-details/PackDetailsRow';

const ViewPackDetails = ({
  editMode,
  setEditMode,
  packId,
  pack,
}: {
  packId: string;
  editMode: boolean;
  setEditMode: (b: boolean) => void;
  pack: SIPPack;
}) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { data: categories } = useQuery([EQueryKeys.Categories], fetchCategories);

  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({ defaultValues: { frequency: Number(pack?.frequency) } });

  const editPackMutation = useMutation(editPack, {
    onMutate: () => {
      // loading
    },
    onError: () => {
      showToast(
        'Error while editing pack',
        'error',
        'There has been an error while editing your pack, please try again later.'
      );
    },
    onSuccess: () => {
      showToast('Pack was edited successfully', 'success');
      queryClient.invalidateQueries([EQueryKeys.Packs]);
      queryClient.invalidateQueries([EQueryKeys.Pack, packId]);
      setEditMode(false);
    },
    onSettled: () => {
      // off loading
    },
  });

  useEffect(() => {
    if (pack) {
      setValue('frequency', Number(pack.frequency));
      setValue('externalLink', pack.externalLink as string);
      setValue('picture', pack.picture);
      setValue('sendEmail', pack.sendEmail);
      setValue('category', pack.category as SIPCategory);
    }
  }, [pack, setValue]);

  if (!pack) {
    return null;
  }

  const onSubmit: SubmitHandler<IFormData> = async data => {
    const { name, frequency, externalLink, sendEmail, picture, category } = data;

    editPackMutation.mutate({
      id: packId,
      name,
      frequency: Number(frequency),
      externalLink,
      sendEmail,
      picture,
      categoryId: category.id,
    });
  };

  return (
    <div className={`rounded-lg border ${editMode ? 'bg-gray-100' : 'bg-white'} p-3 shadow-sm`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="border-b px-2 pb-2 text-xs font-medium text-gray-400">Pack details</p>

        <PackDetailsRow title="Category" subtitle="This is for helping you organize your packs.">
          {editMode ? (
            <FormSelect
              name="category"
              defaultValue={pack.category}
              options={categories}
              errors={errors}
              control={control}
            />
          ) : (
            <Badge>{pack.category?.name ?? 'No category'}</Badge>
          )}
        </PackDetailsRow>

        <PackDetailsRow
          title="Frequency"
          subtitle="This parameter will be used to send you a notification whenever is time to purchase your pack."
        >
          {editMode ? (
            <FormInput name="frequency" required control={control} errors={errors} inputProps={{ type: 'number' }} />
          ) : (
            <Badge>
              <FrequencyIcon className="mr-1 text-lg" /> Every {pack.frequency} week/s
            </Badge>
          )}
        </PackDetailsRow>

        <PackDetailsRow
          title="External link"
          subtitle="We will use this link to let you know of price increases and how much money are you saving."
        >
          {editMode ? (
            <FormInput name="externalLink" control={control} errors={errors} inputProps={{ type: 'text' }} />
          ) : (
            <p className="text-sm">{pack.externalLink}</p>
          )}
        </PackDetailsRow>

        <PackDetailsRow
          title="Email notification"
          subtitle="Enable notification to be sent when it's time to purchase this pack. We have in account estimated shipping days."
        >
          {editMode ? (
            <FormSwitch name="sendEmail" control={control} />
          ) : pack.sendEmail ? (
            <div className="inline-flex items-center rounded-full border border-green-500 bg-green-50 py-1 px-2 text-xs font-semibold text-green-500">
              <CheckIcon className="mr-1 text-sm" /> Enabled
            </div>
          ) : (
            <div className="inline-flex items-center rounded-full border border-rose-600 bg-red-50 py-1 px-2 text-xs font-semibold text-rose-600">
              <ErrorIcon className="mr-1 text-sm" /> Disabled
            </div>
          )}
        </PackDetailsRow>

        <PackDetailsRow title="Picture" subtitle="Upload a new picture or fetch it from external link.">
          {pack.picture ? (
            <img
              src={pack.picture}
              alt={pack.name}
              className="mb-2 h-24 w-24 rounded-lg border bg-white object-contain p-2 shadow-sm"
            />
          ) : (
            <PackageIcon className="mr-3 rounded-lg border bg-white p-3 text-6xl text-gray-300 shadow-sm" />
          )}

          {editMode && (
            <FormInput name="picture" required control={control} errors={errors} inputProps={{ type: 'text' }} />
          )}
        </PackDetailsRow>

        {editMode && (
          <>
            <button
              type="button"
              className="mr-2 inline-block rounded-lg border bg-white px-4 py-2 text-sm font-semibold shadow-sm"
              onClick={() => {
                setEditMode(false);
              }}
            >
              Cancel
            </button>

            <input
              type="submit"
              className="mt-4 cursor-pointer rounded-lg border border-orange-400 bg-orange-400 px-4 py-2 text-sm font-semibold text-white shadow-sm"
            />
          </>
        )}
      </form>
    </div>
  );
};

interface IFormData {
  name: string;
  frequency: number;
  externalLink: string;
  sendEmail: boolean;
  picture: string;
  category: SIPCategory;
}

export default ViewPackDetails;
