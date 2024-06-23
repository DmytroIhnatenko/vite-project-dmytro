import React from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onEdit }) => {
  const groupedTasks = {
    todo: tasks.filter(task => task.status === 'todo'),
    doing: tasks.filter(task => task.status === 'doing'),
    done: tasks.filter(task => task.status === 'done'),
  };

  return (
    <div>
      <h3>Todo</h3>
      {groupedTasks.todo.map(task => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} />
      ))}
      <h3>Doing</h3>
      {groupedTasks.doing.map(task => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} />
      ))}
      <h3>Done</h3>
      {groupedTasks.done.map(task => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default TaskList;