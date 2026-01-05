<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import FormItem from '$lib/components/ui/form/form-item.svelte';
	import type { WizardStep4Data } from './types';

	interface Props {
		onNext: (data: WizardStep4Data) => void;
		onBack: () => void;
		onCancel: () => void;
	}

	let { onNext, onBack, onCancel }: Props = $props();

	let plotPremise = $state('');
	let plotPremiseTouched = $state(false);
	let showValidation = $state(false);
	let showWarning = $state(false);

	// Validation constants
	const MIN_CHARS = 100;
	const MAX_CHARS = 2000;
	const AMBER_THRESHOLD = 1800;
	const RED_THRESHOLD = 1950;

	// Character counter color (using $derived.by for multi-line reactive logic)
	const counterColor = $derived.by(() => {
		const length = plotPremise.length;
		if (length >= RED_THRESHOLD) return 'text-destructive';
		if (length >= AMBER_THRESHOLD) return 'text-amber-600';
		return 'text-muted-foreground';
	});

	// Reference for focusing textarea
	let textareaElement: HTMLTextAreaElement | undefined;

	function handleNext() {
		showValidation = true;

		// Trim whitespace for validation (check actual content length)
		const trimmedPremise = plotPremise.trim();

		// Check if plot premise is below minimum (after trimming)
		if (trimmedPremise.length < MIN_CHARS) {
			showWarning = true;
			return;
		}

		// Validation passed, proceed to next step with trimmed value
		onNext({ plotPremise: trimmedPremise });
	}

	function handleContinueAnyway() {
		showWarning = false;
		// Trim whitespace even when continuing with short premise
		onNext({ plotPremise: plotPremise.trim() });
	}

	function handleGoBack() {
		showWarning = false;
		// Focus the textarea after the warning is dismissed
		if (textareaElement) {
			textareaElement.focus();
		}
	}
</script>

<div class="p-6 space-y-6" data-testid="wizard-step-4">
	<!-- Progress Indicator -->
	<div
		class="flex items-center justify-between"
		role="progressbar"
		aria-label="Step 4 of 6: Plot Premise"
		aria-valuenow="4"
		aria-valuemin="1"
		aria-valuemax="6"
	>
		<span class="text-sm font-medium">Step 4 of 6: Plot Premise</span>
	</div>

	<!-- Plot Premise Textarea -->
	<FormItem>
		<Label for="plotPremise">Plot Premise</Label>
		<textarea
			id="plotPremise"
			bind:value={plotPremise}
			bind:this={textareaElement}
			placeholder="Describe your story's main plot in 2-3 paragraphs. Include the protagonist, their goal, the central conflict, and the stakes."
			maxlength={MAX_CHARS}
			rows={8}
			onblur={() => (plotPremiseTouched = true)}
			data-testid="plot-premise-textarea"
			class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
		></textarea>
		<!-- Character Counter -->
		<div class="mt-1 flex justify-end">
			<span
				class="text-xs {counterColor}"
				aria-live="polite"
				data-testid="character-counter"
			>
				{plotPremise.length} / {MAX_CHARS} characters
			</span>
		</div>
	</FormItem>

	<!-- Warning Alert for <100 characters -->
	{#if showWarning}
		<div
			class="p-4 rounded-md border border-amber-500 bg-amber-50 dark:bg-amber-950 dark:border-amber-700"
			data-testid="plot-premise-warning"
			role="alert"
		>
			<p class="text-sm text-amber-800 dark:text-amber-200 mb-3">
				We recommend at least 100 characters (about 2-3 sentences) for better AI-generated
				content. Continue anyway?
			</p>
			<div class="flex gap-2">
				<Button
					variant="outline"
					size="sm"
					onclick={handleGoBack}
					data-testid="warning-go-back-button"
				>
					Go Back to Edit
				</Button>
				<Button
					variant="default"
					size="sm"
					onclick={handleContinueAnyway}
					data-testid="warning-continue-button"
				>
					Continue Anyway
				</Button>
			</div>
		</div>
	{/if}

	<!-- Navigation Buttons -->
	<div class="flex justify-between pt-4">
		<div class="space-x-2">
			<Button variant="secondary" onclick={onCancel} data-testid="cancel-button">
				Cancel
			</Button>
			<Button variant="outline" onclick={onBack} data-testid="back-button"> Back </Button>
		</div>
		<Button variant="default" onclick={handleNext} data-testid="next-button"> Next </Button>
	</div>
</div>
