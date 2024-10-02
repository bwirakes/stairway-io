'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Task } from '@/types';
import { Status, Priority, ProjectCategory } from '@prisma/client';
import Modal from '@/components/ui/modal';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newTask: Task) => void;
}

interface Project {
  id: string;
  name: string;
  projectCategory: ProjectCategory;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
}


const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState<{
    title: string;
    deadline: string;
    status: Status;
    priority: Priority;
    ownerId: string;
    notes: string;
    categories: string;
    projectId: string;
  }>({
    title: '',
    deadline: '',
    status: Status.NOT_STARTED,
    priority: Priority.MEDIUM,
    ownerId: '',
    notes: '',
    categories: '',
    projectId: '',
  });

  const [error, setError] = useState<string>('');

  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);


  const [isLoadingProjects, setIsLoadingProjects] = useState<boolean>(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(false);


  useEffect(() => {
    if (isOpen) {
      fetchProjects();
      fetchUsers();
    }
  }, [isOpen]);

  const fetchProjects = async () => {
    setIsLoadingProjects(true);
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        const data: Project[] = await res.json();
        setProjects(data);
      } else {
        console.error('Failed to fetch projects');
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const fetchUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const res = await fetch('/api/users');
      if (res.ok) {
        const data: User[] = await res.json();
        setUsers(data);
      } else {
        console.error('Failed to fetch users');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setIsLoadingUsers(false);
    }
  };


  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate required fields
    if (!formData.title || !formData.deadline || !formData.ownerId || !formData.projectId) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          deadline: formData.deadline,
          status: formData.status,
          priority: formData.priority,
          ownerId: formData.ownerId,
          notes: formData.notes,
          categories: formData.categories,
          projectId: formData.projectId,
        }),
      });

      if (res.ok) {
        const newTask: Task = await res.json();
        onAdd(newTask);
        onClose();
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Failed to add task.');
      }
    } catch (error) {
      console.error('Error adding task:', error);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Task">
      {error && <p className="mb-2 text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter task title"
          />
        </div>

        {/* Deadline */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Deadline <span className="text-red-500">*</span>
          </label>
          <Input
            type="date"
            name="deadline"
            required
            value={formData.deadline}
            onChange={handleInputChange}
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <Select
            name="status"
            value={formData.status}
            onValueChange={(value) => handleSelectChange('status', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Status.NOT_STARTED}>Not Started</SelectItem>
              <SelectItem value={Status.PENDING}>Pending</SelectItem>
              <SelectItem value={Status.IN_PROGRESS}>In Progress</SelectItem>
              <SelectItem value={Status.COMPLETE}>Complete</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <Select
            name="priority"
            value={formData.priority}
            onValueChange={(value) => handleSelectChange('priority', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Priority.LOW}>Low</SelectItem>
              <SelectItem value={Priority.MEDIUM}>Medium</SelectItem>
              <SelectItem value={Priority.HIGH}>High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Project */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Project <span className="text-red-500">*</span>
          </label>
          {isLoadingProjects ? (
            <p>Loading projects...</p>
          ) : (
            <Select
              name="projectId"
              value={formData.projectId}
              onValueChange={(value) => handleSelectChange('projectId', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Owner */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Owner <span className="text-red-500">*</span>
          </label>
          {isLoadingUsers ? (
            <p>Loading owners...</p>
          ) : (
            <Select
              name="ownerId"
              value={formData.ownerId}
              onValueChange={(value) => handleSelectChange('ownerId', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select owner" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.firstName} {user.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <Textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Enter any notes"
            rows={3}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end">
          <Button variant="secondary" onClick={onClose} type="button" className="mr-4">
            Cancel
          </Button>
          <Button type="submit" variant="default">
            Add Task
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTaskModal;