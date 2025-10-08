'use client';

import * as React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center cursor-pointer font-diatype justify-center whitespace-nowrap rounded-full text-[16px] font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-black text-white rounded-full py-6 hover:bg-black/90',
        destructive: 'bg-red-600 text-white rounded-full py-6 hover:bg-red-700',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'px-4 py-2',
        sm: 'h-9 rounded-full px-3',
        lg: 'h-11 rounded-full px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface CommonButtonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
  type?: string;
}

const CommonButton = React.forwardRef<HTMLDivElement, CommonButtonProps>(
  (
    { className, variant, size, leftIcon, rightIcon, children, ...props },
    ref
  ) => {
    const { theme } = useTheme();

    const themeOverride =
      theme === 'dark'
        ? 'bg-ui-bgBlur text-white hover:bg-ui-neuteralSurfaceSecondary hover:text-black'
        : 'bg-ui-neuteralSurfaceSecondary text-black hover:text-white hover:bg-ui-bgBlur';

    return (
      <div
        className={cn(
          buttonVariants({ variant, size }),
          themeOverride,
          className
        )}
        ref={ref}
        {...props}
      >
        {leftIcon && <span className="mr-2 flex items-center">{leftIcon}</span>}
        {children}
        {rightIcon && (
          <span className="ml-2 flex items-center">{rightIcon}</span>
        )}
      </div>
    );
  }
);

CommonButton.displayName = 'CommonButton';

export { CommonButton, buttonVariants };
