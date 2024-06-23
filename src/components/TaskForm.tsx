import React, { useState, useEffect } from 'react';
import { Task, TaskStatus, User } from '../types';
import UserService from '../services/UserService';
import TaskService from '../services/TaskService';

interface TaskFormProps {
  task?: Task;
  storyId: string;
  onSave: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, storyId, onSave }) => {
  const [name, setName] = useState(task?.name || '');
  const [description, setDescription] = useState(task?.description || '');
  const [priority, setPriority] = useState(task?.priority || 'medium');
  const [estimatedTime, setEstimatedTime] = useState(task?.estimatedTime || 1);
  const [assignedUserId, setAssignedUserId] = useState(task?.assignedUserId || '');
  const [status, setStatus] = useState<TaskStatus>(task?.status || 'todo');
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setUsers(UserService.getAllUsers().filter(user => user.role !== 'admin'));
  }, []);

  const handleSave = () => {
    const newTask: Task = {
      id: task?.id || '',
      name,
      description,
      priority,
      storyId,
      estimatedTime,
      status,
      createdAt: task?.createdAt || new Date(),
      startAt: status === 'doing' && !task?.startAt ? new Date() : task?.startAt,
      endAt: status === 'done' && !task?.endAt ? new Date() : task?.endAt,
      assignedUserId: status !== 'todo' ? assignedUserId : undefined,
    };
    TaskService.saveTask(newTask);
    onSave();
  };

  return (
    <div>
      <h3>{task ? 'Edit Task' : 'Add Task'}</h3>
      <input
        type="text"
        placeholder="Task Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input
        type="number"
        placeholder="Estimated Time (hours)"
        value={estimatedTime}
        onChange={(e) => setEstimatedTime(Number(e.target.value))}
      />
      <select
        value={assignedUserId}
        onChange={(e) => setAssignedUserId(e.target.value)}
        disabled={status === 'todo'}
      >
        <option value="">Assign to...</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.firstName} {user.lastName}
          </option>
        ))}
      </select>
      <select value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
        <option value="todo">To Do</option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
      </select>
      <button onClick={handleSave}>Save Task</button>
    </div>
  );
};

export default TaskForm;