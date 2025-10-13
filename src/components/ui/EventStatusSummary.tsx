'use client';

import React from 'react';

export default function EventStatusSummary() {
  const stats = [
    { label: 'Pending Approval', count: 25 },
    { label: 'Upcoming', count: 23 },
    { label: 'Past', count: 5 },
  ];

  return (
    <div className="flex items-center gap-5 pb-6">
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
}
