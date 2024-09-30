'use client';

import { useState, useEffect } from 'react';
import { AssetInformation, AssetCategory, AccountStatus, AccountPlan } from '@prisma/client';

type CreateAssetInput = Omit<AssetInformation, 'id' | 'created_at' | 'updated_at'> & {
  asset_name: string;
  asset_category: AssetCategory;
  account_number: string | null;
  financial_institution: string | null;
  account_owner: string | null;
  current_value: number;
  account_id: string | null;
  distribution_id: number | null;
  is_probate: boolean;
  sold: boolean;
  cost_basis: number | null;
  task_id: number | null;
  asset_location: string | null;
  user_id: number;
  asset_contact_name: string | null;
  asset_contact_number: string | null;
  asset_contact_email: string | null;
  attachments: string[];
  notes: string | null;
  account_status: AccountStatus;
  account_plan: AccountPlan;
  beneficiaries: { name: string; share: number }[];
};

export function useAssets() {
  const [assets, setAssets] = useState<AssetInformation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await fetch('/api/assets');
      if (!response.ok) {
        throw new Error('Failed to fetch assets');
      }
      const data: AssetInformation[] = await response.json();
      setAssets(data);
      setLoading(false);
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  };

  const createAsset = async (newAsset: CreateAssetInput) => {
    try {
      const response = await fetch('/api/assets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAsset),
      });
      if (!response.ok) {
        throw new Error('Failed to create asset');
      }
      const createdAsset: AssetInformation = await response.json();
      setAssets([...assets, createdAsset]);
      return createdAsset;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return { assets, loading, error, fetchAssets, createAsset };
}