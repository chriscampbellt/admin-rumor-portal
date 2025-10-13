import Dialog from '@/components/ui/dialog';

import { CommonButton } from './CommonButton';

interface EventApprovedProps {
  isOpen: boolean;
  onClose: () => void;
}

const EventApproved: React.FC<EventApprovedProps> = ({ isOpen, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} showCloseButton={false}>
      <h2 className="px-2 pb-2 text-center font-romie text-xl font-bold text-ui-neutralSurfaceOnColor md:text-2xl">
        Event Approved
      </h2>
      <p className="pb-5 text-center font-diatype text-[16px] leading-9 !text-ui-textPrimaryColor">
        [Event Name] has been approved. <br />
        The Host will receive an email and in-platform notification.
      </p>
      <div className="flex items-center justify-center gap-4 px-5 py-3">
        <CommonButton
          onClick={handleClose}
          type="submit"
          className="w-full max-w-[250px] py-3 font-diatype"
        >
          Done
        </CommonButton>
      </div>
    </Dialog>
  );
};

export default EventApproved;
