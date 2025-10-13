import { useState } from 'react';

import { Check } from 'lucide-react';

import { CommonButton } from './CommonButton';
import CommonInput from './CommonInput';
import Upload from './Upload';
import Dialog from './dialog';

interface EditEventSeriesProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: {
    eventName: string;
    location: string;
    description: string;
  }) => void;
}

const EditEventSeries: React.FC<EditEventSeriesProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [eventName, setEventName] = useState('Lakers Season 2025');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState(
    'Revolve Festival kicks off the 2023 Coachella festival season in style. Making a show-stopping return to the desert with its bigg...Revolve Festival kicks off the 2023 Coachella festival season in style. Making a show-stopping return to the desert with its bigg...Revolve Festival kicks off the 2023 Coachella festival season in style. Making a show-stopping return to the desert with its bigg...Revolve Festival kicks off the 2023 Coachella festival season in style. Making a show-stopping return to the desert with its bigg...'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = { eventName, location, description };

    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log('Event Name:', eventName);
      console.log('Location:', location);
      console.log('Description:', description);
    }

    onClose();
    setEventName('');
    setLocation('');
    setDescription('');
  };

  const handleClose = () => {
    onClose();
    setEventName('');
    setLocation('');
    setDescription('');
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} title="Edit Event Series">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="pt-5">
          <h2 className="pb-3.5 text-center text-[16px] font-medium text-zinc-900">
            <span className="font-diatype">Event Series Flyer</span>
            <span className="font-serif text-red-600">*</span>
          </h2>
          <Upload uploadLimit={1} />
        </div>
        <div className="space-y-4 px-5 py-[16px]">
          {' '}
          <div>
            <label className="font-diatype text-[16px] font-medium !text-ui-neutralSurfaceOnColor">
              Event Series Name
              <span className="font-serif text-red-600">*</span>
            </label>
            <CommonInput
              placeholder="Enter event series name"
              autoComplete="off"
              onChange={e => setEventName(e.target.value)}
              className="w-full"
              type="text"
              required
            />
          </div>
          <div>
            <label className="font-diatype text-[16px] font-medium !text-ui-neutralSurfaceOnColor">
              Series Description
              <span className="font-serif text-red-600">*</span>
            </label>
            <textarea
              placeholder="Enter a description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={5}
              className="w-full resize-none rounded-[8px] border bg-white p-4 font-diatype text-sm font-medium text-ui-neutralSurfaceOnColor outline-none placeholder:text-ui-neutralPlaceholder"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-ui-neutralBorderSupport px-5 py-3">
          <CommonButton
            onClick={handleClose}
            leftIcon={<Check size={16} />}
            type="submit"
            className="rounded-full bg-ui-neutralSurfaceOnColor px-3.5 py-2 text-sm text-white transition-colors hover:bg-gray-800 lg:text-base"
          >
            Confirm
          </CommonButton>
        </div>
      </form>
    </Dialog>
  );
};

export default EditEventSeries;
