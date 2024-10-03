'use client'

import React, { useState, useEffect } from 'react'
import { Task } from '@/types'
import { format } from 'date-fns'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, ClockIcon, TagIcon, UserIcon, FileIcon, PaperclipIcon, XIcon } from 'lucide-react'
import Spinner  from "@/components/ui/spinner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface TaskDetailsProps {
  taskId: string
  onClose: () => void
}

export function TaskDetails({ taskId, onClose }: TaskDetailsProps) {
  const [task, setTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/tasks/${taskId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch task')
        }
        const data = await response.json()
        setTask(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchTask()
  }, [taskId])

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!task) return
    const updatedTask = { ...task, [e.target.name]: e.target.value }
    setTask(updatedTask)
    await updateTask(updatedTask)
  }

  const handleSelectChange = async (name: string, value: string) => {
    if (!task) return
    const updatedTask = { ...task, [name]: value }
    setTask(updatedTask)
    await updateTask(updatedTask)
  }

  const updateTask = async (updatedTask: Task) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      })
      if (!response.ok) {
        throw new Error('Failed to update task')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task')
    }
  }

  const getBadgeColor = (value: string) => {
    switch (value.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-800'
      case 'begin':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="fixed top-0 right-0 z-40 h-screen p-4 transition-transform translate-x-0 bg-white w-96 dark:bg-gray-800 flex items-center justify-center">
        <Spinner className="w-8 h-8" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="fixed top-0 right-0 z-40 h-screen p-4 transition-transform translate-x-0 bg-white w-96 dark:bg-gray-800">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!task) {
    return null
  }

  return (
    <div id="task-details-drawer" className="fixed top-0 right-0 z-40 h-screen p-4 transition-transform translate-x-0 bg-white w-96 dark:bg-gray-800" tabIndex={-1} aria-labelledby="task-details-title">
      <h5 id="task-details-title" className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
        Task Details
      </h5>
      <button
        type="button"
        onClick={onClose}
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        aria-label="Close task details"
      >
        <XIcon className="w-3 h-3" />
      </button>
      <div className="space-y-6">
        <div>
          <Input
            name="title"
            value={task.title}
            onChange={handleInputChange}
            className="text-2xl font-bold border-none p-0"
            aria-label="Task title"
          />
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <UserIcon className="w-5 h-5 text-gray-500" aria-hidden="true" />
            <span className="text-sm font-medium">Assignee</span>
            <Avatar className="h-6 w-6">
              <AvatarImage src="/placeholder-avatar.jpg" alt={task.owner} />
              <AvatarFallback>{task.owner[0]}</AvatarFallback>
            </Avatar>
            <Input
              name="owner"
              value={task.owner}
              onChange={handleInputChange}
              className="text-sm border-none p-0 w-auto"
              aria-label="Task owner"
            />
          </div>
          <div className="flex items-center space-x-2">
            <TagIcon className="w-5 h-5 text-gray-500" aria-hidden="true" />
            <span className="text-sm font-medium">Priority</span>
            <Select
              value={task.priority}
              onValueChange={(value) => handleSelectChange('priority', value)}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
              </SelectContent>
            </Select>
            <Badge className={getBadgeColor(task.priority)}>{task.priority}</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <ClockIcon className="w-5 h-5 text-gray-500" aria-hidden="true" />
            <span className="text-sm font-medium">Status</span>
            <Select
              value={task.status}
              onValueChange={(value) => handleSelectChange('status', value)}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BEGIN">Begin</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Badge className={getBadgeColor(task.status)}>{task.status}</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarIcon className="w-5 h-5 text-gray-500" aria-hidden="true" />
            <span className="text-sm font-medium">Due Date</span>
            <Input
              type="date"
              name="deadline"
              value={format(new Date(task.deadline), 'yyyy-MM-dd')}
              onChange={handleInputChange}
              className="text-sm"
              aria-label="Due date"
            />
          </div>
          <div className="flex items-center space-x-2">
            <FileIcon className="w-5 h-5 text-gray-500" aria-hidden="true" />
            <span className="text-sm font-medium">Project</span>
            <Input
              name="project"
              value={task.project.name}
              onChange={handleInputChange}
              className="text-sm border-none p-0 w-auto"
              aria-label="Project name"
            />
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="text-lg font-medium mb-2">Description</h3>
          <Textarea
            name="notes"
            value={task.notes}
            onChange={handleInputChange}
            className="w-full min-h-[100px]"
            aria-label="Task description"
          />
        </div>
        <Separator />
        <div>
          <h3 className="text-lg font-medium mb-2">Attachments</h3>
          <ul className="space-y-2">
            {task.attachments.map((attachment) => (
              <li key={attachment.id} className="flex items-center space-x-2">
                <FileIcon className="w-4 h-4 text-gray-500" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}