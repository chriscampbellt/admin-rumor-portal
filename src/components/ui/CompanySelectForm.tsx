'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { ChevronDown, ChevronRight, X } from 'lucide-react';

import Checkbox from './Checkbox';

interface Option {
  value: string;
  label: string;
}

interface Group {
  label: string;
  options: Option[];
}

interface CompanySelectFormProps {
  label?: string;
  value: string[];
  onChange: (selected: string[]) => void;
  groups: Group[];
  placeholder?: string;
}

export default function CompanySelectForm({
  label,
  value,
  onChange,
  groups,
  placeholder = 'Select company types',
}: CompanySelectFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const allOptions = useMemo(
    () => groups.flatMap(group => group.options),
    [groups]
  );

  const selectedOptions = useMemo(
    () =>
      value
        .map(v => allOptions.find(opt => opt.value === v))
        .filter((opt): opt is Option => opt !== undefined),
    [value, allOptions]
  );

  const handleCheck = (optionValue: string, checked: boolean) => {
    if (checked) {
      onChange([...value, optionValue]);
    } else {
      onChange(value.filter(v => v !== optionValue));
    }
  };

  const handleRemove = (optionValue: string) => {
    onChange(value.filter(v => v !== optionValue));
  };

  return (
    <div className="w-full font-diatype" ref={containerRef}>
      {label && (
        <label className="mb-1 block font-diatype text-[14px] font-medium text-ui-neutralSurfaceOnColor">
          {label}
        </label>
      )}

      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex min-h-[48px] w-full cursor-pointer items-center justify-between rounded-lg border bg-white px-3 py-2 font-diatype text-sm text-ui-neutralSurfaceOnColor"
      >
        {selectedOptions.length > 0 ? (
          <div
            className="flex flex-wrap gap-2 pr-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedOptions.map(opt => (
              <div
                key={opt.value}
                className="flex items-center rounded-full border border-ui-neutralBorderComponent bg-ui-neutralSurfaceBackground px-1.5 py-0.5 text-xs font-medium text-gray-800"
                onClick={e => e.stopPropagation()}
              >
                <span className="mr-1">{opt.label}</span>
                <X
                  size={12}
                  className="cursor-pointer text-gray-600 hover:text-gray-900"
                  onClick={() => handleRemove(opt.value)}
                />
              </div>
            ))}
          </div>
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}

        <div className="p-1">
          {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </div>
      </div>

      {isOpen && (
        <div className="mt-2 max-h-[400px] w-full space-y-3 overflow-y-auto rounded-lg border bg-white p-2 shadow-md">
          {groups.map(group => (
            <div key={group.label}>
              <div className="mb-1 px-1 py-1 text-[16px] font-medium text-ui-neutralContentLight">
                {group.label}
              </div>
              <div className="space-y-1 px-1">
                {group.options.map(opt => (
                  <Checkbox
                    key={opt.value}
                    className="text-sm font-medium"
                    label={opt.label}
                    checked={value.includes(opt.value)}
                    onChange={checked => handleCheck(opt.value, checked)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
