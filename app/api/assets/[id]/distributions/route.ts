// app/api/assets/[id]/distributions/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Distribution } from '@/types';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log('POST request received for asset ID:', params.id);
  const { id } = params;

  try {
    const data = await request.json();
    const { distributions } = data;

    if (!distributions || distributions.length === 0) {
      return NextResponse.json(
        { error: 'Distributions data is required.' },
        { status: 400 }
      );
    }

    const createdDistributions = await Promise.all(
      distributions.map(async (dist: Partial<Distribution>) => {
        const distribution = await prisma.distribution.create({
          data: {
            heirs_id: dist.heirs_id!,
            share_of_distribution: dist.share_of_distribution!,
            assets: { connect: { id: Number(id) } },
            distribution_type: dist.distribution_type || 'default',
            heir: { connect: { id: dist.heirs_id } },
            asset_information_id: dist.asset_information_id || 0,
          },
        });
        return distribution;
      })
    );

    return NextResponse.json(createdDistributions, { status: 201 });
  } catch (error) {
    console.error('Error creating distributions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log('GET request received for asset ID:', params.id);
  const { id } = params;
  
  try {
    const distributions = await prisma.distribution.findMany({
      where: {
        assets: {
          some: {
            id: Number(id)
          }
        }
      },
      include: {
        heir: true,
        assets: {
          include: {
            attachments: true,
          },
        },
      },
    });
    
    const formattedDistributions: Distribution[] = distributions.map((dist) => ({
      id: dist.id,
      distribution_share_id: dist.distribution_share_id,
      heirs_id: dist.heirs_id,
      account: dist.account || null,
      share_of_distribution: dist.share_of_distribution,
      distribution_type: dist.distribution_type,
      created_at: dist.created_at.toISOString(),
      updated_at: dist.updated_at.toISOString(),
      asset_information_id: dist.asset_information_id,
      heir_id: dist.heirs_id,
      heir: dist.heir.map((h) => ({
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
      assets: dist.assets.map((asset) => ({
        id: asset.id,
        asset_name: asset.asset_name,
        account_id: asset.account_id ?? undefined,
        account_number: asset.account_number ?? undefined,
        financial_institution: asset.financial_institution ?? undefined,
        account_owner: asset.account_owner ?? undefined,
        current_value: asset.current_value,
        cost_basis: asset.cost_basis,
        acquisition_date: asset.acquisition_date.toISOString(),
        attachments: asset.attachments.map((attachment) => ({
          id: attachment.id,
          url: attachment.url,
          taskId: attachment.taskId,
        })),
        notes: asset.notes ?? undefined,
        asset_category: asset.asset_category,
        distribution_id: asset.distribution_id ?? undefined,
        is_probate: asset.is_probate,
        sold: asset.sold,
        task_id: asset.task_id ?? undefined,
        asset_location: asset.asset_location ?? undefined,
        user_id: asset.user_id,
        asset_contact_number: asset.asset_contact_number ?? undefined,
        asset_contact_name: asset.asset_contact_name ?? undefined,
        asset_contact_email: asset.asset_contact_email ?? undefined,
        created_at: asset.created_at.toISOString(),
        updated_at: asset.updated_at.toISOString(),
        account_status: asset.account_status,
        account_plan: asset.account_plan,
      })),
    }));
    
    return NextResponse.json(formattedDistributions, { status: 200 });
  } catch (error) {
    console.error('Error fetching distributions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
