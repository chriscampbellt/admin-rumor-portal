'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { ColumnDef } from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { ChevronDown, Eye, EyeOff, Search, Star, User2 } from 'lucide-react';

import { CommonButton } from '@/components/ui/CommonButton';
import CommonInput from '@/components/ui/CommonInput';
import DataTable from '@/components/ui/DataTable';
import EventStatusSummary from '@/components/ui/EventStatusSummary';
import { cn } from '@/lib/utils';

const Pill = ({
  label,
  variant,
}: {
  label: string;
  variant: 'public' | 'private' | 'curated' | 'upcoming' | 'pending';
}) => {
  const config = {
    public: {
      icon: <Eye className="h-4 w-4 text-white" />,
      style: 'bg-black text-white',
    },
    private: {
      icon: <EyeOff className="h-4 w-4 text-white" />,
      style: 'bg-ui-primaryBorder text-white',
    },
    curated: {
      icon: <User2 className="h-4 w-4 text-white" />,
      style: 'bg-black text-white',
    },
    upcoming: {
      icon: null,
      style: 'bg-ui-mutedGreen text-ui-neutralSurfaceOnColor',
    },
    pending: {
      icon: null,
      style: 'bg-ui-primaryBorder text-ui-neutralSurfaceOnColor',
    },
  }[variant];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full py-1.5 text-[13px] font-normal capitalize',
        config.style,
        variant === 'upcoming' ? 'px-[30px]' : 'px-2.5'
      )}
    >
      {config.icon}
      {label}
    </span>
  );
};
export interface EventData {
  id: number;
  eventName: string;
  host: string;
  icon?: React.ReactNode;
  eventDate: string;
  eventType: string;
  city: string;
  visibility: string;
  status: string;
}

