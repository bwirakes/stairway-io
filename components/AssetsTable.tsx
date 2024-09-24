'use client'

import React, { useState, useMemo } from 'react'
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
import { Input } from '@/components/ui/input'
import { DotsVerticalIcon, ChevronUpIcon, ChevronDownIcon, DownloadIcon } from '@radix-ui/react-icons'

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
  const [sortColumn, setSortColumn] = useState<keyof Asset>('accountName')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [searchTerm, setSearchTerm] = useState('')

  const sortedAssets = useMemo(() => {
    return [...assetsData].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }, [sortColumn, sortDirection])

  const filteredAssets = useMemo(() => {
    return sortedAssets.filter(asset =>
      Object.values(asset).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [sortedAssets, searchTerm])

  const handleSort = (column: keyof Asset) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const handleExport = () => {
    // Implement export functionality here
    console.log('Exporting assets...')
  }

  const renderSortIcon = (column: keyof Asset) => {
    if (column !== sortColumn) return null
    return sortDirection === 'asc' ? <ChevronUpIcon className="w-4 h-4 ml-1" /> : <ChevronDownIcon className="w-4 h-4 ml-1" />
  }

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

  return (
    <div className="overflow-hidden bg-white shadow-sm rounded-xl dark:bg-neutral-900">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Assets</h1>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">A list of all your financial assets including account details and current values.</p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Button onClick={handleExport} className="inline-flex items-center">
              <DownloadIcon className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <Input
            type="search"
            placeholder="Search assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="mt-6 overflow-hidden border border-gray-200 dark:border-gray-700 sm:rounded-lg">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead onClick={() => handleSort('accountName')} className="cursor-pointer">
                    Account Name {renderSortIcon('accountName')}
                  </TableHead>
                  <TableHead onClick={() => handleSort('accountNumber')} className="cursor-pointer">
                    Account Number {renderSortIcon('accountNumber')}
                  </TableHead>
                  <TableHead onClick={() => handleSort('accountValue')} className="cursor-pointer">
                    Account Value {renderSortIcon('accountValue')}
                  </TableHead>
                  <TableHead onClick={() => handleSort('accountStatus')} className="cursor-pointer">
                    Status {renderSortIcon('accountStatus')}
                  </TableHead>
                  <TableHead onClick={() => handleSort('accountType')} className="hidden cursor-pointer md:table-cell">
                    Type {renderSortIcon('accountType')}
                  </TableHead>
                  <TableHead onClick={() => handleSort('date')} className="hidden cursor-pointer md:table-cell">
                    Date {renderSortIcon('date')}
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.map((asset) => (
                  <TableRow key={asset.id} className="hover:bg-gray-50 dark:hover:bg-neutral-800">
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
  )
}

export default AssetsTable