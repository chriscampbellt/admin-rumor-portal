'use client';

import * as React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { LogOut } from 'lucide-react';

import { cn } from '@/lib/utils';

interface ProfileDropdownProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  position?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}

export function ProfileView({
  open,
  onOpenChange,
  position = { top: 'auto', bottom: '10px', left: '0', right: 'auto' },
}: ProfileDropdownProps) {
  const router = useRouter();
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Handle click outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onOpenChange(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onOpenChange]);

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block text-left font-diatype"
    >
      <div
        className={cn(
          'absolute z-50 mt-0 w-[220px] max-w-[90vw] overflow-hidden rounded-xl border bg-white shadow-lg transition-all duration-200 ease-in-out',
          open
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
        <ul className="p-2">
          {/* Profile Info */}
          <li>
            <div className="flex items-center gap-3 rounded-lg px-3 py-2">
              <Image
                src="/images/Monogram.svg"
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-ui-neutralSurfaceOnColor">
                  John Doe
                </p>
                <p className="text-xs text-ui-neutralContentLight">
                  john@example.com
                </p>
              </div>
            </div>
          </li>

          {/* Logout Button */}
          <li>
            <button
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-ui-neutralBorderComponent"
              onClick={() => router.push('/admin/auth/sign-in')}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
