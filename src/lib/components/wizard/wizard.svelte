<script lang="ts">
	import { Step1, Step2 } from '$lib/components/wizard';
	import type { WizardStep1Data, WizardStep2Data } from './types';
	import type { WizardState } from './types';

	interface Props {
		onCancel: () => void;
		onComplete: (wizardState: WizardState) => void;
	}

	let { onCancel, onComplete }: Props = $props();

	// Using WizardState from types.ts to avoid duplication
	let wizardState: WizardState = $state({
		currentStep: 1,
		step1Data: null,
		step2Data: null
	});

	function handleStep1Next(data: WizardStep1Data) {
		wizardState.step1Data = data;
		wizardState.currentStep = 2;
	}

	function handleStep2Next(data: WizardStep2Data) {
		wizardState.step2Data = data;
		// AC #3: Advance to Step 3 placeholder (Step 3 will be implemented in Story 2.5)
		wizardState.currentStep = 3;
	}

	function handleStepBack() {
		if (wizardState.currentStep === 2 || wizardState.currentStep === 3) {
			wizardState.currentStep = 1;
		}
	}

	function handleCancel() {
		onCancel();
	}

	function handleComplete() {
		if (wizardState.step1Data && wizardState.step2Data) {
			onComplete(wizardState);
		}
	}
</script>

<div class="p-6">
	{#if wizardState.currentStep === 1}
		<Step1 onNext={handleStep1Next} onCancel={handleCancel} />
	{:else if wizardState.currentStep === 2}
		<Step2 onNext={handleStep2Next} onBack={handleStepBack} onCancel={handleCancel} />
	{:else}
		<div class="text-center p-8">
			<p class="text-muted-foreground">Wizard step {wizardState.currentStep} not yet implemented</p>
			<button onclick={handleCancel} class="text-blue-600 underline">Cancel</button>
		</div>
	{/if}
</div>
