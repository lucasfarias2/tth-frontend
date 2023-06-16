import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/shared/components/toast/ToastContext';
import Badge from '@/shared/components/ui/badge/Badge';
import EditIcon from '@/shared/components/ui/icons/EditIcon';
import FrequencyIcon from '@/shared/components/ui/icons/FrequencyIcon';
import PackageIcon from '@/shared/components/ui/icons/PackageIcon';
import RemoveIcon from '@/shared/components/ui/icons/RemoveIcon';
import deletePack from '@/shared/queries/delete-pack';
import EQueryKeys from '@/shared/queries/query-keys';
import TableHeadRow from './TableHeadRow';
import TableRow from './TableRow';

interface IProps {
  packs?: SIPPack[];
}

const PacksTable = ({ packs }: IProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const deletePackMutation = useMutation(deletePack, {
    onMutate: () => {
      // loading
    },
    onError: () => {
      showToast(
        'Error while deleting pack',
        'error',
        'There has been an error while deleting your pack, please try again later.'
      );
    },
    onSuccess: () => {
      showToast('Pack was removed successfully', 'success');
      queryClient.invalidateQueries([EQueryKeys.Packs]);
    },
    onSettled: () => {
      // off loading
    },
  });

  const handleClickRemovePack = (id: string) => {
    deletePackMutation.mutate(id);
  };

  const handleClickEditPack = (id: string) => {
    navigate(`/account/packs/${id}`);
  };

  return (
    <div className="overflow-x-hidden rounded-md border bg-white shadow-sm">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left">
            <th className="w-20"></th>
            <TableHeadRow>Name</TableHeadRow>
            <TableHeadRow>Frequency</TableHeadRow>
            <TableHeadRow>External link</TableHeadRow>
            <TableHeadRow>Category</TableHeadRow>
            <TableHeadRow>Actions</TableHeadRow>
          </tr>
        </thead>
        <tbody>
          {packs?.map((pack: SIPPack, index: number) => (
            <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/70'} border-b`}>
              <TableRow>
                <div className="px-3">
                  {pack.picture ? (
                    <img
                      src={pack.picture}
                      alt={pack.name}
                      className="h-12 w-12 rounded-lg border bg-white object-contain p-1 shadow-sm"
                    />
                  ) : (
                    <PackageIcon className="text-3xl text-gray-200" />
                  )}
                </div>
              </TableRow>
              <TableRow
                className="cursor-pointer font-medium"
                onClick={() => {
                  navigate(`/account/packs/${pack.id}`);
                }}
              >
                {pack.name}
              </TableRow>
              <TableRow className="w-[100px]">
                <Badge>
                  <FrequencyIcon className="mr-1 text-lg text-gray-400" /> {pack.frequency}
                </Badge>
              </TableRow>
              <TableRow className="max-w-[100px] text-gray-500">
                <p className="truncate pr-4">{pack?.externalLink}</p>
              </TableRow>
              <TableRow className="max-w-[120px]">{pack?.category && <Badge>{pack?.category.name}</Badge>}</TableRow>
              <TableRow className="w-[80px]">
                <button className="mr-4" onClick={() => handleClickEditPack(pack.id)}>
                  <EditIcon className="text-lg" />
                </button>
                <button onClick={() => handleClickRemovePack(pack.id)}>
                  <RemoveIcon className="text-lg" />
                </button>
              </TableRow>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PacksTable;
