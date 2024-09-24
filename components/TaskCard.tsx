// app/components/TaskCard.tsx

'use client';

import React, { useState } from 'react';
import { Task } from '@/types';
import { Status } from '@prisma/client';
import { FiEdit, FiTrash2, FiCheck, FiUpload } from 'react-icons/fi';
import { Card } from '@/components/ui/card';
import CardHeader from './ui/cardheader';
import CardBody from './ui/cardbody';
import { Button}  from './ui/button';
import {Input} from './ui/input';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isCompleting, setIsCompleting] = useState<boolean>(false);
  const [attachments, setAttachments] = useState<Task['attachments']>(task.attachments);
  const [attachmentURL, setAttachmentURL] = useState<string>('');

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleCompleteWithAI = async () => {
    setIsCompleting(true);
    // Mock AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Update task status to COMPLETE
    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: Status.COMPLETE }),
      });

      if (res.ok) {
        const updatedTask: Task = await res.json();
        // Update local state
        setIsCompleting(false);
        // Optionally, update the parent component or use a state management library
        window.location.reload(); // Simple reload for demonstration
      } else {
        console.error('Failed to complete task with AI');
        setIsCompleting(false);
      }
    } catch (error) {
      console.error('Error completing task with AI:', error);
      setIsCompleting(false);
    }
  };

  const handleAddAttachment = async () => {
    if (!attachmentURL) return;

    try {
      const res = await fetch(`/api/tasks/${task.id}/attachments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: attachmentURL }),
      });

      if (res.ok) {
        const newAttachment: Task['attachments'][0] = await res.json();
        setAttachments([...attachments, newAttachment]);
        setAttachmentURL('');
      } else {
        console.error('Failed to add attachment');
      }
    } catch (error) {
      console.error('Error adding attachment:', error);
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <div>
          <h3 className="text-xl font-semibold">{task.title}</h3>
          <p className="text-sm text-gray-500">Due: {new Date(task.deadline).toLocaleDateString()}</p>
        </div>
        <Button variant="link" onClick={toggleExpand} aria-label={isExpanded ? 'Hide details' : 'Show details'}>
          {isExpanded ? 'Hide' : 'Show'}
        </Button>
      </CardHeader>

      {isExpanded && (
        <CardBody>
          <div className="mb-2">
            <span className="font-medium">Creation Date:</span>{' '}
            {new Date(task.creationDate).toLocaleDateString()}
          </div>
          <div className="mb-2">
            <span className="font-medium">Status:</span> {task.status.replace('_', ' ')}
          </div>
          <div className="mb-2">
            <span className="font-medium">Priority:</span> {task.priority}
          </div>
          <div className="mb-2">
            <span className="font-medium">Owner:</span> {task.owner}
          </div>
          <div className="mb-2">
            <span className="font-medium">Notes:</span> {task.notes || 'None'}
          </div>
          <div className="mb-2">
            <span className="font-medium">Categories:</span> {task.categories.map(cat => cat.name).join(', ')}
          </div>

          {/* Attachments */}
          <div className="mb-2">
            <span className="font-medium">Attachments:</span>
            {attachments.length === 0 ? (
              <p className="text-gray-500">No attachments.</p>
            ) : (
              <ul className="list-disc list-inside">
                {attachments.map((att) => (
                  <li key={att.id}>
                    <a href={att.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {att.url}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Add Attachment */}
          <div className="flex items-center mt-2">
            <Input
              type="url"
              placeholder="Attachment URL"
              value={attachmentURL}
              onChange={(e) => setAttachmentURL(e.target.value)}
              className="flex-1 mr-2"
            />
            <Button variant="default" onClick={handleAddAttachment}>
              Add
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex mt-4 space-x-2">
            <Button
              variant="success"
              onClick={handleCompleteWithAI}
              disabled={isCompleting}
              className={`flex items-center ${
                isCompleting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isCompleting ? 'Completing...' : <><FiCheck className="mr-1" /> Complete with AI</>}
            </Button>
            <Button
              variant="secondary"
              onClick={() => {/* Implement Add Attachment functionality */}}
              className="flex items-center"
            >
              <FiUpload className="mr-1" /> Add Attachment
            </Button>
            <Button
              variant="warning"
              onClick={() => {/* Implement Edit functionality */}}
              className="flex items-center"
            >
              <FiEdit className="mr-1" /> Edit
            </Button>
            <Button
              variant="danger"
              onClick={() => {/* Implement Delete functionality */}}
              className="flex items-center"
            >
              <FiTrash2 className="mr-1" /> Delete
            </Button>
          </div>
        </CardBody>
      )}
    </Card>
  );
};

export default TaskCard;
