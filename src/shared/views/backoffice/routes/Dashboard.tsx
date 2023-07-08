import { useQueryClient } from '@tanstack/react-query';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import EQueryKeys from '@/shared/queries/query-keys';

const Dashboard = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData([EQueryKeys.User]) as TTHUser;

  return (
    <div className="p-6">
      <PageTitle title={`Welcome, ${user.first_name}`} subtitle="Here is an overview of the platform." />
    </div>
  );
};

export default Dashboard;
