import { render, screen } from '@testing-library/svelte';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Step1 from './step-1.svelte';
import type { WizardStep1Data } from './types';

describe('Wizard Step 1', () => {
	let onNext: (data: WizardStep1Data) => void;
	let onCancel: () => void;

	beforeEach(() => {
		onNext = vi.fn();
		onCancel = vi.fn();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('renders all form fields', () => {
		render(Step1, { props: { onNext, onCancel } });

		expect(screen.getByLabelText('Novel Title')).toBeDefined();
		expect(screen.getByLabelText('Author Name')).toBeDefined();
		expect(screen.getByLabelText('Pen Name')).toBeDefined();
		expect(screen.getByLabelText('Tagline')).toBeDefined();
		expect(screen.getByTestId('next-button')).toBeDefined();
		expect(screen.getByTestId('cancel-button')).toBeDefined();
	});

	it('shows progress indicator', () => {
		render(Step1, { props: { onNext, onCancel } });
		expect(screen.getByText('Step 1 of 6: Basic Information')).toBeDefined();
	});

	it('shows required indicator for title field', () => {
		render(Step1, { props: { onNext, onCancel } });
		expect(screen.getByText('Required')).toBeDefined();
	});

	it('enforces title max length', async () => {
		render(Step1, { props: { onNext, onCancel } });
		const titleInput = screen.getByTestId('novel-title-input') as HTMLInputElement;

		await userEvent.type(titleInput, 'A'.repeat(250));

		expect(titleInput.value).toHaveLength(200);
	});

	it('shows character counter for title', async () => {
		render(Step1, { props: { onNext, onCancel } });
		const titleInput = screen.getByTestId('novel-title-input') as HTMLInputElement;

		await userEvent.type(titleInput, 'My Novel');

		expect(screen.getByTestId('title-counter')).toBeDefined();
	});

	it('shows character counter for tagline', async () => {
		render(Step1, { props: { onNext, onCancel } });
		const taglineInput = screen.getByTestId('tagline-input') as HTMLInputElement;

		await userEvent.type(taglineInput, 'A test tagline');

		expect(screen.getByTestId('tagline-counter')).toBeDefined();
	});

	it('emits onCancel when Cancel clicked', async () => {
		render(Step1, { props: { onNext, onCancel } });
		const cancelButton = screen.getByTestId('cancel-button');

		await userEvent.click(cancelButton);

		expect(onCancel).toHaveBeenCalled();
	});

	it('does not emit onNext when title is empty', async () => {
		render(Step1, { props: { onNext, onCancel } });
		const nextButton = screen.getByTestId('next-button');

		await userEvent.click(nextButton);

		expect(onNext).not.toHaveBeenCalled();
	});

	it('shows error message when trying to proceed with empty title', async () => {
		render(Step1, { props: { onNext, onCancel } });
		const nextButton = screen.getByTestId('next-button');

		await userEvent.click(nextButton);

		expect(screen.getByText(/Novel Title is required/)).toBeDefined();
	});

	it('emits onNext with valid title', async () => {
		render(Step1, { props: { onNext, onCancel } });
		const titleInput = screen.getByTestId('novel-title-input') as HTMLInputElement;
		const nextButton = screen.getByTestId('next-button');

		await userEvent.type(titleInput, 'My Novel Title');
		await userEvent.click(nextButton);

		expect(onNext).toHaveBeenCalledWith({
			title: 'My Novel Title',
			authorName: null,
			penName: null,
			tagline: null
		} satisfies WizardStep1Data);
	});

	it('emits onNext with all fields filled', async () => {
		render(Step1, { props: { onNext, onCancel } });
		const nextButton = screen.getByTestId('next-button');

		await userEvent.type(screen.getByTestId('novel-title-input'), 'My Novel');
		await userEvent.type(screen.getByTestId('author-name-input'), 'John Doe');
		await userEvent.type(screen.getByTestId('pen-name-input'), 'J. D. Writer');
		await userEvent.type(screen.getByTestId('tagline-input'), 'A great adventure');
		await userEvent.click(nextButton);

		expect(onNext).toHaveBeenCalledWith({
			title: 'My Novel',
			authorName: 'John Doe',
			penName: 'J. D. Writer',
			tagline: 'A great adventure'
		} satisfies WizardStep1Data);
	});

	it('clears error when title is entered', async () => {
		render(Step1, { props: { onNext, onCancel } });
		const nextButton = screen.getByTestId('next-button');
		const titleInput = screen.getByTestId('novel-title-input') as HTMLInputElement;

		// Try to proceed without title
		await userEvent.click(nextButton);
		expect(screen.getByText(/Novel Title is required/)).toBeDefined();

		// Enter title
		await userEvent.type(titleInput, 'My Novel');
		expect(screen.queryByText(/Novel Title is required/)).toBeNull();
	});
});
