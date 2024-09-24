'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import AccountTable from '@/components/ui/account-table';
import HorizontalBarChart from '@/components/HorizontalBarChart';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  FiDollarSign,
  FiHome,
  FiBriefcase,
} from 'react-icons/fi';

export default function EstateInventoryPage() {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      <main className="flex flex-col items-start w-full px-6 py-6 space-y-6">
        {/* Three Summary Boxes */}
        <div className="grid w-full grid-cols-1 gap-6 max-w-7xl sm:grid-cols-3">
          <Card className="p-6 text-left bg-white shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Estate Assets</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <DotsVerticalIcon className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={() => console.log('Go to Assets')}>
                    Go to Assets
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-green-400 to-green-600 bg-clip-text">$500,000</p>
          </Card>
          <Card className="p-6 text-left bg-white shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Estate Liabilities</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <DotsVerticalIcon className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={() => console.log('Go to Liabilities')}>
                    Go to Liabilities
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-red-400 to-red-600 bg-clip-text">$150,000</p>
          </Card>
          <Card className="p-6 text-left bg-white shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Estimated Taxes</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <DotsVerticalIcon className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={() => console.log('Go to Taxes')}>
                    Go to Taxes
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text">$50,000</p>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid w-full grid-cols-1 gap-6 max-w-7xl sm:grid-cols-2">
          {/* Asset Composition Chart */}
          <Card className="p-6 bg-white shadow-md">
            <h3 className="mb-4 text-lg font-semibold text-right">
              Asset Composition
            </h3>
            <HorizontalBarChart
              data={[
                { name: 'Real Estate', value: 250000 },
                { name: 'Investments', value: 150000 },
                { name: 'Cash', value: 100000 },
              ]}
              colors={['#4CAF50', '#2196F3', '#FFC107']}
            />
          </Card>

          {/* Liability Composition Chart */}
          <Card className="p-6 bg-white shadow-md">
            <h3 className="mb-4 text-lg font-semibold text-right">
              Liability Composition
            </h3>
            <HorizontalBarChart
              data={[
                { name: 'Mortgage', value: 100000 },
                { name: 'Credit Card', value: 30000 },
                { name: 'Personal Loans', value: 20000 },
              ]}
              colors={['#F44336', '#9C27B0', '#FF9800']}
            />
          </Card>
        </div>

        {/* Assets and Liabilities Tables */}
        <div className="grid w-full grid-cols-1 gap-6 max-w-7xl sm:grid-cols-2">
          {/* Assets Table */}
          <AccountTable title="Assets" data={assetsData} />

          {/* Liabilities Table */}
          <AccountTable title="Liabilities" data={liabilitiesData} />
        </div>
      </main>
    </div>
  );
}

// Define the data for assets and liabilities within the page or import from a separate data file
const assetsData = [
  {
    id: 1,
    logo: <FiDollarSign className="w-6 h-6 text-blue-500" />,
    type: 'Checking Accounts',
    value: '$10,000',
    children: [
      { id: 1, name: 'Citibank Checking Account', value: '$5,000' },
      { id: 2, name: 'Chase Checking Account', value: '$5,000' },
    ],
    isAsset: true,
  },
  {
    id: 2,
    logo: <FiDollarSign className="w-6 h-6 text-green-500" />,
    type: 'Savings Accounts',
    value: '$20,000',
    children: [
      { id: 3, name: 'Citibank Savings Account', value: '$10,000' },
      { id: 4, name: 'Ally Savings Account', value: '$10,000' },
    ],
    isAsset: true,
  },
  {
    id: 3,
    logo: <FiHome className="w-6 h-6 text-indigo-500" />,
    type: 'Real Estate',
    value: '$200,000',
    children: [
      { id: 5, name: 'Primary Residence', value: '$200,000' },
    ],
    isAsset: true,
  },
  {
    id: 4,
    logo: <FiBriefcase className="w-6 h-6 text-yellow-500" />,
    type: 'Investments',
    value: '$50,000',
    children: [
      { id: 6, name: 'Vanguard 401K', value: '$30,000' },
      { id: 7, name: 'Robinhood Brokerage', value: '$20,000' },
    ],
    isAsset: true,
  },
  {
    id: 5,
    logo: <FiBriefcase className="w-6 h-6 text-red-500" />,
    type: 'Insurance',
    value: '$15,000',
    children: [
      { id: 8, name: 'Life Insurance Policy', value: '$15,000' },
    ],
    isAsset: true,
  },
  {
    id: 6,
    logo: <FiBriefcase className="w-6 h-6 text-purple-500" />,
    type: 'Retirement',
    value: '$100,000',
    children: [
      { id: 9, name: 'Roth IRA', value: '$50,000' },
      { id: 10, name: 'Traditional IRA', value: '$50,000' },
    ],
    isAsset: true,
  },
  {
    id: 7,
    logo: <FiBriefcase className="w-6 h-6 text-gray-500" />,
    type: 'Others',
    value: '$5,000',
    children: [
      { id: 11, name: 'Art Collection', value: '$5,000' },
    ],
    isAsset: true,
  },
];

const liabilitiesData = [
  {
    id: 1,
    logo: <FiHome className="w-6 h-6 text-indigo-500" />,
    type: 'Mortgage',
    value: '$150,000',
    children: [
      { id: 1, name: 'Primary Residence Mortgage', value: '$150,000' },
    ],
    isAsset: false,
  },
  {
    id: 2,
    logo: <FiDollarSign className="w-6 h-6 text-red-500" />,
    type: 'Credit Card Loans',
    value: '$20,000',
    children: [
      { id: 2, name: 'Visa Credit Card', value: '$10,000' },
      { id: 3, name: 'Mastercard Credit Card', value: '$10,000' },
    ],
    isAsset: false,
  },
  {
    id: 3,
    logo: <FiBriefcase className="w-6 h-6 text-blue-500" />,
    type: 'Auto Loans',
    value: '$30,000',
    children: [
      { id: 4, name: 'Car Loan - Toyota', value: '$15,000' },
      { id: 5, name: 'Car Loan - Honda', value: '$15,000' },
    ],
    isAsset: false,
  },
  {
    id: 4,
    logo: <FiDollarSign className="w-6 h-6 text-green-500" />,
    type: 'Student Debt',
    value: '$25,000',
    children: [
      { id: 6, name: 'Federal Student Loan', value: '$25,000' },
    ],
    isAsset: false,
  },
  {
    id: 5,
    logo: <FiBriefcase className="w-6 h-6 text-gray-500" />,
    type: 'Others',
    value: '$10,000',
    children: [
      { id: 7, name: 'Personal Loan', value: '$10,000' },
    ],
    isAsset: false,
  },
];
