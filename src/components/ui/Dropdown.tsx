'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

export interface DropdownOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function CustomDropdown({
  options,
  value,
  onChange,
  open = false,
  onOpenChange,
  className,
}: CustomDropdownProps) {
  return (
    <div className="relative inline-block text-left font-diatype">
      {/* Dropdown menu with CSS transition */}
      <div
        className={cn(
          'absolute -right-10 top-5 z-50 w-[210px] overflow-hidden rounded-xl border bg-white shadow-lg transition-all duration-200 ease-in-out',
          open
            ? 'translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none -translate-y-2 scale-95 opacity-0',
          className
        )}
      >
        <ul className="p-1">
          {options.map(option => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => {
                  onChange?.(option.value);
                  onOpenChange?.(false);
                }}
                className="flex w-full items-start gap-2 rounded-lg px-2 py-1.5 font-diatype text-sm text-ui-neutralSurfaceOnColor hover:bg-ui-neutralInputBg"
              >
                <span className="pt-0.5">{option.icon}</span>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{option.label}</span>
                  {option.description && (
                    <span className="font-diatype text-xs text-ui-neutralContentLight">
                      {option.description}
                    </span>
                  )}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
