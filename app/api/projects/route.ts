import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Project } from '@/types';

const prisma = new PrismaClient();


export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        tasks: {
          select: {
            id: true,
            title: true,
            status: true,
          },
        },
      },
      orderBy: {
        deadline: 'asc',
      },
    });

    const formattedProjects: Project[] = projects.map((project) => ({
      id: project.id,
      name: project.name,
      startDate: project.startDate.toISOString(),
      deadline: project.deadline.toISOString(),
      status: project.status,
      projectCategory: project.projectCategory,
      description: project.description || '',
      owner: {
        id: project.owner.id,
        firstName: project.owner.firstName,
        lastName: project.owner.lastName,
      },
      tasks: project.tasks.map((task) => ({
        id: task.id,
        title: task.title,
        status: task.status,
      })),
    }));

    return NextResponse.json(formattedProjects, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, startDate, deadline, status, projectCategory, description, ownerId } = body;

    const newProject = await prisma.project.create({
      data: {
        name,
        startDate: new Date(startDate),
        deadline: new Date(deadline),
        status,
        projectCategory,
        description,
        owner: { connect: { id: ownerId } },
      },
      include: {
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    const formattedProject: Project = {
      id: newProject.id,
      name: newProject.name,
      startDate: newProject.startDate.toISOString(),
      deadline: newProject.deadline.toISOString(),
      status: newProject.status,
      projectCategory: newProject.projectCategory,
      description: newProject.description || '',
      owner: {
        id: newProject.owner.id,
        firstName: newProject.owner.firstName,
        lastName: newProject.owner.lastName,
      },
      tasks: [],
    };

    return NextResponse.json(formattedProject, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
