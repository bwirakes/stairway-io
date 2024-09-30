'use client'

import React, { useState } from 'react'
import TotalAssetsCard from '@/components/TotalAssetsCard'
import AddAssetButton from '@/components/AddAssetButton'
import AssetsTable from '@/components/AssetsTable'
import PlaidIntegrationModal from '@/components/modals/PlaidIntegrationModal'

export default function AssetsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
          <TotalAssetsCard />
          <div className="flex justify-end md:col-span-3">
            <AddAssetButton />
          </div>
        </div>
        <div className="overflow-hidden bg-white shadow-sm rounded-xl">
          <AssetsTable />
        </div>
      </main>
      {isModalOpen && <PlaidIntegrationModal onClose={() => setIsModalOpen(false)} />}
    </div>
  )
}