import { useQueryClient } from '@tanstack/react-query';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import EQueryKeys from '@/shared/queries/query-keys';

const Features = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData([EQueryKeys.User]) as TTHUser;

  return (
    <div className="p-6">
      <PageTitle
        title="Development features"
        subtitle="Here you can manage the development features roadmap that users will see."
      />
    </div>
  );
};

export default Features;
