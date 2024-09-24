// components/ProgressBar.tsx
'use client';

import React from 'react';
import { Progress } from '@/components/ui/progress'; // Ensure shadcn/ui's Progress is correctly implemented
import { Label } from '@/components/ui/label';
import clsx from 'clsx';

interface ProgressBarProps {
  title: string;
  percentage: number;
}

export default function ProgressBarComponent({ title, percentage }: ProgressBarProps) {
  return (
    <div>
      <Label className="mb-2">{title}</Label>
      <Progress
        value={percentage}
        className={clsx(
          'h-4 rounded-full',
          percentage >= 100 ? 'bg-green-600' : 'bg-blue-600'
        )}
      />
      <span className="block mt-1 text-sm text-gray-700">{percentage}% Complete</span>
    </div>
  );
}
