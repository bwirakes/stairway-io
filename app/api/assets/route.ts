import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { AssetCategory, AccountStatus, AccountPlan } from '@prisma/client'
import { AssetInformation } from '@/types'

const assetSchema = z.object({
  asset_name: z.string().min(1, 'Asset Name is required'),
  asset_category: z.nativeEnum(AssetCategory),
  account_number: z.string().nullable(),
  financial_institution: z.string().nullable(),
  current_value: z.number(),
  cost_basis: z.number(),
  acquisition_date: z.string().transform((val) => new Date(val)),
  account_status: z.nativeEnum(AccountStatus),
  account_plan: z.nativeEnum(AccountPlan),
  user_id: z.string(),
  distributions: z.array(
    z.object({
      heirs_id: z.number(),
      share_of_distribution: z.number(),
    })
  ).refine((data) => data.reduce((sum, item) => sum + item.share_of_distribution, 0) === 100, {
    message: 'Total share must equal 100%',
  }),
}).required();

export async function GET() {
  try {
    const assets = await prisma.assetInformation.findMany({
      select: {
        id: true,
        asset_name: true,
        asset_category: true,
        account_number: true,
        financial_institution: true,
        current_value: true,
        cost_basis: true,
        acquisition_date: true,
        account_status: true,
        account_plan: true,
        user_id: true,
        distribution_id: true,
        attachments: true,
        is_probate: true,
        sold: true,
        created_at: true,
        updated_at: true,
        distribution: {
          select: {
            id: true,
            heirs_id: true,
            share_of_distribution: true,
            heir: {
              select: {
                id: true,
                first_name: true,
                middle_initial: true,
                last_name: true,
                email: true,
                relation: true,
                phone: true,
                ssn: true,
                street_address_1: true,
                street_address_2: true,
                city: true,
                state: true,
                zipcode: true,
                target_percentage: true,
                created_at: true,
                updated_at: true
              }
            }
          }
        }
      }
    })

    const formattedAssets: AssetInformation[] = assets.map(asset => ({
      id: asset.id,
      asset_name: asset.asset_name,
      asset_category: asset.asset_category,
      account_number: asset.account_number ?? undefined,
      financial_institution: asset.financial_institution ?? undefined,
      current_value: asset.current_value,
      cost_basis: asset.cost_basis,
      acquisition_date: asset.acquisition_date.toISOString(),
      account_status: asset.account_status,
      account_plan: asset.account_plan,
      user_id: asset.user_id,
      distribution_id: asset.distribution_id ?? 0,
      is_probate: asset.is_probate,
      sold: asset.sold,
      attachments: asset.attachments,
      created_at: asset.created_at.toISOString(),
      updated_at: asset.updated_at.toISOString(),
      distributions: asset.distribution.map(dist => ({
        id: dist.id,
        heirs_id: dist.heirs_id,
        share_of_distribution: dist.share_of_distribution,
        heir: dist.heir.map(h => ({
          id: h.id,
          first_name: h.first_name,
          middle_initial: h.middle_initial ?? undefined,
          last_name: h.last_name,
          email: h.email,
          relation: h.relation,
          phone: h.phone,
          ssn: h.ssn,
          street_address_1: h.street_address_1,
          street_address_2: h.street_address_2 ?? undefined,
          city: h.city,
          state: h.state,
          zipcode: h.zipcode,
          target_percentage: h.target_percentage,
          created_at: h.created_at.toISOString(),
          updated_at: h.updated_at.toISOString(),
        })),
      })),
    }))
    return NextResponse.json(formattedAssets)
  } catch (error) {
    console.error('Error fetching assets:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Received data:', data);

    const validatedData = assetSchema.parse(data);
    console.log('Validated data:', validatedData);

    const newAsset = await prisma.assetInformation.create({
      data: {
        ...validatedData,
        distribution: {
          create: validatedData.distributions.map(dist => ({
            heirs_id: dist.heirs_id ?? 0,
            share_of_distribution: dist.share_of_distribution ?? 0,
            distribution_type: 'default', // Add this line
            asset_information_id: 0, // Add this line, replace 0 with the correct value
          })),
        },
      },
    });
    console.log('New asset created:', newAsset);

    return NextResponse.json(newAsset, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Error creating asset:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}