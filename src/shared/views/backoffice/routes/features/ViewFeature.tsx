import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Badge from '@/shared/components/badge/Badge';
import { useToast } from '@/shared/components/toast/ToastContext';
import ConfirmModal from '@/shared/components/ui/confirm-modal/ConfirmModal';
import { RemoveIcon } from '@/shared/components/ui/icons';
import PageBack from '@/shared/components/ui/page-back/PageBack';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import { DeviceContext } from '@/shared/contexts/DeviceContext';
import deleteFeature from '@/shared/queries/backoffice/delete-feature';
import editFeature from '@/shared/queries/backoffice/edit-feature';
import fetchFeatureById from '@/shared/queries/backoffice/fetch-feature-by-id';
import EQueryKeys from '@/shared/queries/query-keys';
import { formatDate } from '@/shared/utils/date';
import FeatureForm from './FeatureForm';

const ViewFeature = () => {
  const { id } = useParams();
  const { data: feature } = useQuery([EQueryKeys.Feature, id], fetchFeatureById);
  const device = useContext(DeviceContext);
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const editFeatureMutation = useMutation(editFeature, {
    onMutate: () => {
      // loading
    },
    onError: () => {
      showToast(
        'Error while editing feature',
        'error',
        'There has been an error while editing feature, please try again later.'
      );
    },
    onSuccess: () => {
      navigate('/backoffice/features');

      queryClient.invalidateQueries([EQueryKeys.Features]);
      queryClient.invalidateQueries([EQueryKeys.Feature, id]);
      showToast('Feature updated successfully', 'success');
    },
    onSettled: () => {
      // off loading
    },
  });

  const deleteFeatureMutation = useMutation(deleteFeature, {
    onMutate: () => {
      // loading
    },
    onError: () => {
      showToast('Error while deleting feature', 'error', 'Please try again later.');
    },
    onSuccess: () => {
      navigate('/backoffice/features');
      showToast('Feature was successfully removed', 'success');
      queryClient.invalidateQueries([EQueryKeys.Features]);
    },
    onSettled: () => {
      // off loading
    },
  });

  const handleClickRemove = () => {
    deleteFeatureMutation.mutate(id);
  };

  const onSubmit = (data: IFormData) => {
    const { status, title } = data;

    editFeatureMutation.mutate({
      id,
      status,
      title,
    });
  };

  const fullScreenClasses = device.type === 'mobile' ? 'h-full bg-gray-50 fixed top-0 w-full' : '';

  return (
    <div className={`p-6 md:max-w-2xl ${fullScreenClasses}`}>
      <PageBack to="/backoffice/features" />
      <div className="mb-4 flex items-end justify-between">
        {feature && (
          <>
            <div className="flex items-center justify-center">
              <PageTitle title={feature.title} subtitle={`Updated at: ${formatDate(feature.updated_date)}`} />
            </div>
          </>
        )}
        <div className="mt-4 flex md:mt-0">
          <div
            onClick={() => setIsConfirmModalOpen(true)}
            className="flex cursor-pointer items-center rounded-lg border bg-white p-2 text-xs font-medium text-red-600 shadow-sm hover:bg-gray-50"
          >
            <RemoveIcon className="mr-1 text-base" /> Delete
          </div>
        </div>
      </div>

      {feature && (
        <div className="mb-2 rounded-lg border bg-white p-4 shadow-sm">
          <p className="mb-2 text-xs text-black/50">Created at: {formatDate(feature.creation_date)}</p>
          <div className="mb-4 inline-block">
            {feature.status === 'ontrack' ? (
              <Badge color="blue" text="On track" size="xs" />
            ) : (
              <Badge color="green" text="Live" size="xs" />
            )}
          </div>

          <FeatureForm initialValues={feature} onSubmit={onSubmit} />
        </div>
      )}

      <ConfirmModal
        title="Delete feature"
        text="Are you sure you want to delete this feature?"
        confirmButtonText="Confirm"
        cancelButtonText="Cancel"
        onConfirm={handleClickRemove}
        onCancel={() => setIsConfirmModalOpen(false)}
        isOpen={isConfirmModalOpen}
      />
    </div>
  );
};

interface IFormData {
  title: string;
  status?: TTHFeatureStatus;
  id?: string;
}

export default ViewFeature;
