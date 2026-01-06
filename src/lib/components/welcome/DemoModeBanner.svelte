<script lang="ts">
  import type { Snippet } from 'svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  
  type Props = {
    onExitDemo?: () => void;
    children?: Snippet;
  };
  
  let { onExitDemo, children }: Props = $props();
  
  let bannerVisible = $state(true);
  
  function handleCreateProjectClick() {
    if (onExitDemo) {
      onExitDemo();
    }
  }
</script>

<div class="w-full">
  {#if bannerVisible}
    <div class="bg-blue-50 border-b border-blue-200 p-3 text-center" data-testid="demo-mode-banner">
      <div class="flex items-center justify-center gap-2">
        <span class="text-sm text-blue-800">
          You're viewing a demo project. Ready to create your own? 
          <Button 
            variant="link" 
            class="p-0 h-auto text-blue-800 underline inline"
            onclick={handleCreateProjectClick}
            data-testid="create-project-from-demo"
          >
            Create Project
          </Button>        </span>
        <Button 
          variant="ghost" 
          size="icon"
          class="h-6 w-6 text-blue-800"
          onclick={() => bannerVisible = false}
          aria-label="Dismiss banner"
          data-testid="dismiss-demo-banner"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </Button>      </div>
    </div>
  {/if}
  
  <div>
    {#if typeof children === "function"} 
      {@render children()} 
    {/if}
  </div>
</div>