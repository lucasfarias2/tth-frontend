import { useQueryClient } from '@tanstack/react-query';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import EQueryKeys from '@/shared/queries/query-keys';

const Home = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData([EQueryKeys.User]) as TTHUser;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <PageTitle
          title={`Welcome, ${user.name?.split(' ')?.[0]}.`}
          subtitle="Here is an overview of your account."
          className="mb-4"
        />
      </div>
    </div>
  );
};

export default Home;
