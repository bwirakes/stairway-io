"use client"

import { useState, useEffect } from 'react'
import { HeirsTable } from "@/components/HeirsTable"
import { AddHeirModal } from "@/components/modals/AddHierModal"
import { Heir } from "@/types"
import { toast } from "hooks/use-toast"
import { Card } from '@/components/ui/card'
import { SummaryCard } from '@/components/ui/summary-card'
import { FiUsers } from 'react-icons/fi'

interface ValueType {
    amount: number;
    gradient: string;
    suffix?: string; // Add suffix as an optional property
}

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
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        toast({
          title: "Error",
          description: "Failed to fetch data. Please try again later.",
          variant: "destructive",
        });
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
      <main className="flex flex-col items-start w-full px-6 py-6 space-y-6">
        <h1 className="text-2xl font-bold">Heirs</h1>

        {/* Summary Cards */}
        <div className="grid w-full grid-cols-1 gap-6 max-w-7xl sm:grid-cols-3">
          <SummaryCard
            title="Total Heirs"
            value={{ amount: heirs.length, gradient: 'from-blue-400 to-blue-600' }}
            dropdownItems={[]} // Provide an empty array or appropriate items
          />
          <SummaryCard
            title="Total Allocation"
            value={{ amount: 100, gradient: 'from-green-400 to-green-600' }}
            dropdownItems={[]} 
          />
          <SummaryCard
            title="Unallocated"
            value={{ amount: 0, gradient: 'from-yellow-400 to-yellow-600' }}
            dropdownItems={[]} 
          />
        </div>

        {/* Add Heir Button */}
        <div className="w-full max-w-7xl">
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