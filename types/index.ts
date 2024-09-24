import { Status, Priority, Project } from '@prisma/client';


export interface Category {
  id: string;
  name: string;
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
  categories: Category[];
  attachments: Attachment[];
}

export interface Event {
  title: string;
  date: string; // e.g., '2024-10-05'
  description: string;
}
