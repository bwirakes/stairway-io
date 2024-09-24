// pages/api/tasks/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { Task } from '../../../types';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    res.status(400).json({ error: 'Invalid task ID' });
    return;
  }

  if (req.method === 'GET') {
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
      const { title, deadline, status, priority, owner, notes, categories } = req.body;

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

      res.status(200).json(formattedTask);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.task.delete({
        where: { id },
      });
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
