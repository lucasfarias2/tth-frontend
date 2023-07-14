import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/shared/components/toast/ToastContext';
import PageBack from '@/shared/components/ui/page-back/PageBack';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import createFeature from '@/shared/queries/backoffice/create-feature';
import EQueryKeys from '@/shared/queries/query-keys';
import FeatureForm from './FeatureForm';

const AddFeature = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const createFeatureMutation = useMutation(createFeature, {
    onMutate: () => {
      // loading
    },
    onError: () => {
      showToast(
        'Error while creating new feature',
        'error',
        'There has been an error while creating feature, please try again later.'
      );
    },
    onSuccess: () => {
      navigate('/backoffice/features');
      queryClient.invalidateQueries([EQueryKeys.Features]);
      showToast('Feature created successfully', 'success');
    },
    onSettled: () => {
      // off loading
    },
  });

  const onSubmit = (data: IFormData) => {
    const { title, status } = data;

    createFeatureMutation.mutate({
      title,
      status,
    });
  };

  return (
    <div className="with-navbar-max-height-mobile p-6">
      <PageBack to="/backoffice/features" />
      <PageTitle title="New feature" subtitle="Create a new feature" className="mb-4" />

      <div className="mt-4 max-w-2xl md:rounded-lg md:border md:bg-white md:p-4 md:shadow-sm">
        <FeatureForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

interface IFormData {
  title: string;
  status?: TTHFeatureStatus;
  id?: string;
}

export default AddFeature;
