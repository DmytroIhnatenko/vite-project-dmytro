import React, { useState, useEffect } from 'react';
import ProjectService from '../services/ProjectService';
import { Project } from '../types';

interface ActiveProjectSelectorProps {
  onSelectProject: (project: Project | null) => void;
}

const ActiveProjectSelector: React.FC<ActiveProjectSelectorProps> = ({ onSelectProject }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    console.log('ActiveProjectSelector useEffect');
    const allProjects = ProjectService.getAllProjects();
    setProjects(allProjects);
    const active = ProjectService.getActiveProject();
    setActiveProject(active);
    onSelectProject(active);
  }, [onSelectProject]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProject = ProjectService.getProjectById(event.target.value);
    if (selectedProject) {
      ProjectService.setActiveProject(selectedProject.id);
      setActiveProject(selectedProject);
      onSelectProject(selectedProject);
    } else {
      setActiveProject(null);
      onSelectProject(null);
    }
  };

  return (
    <div>
      <label htmlFor="activeProject">Active Project: </label>
      <select
        id="activeProject"
        value={activeProject ? activeProject.id : ''}
        onChange={handleChange}
      >
        <option value="" disabled>Select a project</option>
        {projects.map(project => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ActiveProjectSelector;