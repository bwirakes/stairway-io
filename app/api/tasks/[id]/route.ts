// app/api/tasks/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Task } from '@/types';

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        attachments: true,
        project: true,
        owner: true,
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
        project: {
          id: task.project.id,
          name: task.project.name,
          projectCategory: task.project.projectCategory,
        },
        owner: task.owner.id,
        ownerId: task.ownerId,
        notes: task.notes || '',
        attachments: task.attachments.map((att) => ({
          id: att.id,
          url: att.url,
          taskId: att.taskId,
        })),
        projectId: task.projectId,
        accountId: task.accountId,
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
    const { title, deadline, status, priority, ownerId, notes, projectId, accountId } = body;

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title,
        deadline: deadline ? new Date(deadline) : undefined,
        status,
        priority,
        ownerId,
        notes,
        projectId,
        accountId,
      },
      include: {
        attachments: true,
        project: true,
        owner: true,
      },
    });

    const formattedTask: Task = {
      id: updatedTask.id,
      title: updatedTask.title,
      creationDate: updatedTask.creationDate.toISOString(),
      deadline: updatedTask.deadline.toISOString(),
      status: updatedTask.status,
      priority: updatedTask.priority,
      project: {
        id: updatedTask.projectId,
        name: updatedTask.project.name,
        projectCategory: updatedTask.project.projectCategory,
      },
      owner: updatedTask.owner.id,
      ownerId: updatedTask.ownerId,
      notes: updatedTask.notes || '',
      attachments: updatedTask.attachments.map((att) => ({
        id: att.id,
        url: att.url,
        taskId: att.taskId,
      })),
      projectId: updatedTask.projectId,
      accountId: updatedTask.accountId,
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
    return NextResponse.json({ message: 'Task deleted successfully' }, { status: 204 });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}