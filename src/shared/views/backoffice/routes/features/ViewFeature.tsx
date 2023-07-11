import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Badge from '@/shared/components/badge/Badge';
import PageBack from '@/shared/components/ui/page-back/PageBack';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import { DeviceContext } from '@/shared/contexts/DeviceContext';
import fetchFeatureById from '@/shared/queries/backoffice/fetch-feature-by-id';
import EQueryKeys from '@/shared/queries/query-keys';
import { formatDate } from '@/shared/utils/date';

const ViewFeature = () => {
  const { id } = useParams();
  const { data: feature } = useQuery([EQueryKeys.Feature, id], fetchFeatureById);
  const device = useContext(DeviceContext);

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
            {feature.status === 'ontrack' ? (
              <Badge color="blue" text="On track" size="xs" />
            ) : (
              <Badge color="green" text="Live" size="xs" />
            )}
          </>
        )}
      </div>

      {feature && (
        <div className="mb-2 rounded-lg border bg-white p-4 shadow-sm">
          <p className="text-xs text-black/50">Created at: {formatDate(feature.creation_date)}</p>
        </div>
      )}
    </div>
  );
};

export default ViewFeature;
