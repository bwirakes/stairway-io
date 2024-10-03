// app/api/heir/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Heir } from '@/types';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const heirs = await prisma.heir.findMany();
    const formattedHeirs: Heir[] = heirs.map(heir => ({
      ...heir,
      created_at: heir.created_at.toISOString(),
      updated_at: heir.updated_at.toISOString(),
      middle_initial: heir.middle_initial ?? undefined,
      street_address_2: heir.street_address_2 ?? undefined,
    }));
    return NextResponse.json(formattedHeirs);
  } catch (error) {
    console.error('Error fetching heirs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newHeir = await prisma.heir.create({
      data: {
        ...body,
        target_percentage: parseFloat(body.target_percentage),
      },
    });
    const formattedHeir: Heir = {
      ...newHeir,
      created_at: newHeir.created_at.toISOString(),
      updated_at: newHeir.updated_at.toISOString(),
      middle_initial: newHeir.middle_initial ?? undefined,
      street_address_2: newHeir.street_address_2 ?? undefined,
    };
    return NextResponse.json(formattedHeir, { status: 201 });
  } catch (error) {
    console.error('Error creating heir:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
