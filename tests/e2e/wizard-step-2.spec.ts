import { test, expect } from '@playwright/test';

test.describe('Wizard Step 2 - Genre & Audience', () => {
	// All tests in this suite validate AC #1, #2, #3, #4
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.getByRole('button', { name: /create new project/i }).click();

		// Complete Step 1 to reach Step 2
		await page.getByTestId('novel-title-input').fill('Test Novel');
		await page.getByTestId('next-button').click();
	});

	// AC #1: Step 2 loads and displays progress indicator
	test('displays step 2 with progress indicator', async ({ page }) => {
		await expect(page.getByText('Step 2 of 6: Genre & Audience')).toBeVisible();
	});

	// AC #1: Shows all required fields
	test('shows genre and target audience fields', async ({ page }) => {
		// Genre field
		await expect(page.getByText('Genre')).toBeVisible();

		// Target Audience field
		await expect(page.getByText('Target Audience')).toBeVisible();

		// Tone field
		await expect(page.getByText('Tone (Optional)')).toBeVisible();
	});

	// AC #2: Subgenres hidden when no genre selected
	test('does not show subgenres when no genre selected', async ({ page }) => {
		await expect(page.getByText('Subgenres (Optional)')).not.toBeVisible();
	});

	// AC #2: Subgenres update when genre is selected
	test('updates subgenres when genre is selected', async ({ page }) => {
		// Select Fantasy genre
		const genreSelect = page.getByRole('button', { name: 'Select a genre' });
		await genreSelect.click();

		// Select Fantasy option
		await page.getByText('Fantasy').click();

		// Wait for subgenres to appear
		await expect(page.getByText('Subgenres (Optional)')).toBeVisible();
		await expect(page.getByText('High Fantasy')).toBeVisible();
		await expect(page.getByText('Urban Fantasy')).toBeVisible();
		await expect(page.getByText('Epic Fantasy')).toBeVisible();
		await expect(page.getByText('Dark Fantasy')).toBeVisible();
	});

	// AC #1: Tone field displays all 8 options
	test('displays all 8 tone options', async ({ page }) => {
		const tones = ['Dark', 'Light', 'Humorous', 'Serious', 'Suspenseful', 'Romantic', 'Adventurous', 'Philosophical'];

		for (const tone of tones) {
			await expect(page.getByText(tone)).toBeVisible();
		}
	});

	// AC #4: Genre validation - empty genre shows error
	test('validates genre is required', async ({ page }) => {
		// Try to proceed without genre
		await page.getByTestId('next-button').click();

		// Should show error
		await expect(page.getByText(/Please select at least a genre/)).toBeVisible();
	});

	// AC #4: Target audience validation - empty audience shows error
	test('validates target audience is required', async ({ page }) => {
		// First select a genre
		const genreSelect = page.getByRole('button', { name: 'Select a genre' });
		await genreSelect.click();
		await page.getByText('Fantasy').click();

		// Try to proceed without target audience
		await page.getByTestId('next-button').click();

		// Should show error
		await expect(page.getByText(/Please select target audience/)).toBeVisible();
	});

	// TODO: These tests will be implemented when Step 3 is available (Story 2.5)
	// AC #3: Navigation to Step 3 on valid form
	// test('navigates to step 3 with valid data', async ({ page }) => {
	//   await page.getByRole('button', { name: 'Select a genre' }).click();
	//   await page.getByText('Fantasy').click();

	//   const targetAudienceSelect = page.getByRole('button', { name: 'Select target audience' });
	//   await targetAudienceSelect.click();
	//   await page.getByText('Adult').click();

	//   // Accept the transition alert
	//   page.on('dialog', async (dialog) => {
	//     await dialog.accept();
	//   });

	//   await page.getByTestId('next-button').click();

	//   // Should be on Step 3
	//   await expect(page.getByText('Step 3 of 6: Story Structure')).toBeVisible();
	// });

	// AC #3: Back button navigates to Step 1
	test('back button navigates to step 1', async ({ page }) => {
		// Click back button
		await page.getByTestId('back-button').click();

		// Should be back on Step 1
		await expect(page.getByText('Step 1 of 6: Basic Information')).toBeVisible();
	});
});
