// components/ui/PieChart.tsx
'use client';

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const PieChart: React.FC = () => {
  const data = {
    labels: ['Assets', 'Liabilities', 'Taxes'],
    datasets: [
      {
        label: '# of Votes',
        data: [500000, 150000, 50000],
        backgroundColor: [
          'rgba(34, 197, 94, 0.6)',   // Green for Assets
          'rgba(239, 68, 68, 0.6)',   // Red for Liabilities
          'rgba(59, 130, 246, 0.6)',  // Blue for Taxes
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(59, 130, 246, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;
