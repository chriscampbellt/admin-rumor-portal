import { useState } from 'react';

import { CommonButton } from '@/components/ui/CommonButton';
import Dialog from '@/components/ui/dialog';

import CommonInput from './CommonInput';

interface CancelEventDailogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CancelEventDailog: React.FC<CancelEventDailogProps> = ({
  isOpen,
  onClose,
}) => {
  const [message, setMessage] = useState('');
  const handleClose = () => {
    onClose();
  };
  return (
    <>
      <Dialog isOpen={isOpen} onClose={handleClose}>
        <h2 className="px-2 pb-2 text-center font-romie text-xl font-bold text-ui-neutralSurfaceOnColor md:text-2xl">
          Cancel this event?
        </h2>
        <p className="mx-6 border-b pb-5 text-center font-diatype text-[16px] leading-9 !text-ui-textPrimaryColor">
          This operation cannot be undone. The host, event collaborators, and
          [x] invited, [x] requested, and [x] confirmed guests will be notified
          of the cancellation.{' '}
        </p>

        <div className="space-y-4 px-6 py-6">
          <label className="font-diatype text-[16px] font-bold !text-ui-neutralSurfaceOnColor">
            Message to Host
          </label>
          <p className="font-diatype text-[16px] !text-ui-neutralSurfaceOnColor">
            Hi [Host Name], [Event Name] has been canceled. Please contact
            support@therumor.com if you have any questions.{' '}
          </p>
          <CommonInput
            placeholder="(Optional) Add a custom message"
            autoComplete="off"
            onChange={e => setMessage(e.target.value)}
            className="w-full"
            type="text"
            value={message}
          />
        </div>
        <div className="flex items-center justify-center gap-4 px-2">
          <CommonButton
            onClick={handleClose}
            type="submit"
            className="w-full max-w-[250px] py-3 font-diatype"
          >
            Cancel
          </CommonButton>
          <CommonButton
            type="submit"
            className="w-full max-w-[250px] border-ui-errorBorderColor bg-ui-errorBorderColor py-3 font-diatype text-white hover:bg-red-700"
          >
            Cancel & Notify
          </CommonButton>
        </div>
      </Dialog>
    </>
  );
};

export default CancelEventDailog;
