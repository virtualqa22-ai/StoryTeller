import { render, screen } from '@testing-library/svelte';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Step4 from './step-4.svelte';
import type { WizardStep4Data } from './types';

describe('Step 4: Plot Premise', () => {
	let mockOnNext: (data: WizardStep4Data) => void;
	let mockOnBack: () => void;
	let mockOnCancel: () => void;

	beforeEach(() => {
		mockOnNext = vi.fn();
		mockOnBack = vi.fn();
		mockOnCancel = vi.fn();
	});

	const getDefaultProps = () => ({
		onNext: mockOnNext,
		onBack: mockOnBack,
		onCancel: mockOnCancel
	});

	it('renders progress indicator with correct text and ARIA attributes', () => {
		render(Step4, { props: getDefaultProps() });

		const progress = screen.getByRole('progressbar');
		expect(progress).toBeDefined();
		expect(progress.getAttribute('aria-label')).toBe('Step 4 of 6: Plot Premise');
		expect(progress.getAttribute('aria-valuenow')).toBe('4');
		expect(progress.getAttribute('aria-valuemin')).toBe('1');
		expect(progress.getAttribute('aria-valuemax')).toBe('6');
		expect(screen.getByText('Step 4 of 6: Plot Premise')).toBeDefined();
	});

	it('renders plot premise textarea with label and placeholder', () => {
		render(Step4, { props: getDefaultProps() });

		const textarea = screen.getByTestId('plot-premise-textarea') as HTMLTextAreaElement;
		expect(textarea).toBeDefined();
		expect(textarea.placeholder).toContain('Describe your story\'s main plot in 2-3 paragraphs');
	});

	it('displays character counter with format X / 2000 characters', () => {
		render(Step4, { props: getDefaultProps() });

		const counter = screen.getByTestId('character-counter');
		expect(counter).toBeDefined();
		expect(counter.textContent).toBe('0 / 2000 characters');
	});

	it('updates character counter as user types', async () => {
		const user = userEvent.setup();
		render(Step4, { props: getDefaultProps() });

		const textarea = screen.getByTestId('plot-premise-textarea') as HTMLTextAreaElement;
		await user.type(textarea, 'This is a test plot premise.');

		const counter = screen.getByTestId('character-counter');
		expect(counter.textContent).toBe('28 / 2000 characters');
	});

	it('changes counter color to amber at 1800 characters', async () => {
		const user = userEvent.setup();
		render(Step4, { props: getDefaultProps() });

		const textarea = screen.getByTestId('plot-premise-textarea') as HTMLTextAreaElement;
		const longText = 'a'.repeat(1800);
		await user.click(textarea);
		await user.paste(longText);

		const counter = screen.getByTestId('character-counter');
		expect(counter.className).toContain('text-amber');
	});

	it('changes counter color to red at 1950 characters', async () => {
		const user = userEvent.setup();
		render(Step4, { props: getDefaultProps() });

		const textarea = screen.getByTestId('plot-premise-textarea') as HTMLTextAreaElement;
		const longText = 'a'.repeat(1950);
		await user.click(textarea);
		await user.paste(longText);

		const counter = screen.getByTestId('character-counter');
		expect(counter.className).toContain('text-destructive');
	});

	it('enforces 2000 character maximum limit', () => {
		render(Step4, { props: getDefaultProps() });

		const textarea = screen.getByTestId('plot-premise-textarea') as HTMLTextAreaElement;
		expect(textarea.maxLength).toBe(2000);
	});

	it('advances to Step 5 when Next clicked with ≥100 characters', async () => {
		const user = userEvent.setup();
		render(Step4, { props: getDefaultProps() });

		const textarea = screen.getByTestId('plot-premise-textarea') as HTMLTextAreaElement;
		const validText = 'a'.repeat(100);
		await user.click(textarea);
		await user.paste(validText);

		const nextButton = screen.getByTestId('next-button');
		await user.click(nextButton);

		expect(mockOnNext).toHaveBeenCalledWith({ plotPremise: validText });
	});

	it('shows inline warning when Next clicked with <100 characters', async () => {
		const user = userEvent.setup();
		render(Step4, { props: getDefaultProps() });

		const textarea = screen.getByTestId('plot-premise-textarea') as HTMLTextAreaElement;
		await user.type(textarea, 'Short text');

		const nextButton = screen.getByTestId('next-button');
		await user.click(nextButton);

		const warning = screen.getByTestId('plot-premise-warning');
		expect(warning).toBeDefined();
		expect(warning.textContent).toContain('We recommend at least 100 characters');
		expect(warning.textContent).toContain('Continue anyway?');
		expect(mockOnNext).not.toHaveBeenCalled();
	});

	it('does not show warning initially', () => {
		render(Step4, { props: getDefaultProps() });

		const warning = screen.queryByTestId('plot-premise-warning');
		expect(warning).toBeNull();
	});

	it('warning has "Go Back to Edit" button that dismisses warning and focuses textarea', async () => {
		const user = userEvent.setup();
		render(Step4, { props: getDefaultProps() });

		const textarea = screen.getByTestId('plot-premise-textarea') as HTMLTextAreaElement;
		await user.type(textarea, 'Short');

		const nextButton = screen.getByTestId('next-button');
		await user.click(nextButton);

		const goBackButton = screen.getByTestId('warning-go-back-button');
		expect(goBackButton).toBeDefined();
		expect(goBackButton.textContent).toContain('Go Back to Edit');

		await user.click(goBackButton);

		const warning = screen.queryByTestId('plot-premise-warning');
		expect(warning).toBeNull();
		expect(document.activeElement).toBe(textarea);
	});

	it('warning has "Continue Anyway" button that advances to Step 5', async () => {
		const user = userEvent.setup();
		render(Step4, { props: getDefaultProps() });

		const textarea = screen.getByTestId('plot-premise-textarea') as HTMLTextAreaElement;
		const shortText = 'Short';
		await user.type(textarea, shortText);

		const nextButton = screen.getByTestId('next-button');
		await user.click(nextButton);

		const continueButton = screen.getByTestId('warning-continue-button');
		expect(continueButton).toBeDefined();
		expect(continueButton.textContent).toContain('Continue Anyway');

		await user.click(continueButton);

		expect(mockOnNext).toHaveBeenCalledWith({ plotPremise: shortText });
	});

	it('calls onBack when Back button clicked', async () => {
		const user = userEvent.setup();
		render(Step4, { props: getDefaultProps() });

		const backButton = screen.getByTestId('back-button');
		await user.click(backButton);

		expect(mockOnBack).toHaveBeenCalled();
	});

	it('calls onCancel when Cancel button clicked', async () => {
		const user = userEvent.setup();
		render(Step4, { props: getDefaultProps() });

		const cancelButton = screen.getByTestId('cancel-button');
		await user.click(cancelButton);

		expect(mockOnCancel).toHaveBeenCalled();
	});
});
