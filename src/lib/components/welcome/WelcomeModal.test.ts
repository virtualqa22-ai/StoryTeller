import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import { tick } from 'svelte';
import WelcomeModal from './WelcomeModal.svelte';

describe('WelcomeModal', () => {
  beforeEach(() => {
    // Mock localStorage
    const localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders with correct title and description', async () => {
    render(WelcomeModal, {
      props: {
        isOpen: true,
        onCreateProject: vi.fn(),
        onExploreDemo: vi.fn(),
        onSkipTour: vi.fn(),
        onClose: vi.fn()
      }
    });

    expect(screen.getByText('Welcome to StoryTeller')).toBeTruthy();
    expect(
      screen.getByText(
        'StoryTeller helps you write consistent, high-quality novels with AI-powered assistance and intelligent Story Bible management.'
      )
    ).toBeTruthy();
  });

  it('shows action buttons', async () => {
    render(WelcomeModal, {
      props: {
        isOpen: true,
        onCreateProject: vi.fn(),
        onExploreDemo: vi.fn(),
        onSkipTour: vi.fn(),
        onClose: vi.fn()
      }
    });

    expect(screen.getByTestId('create-project-button')).toBeTruthy();
    expect(screen.getByTestId('explore-demo-button')).toBeTruthy();
    expect(screen.getByTestId('skip-tour-link')).toBeTruthy();
  });

  it('calls onCreateProject when "Create My First Project" is clicked', async () => {
    const mockOnCreateProject = vi.fn();
    const mockOnClose = vi.fn();

    render(WelcomeModal, {
      props: {
        isOpen: true,
        onCreateProject: mockOnCreateProject,
        onExploreDemo: vi.fn(),
        onSkipTour: vi.fn(),
        onClose: mockOnClose
      }
    });

    const createButton = screen.getByTestId('create-project-button');
    await fireEvent.click(createButton);

    expect(mockOnCreateProject).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onExploreDemo when "Explore Demo Project" is clicked', async () => {
    const mockOnExploreDemo = vi.fn();
    const mockOnClose = vi.fn();

    render(WelcomeModal, {
      props: {
        isOpen: true,
        onCreateProject: vi.fn(),
        onExploreDemo: mockOnExploreDemo,
        onSkipTour: vi.fn(),
        onClose: mockOnClose
      }
    });

    const exploreButton = screen.getByTestId('explore-demo-button');
    await fireEvent.click(exploreButton);

    expect(mockOnExploreDemo).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onSkipTour when "Skip Tour" link is clicked', async () => {
    const mockOnSkipTour = vi.fn();
    const mockOnClose = vi.fn();

    render(WelcomeModal, {
      props: {
        isOpen: true,
        onCreateProject: vi.fn(),
        onExploreDemo: vi.fn(),
        onSkipTour: mockOnSkipTour,
        onClose: mockOnClose
      }
    });

    const skipLink = screen.getByTestId('skip-tour-link');
    await fireEvent.click(skipLink);

    expect(mockOnSkipTour).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not render when isOpen is false', async () => {
    render(WelcomeModal, {
      props: {
        isOpen: false,
        onCreateProject: vi.fn(),
        onExploreDemo: vi.fn(),
        onSkipTour: vi.fn(),
        onClose: vi.fn()
      }
    });

    expect(screen.queryByText('Welcome to StoryTeller')).toBeNull();
  });
});