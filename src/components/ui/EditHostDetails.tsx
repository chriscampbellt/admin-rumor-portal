import { useState } from 'react';

import { Check } from 'lucide-react';

import { CountryList, countryCode } from '@/lib/constants';

import { CommonButton } from './CommonButton';
import CommonInput from './CommonInput';
import CountryPhoneInput from './CountryInputField';
import Dialog from './dialog';

interface EditHostDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: {
    firstName: string;
    lastName: string;
    company: string;
    email: string;
    phoneNumber: string;
    country: countryCode;
  }) => void;
}

const EditHostDetails: React.FC<EditHostDetailsProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const initialFormData = {
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phoneNumber: '',
    country: CountryList[0] as countryCode,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleCountryChange = (country: countryCode) => {
    setFormData(prev => ({ ...prev, country }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.company) newErrors.company = 'Company name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phoneNumber)
      newErrors.phoneNumber = 'Phone number is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit?.(formData);
    handleClose();
  };

  const handleClose = () => {
    onClose();
    setFormData(initialFormData);
    setErrors({});
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} title="Edit Host Details">
      <form onSubmit={handleSubmit} className="space-y-4 font-diatype">
        <div className="space-y-3.5 px-5 py-[16px]">
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
            <CommonInput
              required
              label="First Name"
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={e => handleInputChange('firstName', e.target.value)}
              error={!!errors.firstName}
              errorMessage={errors.firstName}
            />
            <CommonInput
              required
              label="Last Name"
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={e => handleInputChange('lastName', e.target.value)}
              error={!!errors.lastName}
              errorMessage={errors.lastName}
            />
          </div>

          <CommonInput
            required
            label="Company Name"
            id="company"
            type="text"
            value={formData.company}
            onChange={e => handleInputChange('company', e.target.value)}
            error={!!errors.company}
            errorMessage={errors.company}
          />

          <CommonInput
            required
            label="Email"
            id="email"
            type="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={e => handleInputChange('email', e.target.value)}
            error={!!errors.email}
            errorMessage={errors.email}
          />

          <CountryPhoneInput
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={value => handleInputChange('phoneNumber', value)}
            selectedCountry={formData.country}
            onCountryChange={handleCountryChange}
            error={!!errors.phoneNumber}
            errorMessage={errors.phoneNumber}
          />
        </div>

        <div className="flex justify-end gap-3 border-t border-ui-neutralBorderSupport px-5 pt-3">
          <CommonButton
            onClick={handleClose}
            type="submit"
            leftIcon={<Check size={16} />}
            className="rounded-full bg-ui-neutralSurfaceOnColor px-3.5 py-2 text-sm text-white transition-colors hover:bg-gray-800 sm:text-base"
          >
            Confirm
          </CommonButton>
        </div>
      </form>
    </Dialog>
  );
};

export default EditHostDetails;
