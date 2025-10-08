'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Check, ChevronDown, ChevronUp, List, Search } from 'lucide-react';

import { cn } from '@/lib/utils';

import { CheckboxDropdown, DropdownOption } from './CheckboxDropdown';
import { CommonButton } from './CommonButton';
import CommonInput from './CommonInput';

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  searchable?: boolean;
  filterable?: boolean;
  selectable?: boolean;
  isSelected?: boolean;
  addToList?: boolean;
  className?: string;
  onRowSelect?: (rows: TData[]) => void;
}

function DataTable<TData extends { id: string | number }>({
  data,
  columns,
  searchable = false,
  filterable = false,
  selectable = false,
  isSelected = true,
  addToList = false,
  className,
  onRowSelect,
}: DataTableProps<TData>) {
  const [globalFilter, setGlobalFilter] = useState('');
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(['confirmed', 'invited']);

  const options: DropdownOption[] = [
    { value: 'confirmed', label: 'Confirmed', count: 80 },
    { value: 'invited', label: 'Invited', count: 20 },
    { value: 'requested', label: 'Requested', count: 28 },
  ];
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      rowSelection,
    },
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: selectable,
    getRowId: row => row.id.toString(),
  });

  useEffect(() => {
    if (onRowSelect && selectable) {
      const selectedRows = table
        .getSelectedRowModel()
        .rows.map(row => row.original);
      onRowSelect(selectedRows);
    }
  }, [rowSelection, onRowSelect, selectable, table]);

  return (
    <div className={cn('mt-4', className)}>
      <div className="overflow-x-auto rounded-2xl border border-zinc-200 font-diatype">
        {(searchable || filterable) && (
          <div className="flex items-center justify-start gap-4 border-b px-4 py-3">
            {filterable && (
              <CommonButton
                className="bg-ui-backgroundBg text-ui-neutralSurfaceOnColor hover:bg-ui-backgroundBg"
                leftIcon={
                  <Image
                    src="/images/filter-lines.svg"
                    alt="Filter icon"
                    width={16}
                    height={16}
                  />
                }
              >
                Filters
              </CommonButton>
            )}
            <div className="flex w-full items-center justify-between gap-4">
              {searchable && (
                <div className="shrink-0">
                  <CommonInput
                    icon={
                      <Search
                        className="text-ui-neuteralSurfaceSecondary"
                        size={16}
                      />
                    }
                    placeholder="Search…"
                    autoComplete="off"
                    className="h-[42px] !min-h-0 shrink-0 md:w-[450px] lg:max-w-md"
                    onChange={e => setGlobalFilter(e.target.value)}
                    type="text"
                  />
                </div>
              )}

              {!filterable && (
                <div className="relative inline-block flex-shrink-0">
                  <CommonButton
                    rightIcon={<ChevronDown size={16} />}
                    onClick={() => setOpen(prev => !prev)}
                    className="rounded-full bg-ui-neutralSurfaceBackground px-4 py-2 text-[14px] font-medium text-black hover:bg-black hover:text-white"
                  >
                    Status (2){' '}
                  </CommonButton>
                  <CommonButton
                    rightIcon={<ChevronDown size={16} />}
                    onClick={() => setOpen(prev => !prev)}
                    className="ml-2 rounded-full bg-ui-neutralSurfaceBackground px-4 py-2 text-[14px] font-medium text-black hover:bg-black hover:text-white"
                  >
                    Ticket Type(All)
                  </CommonButton>
                  <div className="absolute right-10 top-2">
                    <CheckboxDropdown
                      options={options}
                      value={selected}
                      onChange={setSelected}
                      open={open}
                      onOpenChange={setOpen}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <table className="w-full font-diatype">
          <thead className="border-b border-neutral-100">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className={cn(
                      'px-6 py-4 text-left font-diatype text-sm font-bold capitalize tracking-wider text-ui-neutralSurfaceOnColor transition-colors',
                      header.column.getCanSort()
                        ? 'cursor-pointer hover:bg-zinc-100'
                        : ''
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center space-x-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <span className="ml-1">
                          {header.column.getIsSorted() === 'desc' ? (
                            <ChevronDown size={14} />
                          ) : header.column.getIsSorted() === 'asc' ? (
                            <ChevronUp size={14} />
                          ) : (
                            <div className="h-3.5 w-3.5" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="bg-white">
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center font-diatype text-sm text-zinc-500"
                >
                  No data available
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr
                  key={row.id}
                  className={cn(
                    'transition-colors hover:bg-zinc-50',
                    row.getIsSelected() && 'bg-ui-neutralInputBg'
                  )}
                >
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className="whitespace-nowrap px-6 py-3 text-sm text-zinc-900"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {isSelected && (
        <div className="scrollbar-hidden mt-4 flex items-center justify-between overflow-auto font-diatype text-sm text-ui-neutralSurfaceOnColor">
          {selectable && (
            <span className="flex">
              Selected{' '}
              <span className="ml-2 rounded-28 bg-ui-neutralSurfaceBackground px-2.5 py-0.5 text-center">
                {Object.keys(rowSelection).length}
              </span>
            </span>
          )}
          {filterable ? (
            <div className="flex items-center justify-end gap-4 bg-white px-4 py-4">
              <CommonButton className="flex items-center gap-2 rounded-full border-2 border-ui-errorBorder bg-transparent px-4 py-5 text-[14px] font-medium text-ui-neutralDarkRed hover:bg-transparent">
                Cancel
              </CommonButton>
              {addToList ? (
                <CommonButton
                  leftIcon={<List size={16} />}
                  className="border-ui-black group flex items-center gap-2 rounded-full border-2 bg-black px-4 py-5 text-[14px] font-medium text-white hover:bg-zinc-800"
                >
                  Add To List
                </CommonButton>
              ) : (
                <CommonButton className="border-ui-black group flex items-center gap-2 rounded-full border-2 bg-transparent px-4 py-5 text-[14px] font-medium text-black hover:bg-black hover:text-white">
                  <Image
                    src="/images/save-02.svg"
                    width={16}
                    height={16}
                    alt="Save icon"
                    className="group-hover:invert"
                  />
                  Save as Draft
                </CommonButton>
              )}
              <CommonButton
                leftIcon={<Check size={16} />}
                onClick={() =>
                  router.push('/host/dashboard/guests/invite-details')
                }
                className="border-ui-black rounded-full border-2 px-4 py-5 text-[14px] font-medium text-white"
              >
                Send Invite
              </CommonButton>
            </div>
          ) : (
            <div className="flex items-center justify-end gap-4 bg-white px-4 py-4">
              <CommonButton
                leftIcon={<Check size={16} />}
                onClick={() =>
                  router.push('/host/dashboard/anouncement/create')
                }
                className="border-ui-black rounded-full border-2 px-4 py-5 text-[14px] font-medium text-white"
              >
                Continue
              </CommonButton>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DataTable;
