// components/AIResponseBox.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface AIResponseBoxProps {
  response: string;
}

export default function AIResponseBox({ response }: AIResponseBoxProps) {
  const [showAutoClose, setShowAutoClose] = React.useState(false);

  // Function to handle showing the auto-close option
  const handleShowAutoClose = () => {
    setShowAutoClose(true);
  };

  // Function to handle confirming auto-close
  const handleConfirmAutoClose = () => {
    // Implement auto-close logic here
    alert('Auto Close process initiated.');
  };

  return (
    <div className="mb-4">
      <div className="p-4 bg-gray-100 rounded-lg shadow">
        {/* Parse response for markdown-like syntax */}
        {response.split('\n\n').map((section, idx) => {
          if (section.startsWith('**') && section.endsWith('**')) {
            return (
              <h3 key={idx} className="mb-2 text-lg font-semibold text-gray-800">
                {section.replace(/\*\*/g, '')}
              </h3>
            );
          } else if (section.includes(':')) {
            const parts = section.split(':');
            return (
              <p key={idx} className="mb-1 text-sm text-gray-700">
                <span className="font-medium">{parts[0]}:</span> {parts[1]}
              </p>
            );
          } else {
            return (
              <p key={idx} className="mb-1 text-sm text-gray-700">
                {section}
              </p>
            );
          }
        })}

        {/* Auto Close Button */}
        {!showAutoClose && response.includes('Auto Close with AI') && (
          <Button
            variant="secondary"
            size="sm"
            className="mt-2"
            onClick={handleShowAutoClose}
          >
            Auto Close with AI
          </Button>
        )}

        {/* Auto Close Confirmation */}
        {showAutoClose && (
          <div className="mt-2">
            <p className="text-sm text-gray-700">
              Your request to auto-close the account has been initiated.
            </p>
            <Button
              variant="success"
              size="sm"
              className="mt-1"
              onClick={handleConfirmAutoClose}
            >
              Confirm
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
