import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const assetSchema = z.object({
  asset_name: z.string(),
  asset_category: z.enum(['ANNUITY_NON_QUALIFIED', 'ANNUITY_QUALIFIED', 'BONDS', 'BROKERAGE_ACCOUNT', 'BUSINESS', 'CASH', 'COLLECTIBLE', 'CRYPTOCURRENCY', 'DEPOSIT_ACCOUNT', 'ESTATE_ACCOUNT', 'JEWELRY', 'LIFE_INSURANCE', 'LOAN', 'OTHER', 'PRECIOUS_METAL', 'REAL_ESTATE', 'REFUND', 'RETIREMENT', 'STOCKS', 'TRUST', 'VEHICLE']),
  account_number: z.string().nullable(),
  financial_institution: z.string().nullable(),
  account_owner: z.string().nullable(),
  current_value: z.number(),
  account_id: z.string().nullable(),
  distribution_id: z.number().nullable(),
  is_probate: z.boolean(),
  sold: z.boolean(),
  cost_basis: z.number().nullable(),
  acquisition_date: z.date().nullable(),
  task_id: z.number().nullable(),
  asset_location: z.string().nullable(),
  user_id: z.number(),
  asset_contact_name: z.string().nullable(),
  asset_contact_number: z.string().nullable(),
  asset_contact_email: z.string().email().nullable(),
  attachments: z.array(z.string()),
  notes: z.string().nullable(),
  account_status: z.enum(['OPEN', 'CLOSED', 'TRANSFERRED']),
  account_plan: z.enum(['INDIVIDUAL', 'JOINT', 'PAYABLE_ON_DEATH', 'TRANSFERRED']),
  beneficiaries: z.array(z.object({
    name: z.string(),
    share: z.number(),
  })),
})

export async function GET() {
  try {
    const assets = await prisma.assetInformation.findMany()
    return NextResponse.json(assets)
  } catch (error) {
    console.error('Error fetching assets:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const validatedData = assetSchema.parse(data)
    const newAsset = await prisma.assetInformation.create({ data: validatedData })
    return NextResponse.json(newAsset, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error creating asset:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}