// page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { EstateProgress } from '@/components/EstateProgress';
import AddTaskButton from '@/components/AddTaskButton';
import AddTaskModal from '@/components/modals/AddTaskModal';
import { HorizontalTimeline } from '@/components/HorizontalTimeline';
import { ProjectCard } from '@/components/ProjectCard';
import { Task, Project } from '@/types';
import { format } from 'date-fns';


const TasksPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, tasksRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/tasks')
        ]);

        if (!projectsRes.ok || !tasksRes.ok) {
          throw new Error(`Error: ${!projectsRes.ok ? projectsRes.status : tasksRes.status}`);
        }

        const projectsData: Project[] = await projectsRes.json();
        const tasksData: Task[] = await tasksRes.json();

        setProjects(projectsData);
        setTaskList(tasksData);
        setIsLoading(false);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';
        console.error('Failed to fetch data:', errorMessage);
        setError(errorMessage);
        setIsLoading(false);
      }
    };

    fetchData();
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

  const getUpcomingTasks = (projectId: string, count: number = 5) => {
    return taskList
      .filter(task => task.projectId === projectId) // Fixed comparison
      .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
      .slice(0, count);
  };

  const handleProjectClick = (project: Project) => {
    // Handle project click, e.g., navigate to project details page
    console.log('Project clicked:', project);
  };

  if (isLoading) {
    return <div className="mt-10 text-center">Loading data...</div>;
  }

  if (error) {
    return <div className="mt-10 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl p-4">
        <EstateProgress />

        <div className="flex items-center justify-between mb-6">
          <AddTaskButton onClick={handleAddTask} />
        </div>

        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Upcoming Tasks</h2>
          <HorizontalTimeline />
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const projectTasks = getUpcomingTasks(project.id, 7); // Adjust count as needed
            return (
              <ProjectCard
                key={project.id}
                project={project}
                tasks={projectTasks}
                icon={`/icons/${project.projectCategory.toLowerCase()}.svg`}
                dueDate={format(new Date(project.deadline), 'MMM d, yyyy')}
                category={project.projectCategory}
                owner={{
                  name: `${project.owner.firstName} ${project.owner.lastName}`,
                  avatar: '/placeholder-avatar.png' // Placeholder avatar
                }}
                onClick={() => handleProjectClick(project)}
              />
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
