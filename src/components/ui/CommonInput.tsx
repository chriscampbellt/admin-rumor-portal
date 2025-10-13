'use client';

import { useRef, useState } from 'react';

import { ChevronDown, Eye, EyeOff } from 'lucide-react';

import { useTheme } from '@/context/ThemeContext';

import { Label } from './label';

type CommonInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?:
    | 'number'
    | 'search'
    | 'time'
    | 'text'
    | 'hidden'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'month'
    | 'password'
    | 'tel'
    | 'url'
    | 'week';
  name?: string;
  autoComplete?: string;
  className?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  bgColorClass?: string;
  prefix?: string;
  readonly?: boolean;
  error?: boolean;
  errorMessage?: string;
  maxLength?: number;
  placeholderClassName?: string;
  floatingLabel?: boolean;
};

const CommonInput: React.FC<CommonInputProps> = ({
  label,
  placeholder = '',
  value,
  required = false,
  onChange,
  type = 'text',
  name,
  className = '',
  icon,
  rightIcon,
  prefix,
  readonly = false,
  error = false,
  errorMessage = '',
  autoComplete = 'off',
  bgColorClass = 'bg-transparent',
  maxLength,
  placeholderClassName = '',
  floatingLabel = false,
  ...rest
}) => {
  const inputId = name || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  const [showPassword, setShowPassword] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const { theme } = useTheme();

  const isPasswordType = type === 'password';
  const actualType = isPasswordType
    ? showPassword
      ? 'text'
      : 'password'
    : type;
  const isDateType = type === 'date' || type === 'datetime-local';
  const hasValue = Boolean(value && value !== '');

  const handleDateWrapperClick = () => {
    if (dateInputRef.current) {
      const inputEl = dateInputRef.current as HTMLInputElement & {
        showPicker?: () => void;
      };
      setIsDatePickerOpen(true);
      if (inputEl.showPicker) inputEl.showPicker();
      else inputEl.click();
    }
  };

  if (floatingLabel) {
    return (
      <div className="relative w-full font-diatype">
        <div
          className={`relative flex min-h-[56px] w-full items-center rounded-[8px] border px-[14px] pt-4 transition-all duration-200 ${
            error
              ? 'border-b-2 border-b-ui-errorBorderColor bg-ui-neutralSurfaceBackground'
              : 'border-transparent bg-ui-neutralSurfaceBackground'
          } ${className}`}
          onClick={isDateType ? handleDateWrapperClick : undefined}
        >
          {icon && !prefix && (
            <span className="mr-2 text-ui-neutralSurfaceOnColor">{icon}</span>
          )}

          <input
            ref={isDateType ? dateInputRef : undefined}
            id={inputId}
            name={name}
            type={actualType}
            value={value}
            onChange={onChange}
            placeholder=" "
            readOnly={readonly}
            className={`peer w-full bg-transparent font-diatype text-[14px] font-medium placeholder-transparent outline-none ${theme === 'dark' ? 'text-white' : 'text-black'} ${type === 'number' ? 'no-spinner' : ''} ${placeholderClassName}`}
            maxLength={maxLength}
            autoComplete={autoComplete}
            {...rest}
          />

          {label && (
            <label
              htmlFor={inputId}
              className={`absolute left-[14px] top-1/2 z-10 origin-[0] -translate-y-1/2 transform text-[14px] ${error ? 'text-ui-neutralDarkRed' : 'text-ui-textTertiary'} peer-focus:text-ui-primary transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-[14px] peer-focus:top-3.5 peer-focus:text-[12px] ${hasValue ? 'top-3.5 text-[12px]' : ''}`}
            >
              {label}
              {required && (
                <span className="ml-1 text-ui-neutralDarkRed">*</span>
              )}
            </label>
          )}

          {isPasswordType && (
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ui-neutralSurfaceOnColor focus:outline-none"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          )}

          {isDateType && (
            <ChevronDown
              className={`absolute right-3 top-1/2 -translate-y-1/2 text-ui-neutralSurfaceOnColor transition-transform duration-300 ${
                isDatePickerOpen ? 'rotate-180' : ''
              }`}
              size={18}
            />
          )}
        </div>

        {error && errorMessage && (
          <p className="mt-1.5 font-diatype text-[12px] text-ui-neutralDarkRed">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {label && (
        <Label
          htmlFor={inputId}
          className={`flex items-center font-diatype text-[14px] font-medium ${
            theme === 'dark' ? 'text-white' : 'text-ui-neutralSurfaceOnColor'
          }`}
        >
          {label}
          {required && (
            <span className="ml-1 font-serif text-ui-textError">*</span>
          )}
        </Label>
      )}

      <div
        className={`flex min-h-[48px] w-full items-center gap-1.5 truncate rounded-[8px] border px-[14px] ${
          error
            ? 'border-ui-errorBorder bg-ui-errorBgLight'
            : 'border-ui-neutralBorderComponent bg-transparent'
        } ${className}`}
        onClick={isDateType ? handleDateWrapperClick : undefined}
      >
        {icon && !prefix && <span className="text-white-100">{icon}</span>}

        {isDateType ? (
          <>
            <input
              ref={dateInputRef}
              id={inputId}
              name={name}
              type={actualType}
              value={value}
              onChange={onChange}
              onBlur={() => setIsDatePickerOpen(false)}
              placeholder={placeholder}
              readOnly={readonly}
              className={`min-h-[48px] w-full cursor-pointer ${bgColorClass} font-diatype text-sm font-medium ${
                theme === 'dark' ? 'text-white' : 'text-black'
              } outline-none [&::-webkit-calendar-picker-indicator]:hidden ${placeholderClassName}`}
              maxLength={maxLength}
              autoComplete={autoComplete}
              {...rest}
            />
            <ChevronDown
              className={`cursor-pointer text-ui-neutralSurfaceOnColor transition-transform duration-300 ${
                isDatePickerOpen ? 'rotate-180' : ''
              }`}
              size={20}
            />
          </>
        ) : (
          <input
            id={inputId}
            name={name}
            type={actualType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            readOnly={readonly}
            className={`min-h-[48px] w-full ${bgColorClass} font-diatype text-sm font-medium ${
              theme === 'dark' ? 'text-white' : 'text-ui-neutralSurfaceOnColor'
            } outline-none ${placeholderClassName} ${type === 'number' ? 'no-spinner' : ''}`}
            maxLength={maxLength}
            autoComplete={autoComplete}
            {...rest}
          />
        )}

        {rightIcon && !isDateType && (
          <span className="text-white-100">{rightIcon}</span>
        )}
        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="cursor-pointer text-ui-neutralSurfaceOnColor focus:outline-none"
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        )}
      </div>

      {error && errorMessage && (
        <p className="font-diatype text-[12px] text-ui-textError transition-all">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default CommonInput;
