'use client'

import React, { useState } from 'react'
import TransactionsTable from '@/components/TransactionsTable'
import BalanceBox from '@/components/BalanceBox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import TransactionDetailsModal from '@/components/modals/TransactionDetailsModal'
import CloseAccountModal from '@/components/modals/CloseAccountModal'
import { Transaction } from '@/types/transaction'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'

const accounts = ['Citibank Checking', 'Savings Account', 'Credit Card']

const accountBalances: { [key: string]: number } = {
  'Citibank Checking': 1250.75,
  'Savings Account': 5000.0,
  'Credit Card': -300.5,
}

const initialTransactions: Transaction[] = [
  {
    id: 1,
    name: 'Subscription Payment',
    merchant: 'Netflix',
    date: '2023-09-15',
    amount: -15.99,
    category: 'Entertainment',
    recurring: true,
    transaction_id: 'TRX001',
    notes: '',
    time: '10:30 AM'
  },
  {
    id: 2,
    name: 'Salary Deposit',
    merchant: 'Company Inc.',
    date: '2023-09-30',
    amount: 2000.0,
    category: 'Income',
    recurring: true,
    transaction_id: 'TRX002',
    notes: '',
    time: '10:30 AM'
  },
  {
    id: 3,
    name: 'Grocery Shopping',
    merchant: 'Whole Foods',
    date: '2023-09-18',
    amount: -120.5,
    category: 'Groceries',
    recurring: false,
    transaction_id: 'TRX003',
    notes: '',
    time: '10:30 AM'
  },
  {
    id: 4,
    name: 'Gym Membership',
    merchant: 'Fitness Center',
    date: '2023-09-05',
    amount: -45.0,
    category: 'Health',
    recurring: true,
    transaction_id: 'TRX004',
    notes: '',
    time: '10:30 AM'
  },
  {
    id: 5,
    name: 'Electricity Bill',
    merchant: 'Utility Co.',
    date: '2023-09-12',
    amount: -75.25,
    category: 'Utilities',
    recurring: true,
    transaction_id: 'TRX005',
    notes: '',
    time: '10:30 AM'
  },
  {
    id: 6,
    name: 'Dining Out',
    merchant: 'Italian Bistro',
    date: '2023-09-20',
    amount: -60.0,
    category: 'Food',
    recurring: false,
    transaction_id: 'TRX006',
    notes: '',
    time: '10:30 AM'
  },
  {
    id: 7,
    name: 'Book Purchase',
    merchant: 'Online Bookstore',
    date: '2023-09-22',
    amount: -25.99,
    category: 'Education',
    recurring: false,
    transaction_id: 'TRX007',
    notes: '',
    time: '10:30 AM'
  },
  {
    id: 8,
    name: 'Car Payment',
    merchant: 'Auto Loans Inc.',
    date: '2023-09-10',
    amount: -300.0,
    category: 'Transportation',
    recurring: true,
    transaction_id: 'TRX008',
    notes: '',
    time: '10:30 AM'
  },
  {
    id: 9,
    name: 'Interest Earned',
    merchant: 'Bank Savings',
    date: '2023-09-28',
    amount: 15.5,
    category: 'Income',
    recurring: true,
    transaction_id: 'TRX009',
    notes: '',
    time: '10:30 AM'
  },
  {
    id: 10,
    name: 'Internet Service',
    merchant: 'ISP Provider',
    date: '2023-09-08',
    amount: -55.0,
    category: 'Utilities',
    recurring: true,
    transaction_id: 'TRX010',
    notes: '',
    time: '10:30 AM'
  },
];

export default function RecurringTransactionsPage() {
  const [transactions] = useState(initialTransactions);
  const [selectedAccount, setSelectedAccount] = useState(accounts[0])
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isCloseAccountModalOpen, setIsCloseAccountModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(transactions.length / itemsPerPage)

  const currentBalance = accountBalances[selectedAccount]

  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setIsDetailsModalOpen(true)
  }

  const handleCloseAccount = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setIsCloseAccountModalOpen(true)
  }

  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="w-full px-4 py-8 mx-auto space-y-6 max-w-7xl sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
        <div className="w-full md:w-3/4">
          <BalanceBox accountName={selectedAccount} balance={currentBalance} />
        </div>
        <div className="w-full md:w-1/4">
          <Select value={selectedAccount} onValueChange={setSelectedAccount}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Account" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((account) => (
                <SelectItem key={account} value={account}>
                  {account}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button>Add Transaction</Button>
      </div>

      <div className="overflow-hidden">
        <TransactionsTable
          transactions={paginatedTransactions}
          onViewDetails={handleViewDetails}
          onCloseAccount={handleCloseAccount}
        />
      </div>

      <div className="flex items-center justify-between">
        <Button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRightIcon className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {selectedTransaction && (
        <TransactionDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          transaction={selectedTransaction}
        />
      )}

      {selectedTransaction && (
        <CloseAccountModal
          isOpen={isCloseAccountModalOpen}
          onClose={() => setIsCloseAccountModalOpen(false)}
          transaction={selectedTransaction}
        />
      )}
    </div>
  )
}