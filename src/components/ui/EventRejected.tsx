import Dialog from '@/components/ui/dialog';

import { CommonButton } from './CommonButton';

interface EventRejectedProps {
  isOpen: boolean;
  onClose: () => void;
}

const EventRejected: React.FC<EventRejectedProps> = ({ isOpen, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} showCloseButton={false}>
      <h2 className="px-2 pb-2 text-center font-romie text-xl font-bold text-ui-neutralSurfaceOnColor md:text-2xl">
        Event Rejected
      </h2>
      <p className="pb-5 text-center font-diatype text-[16px] leading-9 !text-ui-textPrimaryColor">
        The Host will be notified. The event will return to the Host&apos;s
        drafts <br />
        and can be edited and resubmitted.
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

export default EventRejected;
