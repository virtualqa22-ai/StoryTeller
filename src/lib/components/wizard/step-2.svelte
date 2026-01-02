<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import FormItem from '$lib/components/ui/form/form-item.svelte';
	import FormMessage from '$lib/components/ui/form/form-message.svelte';
	import Select from '$lib/components/ui/select/select.svelte';
	import type { WizardStep2Data, Genre } from './types';
	import { GENRES, SUBGENRES_BY_GENRE, TARGET_AUDIENCES, TONES } from './types';

	interface Props {
		onNext: (data: WizardStep2Data) => void;
		onBack: () => void;
		onCancel: () => void;
	}

	let { onNext, onBack, onCancel }: Props = $props();

	let selectedGenre = $state('');
	let selectedSubgenres = $state<string[]>([]);
	let selectedTargetAudience = $state('');
	let selectedTones = $state<string[]>([]);
	let showValidation = $state(false);

	const genreOptions = $derived(
		GENRES.map((g) => ({ value: g, label: g }))
	);

	const targetAudienceOptions = $derived(
		TARGET_AUDIENCES.map((a) => ({ value: a, label: a }))
	);

	const availableSubgenres = $derived(
		selectedGenre ? SUBGENRES_BY_GENRE[selectedGenre as Genre] || [] : []
	);

	const genreError = $derived(
		showValidation && selectedGenre.length === 0 ? 'Please select at least a genre' : ''
	);

	const targetAudienceError = $derived(
		showValidation && selectedTargetAudience.length === 0 ? 'Please select target audience' : ''
	);

	function handleGenreChange(newGenre: string) {
		selectedGenre = newGenre;
		selectedSubgenres = []; // Clear subgenres when genre changes
	}

	function handleNext() {
		if (selectedGenre.length === 0 || selectedTargetAudience.length === 0) {
			showValidation = true;
			return;
		}

		onNext({
			genre: selectedGenre,
			subgenres: selectedSubgenres,
			targetAudience: selectedTargetAudience,
			tones: selectedTones
		});
	}
</script>

<div class="p-6 space-y-6" data-testid="wizard-step-2">
	<!-- Progress Indicator -->
	<div class="flex items-center justify-between" role="progressbar" aria-label="Step 2 of 6: Genre & Audience">
		<span class="text-sm font-medium">Step 2 of 6: Genre & Audience</span>
	</div>

	<!-- Genre (Required) -->
	<FormItem>
		<Label>Genre</Label>
		<Select
			bind:value={selectedGenre}
			options={genreOptions}
			placeholder="Select a genre"
			onchange={handleGenreChange}
			data-testid="genre-select"
			class={!!genreError ? 'border-destructive' : ''}
		/>
		<div class="mt-1">
			{#if genreError}
				<FormMessage class="text-destructive text-xs" data-testid="genre-error-message">{genreError}</FormMessage>
			{:else if selectedGenre.length === 0}
				<span class="text-xs text-muted-foreground" data-testid="genre-required-text">Required</span>
			{:else}
				<span></span>
			{/if}
		</div>
	</FormItem>

	<!-- Subgenres (Optional) -->
	{#if availableSubgenres.length > 0}
		<FormItem>
			<Label>Subgenres (Optional)</Label>
			<div class="grid grid-cols-2 gap-2" role="group" aria-label="Subgenres">
				{#each availableSubgenres as subgenre}
					<label class="flex items-center space-x-2 cursor-pointer">
						<input
								type="checkbox"
								bind:group={selectedSubgenres}
								value={subgenre}
								class="rounded border-input h-4 w-4 accent-primary"
								data-testid={`subgenre-checkbox-${subgenre.replace(/\s+/g, '-').toLowerCase()}`}
						/>
						<span class="text-sm">{subgenre}</span>
					</label>
				{/each}
			</div>
		</FormItem>
	{/if}

	<!-- Target Audience (Required) -->
	<FormItem>
		<Label>Target Audience</Label>
		<Select
			bind:value={selectedTargetAudience}
			options={targetAudienceOptions}
			placeholder="Select target audience"
			data-testid="target-audience-select"
			class={!!targetAudienceError ? 'border-destructive' : ''}
		/>
		<div class="mt-1">
			{#if targetAudienceError}
				<FormMessage class="text-destructive text-xs" data-testid="target-audience-error-message">
					{targetAudienceError}
				</FormMessage>
			{:else if selectedTargetAudience.length === 0}
				<span class="text-xs text-muted-foreground" data-testid="target-audience-required-text">
					Required
				</span>
			{:else}
				<span></span>
			{/if}
		</div>
	</FormItem>

	<!-- Tone (Optional) -->
	<FormItem>
		<Label>Tone (Optional)</Label>
		<div class="grid grid-cols-2 gap-2" role="group" aria-label="Tones">
			{#each TONES as tone}
				<label class="flex items-center space-x-2 cursor-pointer">
					<input
							type="checkbox"
							bind:group={selectedTones}
							value={tone}
							class="rounded border-input h-4 w-4 accent-primary"
							data-testid={`tone-checkbox-${tone.toLowerCase()}`}
					/>
					<span class="text-sm">{tone}</span>
				</label>
			{/each}
		</div>
	</FormItem>

	<!-- Navigation Buttons -->
	<div class="flex justify-between pt-4">
		<div class="space-x-2">
			<Button variant="secondary" onclick={onCancel} data-testid="cancel-button">
				Cancel
			</Button>
			<Button variant="outline" onclick={onBack} data-testid="back-button">
				Back
			</Button>
		</div>
		<Button variant="default" onclick={handleNext} data-testid="next-button">
			Next
		</Button>
	</div>
</div>
