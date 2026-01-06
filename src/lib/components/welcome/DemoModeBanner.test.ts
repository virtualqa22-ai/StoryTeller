import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import DemoModeBanner from './DemoModeBanner.svelte';

describe('DemoModeBanner', () => {
  it('shows the demo mode banner', () => {
    render(DemoModeBanner, {
      props: {
        onExitDemo: vi.fn()
      }
    });

    expect(
      screen.getByText(
        "You're viewing a demo project. Ready to create your own?"
      )
    ).toBeTruthy();
  });

  it('calls onExitDemo when "Create Project" link is clicked', async () => {
    const mockOnExitDemo = vi.fn();

    render(DemoModeBanner, {
      props: {
        onExitDemo: mockOnExitDemo
      }
    });

    const createProjectLink = screen.getByTestId('create-project-from-demo');
    
    // Try different approaches to trigger the click
    await fireEvent.click(createProjectLink);
    
    // Add a small delay to let the event propagate
    await new Promise(resolve => setTimeout(resolve, 10));
    
    expect(mockOnExitDemo).toHaveBeenCalledTimes(1);
  });

  it('dismisses the banner when close button is clicked', async () => {
    render(DemoModeBanner, {
      props: {
        onExitDemo: vi.fn()
      }
    });

    const closeBtn = screen.getByTestId('dismiss-demo-banner');
    await fireEvent.click(closeBtn);

    // Check that the banner is no longer present after a small delay
    await new Promise(resolve => setTimeout(resolve, 10));
    
    expect(screen.queryByTestId('demo-mode-banner')).toBeNull();
  });
});