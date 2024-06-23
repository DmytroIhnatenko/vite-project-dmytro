export interface Project {
    id: string;
    name: string;
    description: string;
}

export type UserRole = 'admin' | 'devops' | 'developer';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface Story {
    id: string;
    name: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    projectId: string;
    createdAt: string;
    status: 'todo' | 'doing' | 'done';
    ownerId: string;
}

export type TaskStatus = 'todo' | 'doing' | 'done';

export interface Task {
  id: string;
  name: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  storyId: string;
  estimatedTime: number; // in hours
  status: TaskStatus;
  createdAt: Date;
  startAt?: Date;
  endAt?: Date;
  assignedUserId?: string;
}