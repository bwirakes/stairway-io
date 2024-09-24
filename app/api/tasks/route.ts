// app/api/tasks/route.ts
//9:27  Error: 'request' is defined but never used.  @typescript-eslint/no-unused-vars

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Status, Priority } from '@prisma/client';
import { Task } from '@/types';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        categories: true,
        attachments: true,
      },
      orderBy: {
        deadline: 'asc',
      },
    });

    const formattedTasks: Task[] = tasks.map((task) => ({
      id: task.id,
      title: task.title,
      creationDate: task.creationDate.toISOString(),
      deadline: task.deadline.toISOString(),
      status: task.status,
      priority: task.priority,
      project: task.project, // Add the 'project' property
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
    }));

    return NextResponse.json(formattedTasks, { status: 200 });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, deadline, status, priority, owner, notes, categories } = body;

    // Validate required fields
    if (!title || !deadline || !owner) {
      return NextResponse.json({ error: 'Title, deadline, and owner are required.' }, { status: 400 });
    }

    const task = await prisma.task.create({
      data: {
        title,
        deadline: new Date(deadline),
        status: status || Status.BEGIN,
        priority: priority || Priority.MEDIUM,
        owner,
        notes,
        categories: {
          connectOrCreate: categories.map((name: string) => ({
            where: { name },
            create: { name },
          })),
        },
      },
      include: {
        categories: true,
        attachments: true,
      },
    });

    const formattedTask: Task = {
      id: task.id,
      title: task.title,
      creationDate: task.creationDate.toISOString(),
      deadline: task.deadline.toISOString(),
      status: task.status,
      priority: task.priority,
      project : task.project,
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

    return NextResponse.json(formattedTask, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
