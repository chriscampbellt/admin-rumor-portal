'use client';

import { ReactNode, useState } from 'react';

import { cn } from '@/lib/utils';

interface TooltipProps {
  trigger: ReactNode;
  content: ReactNode;
  className?: string;
  direction?: 'top' | 'bottom' | 'left' | 'right';
  width?: string;
}

export default function Tooltip({
  trigger,
  content,
  className,
  direction = 'top',
  width = 'max-w-[500px]',
}: TooltipProps) {
  const [visible, setVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };

  // Arrow should point **toward the trigger**
  const arrowClasses = {
    top: "after:absolute after:bottom-[-8px] after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-t-black/75 after:border-x-transparent after:border-b-transparent after:content-['']",
    bottom:
      "after:absolute after:top-[-8px] after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-b-black/75 after:border-x-transparent after:border-t-transparent after:content-['']",
    left: "after:absolute after:right-[-8px] after:top-1/2 after:-translate-y-1/2 after:border-4 after:border-l-black/75 after:border-y-transparent after:border-r-transparent after:content-['']",
    right:
      "after:absolute after:left-[-8px] after:top-1/2 after:-translate-y-1/2 after:border-4 after:border-r-black/75 after:border-y-transparent after:border-l-transparent after:content-['']",
  };

  return (
    <div className="relative inline-block">
      {/* Trigger */}
      <div
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {trigger}
      </div>

      {/* Tooltip */}
      {visible && (
        <div
          className={cn(
            'absolute z-50 rounded-[8px] bg-black/75 px-2 py-1.5 font-diatype text-sm font-medium text-white shadow-lg',
            positionClasses[direction],
            arrowClasses[direction],
            width,
            className
          )}
          style={{ pointerEvents: 'none' }}
        >
          {content}
        </div>
      )}
    </div>
  );
}
