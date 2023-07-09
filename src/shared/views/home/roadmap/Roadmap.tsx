import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import Badge from '@/shared/components/badge/Badge';
import { PuzzleIcon } from '@/shared/components/ui/icons';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import fetchFeaturesPublic from '@/shared/queries/fetch-features-public';
import EQueryKeys from '@/shared/queries/query-keys';
import { formatDate } from '@/shared/utils/date';
import trackEvent from '@/shared/utils/ga-tracking';

const Roadmap = () => {
  const { data: features } = useQuery([EQueryKeys.FeaturesPublic], fetchFeaturesPublic);

  useEffect(() => {
    trackEvent('page_view', { title: 'roadmap' });
  }, []);

  const LiveIcon = <PuzzleIcon className="text-xl text-green-500" />;
  const OnTrackIcon = <PuzzleIcon className="text-xl text-gray-500" />;

  return (
    <div className="with-navbar-max-height-mobile p-6 md:px-16 2xl:px-48">
      <PageTitle
        title="Development roadmap"
        subtitle="Please fill out the form and we will reach back to you as soon as possible."
      />
      <div className="mt-4 max-w-2xl overflow-hidden rounded-lg border  bg-white shadow-sm dark:border-white/5 dark:bg-white/5">
        {features?.map((feature, i) => (
          <div
            className={`flex items-center justify-between border-b py-3 px-4 last:mb-0 last:border-b-0 ${
              i % 2 === 0 ? 'bg-white' : 'bg-gray-50'
            } flex-wrap`}
            key={feature.id}
          >
            <div className="flex items-center">
              {feature.status === 'ontrack' ? OnTrackIcon : LiveIcon}
              <div className="ml-4 flex-1">
                <div className="flex items-center text-sm font-medium">
                  <div className="mr-2">{feature.title}</div>
                </div>
                <div className="text-xs text-black/50">Last update: {formatDate(feature.updated_date)}</div>
              </div>
            </div>
            <div className="mt-4 flex items-center md:mt-0">
              <span className="inline-block text-xs">
                {feature.status === 'ontrack' ? (
                  <Badge color="blue" text="On track" size="xs" />
                ) : (
                  <Badge color="green" text="Live" size="xs" />
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
