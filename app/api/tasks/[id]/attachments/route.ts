// app/api/tasks/[id]/attachments/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Attachment } from '@/types';

const prisma = new PrismaClient();

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const { url } = await request.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL is required and must be a string.' }, { status: 400 });
    }

    const attachment = await prisma.attachment.create({
      data: {
        url,
        task: { connect: { id } },
        asset_information: { connect: { id: 0 } },
      },
    });

    const formattedAttachment: Attachment = {
      id: attachment.id,
      url: attachment.url,
      taskId: attachment.taskId,
    };

    return NextResponse.json(formattedAttachment, { status: 201 });
  } catch (error) {
    console.error('Error adding attachment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}