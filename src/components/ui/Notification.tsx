// components/Notification.tsx
'use client';

import { X } from 'lucide-react';

import { cn } from '@/lib/utils';

// components/Notification.tsx

// components/Notification.tsx

// components/Notification.tsx

// components/Notification.tsx

type NotificationVariant = 'default' | 'success' | 'error' | 'info';

interface NotificationProps {
  title?: string;
  message: string;
  variant?: NotificationVariant;
  closable?: boolean;
  onClose?: () => void;
}

export default function Notification({
  title,
  message,
  variant = 'default',
  closable = true,
  onClose,
}: NotificationProps) {
  return (
    <div
      className={cn(
        'flex w-80 items-start gap-3 rounded-md px-4 py-3 text-white shadow-md transition',
        variant === 'default' && 'bg-gray-800',
        variant === 'success' && 'bg-green-600',
        variant === 'error' && 'bg-red-600',
        variant === 'info' && 'bg-blue-600'
      )}
    >
      <div className="flex-1">
        {title && <p className="font-semibold">{title}</p>}
        <p className="text-sm opacity-90">{message}</p>
      </div>
      {closable && (
        <button
          onClick={onClose}
          className="ml-2 rounded-full p-1 hover:bg-black/20"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
