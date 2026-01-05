<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import FormItem from '$lib/components/ui/form/form-item.svelte';
	import FormMessage from '$lib/components/ui/form/form-message.svelte';
	import Select from '$lib/components/ui/select/select.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Tooltip from '$lib/components/ui/tooltip/tooltip.svelte';
	import type { WizardStep3Data, PointOfView, StoryFramework } from './types';
	import { POV_OPTIONS, STORY_FRAMEWORKS, FRAMEWORK_DESCRIPTIONS } from './types';

	interface Props {
		onNext: (data: WizardStep3Data) => void;
		onBack: () => void;
		onCancel: () => void;
	}

	let { onNext, onBack, onCancel }: Props = $props();

	let pointOfView = $state<PointOfView | ''>('');
	let storyFramework = $state<StoryFramework | ''>('');
	let chapterCount = $state(20);
	let wordsPerChapter = $state(3000);
	const minChapterCount = 1;
	const maxChapterCount = 100;
	const minWordsPerChapter = 500;
	const maxWordsPerChapter = 15000;

	// Touch tracking for validation
	let povTouched = $state(false);
	let frameworkTouched = $state(false);
	let chapterCountTouched = $state(false);
	let wordsPerChapterTouched = $state(false);

	const povOptions = $derived(POV_OPTIONS.map((p) => ({ value: p, label: p })));
	const frameworkOptions = $derived(STORY_FRAMEWORKS.map((f) => ({ value: f, label: f })));
	const totalTargetWords = $derived(chapterCount * wordsPerChapter);
	const frameworkDescription = $derived(
		storyFramework !== '' ? FRAMEWORK_DESCRIPTIONS[storyFramework as StoryFramework] : ''
	);

	let showValidation = $state(false);
	const povError = $derived(
		(showValidation || povTouched) && pointOfView === '' ? 'Please select a point of view' : ''
	);
	const frameworkError = $derived(
		(showValidation || frameworkTouched) && storyFramework === ''
			? 'Please select a story framework'
			: ''
	);
	const chapterCountError = $derived(
		(showValidation || chapterCountTouched) &&
			(chapterCount < minChapterCount || chapterCount > maxChapterCount)
			? `Chapter count must be between ${minChapterCount} and ${maxChapterCount}`
			: ''
	);
	const wordsPerChapterError = $derived(
		(showValidation || wordsPerChapterTouched) &&
			(wordsPerChapter < minWordsPerChapter || wordsPerChapter > maxWordsPerChapter)
			? `Words per chapter must be between ${minWordsPerChapter.toLocaleString()} and ${maxWordsPerChapter.toLocaleString()}`
			: ''
	);

	// Clamp numeric inputs
	function clampChapterCount() {
		chapterCountTouched = true;
		// Prevent negative values
		if (chapterCount < 0) chapterCount = 0;
		if (chapterCount < minChapterCount) chapterCount = minChapterCount;
		if (chapterCount > maxChapterCount) chapterCount = maxChapterCount;
	}

	function clampWordsPerChapter() {
		wordsPerChapterTouched = true;
		// Prevent negative values
		if (wordsPerChapter < 0) wordsPerChapter = 0;
		if (wordsPerChapter < minWordsPerChapter) wordsPerChapter = minWordsPerChapter;
		if (wordsPerChapter > maxWordsPerChapter) wordsPerChapter = maxWordsPerChapter;
	}

	// Sanitize on input to prevent negative numbers during typing
	function sanitizeChapterCount() {
		chapterCountTouched = true;
		if (chapterCount < 0) chapterCount = 0;
	}

	function sanitizeWordsPerChapter() {
		wordsPerChapterTouched = true;
		if (wordsPerChapter < 0) wordsPerChapter = 0;
	}

	function handleNext() {
		showValidation = true;

		// Clamp values before validation
		clampChapterCount();
		clampWordsPerChapter();

		if (
			pointOfView === '' ||
			storyFramework === '' ||
			chapterCount < minChapterCount ||
			chapterCount > maxChapterCount ||
			wordsPerChapter < minWordsPerChapter ||
			wordsPerChapter > maxWordsPerChapter
		) {
			return;
		}

		// Type assertion safe here due to validation above
		onNext({
			pointOfView: pointOfView as PointOfView,
			storyFramework: storyFramework as StoryFramework,
			chapterCount,
			wordsPerChapter,
			totalTargetWords
		});
	}
