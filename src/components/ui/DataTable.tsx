'use client';

import React, { useEffect, useState } from 'react';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { cn } from '@/lib/utils';

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  searchable?: boolean;
  filterable?: boolean;
  selectable?: boolean;
  className?: string;
  onRowSelect?: (rows: TData[]) => void;
}

function DataTable<TData extends { id: string | number }>({
  data,
  columns,
  selectable = false,
  className,
  onRowSelect,
}: DataTableProps<TData>) {
  const [globalFilter, setGlobalFilter] = useState('');
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
        .rows.map(r => r.original);
      onRowSelect(selectedRows);
    }
  }, [rowSelection, onRowSelect, selectable, table]);

  return (
    <div className={cn('scrollbar-hidden w-full overflow-x-auto', className)}>
      <div>
        <table className="w-full border-collapse border-none font-diatype">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr
                key={headerGroup.id}
                className="border-b border-[rgba(0,0,0,0.12)] text-left text-sm font-medium capitalize tracking-wide text-ui-textPrimaryColor"
              >
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className={cn(
                      'select-none px-2 py-1.5 text-left text-[12px] font-medium',
                      header.column.getCanSort() && 'cursor-pointer'
                    )}
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <span>
                          {header.column.getIsSorted() === 'desc' ? (
                            <ChevronDown size={14} />
                          ) : header.column.getIsSorted() === 'asc' ? (
                            <ChevronUp size={14} />
                          ) : (
                            <div className="h-3 w-3" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-sm text-ui-monoBlack"
                >
                  No data available
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr
                  key={row.id}
                  className={cn(
                    'border-none transition hover:bg-ui-neutralInputBg',
                    row.getIsSelected() && 'bg-transparent'
                  )}
                >
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className="whitespace-nowrap px-2 py-4 text-[13px] text-ui-monoBlack"
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
    </div>
  );
}

export default DataTable;
