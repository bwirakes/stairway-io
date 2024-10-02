'use client';

import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons';
import { AssetCategory, AccountStatus, AccountPlan } from '@prisma/client';
import { toast } from '@/hooks/use-toast';

interface AddAssetModalProps {
  onClose: () => void;
  userId: number;
}

const formSchema = z.object({
  asset_name: z.string().min(1, 'Asset Name is required'),
  asset_category: z.nativeEnum(AssetCategory),
  account_number: z.string().nullable(),
  financial_institution: z.string().nullable(),
  current_value: z.string().min(1, 'Current Value is required').transform(Number),
  cost_basis: z.string().nullable().transform((value) => (value ? Number(value) : null)),
  acquisition_date: z.string().nullable().transform((value) => (value ? new Date(value) : null)),
  account_status: z.nativeEnum(AccountStatus),
  account_plan: z.nativeEnum(AccountPlan),
  user_id: z.number(),
  distributions: z.array(
    z.object({
      heir_id: z.number(),
      share: z.string().min(1, 'Share is required').transform(Number),
    })
  ).refine((data) => data.reduce((sum, item) => sum + item.share, 0) === 100, {
    message: 'Total share must equal 100%',
  }),
}).required();

type FormData = z.infer<typeof formSchema>;

interface Heir {
  id: number | string;
  first_name: string;
  last_name: string;
}

