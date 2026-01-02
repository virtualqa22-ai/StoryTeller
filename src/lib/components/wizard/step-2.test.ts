import { render, screen } from '@testing-library/svelte';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Step2 from './step-2.svelte';
import type { WizardStep2Data } from './types';

describe('Wizard Step 2', () => {
	let onNext: (data: WizardStep2Data) => void;
	let onBack: () => void;
	let onCancel: () => void;

	beforeEach(() => {
		onNext = vi.fn();
		onBack = vi.fn();
		onCancel = vi.fn();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	// AC #1: Step 2 displays with all required fields
	it('renders all form fields', () => {
		render(Step2, { props: { onNext, onBack, onCancel } });

		expect(screen.getByText('Genre')).toBeDefined();
		expect(screen.getByText('Target Audience')).toBeDefined();
		expect(screen.getByText('Tone (Optional)')).toBeDefined();
		expect(screen.getByTestId('next-button')).toBeDefined();
		expect(screen.getByTestId('back-button')).toBeDefined();
		expect(screen.getByTestId('cancel-button')).toBeDefined();
	});

	// AC #1: Progress indicator shows "Step 2 of 6: Genre & Audience"
	it('shows progress indicator', () => {
		render(Step2, { props: { onNext, onBack, onCancel } });
		expect(screen.getByText('Step 2 of 6: Genre & Audience')).toBeDefined();
	});

	// AC #1: Required field indicators displayed
	it('shows required indicators for genre and target audience', () => {
		render(Step2, { props: { onNext, onBack, onCancel } });
		expect(screen.getByTestId('genre-required-text')).toBeDefined();
		expect(screen.getByTestId('target-audience-required-text')).toBeDefined();
	});

	// AC #2: Subgenres hidden when no genre selected
	it('does not show subgenres when no genre selected', () => {
		render(Step2, { props: { onNext, onBack, onCancel } });
		expect(screen.queryByText('Subgenres (Optional)')).toBeNull();
	});

	// TODO: Skip Select interaction tests due to jsdom compatibility issues with bits-ui Select component
	// These tests need to be run as E2E tests instead
	// AC #2: Subgenres update when genre selected
	test.skip('shows subgenres after genre is selected', async () => {
		render(Step2, { props: { onNext, onBack, onCancel } });

		// Select Fantasy genre - find by placeholder text since data-testid not exposed
		const genreSelect = screen.getByRole('button', { name: 'Select a genre' });
		await userEvent.click(genreSelect);

		const fantasyOption = screen.getByText('Fantasy');
		await userEvent.click(fantasyOption);

		// Verify subgenres are now visible
		expect(screen.getByText('Subgenres (Optional)')).toBeDefined();
	});

	// AC #2: Fantasy genre shows 6 subgenres
	test.skip('updates subgenre options when genre changes to Fantasy', async () => {
		render(Step2, { props: { onNext, onBack, onCancel } });

		const genreSelect = screen.getByRole('button', { name: 'Select a genre' });
		await userEvent.click(genreSelect);
		await userEvent.click(screen.getByText('Fantasy'));

		// Check Fantasy subgenres
		expect(screen.getByText('High Fantasy')).toBeDefined();
		expect(screen.getByText('Urban Fantasy')).toBeDefined();
		expect(screen.getByText('Epic Fantasy')).toBeDefined();
		expect(screen.getByText('Dark Fantasy')).toBeDefined();
		expect(screen.getByText('Sword & Sorcery')).toBeDefined();
		expect(screen.getByText('Magical Realism')).toBeDefined();
	});

	// AC #2: Subgenres change when genre changes
	test.skip('updates subgenre options when genre changes to Thriller', async () => {
		render(Step2, { props: { onNext, onBack, onCancel } });

		// Select Fantasy first
		const genreSelect = screen.getByRole('button', { name: 'Select a genre' });
		await userEvent.click(genreSelect);
		await userEvent.click(screen.getByText('Fantasy'));

		// Change to Thriller
		await userEvent.click(genreSelect);
		await userEvent.click(screen.getByText('Thriller'));

		// Check Thriller subgenres
		expect(screen.getByText('Psychological Thriller')).toBeDefined();
		expect(screen.getByText('Legal Thriller')).toBeDefined();
		expect(screen.getByText('Spy Thriller')).toBeDefined();
		expect(screen.getByText('Action Thriller')).toBeDefined();
		expect(screen.getByText('Medical Thriller')).toBeDefined();
	});

	// AC #2: Subgenres clear when genre changes
	test.skip('clears selected subgenres when genre changes', async () => {
		render(Step2, { props: { onNext, onBack, onCancel } });

		// Select Fantasy and a subgenre
		const genreSelect = screen.getByRole('button', { name: 'Select a genre' });
		await userEvent.click(genreSelect);
		await userEvent.click(screen.getByText('Fantasy'));

		const highFantasyCheckbox = screen.getByTestId('subgenre-checkbox-high-fantasy') as HTMLInputElement;
		await userEvent.click(highFantasyCheckbox);

		// Verify checkbox is checked
		expect(highFantasyCheckbox.checked).toBe(true);

		// Change genre to Thriller
		await userEvent.click(genreSelect);
		await userEvent.click(screen.getByText('Thriller'));

		// Verify Fantasy subgenres are gone (checkbox no longer exists)
		expect(screen.queryByTestId('subgenre-checkbox-high-fantasy')).toBeNull();
	});

	// AC #2: Multiple subgenres can be selected
	test.skip('allows multiple subgenre selections', async () => {
		render(Step2, { props: { onNext, onBack, onCancel } });

		// Select Fantasy genre
		const genreSelect = screen.getByRole('button', { name: 'Select a genre' });
		await userEvent.click(genreSelect);
		await userEvent.click(screen.getByText('Fantasy'));

		// Select multiple subgenres
		const highFantasyCheckbox = screen.getByTestId('subgenre-checkbox-high-fantasy') as HTMLInputElement;
		const urbanFantasyCheckbox = screen.getByTestId('subgenre-checkbox-urban-fantasy') as HTMLInputElement;

		await userEvent.click(highFantasyCheckbox);
		await userEvent.click(urbanFantasyCheckbox);

		// Verify both are checked
		expect(highFantasyCheckbox.checked).toBe(true);
		expect(urbanFantasyCheckbox.checked).toBe(true);
	});

	// AC #1: Tone field displays all 8 options
	it('displays all 8 tone options', () => {
		render(Step2, { props: { onNext, onBack, onCancel } });

		expect(screen.getByText('Dark')).toBeDefined();
		expect(screen.getByText('Light')).toBeDefined();
		expect(screen.getByText('Humorous')).toBeDefined();
		expect(screen.getByText('Serious')).toBeDefined();
		expect(screen.getByText('Suspenseful')).toBeDefined();
		expect(screen.getByText('Romantic')).toBeDefined();
		expect(screen.getByText('Adventurous')).toBeDefined();
		expect(screen.getByText('Philosophical')).toBeDefined();
	});

	// AC #1: Multiple tones can be selected
	it('allows multiple tone selections', async () => {
		render(Step2, { props: { onNext, onBack, onCancel } });

		const darkCheckbox = screen.getByTestId('tone-checkbox-dark') as HTMLInputElement;
		const seriousCheckbox = screen.getByTestId('tone-checkbox-serious') as HTMLInputElement;

		await userEvent.click(darkCheckbox);
		await userEvent.click(seriousCheckbox);

		expect(darkCheckbox.checked).toBe(true);
		expect(seriousCheckbox.checked).toBe(true);
	});

	it('emits onCancel when Cancel clicked', async () => {
		render(Step2, { props: { onNext, onBack, onCancel } });
		const cancelButton = screen.getByTestId('cancel-button');

		await userEvent.click(cancelButton);

		expect(onCancel).toHaveBeenCalled();
	});

	it('emits onBack when Back clicked', async () => {
		render(Step2, { props: { onNext, onBack, onCancel } });
		const backButton = screen.getByTestId('back-button');

		await userEvent.click(backButton);

		expect(onBack).toHaveBeenCalled();
	});

	// AC #4: Validation prevents empty genre submission
	it('does not emit onNext when genre is not selected', async () => {
		render(Step2, { props: { onNext, onBack, onCancel } });
		const nextButton = screen.getByTestId('next-button');

		await userEvent.click(nextButton);

		expect(onNext).not.toHaveBeenCalled();
	});

	// AC #4: Error message shown when genre not selected
	it('shows error message when genre not selected', async () => {
		render(Step2, { props: { onNext, onBack, onCancel } });
		const nextButton = screen.getByTestId('next-button');

		await userEvent.click(nextButton);

		expect(onNext).not.toHaveBeenCalled();
	});

	// AC #4: Error message shown when genre not selected
	it('shows error message when genre not selected', async () => {
		render(Step2, { props: { onNext, onBack, onCancel } });
		const nextButton = screen.getByTestId('next-button');

		await userEvent.click(nextButton);

		expect(screen.getByText(/Please select at least a genre/)).toBeDefined();
	});

	// TODO: Skip due to jsdom compatibility with Select component
	// AC #4: Error message shown when target audience not selected
	test.skip('shows error message when target audience not selected', async () => {
		render(Step2, { props: { onNext, onBack, onCancel } });
		const nextButton = screen.getByTestId('next-button');

		// Select genre but not target audience
		const genreSelect = screen.getByRole('button', { name: 'Select a genre' });
		await userEvent.click(genreSelect);
		await userEvent.click(screen.getByText('Fantasy'));

		await userEvent.click(nextButton);

		expect(screen.getByText(/Please select target audience/)).toBeDefined();
	});

	// TODO: Skip due to jsdom compatibility with Select component
	// AC #3: onNext emits with required fields only
	test.skip('emits onNext with required fields only', async () => {
		render(Step2, { props: { onNext, onBack, onCancel } });
		const nextButton = screen.getByTestId('next-button');

		// Select genre
		const genreSelect = screen.getByRole('button', { name: 'Select a genre' });
		await userEvent.click(genreSelect);
		await userEvent.click(screen.getByText('Fantasy'));

		// Select target audience
		const targetAudienceSelect = screen.getByRole('button', { name: 'Select target audience' });
		await userEvent.click(targetAudienceSelect);
		await userEvent.click(screen.getByText('Adult'));

		await userEvent.click(nextButton);

		expect(onNext).toHaveBeenCalledWith({
			genre: 'Fantasy',
			subgenres: [],
			targetAudience: 'Adult',
			tones: []
		} satisfies WizardStep2Data);
	});

	// TODO: Skip due to jsdom compatibility with Select component
	// AC #3: onNext emits with all fields filled
	test.skip('emits onNext with all fields filled', async () => {
		render(Step2, { props: { onNext, onBack, onCancel } });
		const nextButton = screen.getByTestId('next-button');

		// Select genre
		const genreSelect = screen.getByRole('button', { name: 'Select a genre' });
		await userEvent.click(genreSelect);
		await userEvent.click(screen.getByText('Fantasy'));

		// Select subgenres
		await userEvent.click(screen.getByTestId('subgenre-checkbox-high-fantasy'));
		await userEvent.click(screen.getByTestId('subgenre-checkbox-epic-fantasy'));

		// Select target audience
		const targetAudienceSelect = screen.getByRole('button', { name: 'Select target audience' });
		await userEvent.click(targetAudienceSelect);
		await userEvent.click(screen.getByText('Young Adult (YA)'));

		// Select tones
		await userEvent.click(screen.getByTestId('tone-checkbox-dark'));
		await userEvent.click(screen.getByTestId('tone-checkbox-serious'));

		await userEvent.click(nextButton);

		expect(onNext).toHaveBeenCalledWith({
			genre: 'Fantasy',
			subgenres: ['High Fantasy', 'Epic Fantasy'],
			targetAudience: 'Young Adult (YA)',
			tones: ['Dark', 'Serious']
		} satisfies WizardStep2Data);
	});

	// TODO: Skip due to jsdom compatibility with Select component
	// AC #4: Error clears when genre is selected
	test.skip('clears error when genre is selected', async () => {
		render(Step2, { props: { onNext, onBack, onCancel } });
		const nextButton = screen.getByTestId('next-button');

		// Try to proceed without genre
		await userEvent.click(nextButton);
		expect(screen.getByText(/Please select at least a genre/)).toBeDefined();

		// Select genre
		const genreSelect = screen.getByRole('button', { name: 'Select a genre' });
		await userEvent.click(genreSelect);
		await userEvent.click(screen.getByText('Fantasy'));

		expect(screen.queryByText(/Please select at least a genre/)).toBeNull();
	});

	// TODO: Skip due to jsdom compatibility with Select component
	// AC #4: Error clears when target audience is selected
	test.skip('clears error when target audience is selected', async () => {
		render(Step2, { props: { onNext, onBack, onCancel } });
		const nextButton = screen.getByTestId('next-button');

		// Select genre first
		const genreSelect = screen.getByRole('button', { name: 'Select a genre' });
		await userEvent.click(genreSelect);
		await userEvent.click(screen.getByText('Fantasy'));

		// Try to proceed without target audience
		await userEvent.click(nextButton);
		expect(screen.getByText(/Please select target audience/)).toBeDefined();

		// Select target audience
		const targetAudienceSelect = screen.getByRole('button', { name: 'Select target audience' });
		await userEvent.click(targetAudienceSelect);
		await userEvent.click(screen.getByText('Adult'));

		expect(screen.queryByText(/Please select target audience/)).toBeNull();
	});
});
