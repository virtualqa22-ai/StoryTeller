<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { getProject } from '$lib/api/projects';
  import MainWorkspace from '$lib/components/workspace/MainWorkspace.svelte';
  import type { Project } from '$lib/api/projects';
  import Spinner from '$lib/components/ui/spinner/spinner.svelte';

  let project = $state<Project | null>(null);
  let loading = $state(true);
  let error = $state<string | null>(null);

  // Get project ID from URL params
  let projectId: number | null = null;

  onMount(async () => {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('id');
    
    if (idParam) {
      try {
        projectId = parseInt(idParam, 10);
        if (!isNaN(projectId)) {
          project = await getProject(projectId);
          if (!project) {
            error = 'Project not found';
          }
        } else {
          error = 'Invalid project ID';
        }
      } catch (e) {
        error = e instanceof Error ? e.message : 'Failed to load project';
        console.error('Failed to load project:', e);
      } finally {
        loading = false;
      }
    } else {
      error = 'No project ID provided';
      loading = false;
    }
  });
</script>

<svelte:head>
  {#if project}
    <title>{project.title} - StoryTeller</title>
  {:else}
    <title>Loading Project - StoryTeller</title>
  {/if}
</svelte:head>

<div class="min-h-screen bg-neutral-bg">
  {#if loading}
    <div class="flex items-center justify-center h-screen">
      <Spinner size="lg" />
    </div>
  {:else if error}
    <div class="flex items-center justify-center h-screen">
      <div class="text-center p-8">
        <p class="text-danger text-lg mb-4">{error}</p>
        <button 
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onclick={() => goto('/')}
        >
          Return to Home
        </button>
      </div>
    </div>
  {:else if project}
    <MainWorkspace {project} />
  {/if}
</div>