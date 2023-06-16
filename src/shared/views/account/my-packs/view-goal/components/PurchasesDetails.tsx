import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@/shared/components/toast/ToastContext';
import PurchaseCheckIcon from '@/shared/components/ui/icons/PurchaseCheckIcon';
import PurchaseIcon from '@/shared/components/ui/icons/PurchaseIcon';
import RemoveIcon from '@/shared/components/ui/icons/RemoveIcon';
import deletePurchase from '@/shared/queries/delete-purchase';
import editPurchase from '@/shared/queries/edit-purchase';
import fetchPurchasesByPackId from '@/shared/queries/fetch-purchases-by-pack-id';
import EQueryKeys from '@/shared/queries/query-keys';
import NewPurchaseForm from './NewPurchaseForm';
import PurchaseDate from './PurchaseDate';

const PurchasesDetails = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { packId } = useParams();
  const { data: purchases } = useQuery([EQueryKeys.Purchases, packId], fetchPurchasesByPackId);
  const [editMode, setEditMode] = useState(false);

  const deletePurchaseMutation = useMutation(deletePurchase, {
    onMutate: () => {
      // loading
    },
    onError: () => {
      showToast(
        'Error while deleting purchase',
        'error',
        'There has been an error while deleting your purchase, please try again later.'
      );
    },
    onSuccess: () => {
      showToast('Purchase was removed successfully', 'success');
      queryClient.invalidateQueries([EQueryKeys.Purchases]);
    },
    onSettled: () => {
      // off loading
    },
  });

  const editPurchaseMutation = useMutation(editPurchase, {
    onMutate: () => {
      // loading
    },
    onError: () => {
      showToast(
        'Error while confirming purchase',
        'error',
        'There has been an error while confirming your purchase, please try again later.'
      );
    },
    onSuccess: () => {
      showToast('Purchase was succesfully confirmed', 'success');
      queryClient.invalidateQueries([EQueryKeys.Purchases]);
    },
    onSettled: () => {
      // off loading
    },
  });

  const handleClickDeletePurchase = (id: string) => {
    deletePurchaseMutation.mutate(id);
  };

  const handleClickConfirmPurchase = (id: string) => {
    editPurchaseMutation.mutate({ id, confirmed: true });
  };

  if (!purchases) {
    return null;
  }

  return (
    <div className="mt-4 flex-1 rounded-lg border bg-white shadow-sm">
      <div className="flex items-center justify-between border-b p-2">
        <p className="px-2 py-1 text-xs font-medium text-gray-400">Purchases ({purchases.length})</p>
      </div>
      {purchases.length < 1 && (
        <div className="mt-4 px-4 text-sm text-gray-400">{`This pack doesn't have any purchases yet.`}</div>
      )}
      {purchases.map((purchase, i) => {
        return (
          <div
            key={purchase.id}
            className={`${
              i % 2 === 0 ? 'bg-white ' : 'bg-gray-50/70'
            } flex cursor-pointer items-center justify-between border-b px-4 py-3 text-sm hover:shadow ${
              purchase.confirmed ? '' : 'text-gray-400'
            } ${i === 0 ? 'font-semibold' : ''}`}
          >
            <div className="flex items-center">
              <div className="flex items-center">
                {purchase.confirmed ? (
                  <PurchaseCheckIcon className="mr-2 cursor-pointer rounded-full p-1 text-2xl text-green-500" />
                ) : (
                  <PurchaseIcon className="mr-2 cursor-pointer rounded-full p-1 text-2xl text-gray-400 hover:bg-gray-200" />
                )}
                <span className="mr-2">EUR €{purchase.price}:</span>
                <div className="mr-2 text-gray-400">
                  <PurchaseDate date={purchase.purchasedAt} />
                </div>
              </div>
              <div className="flex items-center">
                {i == 0 && (
                  <span
                    className={`rounded-full border py-1 px-2 text-xs font-medium ${
                      purchase.confirmed ? 'border-orange-300 bg-orange-50 text-orange-500' : ''
                    }`}
                  >
                    Latest purchase
                  </span>
                )}
                {!purchase.confirmed && (
                  <span className="rounded-full py-1 px-2 text-xs italic text-gray-400">
                    Unconfirmed, auto-generated
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center">
              {!purchase.confirmed && (
                <button
                  className="mr-4 rounded-md border bg-white p-1 px-2 text-xs font-medium text-gray-800 hover:shadow-sm"
                  onClick={() => handleClickConfirmPurchase(purchase.id)}
                >
                  Confirm purchase
                </button>
              )}
              <button onClick={() => handleClickDeletePurchase(purchase.id)} className="flex items-center">
                <RemoveIcon className="text-lg" />
              </button>
            </div>
          </div>
        );
      })}
      <div className="p-4 pt-4">
        {editMode ? (
          <NewPurchaseForm setEditMode={setEditMode} />
        ) : (
          <button
            onClick={() => setEditMode(true)}
            type="button"
            className="mr-2 flex items-center rounded-lg border bg-white py-2 px-3 text-sm font-medium shadow-sm hover:shadow"
          >
            <PurchaseIcon className="mr-2 flex items-center text-xl" /> Add new purchase
          </button>
        )}
      </div>
    </div>
  );
};

export default PurchasesDetails;
