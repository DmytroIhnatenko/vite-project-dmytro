import React from 'react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onEdit }) => {
  return (
    <div>
      <h4>{task.name}</h4>
      <p>{task.description}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.status}</p>
      <p>Assigned User: {task.assignedUserId}</p>
      <p>Estimated Time: {task.estimatedTime} hours</p>
      <p>Created At: {new Date(task.createdAt).toDateString()}</p>
      {task.startAt && <p>Start At: {new Date(task.startAt).toDateString()}</p>}
      {task.endAt && <p>End At: {new Date(task.endAt).toDateString()}</p>}
      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

export default TaskItem;