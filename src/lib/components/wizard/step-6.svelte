<script lang="ts">
	import type { WizardStep6Data } from './types';
	import type { WizardState } from './types';
	import { invoke } from '@tauri-apps/api/core';
	import { LANGUAGE_CODE_BY_LABEL, CONTENT_LANGUAGES } from './types';

	interface Props {
		onNext: (data: WizardStep6Data) => void;
		onBack: () => void;
		onCancel: () => void;
		onEditStep: (stepNumber: 1 | 2 | 3 | 4 | 5) => void; // Add this function to navigate to specific steps
		wizardState: WizardState;
	}

	let { onNext, onBack, onCancel, onEditStep, wizardState }: Props = $props();
	let isCreating = $state(false);
	let error = $state<string | null>(null);

	// Function to handle project creation
	async function handleCreateProject() {
		if (!wizardState.step1Data) {
			error = "Project title is required";
			return;
		}

		isCreating = true;
		error = null;

		try {
			// Prepare the project data from all wizard steps
			const projectData = {
				title: wizardState.step1Data.title,
				author_name: wizardState.step1Data.authorName || null,
				pen_name: wizardState.step1Data.penName || null,
				tagline: wizardState.step1Data.tagline || null,
				genre: wizardState.step2Data?.genre || null,
				subgenres: wizardState.step2Data?.subgenres || null,
				target_audience: wizardState.step2Data?.targetAudience || null,
				tones: wizardState.step2Data?.tones || null,
				point_of_view: wizardState.step3Data?.pointOfView || null,
				story_framework: wizardState.step3Data?.storyFramework || null,
				chapter_count: wizardState.step3Data?.chapterCount || null,
				words_per_chapter: wizardState.step3Data?.wordsPerChapter || null,
				plot_premise: wizardState.step4Data?.plotPremise || null,
				ai_provider: wizardState.step5Data?.aiProvider || null,
				language: wizardState.step4Data?.language ?? 'en',
			};

			// Call the Tauri command to create the project
			const result = await invoke('create_project', { request: projectData });

			// Project created successfully
			const step6Data: WizardStep6Data = {};
			onNext(step6Data);
		} catch (err) {
			console.error('Error creating project:', err);
			error = typeof err === 'string' ? err : 'An error occurred while creating the project';
		} finally {
			isCreating = false;
		}
	}

	// Function to handle editing a specific step
	function handleEditStep(stepNumber: number) {
		// Call the parent's function to navigate to the specific step
		if (stepNumber >= 1 && stepNumber <= 5) {
			onEditStep(stepNumber as 1 | 2 | 3 | 4 | 5);
		}
	}

	const contentLanguageLabel = $derived.by(() => {
		const code = wizardState.step4Data?.language;
		if (!code) return null;
		for (const label of CONTENT_LANGUAGES) {
			if (LANGUAGE_CODE_BY_LABEL[label] === code) {
				return label;
			}
		}
		return code;
	});
</script>

