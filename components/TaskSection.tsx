// app/components/TaskSection.tsx

import React from 'react';
import TaskCard from './TaskCard';
import { Task } from '@/types';

interface TaskSectionProps {
  title: string;
  tasks: Task[];
}

const TaskSection: React.FC<TaskSectionProps> = ({ title, tasks }) => {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-2xl font-semibold">{title}</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks due in this period.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskSection;
