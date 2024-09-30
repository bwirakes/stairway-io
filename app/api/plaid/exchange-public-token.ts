// pages/api/plaid/exchange-public-token.ts
// 39:19  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
/*import type { NextApiRequest, NextApiResponse } from 'next';
import { plaidClient } from '@/lib/plaidclient';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { public_token } = req.body;

  if (!public_token) {
    return res.status(400).json({ error: 'public_token is required' });
  }

  try {
    const exchangeResponse = await plaidClient.itemPublicTokenExchange({ public_token });
    const accessToken = exchangeResponse.data.access_token;
    const itemId = exchangeResponse.data.item_id;

    // For demo, using the same static user
    const userId = 'demo-user-id';

    // Update the user with the access token and item ID
    await prisma.user.update({
      where: { id: userId },
      data: {
        accessToken,
        itemId,
      },
    });

    res.status(200).json({ accessToken, itemId });
  } catch (error: any) {
    if (error.response) {
      // Plaid API returned an error
      console.error('Plaid API Error:', JSON.stringify(error.response.data, null, 2));
      res.status(500).json({ error: error.response.data });
    } else {
      // Other errors (network issues, etc.)
      console.error('Error exchanging public token:', error.message);
      res.status(500).json({ error: 'Unable to exchange public token' });
    }
  }
}

*/