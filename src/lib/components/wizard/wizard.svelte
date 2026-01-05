<script lang="ts">
	import { Step1, Step2, Step3, Step4 } from '$lib/components/wizard';
	import type { WizardStep1Data, WizardStep2Data, WizardStep3Data, WizardStep4Data } from './types';
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
		step2Data: null,
		step3Data: null,
		step4Data: null
	});

	function handleStep1Next(data: WizardStep1Data) {
		wizardState.step1Data = data;
		wizardState.currentStep = 2;
	}

	function handleStep2Next(data: WizardStep2Data) {
		wizardState.step2Data = data;
		wizardState.currentStep = 3;
	}

	function handleStep3Next(data: WizardStep3Data) {
		wizardState.step3Data = data;
		// Advance to Step 4 (Plot Premise)
		wizardState.currentStep = 4;
	}

	function handleStep4Next(data: WizardStep4Data) {
		wizardState.step4Data = data;
		// Advance to Step 5 (AI Provider Configuration)
		wizardState.currentStep = 5;
	}

	function handleStepBack() {
		if (wizardState.currentStep === 2) {
			wizardState.currentStep = 1;
		} else if (wizardState.currentStep === 3) {
			wizardState.currentStep = 2;
		} else if (wizardState.currentStep === 4) {
			wizardState.currentStep = 3;
		} else if (wizardState.currentStep === 5) {
			wizardState.currentStep = 4;
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
	{:else if wizardState.currentStep === 3}
		<Step3 onNext={handleStep3Next} onBack={handleStepBack} onCancel={handleCancel} />
	{:else if wizardState.currentStep === 4}
		<Step4 onNext={handleStep4Next} onBack={handleStepBack} onCancel={handleCancel} />
	{:else}
		<div class="text-center p-8">
			<p class="text-muted-foreground">Wizard step {wizardState.currentStep} not yet implemented</p>
			<button onclick={handleCancel} class="text-blue-600 underline">Cancel</button>
		</div>
	{/if}
</div>
