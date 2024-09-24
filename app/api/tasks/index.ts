import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Status as PrismaStatus, Priority as PrismaPriority, Project as PrismaProject } from '@prisma/client';
import { Task } from '../../../types';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
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

      // Convert Prisma Task to our Task interface
      const formattedTasks: Task[] = tasks.map((task) => ({
        id: task.id,
        title: task.title,
        creationDate: task.creationDate.toISOString(),
        deadline: task.deadline.toISOString(),
        status: task.status, // PrismaStatus
        priority: task.priority, // PrismaPriority
        project: task.project, // PrismaProject
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

      res.status(200).json(formattedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, deadline, status, priority, project, owner, notes, categories } = req.body;

      // Validate required fields
      if (!title || !deadline || !owner) {
        return res.status(400).json({ error: 'Title, deadline, and owner are required.' });
      }

      const task = await prisma.task.create({
        data: {
          title,
          deadline: new Date(deadline),
          status: status || PrismaStatus.BEGIN,
          priority: priority || PrismaPriority.MEDIUM,
          project: project || PrismaProject.REAL_ESTATE,
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

      // Convert Prisma Task to our Task interface
      const formattedTask: Task = {
        id: task.id,
        title: task.title,
        creationDate: task.creationDate.toISOString(),
        deadline: task.deadline.toISOString(),
        status: task.status, // PrismaStatus
        priority: task.priority, // PrismaPriority
        project : task.project, // PrismaProject
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

      res.status(201).json(formattedTask);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
