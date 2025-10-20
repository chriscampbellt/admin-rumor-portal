import Dialog from '@/components/ui/dialog';

import { CommonButton } from './CommonButton';

interface DeleteTicketTypeProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteTicketType: React.FC<DeleteTicketTypeProps> = ({
  isOpen,
  onClose,
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} showCloseButton={false}>
      <h2 className="px-2 pb-3 text-center font-romie text-xl font-bold text-ui-neutralSurfaceOnColor md:text-2xl">
        Delete Ticket Type?
      </h2>

      <p className="mx-6 pb-5 text-center font-diatype text-[16px] leading-9 text-ui-textPrimaryColor">
        Deleting this ticket type will remove it permanently from your event
        settings. Are you sure you want to proceed?
      </p>

      <div className="flex items-center justify-center gap-4 px-5 py-3">
        <CommonButton
          type="submit"
          className="w-full max-w-[250px] py-3 font-diatype"
        >
          Cancel
        </CommonButton>
        <CommonButton
          onClick={handleClose}
          type="button"
          className="w-full max-w-[250px] rounded-full border-2 border-transparent bg-ui-neutralDarkRed px-4 py-3 text-[14px] font-medium text-white hover:bg-red-700"
        >
          Delete Ticket Type
        </CommonButton>
      </div>
    </Dialog>
  );
};

export default DeleteTicketType;
