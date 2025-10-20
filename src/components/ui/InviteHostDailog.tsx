'use client';

import { useState } from 'react';

import { CommonButton } from './CommonButton';
import CommonInput from './CommonInput';
import Dialog from './dialog';

interface InviteHostDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  }) => void;
}

export default function InviteHostDialog({
  isOpen,
  onClose,
  onSubmit,
}: InviteHostDialogProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const validateForm = () => {
    let valid = true;
    if (!firstName.trim()) {
      setFirstNameError('First name is required');
      valid = false;
    } else {
      setFirstNameError('');
    }

    if (!lastName.trim()) {
      setLastNameError('Last name is required');
      valid = false;
    } else {
      setLastNameError('');
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError('Please provide a valid email address');
        valid = false;
      } else {
        setEmailError('');
      }
    } else {
      setEmailError('');
    }

    if (phoneNumber && phoneNumber.length < 8) {
      setPhoneError('Phone number must be at least 8 digits');
      valid = false;
    } else {
      setPhoneError('');
    }

    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = { firstName, lastName, email, phoneNumber };
    if (onSubmit) onSubmit(data);

    handleClose();
  };

  const handleClose = () => {
    onClose();
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
    setFirstNameError('');
    setLastNameError('');
    setEmailError('');
    setPhoneError('');
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} title="Invite Host">
      <form onSubmit={handleSubmit} className="space-y-5 px-5 py-4">
        <CommonInput
          label="First Name"
          required
          className="!bg-ui-neutralSurfaceBackground"
          placeholder="Enter First Name"
          value={firstName}
          onChange={e => {
            setFirstName(e.target.value);
            setFirstNameError('');
          }}
          error={!!firstNameError}
          errorMessage={firstNameError}
        />
        <CommonInput
          label="Last Name"
          required
          className="!bg-ui-neutralSurfaceBackground"
          placeholder="Enter Last Name"
          value={lastName}
          onChange={e => {
            setLastName(e.target.value);
            setLastNameError('');
          }}
          error={!!lastNameError}
          errorMessage={lastNameError}
        />
        <CommonInput
          label="Email"
          className="!bg-ui-neutralSurfaceBackground"
          type="email"
          placeholder="Enter Email Address"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            setEmailError('');
          }}
          error={!!emailError}
          errorMessage={emailError}
        />
        <CommonInput
          label="Phone Number"
          className="!bg-ui-neutralSurfaceBackground"
          placeholder="Enter Phone Number"
          value={phoneNumber}
          onChange={e => {
            setPhoneNumber(e.target.value);
            setPhoneError('');
          }}
          error={!!phoneError}
          errorMessage={phoneError}
        />
        <div className="flex justify-end gap-3 pt-4">
          <CommonButton
            type="submit"
            className="w-full max-w-[200px] border !border-ui-neuteralSurfaceSecondary bg-transparent py-3 font-diatype text-ui-neutralSurfaceOnColor hover:bg-ui-neuteralSurfaceSecondary hover:text-white"
          >
            Cancel
          </CommonButton>
          <CommonButton
            type="submit"
            onClick={handleClose}
            className="w-full max-w-[200px] py-3 font-diatype"
          >
            Send Invite
          </CommonButton>
        </div>
      </form>
    </Dialog>
  );
}
