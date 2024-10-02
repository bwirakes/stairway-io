// app/api/heirs/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const heirs = await prisma.heir.findMany();
    return NextResponse.json(heirs);
  } catch (error) {
    console.error('Error fetching heirs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
