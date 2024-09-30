import React, { useCallback, useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';

interface PlaidLinkButtonProps {
  onSuccess: (publicToken: string) => void;
}

const PlaidLinkButton: React.FC<PlaidLinkButtonProps> = ({ onSuccess }) => {
  const [linkToken, setLinkToken] = useState<string | null>(null);

  useEffect(() => {
    const createLinkToken = async () => {
      const response = await fetch('/api/plaid/create-link-token', { method: 'POST' });
      const data = await response.json();
      setLinkToken(data.link_token);
    };
    createLinkToken();
  }, []);

  const onSuccessCallback = useCallback(
    (public_token: string) => {
      onSuccess(public_token);
    },
    [onSuccess]
  );

  const config: Parameters<typeof usePlaidLink>[0] = {
    token: linkToken!,
    onSuccess: onSuccessCallback,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <button
      onClick={() => open()}
      disabled={!ready}
      className="px-4 py-2 mt-4 text-white bg-green-600 rounded-md hover:bg-green-700"
    >
      Connect with Plaid
    </button>
  );
};

export default PlaidLinkButton;