import { Check } from 'lucide-react';

import { CommonButton } from '@/components/ui/CommonButton';
import Dialog from '@/components/ui/dialog';

interface PublishEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const PublishEventDialog: React.FC<PublishEventDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} showCloseButton={false}>
      <h2 className="px-2 pb-2 text-center font-romie text-xl font-bold text-ui-neutralSurfaceOnColor md:text-2xl">
        Publish Event Now
      </h2>
      <p className="pb-5 text-center font-diatype text-[16px] leading-9 !text-ui-textPrimaryColor">
        [Event Name] will appear on the discovery feed shortly.
      </p>
      <div className="flex items-center justify-center gap-4 px-2 py-2">
        <CommonButton
          onClick={handleClose}
          type="submit"
          className="w-full max-w-[250px] border !border-ui-neuteralSurfaceSecondary bg-transparent py-3 font-diatype text-ui-neutralSurfaceOnColor hover:bg-ui-neuteralSurfaceSecondary hover:text-white"
        >
          Cancel
        </CommonButton>
        <CommonButton
          type="submit"
          className="w-full max-w-[250px] py-3 font-diatype"
        >
          Confirm
        </CommonButton>
      </div>
    </Dialog>
  );
};

export default PublishEventDialog;
