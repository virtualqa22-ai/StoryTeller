import { render, fireEvent } from '@testing-library/svelte';
import { describe, test, expect, vi } from 'vitest';
import HomeScreen from '../../routes/+page.svelte';

// Mock Tauri invoke (not needed yet, but pattern for future)
vi.mock('@tauri-apps/api/core', () => ({
  invoke: vi.fn()
}));

test('displays welcome message', () => {
  const { getByText } = render(HomeScreen);
  const element = getByText(/Welcome to StoryTeller/i);
  expect(element).toBeTruthy();
  expect(element.textContent).toContain('Welcome to StoryTeller');
});

test('displays primary action buttons', () => {
  const { getByRole } = render(HomeScreen);
  const createButton = getByRole('button', { name: /Create New Project/i });
  const openButton = getByRole('button', { name: /Open Existing Project/i });
  expect(createButton).toBeTruthy();
  expect(openButton).toBeTruthy();
});

test('Create New Project button is rendered', () => {
  const { getByRole } = render(HomeScreen);
  const button = getByRole('button', { name: /Create New Project/i });
  expect(button).toBeTruthy();
});

test('Open Existing Project button is rendered', () => {
  const { getByRole } = render(HomeScreen);
  const button = getByRole('button', { name: /Open Existing Project/i });
  expect(button).toBeTruthy();
});

test('supports keyboard navigation (accessibility)', () => {
  const { getByRole } = render(HomeScreen);
  const button = getByRole('button', { name: /Create New Project/i });
  button.focus();
  expect(document.activeElement).toBe(button);
});