<div class="max-w-4xl mx-auto">
	<!-- Progress indicator -->
	<div class="mb-8">
		<h1 class="text-2xl font-bold">Step 6 of 6: Review & Create</h1>
		<p class="text-muted-foreground">Review all your project settings before finalizing creation</p>
	</div>

	<!-- Summary card with categorized settings -->
	<div class="space-y-6">
		<!-- Basic Information section -->
		{#if wizardState.step1Data}
			<div class="border rounded-lg p-6">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-xl font-semibold">Basic Information</h2>
					<button 
						onclick={() => handleEditStep(1)}
						class="text-blue-600 hover:underline text-sm"
					>
						Edit
					</button>
				</div>
				<div class="grid grid-cols-2 gap-4">
					<div>
						<p class="text-sm text-muted-foreground">Title</p>
						<p class="font-medium">{wizardState.step1Data.title}</p>
					</div>
					<div>
						<p class="text-sm text-muted-foreground">Author Name</p>
						<p class="font-medium">{wizardState.step1Data.authorName}</p>
					</div>
					<div>
						<p class="text-sm text-muted-foreground">Pen Name</p>
						<p class="font-medium">{wizardState.step1Data.penName}</p>
					</div>
					<div>
						<p class="text-sm text-muted-foreground">Tagline</p>
						<p class="font-medium">{wizardState.step1Data.tagline}</p>
					</div>
				</div>
			</div>
		{/if}

		<!-- Genre & Audience section -->
		{#if wizardState.step2Data}
			<div class="border rounded-lg p-6">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-xl font-semibold">Genre & Audience</h2>
					<button 
						onclick={() => handleEditStep(2)}
						class="text-blue-600 hover:underline text-sm"
					>
						Edit
					</button>
				</div>
				<div class="grid grid-cols-2 gap-4">
					<div>
						<p class="text-sm text-muted-foreground">Genre</p>
						<p class="font-medium">{wizardState.step2Data.genre}</p>
					</div>
					<div>
						<p class="text-sm text-muted-foreground">Subgenres</p>
						<p class="font-medium">{wizardState.step2Data.subgenres.length > 0 ? wizardState.step2Data.subgenres.join(', ') : 'None selected'}</p>
					</div>
					<div>
						<p class="text-sm text-muted-foreground">Target Audience</p>
						<p class="font-medium">{wizardState.step2Data.targetAudience}</p>
					</div>
					<div>
						<p class="text-sm text-muted-foreground">Tones</p>
						<p class="font-medium">{wizardState.step2Data.tones.length > 0 ? wizardState.step2Data.tones.join(', ') : 'None selected'}</p>
					</div>
				</div>
			</div>
		{/if}

		<!-- Story Structure section -->
		{#if wizardState.step3Data}
			<div class="border rounded-lg p-6">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-xl font-semibold">Story Structure</h2>
					<button 
						onclick={() => handleEditStep(3)}
						class="text-blue-600 hover:underline text-sm"
					>
						Edit
					</button>
				</div>
				<div class="grid grid-cols-2 gap-4">
					<div>
						<p class="text-sm text-muted-foreground">Point of View</p>
						<p class="font-medium">{wizardState.step3Data.pointOfView}</p>
					</div>
					<div>
						<p class="text-sm text-muted-foreground">Story Framework</p>
						<p class="font-medium">{wizardState.step3Data.storyFramework}</p>
					</div>
					<div>
						<p class="text-sm text-muted-foreground">Chapter Count</p>
						<p class="font-medium">{wizardState.step3Data.chapterCount}</p>
					</div>
					<div>
						<p class="text-sm text-muted-foreground">Words Per Chapter</p>
						<p class="font-medium">{wizardState.step3Data.wordsPerChapter}</p>
					</div>
					<div class="col-span-2">
						<p class="text-sm text-muted-foreground">Total Target Words</p>
						<p class="font-medium">{wizardState.step3Data.totalTargetWords}</p>
					</div>
				</div>
			</div>
		{/if}

		<!-- Plot Premise section -->
		{#if wizardState.step4Data}
			<div class="border rounded-lg p-6">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-xl font-semibold">Plot Premise</h2>
					<button 
						onclick={() => handleEditStep(4)}
						class="text-blue-600 hover:underline text-sm"
					>
						Edit
					</button>
				</div>
				<div>
					{#if wizardState.step4Data.plotPremise.length > 200}
						<p class="font-medium">{wizardState.step4Data.plotPremise.substring(0, 200)}...</p>
						<button class="text-blue-600 hover:underline text-sm mt-2">Read more</button>
					{:else}
						<p class="font-medium">{wizardState.step4Data.plotPremise}</p>
					{/if}
				</div>
				<div class="mt-3">
					<p class="text-sm text-muted-foreground">Content Language</p>
					<p class="font-medium">{contentLanguageLabel}</p>
				</div>
			</div>
		{/if}

		<!-- AI Provider section -->
		{#if wizardState.step5Data}
			<div class="border rounded-lg p-6">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-xl font-semibold">AI Provider</h2>
					<button 
						onclick={() => handleEditStep(5)}
						class="text-blue-600 hover:underline text-sm"
					>
						Edit
					</button>
				</div>
				<div>
					{#if wizardState.step5Data.aiProviderSkipped}
						<p class="font-medium">Not configured - you can add this later</p>
					{:else if wizardState.step5Data.aiProvider}
						<p class="font-medium">{wizardState.step5Data.aiProvider}</p>
					{:else}
						<p class="font-medium">Not configured - you can add this later</p>
					{/if}
				</div>
			</div>
		{/if}
	</div>

	<!-- Action buttons -->
	<div class="flex justify-between mt-8">
		<button
			onclick={onBack}
			class="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded"
			disabled={isCreating}
		>
			Back
		</button>
		<div class="flex space-x-2">
			<button
				onclick={onCancel}
				class="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded"
				disabled={isCreating}
			>
				Cancel
			</button>
			<button
				onclick={handleCreateProject}
				class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded flex items-center"
				disabled={isCreating}
			>
				{#if isCreating}
					<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
						<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg>
					Creating your project...
				{:else}
					Create Project
				{/if}
			</button>
		</div>
	</div>

	<!-- Error message -->
	{#if error}
		<div class="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
			<p class="text-red-700">{error}</p>
		</div>
	{/if}
</div>
