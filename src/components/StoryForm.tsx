import React, { useState } from 'react';
import StoryService from '../services/StoryService';
import { Story } from '../types';
import AuthService from '../services/AuthService';
import ProjectService from '../services/ProjectService';

interface StoryFormProps {
  story?: Story;
  onSave: () => void;
}

const StoryForm: React.FC<StoryFormProps> = ({ story, onSave }) => {
  const [name, setName] = useState(story ? story.name : '');
  const [description, setDescription] = useState(story ? story.description : '');
  const [priority, setPriority] = useState(story ? story.priority : 'low');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStory = {
      id: story ? story.id : new Date().toISOString(),
      name,
      description,
      priority,
      projectId: ProjectService.getActiveProject()?.id || '',
      createdAt: story ? story.createdAt : new Date().toISOString(),
      status: story ? story.status : 'todo',
      ownerId: AuthService.getLoggedInUser().id,
    };

    if (story) {
      StoryService.updateStory(newStory);
    } else {
      StoryService.addStory(newStory);
    }

    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Story Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button type="submit">{story ? 'Update' : 'Create'} Story</button>
    </form>
  );
};

export default StoryForm;