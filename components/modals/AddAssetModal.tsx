'use client';


import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
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
  account_owner: z.string().nullable(),
  current_value: z.string().min(1, 'Current Value is required').transform(Number),
  account_id: z.string().nullable(),
  distribution_id: z.number().nullable(),
  is_probate: z.boolean().default(false),
  sold: z.boolean().default(false),
  cost_basis: z.number().nullable(),
  task_id: z.number().nullable(),
  asset_location: z.string().nullable(),
  user_id: z.number(),
  asset_contact_name: z.string().nullable(),
  asset_contact_number: z.string().nullable(),
  asset_contact_email: z.string().email('Invalid email').nullable(),
  attachments: z.array(z.string()),
  notes: z.string().nullable(),
  account_status: z.nativeEnum(AccountStatus),
  account_plan: z.nativeEnum(AccountPlan),
  beneficiaries: z.array(z.object({
    name: z.string().min(1, 'Beneficiary Name is required'),
    share: z.string().min(1, 'Share is required').transform(Number),
  })).refine((data) => data.reduce((sum, item) => sum + item.share, 0) === 100, {
    message: "Total share must equal 100%",
  }),
});

type FormData = z.infer<typeof formSchema>;

const AddAssetModal: React.FC<AddAssetModalProps> = ({ onClose, userId }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      beneficiaries: [{ name: '', share: 100 }],
      is_probate: false,
      sold: false,
      user_id: userId,
      cost_basis: 0,
      attachments: [],
      notes: '',
      asset_contact_name: '',
      asset_contact_number: '',
      asset_contact_email: '',
      account_id: '',
      distribution_id: 0,
      task_id: 0,
      asset_location: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'beneficiaries',
  });

  const onSubmit = async (data: FormData) => {
    console.log('Form submitted with data:', data); 
    try {
      const assetData = {
        ...data,
        current_value: Number(data.current_value),
        beneficiaries: data.beneficiaries.map(b => ({ ...b, share: Number(b.share) })),
      };

      console.log('Sending asset data to API:', assetData); 

      const response = await fetch('/api/assets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assetData),
      });

      console.log('API response:', response); 

      if (!response.ok) {
        throw new Error('Failed to create asset');
      }

      toast({
        title: "Asset Created",
        description: "Your asset has been successfully created.",
      });
      onClose();
    } catch (error) {
      console.error('Error creating asset:', error);
      toast({
        title: "Error",
        description: "There was an error creating your asset. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Asset Manually</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new asset manually.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {/* Asset Name */}
            <div>
              <Label htmlFor="asset_name">Asset Name</Label>
              <Input
                type="text"
                id="asset_name"
                {...register('asset_name')}
                className={cn(
                  errors.asset_name ? 'border-red-500' : 'border-gray-300'
                )}
              />
              {errors.asset_name && (
                <p className="mt-1 text-sm text-red-600">{errors.asset_name.message}</p>
              )}
            </div>

            {/* Asset Category */}
            <div>
              <Label htmlFor="asset_category">Asset Category</Label>
              <Controller
                name="asset_category"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
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
              {errors.asset_category && (
                <p className="mt-1 text-sm text-red-600">{errors.asset_category.message}</p>
              )}
            </div>

            {/* Account Number */}
            <div>
              <Label htmlFor="account_number">Account Number</Label>
              <Input
                type="text"
                id="account_number"
                {...register('account_number')}
                className={cn(
                  errors.account_number ? 'border-red-500' : 'border-gray-300'
                )}
              />
              {errors.account_number && (
                <p className="mt-1 text-sm text-red-600">{errors.account_number.message}</p>
              )}
            </div>

            {/* Financial Institution Name */}
            <div>
              <Label htmlFor="financial_institution">Financial Institution Name</Label>
              <Input
                type="text"
                id="financial_institution"
                {...register('financial_institution')}
                className={cn(
                  errors.financial_institution ? 'border-red-500' : 'border-gray-300'
                )}
              />
              {errors.financial_institution && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.financial_institution.message}
                </p>
              )}
            </div>

            {/* Asset Value */}
            <div>
              <Label htmlFor="current_value">Asset Value</Label>
              <Input
                type="number"
                id="current_value"
                step="0.01"
                {...register('current_value')}
                className={cn(
                  errors.current_value ? 'border-red-500' : 'border-gray-300'
                )}
              />
              {errors.current_value && (
                <p className="mt-1 text-sm text-red-600">{errors.current_value.message}</p>
              )}
            </div>

            {/* Account Status */}
            <div>
              <Label htmlFor="account_status">Account Status</Label>
              <Controller
                name="account_status"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(AccountStatus).map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.account_status && (
                <p className="mt-1 text-sm text-red-600">{errors.account_status.message}</p>
              )}
            </div>

            {/* Account Plan */}
            <div>
              <Label htmlFor="account_plan">Account Plan</Label>
              <Controller
                name="account_plan"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(AccountPlan).map((plan) => (
                        <SelectItem key={plan} value={plan}>
                          {plan.replace(/_/g, ' ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.account_plan && (
                <p className="mt-1 text-sm text-red-600">{errors.account_plan.message}</p>
              )}
            </div>
          </div>

          {/* Beneficiaries */}
          <div>
            <Label>Beneficiaries</Label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center mt-2 space-x-2">
                <Input
                  {...register(`beneficiaries.${index}.name` as const)}
                  placeholder="Beneficiary Name"
                  className="flex-grow"
                />
                <Input
                  {...register(`beneficiaries.${index}.share` as const)}
                  type="number"
                  placeholder="Share %"
                  className="w-24"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                  className="border-red-300 bg-red-500 hover:bg-red-600 text-white"
                >
                  <TrashIcon className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ name: '', share: 0 })}
              className="mt-2 border-2 border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-700"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Beneficiary
            </Button>
            {errors.beneficiaries && (
              <p className="mt-1 text-sm text-red-600">{errors.beneficiaries.message}</p>
            )}
          </div>

          {/* Account Contact Information */}
          <div>
            <h3 className="font-medium text-gray-800 text-md">Account Contact Information</h3>
            <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-3">
              {/* Contact Name */}
              <div>
                <Label htmlFor="asset_contact_name">Contact Name</Label>
                <Input
                  type="text"
                  id="asset_contact_name"
                  {...register('asset_contact_name')}
                  className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm"
                />
              </div>

              {/* Contact Number */}
              <div>
                <Label htmlFor="asset_contact_number">Contact Number</Label>
                <Input
                  type="tel"
                  id="asset_contact_number"
                  {...register('asset_contact_number')}
                  className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm"
                />
              </div>

              {/* Contact Email */}
              <div>
                <Label htmlFor="asset_contact_email">Contact Email</Label>
                <Input
                  type="email"
                  id="asset_contact_email"
                  {...register('asset_contact_email')}
                  className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm"
                />
                {errors.asset_contact_email && (
                  <p className="mt-1 text-sm text-red-600">{errors.asset_contact_email.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Attachments */}
          <div>
            <Label htmlFor="attachments">Upload a Photograph or PDF of the latest bank statements</Label>
            <div className="flex flex-col items-start space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
              <Input
                type="file"
                id="attachments"
                {...register('attachments')}
                multiple
                accept="image/*,application/pdf"
                className="flex-grow w-full h-12 border-0"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              {...register('notes')}
              rows={4}
              className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm"
            />
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