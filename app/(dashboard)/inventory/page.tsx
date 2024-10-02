'use client';

import React, { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import AccountTable from '@/components/ui/account-table';
import HorizontalBarChart from '@/components/HorizontalBarChart';
import {
  FiTrendingUp,
  FiDollarSign,
  FiCreditCard,
  FiHome,
  FiBox,
  FiAward,
  FiShield,
  FiBriefcase,
  FiGlobe,
  FiHexagon,
  FiTruck,
  FiImage,
  FiDatabase,
  FiHeart,
  FiUsers,
  FiMap,
  FiMoreHorizontal
} from 'react-icons/fi';
import { useAssets } from 'hooks/useAssets';
import { SummaryCard } from '@/components/ui/summary-card';
import { AssetInformation, AssetCategory } from '@prisma/client';

const liabilitiesData = [
  {
    id: '1',
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
    id: '2',
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
    id: '3',
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
    id: '4',
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
    id: '5',
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

const assetCategoryMap: { [key in AssetCategory]: string } = {
  CHECKING_ACCOUNT: "Checking Account",
  SAVINGS_ACCOUNT: "Savings Account",
  CERTIFICATE_OF_DEPOSIT: "Certificate of Deposit",
  MONEY_MARKET_ACCOUNT: "Money Market Account",
  IRA: "IRA",
  ROTH_IRA: "Roth IRA",
  RETIREMENT_401K: "401K",
  ROTH_401K: "Roth 401K",
  PENSION: "Pension",
  TRUST: "Trust",
  BROKERAGE_ACCOUNT: "Brokerage Account",
  ANNUITY_NON_QUALIFIED: "Annuity Non-Qualified",
  ANNUITY_QUALIFIED: "Annuity Qualified",
  BONDS: "Bonds",
  REAL_ESTATE: "Real Estate",
  COLLECTIBLE: "Collectible",
  CRYPTOCURRENCY: "Cryptocurrency",
  LIFE_INSURANCE_POLICY: "Life Insurance Policy",
  BUSINESS: "Business",
  VEHICLE: "Vehicle",
  OTHER: "Other",
  MAPS: "Maps"
};

// Function to get the appropriate icon based on category
const getCategoryIcon = (category: AssetCategory) => {
  switch (category) {
    case AssetCategory.CHECKING_ACCOUNT:
    case AssetCategory.SAVINGS_ACCOUNT:
    case AssetCategory.MONEY_MARKET_ACCOUNT:
      return <FiDollarSign className="w-5 h-5 text-blue-500" />;
    case AssetCategory.CERTIFICATE_OF_DEPOSIT:
      return <FiAward className="w-5 h-5 text-yellow-500" />;
    case AssetCategory.IRA:
    case AssetCategory.ROTH_IRA:
    case AssetCategory.RETIREMENT_401K:
    case AssetCategory.ROTH_401K:
    case AssetCategory.PENSION:
      return <FiShield className="w-5 h-5 text-purple-500" />;
    case AssetCategory.TRUST:
      return <FiUsers className="w-5 h-5 text-indigo-500" />;
    case AssetCategory.BROKERAGE_ACCOUNT:
      return <FiTrendingUp className="w-5 h-5 text-green-500" />;
    case AssetCategory.ANNUITY_NON_QUALIFIED:
    case AssetCategory.ANNUITY_QUALIFIED:
      return <FiBox className="w-5 h-5 text-orange-500" />;
    case AssetCategory.BONDS:
      return <FiCreditCard className="w-5 h-5 text-red-500" />;
    case AssetCategory.REAL_ESTATE:
      return <FiHome className="w-5 h-5 text-teal-500" />;
    case AssetCategory.COLLECTIBLE:
      return <FiImage className="w-5 h-5 text-pink-500" />;
    case AssetCategory.CRYPTOCURRENCY:
      return <FiHexagon className="w-5 h-5 text-cyan-500" />;
    case AssetCategory.LIFE_INSURANCE_POLICY:
      return <FiHeart className="w-5 h-5 text-red-500" />;
    case AssetCategory.BUSINESS:
      return <FiBriefcase className="w-5 h-5 text-blue-700" />;
    case AssetCategory.VEHICLE:
      return <FiTruck className="w-5 h-5 text-gray-600" />;
    case AssetCategory.MAPS:
      return <FiMap className="w-5 h-5 text-green-700" />;
    case AssetCategory.OTHER:
      return <FiMoreHorizontal className="w-5 h-5 text-gray-500" />;
    default:
      return <FiGlobe className="w-5 h-5 text-gray-500" />;
  }
};

export default function EstateInventoryPage() {
  const { assets, loading, error } = useAssets();

  const assetsByCategory = useMemo(() => {
    if (!assets) return [];

    const categoryMap: { [key in AssetCategory]?: { sum: number; assets: AssetInformation[] } } = {};

    assets.forEach((asset: AssetInformation) => {
      const category = asset.asset_category;
      if (!categoryMap[category]) {
        categoryMap[category] = { sum: 0, assets: [] };
      }
      categoryMap[category]!.sum += asset.current_value;
      categoryMap[category]!.assets.push(asset);
    });

    return Object.entries(categoryMap).map(([category, { sum, assets }]) => ({
      id: category,
      logo: getCategoryIcon(category as AssetCategory),
      type: assetCategoryMap[category as AssetCategory] || category,
      value: `$${sum.toLocaleString()}`,
      children: assets.map((asset) => ({
        id: asset.id,
        name: asset.asset_name,
        value: `$${asset.current_value.toLocaleString()}`,
      })),
      isAsset: true,
    }));
  }, [assets]);

  const totalAssets = useMemo(() => {
    return assets ? assets.reduce((sum, asset) => sum + asset.current_value, 0) : 0;
  }, [assets]);


  const totalLiabilities = useMemo(() => {
    return liabilitiesData.reduce((sum, liability) => sum + parseInt(liability.value.replace(/[^0-9]/g, '')), 0);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <main className="flex flex-col items-start w-full px-6 py-6 space-y-6">
        {/* Three Summary Boxes */}
        <div className="grid w-full grid-cols-1 gap-6 max-w-7xl sm:grid-cols-3">
          <SummaryCard
            title="Estate Assets"
            value={{ amount: totalAssets, gradient: 'from-green-400 to-green-600' }}
            dropdownItems={[{ label: 'Go to Assets', href: '/assets' }]}
          />
          <SummaryCard
            title="Estate Liabilities"
            value={{ amount: totalLiabilities, gradient: 'from-red-400 to-red-600' }}
            dropdownItems={[{ label: 'Go to Liabilities', href: '/liabilities' }]}
          />
          <SummaryCard
            title="Estimated Taxes"
            value={{ amount: 50000, gradient: 'from-blue-400 to-blue-600' }}
            dropdownItems={[{ label: 'Go to Taxes', href: '/taxes' }]}
          />
        </div>

        {/* Charts Section */}
        <div className="grid w-full grid-cols-1 gap-6 max-w-7xl sm:grid-cols-2">
          {/* Asset Composition Chart */}
          <Card className="p-6 bg-white shadow-md">
            <HorizontalBarChart
              title="Asset Composition"
              data={assetsByCategory.map((category) => ({ 
                name: category.type, 
                value: parseInt(category.value.replace(/[^0-9]/g, ''))
              }))}
              colors={['#4299E1', '#48BB78', '#9F7AEA', '#ECC94B', '#F56565', '#667EEA', '#718096']}
            />
          </Card>

          {/* Liability Composition Chart */}
          <Card className="p-6 bg-white shadow-md">
            <HorizontalBarChart
              title="Liability Composition"
              data={liabilitiesData.map(liability => ({ 
                name: liability.type, 
                value: parseInt(liability.value.replace(/[^0-9]/g, '')) 
              }))}
              colors={['#F56565', '#9F7AEA', '#4299E1', '#48BB78', '#718096']}
            />
          </Card>
        </div>

        {/* Assets and Liabilities Tables */}
        <div className="grid w-full grid-cols-1 gap-6 max-w-7xl sm:grid-cols-2">
          {/* Assets Table */}
          <AccountTable title="Assets" data={assetsByCategory} />

          {/* Liabilities Table */}
          <AccountTable title="Liabilities" data={liabilitiesData} />
        </div>
      </main>
    </div>
  );
}