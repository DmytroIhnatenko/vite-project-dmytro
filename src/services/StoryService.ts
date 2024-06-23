import { Story } from '../types/index';

const STORIES_KEY = 'stories';

class StoryService {
  static getAllStories(): Story[] {
    const stories = localStorage.getItem(STORIES_KEY);
    return stories ? JSON.parse(stories) : [];
  }

  static getStoriesByProjectId(projectId: string): Story[] {
    const stories = this.getAllStories();
    return stories.filter(story => story.projectId === projectId);
  }

  static addStory(story: Story): void {
    const stories = this.getAllStories();
    stories.push(story);
    localStorage.setItem(STORIES_KEY, JSON.stringify(stories));
  }

  static updateStory(updatedStory: Story): void {
    let stories = this.getAllStories();
    stories = stories.map(story =>
      story.id === updatedStory.id ? updatedStory : story
    );
    localStorage.setItem(STORIES_KEY, JSON.stringify(stories));
  }

  static deleteStory(id: string): void {
    let stories = this.getAllStories();
    stories = stories.filter(story => story.id !== id);
    localStorage.setItem(STORIES_KEY, JSON.stringify(stories));
  }
}

export default StoryService;