</script>

<div class="p-6 space-y-6" data-testid="wizard-step-3">
	<!-- Progress Indicator -->
	<div class="flex items-center justify-between" role="progressbar" aria-label="Step 3 of 6: Story Structure" aria-valuenow="3" aria-valuemin="1" aria-valuemax="6">
		<span class="text-sm font-medium">Step 3 of 6: Story Structure</span>
	</div>

	<!-- Point of View -->
	<FormItem>
		<div class="flex items-center justify-between">
			<Label>Point of View</Label>
		</div>
		<Select
			bind:value={pointOfView}
			options={povOptions}
			placeholder="Select a point of view"
			data-testid="pov-select"
			class={!!povError ? 'border-destructive' : ''}
			onblur={() => (povTouched = true)}
		/>
		<div class="mt-1">
			{#if povError}
				<FormMessage class="text-destructive text-xs" data-testid="pov-error-message">{povError}</FormMessage>
			{:else if pointOfView === ''}
				<span class="text-xs text-muted-foreground" data-testid="pov-required-text">Required</span>
			{:else}
				<span></span>
			{/if}
		</div>
	</FormItem>

	<!-- Story Framework w/ tooltips -->
	<FormItem>
		<div class="flex items-center justify-between">
			<Label>Story Framework</Label>
			<Tooltip content="Choose the narrative structure that will guide your story development." side="right">
				<span class="text-xs text-muted-foreground cursor-help">What's this?</span>
			</Tooltip>
		</div>
		<Select
			bind:value={storyFramework}
			options={frameworkOptions}
			placeholder="Select a framework"
			data-testid="framework-select"
			class={!!frameworkError ? 'border-destructive' : ''}
			onblur={() => (frameworkTouched = true)}
		/>
		<div class="mt-1">
			{#if frameworkError}
				<FormMessage class="text-destructive text-xs" data-testid="framework-error-message">
					{frameworkError}
				</FormMessage>
			{:else if frameworkDescription}
				<p class="text-xs text-muted-foreground" data-testid="framework-description">
					{frameworkDescription}
				</p>
			{:else if storyFramework === ''}
				<span class="text-xs text-muted-foreground" data-testid="framework-required-text">Required</span>
			{/if}
		</div>
	</FormItem>

	<!-- Chapter configuration -->
	<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
		<FormItem>
			<Label for="chapterCount">Target Chapter Count</Label>
			<Input
				id="chapterCount"
				type="number"
				min={minChapterCount}
				max={maxChapterCount}
				bind:value={chapterCount}
				onblur={clampChapterCount}
				oninput={sanitizeChapterCount}
				data-testid="chapter-count-input"
				class={!!chapterCountError ? 'border-destructive' : ''}
			/>
			{#if chapterCountError}
				<FormMessage class="text-destructive text-xs mt-1" data-testid="chapter-count-error">
					{chapterCountError}
				</FormMessage>
			{/if}
		</FormItem>
		<FormItem>
			<Label for="wordsPerChapter">Target Words Per Chapter</Label>
			<Input
				id="wordsPerChapter"
				type="number"
				min={minWordsPerChapter}
				max={maxWordsPerChapter}
				bind:value={wordsPerChapter}
				onblur={clampWordsPerChapter}
				oninput={sanitizeWordsPerChapter}
				data-testid="words-per-chapter-input"
				class={!!wordsPerChapterError ? 'border-destructive' : ''}
			/>
			{#if wordsPerChapterError}
				<FormMessage class="text-destructive text-xs mt-1" data-testid="words-per-chapter-error">
					{wordsPerChapterError}
				</FormMessage>
			{/if}
		</FormItem>
		<FormItem>
			<Label for="totalTargetWords">Total Target Word Count</Label>
			<output
				id="totalTargetWords"
				for="chapterCount wordsPerChapter"
				class="h-10 flex items-center px-3 rounded-md border bg-muted text-sm"
				aria-live="polite"
				data-testid="total-target-words"
			>
				{totalTargetWords.toLocaleString()}
			</output>
		</FormItem>
	</div>

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
