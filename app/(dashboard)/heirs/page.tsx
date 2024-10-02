'use client'

import { Suspense } from 'react'
import HeirCard from '@/components/HeirCard'
import CreateHeirModal from '@/components/modals/CreateHeirModal'

export default function HeirsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Heirs</h1>
        <CreateHeirModal />
      </div>
      <Suspense fallback={<div>Loading heirs...</div>}>
     <HeirCard />
      </Suspense>
    </div>
  )
}