import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Status, Priority } from '@prisma/client';
import { Task } from '../../../types';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const tasks = await prisma.task.findMany({
        include: {
          attachments: true,
          project: true,
          owner: true,
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
          status: task.status,
          priority: task.priority,
          project: {
            id: task.project.id,
            name: task.project.name,
            startDate: task.project.startDate.toISOString(),
            deadline: task.project.deadline.toISOString(),
            status: task.project.status,
            projectCategory: task.project.projectCategory,
            description: task.project.description,
            ownerId: task.project.ownerId,
            owner: {
              id: task.owner.id,
              firstName: task.owner.firstName,
              lastName: task.owner.lastName,
            }, // Exclude nested tasks
          },
          owner: task.ownerId, // owner is user ID
          ownerId: task.ownerId,
          notes: task.notes ?? '', // Ensure notes is null if undefined
          attachments: task.attachments.map((att) => ({
            id: att.id,
            url: att.url,
            taskId: att.taskId,
          })),
          projectId: task.projectId,
        }));

      res.status(200).json(formattedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, deadline, status, priority, projectId, ownerId, notes } = req.body;

      // Validate required fields
      if (!title || !deadline || !ownerId || !projectId) {
        return res.status(400).json({ error: 'Title, deadline, ownerId, and projectId are required.' });
      }

      const task = await prisma.task.create({
        data: {
          title,
          deadline: new Date(deadline),
          status: status || Status.NOT_STARTED,
          priority: priority || Priority.MEDIUM,
          project: { connect: { id: projectId } },
          owner: { connect: { id: ownerId } },
          notes: notes ?? null, // Use nullish coalescing
        },
        include: {
          attachments: true,
          project: true,
          owner: true,
        },
      });

      // Convert Prisma Task to our Task interface
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
          startDate: task.project.startDate.toISOString(),
          deadline: task.project.deadline.toISOString(),
          status: task.project.status,
          projectCategory: task.project.projectCategory,
          description: task.project.description,
          ownerId: task.project.ownerId,
          owner: {
            id: task.owner.id,
            firstName: task.owner.firstName,
            lastName: task.owner.lastName,
          },
          tasks: [], // Exclude nested tasks
        },
        owner: task.ownerId, // owner is user ID
        ownerId: task.ownerId,
        notes: task.notes ?? '', // Ensure notes is null if undefined
        attachments: task.attachments.map((att) => ({
          id: att.id,
          url: att.url,
          taskId: att.taskId,
        })),
        projectId: task.projectId,
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