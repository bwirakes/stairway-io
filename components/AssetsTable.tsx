'use client'

import React, { useState } from 'react'
import { AssetInformation } from '@prisma/client'
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
import { AccountStatus } from '@prisma/client'
import { useAssets } from '@/hooks/useAssets'
import AssetDetailsDrawer from '@/components/AssetDetailsDrawer'

const AssetsTable: React.FC = () => {
  const { assets, loading } = useAssets()
  const [selectedAsset, setSelectedAsset] = useState<AssetInformation | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const getStatusColor = (status: AccountStatus) => {
    switch (status) {
      case 'OPEN':
        return 'bg-green-100 text-green-800'
      case 'TRANSFERRED':
        return 'bg-yellow-100 text-yellow-800'
      case 'CLOSED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getAccountIcon = (category: string) => {
    if (category.includes('CASH') || category.includes('DEPOSIT_ACCOUNT')) {
      return <FiDollarSign className="w-5 h-5 text-blue-500" />
    } else if (category.includes('STOCKS') || category.includes('BROKERAGE_ACCOUNT')) {
      return <FiTrendingUp className="w-5 h-5 text-green-500" />
    } else if (category.includes('RETIREMENT')) {
      return <FiPieChart className="w-5 h-5 text-purple-500" />
    } else if (category.includes('LOAN')) {
      return <FiCreditCard className="w-5 h-5 text-red-500" />
    } else {
      return <FiUser className="w-5 h-5 text-gray-500" />
    }
  }

  const handleViewDetails = (asset: AssetInformation) => {
    setSelectedAsset(asset)
    setIsDrawerOpen(true)
  }

  if (loading) return <div>Loading...</div>
  


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
                    <TableHead>Asset Name</TableHead>
                    <TableHead>Account Number</TableHead>
                    <TableHead>Current Value</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead className="hidden md:table-cell">Plan</TableHead>
                    <TableHead className="hidden md:table-cell">Category</TableHead>
                    <TableHead className="hidden md:table-cell text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets.map((asset) => (
                    <TableRow key={asset.id} className="hover:bg-gray-50 dark:hover:bg-neutral-800">
                      <TableCell>{getAccountIcon(asset.asset_category)}</TableCell>
                      <TableCell className="font-medium">{asset.asset_name}</TableCell>
                      <TableCell>{asset.account_number}</TableCell>
                      <TableCell>${asset.current_value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                      <TableCell>
                        <span className={`hidden md:table-cell inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(asset.account_status)}`}>
                          {asset.account_status}
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{asset.account_plan.replace(/_/g, ' ')}</TableCell>
                      <TableCell className="hidden md:table-cell">{asset.asset_category.replace(/_/g, ' ')}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="w-8 h-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <DotsVerticalIcon className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onSelect={() => handleViewDetails(asset)}>
                              View details
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => console.log(`Edit ${asset.asset_name}`)}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => console.log(`Delete ${asset.asset_name}`)}>
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
      {selectedAsset && (
        <AssetDetailsDrawer
          assetId={selectedAsset.id}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      )}
    </div>
  )
}

export default AssetsTable