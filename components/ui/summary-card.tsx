// components/ui/SummaryCard.tsx
'use client';

import React from 'react';
import { Card } from '@/components/ui/card';

interface SummaryCardProps {
  title: string;
  value: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value }) => {
  return (
    <Card className="p-6 text-left shadow-md">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl">{value}</p>
    </Card>
  );
};

export default SummaryCard;
