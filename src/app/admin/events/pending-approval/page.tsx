'use client';

import React, { useState } from 'react';

import Image from 'next/image';

import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import {
  Calendar,
  ChevronDown,
  ChevronRight,
  Eye,
  Mail,
  MapPin,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  UserCircle,
  Users2,
} from 'lucide-react';

import Checkbox from '@/components/ui/Checkbox';
// Assuming these are your components/utilities
import { CommonButton } from '@/components/ui/CommonButton';
import CommonInput from '@/components/ui/CommonInput';
import DataTable from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface UserData {
  id: number;
  name: string;
  userType: string;
  categories: string[];
  followers: string;
  city: string;
  addedBy: string;
}

const data: UserData[] = [
  {
    id: 1,
    name: 'Dakota Fanning',
    userType: 'Member',
    categories: ['Writer'],
    followers: '20.5M',
    city: 'Los Angeles, CA',
    addedBy: 'Don Julio',
  },
  {
    id: 2,
    name: 'Roger Spike Lee',
    userType: 'Member',
    categories: ['Philanthropist', '+2'],
    followers: '20.5M',
    city: 'Los Angeles, CA',
    addedBy: 'PTC',
  },
  {
    id: 3,
    name: 'Roger Spike Lee',
    userType: 'Member',
    categories: ['Writer', '+1'],
    followers: '20.5M',
    city: 'Los Angeles, CA',
    addedBy: 'H.Wood Group',
  },
  {
    id: 4,
    name: 'Roger Spike Lee',
    userType: 'Non-Member',
    categories: [],
    followers: '------',
    city: '------',
    addedBy: 'Uncommon',
  },
  {
    id: 5,
    name: 'Emma Stone',
    userType: 'Member',
    categories: ['Actor', '+1'],
    followers: '18.9M',
    city: 'New York, NY',
    addedBy: 'Paramount',
  },
  {
    id: 6,
    name: 'Michael B. Jordan',
    userType: 'Member',
    categories: ['Producer', '+2'],
    followers: '22.4M',
    city: 'Atlanta, GA',
    addedBy: 'Warner Bros',
  },
  {
    id: 7,
    name: 'Zendaya Coleman',
    userType: 'Member',
    categories: ['Actor', '+3'],
    followers: '32.8M',
    city: 'Los Angeles, CA',
    addedBy: 'A24',
  },
  {
    id: 8,
    name: 'Tom Holland',
    userType: 'Member',
    categories: ['Actor'],
    followers: '29.2M',
    city: 'London, UK',
    addedBy: 'Sony Pictures',
  },
];

