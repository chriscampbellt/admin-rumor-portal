'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

import Checkbox from './Checkbox';

export interface DropdownOption {
  value: string;
  label: string;
  count?: number; // ✅ number badge
}

interface CheckboxDropdownProps {
  options: DropdownOption[];
  value?: string[]; // ✅ multiple values allowed
  onChange?: (value: string[]) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function CheckboxDropdown({
  options,
  value: selectedValues = [],
  onChange,
  open: isOpen = false,
  onOpenChange,
  className,
}: CheckboxDropdownProps) {
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const toggleValue = (val: string) => {
    const newValues = selectedValues.includes(val)
      ? selectedValues.filter(v => v !== val)
      : [...selectedValues, val];
    onChange?.(newValues);
  };

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onOpenChange?.(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onOpenChange]);

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block text-left font-diatype"
    >
      <div
        className={cn(
          'absolute -right-10 top-5 z-50 w-[230px] overflow-hidden rounded-xl border bg-white shadow-lg transition-all duration-200 ease-in-out',
          isOpen
            ? 'translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none -translate-y-2 scale-95 opacity-0',
          className
        )}
      >
        <ul className="p-1">
          {options.map(option => {
            const selected = selectedValues.includes(option.value);

            return (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => toggleValue(option.value)}
                  className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm hover:bg-ui-neutralInputBg"
                >
                  <div className="flex items-center gap-2">
                    <Checkbox checked={selected} />
                    <span className="font-medium text-ui-neutralSurfaceOnColor">
                      {option.label}
                    </span>
                  </div>

                  {option.count !== undefined && (
                    <span className="ml-auto inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-gray-100 px-2 text-xs font-medium text-gray-600">
                      {option.count}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
