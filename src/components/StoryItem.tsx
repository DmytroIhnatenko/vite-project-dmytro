import React from 'react';
import { Story } from '../types';
import { Project } from '../types';

interface StoryItemProps {
  story: Story;
  onDelete: (id: string) => void;
  onEdit: (story: Story) => void;
}

const StoryItem: React.FC<StoryItemProps> = ({ story, onDelete, onEdit }) => {
  return (
    <div>
      <h4>{story.name}</h4>
      <p>{story.description}</p>
      <p>Priority: {story.priority}</p>
      <p>Status: {story.status}</p>
      <p>Owner: {story.ownerId}</p>
      <button onClick={() => onEdit(story)}>Edit</button>
      <button onClick={() => onDelete(story.id)}>Delete</button>
    </div>
  );
};

export default StoryItem;