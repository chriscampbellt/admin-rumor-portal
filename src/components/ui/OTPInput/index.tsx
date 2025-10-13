'use client';

import * as React from 'react';

import { unstable_OneTimePasswordField as OTPField } from 'radix-ui';

import { cn } from '@/lib/utils';

interface OneTimePasswordProps {
  className?: string;
  length?: number;
  onChange?: (value: string) => void;
  error?: boolean;
  errorMessage?: string;
}

const OneTimePassword: React.FC<OneTimePasswordProps> = ({
  className = '',
  length = 4,
  onChange,
  error = false,
  errorMessage = 'Please enter a verification code',
}) => {
  const [otp, setOtp] = React.useState<string>('0'.repeat(length));

  const handleChange = (value: string) => {
    setOtp(value);
    onChange?.(value);
  };

  return (
    <div className="flex flex-col items-start">
      <OTPField.Root
        className={cn('flex gap-2', className)}
        value={otp}
        onValueChange={handleChange}
      >
        {Array.from({ length }).map((_, index) => (
          <OTPField.Input
            key={index}
            className={cn(
              `h-[54.6px] w-[60px] rounded-lg border bg-transparent px-3 py-2 text-center text-ui-neutralPlaceholder transition-colors duration-150 focus:outline-none md:w-[90px] xl:w-[115px]`,
              error
                ? 'border-ui-errorBorder bg-ui-bgLightRed text-ui-neutralSurfaceOnColor'
                : 'border-ui-neutralBorderComponent bg-transparent text-ui-neutralPlaceholder'
            )}
          />
        ))}
        <OTPField.HiddenInput />
      </OTPField.Root>

      {error && (
        <p className="mt-1.5 font-diatype text-[12px] text-ui-neutralDarkRed">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default OneTimePassword;
