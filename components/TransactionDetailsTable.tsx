// components/TransactionDetailsTable.tsx
'use client';

import React from 'react';
import { DataTable } from './ui/DataTable';
import { Transaction } from './types';
import { ColumnDef } from '@tanstack/react-table';

interface TransactionDetailsTableProps {
  transactions: Transaction[];
}

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ getValue }) => {
      const date = new Date(getValue<string>());
      return date.toLocaleDateString();
    },
    meta: {
      align: 'left',
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    meta: {
      align: 'left',
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ getValue }) => {
      const amount = getValue<number>();
      const formattedAmount =
        amount >= 0 ? `$${amount.toFixed(2)}` : `-$${Math.abs(amount).toFixed(2)}`;
      const color = amount >= 0 ? 'text-green-600' : 'text-red-600';
      return <span className={color}>{formattedAmount}</span>;
    },
    meta: {
      align: 'right',
    },
  },
];

export default function TransactionDetailsTable({
  transactions,
}: TransactionDetailsTableProps) {
  return (
    <div className="mt-2">
      <DataTable columns={columns} data={transactions} />
    </div>
  );
}
