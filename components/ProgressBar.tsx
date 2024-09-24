// app/components/ProgressBar.tsx

import React from 'react';

interface ProgressBarProps {
  progress: number; // Percentage (0-100)
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full h-4 mb-6 bg-gray-200 rounded-full">
      <div
        className="h-4 transition-all duration-300 bg-blue-600 rounded-full"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      ></div>
    </div>
  );
};

export default ProgressBar;
