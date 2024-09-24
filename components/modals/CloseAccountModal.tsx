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
}

interface CloseAccountModalProps {
  isOpen: boolean
  onClose: () => void
  transaction: Transaction
}

const CloseAccountModal: React.FC<CloseAccountModalProps> = ({ isOpen, onClose, transaction }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Close Recurring Transaction</DialogTitle>
        </DialogHeader>
        <p className="py-4">How would you like to close the recurring transaction for {transaction.name}?</p>
        <div className="flex justify-end space-x-2">
          <Button onClick={() => console.log('Create Task')}>Create Task</Button>
          <Button onClick={() => console.log('Close with AI Help')}>Close with AI Help</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CloseAccountModal