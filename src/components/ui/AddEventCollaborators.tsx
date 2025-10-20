import React, { useState } from 'react';

import Image from 'next/image';

import { Infinity, Check, Trash2 } from 'lucide-react';

import Checkbox from './Checkbox';
import { CommonButton } from './CommonButton';
import CommonInput from './CommonInput';
import CommonSelect from './CommonSelect';
import Toggle from './Toggle';
import Tooltip from './Tooltip';
import Dialog from './dialog';

interface AddEventCollaboratorsProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: { email: string; role: string }) => void;
}

interface Toggles {
  eventSeries: boolean;
}

const AddEventCollaborators: React.FC<AddEventCollaboratorsProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [showPermissions, setShowPermissions] = useState(false); // controls permissions section visibility
  const [toggles, setToggles] = useState<Toggles>({ eventSeries: false });
  const [ticketType, setTicketType] = useState('');
  const [numberOfUses, setNumberOfUses] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { email, role };
    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log('Email:', email);
      console.log('Role:', role);
    }
    handleClose();
  };

  const handleClose = () => {
    onClose();
    setEmail('');
    setRole('');
    setShowPermissions(true);
    setToggles({ eventSeries: false });
    setTicketType('');
    setNumberOfUses('');
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      title="Add Event Collaborator"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4 px-5 py-[16px]">
          <h2 className="font-diatype text-[16px] font-medium text-ui-neutralSurfaceOnColor">
            Contact Information
          </h2>
          <div>
            <label className="font-diatype text-[16px] font-medium !text-ui-neutralSurfaceOnColor">
              Email <span className="text-red-600">*</span>
            </label>
            <CommonInput
              placeholder="Enter Email Address"
              autoComplete="off"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full"
              type="email"
              required
            />
          </div>

          {/* Roles & Permissions */}
          <h2 className="font-diatype text-[16px] font-medium text-ui-neutralSurfaceOnColor">
            Roles & Permissions
          </h2>
          <div>
            <label className="font-diatype text-[16px] font-medium !text-ui-neutralSurfaceOnColor">
              Select Role <span className="text-red-600">*</span>
            </label>
            <CommonSelect
              value={role}
              placeholder="Select Role"
              onChange={val => setRole(val)}
              options={[
                { value: 'organizer', label: 'Organizer' },
                { value: 'co-host', label: 'Co-Host' },
              ]}
            />
          </div>

          {/* Display Collaborator Name */}
          <Checkbox
            label="Display collaborator's name on event page"
            checked={showPermissions}
            onChange={setShowPermissions}
          />

          {/* Permissions Section */}
          {showPermissions && (
            <>
              <div className="flex cursor-pointer items-center gap-3 rounded-8 bg-ui-neutralSurfaceBackground p-4">
                <Checkbox
                  label="Edit event details & settings"
                  checked={true}
                  disabled
                  className="py-1.5 !text-ui-neutralSurfaceOnColor"
                />
              </div>
              <div className="flex cursor-pointer flex-col items-start gap-3 rounded-8 bg-ui-neutralSurfaceBackground p-4">
                <Checkbox label="Invite guests" checked={true} disabled />
                <Checkbox
                  label="Add guests as a drafts"
                  checked={true}
                  className="pl-6"
                  disabled
                />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-1 py-2">
                  <p className="font-diatype text-[14px] font-medium text-ui-neutralSurfaceOnColor">
                    Ticket Allocation
                  </p>
                  <Tooltip
                    trigger={
                      <Image
                        src="/images/info-circle.svg"
                        width={18}
                        height={18}
                        alt="Info Icon"
                      />
                    }
                    content="Ticket Allocation"
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  {' '}
                  <Toggle
                    checked={toggles.eventSeries}
                    onChange={val =>
                      setToggles(prev => ({ ...prev, eventSeries: val }))
                    }
                  />
                  <span className="text-[12px]">Limit Tickets </span>
                </div>
              </div>

              <div className="grid gap-2 lg:grid-cols-3">
                <div className="lg:col-span-1">
                  <label className="font-diatype text-[14px] font-medium text-ui-neutralSurfaceOnColor">
                    Ticket Type <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <CommonSelect
                      value={ticketType}
                      placeholder="Select Ticket Type"
                      onChange={val => setTicketType(val)}
                      options={[
                        { value: 'standard', label: 'Standard' },
                        { value: 'general', label: 'General' },
                        { value: 'vip', label: 'VIP' },
                      ]}
                    />
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <label className="font-diatype text-[14px] font-medium text-ui-neutralSurfaceOnColor">
                    Number of Uses <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <CommonSelect
                      value={numberOfUses}
                      placeholder="Unlimited"
                      onChange={val => setNumberOfUses(val)}
                      options={[
                        { value: 'unlimited', label: 'Unlimited' },
                        { value: 'custom', label: 'Custom' },
                      ]}
                    />
                  </div>
                </div>

                <div className="flex items-end lg:col-span-1">
                  <div className="flex items-center gap-2">
                    <CommonInput
                      icon={<Infinity size={18} className="text-black" />}
                      autoComplete="off"
                      type="number"
                      value={numberOfUses === 'custom' ? undefined : ''}
                      onChange={e => setNumberOfUses(e.target.value)}
                      disabled={numberOfUses !== 'custom'}
                      bgColorClass={'bg-ui-neutralBgDisabled'}
                      className={`flex h-[48px] w-full border-0 bg-ui-neutralBgDisabled text-ui-neutralSurfaceOnColor ${
                        numberOfUses !== 'custom' ? 'cursor-not-allowed' : ''
                      }`}
                    />

                    <button
                      type="button"
                      className="flex h-8 min-w-8 items-center justify-center rounded-full bg-ui-neutralSurfaceBackground transition-colors hover:bg-gray-100"
                    >
                      <Trash2 size={18} className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-ui-neutralBorderSupport px-5 py-3">
          <CommonButton
            leftIcon={<Check size={16} />}
            type="submit"
            className="rounded-full bg-ui-neutralSurfaceOnColor px-3.5 py-2 text-white transition-colors hover:bg-gray-800"
          >
            Confirm
          </CommonButton>
        </div>
      </form>
    </Dialog>
  );
};

export default AddEventCollaborators;
