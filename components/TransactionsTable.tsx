'use client'

import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { DownloadIcon, MixerHorizontalIcon } from '@radix-ui/react-icons'
import { Transaction } from '@/types/transaction'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface TransactionsTableProps {
  transactions: Transaction[]
  onViewDetails: (transaction: Transaction) => void
  onCloseAccount: (transaction: Transaction) => void
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions, onViewDetails, onCloseAccount }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDate, setSelectedDate] = useState('')

  const filteredTransactions = transactions.filter(transaction =>
    (selectedDate ? transaction.date === selectedDate : true) &&
    Object.values(transaction).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
  }

  return (
    <div className="overflow-hidden bg-white shadow-sm rounded-xl dark:bg-neutral-900">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Transactions</h2>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">A list of all your transactions including transaction details and status.</p>
          </div>
          <Button onClick={() => console.log('Exporting...')} className="mt-4 sm:mt-0">
            <DownloadIcon className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
        <div className="mt-4 sm:flex sm:items-center sm:justify-between">
          <Input
            type="search"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mb-4 sm:w-64 sm:mb-0"
          />
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full sm:w-auto"
          />
        </div>
        <div className="mt-6 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Name</TableHead>
                <TableHead className="w-[150px]">Merchant</TableHead>
                <TableHead className="w-[100px]">Date</TableHead>
                <TableHead className="text-right w-[100px]">Amount</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Actions</TableHead>
                <TableHead className="hidden md:table-cell w-[50px]">Select</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-neutral-800">
                  <TableCell className="font-medium">{transaction.name}</TableCell>
                  <TableCell>{transaction.merchant}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell className="text-right">{formatAmount(transaction.amount)}</TableCell>
                  <TableCell className="hidden md:table-cell">{transaction.category}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${transaction.recurring ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                      {transaction.recurring ? 'Recurring' : 'One-time'}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-8 h-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MixerHorizontalIcon className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => onViewDetails(transaction)}>
                          View details
                        </DropdownMenuItem>
                        {transaction.recurring && (
                          <DropdownMenuItem onSelect={() => onCloseAccount(transaction)}>
                            Close Account
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Checkbox />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default TransactionsTable