import PageBack from '@/shared/components/ui/page-back/PageBack';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import FeatureForm from './FeatureForm';

const AddFeature = () => {
  return (
    <div className="with-navbar-max-height-mobile p-6">
      <PageBack to="/backoffice/features" />
      <PageTitle title="New feature" subtitle="Create a new feature" className="mb-4" />

      <div className="mt-4 max-w-2xl md:rounded-lg md:border md:bg-white md:p-4 md:shadow-sm">
        <FeatureForm />
      </div>
    </div>
  );
};

export default AddFeature;
