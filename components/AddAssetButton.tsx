'use client';

import React, { useState } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { ChevronDownIcon, PlusCircledIcon } from "@radix-ui/react-icons"
import AddAssetModal from '@/components/modals/AddAssetModal';
import PlaidIntegrationModal from '@/components/modals/PlaidIntegrationModal';
import FileUploadModal from '@/components/modals/FileUploadModal';

const AddAssetButton: React.FC = () => {
  const [isAddAssetOpen, setIsAddAssetOpen] = useState(false);
  const [isPlaidOpen, setIsPlaidOpen] = useState(false);
  const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="inline-flex items-center justify-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none">
            <PlusCircledIcon className="w-5 h-5 mr-2" />
            Add Asset
            <ChevronDownIcon className="w-5 h-5 ml-2" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-50 w-56 bg-white rounded-md shadow-lg">
          <DropdownMenuItem onSelect={() => setIsAddAssetOpen(true)}>
            Add Asset Manually
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
      {isAddAssetOpen && <AddAssetModal onClose={() => setIsAddAssetOpen(false)} />}
      {isPlaidOpen && <PlaidIntegrationModal onClose={() => setIsPlaidOpen(false)} />}
      {isFileUploadOpen && <FileUploadModal onClose={() => setIsFileUploadOpen(false)} />}
    </>
  );
};

export default AddAssetButton;
