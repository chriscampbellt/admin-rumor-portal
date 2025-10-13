'use client';

import { useState } from 'react';

import {
  ChevronDown,
  Edit2,
  EyeOff,
  Info,
  MapPin,
  Plus,
  Trash2,
} from 'lucide-react';

import Checkbox from '@/components/ui/Checkbox';
import { CommonButton } from '@/components/ui/CommonButton';
import CommonInput from '@/components/ui/CommonInput';
import CommonSelect from '@/components/ui/CommonSelect';
import { DateTimePicker } from '@/components/ui/DateTimePicker';
import Upload from '@/components/ui/Upload';

export default function DuplicateEventPage() {
  const [showMap, setShowMap] = useState(true);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    timezone: 'EST',
    location: '584 Broadway, New York, NY, 10022',
    furtherInstructions: '',
    eventDescription: '',
    visibility: 'public',
    eventType: 'Sporting Event',
    plusOneLimit: 'Up to 3',
    ageLimit: '21+',
    publishSettings: 'Publish automatically once approved',
    qrCodes: 'No',
  });

  return (
    <div className="min-h-screen bg-ui-neutralSurfaceBackground">
      <div className="px-6 py-4">
        <div className="flex w-full items-center justify-between">
          <h1 className="w-full max-w-[80%] border-b border-ui-neutralSurfaceOnColor pb-1.5 pl-5 font-romie text-3xl font-medium text-ui-neutralSurfaceOnColor 2xl:text-[50px]">
            Sample Event (copy)
          </h1>
          <div className="flex items-center gap-2 rounded-full bg-white px-2.5 py-2 font-diatype text-sm text-ui-neutralSurfaceOnColor">
            <EyeOff size={16} />
            <span>Private</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-[24px] bg-white p-6 shadow-sm">
              <h2 className="pb-6 font-diatype text-base font-medium text-ui-neutralSurfaceOnColor">
                Event Details<span className="font-serif">*</span>
              </h2>

              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <DateTimePicker
                    label="Start Date"
                    value={{
                      date: formData.startDate
                        ? new Date(formData.startDate)
                        : undefined,
                      time: '7:30 PM',
                      timezone: 'EST',
                    }}
                    onChange={val => {
                      const date = val?.date;
                      if (date) {
                        setFormData(prev => ({
                          ...prev,
                          startDate: date.toISOString(),
                          timezone: val?.timezone || 'EST',
                        }));
                      }
                    }}
                    placeholder="02/12/24 7:30PM EST"
                    showTimezone={true}
                    className="w-full"
                  />
                  <DateTimePicker
                    label="End Date"
                    value={{
                      date: formData.endDate
                        ? new Date(formData.endDate)
                        : undefined,
                      time: '11:30 PM',
                      timezone: 'EST',
                    }}
                    onChange={val => {
                      const date = val?.date;
                      if (date) {
                        setFormData(prev => ({
                          ...prev,
                          endDate: date.toISOString(),
                          timezone: val.timezone || 'EST',
                        }));
                      }
                    }}
                    placeholder="06/12/24 11:30PM EST"
                    showTimezone={true}
                    className="w-full"
                  />
                </div>

                <CommonInput
                  icon={
                    <MapPin className="h-5 w-5 text-ui-neutralContentLight" />
                  }
                  value={formData.location}
                  placeholder="Event Location"
                  onChange={e =>
                    setFormData(prev => ({ ...prev, location: e.target.value }))
                  }
                  className="w-full !border-transparent bg-ui-neutralSurfaceBackground"
                  type="text"
                />

                {showMap && (
                  <div className="h-40 overflow-hidden rounded-lg bg-gray-200">
                    <img
                      src="/images/Maps.png"
                      alt="Map"
                      className="h-full w-full object-cover"
                      onError={e => {
                        e.currentTarget.src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='160' viewBox='0 0 600 160'%3E%3Crect fill='%23e5e7eb' width='600' height='160'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%239ca3af'%3EMap Preview%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                )}

                <Checkbox
                  label="Hide full address for confirmed guests"
                  checked={!showMap}
                  onChange={val => setShowMap(!val)}
                  className="pb-2"
                />

                <div className="rounded-lg bg-ui-neutralSurfaceBackground px-4 py-2.5 font-diatype">
                  <h5 className="text-[15px] text-ui-textTertiary">
                    Further Instructions
                  </h5>
                  <p className="text-[15px] text-ui-neutralSurfaceOnColor">
                    Lorem ipsum dolor sit amet. Ut dolorem rchitecto iure sed
                    as...
                  </p>
                </div>
                <div className="flex items-center gap-2.5 rounded-lg bg-ui-neutralSurfaceBackground px-4 py-2.5 font-diatype">
                  <Info className="h-5 w-5 text-[#0000008F]" />
                  <div>
                    <h5 className="text-[15px] text-ui-textTertiary">
                      Event Description
                    </h5>
                    <p className="text-[15px] text-ui-neutralSurfaceOnColor">
                      Lorem ipsum dolor sit amet. Ut dolorem rchitecto iure sed
                      as...
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] bg-white p-6 shadow-sm">
              <h2 className="pb-6 font-diatype text-base font-medium text-ui-neutralSurfaceOnColor">
                Event Settings<span className="font-serif">*</span>
              </h2>

              <div className="space-y-4">
                <CommonSelect
                  label="Event Type"
                  value={formData.eventType}
                  placeholder="Please Select"
                  onChange={val =>
                    setFormData(prev => ({ ...prev, eventType: val }))
                  }
                  options={[
                    { value: 'Sporting Event', label: 'Sporting Event' },
                    { value: 'Concert', label: 'Concert' },
                    { value: 'Festival', label: 'Festival' },
                    { value: 'Conference', label: 'Conference' },
                  ]}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <CommonSelect
                    label="Plus 1 Limit"
                    value={formData.plusOneLimit}
                    placeholder="Please Select"
                    onChange={val =>
                      setFormData(prev => ({ ...prev, plusOneLimit: val }))
                    }
                    options={[
                      { value: 'No Plus One', label: 'No Plus One' },
                      { value: 'Up to 1', label: 'Up to 1' },
                      { value: 'Up to 3', label: 'Up to 3' },
                      { value: 'Up to 5', label: 'Up to 5' },
                    ]}
                  />

                  <CommonSelect
                    label="Age Limit"
                    value={formData.ageLimit}
                    placeholder="Please Select"
                    onChange={val =>
                      setFormData(prev => ({ ...prev, ageLimit: val }))
                    }
                    options={[
                      { value: 'All Ages', label: 'All Ages' },
                      { value: '18+', label: '18+' },
                      { value: '21+', label: '21+' },
                    ]}
                  />
                </div>

                <CommonSelect
                  label="Event Publish Settings"
                  value={formData.publishSettings}
                  placeholder="Please Select"
                  onChange={val =>
                    setFormData(prev => ({ ...prev, publishSettings: val }))
                  }
                  options={[
                    {
                      value: 'Publish automatically once approved',
                      label: 'Publish automatically once approved',
                    },
                    {
                      value: 'Schedule publish date',
                      label: 'Schedule publish date',
                    },
                    { value: 'Keep as draft', label: 'Keep as draft' },
                  ]}
                />
              </div>
            </div>

            <div className="rounded-[24px] bg-white p-6 shadow-sm">
              <h2 className="pb-6 font-diatype text-base font-medium text-ui-neutralSurfaceOnColor">
                Ticket Types<span className="font-serif">*</span>
              </h2>

              <div className="space-y-5">
                {['VIP', 'General Admission'].map(ticket => (
                  <div
                    key={ticket}
                    className="flex items-center justify-between rounded-lg bg-ui-neutralSurfaceBackground px-5 py-4"
                  >
                    <span className="font-diatype text-sm font-medium text-ui-neutralSurfaceOnColor">
                      {ticket}
                    </span>
                    <div className="flex gap-4">
                      <Edit2 className="h-5 w-5 text-[#0000008F]" />
                      <Trash2 className="h-5 w-5 text-[#0000008F]" />
                    </div>
                  </div>
                ))}

                <CommonButton
                  leftIcon={<Plus className="h-4 w-4" />}
                  className="w-full border border-ui-neuteralSurfaceSecondary bg-transparent py-3 font-diatype text-ui-neutralSurfaceOnColor hover:bg-ui-neuteralSurfaceSecondary hover:text-white"
                >
                  Add Ticket Type
                </CommonButton>
                <div className="space-y-4 pt-4">
                  <label className="font-diatype text-[16px] font-medium">
                    Would you like to utilize QR codes for your event check-in?
                  </label>
                  <CommonSelect
                    value={formData.qrCodes}
                    placeholder="Select"
                    onChange={val =>
                      setFormData(prev => ({ ...prev, qrCodes: val }))
                    }
                    options={[
                      { value: 'No', label: 'No' },
                      { value: 'Yes', label: 'Yes' },
                    ]}
                  />
                  <p className="mt-2 pl-4 font-diatype text-xs text-ui-neutralContentLight">
                    Check in guests manually by searching for their name in the
                    guest list.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[24px] bg-white p-6 shadow-sm">
              <h2 className="pb-6 font-diatype text-base font-medium text-ui-neutralSurfaceOnColor">
                Event Artwork<span className="font-serif">*</span>
              </h2>
              <Upload uploadLimit={1} className="border-none" />
            </div>

            {/* <div className="rounded-[24px] bg-white p-6 shadow-sm">
              <h2 className="mb-6 border-b border-neutral-100 pb-4 font-diatype text-base font-medium text-ui-neutralSurfaceOnColor">
                Featured Talent
              </h2>

              <div className="mb-4 flex items-center justify-between rounded-lg bg-ui-neutralSurfaceBackground px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                  <span className="font-diatype text-sm font-medium text-ui-neutralSurfaceOnColor">Emma Watson</span>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-full bg-white p-2 hover:bg-gray-100">
                    <Edit2 className="h-4 w-4 text-ui-neutralSurfaceOnColor" />
                  </button>
                  <button className="rounded-full bg-white p-2 hover:bg-gray-100">
                    <Trash2 className="h-4 w-4 text-ui-neutralSurfaceOnColor" />
                  </button>
                </div>
              </div>

              <CommonButton
                leftIcon={<Plus className="h-4 w-4" />}
                className="w-full rounded-full border-2 border-black bg-white py-3 font-diatype text-sm font-medium text-black hover:bg-black hover:text-white"
              >
                Add Featured Talent
              </CommonButton>
            </div>

            <div className="rounded-[24px] bg-white p-6 shadow-sm">
              <h2 className="mb-6 border-b border-neutral-100 pb-4 font-diatype text-base font-medium text-ui-neutralSurfaceOnColor">
                Event Collaborators
              </h2>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-ui-neutralSurfaceBackground px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                    <span className="font-diatype text-sm font-medium text-ui-neutralSurfaceOnColor">Uncommon Entertainment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-white px-3 py-1 font-diatype text-xs font-medium text-ui-neutralSurfaceOnColor">Co-Host</span>
                    <span className="text-ui-neutralContentLight">🔒</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between rounded-lg bg-ui-neutralSurfaceBackground px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ui-neutralSurfaceSupport font-diatype text-sm font-medium text-ui-neutralSurfaceOnColor">
                      KT
                    </div>
                    <span className="font-diatype text-sm font-medium text-ui-neutralSurfaceOnColor">King Tide</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-white px-3 py-1 font-diatype text-xs font-medium text-ui-neutralSurfaceOnColor">Guest List Contributor</span>
                    <button className="rounded-full bg-white p-2 hover:bg-gray-100">
                      <Edit2 className="h-4 w-4 text-ui-neutralSurfaceOnColor" />
                    </button>
                    <button className="rounded-full bg-white p-2 hover:bg-gray-100">
                      <Trash2 className="h-4 w-4 text-ui-neutralSurfaceOnColor" />
                    </button>
                  </div>
                </div>

                <CommonButton
                  leftIcon={<Plus className="h-4 w-4" />}
                  className="w-full rounded-full border-2 border-black bg-white py-3 font-diatype text-sm font-medium text-black hover:bg-black hover:text-white"
                >
                  Add Event Collaborators
                </CommonButton>
              </div>
            </div>

            <div className="rounded-[24px] bg-white p-6 shadow-sm">
              <h2 className="mb-6 flex items-center gap-2 border-b border-neutral-100 pb-4 font-diatype text-base font-medium text-ui-neutralSurfaceOnColor">
                Questionnaire
                <Tooltip
                  trigger={<Info className="h-4 w-4 text-ui-neutralContentLight" />}
                  content="Ask guests questions when they RSVP via mobile app."
                />
              </h2>

              <p className="mb-4 font-diatype text-sm text-ui-neutralContentBody">
                Ask guests questions when they RSVP via mobile app.
              </p>

              <div className="space-y-3">
                {['What is your favorite place?', 'Where is the place?'].map((question, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-lg bg-ui-neutralSurfaceBackground px-4 py-3">
                    <span className="font-diatype text-sm text-ui-neutralSurfaceOnColor">{question}</span>
                    <div className="flex gap-2">
                      <button className="rounded-full bg-white p-2 hover:bg-gray-100">
                        <Edit2 className="h-4 w-4 text-ui-neutralSurfaceOnColor" />
                      </button>
                      <button className="rounded-full bg-white p-2 hover:bg-gray-100">
                        <Trash2 className="h-4 w-4 text-ui-neutralSurfaceOnColor" />
                      </button>
                    </div>
                  </div>
                ))}

                <CommonButton
                  leftIcon={<Plus className="h-4 w-4" />}
                  className="w-full rounded-full border-2 border-black bg-white py-3 font-diatype text-sm font-medium text-black hover:bg-black hover:text-white"
                >
                  Add Question
                </CommonButton>
              </div>
            </div> */}
          </div>
        </div>

        {/* <div className="flex flex-wrap justify-start gap-3 px-6 pt-6 lg:justify-end">
          <CommonButton
            className="w-full max-w-[250px] py-3 font-diatype bg-transparent text-ui-neutralSurfaceOnColor border border-ui-neuteralSurfaceSecondary hover:bg-ui-neuteralSurfaceSecondary hover:text-white"
          >
            Save as Draft
          </CommonButton>
          <CommonButton
            type="submit"
            className="w-full max-w-[250px] py-3 font-diatype bg-ui-bgBlur text-white  hover:bg-ui-neuteralSurfaceSecondary hover:text-ui-neutralSurfaceOnColor"
          >
            Submit Event
          </CommonButton>
        </div> */}
      </div>
    </div>
  );
}
