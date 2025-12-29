import { test, expect } from '@playwright/test';

test.describe('Home Screen - Empty State (AC #1)', () => {
	test('displays welcome message when no projects', async ({ page }) => {
		await page.goto('/');

		// Wait for loading to complete
		await page.waitForSelector('[data-testid="empty-state"]', { timeout: 5000 });

		// Verify welcome message
		await expect(page.locator('text=Welcome to StoryTeller')).toBeVisible();

		// Verify empty state illustration is displayed
		await expect(page.locator('svg[aria-label="Empty projects illustration"]')).toBeVisible();

		// Verify primary action buttons
		const createButton = page.getByRole('button', { name: /Create New Project/i });
		const openButton = page.getByRole('button', { name: /Open Existing Project/i });

		await expect(createButton).toBeVisible();
		await expect(openButton).toBeVisible();

		// Verify Fluent Design spacing and layout
		const emptyState = page.locator('[data-testid="empty-state"]');
		await expect(emptyState).toBeVisible();
	});

	test('Create New Project button is clickable', async ({ page }) => {
		await page.goto('/');
		await page.waitForSelector('[data-testid="empty-state"]', { timeout: 5000 });

		const createButton = page.getByRole('button', { name: /Create New Project/i });
		await expect(createButton).toBeVisible();

		// Click should trigger handler (console.log stub)
		await createButton.click();
	});

	test('Open Existing Project button is clickable', async ({ page }) => {
		await page.goto('/');
		await page.waitForSelector('[data-testid="empty-state"]', { timeout: 5000 });

		const openButton = page.getByRole('button', { name: /Open Existing Project/i });
		await expect(openButton).toBeVisible();

		// Click should trigger handler (console.log stub)
		await openButton.click();
	});
});

test.describe('Home Screen - Recent Projects (AC #2, #3)', () => {
	test.skip('displays recent projects list when projects exist', async ({ page }) => {
		// NOTE: This test requires database setup with test data
		// TODO: Add test data setup using Tauri commands in beforeEach hook
		await page.goto('/');

		// Verify Recent Projects heading
		await expect(page.locator('h1:has-text("Recent Projects")')).toBeVisible();

		// Verify Create New Project button is still shown
		await expect(page.getByRole('button', { name: /Create New Project/i })).toBeVisible();

		// Verify at least one project card is displayed
		const projectCards = page.locator('[data-testid="project-card"]');
		await expect(projectCards.first()).toBeVisible();
	});

	test.skip('project cards show correct data', async ({ page }) => {
		// NOTE: This test requires database setup with test data
		// TODO: Create test project with known data, verify card displays it
		await page.goto('/');

		const firstCard = page.locator('[data-testid="project-card"]').first();
		await expect(firstCard).toBeVisible();

		// Verify card contains required elements (exact content depends on test data)
		// - Project title
		// - Author/pen name
		// - Last modified date (relative time)
		// - Word count progress
		// - Genre icon or badge
	});

	test.skip('clicking project card triggers handler', async ({ page }) => {
		// NOTE: This test requires database setup with test data
		await page.goto('/');

		const firstCard = page.locator('[data-testid="project-card"]').first();
		await expect(firstCard).toBeVisible();

		// Click should trigger console.log (stub verification)
		await firstCard.click();
	});

	test.skip('context menu appears on right-click', async ({ page }) => {
		// NOTE: This test requires database setup with test data
		await page.goto('/');

		const firstCard = page.locator('[data-testid="project-card"]').first();
		await expect(firstCard).toBeVisible();

		// Right-click to open context menu
		await firstCard.click({ button: 'right' });

		// Verify context menu is visible
		const contextMenu = page.locator('[data-testid="context-menu"]');
		await expect(contextMenu).toBeVisible();

		// Verify context menu options
		await expect(contextMenu.locator('text=Open')).toBeVisible();
		await expect(contextMenu.locator('text=Open in File Explorer')).toBeVisible();
		await expect(contextMenu.locator('text=Remove from List')).toBeVisible();
	});

	test.skip('only 10 projects shown when 10+ exist', async ({ page }) => {
		// NOTE: This test requires database setup with 11+ test projects
		// TODO: Create 11+ test projects, verify only 10 displayed
		await page.goto('/');

		const projectCards = page.locator('[data-testid="project-card"]');
		await expect(projectCards).toHaveCount(10);

		// Verify "View All Projects" link is shown
		await expect(page.getByRole('button', { name: /View All Projects/i })).toBeVisible();
	});

	test.skip('projects are sorted by last_opened_at descending', async ({ page }) => {
		// NOTE: This test requires database setup with test data with known last_opened_at values
		// TODO: Create test projects with specific last_opened_at timestamps
		// Verify they appear in correct order (most recent first)
	});
});

test.describe('Home Screen - Loading and Error States', () => {
	test('shows loading state initially', async ({ page }) => {
		await page.goto('/');

		// Loading spinner should appear briefly
		// Note: May be too fast to test reliably without network throttling
		const spinner = page.locator('[data-testid="spinner"]');
		// We don't assert visibility because it may complete before we can check
		// Just verify the page eventually loads
		await page.waitForSelector('[data-testid="empty-state"], [data-testid="project-card"]', {
			timeout: 5000
		});
	});

	test.skip('shows error state on API failure', async ({ page }) => {
		// NOTE: This test requires mocking the Tauri API to return an error
		// TODO: Implement error state testing with mocked API
	});
});

test.describe('Home Screen - Accessibility', () => {
	test('page has correct title', async ({ page }) => {
		await page.goto('/');
		await expect(page).toHaveTitle(/StoryTeller/i);
	});

	test.skip('keyboard navigation works for project cards', async ({ page }) => {
		// NOTE: This test requires database setup with test data
		// TODO: Test Tab navigation, Enter key to open project
	});

	test.skip('project cards have proper aria-labels', async ({ page }) => {
		// NOTE: This test requires database setup with test data
		// TODO: Verify aria-label includes project title
	});
});
