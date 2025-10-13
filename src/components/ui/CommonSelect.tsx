'use client';

import React, { ReactNode, useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { ChevronDown } from 'lucide-react';

import { Label } from './label';

interface Option {
  value: string;
  label: string;
}

interface CommonSelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  icon?: ReactNode;
  className?: string;
}

const CommonSelect: React.FC<CommonSelectProps> = ({
  label,
  value,
  onChange,
  options,
  icon,
  placeholder = 'Select an option',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  const calculatePosition = () => {
    if (!triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const dropdownHeight = Math.min(
      200,
      (options.length + (placeholder ? 1 : 0)) * 40
    );

    const spaceBelow = viewportHeight - triggerRect.bottom - 10;
    const spaceAbove = triggerRect.top - 10;

    if (spaceBelow < dropdownHeight && spaceAbove >= dropdownHeight) {
      setOpenUpward(true);
    } else {
      setOpenUpward(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!isOpen) {
      calculatePosition();
    }
    setIsOpen(!isOpen);
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="w-full cursor-pointer" ref={dropdownRef}>
      <div className="flex items-center gap-1">
        {label && (
          <Label className="pb-1 font-diatype text-[14px] font-medium !text-ui-neutralSurfaceOnColor">
            {label}
          </Label>
        )}
        {icon && (
          <Image
            src="/images/info-circle.svg"
            className="pb-1"
            width={18}
            height={18}
            alt="Info Icon"
          />
        )}
      </div>

      <div className="relative">
        <div
          ref={triggerRef}
          onClick={handleToggle}
          className={`flex min-h-[48px] w-full cursor-pointer appearance-none items-center rounded-lg border bg-white py-2 pl-3 pr-10 text-left font-diatype text-sm font-medium text-ui-neutralSurfaceOnColor outline-none placeholder:text-ui-neutralPlaceholder ${className}`}
        >
          <span
            className={
              value
                ? 'truncate text-ui-neutralSurfaceOnColor'
                : 'truncate text-ui-neutralPlaceholder'
            }
          >
            {displayText}
          </span>
        </div>

        <ChevronDown
          className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-diatype text-ui-neutralSurfaceOnColor transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          size={18}
        />

        {isOpen && (
          <div
            style={{
              position: 'absolute',
              ...(openUpward
                ? {
                    bottom: '100%',
                    marginBottom: '4px',
                  }
                : {
                    top: '100%',
                    marginTop: '4px',
                  }),
              left: 0,
              right: 0,
              zIndex: 50,
              backgroundColor: 'white',
              border: '1px solid #d1d5db',
              borderRadius: '12px',
              boxShadow:
                '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              maxHeight: '200px',
              overflowY: 'auto',
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none', // IE and Edge
            }}
            className="font-diatype [&::-webkit-scrollbar]:hidden"
          >
            {placeholder && (
              <div
                onClick={() => handleSelect('')}
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  color: '#9ca3af',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#f9fafb';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {placeholder}
              </div>
            )}
            {options.map(opt => (
              <div
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  color: 'inherit',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  backgroundColor:
                    value === opt.value ? '#f3f4f6' : 'transparent',
                  fontWeight: value === opt.value ? '500' : '400',
                }}
                onMouseEnter={e => {
                  if (value !== opt.value) {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }
                }}
                onMouseLeave={e => {
                  if (value !== opt.value) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  } else {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }
                }}
                className="font-diatype"
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonSelect;
