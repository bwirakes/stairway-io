// components/TransactionRow.tsx
'use client';

import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import ActionDropdown from './ActionDropdown';
import CategoryIcon from './CategoryIcon';
import clsx from 'clsx';

interface Transaction {
  id: number;
  name: string;
  merchant: string;
  date: string;
  amount: number;
  category: string;
  recurring: boolean;
}

interface TransactionRowProps {
  transaction: Transaction;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ transaction }) => {
  const handleTransactionDetails = () => {
    // Implement transaction details logic
    console.log('Transaction Details:', transaction);
  };

  const handleCloseAccount = () => {
    // Implement close account logic
    console.log('Close Account:', transaction);
  };

  const handleManageAccount = () => {
    // Implement manage account logic
    console.log('Manage Account:', transaction);
  };

  return (
    <TableRow className="hover:bg-gray-50">
      <TableCell className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
        {transaction.name}
      </TableCell>
      <TableCell className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
        {transaction.merchant}
      </TableCell>
      <TableCell className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
        {transaction.date}
      </TableCell>
      <TableCell className="px-4 py-4 text-sm text-right whitespace-nowrap">
        <span
          className={clsx(
            transaction.amount >= 0 ? 'text-green-600' : 'text-red-600',
            'font-medium'
          )}
        >
          {transaction.amount >= 0 ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
        </span>
      </TableCell>
      <TableCell className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
        <div className="flex items-center">
          <CategoryIcon category={transaction.category} />
          <span className="ml-2">{transaction.category}</span>
        </div>
      </TableCell>
      <TableCell className="px-4 py-4 whitespace-nowrap">
        {transaction.recurring ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Recurring
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            One-time
          </span>
        )}
      </TableCell>
      <TableCell className="px-4 py-4 text-sm font-medium text-right whitespace-nowrap">
        <ActionDropdown
          onTransactionDetails={handleTransactionDetails}
          onCloseAccount={handleCloseAccount}
          onManageAccount={handleManageAccount}
        />
      </TableCell>
    </TableRow>
  );
};

export default TransactionRow;
