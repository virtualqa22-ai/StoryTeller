<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import FormItem from '$lib/components/ui/form/form-item.svelte';
	import FormMessage from '$lib/components/ui/form/form-message.svelte';
	import type { WizardStep1Data } from './types';

	interface Props {
		onNext: (data: WizardStep1Data) => void;
		onCancel: () => void;
	}

	let { onNext, onCancel }: Props = $props();

	let title = $state('');
	let authorName = $state('');
	let penName = $state('');
	let tagline = $state('');
	let showValidation = $state(false);

	const maxTitleLength = 200;
	const maxTaglineLength = 150;

	const titleError = $derived(
		showValidation && title.trim().length === 0 ? 'Novel Title is required' : ''
	);

	function handleNext() {
		if (title.trim().length === 0) {
			showValidation = true;
			// Use getElementById since Input component doesn't support bind:this
			const titleInput = document.getElementById('title') as HTMLInputElement;
			titleInput?.focus();
			return;
		}

		onNext({
			title,
			authorName,
			penName,
			tagline
		});
	}
</script>

<div class="p-6 space-y-6" data-testid="wizard-step-1">
	<!-- Progress Indicator -->
	<div class="flex items-center justify-between" role="progressbar" aria-label="Step 1 of 6: Basic Information">
		<span class="text-sm font-medium">Step 1 of 6: Basic Information</span>
	</div>

	<!-- Novel Title (Required) -->
	<FormItem>
		<Label for="title">Novel Title</Label>
		<Input
			id="title"
			bind:value={title}
			maxlength={maxTitleLength}
			placeholder="Enter your novel title"
			data-testid="novel-title-input"
			class={!!titleError ? 'border-destructive' : ''}
		/>
		<div class="flex justify-between mt-1">
			{#if titleError}
				<FormMessage class="text-destructive text-xs" data-testid="title-error-message">{titleError}</FormMessage>
			{:else if title.length === 0}
				<span class="text-xs text-muted-foreground" data-testid="title-required-text">Required</span>
			{:else}
				<span></span>
			{/if}
			<span
				class="text-xs"
				class:text-destructive={title.length >= maxTitleLength}
				class:text-muted-foreground={title.length < maxTitleLength}
				data-testid="title-counter"
			>
				{title.length} / {maxTitleLength}
			</span>
		</div>
	</FormItem>

	<!-- Author Name (Optional) -->
	<FormItem>
		<Label for="authorName">Author Name</Label>
		<Input
			id="authorName"
			bind:value={authorName}
			placeholder="Your real name"
			data-testid="author-name-input"
		/>
	</FormItem>

	<!-- Pen Name (Optional) -->
	<FormItem>
		<Label for="penName">Pen Name</Label>
		<Input
			id="penName"
			bind:value={penName}
			placeholder="Your pen name if different"
			data-testid="pen-name-input"
		/>
	</FormItem>

	<!-- Tagline (Optional) -->
	<FormItem>
		<Label for="tagline">Tagline</Label>
		<Input
			id="tagline"
			bind:value={tagline}
			maxlength={maxTaglineLength}
			placeholder="A one-sentence hook for your novel"
			data-testid="tagline-input"
		/>
		<div class="text-right mt-1">
			<span
				class="text-xs"
				class:text-destructive={tagline.length >= maxTaglineLength}
				class:text-muted-foreground={tagline.length < maxTaglineLength}
				data-testid="tagline-counter"
			>
				{tagline.length} / {maxTaglineLength}
			</span>
		</div>
	</FormItem>

	<!-- Navigation Buttons -->
	<div class="flex justify-between pt-4">
		<Button variant="secondary" onclick={onCancel} data-testid="cancel-button">
			Cancel
		</Button>
		<!-- Back button appears in steps 2-6 only -->
		<Button variant="default" onclick={handleNext} data-testid="next-button">
			Next
		</Button>
	</div>
</div>
