'use client'

import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { FiCreditCard, FiDollarSign, FiPieChart, FiTrendingUp, FiUser } from 'react-icons/fi'

interface Asset {
  id: number
  accountName: string
  accountNumber: string
  accountValue: string
  accountStatus: 'Open' | 'Pending' | 'Closed'
  accountType: string
  date: string
}

const assetsData: Asset[] = [
  {
    id: 1,
    accountName: 'Checking Account',
    accountNumber: '****1234',
    accountValue: '$10,000',
    accountStatus: 'Open',
    accountType: 'Joint',
    date: 'Aug 17, 2020',
  },
  {
    id: 2,
    accountName: 'Savings Account',
    accountNumber: '****5678',
    accountValue: '$20,000',
    accountStatus: 'Open',
    accountType: 'Single Ownership',
    date: 'Aug 18, 2020',
  },
  {
    id: 3,
    accountName: 'Investment Account',
    accountNumber: '****9012',
    accountValue: '$50,000',
    accountStatus: 'Pending',
    accountType: 'Joint',
    date: 'Aug 19, 2020',
  },
  {
    id: 4,
    accountName: 'Retirement Account',
    accountNumber: '****3456',
    accountValue: '$100,000',
    accountStatus: 'Open',
    accountType: 'Single Ownership',
    date: 'Aug 20, 2020',
  },
  {
    id: 5,
    accountName: 'Credit Card',
    accountNumber: '****7890',
    accountValue: '-$5,000',
    accountStatus: 'Closed',
    accountType: 'Joint',
    date: 'Aug 21, 2020',
  },
]

const AssetsTable: React.FC = () => {
  const getStatusColor = (status: Asset['accountStatus']) => {
    switch (status) {
      case 'Open':
        return 'bg-green-100 text-green-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Closed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getAccountIcon = (accountName: string) => {
    if (accountName.includes('Checking') || accountName.includes('Savings')) {
      return <FiDollarSign className="w-5 h-5 text-blue-500" />
    } else if (accountName.includes('Investment')) {
      return <FiTrendingUp className="w-5 h-5 text-green-500" />
    } else if (accountName.includes('Retirement')) {
      return <FiPieChart className="w-5 h-5 text-purple-500" />
    } else if (accountName.includes('Credit Card')) {
      return <FiCreditCard className="w-5 h-5 text-red-500" />
    } else {
      return <FiUser className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <div className="bg-white shadow-sm rounded-xl dark:bg-neutral-900">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Assets</h1>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">A list of all your financial assets including account details and current values.</p>
          </div>
        </div>
        <div className="flow-root mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead>Account Name</TableHead>
                    <TableHead>Account Number</TableHead>
                    <TableHead>Account Value</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Type</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assetsData.map((asset) => (
                    <TableRow key={asset.id} className="hover:bg-gray-50 dark:hover:bg-neutral-800">
                      <TableCell>{getAccountIcon(asset.accountName)}</TableCell>
                      <TableCell className="font-medium">{asset.accountName}</TableCell>
                      <TableCell>{asset.accountNumber}</TableCell>
                      <TableCell>{asset.accountValue}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(asset.accountStatus)}`}>
                          {asset.accountStatus}
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{asset.accountType}</TableCell>
                      <TableCell className="hidden md:table-cell">{asset.date}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="w-8 h-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <DotsVerticalIcon className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onSelect={() => console.log(`View ${asset.accountName}`)}>
                              View details
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => console.log(`Edit ${asset.accountName}`)}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => console.log(`Delete ${asset.accountName}`)}>
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssetsTable