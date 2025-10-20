import Dialog from '@/components/ui/dialog';

import { CommonButton } from './CommonButton';

interface WaitlistDailogProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistDailog: React.FC<WaitlistDailogProps> = ({ isOpen, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Dialog isOpen={isOpen} onClose={handleClose} showCloseButton={false}>
        <h2 className="px-2 pb-3 text-center font-romie text-xl font-bold text-ui-neutralSurfaceOnColor md:text-2xl">
          Waitlist selected host?
        </h2>
        <p className="mx-6 pb-5 text-center font-diatype text-[16px] leading-9 !text-ui-textPrimaryColor">
          Host will not receive a notification about being waitlisted.{' '}
        </p>
        <div className="flex items-center justify-center gap-4 px-5 py-3">
          <CommonButton
            type="submit"
            onClick={handleClose}
            className="w-full max-w-[250px] border !border-ui-neuteralSurfaceSecondary bg-transparent py-3 font-diatype text-ui-neutralSurfaceOnColor hover:bg-ui-neuteralSurfaceSecondary hover:text-white"
          >
            Cancel
          </CommonButton>
          <CommonButton
            type="submit"
            className="w-full max-w-[250px] py-3 font-diatype"
          >
            Waitlist
          </CommonButton>
        </div>
      </Dialog>
    </>
  );
};

export default WaitlistDailog;
