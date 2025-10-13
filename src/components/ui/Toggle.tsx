'use client';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  className?: string;
}

const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  description,
  className,
}) => {
  return (
    <label
      className={`relative inline-flex cursor-pointer items-center ${className || ''}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <div
        className={`relative h-[16px] w-[24px] rounded-full pb-[2px] pl-[2px] pr-[10px] pt-[2px] transition-colors duration-200 ease-in-out ${
          checked ? 'bg-black' : 'bg-ui-neutralSurfaceSupport'
        }`}
      >
        <div
          className={`absolute left-0.5 top-0.5 h-3 w-3 transform rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out ${
            checked ? 'translate-x-2' : 'translate-x-0'
          }`}
        ></div>
      </div>

      {(label || description) && (
        <div className="ml-2 flex flex-col">
          {label && (
            <span className="text-ui-textDefault text-sm font-medium">
              {label}
            </span>
          )}
          {description && (
            <span className="text-ui-textSubtle text-xs">{description}</span>
          )}
        </div>
      )}
    </label>
  );
};

export default Toggle;
