// app/api/assets/[id]/distributions/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Distribution } from '@/types';

const prisma = new PrismaClient();

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
            heir: { connect: { id: dist.heir_id } },
            share_of_distribution: dist.share_of_distribution ?? 0,
            assets: { connect: { id: Number(id) } },
            distribution_type: dist.distribution_type || 'default',
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
        assets: true
      }
    });
    
    const formattedDistributions: Distribution[] = distributions.map(dist => ({
      ...dist,
      created_at: dist.created_at.toISOString(),
      updated_at: dist.updated_at.toISOString(),
      heir: {
        ...dist.heir,
        email: dist.heir.email || null,
        phone: dist.heir.phone || null
      }
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
