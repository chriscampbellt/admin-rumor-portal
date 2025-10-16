'use client';

import React, { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import { cn } from '@/lib/utils';

import { Popover, PopoverContent, PopoverTrigger } from './Popover';

const TIME_SLOTS = [
  '9:00 AM',
  '9:15 AM',
  '9:30 AM',
  '9:45 AM',
  '10:00 AM',
  '10:15 AM',
  '9:00 PM',
  '9:15 PM',
  '9:30 PM',
  '9:45 PM',
  '10:00 PM',
];

const TIMEZONES = [
  'EST',
  'PST',
  'MST',
  'CST',
  'HST',
  'AKST',
  'GMT',
  'UTC',
  'CET',
  'EET',
  'JST',
  'AEST',
  'IST',
  'MSK',
  'BRT',
  'NZST',
];

interface DateTimePickerProps {
  label?: string;
  value?: { date?: Date; time?: string; timezone?: string };
  onChange: (value: { date?: Date; time?: string; timezone?: string }) => void;
  placeholder?: string;
  className?: string;
  showTimezone?: boolean;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  label = 'Start Date',
  value = {},
  onChange,
  placeholder = 'Select date and time...',
  className,
  showTimezone = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    value.date
  );
  const [selectedTime, setSelectedTime] = useState(value.time);
  const [selectedTimezone, setSelectedTimezone] = useState(value.timezone);

  useEffect(() => {
    setSelectedDate(value.date);
    setSelectedTime(value.time);
    setSelectedTimezone(value.timezone);
  }, [value.date, value.time, value.timezone]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    onChange({ date, time: selectedTime, timezone: selectedTimezone });
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    onChange({ date: selectedDate, time, timezone: selectedTimezone });
  };

  const handleTimezoneSelect = (tz: string) => {
    setSelectedTimezone(tz);
    onChange({ date: selectedDate, time: selectedTime, timezone: tz });
  };

  const formatDateTime = () => {
    if (!selectedDate) return '';
    const datePart = format(selectedDate, 'MM/dd/yy');
    if (!selectedTime) return `${datePart} ${selectedTimezone || ''}`;
    return `${datePart} ${selectedTime} ${selectedTimezone || ''}`;
  };
  const displayValue = formatDateTime();
  return (
    <div className={cn('relative', className)}>
      <label
        className={cn(
          'absolute left-3 top-3.5 -translate-y-1/2 bg-transparent font-diatype text-xs text-ui-textTertiary transition-all duration-200',
          (isOpen || displayValue) && 'top-3.5 -translate-y-1/2'
        )}
      >
        {label}
      </label>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div
            className={cn(
              'group flex w-full cursor-pointer items-center justify-between gap-2 rounded-[8px] border border-ui-neutralSurfaceBackground bg-ui-neutralSurfaceBackground px-3 pb-1 pt-6 text-left font-diatype text-sm font-medium text-ui-neutralSurfaceOnColor outline-none transition-colors focus:outline-none focus:ring-0',
              !selectedDate && 'text-ui-neutralPlaceholder'
            )}
          >
            <span className="truncate">{displayValue || placeholder}</span>
            <CalendarIcon className="text-[rgba(0, 0, 0, 0.56)] h-5 w-5 flex-shrink-0" />
          </div>
        </PopoverTrigger>

        <PopoverContent
          className="flex w-full flex-col items-start justify-center rounded-24 bg-white p-[4px] font-diatype text-sm font-medium shadow-xl sm:flex-row"
          align="start"
        >
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            defaultMonth={selectedDate}
            navLayout="around"
            numberOfMonths={1}
            className="day-picker rounded-16 bg-white p-2"
          />
          <div className="w-full overflow-y-auto border-l border-ui-neutralBorderComponent p-0 sm:w-24">
            <div className="pt-3">
              <p className="mb-2 text-center text-sm font-semibold">Time</p>
              <div className="max-h-72 overflow-y-auto">
                {TIME_SLOTS.map(time => (
                  <div
                    key={time}
                    className={cn(
                      'cursor-pointer py-2 text-center hover:bg-gray-100',
                      selectedTime === time
                        ? 'bg-ui-bgBlur font-medium text-white hover:bg-ui-bgBlur'
                        : 'text-gray-900'
                    )}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {showTimezone && (
            <div className="w-full overflow-y-auto border-l border-ui-neutralBorderComponent p-0 sm:w-24">
              <div className="pt-3">
                <p className="mb-2 text-center text-sm font-semibold">
                  Timezone
                </p>
                <div className="max-h-72 overflow-y-auto">
                  {TIMEZONES.map(tz => (
                    <div
                      key={tz}
                      className={cn(
                        'cursor-pointer py-2 text-center hover:bg-gray-100',
                        selectedTimezone === tz
                          ? 'bg-ui-bgBlur font-medium text-white hover:bg-ui-bgBlur'
                          : 'text-gray-900'
                      )}
                      onClick={() => handleTimezoneSelect(tz)}
                    >
                      {tz}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};
