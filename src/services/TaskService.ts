import { Task } from '../types';
import { v4 as uuidv4 } from 'uuid';

class TaskService {
  static getTasksByStoryId(storyId: string): Task[] {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]') as Task[];
    return tasks.filter(task => task.storyId === storyId).map(task => ({
      ...task,
      createdAt: new Date(task.createdAt),
      startAt: task.startAt ? new Date(task.startAt) : undefined,
      endAt: task.endAt ? new Date(task.endAt) : undefined,
    }));
  }

  static getTaskById(id: string): Task | undefined {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]') as Task[];
    const task = tasks.find(task => task.id === id);
    return task ? {
      ...task,
      createdAt: new Date(task.createdAt),
      startAt: task.startAt ? new Date(task.startAt) : undefined,
      endAt: task.endAt ? new Date(task.endAt) : undefined,
    } : undefined;
  }

  static saveTask(task: Task): void {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]') as Task[];
    const existingIndex = tasks.findIndex(t => t.id === task.id);
    if (existingIndex >= 0) {
      tasks[existingIndex] = task;
    } else {
      task.id = uuidv4();
      task.createdAt = new Date();
      tasks.push(task);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  static deleteTask(id: string): void {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]') as Task[];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

export default TaskService;