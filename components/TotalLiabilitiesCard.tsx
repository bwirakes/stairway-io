// components/TotalLiabilitiesCard.tsx
import React from 'react';
import { FiDollarSign } from 'react-icons/fi';

const TotalLiabilitiesCard: React.FC = () => {
  // Placeholder for dynamic data
  const totalLiabilities = "-$234,567";

  return (
    <div className="flex items-center p-6 bg-white rounded-lg shadow-md">
      <div className="p-3 bg-blue-100 rounded-full">
        <FiDollarSign className="w-6 h-6 text-blue-600" />
      </div>
      <div className="ml-4">
        <h3 className="text-sm font-medium text-gray-500">Total Liabilities</h3>
        <p className="mt-1 text-3xl font-semibold text-gray-900">{totalLiabilities}</p>
      </div>
    </div>
  );
};

export default TotalLiabilitiesCard;
