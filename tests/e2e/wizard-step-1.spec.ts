import { test, expect } from '@playwright/test';

test.describe('Wizard Step 1', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('opens wizard modal from home screen', async ({ page }) => {
		await page.getByRole('button', { name: /create new project/i }).click();
		await expect(page.getByTestId('wizard-dialog')).toBeVisible();
		await expect(page.getByText('Step 1 of 6: Basic Information')).toBeVisible();
	});

	test('displays all form fields', async ({ page }) => {
		await page.getByRole('button', { name: /create new project/i }).click();

		await expect(page.getByTestId('novel-title-input')).toBeVisible();
		await expect(page.getByTestId('author-name-input')).toBeVisible();
		await expect(page.getByTestId('pen-name-input')).toBeVisible();
		await expect(page.getByTestId('tagline-input')).toBeVisible();
		await expect(page.getByTestId('cancel-button')).toBeVisible();
		await expect(page.getByTestId('next-button')).toBeVisible();
	});

	test('validates required title field', async ({ page }) => {
		await page.getByRole('button', { name: /create new project/i }).click();
		await page.getByTestId('next-button').click();

		await expect(page.getByText('Novel Title is required')).toBeVisible();
		const titleInput = page.getByTestId('novel-title-input');
		await expect(titleInput).toBeFocused();
	});

	test('clears error when title is entered', async ({ page }) => {
		await page.getByRole('button', { name: /create new project/i }).click();
		await page.getByTestId('next-button').click();

		await expect(page.getByText('Novel Title is required')).toBeVisible();

		await page.getByTestId('novel-title-input').fill('My Novel');
		await expect(page.getByText('Novel Title is required')).not.toBeVisible();
	});

	test('shows character counter for title', async ({ page }) => {
		await page.getByRole('button', { name: /create new project/i }).click();
		const titleInput = page.getByTestId('novel-title-input');

		await titleInput.fill('My Novel');

		await expect(page.getByText('8 / 200')).toBeVisible();
	});

	test('shows character counter for tagline', async ({ page }) => {
		await page.getByRole('button', { name: /create new project/i }).click();
		const taglineInput = page.getByTestId('tagline-input');

		await taglineInput.fill('A test tagline');

		await expect(page.getByText('15 / 150')).toBeVisible();
	});

	test('enforces max length on title', async ({ page }) => {
		await page.getByRole('button', { name: /create new project/i }).click();
		const titleInput = page.getByTestId('novel-title-input');

		// Try to type more than 200 characters
		await titleInput.fill('A'.repeat(250));

		const value = await titleInput.inputValue();
		expect(value).toHaveLength(200);
	});

	test('enforces max length on tagline', async ({ page }) => {
		await page.getByRole('button', { name: /create new project/i }).click();
		const taglineInput = page.getByTestId('tagline-input');

		// Try to type more than 150 characters
		await taglineInput.fill('A'.repeat(200));

		const value = await taglineInput.inputValue();
		expect(value).toHaveLength(150);
	});

	test('closes modal on Cancel', async ({ page }) => {
		await page.getByRole('button', { name: /create new project/i }).click();
		await expect(page.getByTestId('wizard-dialog')).toBeVisible();

		await page.getByTestId('cancel-button').click();

		await expect(page.getByTestId('wizard-dialog')).not.toBeVisible();
	});

	test('closes modal on Escape key', async ({ page }) => {
		await page.getByRole('button', { name: /create new project/i }).click();
		await expect(page.getByTestId('wizard-dialog')).toBeVisible();

		await page.keyboard.press('Escape');

		await expect(page.getByTestId('wizard-dialog')).not.toBeVisible();
	});

	test('closes modal on X close button', async ({ page }) => {
		await page.getByRole('button', { name: /create new project/i }).click();
		await expect(page.getByTestId('wizard-dialog')).toBeVisible();

		// Click the X close button
		const closeButton = page.getByRole('button', { name: 'Close' });
		await closeButton.click();

		await expect(page.getByTestId('wizard-dialog')).not.toBeVisible();
	});

	test('allows next with valid title', async ({ page }) => {
		await page.getByRole('button', { name: /create new project/i }).click();

		await page.getByTestId('novel-title-input').fill('My Novel Title');

		// Accept the alert that appears on Next click
		page.on('dialog', async (dialog) => {
			expect(dialog.message()).toBe('Step 1 complete! Step 2 coming in Story 2.4.');
			await dialog.accept();
		});

		await page.getByTestId('next-button').click();

		// Dialog should close after accepting alert
		await expect(page.getByTestId('wizard-dialog')).not.toBeVisible();
	});

	test('shows required indicator initially', async ({ page }) => {
		await page.getByRole('button', { name: /create new project/i }).click();

		await expect(page.getByText('Required')).toBeVisible();
	});

	test('red border on title field when empty and validated', async ({ page }) => {
		await page.getByRole('button', { name: /create new project/i }).click();
		await page.getByTestId('next-button').click();

		const titleInput = page.getByTestId('novel-title-input');
		// Check for destructive border class
		const classes = await titleInput.getAttribute('class');
		expect(classes).toContain('border-destructive');
	});

	test('all optional fields can be filled', async ({ page }) => {
		await page.getByRole('button', { name: /create new project/i }).click();

		await page.getByTestId('novel-title-input').fill('My Novel');
		await page.getByTestId('author-name-input').fill('John Doe');
		await page.getByTestId('pen-name-input').fill('J. D. Writer');
		await page.getByTestId('tagline-input').fill('A great adventure');

		// Verify all fields have values
		expect(await page.getByTestId('author-name-input').inputValue()).toBe('John Doe');
		expect(await page.getByTestId('pen-name-input').inputValue()).toBe('J. D. Writer');
		expect(await page.getByTestId('tagline-input').inputValue()).toBe('A great adventure');
	});
});
