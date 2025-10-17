import { useState } from 'react';

import { Check } from 'lucide-react';

import { CommonButton } from './CommonButton';
import CommonInput from './CommonInput';
import Dialog from './dialog';

interface AddTicketDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: { ticketTypeName: string; description: string }) => void;
}

const AddTicketDialog: React.FC<AddTicketDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [ticketTypeName, setTicketTypeName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      ticketTypeName,
      description,
    };
    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log('Ticket Type:', ticketTypeName);
      console.log('Description:', description);
    }
    onClose();
    setTicketTypeName('');
    setDescription('');
  };

  const handleClose = () => {
    onClose();
    setTicketTypeName('');
    setDescription('');
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      title="Add Ticket Type"
      discription=" "
      maxWidth="auto"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4 px-5 py-[16px]">
          {' '}
          <div>
            <label className="font-diatype text-[16px] font-medium !text-ui-neutralSurfaceOnColor">
              Ticket Type Name
            </label>
            <CommonInput
              placeholder="Enter ticket type name"
              autoComplete="off"
              onChange={e => setTicketTypeName(e.target.value)}
              className="w-full bg-ui-neutralSurfaceBackground"
              type="text"
              required
            />
          </div>
          <div>
            <label className="font-diatype text-[16px] font-medium !text-ui-neutralSurfaceOnColor">
              Description
            </label>
            <textarea
              placeholder="Enter a description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={1}
              className="w-full resize-none rounded-[8px] border bg-ui-neutralSurfaceBackground p-3.5 font-diatype text-sm font-medium text-ui-neutralSurfaceOnColor outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 px-5 py-2">
          <CommonButton
            onClick={handleClose}
            type="submit"
            className="w-full max-w-[250px] border !border-ui-neuteralSurfaceSecondary bg-transparent py-3 font-diatype text-ui-neutralSurfaceOnColor hover:bg-ui-neuteralSurfaceSecondary hover:text-white"
          >
            Cancel
          </CommonButton>
          <CommonButton
            leftIcon={<Check size={16} />}
            type="submit"
            className="w-full max-w-[250px] py-3 font-diatype"
          >
            Confirm
          </CommonButton>
        </div>
      </form>
    </Dialog>
  );
};

export default AddTicketDialog;