const AddAssetModal: React.FC<AddAssetModalProps> = ({ onClose, userId }) => {
  const [heirs, setHeirs] = useState<Heir[]>([]);

  useEffect(() => {
    async function fetchHeirs() {
      try {
        const response = await fetch('/api/heirs');
        if (!response.ok) {
          throw new Error('Failed to fetch heirs');
        }
        const data = await response.json();
        setHeirs(data);
      } catch (error) {
        console.error('Error fetching heirs:', error);
      }
    }
    fetchHeirs();
  }, []);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: userId,
      cost_basis: null,
      acquisition_date: null,
      distributions: [{ heir_id: 0, share: 100 }],
    },
  });

  const { fields: distributionFields, append: appendDistribution, remove: removeDistribution } = useFieldArray({
    control,
    name: 'distributions',
  });

  const onSubmit = async (data: FormData) => {
    try {
      console.log('Submitting data:', data); // Log the data being sent

      const response = await fetch('/api/assets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server response:', errorData); // Log the server's error response
        throw new Error(errorData.error || 'Failed to create asset');
      }

      const createdAsset = await response.json();
      console.log('Created asset:', createdAsset); // Log the created asset

      toast({
        title: 'Asset Created',
        description: 'Your asset has been successfully created.',
      });
      onClose();
    } catch (error) {
      console.error('Error creating asset:', error);
      toast({
        title: 'Error',
        description: 'There was an error creating your asset. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Asset Manually</DialogTitle>
          <DialogDescription>Fill in the details below to add a new asset manually.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Asset Name */}
            <div>
              <Label htmlFor="asset_name">Asset Name</Label>
              <Input
                type="text"
                id="asset_name"
                {...register('asset_name')}
                className={cn(errors.asset_name ? 'border-red-500' : 'border-gray-300')}
              />
              {errors.asset_name && <p className="mt-1 text-sm text-red-600">{errors.asset_name.message}</p>}
            </div>

            {/* Asset Category */}
            <div>
              <Label htmlFor="asset_category">Asset Category</Label>
              <Controller
                name="asset_category"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value || ''}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(AssetCategory).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.replace(/_/g, ' ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.asset_category && <p className="mt-1 text-sm text-red-600">{errors.asset_category.message}</p>}
            </div>

            {/* Account Number */}
            <div>
              <Label htmlFor="account_number">Account Number</Label>
              <Input
                type="text"
                id="account_number"
                {...register('account_number')}
                className={cn(errors.account_number ? 'border-red-500' : 'border-gray-300')}
              />
              {errors.account_number && <p className="mt-1 text-sm text-red-600">{errors.account_number.message}</p>}
            </div>

            {/* Financial Institution Name */}
            <div>
              <Label htmlFor="financial_institution">Financial Institution Name</Label>
              <Input
                type="text"
                id="financial_institution"
                {...register('financial_institution')}
                className={cn(errors.financial_institution ? 'border-red-500' : 'border-gray-300')}
              />
              {errors.financial_institution && <p className="mt-1 text-sm text-red-600">{errors.financial_institution.message}</p>}
            </div>

            {/* Asset Value */}
            <div>
              <Label htmlFor="current_value">Asset Value</Label>
              <Input
                type="number"
                id="current_value"
                step="0.01"
                {...register('current_value')}
                className={cn(errors.current_value ? 'border-red-500' : 'border-gray-300')}
              />
              {errors.current_value && <p className="mt-1 text-sm text-red-600">{errors.current_value.message}</p>}
            </div>

            {/* Cost Basis */}
            <div>
              <Label htmlFor="cost_basis">Cost Basis</Label>
              <Input
                type="number"
                id="cost_basis"
                step="0.01"
                {...register('cost_basis')}
                className={cn(errors.cost_basis ? 'border-red-500' : 'border-gray-300')}
              />
              {errors.cost_basis && <p className="mt-1 text-sm text-red-600">{errors.cost_basis.message}</p>}
            </div>

            {/* Acquisition Date */}
            <div>
              <Label htmlFor="acquisition_date">Acquisition Date</Label>
              <Input
                type="date"
                id="acquisition_date"
                {...register('acquisition_date')}
                className={cn(errors.acquisition_date ? 'border-red-500' : 'border-gray-300')}
              />
              {errors.acquisition_date && <p className="mt-1 text-sm text-red-600">{errors.acquisition_date.message}</p>}
            </div>

            {/* Account Status */}
            <div>
              <Label htmlFor="account_status">Account Status</Label>
              <Controller
                name="account_status"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value || ''}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(AccountStatus).map((status) => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.account_status && <p className="mt-1 text-sm text-red-600">{errors.account_status.message}</p>}
            </div>

            {/* Account Plan */}
            <div>
              <Label htmlFor="account_plan">Account Plan</Label>
              <Controller
                name="account_plan"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value || ''}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(AccountPlan).map((plan) => (
                        <SelectItem key={plan} value={plan}>{plan.replace(/_/g, ' ')}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.account_plan && <p className="mt-1 text-sm text-red-600">{errors.account_plan.message}</p>}
            </div>
          </div>

          {/* Distributions */}
          <div>
            <Label>Distributions</Label>
            {distributionFields.map((field, index) => (
              <div key={field.id} className="flex flex-col mt-2 space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
                <div className="w-full md:w-1/2">
                  <Controller
                    control={control}
                    name={`distributions.${index}.heir_id`}
                    render={({ field }) => (
                      <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value !== undefined ? String(field.value) : ''}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Heir" />
                        </SelectTrigger>
                        <SelectContent>
                          {heirs.map((heir: Heir) => (
                            <SelectItem key={heir.id} value={String(heir.id)}>
                              {`${heir.first_name} ${heir.last_name}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="w-full md:w-1/4">
                  <Input
                    {...register(`distributions.${index}.share` as const)}
                    type="number"
                    placeholder="Share %"
                    className="w-full"
                  />
                </div>
                <div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeDistribution(index)}
                    disabled={distributionFields.length === 1}
                    className="border-red-300 bg-red-500 hover:bg-red-600 text-white"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendDistribution({ heir_id: 0, share: 0 })}
              className="mt-2 border-2 border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-700"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Distribution
            </Button>
            {errors.distributions && <p className="mt-1 text-sm text-red-600">{errors.distributions.message}</p>}
          </div>

          {/* Hidden user_id field */}
          <input type="hidden" {...register('user_id')} />

          {/* Buttons */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAssetModal;