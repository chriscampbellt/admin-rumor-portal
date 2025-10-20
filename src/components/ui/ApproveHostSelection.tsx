import Dialog from '@/components/ui/dialog';

import { CommonButton } from './CommonButton';

interface ApproveHostSelectionProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApproveHostSelection: React.FC<ApproveHostSelectionProps> = ({
  isOpen,
  onClose,
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Dialog isOpen={isOpen} onClose={handleClose} showCloseButton={false}>
        <h2 className="px-2 pb-3 text-center font-romie text-xl font-bold text-ui-neutralSurfaceOnColor md:text-2xl">
          Approve selected host?
        </h2>
        <p className="mx-6 pb-5 text-center font-diatype text-[16px] leading-9 !text-ui-textPrimaryColor">
          Host will receive a confirmation notification upon approval.
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
            Approve
          </CommonButton>
        </div>
      </Dialog>
    </>
  );
};

export default ApproveHostSelection;
