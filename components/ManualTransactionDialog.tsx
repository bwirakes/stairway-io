// components/ManualTransactionDialog.tsx
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FiPlus } from 'react-icons/fi';

interface ManualTransactionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (transaction: TransactionInput) => void;
}

interface TransactionInput {
  id:number;
  name: string;
  date: string;
  time: string;
  merchant: string;
  category: string;
  recurring: boolean;
  notes: string;
  amount: number;
}

const categories = [
  'Income',
  'Groceries',
  'Utilities',
  'Health',
  'Transportation',
  'Entertainment',
  'Education',
  'Food',
  'Other',
];

const ManualTransactionDialog: React.FC<ManualTransactionDialogProps> = ({
  isOpen,
  onClose,
  onAddTransaction,
}) => {
  const [manualTransaction, setManualTransaction] = useState<TransactionInput>({
    id: 0,
    name: '',
    date: '',
    time: '',
    merchant: '',
    category: '',
    recurring: false,
    notes: '',
    amount: 0,
  });

  const handleSubmit = () => {
    // Validate inputs here if necessary
    onAddTransaction(manualTransaction);
    // Reset form
    setManualTransaction({
        id: 0,
      name: '',
      date: '',
      time: '',
      merchant: '',
      category: '',
      recurring: false,
      notes: '',
      amount: 0,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-6 bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>Add Transaction Manually</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new transaction.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="name">Transaction Name</Label>
            <Input
              id="name"
              value={manualTransaction.name}
              onChange={(e) =>
                setManualTransaction({
                  ...manualTransaction,
                  name: e.target.value,
                })
              }
            />
          </div>
          {/* Date and Time */}
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <div className="flex-1">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={manualTransaction.date}
                onChange={(e) =>
                  setManualTransaction({
                    ...manualTransaction,
                    date: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={manualTransaction.time}
                onChange={(e) =>
                  setManualTransaction({
                    ...manualTransaction,
                    time: e.target.value,
                  })
                }
              />
            </div>
          </div>
          {/* Merchant */}
          <div>
            <Label htmlFor="merchant">Merchant</Label>
            <Input
              id="merchant"
              value={manualTransaction.merchant}
              onChange={(e) =>
                setManualTransaction({
                  ...manualTransaction,
                  merchant: e.target.value,
                })
              }
            />
          </div>
          {/* Category */}
          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={manualTransaction.category}
              onValueChange={(value) =>
                setManualTransaction({ ...manualTransaction, category: value })
              }
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Recurring */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="recurring"
              checked={manualTransaction.recurring}
              onChange={(e) =>
                setManualTransaction({
                  ...manualTransaction,
                  recurring: e.target.checked,
                })
              }
              className="w-4 h-4"
            />
            <Label htmlFor="recurring">Recurring Transaction</Label>
          </div>
          {/* Amount */}
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={manualTransaction.amount}
              onChange={(e) =>
                setManualTransaction({
                  ...manualTransaction,
                  amount: parseFloat(e.target.value),
                })
              }
            />
          </div>
          {/* Notes */}
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={manualTransaction.notes}
              onChange={(e) =>
                setManualTransaction({
                  ...manualTransaction,
                  notes: e.target.value,
                })
              }
            />
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="flex items-center"
            variant="default"
            onClick={handleSubmit}
            disabled={!manualTransaction.name || !manualTransaction.amount || !manualTransaction.date}
          >
            <FiPlus className="mr-2" /> Add Transaction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManualTransactionDialog;
