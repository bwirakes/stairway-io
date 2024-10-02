"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Task, Project } from "@prisma/client"
import { Status } from "@prisma/client"
import { MoreHorizontal, MessageSquare, Paperclip } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { TaskDetails } from '@/components/TaskDetailsDrawer'
import Link from 'next/link'

interface ProjectWithTasks extends Project {
  tasks: Task[]
}

interface ProjectCardProps {
  project: ProjectWithTasks
  onClick: (project: ProjectWithTasks) => void
}

export function ProjectCard({
  project,
  onClick
}: ProjectCardProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)

    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  const totalTasks = project.tasks.length
  const inProgressTasks = project.tasks.filter(task => task.status === Status.IN_PROGRESS).length
  const completedTasks = project.tasks.filter(task => task.status === Status.COMPLETE).length
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  const upcomingTasks = project.tasks
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 3)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onClick(project)
  }

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const handleTaskClick = (e: React.MouseEvent, task: Task) => {
    e.stopPropagation()
    setSelectedTask(task)
  }

  const handleCloseTaskDetails = () => {
    setSelectedTask(null)
  }

  const getGradientColor = () => {
    const colors = ['from-blue-400 to-blue-600', 'from-green-400 to-green-600', 'from-red-400 to-red-600', 'from-yellow-400 to-yellow-600', 'from-purple-400 to-purple-600']
    return colors[Math.floor(Math.random() * colors.length)]
  }

  return (
    <>
      <Card 
        className="w-full transition duration-300 ease-in-out cursor-pointer hover:shadow-lg text-sm"
        onClick={handleClick}
      >
        <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0">
          <div className="flex items-start space-x-3">
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getGradientColor()} flex-shrink-0`}></div>
            <div>
              <CardTitle className="text-sm font-medium text-gray-500">{project.projectCategory}</CardTitle>
              <h3 className="text-lg font-semibold mt-1">{project.name}</h3>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={handleDropdownClick}>
              <Button variant="ghost" className="w-8 h-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href={`/projects/${project.id}/edit`}>Edit</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/projects/${project.id}`}>Go to Project</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 py-4 border-y text-xs">
            <div className="text-center">
              <div className="text-xl font-bold">{totalTasks}</div>
              <div className="text-gray-500">Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{inProgressTasks}</div>
              <div className="text-gray-500">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{completedTasks}</div>
              <div className="text-gray-500">Completed</div>
            </div>
          </div>
          <div className="space-y-3 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Due date</span>
              <span className="font-medium">{new Date(project.deadline).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Assignee</span>
              <div className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${getGradientColor()}`}></div>
                <span className="font-medium">{project.owner.firstName} {project.owner.lastName}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Last edited</span>
              <div className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${getGradientColor()}`}></div>
                <span className="font-medium">James Collins</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Team</span>
              <div className="flex -space-x-1">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className={`w-5 h-5 rounded-full bg-gradient-to-br ${getGradientColor()} border-2 border-white`}></div>
                ))}
                <div className="w-5 h-5 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium">
                  +2
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <h4 className="font-medium mb-2">Upcoming Tasks</h4>
            {upcomingTasks.map((task) => (
              <div 
                key={task.id} 
                className="flex justify-between items-center text-xs py-1 cursor-pointer hover:bg-gray-50 rounded transition-colors"
                onClick={(e) => handleTaskClick(e, task)}
              >
                <span className="truncate text-gray-600">{task.title}</span>
                <span className="text-gray-400">{new Date(task.deadline).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </CardContent>
        <div className="border-t mx-4"></div>
        <CardFooter className="flex items-center justify-between pt-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <MessageSquare className="w-4 h-4" />
              <span className="text-xs">2</span>
            </div>
            <div className="flex items-center space-x-1">
              <Paperclip className="w-4 h-4" />
              <span className="text-xs">1</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 w-1/2">
            <Progress value={progress} className="flex-grow" />
            <span className="text-xs font-medium">{Math.round(progress)}%</span>
          </div>
        </CardFooter>
        <div className="px-6 pb-4">
          <Button variant="outline" className="w-full text-sm">
            All Tasks
          </Button>
        </div>
      </Card>
      {selectedTask && (
        <TaskDetails taskId={selectedTask.id} onClose={handleCloseTaskDetails} />
      )}
    </>
  )
}