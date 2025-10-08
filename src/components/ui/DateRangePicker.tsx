'use client';

import React, { useState } from 'react';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import { cn } from '@/lib/utils';

import { CommonButton } from './CommonButton';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

interface DateRangePickerProps {
  value?: DateRange;
  onChange: (range: DateRange | undefined) => void;
  placeholder?: string;
  className?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  onChange,
  placeholder = 'Select date range...',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatDateRange = () => {
    if (!value?.from) return placeholder;
    if (!value.to) return format(value.from, 'MM/dd/yy');
    return `${format(value.from, 'MM/dd/yy')} - ${format(value.to, 'MM/dd/yy')}`;
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <CommonButton
            // variant="outline"
            className={cn(
              'bg-filter-section h-[45px] w-full justify-start rounded-8 border text-left font-normal text-ui-neutralSurfaceOnColor hover:bg-transparent',
              !value && 'text-ui-neutralSurfaceOnColor'
            )}
          >
            <CalendarIcon className="mr-2 h-5 w-5 text-ui-neuteralSurfaceSecondary" />
            {formatDateRange()}
          </CommonButton>
        </PopoverTrigger>

        <PopoverContent
          className="border-filter-border w-auto rounded-12 bg-white p-0 font-diatype text-sm font-medium shadow-lg"
          align="start"
        >
          <DayPicker
            mode="range"
            defaultMonth={value?.from}
            navLayout="around"
            selected={value}
            onSelect={range => {
              onChange(range);
              if (range?.from && range?.to) setIsOpen(false);
            }}
            numberOfMonths={1}
            className="day-picker rounded-16 bg-white shadow-lg"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
