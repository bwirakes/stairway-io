// components/ui/AccountTable.tsx
'use client';

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FiChevronDown, FiChevronUp, FiMoreVertical } from 'react-icons/fi';
import clsx from 'clsx';

interface ChildAccount {
  id: number;
  name: string;
  value: string;
}

interface AccountType {
  id: number;
  logo: React.ReactNode;
  type: string;
  value: string;
  children: ChildAccount[];
  isAsset: boolean; // Determines color (green for assets, red for liabilities)
}

interface AccountTableProps {
  title: string;
  data: AccountType[];
}

const AccountTable: React.FC<AccountTableProps> = ({ title, data }) => {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRow = (id: number) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  return (
    <div className="w-full bg-transparent rounded-md">
      <h3 className="px-6 pt-6 mb-4 text-lg font-semibold text-left">{title}</h3>
      <Table className="min-w-full bg-white rounded-lg">
        <TableBody>
          {data.map((account) => (
            <React.Fragment key={account.id}>
              {/* Parent Row */}
              <TableRow className="hover:bg-gray-100">
                <TableCell className="px-6 py-2">{account.logo}</TableCell>
                <TableCell className="flex items-center px-6 py-2">
                  <span className="mr-2">{account.type}</span>
                </TableCell>
                <TableCell
                  className={clsx(
                    'px-6 py-2 text-left',
                    account.isAsset ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {account.value}
                </TableCell>
                <TableCell className="px-6 py-2 text-right">
                  <button
                    onClick={() => toggleRow(account.id)}
                    className="focus:outline-none"
                    aria-label={expandedRows.has(account.id) ? 'Collapse' : 'Expand'}
                  >
                    {expandedRows.has(account.id) ? (
                      <FiChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <FiChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </TableCell>
              </TableRow>

              {/* Child Rows */}
              {expandedRows.has(account.id) &&
                account.children.map((child) => (
                  <TableRow key={child.id} className="bg-white">
                    <TableCell className="px-6 py-2"></TableCell>
                    <TableCell className="flex items-center px-6 py-2 pl-12">
                      <span className="mr-2">{child.name}</span>
                    </TableCell>
                    <TableCell
                      className={clsx(
                        'px-6 py-2 text-left',
                        account.isAsset ? 'text-green-600' : 'text-red-600'
                      )}
                    >
                      {child.value}
                    </TableCell>
                    <TableCell className="px-6 py-2 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            className="focus:outline-none"
                            aria-label="Open actions menu"
                          >
                            <FiMoreVertical className="w-5 h-5 text-gray-500" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => { /* Handle Account Details */ }}>
                            Account Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => { /* Handle Transaction Details */ }}>
                            Transaction Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => { /* Handle Close Account with AI */ }}>
                            Close Account with AI
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AccountTable;
