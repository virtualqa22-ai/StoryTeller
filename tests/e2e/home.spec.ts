import { test, expect } from '@playwright/test';

test.describe('Home Screen', () => {
  test('displays welcome message', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Welcome to StoryTeller')).toBeVisible();
  });

  test('Create New Project button is clickable', async ({ page }) => {
    await page.goto('/');

    const createButton = page.getByRole('button', { name: /Create New Project/i });
    await expect(createButton).toBeVisible();
    await createButton.click();

    // Verify placeholder message appears (from Story 1.2 implementation)
    await expect(page.locator('text=Project wizard coming soon')).toBeVisible();
  });

  test('page has correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/StoryTeller/i);
  });
});
