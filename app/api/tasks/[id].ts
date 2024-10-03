// pages/api/tasks/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { Task } from '../../../types';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid task ID' });
  }

  if (req.method === 'GET') {
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
        };

        res.status(200).json(formattedTask);
      } else {
        res.status(404).json({ error: 'Task not found' });
      }
    } catch (error) {
      console.error('Error fetching task:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { title, deadline, status, priority, ownerId, notes, projectId, accountId } = req.body;

      const updatedTask = await prisma.task.update({
        where: { id },
        data: {
          title,
          deadline: deadline ? new Date(deadline) : undefined,
          status,
          priority,
          ownerId,
          notes: notes ?? null, // Ensure notes is null if undefined
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
          id: updatedTask.project.id,
          name: updatedTask.project.name,
          startDate: updatedTask.project.startDate.toISOString(),
          deadline: updatedTask.project.deadline.toISOString(),
          status: updatedTask.project.status,
          projectCategory: updatedTask.project.projectCategory,
          description: updatedTask.project.description,
          ownerId: updatedTask.project.ownerId,
          owner: {
            id: updatedTask.owner.id,
            firstName: updatedTask.owner.firstName,
            lastName: updatedTask.owner.lastName,
          }, // Exclude nested tasks
        },
        owner: updatedTask.ownerId, // owner is user ID
        ownerId: updatedTask.ownerId,
        notes: updatedTask.notes ?? '', // Ensure notes is null if undefined
        attachments: updatedTask.attachments.map((att) => ({
          id: att.id,
          url: att.url,
          taskId: att.taskId,
        })),
        projectId: updatedTask.projectId,
      };
      res.status(200).json(formattedTask);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}