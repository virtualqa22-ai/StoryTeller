import { writable, type Writable } from 'svelte/store';
import { invoke } from '@tauri-apps/api/core';

// Store for tracking if the welcome modal has been shown
const createPreferencesStore = () => {
  const { subscribe, set, update } = writable({
    showWelcomeModal: true, // Default to true
    hasProjects: false, // Will be updated based on project detection
  });

  return {
    subscribe,
    // Initialize the store with actual values
    init: async () => {
      try {
        // Check if user has chosen to skip the welcome modal permanently
        const skipWelcome = localStorage.getItem('skipWelcomeModal');
        const showWelcome = !skipWelcome;
        
        // Check if any projects exist
        let hasProjects = false;
        try {
          const projects: any[] = await invoke('list_projects');
          hasProjects = projects.length > 0;
        } catch (error) {
          console.warn('Could not fetch projects list:', error);
          // If we can't fetch projects, assume no projects exist
          hasProjects = false;
        }
        
        set({
          showWelcomeModal: showWelcome && !hasProjects, // Only show if no projects exist and user hasn't skipped
          hasProjects
        });
      } catch (error) {
        console.error('Error initializing preferences:', error);
        // Set default values on error
        set({
          showWelcomeModal: true,
          hasProjects: false
        });
      }
    },
    // Mark that the user wants to skip the welcome modal
    skipWelcome: () => {
      localStorage.setItem('skipWelcomeModal', 'true');
      update(state => ({
        ...state,
        showWelcomeModal: false
      }));
    },
    // Update when a project is created
    projectCreated: () => {
      update(state => ({
        ...state,
        hasProjects: true,
        showWelcomeModal: false // Don't show modal if projects exist
      }));
    }
  };
};

export const preferences = createPreferencesStore();