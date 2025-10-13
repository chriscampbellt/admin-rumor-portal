import { useState } from 'react';

import { Check } from 'lucide-react';

import { CommonButton } from './CommonButton';
import CommonInput from './CommonInput';
import Dialog from './dialog';

interface ChangePasswordProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ isOpen, onClose }) => {
  const initialFormData = {
    newPassword: '',
    confirmedPassword: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    field: keyof typeof initialFormData,
    value: string
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    }

    if (!formData.confirmedPassword) {
      newErrors.confirmedPassword = 'Confirm password is required';
    }

    if (
      formData.newPassword &&
      formData.confirmedPassword &&
      formData.newPassword !== formData.confirmedPassword
    ) {
      newErrors.confirmedPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    handleClose();
  };

  const handleClose = () => {
    onClose();
    setFormData(initialFormData);
    setErrors({});
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} title="Change your password">
      <form onSubmit={handleSubmit} className="space-y-4 font-diatype">
        <div className="space-y-3.5 px-5 py-[16px]">
          <CommonInput
            label="Enter New Password"
            type="password"
            value={formData.newPassword}
            onChange={e => handleInputChange('newPassword', e.target.value)}
            error={!!errors.newPassword}
            errorMessage={errors.newPassword}
          />
          <CommonInput
            label="Confirm New Password"
            type="password"
            value={formData.confirmedPassword}
            onChange={e =>
              handleInputChange('confirmedPassword', e.target.value)
            }
            error={!!errors.confirmedPassword}
            errorMessage={errors.confirmedPassword}
          />
        </div>

        <div className="flex justify-end gap-3 border-t border-neutral-100 px-5 py-3">
          <CommonButton
            onClick={handleClose}
            type="submit"
            leftIcon={<Check size={16} />}
            className="rounded-full bg-ui-neutralSurfaceOnColor px-3.5 py-2 text-sm text-white transition-colors hover:bg-gray-800 sm:text-base"
          >
            Save
          </CommonButton>
        </div>
      </form>
    </Dialog>
  );
};

export default ChangePassword;
