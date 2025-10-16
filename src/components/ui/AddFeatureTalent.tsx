import React, { useState } from 'react';

import { Check } from 'lucide-react';

import { CommonButton } from './CommonButton';
import CommonInput from './CommonInput';
import ProfileUpload from './ProfileUpload';
import Dialog from './dialog';

interface AddFeatureTalentProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: { talentName: string; talentImage: File | null }) => void;
}

const AddFeatureTalent: React.FC<AddFeatureTalentProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [talentName, setTalentName] = useState('');
  const [talentImage, setTalentImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = { talentName, talentImage };

    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log('Talent Name:', talentName);
      console.log('Talent Image:', talentImage);
    }

    handleClose();
  };

  const handleClose = () => {
    onClose();
    setTalentName('');
    setTalentImage(null);
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      title="Add Featured Talent"
      discription=" "
    >
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 px-5 py-[16px]">
          <label className="font-diatype text-[16px] font-medium !text-ui-neutralSurfaceOnColor">
            Artist Name
          </label>
          <CommonInput
            placeholder="Enter an Artist Name"
            autoComplete="off"
            onChange={e => setTalentName(e.target.value)}
            className="w-full bg-ui-neutralSurfaceBackground"
            type="text"
            required
          />
        </div>
        <div className="w-full">
          <label className="pl-5 font-diatype text-[16px] font-medium !text-ui-neutralSurfaceOnColor">
            Profile Image
          </label>
          <ProfileUpload
            uploadLimit={1}
            helperText=""
            showText={false}
            subText=""
            showUploadButton={true}
            onChange={newFiles => {
              setTalentImage(newFiles[0] || null);
            }}
            defaultFiles={talentImage ? [talentImage] : []}
          />
        </div>

        <div className="flex justify-between gap-3 px-5 py-2">
          <CommonButton
            onClick={handleClose}
            type="submit"
            className="w-full border !border-ui-neuteralSurfaceSecondary bg-transparent py-3 font-diatype text-ui-neutralSurfaceOnColor hover:bg-ui-neuteralSurfaceSecondary hover:text-white"
          >
            Cancel
          </CommonButton>
          <CommonButton
            leftIcon={<Check size={16} />}
            type="submit"
            className="w-full py-3 font-diatype"
          >
            Confirm
          </CommonButton>
        </div>
      </form>
    </Dialog>
  );
};

export default AddFeatureTalent;
