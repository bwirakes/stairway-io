// components/modals/AddLiabilityModal.tsx
'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils'; // Ensure this utility is correctly implemented

interface AddLiabilityModalProps {
  onClose: () => void;
}

const AddLiabilityModal: React.FC<AddLiabilityModalProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    console.log('Form Data:');
    // Implement form submission logic here (e.g., API call)
    onClose();
  };

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add Liability Manually</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new Liability manually.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-6">
          {/* Liability Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Liability Category</label>
            <select
              {...register('LiabilityCategory', { required: 'Liability Category is required' })}
              className={cn(
                'mt-1 block w-full border rounded-md shadow-sm',
                errors.LiabilityCategory ? 'border-red-500' : 'border-gray-300'
              )}
            >
              <option value="">Select Category</option>
              <option>Mortgage</option>
              <option>Auto Loan</option>
              <option>Credit Card</option>
              <option>Student Debt</option>
              <option>Personal Loan</option>
              <option>Real Estate</option>
              <option>Insurance Policy</option>
              <option>Other</option>
            </select>
            {errors.LiabilityCategory && (
              <p className="mt-1 text-sm text-red-600">{errors.accountNumber?.message?.toString()}</p>
            )}
          </div>

          {/* Account Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Account Number</label>
            <input
              type="text"
              {...register('accountNumber', { required: 'Account Number is required' })}
              className={cn(
                'mt-1 block w-full border rounded-md shadow-sm',
                errors.accountNumber ? 'border-red-500' : 'border-gray-300'
              )}
            />
            {errors.accountNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.accountNumber?.message?.toString()}</p>
            )}
          </div>

          {/* Financial Institution Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Financial Institution Name</label>
            <input
              type="text"
              {...register('financialInstitutionName', { required: 'Institution Name is required' })}
              className={cn(
                'mt-1 block w-full border rounded-md shadow-sm',
                errors.financialInstitutionName ? 'border-red-500' : 'border-gray-300'
              )}
            />
            {errors.financialInstitutionName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.financialInstitutionName?.message?.toString()}
              </p>
            )}
          </div>

          {/* Liability Value */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Liability Value</label>
            <input
              type="number"
              step="0.01"
              {...register('LiabilityValue', { required: 'Liability Value is required' })}
              className={cn(
                'mt-1 block w-full border rounded-md shadow-sm',
                errors.LiabilityValue ? 'border-red-500' : 'border-gray-300'
              )}
            />
            {errors.LiabilityValue && (
              <p className="mt-1 text-sm text-red-600">{errors.LiabilityValue?.message?.toString()}</p>
            )}
          </div>

          {/* Beneficiary */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Beneficiary</label>
            <input
              type="text"
              {...register('beneficiary')}
              className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {/* Account Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Account Status</label>
            <select
              {...register('accountStatus')}
              className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm"
            >
              <option>Open</option>
              <option>Transferred</option>
              <option>Closed</option>
              <option>Pending</option>
            </select>
          </div>

          {/* Account Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Account Type</label>
            <select
              {...register('accountType')}
              className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm"
            >
              <option>Joint</option>
              <option>Single Ownership</option>
              <option>Payable/Transferable on Death</option>
              <option>Trust</option>
            </select>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-medium text-gray-800 text-md">Contact Information</h3>
            <div className="grid grid-cols-1 gap-4 mt-2 md:grid-cols-3">
              {/* Contact Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Name</label>
                <input
                  type="text"
                  {...register('contactName')}
                  className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm"
                />
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                <input
                  type="tel"
                  {...register('contactNumber')}
                  className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm"
                />
              </div>

              {/* Contact Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                <input
                  type="email"
                  {...register('contactEmail')}
                  className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Attachments */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Attachments</label>
            <input
              type="file"
              {...register('attachments')}
              multiple
              className="block w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              {...register('notes')}
              rows={4}
              className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm"
            ></textarea>
          </div>

          {/* Buttons */}
          <DialogFooter>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLiabilityModal;
