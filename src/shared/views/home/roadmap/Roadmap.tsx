import { useQuery } from '@tanstack/react-query';
import { PuzzleIcon } from '@/shared/components/ui/icons';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import fetchFeaturesPublic from '@/shared/queries/fetch-features-public';
import EQueryKeys from '@/shared/queries/query-keys';
import { formatDate } from '@/shared/utils/date';

const Roadmap = () => {
  const { data: features } = useQuery([EQueryKeys.FeaturesPublic], fetchFeaturesPublic);

  const getLabel = (status: string) => {
    if (status === 'ontrack') {
      return 'On track';
    } else if (status === 'live') {
      return 'Live';
    }
  };

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
            } flex-wrap ${feature.status === 'live' ? 'opacity-50' : ''}`}
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
                  <div className="rounded-lg border border-sky-300 bg-sky-100 py-1 px-2 text-sky-500">
                    {getLabel(feature.status)}
                  </div>
                ) : (
                  <div className="rounded-lg border border-green-300 bg-green-100 py-1 px-2 text-green-500">
                    {getLabel(feature.status)}
                  </div>
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
