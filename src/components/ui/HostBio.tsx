import Dialog from '@/components/ui/dialog';

import { CommonButton } from './CommonButton';

interface HostBioProps {
  isOpen: boolean;
  onClose: () => void;
}

const HostBio: React.FC<HostBioProps> = ({ isOpen, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Dialog isOpen={isOpen} onClose={handleClose} showCloseButton={false}>
        <h2 className="px-2 pb-3 text-center font-romie text-xl font-bold text-ui-neutralSurfaceOnColor md:text-2xl">
          Host Bio
        </h2>
        <p className="mx-6 pb-5 text-center font-diatype text-[16px] leading-9 !text-ui-textPrimaryColor">
          This is a ver long description Uncommon Entertainment is a events
          company based in the US Uncommon Entertainment is a events company
          based in the US Uncommon Entertainment is a events company based in
          the US{' '}
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
    </>
  );
};

export default HostBio;
