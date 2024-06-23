import React from 'react';
import { Project } from '../types/index';

interface ProjectItemProps {
  project: Project;
  onDelete: (id: string) => void;
  onEdit: (project: Project) => void;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project, onDelete, onEdit }) => {
  return (
    <div>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <button onClick={() => onEdit(project)}>Edit</button>
      <button onClick={() => onDelete(project.id)}>Delete</button>
    </div>
  );
};

export default ProjectItem;