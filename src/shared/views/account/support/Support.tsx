import PageTitle from '@/shared/components/ui/page-title/PageTitle';

const Support = () => {
  // const queryClient = useQueryClient();
  // const { data: tickets } = useQuery([EQueryKeys.Tickets], fetchTickets);

  return (
    <div className="p-6">
      <PageTitle title="Support" subtitle="Here you can have an overview of your support tickets." className="mb-4" />
    </div>
  );
};

export default Support;
