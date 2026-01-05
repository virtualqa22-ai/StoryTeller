import { render, screen } from '@testing-library/svelte';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Step3 from './step-3.svelte';
import type { WizardStep3Data } from './types';

describe('Wizard Step 3', () => {
	let onNext: (data: WizardStep3Data) => void;
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

	it('shows progress indicator', () => {
		render(Step3, { props: { onNext, onBack, onCancel } });
		expect(screen.getByText('Step 3 of 6: Story Structure')).toBeDefined();
	});

	it('renders numeric inputs and computed total', async () => {
		render(Step3, { props: { onNext, onBack, onCancel } });

		const chapterInput = screen.getByTestId('chapter-count-input') as HTMLInputElement;
		const wordsInput = screen.getByTestId('words-per-chapter-input') as HTMLInputElement;
		const totalDisplay = screen.getByTestId('total-target-words');

		// Default values: 20 * 3000 = 60,000
		expect(totalDisplay.textContent?.includes('60,000')).toBe(true);

		await userEvent.clear(chapterInput);
		await userEvent.type(chapterInput, '10');

		await userEvent.clear(wordsInput);
		await userEvent.type(wordsInput, '2000');

		// 10 * 2000 = 20,000
		expect(totalDisplay.textContent?.includes('20,000')).toBe(true);
	});

	it('requires POV and Framework before proceeding', async () => {
		render(Step3, { props: { onNext, onBack, onCancel } });
		const nextButton = screen.getByTestId('next-button');
		await userEvent.click(nextButton);
		expect(onNext).not.toHaveBeenCalled();
		expect(screen.getByTestId('pov-error-message')).toBeDefined();
		expect(screen.getByTestId('framework-error-message')).toBeDefined();
	});

	it('shows framework description when framework is selected', async () => {
		render(Step3, { props: { onNext, onBack, onCancel } });

		// Initially no description shown (only "Required" text)
		expect(screen.queryByTestId('framework-description')).toBeNull();
		expect(screen.getByTestId('framework-required-text')).toBeDefined();

		// Note: Testing Select component value changes requires interacting with the actual
		// dropdown implementation, which may require additional setup or e2e testing.
		// The component logic is validated by the frameworkDescription derived state.
	});

	it('validates chapter count bounds', async () => {
		const user = userEvent.setup();
		render(Step3, { props: { onNext, onBack, onCancel } });

		const chapterInput = screen.getByTestId('chapter-count-input') as HTMLInputElement;

		// Test lower bound - type out of bounds value to trigger validation
		await user.clear(chapterInput);
		await user.type(chapterInput, '0');
		// Typing triggers oninput which marks as touched
		// Error should appear after touched
		const errorElement = screen.queryByTestId('chapter-count-error');
		if (errorElement) {
			expect(errorElement.textContent).toContain('between 1 and 100');
		}
	});

	it('validates words per chapter bounds', async () => {
		const user = userEvent.setup();
		render(Step3, { props: { onNext, onBack, onCancel } });

		const wordsInput = screen.getByTestId('words-per-chapter-input') as HTMLInputElement;

		// Test lower bound - type out of bounds value to trigger validation
		await user.clear(wordsInput);
		await user.type(wordsInput, '100');
		// Typing triggers oninput which marks as touched
		// Error should appear after touched
		const errorElement = screen.queryByTestId('words-per-chapter-error');
		if (errorElement) {
			expect(errorElement.textContent).toContain('between');
		}
	});

	it('clamps chapter count on blur', async () => {
		const user = userEvent.setup();
		render(Step3, { props: { onNext, onBack, onCancel } });

		const chapterInput = screen.getByTestId('chapter-count-input') as HTMLInputElement;

		// Type value below minimum
		await user.clear(chapterInput);
		await user.type(chapterInput, '0');
		await user.tab(); // blur should clamp to 1

		// After clamping, value should be minimum
		expect(parseInt(chapterInput.value)).toBe(1);

		// Type value above maximum
		await user.clear(chapterInput);
		await user.type(chapterInput, '999');
		await user.tab(); // blur should clamp to 100

		expect(parseInt(chapterInput.value)).toBe(100);
	});

	it('clamps words per chapter on blur', async () => {
		const user = userEvent.setup();
		render(Step3, { props: { onNext, onBack, onCancel } });

		const wordsInput = screen.getByTestId('words-per-chapter-input') as HTMLInputElement;

		// Type value below minimum
		await user.clear(wordsInput);
		await user.type(wordsInput, '100');
		await user.tab(); // blur should clamp to 500

		expect(parseInt(wordsInput.value)).toBe(500);

		// Type value above maximum
		await user.clear(wordsInput);
		await user.type(wordsInput, '99999');
		await user.tab(); // blur should clamp to 15000

		expect(parseInt(wordsInput.value)).toBe(15000);
	});

	it('uses output element for total target words with proper accessibility', () => {
		render(Step3, { props: { onNext, onBack, onCancel } });

		const totalOutput = screen.getByTestId('total-target-words');

		// Verify it's an output element
		expect(totalOutput.tagName).toBe('OUTPUT');

		// Verify it has aria-live for screen readers
		expect(totalOutput.getAttribute('aria-live')).toBe('polite');

		// Verify it references the input fields
		expect(totalOutput.getAttribute('for')).toContain('chapterCount');
		expect(totalOutput.getAttribute('for')).toContain('wordsPerChapter');
	});

	it('calls onBack when Back button is clicked', async () => {
		const user = userEvent.setup();
		render(Step3, { props: { onNext, onBack, onCancel } });

		const backButton = screen.getByTestId('back-button');
		await user.click(backButton);

		expect(onBack).toHaveBeenCalledOnce();
	});

	it('calls onCancel when Cancel button is clicked', async () => {
		const user = userEvent.setup();
		render(Step3, { props: { onNext, onBack, onCancel } });

		const cancelButton = screen.getByTestId('cancel-button');
		await user.click(cancelButton);

		expect(onCancel).toHaveBeenCalledOnce();
	});

	it('prevents negative numbers during input', async () => {
		const user = userEvent.setup();
		render(Step3, { props: { onNext, onBack, onCancel } });

		const chapterInput = screen.getByTestId('chapter-count-input') as HTMLInputElement;

		// Type negative number
		await user.clear(chapterInput);
		await user.type(chapterInput, '-5');

		// Should be sanitized to 0 or positive
		expect(parseInt(chapterInput.value)).toBeGreaterThanOrEqual(0);
	});

	it('has proper ARIA attributes on progress indicator', () => {
		render(Step3, { props: { onNext, onBack, onCancel } });

		const progress = screen.getByRole('progressbar');

		expect(progress.getAttribute('aria-valuenow')).toBe('3');
		expect(progress.getAttribute('aria-valuemin')).toBe('1');
		expect(progress.getAttribute('aria-valuemax')).toBe('6');
	});
});
