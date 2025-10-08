'use client';

import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

interface CheckboxProps {
  id?: string;
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
}

export default function Checkbox(props: CheckboxProps) {
  const {
    label,
    checked: isChecked = false, // <-- used here as a default value, but not the error location
    onChange,
    className,
    id,
    disabled = false,
  } = props;

  const handleChange = () => {
    if (disabled) return;
    onChange?.(!isChecked); // <-- checked is used here
  };

  return (
    <label
      htmlFor={id}
      onClick={handleChange}
      className={cn(
        'flex select-none items-center gap-2 font-diatype text-sm font-medium text-black',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className
      )}
    >
      <span
        className={cn(
          'flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] border border-gray-700',
          isChecked && !disabled ? 'bg-black text-white' : '', // <-- isChecked is used here
          disabled ? 'opacity-60' : ''
        )}
      >
        {isChecked && <Check className="h-[16px] w-[16px]" strokeWidth={2} />}{' '}
        {/* <-- isChecked is used here */}
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
