import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { AssetCategory, AccountStatus, AccountPlan } from '@prisma/client'

const assetSchema = z.object({
  asset_name: z.string().min(1, 'Asset Name is required'),
  asset_category: z.nativeEnum(AssetCategory),
  account_number: z.string().nullable(),
  financial_institution: z.string().nullable(),
  current_value: z.number(),
  cost_basis: z.number().nullable(),
  acquisition_date: z.string().nullable().transform((val) => val ? new Date(val) : null),
  account_status: z.nativeEnum(AccountStatus),
  account_plan: z.nativeEnum(AccountPlan),
  user_id: z.number(),
  distributions: z.array(
    z.object({
      heir_id: z.number(),
      share: z.number(),
    })
  ).refine((data) => data.reduce((sum, item) => sum + item.share, 0) === 100, {
    message: 'Total share must equal 100%',
  }),
}).required();

export async function GET() {
  try {
    const assets = await prisma.assetInformation.findMany()
    const formattedAssets = assets.map(asset => ({
      ...asset,
      attachments: asset.attachments,
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
        distributions: {
          create: validatedData.distributions,
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