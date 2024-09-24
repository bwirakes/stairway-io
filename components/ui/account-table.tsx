'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {  MixerHorizontalIcon } from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

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
  isAsset: boolean;
}

interface AccountTableProps {
  title: string;
  data: AccountType[];
}

const AccountTable: React.FC<AccountTableProps> = ({ title, data }) => {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const searchTerm = useState('');

  const toggleRow = (id: number) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  const filteredData = data.filter(account =>
    account.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.children.some(child => child.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="overflow-hidden bg-white shadow-sm rounded-xl dark:bg-neutral-900">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">A list of all your {title.toLowerCase()} including account details and values.</p>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Balances</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((account) => (
                <React.Fragment key={account.id}>
                  <TableRow className="hover:bg-gray-50 dark:hover:bg-neutral-800">
                    <TableCell>{account.logo}</TableCell>
                    <TableCell className="font-medium">{account.type}</TableCell>
                    <TableCell className={`text-right ${account.isAsset ? 'text-green-600' : 'text-red-600'}`}>
                      {account.value}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRow(account.id)}
                        className="p-0"
                      >
                        {expandedRows.has(account.id) ? (
                          <FiChevronUp className="w-4 h-4" />
                        ) : (
                          <FiChevronDown className="w-4 h-4" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                  {expandedRows.has(account.id) && account.children.map((child) => (
                    <TableRow key={child.id} className="bg-gray-50 dark:bg-neutral-800">
                      <TableCell></TableCell>
                      <TableCell className="pl-8">{child.name}</TableCell>
                      <TableCell className={`text-right ${account.isAsset ? 'text-green-600' : 'text-red-600'}`}>
                        {child.value}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-0">
                              <span className="sr-only">Open menu</span>
                              <MixerHorizontalIcon className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onSelect={() => console.log('View details')}>
                              View details
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => console.log('Edit account')}>
                              Edit account
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
      </div>
    </div>
  );
};

export default AccountTable;