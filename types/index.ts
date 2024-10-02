import { Status, Priority, ProjectCategory, ProjectStatus } from '@prisma/client';

export interface Project {
  id: string;
  name: string;
  startDate: string; // ISO string
  deadline: string; // ISO string
  status: ProjectStatus;
  projectCategory: ProjectCategory;
  description: string;
  owner: {
    id: string;
    firstName: string;
    lastName: string;
  };
  tasks: {
    id: string;
    title: string;
    status: Status;
  }[];
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Attachment {
  id: string;
  url: string;
  taskId: string;
}

export interface Task {
  id: string;
  title: string;
  creationDate: string; // ISO string
  deadline: string; // ISO string
  status: Status;
  priority: Priority;
  project: Project;
  owner: string;
  notes?: string;
  attachments: Attachment[];
}

export interface Event {
  title: string;
  date: string; // e.g., '2024-10-05'
  description: string;
}