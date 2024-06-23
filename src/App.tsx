import React, { useState, useEffect, useCallback } from 'react';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import ActiveProjectSelector from './components/ActiveProjectSelector';
import StoryForm from './components/StoryForm';
import StoryList from './components/StoryList';
import TaskForm from './components/TaskForm';
import KanbanBoard from './components/KanbanBoard';
import LoginForm from './components/LoginForm';
import NotificationList from './components/NotificationList';
import UnreadCount from './components/UnreadCount';
import NotificationDialog from './components/NotificationDialog';
import ProjectService from './services/ProjectService';
import StoryService from './services/StoryService';
import TaskService from './services/TaskService';
import { notificationService } from './services/NotificationService';
import { Project, Story, Task } from './types';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    console.log('App useEffect 1');
    setProjects(ProjectService.getAllProjects());
    const active = ProjectService.getActiveProject();
    setActiveProject(active);
    if (active) {
      setStories(StoryService.getStoriesByProjectId(active.id));
    }
  }, []);

  useEffect(() => {
    console.log('App useEffect 2');
    if (activeProject) {
      const activeStories = StoryService.getStoriesByProjectId(activeProject.id);
      setStories(activeStories);
      if (activeStories.length > 0) {
        setTasks(TaskService.getTasksByStoryId(activeStories[0].id));
      }
    }
  }, [activeProject]);

  const handleProjectSave = () => {
    setProjects(ProjectService.getAllProjects());
  };

  const handleStorySave = () => {
    if (activeProject) {
      const updatedStories = StoryService.getStoriesByProjectId(activeProject.id);
      setStories(updatedStories);
      setEditingStory(null);
    }
  };

  const handleTaskSave = () => {
    if (activeProject && editingStory) {
      setTasks(TaskService.getTasksByStoryId(editingStory.id));
      setEditingTask(null);
    }
  };

  const handleStoryEdit = (story: Story) => {
    setEditingStory(story);
    setTasks(TaskService.getTasksByStoryId(story.id));
  };

  const handleStoryDelete = (id: string) => {
    StoryService.deleteStory(id);
    if (activeProject) {
      setStories(StoryService.getStoriesByProjectId(activeProject.id));
    }
  };

  const handleTaskEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleTaskDelete = (id: string) => {
    TaskService.deleteTask(id);
    if (activeProject && editingStory) {
      setTasks(TaskService.getTasksByStoryId(editingStory.id));
    }
  };

  const handleSelectProject = useCallback((project: Project | null) => {
    console.log('handleSelectProject', project);
    setActiveProject(project);
    if (project) {
      setStories(StoryService.getStoriesByProjectId(project.id));
    } else {
      setStories([]);
      setTasks([]);
    }
  }, []);

  const handleLogin = (token: string, refreshToken: string) => {
    setToken(token);
    // Store refreshToken if needed
  };

  return (
    <div className="App">
      <h1>ManagMe</h1>
      {!token ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>
          <ProjectForm onSave={handleProjectSave} />
        <ProjectList projects={projects} onProjectSelect={handleProjectSave} />
          <ActiveProjectSelector onSelectProject={handleSelectProject} />
          {activeProject && (
            <>
              <h2>Stories for {activeProject.name}</h2>
              <StoryForm story={editingStory} onSave={handleStorySave} />
              <StoryList stories={stories} onDelete={handleStoryDelete} onEdit={handleStoryEdit} />
              {editingStory && (
                <>
                  <h2>Tasks for {editingStory.name}</h2>
                  <TaskForm task={editingTask} storyId={editingStory.id} onSave={handleTaskSave} />
                  <KanbanBoard tasks={tasks} onDelete={handleTaskDelete} onEdit={handleTaskEdit} />
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default App;