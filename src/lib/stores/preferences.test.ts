import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { get } from 'svelte/store';

// Mock the Tauri API before importing anything that uses it
vi.mock('@tauri-apps/api/core', () => ({
  invoke: vi.fn().mockResolvedValue([])
}));

// Import after mocking
import { preferences } from '$lib/stores/preferences';

// Import the mocked invoke function
import { invoke } from '@tauri-apps/api/core';
const mockInvoke = vi.mocked(invoke);

describe('preferences store', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    
    // Reset the mock and set default return value
    mockInvoke.mockClear();
    mockInvoke.mockResolvedValue([]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with default values', async () => {
    await preferences.init();
    
    const state = get(preferences);
    expect(state).toHaveProperty('showWelcomeModal');
    expect(state).toHaveProperty('hasProjects');
  });

  it('shows welcome modal when skipWelcomeModal is not set and no projects exist', async () => {
    localStorage.removeItem('skipWelcomeModal');
    mockInvoke.mockResolvedValue([]); // No projects
    
    await preferences.init();
    
    const state = get(preferences);
    expect(state.showWelcomeModal).toBe(true);
  });

  it('does not show welcome modal when skipWelcomeModal is set', async () => {
    localStorage.setItem('skipWelcomeModal', 'true');
    mockInvoke.mockResolvedValue([]); // No projects
    
    await preferences.init();
    
    const state = get(preferences);
    expect(state.showWelcomeModal).toBe(false);
  });

  it('does not show welcome modal when projects exist', async () => {
    localStorage.removeItem('skipWelcomeModal');
    mockInvoke.mockResolvedValue([{ id: '1', name: 'Test Project' }]); // Has projects
    
    await preferences.init();
    
    const state = get(preferences);
    expect(state.showWelcomeModal).toBe(false);
  });

  it('updates showWelcomeModal when skipWelcome is called', async () => {
    localStorage.removeItem('skipWelcomeModal');
    mockInvoke.mockResolvedValue([]);
    
    await preferences.init();
    
    preferences.skipWelcome();
    
    const state = get(preferences);
    expect(state.showWelcomeModal).toBe(false);
    expect(localStorage.getItem('skipWelcomeModal')).toBe('true');
  });

  it('updates hasProjects when projectCreated is called', async () => {
    mockInvoke.mockResolvedValue([]);
    
    await preferences.init();
    
    preferences.projectCreated();
    
    const state = get(preferences);
    expect(state.hasProjects).toBe(true);
    expect(state.showWelcomeModal).toBe(false);
  });
});