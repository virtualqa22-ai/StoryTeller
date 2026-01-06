<script lang="ts">
  import Button from '../ui/button/button.svelte';
  import type { Project } from '$lib/api/projects';

  // Props using Svelte 5 runes
  let { project }: { project: Project } = $props();

  // Function to handle creating the first chapter
  function createFirstChapter() {
    // TODO: Implement chapter creation in future story
    console.log('Creating first chapter for project:', project.title);
  }

  // Update the document title when the component mounts
  $effect(() => {
    document.title = `${project.title} - StoryTeller`;
    
    // Clean up on unmount
    return () => {
      document.title = 'StoryTeller';
    };
  });
</script>

<div class="flex flex-col h-screen bg-neutral-bg">
  <!-- Header with project title -->
  <header class="border-b border-neutral-stroke bg-surface p-4">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-fluent-title font-semibold text-foreground">{project.title}</h1>
    </div>
  </header>

  <!-- Main content area -->
  <main class="flex-1 overflow-auto p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Empty state for chapters -->
      <div class="bg-surface rounded-fluent-md border border-neutral-stroke p-8 text-center">
        <h2 class="text-fluent-subtitle font-semibold mb-2">No chapters yet</h2>
        <p class="text-foreground-secondary mb-6">Get started by creating your first chapter</p>
        
        <Button on:click={createFirstChapter} variant="default">
          Create First Chapter
        </Button>
      </div>
    </div>
  </main>
</div>