export default function PendingApprovalTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const columnHelper = createColumnHelper<UserData>();
  type TabId = 'drafts' | 'invited' | 'requests' | 'confirmed' | 'declined';
  const [activeTab, setActiveTab] = useState<TabId>('drafts');
  const tabs = [
    { id: 'drafts', label: 'Drafts', count: 22, activeColor: '#A4887E' },
    { id: 'invited', label: 'Invited', count: 1, activeColor: '#A4887E' },
    { id: 'requests', label: 'Requests', count: 12, activeColor: '#A4887E' },
    { id: 'confirmed', label: 'Confirmed', count: 10, activeColor: '#A4887E' },
    { id: 'declined', label: 'Declined', count: 1, activeColor: '#A4887E' },
  ] satisfies {
    id: TabId;
    label: string;
    count: number;
    activeColor: string;
  }[];

  const columns: ColumnDef<UserData, unknown>[] = [
    columnHelper.display({
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onChange={checked => table.toggleAllPageRowsSelected(!!checked)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onChange={checked => row.toggleSelected(!!checked)}
        />
      ),
      enableSorting: false,
    }) as ColumnDef<UserData, unknown>,

    columnHelper.accessor('name', {
      header: 'Name',
      cell: ({ getValue }) => (
        <span className="text-sm font-medium text-ui-monoBlack">
          {getValue()}
        </span>
      ),
    }) as ColumnDef<UserData, unknown>,

    columnHelper.accessor('userType', {
      header: 'User Type',
      cell: ({ getValue }) => (
        <span className="text-sm text-ui-monoBlack">{getValue()}</span>
      ),
    }) as ColumnDef<UserData, unknown>,

    columnHelper.accessor('categories', {
      header: 'Categories',
      cell: ({ getValue }) => {
        const cats = (getValue() as string[]) || [];
        if (cats.length === 0)
          return <span className="text-sm text-gray-400">------</span>;
        return (
          <div className="flex items-center gap-1">
            <span className="rounded-full border border-gray-300 bg-gray-100 px-2 py-0.5 text-xs text-gray-800">
              {cats[0]}
            </span>
            {cats.length > 1 && (
              <span className="rounded-full border border-gray-300 bg-gray-50 px-2 py-0.5 text-xs text-gray-600">
                {cats[1]}
              </span>
            )}
          </div>
        );
      },
    }) as ColumnDef<UserData, unknown>,

    columnHelper.accessor('followers', {
      header: 'Followers',
      cell: ({ getValue }) => (
        <span className="text-sm text-ui-monoBlack">{getValue()}</span>
      ),
    }) as ColumnDef<UserData, unknown>,

    columnHelper.accessor('city', {
      header: 'Base City',
      cell: ({ getValue }) => (
        <span className="text-sm text-ui-monoBlack">{getValue()}</span>
      ),
    }) as ColumnDef<UserData, unknown>,

    columnHelper.accessor('addedBy', {
      header: 'Added by',
      cell: ({ getValue }) => (
        <span className="text-sm text-ui-monoBlack">{getValue()}</span>
      ),
    }) as ColumnDef<UserData, unknown>,
  ];

  return (
    <>
      <div className="mx-4 mt-4 flex justify-end font-diatype lg:mx-6">
        <div className="flex min-w-[230px] items-center justify-between gap-1 rounded-full bg-ui-primaryBorder px-6 py-3">
          <div>
            <p className="text-xs text-ui-textPrimaryColor">Status</p>
            <p className="text-[16px] text-ui-neutralSurfaceOnColor">
              Pending Approval
            </p>
          </div>
          <ChevronDown size={20} className="text-[rgba(0, 0, 0, 0.56)]" />
        </div>
      </div>

      <div className="m-4 flex flex-col gap-6 lg:m-6 2xl:flex-row 2xl:flex-wrap">
        <div className="flex w-full flex-col items-center gap-6 rounded-[24px] bg-white p-6 md:flex-row md:flex-wrap lg:flex-1">
          <div className="w-full flex-shrink-0 lg:max-w-80">
            <Card className="relative overflow-hidden border-none bg-transparent shadow-none">
              <div className="absolute left-4 top-4 z-10 rounded bg-white px-2 py-1 text-xs font-medium text-zinc-700">
                HOST
              </div>
              <div className="aspect-[3/3]">
                <Image
                  src="/images/marketplate.jpg"
                  alt={'Event Image'}
                  width={300}
                  height={300}
                  className="h-full w-full rounded-xl object-cover"
                />
              </div>
            </Card>
          </div>

          <div className="flex-1 space-y-6">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <Calendar className="h-5 w-5 text-ui-neutralSurfaceOnColor" />
                <span className="font-diatype text-sm text-ui-neutralContentBody">
                  Start Date
                </span>
                <span className="font-diatype text-sm font-medium text-ui-neutralSurfaceOnColor">
                  Feb 9, 2024 — 9:00 am
                </span>
                <Badge className="rounded-md bg-ui-neutralSurfaceBackground px-1 py-0.5 text-xs font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.5 0.5C8.53757 0.5 11 2.96243 11 6C11 9.03757 8.53757 11.5 5.5 11.5C2.46243 11.5 0 9.03757 0 6C0 2.96243 2.46243 0.5 5.5 0.5ZM1.02746 5.5C1.234 3.63162 2.5844 2.10799 4.36285 1.64491C3.59955 2.79221 3.13715 4.11841 3.02505 5.5H1.02746ZM1.02746 6.5C1.234 8.36838 2.5844 9.89201 4.36285 10.3551C3.59955 9.20779 3.13715 7.88159 3.02505 6.5H1.02746ZM6.63715 10.3551C8.4156 9.89201 9.766 8.36838 9.97254 6.5H7.97495C7.86285 7.88159 7.40045 9.20779 6.63715 10.3551ZM9.97254 5.5H7.97495C7.86285 4.11841 7.40045 2.79221 6.63715 1.64491C8.4156 2.10799 9.766 3.63162 9.97254 5.5ZM5.5 1.7754C6.33484 2.85097 6.84561 4.14341 6.9712 5.5H4.0288C4.15439 4.14341 4.66516 2.85097 5.5 1.7754ZM5.5 10.2246C4.66516 9.14903 4.15439 7.85659 4.0288 6.5H6.9712C6.84561 7.85659 6.33484 9.14903 5.5 10.2246Z"
                      fill="#1F1F1F"
                    />
                  </svg>
                  <span className="ml-1 font-diatype text-ui-neutralSurfaceOnColor">
                    GMT
                  </span>
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Calendar className="h-5 w-5 text-ui-neutralSurfaceOnColor" />
                <span className="font-diatype text-sm text-ui-neutralContentBody">
                  End Date
                </span>
                <span className="font-diatype text-sm font-medium text-ui-neutralSurfaceOnColor">
                  Feb 10, 2024 — 1:00 am
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <MapPin className="h-5 w-5 text-ui-neutralSurfaceOnColor" />
                <span className="font-diatype text-sm text-ui-neutralContentBody">
                  Location
                </span>
                <span className="font-diatype text-sm font-medium text-ui-neutralSurfaceOnColor">
                  Wynn Resorts, Las Vegas, NV 89109
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <UserCircle className="h-5 w-5 text-ui-neutralSurfaceOnColor" />
                <span className="font-diatype text-sm text-ui-neutralContentBody">
                  Confirmed Guests
                </span>
                <span className="font-diatype text-sm font-medium text-ui-neutralSurfaceOnColor">
                  0/4,000
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Users2 className="h-5 w-5 text-ui-neutralSurfaceOnColor" />
                <span className="font-diatype text-sm text-ui-neutralContentBody">
                  Displayed Collaborators
                </span>
                <span className="font-diatype text-sm font-medium text-ui-neutralSurfaceOnColor">
                  Uncommon Entertainment & H Wood Group
                </span>
                <button className="text-zinc-500 hover:text-zinc-700">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="relative flex items-center gap-2 self-start">
            <CommonButton
              leftIcon={<Eye size={18} />}
              className="rounded-full bg-ui-neutralSurfaceOnColor px-3.5 py-2 text-sm text-white transition-colors hover:bg-gray-800 lg:text-base"
            >
              Public
            </CommonButton>
            <CommonButton className="rounded-full border border-ui-lightGreyBorder bg-transparent p-2.5 text-sm text-ui-neutralSurfaceOnColor hover:bg-ui-neutralInputBg hover:text-ui-neutralSurfaceOnColor">
              <Pencil size={18} />
            </CommonButton>
            <CommonButton className="rounded-full border border-ui-lightGreyBorder bg-transparent p-2.5 text-sm text-ui-neutralSurfaceOnColor hover:bg-ui-neutralInputBg hover:text-ui-neutralSurfaceOnColor">
              <MoreHorizontal size={20} />
            </CommonButton>
          </div>
        </div>
        <div className="w-full space-y-5 rounded-[24px] bg-white p-6 2xl:w-1/4">
          <div className="border-b pb-6">
            <CommonButton
              type="submit"
              disabled
              leftIcon={<Plus size={18} className="text-white" />}
              className="w-full !justify-start !rounded-12 !bg-[rgba(0,0,0,0.2)] py-4 !text-left font-diatype text-ui-textTertiary hover:text-ui-textTertiary"
            >
              Invite Guests
            </CommonButton>
          </div>
          <CommonButton
            type="submit"
            leftIcon={<Mail size={18} className="text-ui-textTertiary" />}
            className="w-full !justify-start !rounded-12 border !bg-transparent py-4 !text-left font-diatype text-ui-textTertiary hover:text-ui-textTertiary"
          >
            Event Announcements
          </CommonButton>
          <CommonButton
            type="submit"
            leftIcon={<Mail size={18} className="text-ui-textTertiary" />}
            className="w-full !justify-start !rounded-12 border !bg-transparent py-4 !text-left font-diatype text-ui-textTertiary hover:text-ui-textTertiary"
          >
            Sign up Forms
          </CommonButton>
          <CommonButton
            type="submit"
            leftIcon={<Mail size={18} className="text-ui-textTertiary" />}
            className="w-full !justify-start !rounded-12 border !bg-transparent py-4 !text-left font-diatype text-ui-textTertiary hover:text-ui-textTertiary"
          >
            View Tickets
          </CommonButton>
        </div>
      </div>
      <div className="m-6 rounded-2xl bg-white p-6 font-diatype">
        <div className="flex items-center justify-between gap-1 pb-6">
          <h3 className="font-romie text-xl font-medium">Manage Guest List</h3>
          <Image
            src="/images/Button_.svg"
            alt="Expand"
            className="cursor-pointer"
            height={46}
            width={42}
          />
        </div>
        <div className="mb-6 border-b border-ui-neutralContentLight">
          <div className="flex space-x-6">
            {tabs.map(tab => {
              const isActive = activeTab === tab.id;
              const badgeBg = isActive ? tab.activeColor : '#CCCCCC';

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center pb-2 transition-colors duration-200 ease-in-out',
                    'font-diatype text-base font-normal',
                    isActive
                      ? `border-b-2 border-ui-bgBlur text-ui-bgBlur`
                      : 'border-b-2 border-transparent text-gray-400'
                  )}
                >
                  {tab.label}
                  <span
                    className="ml-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: badgeBg }}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <CommonButton
              leftIcon={
                <Image
                  src="/images/ViewColumnFilled.svg"
                  alt="Columns"
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
                  src="/images/FilterListFilled.svg"
                  alt="Filters"
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
                  src="/images/SaveAltFilled.svg"
                  alt="Export"
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

        <DataTable columns={columns} data={data} selectable />
      </div>
    </>
  );
}
