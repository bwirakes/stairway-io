'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Task } from '@/types';
import { Status, Priority, Project } from '@prisma/client';
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

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState<{
    title: string;
    deadline: string;
    status: Status;
    priority: Priority;
    owner: string;
    notes: string;
    categories: string;
    project: Project;
  }>({
    title: '',
    deadline: '',
    status: Status.BEGIN,
    priority: Priority.MEDIUM,
    owner: '',
    notes: '',
    categories: '',
    project: Project.FINANCES,
  });

  const [error, setError] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleValueChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.deadline || !formData.owner || !formData.project) {
      setError('Please fill in all required fields.');
      return;
    }

    const categories = formData.categories.split(',').map((cat) => cat.trim()).filter(cat => cat !== '');

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, categories }),
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
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Deadline <span className="text-red-500">*</span>
          </label>
          <Input
            type="date"
            name="deadline"
            required
            value={formData.deadline}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <Select value={formData.status} onValueChange={(value) => handleValueChange('status', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Status.BEGIN}>Begin</SelectItem>
              <SelectItem value={Status.IN_PROGRESS}>In Progress</SelectItem>
              <SelectItem value={Status.COMPLETE}>Complete</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <Select value={formData.priority} onValueChange={(value) => handleValueChange('priority', value)}>
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

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Project <span className="text-red-500">*</span>
          </label>
          <Select value={formData.project} onValueChange={(value) => handleValueChange('project', value)} required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Finances">Finances</SelectItem>
              <SelectItem value="Legal">Legal</SelectItem>
              <SelectItem value="Real Estate">Real Estate</SelectItem>
              <SelectItem value="Distributions">Distributions</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Owner <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="owner"
            required
            value={formData.owner}
            onChange={handleChange}
            placeholder="Enter owner name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <Textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Enter any notes"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Categories (comma separated)</label>
          <Input
            type="text"
            name="categories"
            value={formData.categories}
            onChange={handleChange}
            placeholder="e.g., Design, Development"
          />
        </div>

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