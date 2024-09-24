// app/components/KanbanBoard.tsx

'use client';

import React from 'react';
import TaskCard from './TaskCard';
import { Task } from '@/types';
import { Status } from '@prisma/client';
import { Card } from './ui/card';
import CardHeader from './ui/cardheader';
import CardBody from './ui/cardbody';

interface KanbanBoardProps {
  tasks: Task[];
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks }) => {
  const statuses: Status[] = [Status.BEGIN, Status.IN_PROGRESS, Status.COMPLETE];

  const groupedTasks: Record<Status, Task[]> = statuses.reduce((acc, status) => {
    acc[status] = tasks.filter((task) => task.status === status);
    return acc;
  }, {} as Record<Status, Task[]>);

  const statusTitles: Record<Status, string> = {
    [Status.BEGIN]: 'Begin',
    [Status.IN_PROGRESS]: 'In Progress',
    [Status.COMPLETE]: 'Complete',
  };

  return (
    <Card className="p-6 mb-8 bg-white rounded-lg shadow">
      <CardHeader>
        <h2 className="text-2xl font-bold">Kanban Board</h2>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col space-y-4 overflow-x-auto sm:flex-row sm:space-y-0 sm:space-x-4">
          {statuses.map((status) => (
            <div key={status} className="min-w-[300px] flex-shrink-0">
              <h3 className="mb-4 text-xl font-semibold text-center">{statusTitles[status]}</h3>
              {groupedTasks[status].length === 0 ? (
                <p className="text-center text-gray-500">No tasks.</p>
              ) : (
                <div className="space-y-4">
                  {groupedTasks[status].map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default KanbanBoard;
