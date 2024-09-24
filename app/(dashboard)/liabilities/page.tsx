'use client';

import React from 'react';
import TotalLiabilitiesCard from '@/components/TotalLiabilitiesCard';
import AddLiabilityButton from '@/components/AddLiabilityButton';
import LiabilitiesTable from '@/components/LiabilitiesTable';

export default function LiabilitiesPage() {
  return (
    <div className="w-full min-h-screen bg-gray-100">

      <main className="container px-4 py-6 mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <TotalLiabilitiesCard />
          {/* You can add more summary cards here */}
          <div className="flex justify-end md:col-span-3">
            <AddLiabilityButton />
          </div>
        </div>
        <div className="mt-6">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">Liabilities</h2>
          <LiabilitiesTable />
        </div>
      </main>
    </div>
  );
};

