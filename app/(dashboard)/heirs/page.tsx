"use client"

import { useState, useEffect } from 'react'
import { HeirsTable } from "@/components/HeirsTable"
import { AddHeirModal } from "@/components/modals/AddHierModal"
import { Heir } from "@/types"
import { SummaryCard } from '@/components/ui/summary-card'


async function getHeirs(): Promise<Heir[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/heirs`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch heirs');
  }
  return res.json();
}

export default function HeirsPage() {
  const [heirs, setHeirs] = useState<Heir[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const heirsData = await getHeirs();
        setHeirs(heirsData);
      } catch {
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredHeirs = heirs.filter(heir =>
    heir.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    heir.last_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddHeir = (newHeir: Heir) => {
    setHeirs([...heirs, newHeir]);
  };

  const handleEditHeir = (heir: Heir) => {
    // Implement edit functionality
    console.log('Edit heir:', heir);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <main className="container px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <h1 className="mb-6 text-2xl font-bold">Heirs</h1>

        {/* Summary Cards */}
        <div className="grid w-full grid-cols-1 gap-6 mb-6 sm:grid-cols-3">
          <SummaryCard
            title="Total Heirs"
            value={{ amount: heirs.length, gradient: 'from-blue-400 to-blue-600' }}
            dropdownItems={[]}
          />
          <SummaryCard
            title="Total Allocation"
            value={{ amount: 100, gradient: 'from-green-400 to-green-600'}}
            dropdownItems={[]}
          />
          <SummaryCard
            title="Unallocated"
            value={{ amount: 0, gradient: 'from-yellow-400 to-yellow-600' }}
            dropdownItems={[]}
          />
        </div>

        {/* Add Heir Button */}
        <div className="mb-6">
          <AddHeirModal onAddHeir={handleAddHeir} />
        </div>

        {/* Heirs Table */}
        <HeirsTable
          heirs={filteredHeirs}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onEdit={handleEditHeir}
        />
      </main>
    </div>
  )
}