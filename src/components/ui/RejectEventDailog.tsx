import { useState } from 'react';

import { Trash2 } from 'lucide-react';

import { CommonButton } from '@/components/ui/CommonButton';
import Dialog from '@/components/ui/dialog';
import useToggle from '@/lib/useToggle';

import CommonInput from './CommonInput';
import EventRejected from './EventRejected';

interface RejectEventDailogProps {
  isOpen: boolean;
  onClose: () => void;
}

const RejectEventDailog: React.FC<RejectEventDailogProps> = ({
  isOpen,
  onClose,
}) => {
  const [message, setMessage] = useState('');
  const handleClose = () => {
    onClose();
    open();
  };
  const { isOpen: isRejectOpen, open, toggle } = useToggle(false);
  return (
    <>
      <Dialog isOpen={isOpen} onClose={handleClose}>
        <h2 className="px-2 pb-2 text-center font-romie text-xl font-bold text-ui-neutralSurfaceOnColor md:text-2xl">
          Are you sure you want to reject this event?
        </h2>
        <p className="mx-6 border-b pb-5 text-center font-diatype text-[16px] leading-9 !text-ui-textPrimaryColor">
          This operation cannot be undone. The event will return to the
          Host&apos;s drafts where it can be edited and resubmitted.
        </p>

        <div className="space-y-4 px-6 py-6">
          <label className="font-diatype text-[16px] font-bold !text-ui-neutralSurfaceOnColor">
            Message
          </label>
          <p className="font-diatype text-[16px] !text-ui-neutralSurfaceOnColor">
            Hi [Host Name], [Event Name] has been rejected. Please contact
            support@therumor.com if you have any questions.
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
            type="submit"
            disabled
            className="w-full max-w-[250px] !bg-[rgba(0,0,0,0.2)] py-3 font-diatype text-ui-textTertiary hover:text-ui-textTertiary"
          >
            Cancel
          </CommonButton>
          <CommonButton
            type="submit"
            onClick={handleClose}
            className="w-full max-w-[250px] border-ui-errorBorderColor bg-ui-errorBorderColor py-3 font-diatype text-white hover:bg-red-700"
          >
            Reject Event
          </CommonButton>
        </div>
      </Dialog>
      <EventRejected isOpen={isRejectOpen} onClose={toggle} />
    </>
  );
};

export default RejectEventDailog;
