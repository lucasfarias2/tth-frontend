import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/shared/components/toast/ToastContext';
import RemovePackageIcon from '@/shared/components/ui/icons/DeletePackageIcon';
import EditIcon from '@/shared/components/ui/icons/EditIcon';
import PackageIcon from '@/shared/components/ui/icons/PackageIcon';
import PageBack from '@/shared/components/ui/page-back/PageBack';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import EQueryKeys from '@/shared/queries/query-keys';
import deleteGoal from '@/shared/queries/services/delete-goal';
import fetchGoalById from '@/shared/queries/services/fetch-goal-by-id';
import PurchasesDetails from './components/PurchasesDetails';
import ViewPackDetails from './components/ViewPackDetails';

const ViewPack = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { packId } = useParams();
  const { data: pack } = useQuery([EQueryKeys.Pack, packId], fetchPackById);
  const [editMode, setEditMode] = useState(false);

  const deleteGoal = useMutation(deletePack, {
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
      navigate('/account/packs');
    },
    onSettled: () => {
      // off loading
    },
  });

  const handleClickDeletePack = (id: string) => {
    deletePackMutation.mutate(id);
  };

  return (
    <div className="p-8">
      <PageBack to="/account" />
      <div className="mb-3 flex items-end justify-between">
        <div className="flex items-center">
          {pack?.picture ? (
            <img
              src={pack.picture}
              alt={pack.name}
              className="mr-3 h-16 w-16 rounded-lg border bg-white object-contain p-2 shadow-sm"
            />
          ) : (
            <PackageIcon className="mr-3 rounded-lg border bg-white p-3 text-6xl text-gray-300 shadow-sm" />
          )}
          {pack && <PageTitle title={pack.name} subtitle={pack.category?.name} />}
        </div>
        <div className="flex items-center">
          {!editMode && (
            <button
              className="mr-2 flex items-center rounded-lg border bg-white py-2 px-3 text-sm font-medium text-sky-600 shadow-sm"
              onClick={() => {
                setEditMode(true);
              }}
            >
              <EditIcon className="mr-2 text-xl" /> Edit pack
            </button>
          )}
          <button
            className="flex items-center rounded-lg border bg-white py-2 px-3 text-sm font-medium text-rose-600 shadow-sm"
            onClick={() => handleClickDeletePack(pack?.id as string)}
          >
            <RemovePackageIcon className="mr-2 text-xl" /> Delete pack
          </button>
        </div>
      </div>

      {pack && packId && <ViewPackDetails pack={pack} editMode={editMode} setEditMode={setEditMode} packId={packId} />}

      <PurchasesDetails />
    </div>
  );
};

export default ViewPack;
