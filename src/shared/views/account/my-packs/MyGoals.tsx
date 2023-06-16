import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import AddPackageIcon from '@/shared/components/ui/icons/AddPackageIcon';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import fetchPacks from '@/shared/queries/fetch-packs';
import EQueryKeys from '@/shared/queries/query-keys';
import PacksTable from './components/PacksTable';

const MyPacks = () => {
  const { data: packs } = useQuery([EQueryKeys.Packs], fetchPacks);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <PageTitle title="My packs" subtitle="Here you can manage your packs." className="mb-4" />
        <Link
          className="mr-2 flex items-center rounded-lg border bg-white py-2 px-3 text-sm font-medium text-orange-600 shadow-sm hover:bg-gray-50"
          to="/account/packs/add"
        >
          <AddPackageIcon className="mr-2 flex items-center text-2xl" /> Add new pack
        </Link>
      </div>

      <PacksTable packs={packs} />
    </div>
  );
};

export default MyPacks;
