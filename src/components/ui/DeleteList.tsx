import { Trash2 } from 'lucide-react';

import { CommonButton } from '@/components/ui/CommonButton';
import Dialog from '@/components/ui/dialog';

interface DeleteListProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteList: React.FC<DeleteListProps> = ({ isOpen, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      title="Are you sure you want to delete this list?"
      maxWidth="auto"
    >
      <div className="space-y-4 px-5 pb-[16px]">
        <p className="font-diatype text-[16px] !text-ui-neutralContentBody">
          The list will be deleted but the users won’t be removed from the
          database.
        </p>
      </div>
      <div className="flex justify-start gap-3 border-t border-ui-neutralBorderSupport px-5 py-3">
        <CommonButton
          leftIcon={<Trash2 size={18} />}
          onClick={handleClose}
          className="rounded-full border-2 border-ui-neutralDarkRed bg-ui-neutralDarkRed px-4 py-5 text-[14px] font-medium text-white hover:bg-red-600"
        >
          Delete List
        </CommonButton>
      </div>
    </Dialog>
  );
};

export default DeleteList;
