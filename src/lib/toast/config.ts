import React from 'react';

import { ToastOptions, Toaster } from 'react-hot-toast';

const toastOptions: ToastOptions = {
  duration: 4000,
  style: {
    background: '#333',
    color: '#fff',
    borderRadius: '8px',
    padding: '12px 16px',
    fontFamily: 'var(--font-abc-diatype), sans-serif',
    fontSize: '14px',
  },
};

export function ToastConfig() {
  return React.createElement(Toaster, { position: 'top-right', toastOptions });
}
