// components/AddTransactionDropdown.tsx
'use client';

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { FiFilePlus, FiUpload } from 'react-icons/fi';

interface AddTransactionDropdownProps {
  onManualClick: () => void;
  onUploadClick: () => void;
}

const AddTransactionDropdown: React.FC<AddTransactionDropdownProps> = ({
  onManualClick,
  onUploadClick,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="flex items-center w-full md:w-auto">
          <FiFilePlus className="mr-2" /> Add Transaction
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Add Transaction</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onManualClick}>
          <FiFilePlus className="mr-2" /> Manually
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onUploadClick}>
          <FiUpload className="mr-2" /> Upload File
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AddTransactionDropdown;
