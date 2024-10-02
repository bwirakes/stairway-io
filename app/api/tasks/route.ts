import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Status, Priority } from '@prisma/client';
import { Task, Attachment } from '@/types';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        project: {
          select: {
            id: true,
            name: true,
            projectCategory: true,
          },
        }, // Include project details
        owner: {
          select: {
            firstName: true,
            lastName: true,
          },
        }, // Include owner details
        attachments: true, // Include attachments
      },
      orderBy: {
        deadline: 'asc',
      },
    });

    const formattedTasks: Task[] = tasks
      .filter(task => task.project !== null)
      .map((task) => ({
        id: task.id,
        title: task.title,
        creationDate: task.creationDate.toISOString(),
        deadline: task.deadline.toISOString(),
        status: task.status,
        priority: task.priority,
        project: task.project.name,
        owner: `${task.owner.firstName} ${task.owner.lastName}`,
        notes: task.notes || '',
        attachments: task.attachments.map((att: Attachment) => ({
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
    const { title, deadline, status, priority, ownerId, notes, projectId } = body;

    // Validate required fields
    if (!title || !deadline || !ownerId || !projectId) {
      return NextResponse.json(
        { error: 'Title, deadline, ownerId, and projectId are required.' },
        { status: 400 }
      );
    }

    // Validate status if provided
    let taskStatus: Status = Status.NOT_STARTED;
    if (status && Object.values(Status).includes(status)) {
      taskStatus = status;
    }

    // Validate priority if provided
    let taskPriority: Priority = Priority.MEDIUM;
    if (priority && Object.values(Priority).includes(priority)) {
      taskPriority = priority;
    }

    // Verify that the owner exists
    const owner = await prisma.user.findUnique({
      where: { id: ownerId },
    });

    if (!owner) {
      return NextResponse.json({ error: 'Owner not found.' }, { status: 404 });
    }

    // Verify that the project exists
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
    }

    const task = await prisma.task.create({
      data: {
        title,
        deadline: new Date(deadline),
        status: taskStatus,
        priority: taskPriority,
        owner: {
          connect: { id: ownerId },
        },
        notes,
        project: {
          connect: { id: projectId },
        },
      },
      include: {
        project: true,
        owner: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        attachments: true, // Include attachments
      },
    });

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
      owner: `${task.owner.firstName} ${task.owner.lastName}`,
      notes: task.notes || '',
      attachments: task.attachments.map((att: Attachment) => ({
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