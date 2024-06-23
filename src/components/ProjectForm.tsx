import React, { useState } from 'react';
import ProjectService from '../services/ProjectService';
import { Project } from '../types/index';

interface ProjectFormProps {
  project?: Project;
  onSave: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSave }) => {
  const [name, setName] = useState(project ? project.name : '');
  const [description, setDescription] = useState(project ? project.description : '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject = {
      id: project ? project.id : new Date().toISOString(),
      name,
      description,
    };

    if (project) {
      ProjectService.updateProject(newProject);
    } else {
      ProjectService.addProject(newProject);
    }

    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Project Name</label>
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
      <button type="submit">{project ? 'Update' : 'Create'} Project</button>
    </form>
  );
};

export default ProjectForm;