'use client';

import { useId } from 'react';

import { cn } from '@/lib/utils';

interface RadioProps {
  label: string;
  description?: string;
  checked?: boolean;
  onChange?: () => void;
  rightContent?: React.ReactNode;
  name: string;
  value: string;
  className?: string;
}

export default function Radio({
  label,
  description,
  checked,
  onChange,
  rightContent,
  name,
  value,
  className,
}: RadioProps) {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className={cn(
        'flex cursor-pointer items-center justify-between gap-3 rounded-8 bg-ui-neutralSurfaceBackground p-4',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="radio"
            id={id}
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
            className="sr-only"
          />
          <div
            className={cn(
              'flex h-[18px] w-[18px] items-center justify-center rounded-full border-[1.5px] transition-all',
              checked
                ? 'border-black bg-white'
                : 'border-ui-neutralBorderComponent bg-white'
            )}
          >
            {checked && <div className="h-2.5 w-2.5 rounded-full bg-black" />}
          </div>
        </div>

        <div>
          <div className="font-diatype text-sm font-medium text-ui-neutralSurfaceOnColor">
            {label}
          </div>
          {description && (
            <div className="text-[12px] text-ui-neutralContentLight">
              {description}
            </div>
          )}
        </div>
      </div>

      {rightContent && (
        <div className="ml-2 text-sm text-ui-neutralSurfaceOnColor">
          {rightContent}
        </div>
      )}
    </label>
  );
}
