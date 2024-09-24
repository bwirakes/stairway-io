// components/CategoryIcon.tsx
'use client';

import React from 'react';
import {
  FiDollarSign,
  FiShoppingCart,
  FiHome,
  FiHeart,
  FiBriefcase,
} from 'react-icons/fi';

interface CategoryIconProps {
  category: string;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ category }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Income':
        return <FiDollarSign className="w-5 h-5 text-green-500" />;
      case 'Groceries':
        return <FiShoppingCart className="w-5 h-5 text-yellow-500" />;
      case 'Utilities':
        return <FiHome className="w-5 h-5 text-indigo-500" />;
      case 'Health':
        return <FiHeart className="w-5 h-5 text-red-500" />;
      case 'Transportation':
        return <FiBriefcase className="w-5 h-5 text-blue-500" />;
      // Add more cases as needed
      default:
        return <FiDollarSign className="w-5 h-5 text-gray-500" />;
    }
  };

  return <>{getCategoryIcon(category)}</>;
};

export default CategoryIcon;
