import React, { ReactNode, useEffect, useState } from 'react';

import { X } from 'lucide-react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  icon?: ReactNode;
  showCloseButton?: boolean;
  maxWidth?: string;
  minWidth?: string;
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
  icon,
  showCloseButton = true,
  maxWidth = 'max-w-md',
  minWidth,
}) => {
  const [show, setShow] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setShow(true);
  }, [isOpen]);

  const handleTransitionEnd = () => {
    if (!isOpen) setShow(false);
  };

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center font-diatype transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
      onTransitionEnd={handleTransitionEnd}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-[4px]"
        onClick={onClose}
      />

      {/* Dialog Box */}
      <div
        className={`relative w-full transform rounded-2xl bg-white font-diatype shadow-sm transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        } ${maxWidth} ${minWidth} mx-4 max-h-[90vh] overflow-hidden sm:mx-6 sm:max-w-sm md:mx-8 md:max-w-md lg:max-w-lg xl:max-w-2xl`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between ${
            !icon && !title ? '' : 'border-b border-ui-neutralBorderSupport'
          } px-4 py-3 sm:px-6 sm:py-4`}
        >
          <div className="flex items-center gap-3">
            {icon && <div className="text-gray-600">{icon}</div>}
            {title && (
              <h2 className="text-lg font-medium text-ui-neutralSurfaceOnColor sm:text-xl">
                {title}
              </h2>
            )}
          </div>

          {showCloseButton && (
            <button
              onClick={onClose}
              className="rounded-full bg-ui-neutralSurfaceSupport p-2.5 text-black transition-colors hover:bg-ui-neutralBorderComponent"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Body */}
        <div
          className="overflow-y-auto py-4 text-ui-neutralSurfaceOnColor"
          style={{
            maxHeight: 'calc(90vh - 80px)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dialog;
