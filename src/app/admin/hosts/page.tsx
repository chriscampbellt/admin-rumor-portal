'use client';

import React, { useState } from 'react';

import Image from 'next/image';

import { ColumnDef } from '@tanstack/react-table';
import { Plus, Search } from 'lucide-react';

import Checkbox from '@/components/ui/Checkbox';
import { CommonButton } from '@/components/ui/CommonButton';
import CommonInput from '@/components/ui/CommonInput';
import DataTable from '@/components/ui/DataTable';
import EventStatusSummary from '@/components/ui/EventStatusSummary';

interface HostData {
  id: number;
  profileName: string;
  contact: string;
  email: string;
  website: string;
  events: number;
  status: 'New Applicant' | 'Active' | 'Waitlisted';
  phone: string;
  appliedOn: string;
  hostSince: string;
  source: string;
  referredBy: string;
}

const Host: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const stats = [
    { label: 'NEW APPLICANTS', count: 12 },
    { label: 'ACTIVE HOSTS', count: 23 },
    { label: 'WAITLISTED HOSTS', count: 5 },
    { label: 'COLLABORATORS', count: 0 },
    { label: 'BANNED', count: 0 },
  ];
  const columns: ColumnDef<HostData>[] = [
    {
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
    },
    {
      accessorKey: 'profileName',
      header: 'Profile Name',
      cell: ({ row }) => {
        const { profileName } = row.original;
        const initials = profileName
          ?.split(' ')
          .map(n => n[0])
          .join('')
          .slice(0, 2);
        return (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-medium text-white">
              {initials}
            </div>
            <span className="text-sm font-medium text-ui-monoBlack">
              {profileName}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: 'contact',
      header: 'Contact',
      cell: ({ getValue }) => (
        <span className="text-sm text-ui-monoBlack">
          {getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ getValue }) => (
        <span className="text-sm text-ui-monoBlack">
          {getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: 'website',
      header: 'Website',
      cell: ({ getValue }) => {
        const value = getValue() as string;
        return (
          <span className="text-sm text-ui-monoBlack">
            {value && value !== '-----' ? value : '-----'}
          </span>
        );
      },
    },
    {
      accessorKey: 'events',
      header: 'Events',
      cell: ({ getValue }) => (
        <span className="text-sm text-ui-monoBlack">
          {String(getValue()).padStart(2, '0')}
        </span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ getValue }) => {
        const status = getValue() as string;
        const badgeColors: Record<string, string> = {
          'New Applicant': 'bg-ui-textSubtitle text-[rgba(0,0,0,0.87)]',
          Active: 'bg-ui-mutedGreen text-[rgba(0,0,0,0.87)]',
          Waitlisted: 'bg-ui-bgLightYellow text-[rgba(0,0,0,0.87)]',
        };
        return (
          <div
            className={`rounded-full px-2 py-1 text-center text-[13px] font-normal ${badgeColors[status]}`}
          >
            {status}
          </div>
        );
      },
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      cell: ({ getValue }) => (
        <span className="text-sm text-ui-monoBlack">
          {getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: 'appliedOn',
      header: 'Applied on',
      cell: ({ getValue }) => (
        <span className="text-sm text-ui-monoBlack">
          {getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: 'hostSince',
      header: 'Host Since',
      cell: ({ getValue }) => (
        <span className="text-sm text-ui-monoBlack">
          {getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: 'source',
      header: 'Source',
      cell: ({ getValue }) => (
        <span className="text-sm text-ui-monoBlack">
          {getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: 'referredBy',
      header: 'Referred By',
      cell: ({ getValue }) => (
        <span className="text-sm text-ui-monoBlack">
          {getValue() as string}
        </span>
      ),
    },
  ];

  const data: HostData[] = [
    {
      id: 1,
      profileName: 'Nylon',
      contact: 'Tailor Tylenson',
      email: 'tailor.tylenson@nikeinc.com',
      website: 'www.hostsite.com',
      events: 2,
      status: 'New Applicant',
      phone: '+1 951 239 0',
      appliedOn: '05/16/2024',
      hostSince: '05/16/2024',
      source: 'Application',
      referredBy: 'Tailor Tylenson',
    },
    {
      id: 2,
      profileName: 'Adidas Inc',
      contact: 'Karl Jensen',
      email: 'Karl.Jensen@adidasinc.com',
      website: 'www.hostsite.com',
      events: 12,
      status: 'Waitlisted',
      phone: '+1 951 239 0',
      appliedOn: '05/16/2024',
      hostSince: '05/16/2024',
      source: 'Application',
      referredBy: 'Karl Jensen',
    },
    {
      id: 3,
      profileName: 'Nike Inc',
      contact: 'Karl Jensen',
      email: 'Karl.Jensen@adidasinc.com',
      website: 'www.longhostsite.com',
      events: 2,
      status: 'Active',
      phone: '+1 951 239 0',
      appliedOn: '05/16/2024',
      hostSince: '05/16/2024',
      source: 'Application',
      referredBy: 'Karl Jensen',
    },
    {
      id: 4,
      profileName: 'Nike Inc',
      contact: 'Tailor Tylenson',
      email: 'tailor.tylenson@nikeinc.com',
      website: 'www.hostsite.com',
      events: 2,
      status: 'Active',
      phone: '+1 951 239 0',
      appliedOn: '05/16/2024',
      hostSince: '05/16/2024',
      source: 'Application',
      referredBy: 'Tailor Tylenson',
    },
    {
      id: 5,
      profileName: 'Puma Global',
      contact: 'Sophie Reynolds',
      email: 'sophie.reynolds@puma.com',
      website: 'www.pumaglobal.com',
      events: 5,
      status: 'Active',
      phone: '+1 310 555 2489',
      appliedOn: '06/05/2024',
      hostSince: '06/18/2024',
      source: 'Referral',
      referredBy: 'Karl Jensen',
    },
    {
      id: 6,
      profileName: 'Reebok Sports',
      contact: 'Jordan Smith',
      email: 'jordan@reebok.com',
      website: 'www.reebok.com',
      events: 8,
      status: 'New Applicant',
      phone: '+1 212 459 2231',
      appliedOn: '07/01/2024',
      hostSince: '—',
      source: 'Application',
      referredBy: '—',
    },
    {
      id: 7,
      profileName: 'Under Armour',
      contact: 'Lucy Hale',
      email: 'lucy.hale@underarmour.com',
      website: 'www.ua.com',
      events: 4,
      status: 'Waitlisted',
      phone: '+1 404 293 8871',
      appliedOn: '05/29/2024',
      hostSince: '—',
      source: 'Referral',
      referredBy: 'Tailor Tylenson',
    },
    {
      id: 8,
      profileName: 'Columbia Outdoor',
      contact: 'Tom Hardy',
      email: 'tom.hardy@columbiaoutdoor.com',
      website: 'www.columbia.com',
      events: 6,
      status: 'Active',
      phone: '+1 917 302 7710',
      appliedOn: '06/20/2024',
      hostSince: '07/01/2024',
      source: 'Application',
      referredBy: '—',
    },
    {
      id: 9,
      profileName: 'Asics Japan',
      contact: 'Rina Kobayashi',
      email: 'rina.k@asics.co.jp',
      website: 'www.asics.com',
      events: 9,
      status: 'Active',
      phone: '+81 80 1234 5678',
      appliedOn: '07/03/2024',
      hostSince: '07/15/2024',
      source: 'Application',
      referredBy: 'Karl Jensen',
    },
    {
      id: 10,
      profileName: 'New Balance Ltd',
      contact: 'John Carter',
      email: 'john.carter@newbalance.com',
      website: 'www.newbalance.com',
      events: 3,
      status: 'Waitlisted',
      phone: '+1 503 310 8912',
      appliedOn: '06/08/2024',
      hostSince: '—',
      source: 'Referral',
      referredBy: 'Nike Inc',
    },
    {
      id: 11,
      profileName: 'Champion USA',
      contact: 'Olivia Taylor',
      email: 'olivia@champion.com',
      website: 'www.champion.com',
      events: 1,
      status: 'New Applicant',
      phone: '+1 212 981 0078',
      appliedOn: '08/10/2024',
      hostSince: '—',
      source: 'Application',
      referredBy: '—',
    },
  ];
  return (
    <div className="mx-6 font-diatype">
      <div className="flex items-center justify-between gap-2">
        <EventStatusSummary stats={stats} />
        <CommonButton
          leftIcon={<Plus size={16} />}
          className="group mb-2 flex items-center gap-2 rounded-full border-2 border-black bg-black px-4 py-2 text-[14px] font-medium text-white hover:bg-white hover:text-black"
        >
          INVITE HOST
        </CommonButton>
      </div>
      <div className="flex items-center justify-between gap-2 pb-2">
        <div className="flex items-center gap-5">
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
  );
};

export default Host;
