// components/ui/DataTable.tsx
'use client';

import React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table'; // Ensure you have shadcn/ui Table components
import { ChevronDownIcon } from 'lucide-react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const align = header.column.columnDef.meta?.align || 'left';
                return (
                  <TableHead key={header.id} className={`text-${align}`}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {/* Optional: Add sorting indicators */}
                    {header.column.getCanSort() && (
                      <span>
                        {header.column.getIsSorted() === 'asc' ? (
                          <ChevronDownIcon className="inline w-4 h-4 ml-1" />
                        ) : header.column.getIsSorted() === 'desc' ? (
                          <ChevronDownIcon className="inline w-4 h-4 ml-1 rotate-180" />
                        ) : null}
                      </span>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => {
                  const align = cell.column.columnDef.meta?.align || 'left';
                  return (
                    <TableCell key={cell.id} className={`text-${align}`}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
