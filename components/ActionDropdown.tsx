// components/ActionDropdown.tsx
'use client';

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FiMoreVertical } from 'react-icons/fi';

interface ActionDropdownProps {
  onTransactionDetails: () => void;
  onCloseAccount: () => void;
  onManageAccount: () => void;
}

const ActionDropdown: React.FC<ActionDropdownProps> = ({
  onTransactionDetails,
  onCloseAccount,
  onManageAccount,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
          <FiMoreVertical className="w-5 h-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={onTransactionDetails}>
          Transaction Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onCloseAccount}>
          Close Account
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onManageAccount}>
          Manage Account
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionDropdown;
