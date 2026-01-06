<script lang="ts">
  import Dialog from '$lib/components/ui/dialog/dialog.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  
  type Props = {
    isOpen?: boolean;
    onClose?: () => void;
    onExploreDemo?: () => void;
    onCreateProject?: () => void;
    onSkipTour?: () => void;
    [key: string]: any;
  };
  
  let { 
    isOpen = false, 
    onClose, 
    onExploreDemo, 
    onCreateProject, 
    onSkipTour,
    ...rest
  }: Props = $props();
  
  let dialogOpen = $state(isOpen);
  
  $effect(() => {
    dialogOpen = isOpen;
  });
  
  $effect(() => {
    dialogOpen = isOpen;
  });
  
  function handleClose() {
    dialogOpen = false;
    if (onClose) onClose();
  }
  
  function handleOpenChange(newOpen: boolean) {
    if (!newOpen) {
      handleClose();
    }
  }
</script>

<Dialog bind:open={dialogOpen} onOpenChange={handleOpenChange} {...rest}>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="fixed inset-0 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"></div>
    <div class="relative z-50 w-full max-w-md bg-white p-6 mx-auto my-auto rounded-lg shadow-lg">
      <div class="flex flex-col space-y-1.5 text-center sm:text-left">
        <h2 class="text-lg font-semibold leading-none tracking-tight">
          Welcome to StoryTeller
        </h2>
        <p class="text-sm text-muted-foreground">
          StoryTeller helps you write consistent, high-quality novels with AI-powered assistance and intelligent Story Bible management.
        </p>
      </div>
      
      <div class="py-4">
        <div class="flex flex-col gap-3 w-full">
          <Button 
            variant="default" 
            class="w-full"
            onclick={() => {
              if (onCreateProject) onCreateProject();
              handleClose();
            }}
            data-testid="create-project-button"
          >
            Create My First Project
          </Button>
          
          <Button 
            variant="secondary" 
            class="w-full"
            onclick={() => {
              if (onExploreDemo) onExploreDemo();
              handleClose();
            }}
            data-testid="explore-demo-button"
          >
            Explore Demo Project
          </Button>
        </div>
      </div>
      
      <div class="flex justify-end pt-4">
        <Button 
          variant="ghost" 
          class="text-sm p-0 h-auto"
          onclick={() => {
            if (onSkipTour) onSkipTour();
            handleClose();
          }}
          data-testid="skip-tour-link"
        >
          Skip Tour
        </Button>
      </div>
    </div>
  </div>
</Dialog>