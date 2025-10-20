'use client';

import { ToastConfig } from '@/lib/toast/config';

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToastConfig />
    </>
  );
}
