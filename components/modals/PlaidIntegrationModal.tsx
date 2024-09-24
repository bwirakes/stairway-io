// components/modals/PlaidIntegrationModal.tsx

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'; // Named imports
import PlaidLinkButton from '../PlaidLinkButton'; // Default import

interface PlaidIntegrationModalProps {
  onClose: () => void;
}

const PlaidIntegrationModal: React.FC<PlaidIntegrationModalProps> = ({ onClose }) => {
  const handleSuccess = (publicToken: string) => {
    // Handle the public token, e.g., send to backend
    console.log('Public Token:', publicToken);
    onClose();
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect via Plaid</DialogTitle>
          <DialogDescription>
            Connect your financial institution securely using Plaid.
          </DialogDescription>
        </DialogHeader>
        <PlaidLinkButton onSuccess={handleSuccess} />
        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlaidIntegrationModal;
