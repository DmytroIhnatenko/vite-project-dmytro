import { Project } from '../types/index';

const PROJECTS_KEY = 'projects';
const ACTIVE_PROJECT_KEY = 'activeProject';

class ProjectService {
  static getAllProjects(): Project[] {
    const projects = localStorage.getItem(PROJECTS_KEY);
    return projects ? JSON.parse(projects) : [];
  }

  static getProjectById(id: string): Project | null {
    const projects = this.getAllProjects();
    return projects.find(project => project.id === id) || null;
  }

  static addProject(project: Project): void {
    const projects = this.getAllProjects();
    projects.push(project);
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  }

  static updateProject(updatedProject: Project): void {
    let projects = this.getAllProjects();
    projects = projects.map(project =>
      project.id === updatedProject.id ? updatedProject : project
    );
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  }

  static deleteProject(id: string): void {
    let projects = this.getAllProjects();
    projects = projects.filter(project => project.id !== id);
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  }

  static setActiveProject(id: string): void {
    localStorage.setItem(ACTIVE_PROJECT_KEY, id);
  }

  static getActiveProject(): Project | null {
    const activeProjectId = localStorage.getItem(ACTIVE_PROJECT_KEY);
    return activeProjectId ? this.getProjectById(activeProjectId) : null;
  }
}

export default ProjectService;



