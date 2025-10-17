import { useState } from 'react';

import { EyeOff, Globe } from 'lucide-react';

import Checkbox from './Checkbox';
import Dialog from './dialog';

interface VisibilitySelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const VisibilitySelector: React.FC<VisibilitySelectorProps> = ({
  isOpen,
  onClose,
}) => {
  const [selected, setSelected] = useState<'public' | 'private'>('public');

  const handleSelect = (val: 'public' | 'private') => {
    setSelected(val);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} showCloseButton={false}>
      <div className="w-full rounded-2xl bg-white shadow-sm">
        <div
          className={`flex cursor-pointer items-start gap-3 rounded-xl px-4 transition-all ${
            selected === 'public' ? 'bg-ui-neutralSurfaceBackground' : ''
          }`}
          onClick={() => handleSelect('public')}
        >
          <Globe className="mt-1 h-5 w-5 text-ui-neutralSurfaceOnColor" />
          <div className="flex-1">
            <p className="font-diatype text-base text-ui-neutralSurfaceOnColor">
              Public
            </p>
            <p className="text-sm text-ui-neutralContentLight">
              Shown on the discovery page of the Rumor app.
            </p>
          </div>
          <Checkbox
            checked={selected === 'public'}
            onChange={() => handleSelect('public')}
          />
        </div>
        <div
          className={`mt-2 flex cursor-pointer items-start gap-3 rounded-xl px-4 py-3 transition-all ${
            selected === 'private' ? 'bg-ui-neutralSurfaceBackground' : ''
          }`}
          onClick={() => handleSelect('private')}
        >
          <EyeOff className="mt-1 h-5 w-5 text-ui-neutralSurfaceOnColor" />
          <div className="flex-1">
            <p className="font-diatype text-base text-ui-neutralSurfaceOnColor">
              Private
            </p>
            <p className="text-sm text-ui-neutralContentLight">
              Not listed publicly. Only people you invite can register.
            </p>
          </div>
          <Checkbox
            checked={selected === 'private'}
            onChange={() => handleSelect('private')}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default VisibilitySelector;
