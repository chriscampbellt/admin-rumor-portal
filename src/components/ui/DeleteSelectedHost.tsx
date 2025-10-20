import Dialog from '@/components/ui/dialog';

import { CommonButton } from './CommonButton';

interface DeleteSelectedHostProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteSelectedHost: React.FC<DeleteSelectedHostProps> = ({
  isOpen,
  onClose,
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} showCloseButton={false}>
      <h2 className="px-2 pb-3 text-center font-romie text-xl font-bold text-ui-neutralSurfaceOnColor md:text-2xl">
        Delete selected host?
      </h2>

      <p className="mx-6 pb-5 text-center font-diatype text-[16px] leading-9 text-ui-textPrimaryColor">
        Are you sure you want to delete this host? Deleting will immediately
        cancel their upcoming events, delete their associated data, and hide
        their profile along with related data from members.
        <br />
        Their account and all associated data will be permanently deleted and
        cannot be recovered.
      </p>

      <div className="flex items-center justify-center gap-4 px-5 py-3">
        <CommonButton
          onClick={handleClose}
          type="button"
          className="w-full max-w-[250px] rounded-full border-2 border-transparent bg-ui-neutralDarkRed px-4 py-3 text-[14px] font-medium text-white hover:bg-red-700"
        >
          Delete Host
        </CommonButton>
      </div>
    </Dialog>
  );
};

export default DeleteSelectedHost;
