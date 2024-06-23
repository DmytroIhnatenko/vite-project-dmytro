import React from 'react';
import { Project } from '../types/index';
import ProjectItem from './ProjectItem';

interface ProjectListProps {
  projects: Project[];
  onDelete: (id: string) => void;
  onEdit: (project: Project) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onDelete, onEdit }) => {
  return (
    <div>
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default ProjectList;