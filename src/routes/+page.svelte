<script lang="ts">
	import { listRecentProjects, type Project } from '$lib/api/projects';
	import EmptyState from '$lib/components/projects/EmptyState.svelte';
	import ProjectCard from '$lib/components/projects/ProjectCard.svelte';
	import Spinner from '$lib/components/ui/spinner/spinner.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Dialog from '$lib/components/ui/dialog/dialog.svelte';
	import { Step1 as WizardStep1, type WizardStep1Data } from '$lib/components/wizard';

	// State management with Svelte 5 runes
	let projects = $state<Project[]>([]);
	let loading = $state(true);
	let error = $state<string | null>(null);
	let showContextMenu = $state(false);
	let contextMenuProject = $state<Project | null>(null);
	let contextMenuPosition = $state({ x: 0, y: 0 });

	// Wizard state
	let wizardOpen = $state(false);
	let wizardStep1Data = $state<WizardStep1Data | null>(null);

	// Derived state
	let hasProjects = $derived(projects.length > 0);
	let hasMoreProjects = $derived(projects.length >= 10);

	// Load projects on mount
	$effect(() => {
		loadProjects();
	});

	async function loadProjects() {
		try {
			loading = true;
			error = null;
			projects = await listRecentProjects(10);
		} catch (e) {
			error = e instanceof Error ? e.message : 'Failed to load projects';
			console.error('Failed to load projects:', e);
		} finally {
			loading = false;
		}
	}

	function handleProjectClick(project: Project) {
		console.log('Opening project:', project.id);
		// TODO: Implement project opening in Story 2.8+
	}

	function handleCreateProject() {
		wizardOpen = true;
	}

	function handleWizardNext(data: WizardStep1Data) {
		wizardStep1Data = data;
		// TODO: Advance to Step 2 in Story 2.4
		// For now, show completion message
		console.log('Step 1 data saved:', data);
		alert('Step 1 complete! Step 2 coming in Story 2.4.');
		wizardOpen = false;
	}

	function handleWizardCancel() {
		wizardOpen = false;
	}

	function handleOpenProject() {
		console.log('Opening existing project');
		// TODO: Implement file picker in Story 2.3
	}

	function handleViewAll() {
		console.log('View all projects');
		// TODO: Implement in future enhancement
	}

	function handleContextMenu(e: MouseEvent, project: Project) {
		e.preventDefault();
		contextMenuProject = project;
		contextMenuPosition = { x: e.clientX, y: e.clientY };
		showContextMenu = true;
	}

	function handleContextMenuOpen() {
		if (contextMenuProject) {
			handleProjectClick(contextMenuProject);
		}
		showContextMenu = false;
	}

	function handleContextMenuOpenFolder() {
		if (contextMenuProject) {
			console.log('Open in file explorer:', contextMenuProject.file_path);
			// TODO: Implement platform-specific file explorer opening
		}
		showContextMenu = false;
	}

	function handleContextMenuRemove() {
		if (contextMenuProject) {
			console.log('Remove from list:', contextMenuProject.id);
			// TODO: Implement confirmation dialog and removal
		}
		showContextMenu = false;
	}

	// Close context menu when clicking outside
	$effect(() => {
		if (showContextMenu) {
			const handleClickOutside = () => {
				showContextMenu = false;
			};
			document.addEventListener('click', handleClickOutside);
			return () => {
				document.removeEventListener('click', handleClickOutside);
			};
		}
	});
</script>

<svelte:head>
	<title>StoryTeller - Home</title>
</svelte:head>

<div class="min-h-screen bg-neutral-bg p-8">
	{#if loading}
		<div class="flex items-center justify-center h-screen">
			<Spinner size="lg" />
		</div>
	{:else if error}
		<div class="text-center p-8">
			<p class="text-danger text-lg mb-4">{error}</p>
			<Button onclick={loadProjects}>Retry</Button>
		</div>
	{:else if !hasProjects}
		<EmptyState onCreateProject={handleCreateProject} onOpenProject={handleOpenProject} />
	{:else}
		<div class="max-w-6xl mx-auto">
			<div class="mb-8 flex items-center justify-between">
				<h1 class="text-fluent-title font-semibold">Recent Projects</h1>
				<Button onclick={handleCreateProject} variant="default"> Create New Project </Button>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each projects as project (project.id)}
					<ProjectCard
						{project}
						onclick={() => handleProjectClick(project)}
						oncontextmenu={(e) => handleContextMenu(e, project)}
					/>
				{/each}
			</div>

			{#if hasMoreProjects}
				<div class="text-center mt-8">
					<Button variant="link" onclick={handleViewAll}>View All Projects</Button>
				</div>
			{/if}
		</div>
	{/if}

	<!-- Context Menu -->
	{#if showContextMenu && contextMenuProject}
		<div
			class="fixed bg-white rounded-fluent-md shadow-fluent-8 py-2 min-w-[200px] border border-neutral-stroke z-50"
			style="left: {contextMenuPosition.x}px; top: {contextMenuPosition.y}px;"
			data-testid="context-menu"
		>
			<button
				class="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
				onclick={handleContextMenuOpen}
			>
				Open
			</button>
			<button
				class="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
				onclick={handleContextMenuOpenFolder}
			>
				Open in File Explorer
			</button>
			<hr class="my-1 border-neutral-stroke" />
			<button
				class="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-danger"
				onclick={handleContextMenuRemove}
			>
				Remove from List
			</button>
		</div>
	{/if}

	<!-- Wizard Dialog -->
	<Dialog
		bind:open={wizardOpen}
		title="Create New Project"
		showClose={true}
		onOpenChange={(open) => { wizardOpen = open; }}
		data-testid="wizard-dialog"
	>
		<WizardStep1
			onNext={handleWizardNext}
			onCancel={handleWizardCancel}
		/>
	</Dialog>
</div>
