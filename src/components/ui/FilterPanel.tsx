'use client';

import React, { useCallback, useState } from 'react';

import { ChevronDown, ChevronUp, Search, X } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';

import Checkbox from './Checkbox';
import { CommonButton } from './CommonButton';
import CommonInput from './CommonInput';
import { DateRangePicker } from './DateRangePicker';
import { Slider } from './Slider';
import { Badge } from './badge';

export interface FilterOption {
  id: string;
  label: string;
  value: string;
  children?: FilterOption[];
}

export interface FilterSection {
  id: string;
  title: string;
  type: 'checkbox' | 'range' | 'date' | 'tags' | 'search';
  options?: FilterOption[];
  range?: {
    min: number;
    max: number;
    step?: number;
    format?: (value: number) => string;
  };
  tags?: string[];
  searchPlaceholder?: string;
}

export interface FilterConfig {
  sections: FilterSection[];
  onApply: (filters: Record<string, DateRange | number[] | string[]>) => void;
  onClear: () => void;
  onClose?: () => void;
  title?: string;
}

interface FilterPanelProps extends FilterConfig {
  className?: string;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  sections,
  onClose,
  title = 'Filters',
  className,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );
  const getFilterCount = (
    filter: string[] | number[] | DateRange | undefined
  ) => {
    if (!filter) return 0;
    if (Array.isArray(filter)) return filter.length; // for string[] or number[]
    if ('from' in filter && filter.from) return 1; // for DateRange
    return 0;
  };

  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, DateRange | number[] | string[]>
  >({});
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  const toggleSection = useCallback((sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      newSet.has(sectionId) ? newSet.delete(sectionId) : newSet.add(sectionId);
      return newSet;
    });
  }, []);

  const updateFilter = useCallback(
    (
      sectionId: string,
      value: DateRange | number[] | string[],
      merge = false
    ) => {
      setSelectedFilters(prev => {
        const currentValue = prev[sectionId];

        let newValue: DateRange | number[] | string[];

        if (merge && Array.isArray(currentValue) && Array.isArray(value)) {
          // preserve the type of currentValue
          if (typeof currentValue[0] === 'number') {
            newValue = [...(currentValue as number[]), ...(value as number[])];
          } else if (typeof currentValue[0] === 'string') {
            newValue = [...(currentValue as string[]), ...(value as string[])];
          } else {
            newValue = currentValue;
          }
        } else {
          newValue = value;
        }

        const updatedFilters = { ...prev, [sectionId]: newValue };

        setActiveFilterCount(
          Object.values(updatedFilters).filter(
            val => val && (Array.isArray(val) ? val.length > 0 : true)
          ).length
        );

        return updatedFilters;
      });
    },
    []
  );

  const removeTag = useCallback((sectionId: string, tagToRemove: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [sectionId]:
        (prev[sectionId] as string[])?.filter(tag => tag !== tagToRemove) || [],
    }));
  }, []);

  const handleCheckboxChange = useCallback(
    (sectionId: string, optionId: string, checked: boolean) => {
      setSelectedFilters(prev => {
        const currentValues = (prev[sectionId] as string[]) || [];
        const newValues = checked
          ? [...currentValues, optionId]
          : currentValues.filter(id => id !== optionId);

        return { ...prev, [sectionId]: newValues };
      });
    },
    []
  );

  const renderCheckboxOptions = (
    options: FilterOption[],
    sectionId: string,
    level = 0
  ) => {
    return options.map(option => (
      <div key={option.id} className={cn('space-y-2', level > 0 && '')}>
        {level === 0 && option.children ? (
          <h3 className="text-[16px] font-medium text-ui-neutralContentLight">
            {option.label}
          </h3>
        ) : (
          <div className="flex items-center space-x-2">
            <Checkbox
              label={option.label}
              id={`${sectionId}-${option.id}`}
              checked={
                (selectedFilters[sectionId] as string[])?.includes(option.id) ||
                false
              }
              onChange={checked =>
                handleCheckboxChange(sectionId, option.id, checked)
              }
              className="border-filter-border"
            />
          </div>
        )}
        {option.children &&
          renderCheckboxOptions(option.children, sectionId, level + 1)}
      </div>
    ));
  };

  const renderRangeSlider = (section: FilterSection) => {
    if (!section.range) return null;
    const currentValue = (selectedFilters[section.id] as number[]) || [
      section.range.min,
      section.range.max,
    ];
    const formatValue =
      section.range.format || ((val: number) => val.toString());

    return (
      <div className="space-y-4">
        <div className="text-filter-text-muted flex justify-evenly text-sm">
          <span>{formatValue(currentValue[0])}</span>
          <span>{formatValue(currentValue[1])}</span>
        </div>
        <Slider
          value={currentValue}
          onValueChange={value => updateFilter(section.id, value as number[])}
          min={section.range.min}
          max={section.range.max}
          step={section.range.step || 1}
          className="w-full"
        />
      </div>
    );
  };

  const renderDatePicker = (section: FilterSection) => {
    const currentRange = selectedFilters[section.id] as DateRange;
    return (
      <DateRangePicker
        value={currentRange}
        onChange={range => updateFilter(section.id, range as DateRange)}
        placeholder="Select date range..."
        className="w-full"
      />
    );
  };

  const renderTags = (section: FilterSection) => {
    const selectedTags = (selectedFilters[section.id] as string[]) || [];
    return (
      <div className="space-y-3 bg-white">
        <CommonInput
          icon={
            <Search className="text-ui-neuteralSurfaceSecondary" size={16} />
          }
          placeholder="Search…"
          autoComplete="off"
          className="h-[44px] !min-h-0 w-full bg-white lg:min-w-[350px]"
          onChange={() => {}}
          type="text"
        />
        <div className="flex flex-wrap gap-2">
          {selectedTags.map(tag => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-filter-tag text-filter-tag-foreground hover:bg-filter-tag/80 pr-1"
            >
              {tag}
              <CommonButton
                leftIcon={<X className="h-3 w-3" />}
                onClick={() => removeTag(section.id, tag)}
              />
            </Badge>
          ))}
        </div>
      </div>
    );
  };

  const filteredSections = sections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={cn('', className)}>
      <div className="border-filter-border flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-[20px] font-medium text-ui-neutralSurfaceOnColor">
            {title}
          </h2>
          {activeFilterCount > 0 && (
            <Badge
              variant="secondary"
              className="flex h-6 items-center justify-center rounded-full bg-ui-neutralSurfaceSupport !p-2 text-xs text-ui-neutralSurfaceOnColor"
            >
              {activeFilterCount}
            </Badge>
          )}
        </div>
        {onClose && (
          <CommonButton
            className="h-auto rounded-full bg-ui-neutralSurfaceSupport !p-2 text-ui-neutralSurfaceOnColor hover:bg-ui-neutralPlaceholder"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </CommonButton>
        )}
      </div>

      <div className="relative pt-5">
        <CommonInput
          icon={
            <Search className="text-ui-neuteralSurfaceSecondary" size={16} />
          }
          placeholder="Search all Filters…"
          autoComplete="off"
          className="h-[46px] !min-h-0 w-full lg:min-w-[350px]"
          onChange={e => setSearchTerm(e.target.value)}
          type="text"
        />
      </div>

      <div className="space-y-2.5 py-5 font-diatype text-ui-neutralSurfaceOnColor">
        {filteredSections.map(section => (
          <div key={section.id}>
            <button
              onClick={() => toggleSection(section.id)}
              className="hover:bg-filter-hover flex w-full items-center justify-between rounded-12 bg-ui-neutralSurfaceBackground px-4 py-3 transition-colors"
            >
              <span className="text-left text-sm font-medium">
                {section.title}
              </span>
              <div className="flex items-center gap-2">
                {selectedFilters[section.id] && (
                  <Badge
                    variant="secondary"
                    className="bg-filter-accent text-filter-text text-xs"
                  >
                    {getFilterCount(selectedFilters[section.id])}
                  </Badge>
                )}
                {expandedSections.has(section.id) ? (
                  <ChevronUp className="text-filter-text-muted h-4 w-4" />
                ) : (
                  <ChevronDown className="text-filter-text-muted h-4 w-4" />
                )}
              </div>
            </button>

            {expandedSections.has(section.id) && (
              <div className="space-y-4 bg-white pb-2 pt-5">
                {section.type === 'checkbox' &&
                  section.options &&
                  renderCheckboxOptions(section.options, section.id)}
                {section.type === 'range' && renderRangeSlider(section)}
                {section.type === 'date' && renderDatePicker(section)}
                {section.type === 'tags' && renderTags(section)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
