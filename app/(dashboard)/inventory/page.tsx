'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import AccountTable from '@/components/ui/account-table';
import HorizontalBarChart from '@/components/HorizontalBarChart';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { FiDollarSign, FiHome, FiBriefcase, FiCreditCard, FiTrendingUp, FiShield, FiPieChart, FiMoreHorizontal } from 'react-icons/fi';

const assetsData = [
  {
    id: 1,
    logo: <FiDollarSign className="w-5 h-5 text-blue-500" />,
    type: 'Checking Accounts',
    value: '$10,000',
    children: [
      { id: 101, name: 'Primary Checking', value: '$7,000' },
      { id: 102, name: 'Secondary Checking', value: '$3,000' },
    ],
    isAsset: true,
  },
  {
    id: 2,
    logo: <FiDollarSign className="w-5 h-5 text-green-500" />,
    type: 'Savings Accounts',
    value: '$20,000',
    children: [
      { id: 201, name: 'Emergency Fund', value: '$15,000' },
      { id: 202, name: 'Vacation Savings', value: '$5,000' },
    ],
    isAsset: true,
  },
  {
    id: 3,
    logo: <FiHome className="w-5 h-5 text-purple-500" />,
    type: 'Real Estate',
    value: '$200,000',
    children: [
      { id: 301, name: 'Primary Residence', value: '$180,000' },
      { id: 302, name: 'Rental Property', value: '$20,000' },
    ],
    isAsset: true,
  },
  {
    id: 4,
    logo: <FiBriefcase className="w-5 h-5 text-yellow-500" />,
    type: 'Investments',
    value: '$50,000',
    children: [
      { id: 401, name: 'Stocks', value: '$30,000' },
      { id: 402, name: 'Bonds', value: '$20,000' },
    ],
    isAsset: true,
  },
  {
    id: 5,
    logo: <FiShield className="w-5 h-5 text-red-500" />,
    type: 'Insurance',
    value: '$15,000',
    children: [
      { id: 501, name: 'Life Insurance', value: '$10,000' },
      { id: 502, name: 'Health Insurance', value: '$5,000' },
    ],
    isAsset: true,
  },
  {
    id: 6,
    logo: <FiPieChart className="w-5 h-5 text-indigo-500" />,
    type: 'Retirement',
    value: '$100,000',
    children: [
      { id: 601, name: '401(k)', value: '$70,000' },
      { id: 602, name: 'IRA', value: '$30,000' },
    ],
    isAsset: true,
  },
  {
    id: 7,
    logo: <FiMoreHorizontal className="w-5 h-5 text-gray-500" />,
    type: 'Others',
    value: '$5,000',
    children: [
      { id: 701, name: 'Personal Property', value: '$3,000' },
      { id: 702, name: 'Collectibles', value: '$2,000' },
    ],
    isAsset: true,
  },
];

const liabilitiesData = [
  {
    id: 1,
    logo: <FiHome className="w-5 h-5 text-red-500" />,
    type: 'Mortgage',
    value: '$150,000',
    children: [
      { id: 101, name: 'Primary Residence Mortgage', value: '$130,000' },
      { id: 102, name: 'Rental Property Mortgage', value: '$20,000' },
    ],
    isAsset: false,
  },
  {
    id: 2,
    logo: <FiCreditCard className="w-5 h-5 text-purple-500" />,
    type: 'Credit Card Loans',
    value: '$20,000',
    children: [
      { id: 201, name: 'Credit Card A', value: '$12,000' },
      { id: 202, name: 'Credit Card B', value: '$8,000' },
    ],
    isAsset: false,
  },
  {
    id: 3,
    logo: <FiTrendingUp className="w-5 h-5 text-blue-500" />,
    type: 'Auto Loans',
    value: '$30,000',
    children: [
      { id: 301, name: 'Car Loan', value: '$25,000' },
      { id: 302, name: 'Motorcycle Loan', value: '$5,000' },
    ],
    isAsset: false,
  },
  {
    id: 4,
    logo: <FiDollarSign className="w-5 h-5 text-green-500" />,
    type: 'Student Debt',
    value: '$25,000',
    children: [
      { id: 401, name: 'Federal Student Loan', value: '$20,000' },
      { id: 402, name: 'Private Student Loan', value: '$5,000' },
    ],
    isAsset: false,
  },
  {
    id: 5,
    logo: <FiMoreHorizontal className="w-5 h-5 text-gray-500" />,
    type: 'Others',
    value: '$10,000',
    children: [
      { id: 501, name: 'Personal Loan', value: '$7,000' },
      { id: 502, name: 'Medical Debt', value: '$3,000' },
    ],
    isAsset: false,
  },
];

export default function EstateInventoryPage() {
  const totalAssets = assetsData.reduce((sum, asset) => sum + parseInt(asset.value.replace(/[^0-9]/g, '')), 0);
  const totalLiabilities = liabilitiesData.reduce((sum, liability) => sum + parseInt(liability.value.replace(/[^0-9]/g, '')), 0);

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
            <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-green-400 to-green-600 bg-clip-text">${totalAssets.toLocaleString()}</p>
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
            <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-red-400 to-red-600 bg-clip-text">${totalLiabilities.toLocaleString()}</p>
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
            <HorizontalBarChart
              title="Asset Composition"
              data={assetsData.map(asset => ({ name: asset.type, value: parseInt(asset.value.replace(/[^0-9]/g, '')) }))}
              colors={['#4299E1', '#48BB78', '#9F7AEA', '#ECC94B', '#F56565', '#667EEA', '#718096']}
            />
          </Card>

          {/* Liability Composition Chart */}
          <Card className="p-6 bg-white shadow-md">
            <HorizontalBarChart
              title="Liability Composition"
              data={liabilitiesData.map(liability => ({ name: liability.type, value: parseInt(liability.value.replace(/[^0-9]/g, '')) }))}
              colors={['#F56565', '#9F7AEA', '#4299E1', '#48BB78', '#718096']}
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