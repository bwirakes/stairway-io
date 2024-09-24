import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface Transaction {
  id: number
  name: string
  merchant: string
  date: string
  amount: number
  category: string
  recurring: boolean
  transaction_id: string
  notes: string
  time: string
}

interface TransactionDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  transaction: Transaction
}

const TransactionDetailsModal: React.FC<TransactionDetailsModalProps> = ({ isOpen, onClose, transaction }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <span className="font-bold">Name:</span>
            <span className="col-span-3">{transaction.name}</span>
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <span className="font-bold">Merchant:</span>
            <span className="col-span-3">{transaction.merchant}</span>
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <span className="font-bold">Date:</span>
            <span className="col-span-3">{transaction.date}</span>
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <span className="font-bold">Time:</span>
            <span className="col-span-3">{transaction.time}</span>
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <span className="font-bold">Amount:</span>
            <span className="col-span-3">${transaction.amount.toFixed(2)}</span>
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <span className="font-bold">Category:</span>
            <span className="col-span-3">{transaction.category}</span>
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <span className="font-bold">Status:</span>
            <span className="col-span-3">{transaction.recurring ? 'Recurring' : 'One-time'}</span>
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <span className="font-bold">Transaction ID:</span>
            <span className="col-span-3">{transaction.transaction_id}</span>
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <span className="font-bold">Notes:</span>
            <span className="col-span-3">{transaction.notes || 'No notes'}</span>
          </div>
        </div>
        {transaction.recurring && (
          <div className="flex justify-end space-x-2">
            <Button onClick={() => console.log('Create Task to Close')}>Create Task to Close</Button>
            <Button onClick={() => console.log('Use AI to Close Account')}>Use AI to Close Account</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default TransactionDetailsModal