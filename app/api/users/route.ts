import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { User } from '@/types';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
      orderBy: {
        firstName: 'asc',
      },
    });

    const formattedUsers: User[] = users.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    }));

    return NextResponse.json(formattedUsers, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}