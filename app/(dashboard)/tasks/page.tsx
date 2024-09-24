"use client";

import React, { useEffect, useState } from 'react';
import { EstateProgress } from '@/components/EstateProgress';
import AddTaskButton from '@/components/AddTaskButton';
import AddTaskModal from '@/components/modals/AddTaskModal';
import {HorizontalTimeline} from '@/components/HorizontalTimeline';
import { Task } from '@/types';
import { Status } from '@prisma/client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { format } from 'date-fns';

const TasksPage: React.FC = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch('/api/tasks');
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        const data: Task[] = await res.json();
        setTaskList(data);
        setIsLoading(false);
      } catch (err: any) {
        console.error('Failed to fetch tasks:', err);
        setError(err.message || 'Failed to fetch tasks');
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNewTask = (newTask: Task) => {
    setTaskList([newTask, ...taskList]);
  };

  const getUpcomingTasks = (tasks: Task[], count: number = 5) => {
    return tasks
      .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
      .slice(0, count);
  };

  const projectCategories = ["Finances", "Legal", "Real Estate", "Distributions"];

  if (isLoading) {
    return <div className="mt-10 text-center">Loading tasks...</div>;
  }

  if (error) {
    return <div className="mt-10 text-center text-red-500">Error: {error}</div>;
  }

  const upcomingTasks = getUpcomingTasks(taskList, 10);

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl">
        <EstateProgress />

        <div className="flex items-center justify-between mb-6">
          
          <AddTaskButton onClick={handleAddTask} />
        </div>

        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Upcoming Tasks</h2>
          <HorizontalTimeline/>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
          {projectCategories.map((category) => {
            const categoryTasks = taskList.filter(task => task.project === category);
            const upcomingCategoryTasks = getUpcomingTasks(categoryTasks);

            return (
              <Card key={category}>
                <CardHeader>
                  <CardTitle>{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {upcomingCategoryTasks.map((task) => (
                      <li key={task.id} className="flex items-center justify-between">
                        <span className="font-medium">{task.title}</span>
                        <div className="text-sm text-gray-500">
                          <span className="mr-2">{format(new Date(task.deadline), 'MMM d, yyyy')}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            task.status === Status.COMPLETE ? 'bg-green-100 text-green-800' :
                            task.status === Status.IN_PROGRESS ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {task.status}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full mt-4">
                    <Link href={`/tasks/${category.toLowerCase().replace(' ', '-')}`}>
                      View All Tasks
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <AddTaskModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onAdd={handleNewTask}
        />
      </div>
    </div>
  );
};

export default TasksPage;