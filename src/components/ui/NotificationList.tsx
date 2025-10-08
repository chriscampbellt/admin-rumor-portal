'use client';

import * as React from 'react';

import { MoreHorizontal } from 'lucide-react';

import { cn } from '@/lib/utils';

interface Notification {
  id: number;
  message: string;
  time: string;
}

interface NotificationDropdownProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  position?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}

export function NotificationList({
  open: isOpen,
  onOpenChange,
  position = { top: 'auto', bottom: '10px', left: '0', right: 'auto' },
}: NotificationDropdownProps) {
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: 1,
      message: '[# of Users] have requested access to [Event Name]',
      time: '10m',
    },
    {
      id: 2,
      message: '1 user has requested access to [Event Name]',
      time: '10m',
    },
    {
      id: 3,
      message: '1 user has requested access to [Event Name]',
      time: '10m',
    },
    {
      id: 4,
      message: '1 user has requested access to [Event Name]',
      time: '10m',
    },
    {
      id: 5,
      message: '1 user has requested access to [Event Name]',
      time: '10m',
    },
    {
      id: 6,
      message: '1 user has requested access to [Event Name]',
      time: '10m',
    },
    {
      id: 7,
      message: '1 user has requested access to [Event Name]',
      time: '10m',
    },
    {
      id: 8,
      message: '1 user has requested access to [Event Name]',
      time: '12d',
    },
  ]);

  const [openMenuId, setOpenMenuId] = React.useState<number | null>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Handle click outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onOpenChange(false);
        setOpenMenuId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onOpenChange]);

  const handleDelete = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    setOpenMenuId(null);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block w-full text-left font-diatype"
    >
      <div
        className={cn(
          'absolute z-50 w-[320px] max-w-[90vw] rounded-xl border bg-white shadow-lg transition-all duration-200 ease-in-out',
          isOpen
            ? 'translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none -translate-y-2 scale-95 opacity-0'
        )}
        style={{
          top: position.top,
          bottom: position.bottom,
          left: position.left,
          right: position.right,
        }}
      >
        <div className="max-h-[60vh] overflow-y-auto sm:h-[365px]">
          <ul className="flex flex-col gap-2 p-3">
            {notifications.map(notification => (
              <li
                key={notification.id}
                className="group flex items-center justify-between rounded-2xl border border-ui-neutralSurfaceBackground p-3"
              >
                <div className="flex flex-1 items-center gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-black font-bold text-white">
                    {notification.message.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {notification.message}
                    </p>
                  </div>
                </div>

                {/* Right Section (3 dots menu) */}
                <div className="relative flex flex-col">
                  <span className="text-xs text-gray-500">
                    {notification.time}
                  </span>
                  <button
                    className="rounded-full p-1 opacity-0 transition-opacity hover:bg-gray-100 group-hover:opacity-100"
                    onClick={() =>
                      setOpenMenuId(
                        openMenuId === notification.id ? null : notification.id
                      )
                    }
                  >
                    <MoreHorizontal size={18} />
                  </button>

                  {openMenuId === notification.id && (
                    <div className="absolute right-0 z-10 mt-2 w-28 rounded-lg border border-gray-100 bg-white shadow-lg hover:bg-ui-neutralInputBg">
                      <button
                        onClick={() => handleDelete(notification.id)}
                        className="w-full px-3 py-2 text-left text-sm text-ui-textError"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
