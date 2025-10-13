import { Trash2 } from 'lucide-react';

import { CommonButton } from '@/components/ui/CommonButton';
import Dialog from '@/components/ui/dialog';

interface DeleteEventProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteEvent: React.FC<DeleteEventProps> = ({ isOpen, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      title="Delete Event Series"
      maxWidth="auto"
    >
      <div className="space-y-4 px-5 pb-[16px]">
        <p className="font-diatype text-[16px] !text-ui-neutralContentBody">
          Are you sure you want to delete this Event Series? All events within
          this series will be moved to individual event listings and will no
          longer be grouped under this series in the Discover feed. This action
          cannot be undone
        </p>
      </div>
      <div className="flex justify-start gap-3 border-t border-ui-neutralBorderSupport px-5 py-3">
        <CommonButton
          leftIcon={<Trash2 size={18} />}
          onClick={handleClose}
          className="rounded-full border-2 border-ui-neutralDarkRed bg-ui-neutralDarkRed px-4 py-3 text-[14px] font-medium text-white hover:bg-red-700"
        >
          Delete Event Series
        </CommonButton>
      </div>
    </Dialog>
  );
};

export default DeleteEvent;
