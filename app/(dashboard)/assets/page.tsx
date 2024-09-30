'use client'

import React from 'react'
import TotalAssetsCard from '@/components/TotalAssetsCard'
import AddAssetButton from '@/components/AddAssetButton'
import AssetsTable from '@/components/AssetsTable'
import PlaidIntegrationModal from '@/components/modals/PlaidIntegrationModal'
import { useAssets } from '@/hooks/useAssets'

export default function AssetsPage() {
  const { assets, loading, error } = useAssets()
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  // Calculate total assets by summing up the current_value of all assets
  const totalAssets = assets.reduce((sum, asset) => sum + asset.current_value, 0)

  if (loading) {
    return <div className="w-full min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (error) {
    return <div className="w-full min-h-screen flex items-center justify-center text-red-500">Error: {error.message}</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container px-4 py-8 mx-auto">
        <div className="w-full gap-6 mb-6 md:grid-cols-3">
        <TotalAssetsCard totalAssets={totalAssets} />
        </div>

        <div className="flex justify-end md:col-span-3">
            <AddAssetButton />
          </div>
          
        <div className="overflow-hidden bg-white shadow-sm rounded-xl mt-6"> {/* Added mt-6 for margin-top */}
          <AssetsTable />
        </div>
      </main>
      {isModalOpen && <PlaidIntegrationModal onClose={() => setIsModalOpen(false)} />}
    </div>
  )
}