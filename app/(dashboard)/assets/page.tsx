'use client'

import React from 'react'
import TotalAssetsCard from '@/components/TotalAssetsCard'
import AddAssetButton from '@/components/AddAssetButton'
import AssetsTable from '@/components/AssetsTable'

export default function AssetsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
          <TotalAssetsCard />
          {/* You can add more summary cards here */}
          <div className="flex justify-end md:col-span-3">
            <AddAssetButton />
          </div>
        </div>
        <div className="overflow-hidden bg-white shadow-sm rounded-xl">
          <AssetsTable />
        </div>
      </main>
    </div>
  )
}