// components/Pagination.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}) => {
  return (
    <div className="flex flex-col items-center justify-between mt-4 space-y-4 md:flex-row">
      <Button variant="outline" onClick={onPrevious} disabled={currentPage === 1}>
        Previous
      </Button>
      <span className="text-sm text-gray-700">
        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
      </span>
      <Button variant="outline" onClick={onNext} disabled={currentPage === totalPages}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
