import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@/shared/components/toast/ToastContext';
import ConfirmModal from '@/shared/components/ui/confirm-modal/ConfirmModal';
import PageBack from '@/shared/components/ui/page-back/PageBack';
import PageTitle from '@/shared/components/ui/page-title/PageTitle';
import { DeviceContext } from '@/shared/contexts/DeviceContext';
import editTicket from '@/shared/queries/backoffice/edit-ticket';
import fetchTicketById from '@/shared/queries/backoffice/fetch-ticket-by-id';
import EQueryKeys from '@/shared/queries/query-keys';
import { formatDate } from '@/shared/utils/date';

const ViewTicket = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { id } = useParams();
  const { data: ticket } = useQuery([EQueryKeys.Ticket, id], fetchTicketById);
  const [isConfirmOpenModalOpen, setIsConfirmOpenModalOpen] = useState(false);
  const [isConfirmCloseModalOpen, setIsConfirmCloseModalOpen] = useState(false);
  const [isConfirmResolveModalOpen, setIsConfirmResolveModalOpen] = useState(false);
  const device = useContext(DeviceContext);
  const [isMutating, setIsMutating] = useState(false);

  const editTicketMutation = useMutation(editTicket, {
    onMutate: () => {
      setIsMutating(true);
    },
    onError: () => {
      showToast(
        'Error while editing ticket',
        'error',
        'There has been an error while editing habit, please try again later.'
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries([EQueryKeys.Tickets]);
      queryClient.invalidateQueries([EQueryKeys.Ticket, id]);
      showToast('Ticket updated successfully', 'success');
    },
    onSettled: () => {
      setIsMutating(false);
    },
  });

  const onSubmit = async (data: IData) => {
    if (isMutating) return;

    editTicketMutation.mutate({ ...data, id });
  };

  const handleResolveTicket = async () => {
    await onSubmit({ status: 'resolved' });
    setIsConfirmResolveModalOpen(false);
  };

  const handleCloseTicket = async () => {
    await onSubmit({ status: 'closed' });
    setIsConfirmCloseModalOpen(false);
  };

  const handleOpenTicket = async () => {
    await onSubmit({ status: 'open' });
    setIsConfirmOpenModalOpen(false);
  };

  const fullScreenClasses = device.type === 'mobile' ? 'h-full bg-gray-50 fixed top-0 w-full' : '';

  return (
    <div className={`p-6 md:max-w-2xl ${fullScreenClasses}`}>
      <PageBack to="/backoffice/tickets" />
      <div className="mb-4 flex items-end justify-between">
        {ticket && (
          <>
            <div className="flex items-center justify-center">
              {ticket && (
                <PageTitle title={ticket.title} subtitle={`Latest update: ${formatDate(ticket?.updated_date)}`} />
              )}
            </div>
            {ticket.status === 'open' ? (
              <div className="mb-1 rounded-lg border border-sky-200 bg-sky-100 p-1 text-xs text-sky-500">Open</div>
            ) : ticket.status === 'closed' ? (
              <div className="mb-1 rounded-lg border border-red-200 bg-red-100 p-1 text-xs text-red-500">Closed</div>
            ) : (
              <div className="mb-1 rounded-lg border border-green-200 bg-green-100 p-1 text-xs text-green-500">
                Resolved
              </div>
            )}
          </>
        )}
      </div>

      {ticket && (
        <div className="mb-2 rounded-lg border bg-white p-4 shadow-sm">
          <p className="text-xs text-black/50">Sent at: {formatDate(ticket.creation_date)}</p>
          <p className="mb-4 text-xs text-black/50">Sent by: {ticket.sender}</p>
          <p>{ticket.content}</p>
        </div>
      )}

      {ticket?.status !== 'resolved' && (
        <button
          type="button"
          onClick={() => {
            setIsConfirmResolveModalOpen(true);
          }}
          className="mr-2 inline-block cursor-pointer items-center rounded-lg border bg-white p-2 text-sm font-medium text-green-500 shadow-sm hover:bg-gray-50"
        >
          Mark as resolved
        </button>
      )}
      {ticket?.status !== 'closed' && (
        <button
          type="button"
          onClick={() => {
            setIsConfirmCloseModalOpen(true);
          }}
          className="mr-2 inline-block cursor-pointer items-center rounded-lg border bg-white p-2 text-sm font-medium text-red-500 shadow-sm hover:bg-gray-50"
        >
          Close ticket
        </button>
      )}
      {ticket?.status !== 'open' && (
        <button
          type="button"
          onClick={() => {
            setIsConfirmOpenModalOpen(true);
          }}
          className="inline-block cursor-pointer items-center rounded-lg border bg-white p-2 text-sm font-medium text-sky-500 shadow-sm hover:bg-gray-50"
        >
          Open ticket
        </button>
      )}

      <ConfirmModal
        title="Close ticket"
        text="Are you sure you want to close this ticket?"
        confirmButtonText="Confirm"
        cancelButtonText="Cancel"
        onConfirm={handleCloseTicket}
        onCancel={() => setIsConfirmCloseModalOpen(false)}
        isOpen={isConfirmCloseModalOpen}
      />

      <ConfirmModal
        title="Resolve ticket"
        text="Are you sure you want to mark this ticket as resolved?"
        confirmButtonText="Confirm"
        cancelButtonText="Cancel"
        onConfirm={handleResolveTicket}
        onCancel={() => setIsConfirmResolveModalOpen(false)}
        isOpen={isConfirmResolveModalOpen}
      />

      <ConfirmModal
        title="Open ticket"
        text="Are you sure you want to open this ticket?"
        confirmButtonText="Confirm"
        cancelButtonText="Cancel"
        onConfirm={handleOpenTicket}
        onCancel={() => setIsConfirmOpenModalOpen(false)}
        isOpen={isConfirmOpenModalOpen}
      />
    </div>
  );
};

interface IData {
  status: 'open' | 'closed' | 'resolved';
}

export default ViewTicket;
