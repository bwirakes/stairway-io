// pages/api/plaid/create-link-token.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { plaidClient } from '@/lib/plaidclient';
import { Products, CountryCode } from 'plaid';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // For demo purposes, we'll use a static user. In a real app, associate with authenticated user.
    const userId = 'demo-user-id';

    // Check if the user exists; if not, create one
    let user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: userId,
          email: 'demo@example.com', // Static email for demo
        },
      });
    }


    const response = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: 'test',
      },
      client_name: 'Personal Finance App',
      products: [Products.Transactions] as Products[],
      country_codes: ['US'] as CountryCode[],
      language: 'en',
      transactions: {
        days_requested: 730,
      },
      // Optional fields
      // webhook: 'https://yourapp.com/webhook',
      // redirect_uri: 'https://yourapp.com/link/callback',
    });

    res.status(200).json(response.data);
  } catch (error: any) {
    if (error.response) {
      console.error('Plaid API Error:', JSON.stringify(error.response.data, null, 2));
      res.status(500).json({ error: error.response.data });
    } else {
      console.error('Error creating link token:', error.message);
      res.status(500).json({ error: 'Unable to create link token' });
    }
  }
}
