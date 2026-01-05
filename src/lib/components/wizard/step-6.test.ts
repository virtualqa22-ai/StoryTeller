import { render, screen } from '@testing-library/svelte';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Step6 from './step-6.svelte';
import type { WizardState, WizardStep6Data } from './types';

vi.mock('@tauri-apps/api/core', () => {
	return {
		invoke: vi.fn().mockResolvedValue({ id: 1 })
	};
});

describe('Step 6: Review & Create', () => {
	let onNext: (data: WizardStep6Data) => void;
	let onBack: () => void;
	let onCancel: () => void;
	let onEditStep: (stepNumber: 1 | 2 | 3 | 4 | 5) => void;

	beforeEach(() => {
		onNext = vi.fn();
		onBack = vi.fn();
		onCancel = vi.fn();
		onEditStep = vi.fn();
	});

	const buildWizardState = (languageCode: string): WizardState => ({
		currentStep: 6,
		step1Data: {
			title: 'Test Novel',
			authorName: '',
			penName: '',
			tagline: ''
		},
		step2Data: null,
		step3Data: {
			pointOfView: 'First Person',
			storyFramework: 'Three-Act Structure',
			chapterCount: 10,
			wordsPerChapter: 2000,
			totalTargetWords: 20000
		},
		step4Data: {
			plotPremise: 'A compelling premise',
			language: languageCode
		},
		step5Data: {
			aiProvider: null,
			apiKey: null,
			aiProviderSkipped: true
		},
		step6Data: {}
	});

	it('displays content language label derived from code when known', () => {
		const wizardState = buildWizardState('ja');
		render(Step6, { props: { onNext, onBack, onCancel, onEditStep, wizardState } });
		expect(screen.getByText('Content Language')).toBeDefined();
		expect(screen.getByText('Japanese')).toBeDefined();
	});

	it('includes language in project creation payload and calls onNext', async () => {
		const { invoke } = await import('@tauri-apps/api/core');
		const wizardState = buildWizardState('ja');
		render(Step6, { props: { onNext, onBack, onCancel, onEditStep, wizardState } });
		const createButton = screen.getByRole('button', { name: /Create Project/i });
		await userEvent.click(createButton);
		expect(invoke).toHaveBeenCalled();
		const calls = (invoke as any).mock.calls;
		expect(calls[0][0]).toBe('create_project');
		expect(calls[0][1].request.language).toBe('ja');
		expect(onNext).toHaveBeenCalled();
	});
});
