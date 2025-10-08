'use client';

import React from 'react';

import { Calendar } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="scrollbar-hidden h-full rounded-[24px] border border-ui-neutralBorderComponent bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="font-diatype text-sm font-medium text-ui-neutralSurfaceOnColor">
          {title}
        </h2>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ui-neuteralSurfaceSecondary">
          {icon}
        </span>
      </div>
      <h2 className="pt-8 font-romie text-lg font-medium text-ui-neutralSurfaceOnColor sm:text-2xl md:text-4xl lg:text-5xl">
        {value}
      </h2>
    </div>
  );
}

export default function DashboardStats() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <StatCard
          title="Events"
          value={245}
          icon={<Calendar className="h-4 w-4 text-ui-neutralSurfaceOnColor" />}
        />
        <StatCard
          title="Total Attendees"
          value="1,234"
          icon={<Calendar className="h-4 w-4 text-ui-neutralSurfaceOnColor" />}
        />
      </div>
    </div>
  );
}
