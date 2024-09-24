// components/UploadFileDialog.tsx
'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FiUpload } from 'react-icons/fi';

interface UploadFileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

const UploadFileDialog: React.FC<UploadFileDialogProps> = ({
  isOpen,
  onClose,
  onUpload,
}) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (file) {
      onUpload(file);
      setFile(null);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-6 bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>Upload Transactions File</DialogTitle>
          <DialogDescription>
            Upload a CSV or Excel file to import transactions.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {/* File Upload */}
          <div>
            <Label htmlFor="fileUpload">Choose File</Label>
            <Input
              id="fileUpload"
              type="file"
              accept=".csv,.xls,.xlsx"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="default"
            className="flex items-center"
            onClick={handleSubmit}
            disabled={!file}
          >
            <FiUpload className="mr-2" /> Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadFileDialog;