interface EventNameCellProps extends EventData {
  onIconClick: () => void;
}
const EventNameCell = ({
  icon,
  eventName,
  id,
  onIconClick,
}: EventNameCellProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/admin/events/${id}`);
  };
  return (
    <div className="flex items-center gap-6">
      <span
        className="min-w-[9%] flex-shrink-0 cursor-pointer text-neutral-700 transition-opacity hover:opacity-70"
        onClick={e => {
          e.stopPropagation();
          onIconClick();
        }}
      >
        {icon}
      </span>
      <span
        onClick={handleClick}
        className="hover:text-ui-primary max-w-[70%] cursor-pointer truncate text-sm font-normal text-ui-monoBlack transition-colors xl:max-w-full"
      >
        {eventName}
      </span>
    </div>
  );
};

const data: EventData[] = [
  {
    id: 1,
    eventName: 'Palm Tree Music Festival The Hamptons',
    icon: (
      <Image
        src={'/images/DragHandleOutlined.svg'}
        alt="Icon"
        height={24}
        width={24}
      />
    ),
    host: 'H. Wood Group',
    eventDate: '4/14/2024 - 4/15/2024',
    eventType: 'Concerts',
    city: 'Los Angeles, CA',
    visibility: 'Public',
    status: 'Upcoming',
  },
  {
    id: 2,
    eventName: 'Palm Tree Music Festival The Hamptons',
    icon: (
      <Image
        src={'/images/DragHandleOutlined.svg'}
        alt="Icon"
        height={24}
        width={24}
      />
    ),
    host: 'Revolve',
    eventDate: '4/14/2024 - 4/15/2024',
    eventType: 'Sport Event',
    city: 'Los Angeles, CA',
    visibility: 'Public',
    status: 'Upcoming',
  },
  {
    id: 3,
    eventName: 'Peggy Gou - Layla Benitez - Deroos',
    host: 'H. Wood Group',
    eventDate: '4/14/2024 - 4/15/2024',
    eventType: 'Concerts',
    city: 'Los Angeles, CA',
    visibility: 'Private',
    status: 'Upcoming',
  },
  {
    id: 4,
    eventName: 'Tiesto & Kygo',
    icon: (
      <Image
        src={'/images/DragHandleOutlined.svg'}
        alt="Icon"
        height={24}
        width={24}
      />
    ),
    host: 'Revolve',
    eventDate: '4/14/2024 - 4/15/2024',
    eventType: 'Sporting Event',
    city: 'Los Angeles, CA',
    visibility: 'Curated',
    status: 'Pending Approval',
  },
  {
    id: 5,
    eventName: 'Lakers Season 2025',
    host: '—',
    eventDate: '4/14/2024 - 4/15/2024',
    eventType: '—',
    city: '—',
    visibility: '—',
    status: '—',
  },
  {
    id: 6,
    eventName: 'Palm Tree Music Festival The Hamptons',
    host: 'Revolve',
    eventDate: '4/14/2024 - 4/15/2024',
    eventType: 'Health & Wellness',
    city: 'Los Angeles, CA',
    visibility: 'Private',
    status: 'Pending Approval',
  },
  {
    id: 7,
    eventName: 'Peggy Gou - Layla Benitez - Deroos',
    host: 'H. Wood Group',
    eventDate: '4/14/2024 - 4/15/2024',
    eventType: 'Concerts',
    city: 'Los Angeles, CA',
    visibility: 'Private',
    status: 'Pending Approval',
  },
  {
    id: 8,
    eventName: 'Tiesto & Kygo',
    host: 'Revolve',
    eventDate: '4/14/2024 - 4/15/2024',
    eventType: 'Sport Event',
    city: 'Los Angeles, CA',
    visibility: 'Curated',
    status: 'Pending Approval',
  },
  {
    id: 9,
    eventName: 'Palm Tree Music Festival The Hampt...',
    host: 'Revolve',
    eventDate: '4/14/2024 - 4/15/2024',
    eventType: 'Brand Experiences',
    city: 'Los Angeles, CA',
    visibility: 'Private',
    status: 'Pending Approval',
  },
  {
    id: 10,
    eventName: 'Peggy Gou - Layla Benitez - Deroos',
    host: 'H. Wood Group',
    eventDate: '4/14/2024 - 4/15/2024',
    eventType: 'Concert',
    city: 'Los Angeles, CA',
    visibility: 'Private',
    status: 'Pending Approval',
  },
  {
    id: 11,
    eventName: 'Tiesto & Kygo',
    host: 'Revolve',
    eventDate: '4/14/2024 - 4/15/2024',
    eventType: 'Sporting Event',
    city: 'Los Angeles, CA',
    visibility: 'Public',
    status: 'Pending Approval',
  },
  {
    id: 12,
    eventName: 'Tiesto & Kygo',
    host: 'Revolve',
    eventDate: '4/14/2024 - 4/15/2024',
    eventType: 'Sporting Event',
    city: 'Los Angeles, CA',
    visibility: 'Public',
    status: 'Pending Approval',
  },
];

export default function EventTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showExtraColumns, setShowExtraColumns] = useState(false);
  const toggleExtraColumns = () => {
    setShowExtraColumns(!showExtraColumns);
  };
  const columns: ColumnDef<EventData>[] = [
    {
      accessorKey: 'eventName',
      header: 'Event Name',
      cell: ({ row }) => (
        <EventNameCell {...row.original} onIconClick={toggleExtraColumns} />
      ),
    },
    {
      accessorKey: 'host',
      header: 'Host',
      cell: ({ getValue }) => {
        const value = getValue() as string | undefined;
        return (
          <span className="text-sm text-ui-monoBlack">{value ?? '—'}</span>
        );
      },
    },
    {
      accessorKey: 'eventDate',
      header: 'Event Date',
      cell: ({ getValue }) => {
        const value = getValue() as string;
        return <span className="text-sm text-ui-monoBlack">{value}</span>;
      },
    },
    {
      accessorKey: 'eventType',
      header: 'Event Type',
      cell: ({ getValue }) => {
        const value = getValue() as string | undefined;
        return (
          <span className="rounded-full border border-ui-primaryBorder bg-white px-2.5 py-1 text-[13px] font-normal text-ui-textTertiary">
            {value ?? '—'}
          </span>
        );
      },
    },
    {
      accessorKey: 'city',
      header: 'City',
      cell: ({ getValue }) => {
        const value = getValue() as string | undefined;
        return (
          <span className="text-sm text-ui-monoBlack">{value ?? '—'}</span>
        );
      },
    },
    {
      accessorKey: 'visibility',
      header: 'Visibility',
      cell: ({ getValue }) => {
        const val = (getValue() as string)?.toLowerCase();
        if (val === 'public') return <Pill label="Public" variant="public" />;
        if (val === 'private')
          return <Pill label="Private" variant="private" />;
        if (val === 'curated')
          return <Pill label="Curated" variant="curated" />;
        return '—';
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ getValue }) => {
        const val = (getValue() as string)?.toLowerCase();
        if (val === 'upcoming')
          return <Pill label="Upcoming" variant="upcoming" />;
        if (val === 'pending approval')
          return <Pill label="Pending Approval" variant="pending" />;
        return '—';
      },
    },
    ...(showExtraColumns
      ? [
          {
            accessorKey: 'featured',
            header: () => (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                Featured Events
              </motion.div>
            ),
            cell: () => (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2.5 text-ui-textTertiary">
                  <span className="flex items-center gap-1 rounded-full border border-gray-300 px-2.5 py-1.5 text-[13px]">
                    <Star size={16} />
                    Featured 1
                    <ChevronDown size={15} />
                  </span>
                </div>
              </motion.div>
            ),
          },
          {
            accessorKey: 'collaborators',
            header: () => (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                Collaborators
              </motion.div>
            ),
            cell: () => (
              <motion.span
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className="text-[13px] text-ui-textTertiary"
              >
                Revolve +2
              </motion.span>
            ),
          },
          {
            accessorKey: 'featuredTalent',
            header: () => (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                Featured Talent
              </motion.div>
            ),
            cell: () => (
              <motion.span
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className="text-[13px] text-ui-textPrimaryColor"
              >
                The Rolling Stones +10
              </motion.span>
            ),
          },
        ]
      : []),
  ];
  const eventStats = [
    { label: 'Pending Approval', count: 25 },
    { label: 'Upcoming', count: 23 },
    { label: 'Past', count: 5 },
  ];
  return (
    <div className="px-6 py-8 2xl:px-8">
      <EventStatusSummary stats={eventStats} />
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <CommonButton
            leftIcon={
              <Image
                src={'/images/ViewColumnFilled.svg'}
                alt="Icon"
                height={18}
                width={18}
              />
            }
            className="bg-transparent px-0 text-sm font-normal text-ui-bgBlur hover:bg-transparent hover:text-ui-bgBlur"
          >
            Columns
          </CommonButton>
          <CommonButton
            leftIcon={
              <Image
                src={'/images/FilterListFilled.svg'}
                alt="Icon"
                height={18}
                width={18}
              />
            }
            className="bg-transparent px-0 text-sm font-normal text-ui-bgBlur hover:bg-transparent hover:text-ui-bgBlur"
          >
            Filters
          </CommonButton>
          <CommonButton
            leftIcon={
              <Image
                src={'/images/SaveAltFilled.svg'}
                alt="Icon"
                height={18}
                width={18}
              />
            }
            className="bg-transparent px-0 text-sm font-normal text-ui-bgBlur hover:bg-transparent hover:text-ui-bgBlur"
          >
            Export
          </CommonButton>
        </div>
        <div className="border-b border-[rgba(0,0,0,0.42)]">
          <CommonInput
            icon={<Search className="text-[rgba(0,0,0,0.56)]" size={20} />}
            placeholder="Search..."
            value={searchQuery}
            className="h-[42px] !min-h-0 border-none !px-2.5"
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <motion.div
        layout
        transition={{ layout: { duration: 0.5, ease: 'easeInOut' } }}
      >
        <DataTable columns={columns} data={data} />
      </motion.div>
    </div>
  );
}
