<script lang="ts">
  // Svelte 5 Runes for state management
  let showCreateMessage = $state(false);
  let showOpenMessage = $state(false);
  let lastClickTime = 0;

  function handleCreateProject() {
    const now = Date.now();
    if (now - lastClickTime < 300) return; // Debounce 300ms
    lastClickTime = now;
    showCreateMessage = true;
    setTimeout(() => (showCreateMessage = false), 3000); // Auto-hide after 3s
  }

  function handleOpenProject() {
    const now = Date.now();
    if (now - lastClickTime < 300) return; // Debounce 300ms
    lastClickTime = now;
    showOpenMessage = true;
    setTimeout(() => (showOpenMessage = false), 3000); // Auto-hide after 3s
  }
</script>

<main class="max-w-6xl mx-auto py-6 px-4 md:py-12 md:px-6 font-fluent text-gray-800 bg-neutral-bg min-h-screen flex flex-col gap-8">
  <!-- Hero Section -->
  <section class="text-center py-6">
    <h1 class="text-xl md:text-fluent-title font-semibold text-gray-800 mb-4">
      Welcome to StoryTeller - Your AI-Powered Novel Writing Companion
    </h1>
    <p class="text-fluent-subtitle text-gray-600 mb-6 max-w-2xl mx-auto">
      Write, organize, and publish your novel with AI assistance that maintains
      perfect consistency across 80,000+ words
    </p>
    <!-- Hero image with fallback -->
    <div class="flex justify-center mt-4">
      <svg
        width="200"
        height="150"
        viewBox="0 0 200 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Writing illustration"
      >
        <!-- Simple book icon as placeholder -->
        <rect x="50" y="30" width="100" height="90" rx="4" fill="#0078d4" opacity="0.2" />
        <rect x="60" y="40" width="80" height="70" rx="2" fill="#0078d4" opacity="0.4" />
        <line x1="75" y1="55" x2="135" y2="55" stroke="#0078d4" stroke-width="2" />
        <line x1="75" y1="70" x2="135" y2="70" stroke="#0078d4" stroke-width="2" />
        <line x1="75" y1="85" x2="120" y2="85" stroke="#0078d4" stroke-width="2" />
      </svg>
    </div>
  </section>

  <!-- Primary Actions -->
  <section class="flex flex-col md:flex-row justify-center items-center gap-4 flex-wrap">
    <button class="font-fluent text-fluent-body font-medium border-0 rounded-fluent-md px-4 py-3 cursor-pointer transition-all duration-200 bg-brand-primary text-white hover:bg-brand-hover active:bg-brand-pressed focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2" onclick={handleCreateProject} type="button">
      Create New Project
    </button>
    <button class="font-fluent text-fluent-body font-medium rounded-fluent-md px-4 py-3 cursor-pointer transition-all duration-200 bg-neutral-bg text-gray-800 border border-neutral-stroke hover:bg-gray-100 hover:border-gray-400 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2" onclick={handleOpenProject} type="button">
      Open Existing Project
    </button>
  </section>

  <!-- Placeholder Messages -->
  {#if showCreateMessage || showOpenMessage}
    <div class="text-center py-3">
      {#if showCreateMessage}
        <p class="inline-block bg-yellow-50 text-gray-800 px-4 py-2 rounded-fluent-md text-fluent-body border border-warning">Project wizard coming soon in Epic 2!</p>
      {/if}
      {#if showOpenMessage}
        <p class="inline-block bg-yellow-50 text-gray-800 px-4 py-2 rounded-fluent-md text-fluent-body border border-warning">Project opening coming soon in Epic 2!</p>
      {/if}
    </div>
  {/if}

  <!-- Empty State & Features -->
  <section class="text-center py-6">
    <p class="text-fluent-subtitle text-gray-600 mb-6 font-medium">No projects yet - let's create your first novel!</p>
    <div class="flex justify-center gap-6 flex-wrap mb-8">
      <div class="text-fluent-body text-success font-medium">✓ AI-Powered Writing</div>
      <div class="text-fluent-body text-success font-medium">✓ Story Bible Memory</div>
      <div class="text-fluent-body text-success font-medium">✓ Professional Export</div>
    </div>
    <div class="max-w-2xl mx-auto py-6 px-6 bg-white rounded-fluent-lg border border-neutral-stroke text-left text-fluent-body text-gray-800">
      <strong class="text-base text-gray-800">What is StoryTeller?</strong><br />
      StoryTeller is your intelligent companion for novel writing. It helps you write,
      organize, and maintain consistency across your entire novel using AI-powered Story
      Bible memory. Perfect for authors working on 80,000+ word manuscripts who need to
      track characters, locations, plot threads, and world-building details.
    </div>
  </section>
</main>
