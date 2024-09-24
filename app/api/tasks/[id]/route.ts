// app/api/tasks/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Status, Priority } from '@prisma/client';
import { Task } from '@/types';

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        categories: true,
        attachments: true,
      },
    });

    if (task) {
      const formattedTask: Task = {
        id: task.id,
        title: task.title,
        creationDate: task.creationDate.toISOString(),
        deadline: task.deadline.toISOString(),
        status: task.status,
        priority: task.priority,
        owner: task.owner,
        notes: task.notes || '',
        categories: task.categories.map((cat) => ({
          id: cat.id,
          name: cat.name,
        })),
        attachments: task.attachments.map((att) => ({
          id: att.id,
          url: att.url,
          taskId: att.taskId,
        })),
      };
      return NextResponse.json(formattedTask, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching task:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const body = await request.json();
    const { title, deadline, status, priority, owner, notes, categories } = body;

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title: title ?? undefined,
        deadline: deadline ? new Date(deadline) : undefined,
        status: status ?? undefined,
        priority: priority ?? undefined,
        owner: owner ?? undefined,
        notes: notes ?? undefined,
        categories: {
          set: [], // Remove existing categories
          connectOrCreate: categories
            ? (categories as string[]).map((name: string) => ({
                where: { name },
                create: { name },
              }))
            : [],
        },
      },
      include: {
        categories: true,
        attachments: true,
      },
    });

    const formattedTask: Task = {
      id: updatedTask.id,
      title: updatedTask.title,
      creationDate: updatedTask.creationDate.toISOString(),
      deadline: updatedTask.deadline.toISOString(),
      status: updatedTask.status,
      priority: updatedTask.priority,
      owner: updatedTask.owner,
      notes: updatedTask.notes || '',
      categories: updatedTask.categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
      })),
      attachments: updatedTask.attachments.map((att) => ({
        id: att.id,
        url: att.url,
        taskId: att.taskId,
      })),
    };

    return NextResponse.json(formattedTask, { status: 200 });
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.task.delete({
      where: { id },
    });
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
