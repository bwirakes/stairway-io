'use client';

import React, { useState } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { ChevronDownIcon, PlusCircledIcon } from "@radix-ui/react-icons"
import AddLiabilityModal from '@/components/modals/AddLiabilityModal';
import PlaidIntegrationModal from '@/components/modals/PlaidIntegrationModal';
import FileUploadModal from '@/components/modals/FileUploadModal';

const AddLiabilityButton: React.FC = () => {
  const [isAddLiabilityOpen, setIsAddLiabilityOpen] = useState(false);
  const [isPlaidOpen, setIsPlaidOpen] = useState(false);
  const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="inline-flex items-center justify-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none">
            <PlusCircledIcon className="w-5 h-5 mr-2" />
            Add Liability
            <ChevronDownIcon className="w-5 h-5 ml-2" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-50 w-56 bg-white rounded-md shadow-lg">
          <DropdownMenuItem onSelect={() => setIsAddLiabilityOpen(true)}>
            Add Liability Manually
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsPlaidOpen(true)}>
            Connect via Online Connection
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsFileUploadOpen(true)}>
            Upload via File
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modals */}
      {isAddLiabilityOpen && <AddLiabilityModal onClose={() => setIsAddLiabilityOpen(false)} />}
      {isPlaidOpen && <PlaidIntegrationModal onClose={() => setIsPlaidOpen(false)} />}
      {isFileUploadOpen && <FileUploadModal onClose={() => setIsFileUploadOpen(false)} />}
    </>
  );
};

export default AddLiabilityButton;
