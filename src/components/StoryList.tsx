import React from 'react';
import { Story } from '../types';
import StoryItem from './StoryItem';

interface StoryListProps {
  stories: Story[];
  onDelete: (id: string) => void;
  onEdit: (story: Story) => void;
}

const StoryList: React.FC<StoryListProps> = ({ stories, onDelete, onEdit }) => {
  const groupedStories = {
    todo: stories.filter(story => story.status === 'todo'),
    doing: stories.filter(story => story.status === 'doing'),
    done: stories.filter(story => story.status === 'done'),
  };

  return (
    <div>
      <h3>Todo</h3>
      {groupedStories.todo.map(story => (
        <StoryItem key={story.id} story={story} onDelete={onDelete} onEdit={onEdit} />
      ))}
      <h3>Doing</h3>
      {groupedStories.doing.map(story => (
        <StoryItem key={story.id} story={story} onDelete={onDelete} onEdit={onEdit} />
      ))}
      <h3>Done</h3>
      {groupedStories.done.map(story => (
        <StoryItem key={story.id} story={story} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default StoryList;