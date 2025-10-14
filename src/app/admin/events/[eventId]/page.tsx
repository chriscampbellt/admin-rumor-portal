'use client';

import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { ColumnDef } from '@tanstack/react-table';
import {
  ChevronRight,
  Eye,
  EyeOff,
  MoreHorizontal,
  Pencil,
  Search,
  User2,
} from 'lucide-react';

import AboutEventSeries from '@/components/ui/AboutEventSeries';
import { CommonButton } from '@/components/ui/CommonButton';
import CommonInput from '@/components/ui/CommonInput';
import DataTable from '@/components/ui/DataTable';
import DeleteEvent from '@/components/ui/DeleteEvent';
import EditEventSeries from '@/components/ui/EditEventSeries';
import EventStatusSummary from '@/components/ui/EventStatusSummary';
import { Card } from '@/components/ui/card';
import useToggle from '@/lib/useToggle';
import { cn } from '@/lib/utils';

interface EventData {
  id: number;
  icon?: React.ReactNode;
  eventName: string;
  host?: string;
  eventDate?: string;
  eventType?: string;
  city?: string;
  visibility?: string;
  status?: string;
}

const Pill = ({
  label,
  variant,
  onClick,
}: {
  label: string;
  variant: 'public' | 'private' | 'curated' | 'upcoming' | 'pending';
  onClick?: () => void;
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
      style:
        'bg-ui-primaryBorder text-ui-neutralSurfaceOnColor cursor-pointer hover:bg-ui-primaryBorder/80 transition-colors',
    },
  }[variant];

  return (
    <span
      onClick={onClick}
      className={cn(
        'inline-flex select-none items-center gap-1.5 rounded-full py-1.5 text-[13px] font-normal capitalize',
        config.style,
        variant === 'upcoming' ? 'px-[30px]' : 'px-2.5'
      )}
    >
      {config.icon}
      {label}
    </span>
  );
};

const data: EventData[] = [
  {
    id: 1,
    eventName: 'Palm Tree Music Festival The Hamptons',
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
];
const eventStats = [
  { label: 'Pending Approval', count: 25 },
  { label: 'Upcoming', count: 23 },
  { label: 'Past', count: 5 },
];
export default function EventTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const { isOpen, open, toggle } = useToggle();
  const router = useRouter();
  const {
    isOpen: isAboutOpen,
    open: openAbout,
    toggle: toggleAbout,
  } = useToggle();
  const {
    isOpen: isDeleteOpen,
    open: openDelete,
    toggle: toggleDelete,
  } = useToggle();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
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
  const columns: ColumnDef<EventData>[] = [
    {
      accessorKey: 'eventName',
      header: 'Event Name',
      cell: ({ row }) => {
        const { icon, eventName } = row.original as EventData;
        return (
          <div className="flex items-center gap-6">
            <span className="flex-shrink-0 text-neutral-700">{icon}</span>
            <span className="truncate text-sm font-normal text-ui-monoBlack">
              {eventName}
            </span>
          </div>
        );
      },
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
      cell: ({ row, getValue }) => {
        const val = (getValue() as string)?.toLowerCase();
        if (val === 'upcoming')
          return <Pill label="Upcoming" variant="upcoming" />;
        if (val === 'pending approval')
          return (
            <Pill
              label="Pending Approval"
              variant="pending"
              onClick={() => {
                console.log(row.original);
                router.push('/admin/events/pending-approval');
              }}
            />
          );
        return '—';
      },
    },
  ];
  return (
    <>
      <div className="px-6 py-8 2xl:px-8">
        <div className="mb-8 flex flex-wrap items-center gap-6 rounded-[24px] bg-white p-6 font-diatype">
          <div className="w-full flex-shrink-0 lg:max-w-80">
            <Card className="relative overflow-hidden border-none bg-transparent shadow-none">
              <div className="aspect-[3/4]">
                <Image
                  src="/images/marketplate.jpg"
                  alt={'Event Image'}
                  width={500}
                  height={500}
                  className="h-full w-full rounded-xl object-cover"
                />
              </div>
            </Card>
          </div>

          <div className="flex-1 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-18 w-18 flex-col justify-center rounded-12 bg-ui-neutralSurfaceBackground text-center">
                  <p className="pb-0.5 text-xs font-bold text-ui-neutralPlaceholder">
                    Jan
                  </p>
                  <b className="text-xl font-bold xl:text-[32px]">10</b>
                </div>
                <p className="pb-0.5 text-xl font-medium text-ui-neutralPlaceholder">
                  Jan 15 — May 20, 2025
                </p>
              </div>
              <div>
                <h2 className="mb-2 font-romie text-[24px] font-bold text-ui-neutralSurfaceOnColor md:text-[28px] lg:text-[32px] 2xl:text-[40px]">
                  About the Event Series
                </h2>
                <p className="mb-2 font-sans text-sm font-normal leading-relaxed text-ui-neutralSurfaceOnColor md:text-lg 2xl:text-[20px]">
                  Revolve Festival kicks off the 2023 Coachella festival season
                  in style. Making a show-stopping return to the desert with its
                  bigg... Revolve Festival kicks off the 2023 Coachella festival
                  season in style. Making a show-stopping return to the desert
                  with its bigg... Revolve Festival kicks off the 2023 Coachella
                  festival season in style. Making a show-stopping return to the
                  desert with its bigg...
                </p>
                <button className="flex items-center gap-1 pt-2 text-sm font-medium text-ui-neutralSurfaceOnColor underline">
                  Show More <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
          <div
            className="relative flex items-center gap-2 self-start"
            ref={dropdownRef}
          >
            <CommonButton
              leftIcon={<Pencil size={18} />}
              onClick={open}
              className="rounded-full bg-ui-neutralSurfaceSupport text-sm text-ui-neutralSurfaceOnColor hover:bg-ui-neutralContentLight"
            >
              Edit Event
            </CommonButton>
            <CommonButton
              onClick={toggleDropdown}
              className="rounded-full border border-ui-lightGreyBorder bg-transparent text-sm hover:bg-ui-neutralInputBg hover:text-ui-neutralSurfaceOnColor"
            >
              <MoreHorizontal size={20} />
            </CommonButton>

            {isDropdownOpen && (
              <div className="absolute right-7 top-11 z-10 w-[150px] rounded-12 border border-ui-neutralBorderComponent bg-white font-diatype text-ui-neutralSurfaceOnColor shadow-lg">
                <button
                  onClick={() => {
                    openAbout();
                    setIsDropdownOpen(false);
                  }}
                  className="block w-full rounded-t-12 px-3 py-2 text-left text-sm hover:bg-gray-100"
                >
                  About Event
                </button>
                <button
                  onClick={() => {
                    openDelete();
                    setIsDropdownOpen(false);
                  }}
                  className="block w-full whitespace-nowrap rounded-b-12 px-3 py-2 text-left text-sm text-ui-neutralDarkRed hover:bg-gray-100"
                >
                  Delete Event
                </button>
              </div>
            )}
          </div>
        </div>
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
        <DataTable columns={columns} data={data} />
      </div>
      <EditEventSeries isOpen={isOpen} onClose={toggle} />
      <AboutEventSeries isOpen={isAboutOpen} onClose={toggleAbout} />
      <DeleteEvent isOpen={isDeleteOpen} onClose={toggleDelete} />
    </>
  );
}
