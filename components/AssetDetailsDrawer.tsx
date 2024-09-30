'use client'

import React from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAssets } from "@/hooks/useAssets"
import { FiDollarSign, FiTrendingUp, FiPieChart, FiCreditCard, FiUser, FiX } from 'react-icons/fi'

interface AssetDetailsDrawerProps {
  assetId: number
  isOpen: boolean
  onClose: () => void
}

const getAccountIcon = (category: string) => {
  if (category.includes('CASH') || category.includes('DEPOSIT_ACCOUNT')) {
    return <FiDollarSign className="w-12 h-12 text-blue-500" />
  } else if (category.includes('STOCKS') || category.includes('BROKERAGE_ACCOUNT')) {
    return <FiTrendingUp className="w-12 h-12 text-green-500" />
  } else if (category.includes('RETIREMENT')) {
    return <FiPieChart className="w-12 h-12 text-purple-500" />
  } else if (category.includes('LOAN')) {
    return <FiCreditCard className="w-12 h-12 text-red-500" />
  } else {
    return <FiUser className="w-12 h-12 text-gray-500" />
  }
}

const AssetDetailsDrawer: React.FC<AssetDetailsDrawerProps> = ({ assetId, isOpen, onClose }) => {
  const { assets, loading, error } = useAssets()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  const asset = assets.find(a => a.id === assetId)
  if (!asset) return <div>Asset not found</div>

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent
        className={`
          fixed inset-y-0 right-0 z-50 flex h-full w-full sm:w-[400px] flex-col border-l border-gray-200 bg-white
          transition-transform duration-300 transform
          data-[state=open]:translate-x-0
          data-[state=closed]:translate-x-full
        `}
      >
        <DrawerHeader className="flex justify-between items-center px-4 py-4 border-b border-gray-200">
          <DrawerTitle className="text-xl font-semibold">Asset Details</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <FiX className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <ScrollArea className="flex-grow px-4 py-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-gray-100 rounded-full p-3">
              {getAccountIcon(asset.asset_category)}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{asset.asset_name}</h2>
              <p className="text-sm text-gray-500">Created {new Date(asset.created_at).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="space-y-4">
            <InfoItem label="Asset ID" value={`#${asset.id}`} />
            <InfoItem label="Account Number" value={asset.account_number} />
            <InfoItem label="Financial Institution" value={asset.financial_institution} />
            <InfoItem label="Asset Location" value={asset.asset_location} />
            <InfoItem label="Asset Category" value={asset.asset_category} />
            <InfoItem label="Account Owner" value={asset.account_owner} />
            <InfoItem label="Account Plan" value={asset.account_plan} />
            <InfoItem label="Account Status" value={asset.account_status} />
            <InfoItem label="Current Value" value={`$${asset.current_value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} />
            <InfoItem label="Cost Basis" value={asset.cost_basis ? `$${asset.cost_basis.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'N/A'} />
            <InfoItem label="Attachments" value={asset.attachments.length > 0 ? asset.attachments.join(', ') : 'No attachments'} />
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}

const InfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-200">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="text-sm font-medium">{value}</span>
  </div>
)

export default AssetDetailsDrawer