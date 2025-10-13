import Dialog from '@/components/ui/dialog';
import useToggle from '@/lib/useToggle';

import { CommonButton } from './CommonButton';
import EventApproved from './EventApproved';

interface ApproveEventProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApproveEvent: React.FC<ApproveEventProps> = ({ isOpen, onClose }) => {
  const handleClose = () => {
    onClose();
  };
  const handleApprove = () => {
    handleClose();
    open();
  };
  const { isOpen: isApprovedOpen, open, toggle } = useToggle(false);

  return (
    <>
      <Dialog isOpen={isOpen} onClose={handleClose}>
        <h2 className="px-2 pb-10 text-center font-romie text-xl font-bold text-ui-neutralSurfaceOnColor md:text-2xl">
          Are you sure you want to approve this event?
        </h2>
        <div className="flex items-center justify-center gap-4 px-5 py-3">
          <CommonButton
            type="submit"
            disabled
            className="w-full max-w-[250px] !bg-[rgba(0,0,0,0.2)] py-3 font-diatype text-ui-textTertiary hover:text-ui-textTertiary"
          >
            Cancel
          </CommonButton>
          <CommonButton
            onClick={handleApprove}
            type="submit"
            className="w-full max-w-[250px] py-3 font-diatype"
          >
            Approve event
          </CommonButton>
        </div>
      </Dialog>
      <EventApproved isOpen={isApprovedOpen} onClose={toggle} />
    </>
  );
};

export default ApproveEvent;
