'use client';

import React from 'react';

interface StatItem {
  label: string;
  count: number | string;
}

interface EventStatusSummaryProps {
  stats: StatItem[];
  className?: string;
}

const EventStatusSummary: React.FC<EventStatusSummaryProps> = ({
  stats,
  className,
}) => {
  return (
    <div className={`flex items-center gap-5 py-2 ${className ?? ''}`}>
      {stats.map((item, idx) => (
        <div
          key={idx}
          className="flex items-center gap-2 rounded-16 bg-ui-neuteralSurfaceSecondary px-4 py-2"
        >
          <span className="font-romie text-lg font-bold text-ui-neutralSurfaceOnColor xl:text-[24px]">
            {item.count}
          </span>
          <span className="font-diatype text-sm font-normal text-ui-neutralSurfaceOnColor">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default EventStatusSummary;
