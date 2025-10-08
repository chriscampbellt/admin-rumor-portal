'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { CountryList, countryCode } from '@/lib/constants';

type CountryPhoneInputProps = {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  selectedCountry?: countryCode;
  onCountryChange?: (country: countryCode) => void;
  error?: boolean;
  errorMessage?: string;
  className?: string;
};

const CountryPhoneInput: React.FC<CountryPhoneInputProps> = ({
  label = 'Phone Number',
  value = '',
  onChange,
  selectedCountry,
  onCountryChange,
  error = false,
  errorMessage,
  className = '',
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [_country, setCountry] = useState<countryCode>(
    selectedCountry || CountryList[0]
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCountrySelect = (c: countryCode) => {
    setCountry(c);
    onCountryChange?.(c);
    setIsDropdownOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <label className="font-diatype text-[14px] font-medium">{label}</label>
      )}

      <div
        className={`flex min-h-[51px] w-full items-center gap-2 rounded-[8px] px-[14px] ${error ? 'border-ui-errorBorder bg-ui-errorBgLight' : 'border border-ui-neutralBorderComponent bg-transparent'} ${className}`}
      >
        {/* Country Dropdown */}
        <div className="relative w-[80px] flex-shrink-0" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex w-full items-center gap-1 text-sm font-normal transition-all duration-300"
          >
            <Image
              src={_country.image}
              alt={_country.name}
              width={24}
              height={18}
              className="rounded-sm"
            />
            <span className="font-diatype text-ui-neutralContentLight">
              {_country.dial_code}
            </span>
          </button>

          {isDropdownOpen && (
            <div className="border-black-300 absolute left-0 top-full z-50 mt-1 max-h-60 w-64 overflow-y-auto rounded-lg border bg-white py-3 shadow-lg">
              {CountryList.map((c, index) => (
                <button
                  key={`${c.code}-${index}`}
                  type="button"
                  onClick={() => handleCountrySelect(c)}
                  className="flex w-full items-center gap-3 px-3 py-2 text-left font-diatype text-sm text-black transition-colors hover:bg-ui-neutralInputBg"
                >
                  <Image
                    src={c.image}
                    alt={c.name}
                    width={24}
                    height={18}
                    className="rounded-sm"
                  />
                  <span className="font-normal">{c.dial_code}</span>
                  <span className="truncate text-gray-700">{c.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Phone Input */}
        <input
          type="tel"
          value={value}
          onChange={handleInputChange}
          placeholder="Enter phone number"
          className={`flex-1 font-diatype text-sm font-normal text-ui-neutralSurfaceOnColor outline-none placeholder:text-ui-neutralSurfaceOnColor ${error ? 'bg-ui-errorBgLight' : 'bg-transparent'}`}
          style={{ width: 'calc(100% - 120px)' }}
        />
      </div>

      {error && errorMessage && (
        <p className="font-diatype text-[12px] text-ui-textError transition-all">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default CountryPhoneInput;
