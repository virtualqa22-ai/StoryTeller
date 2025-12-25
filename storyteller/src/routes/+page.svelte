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

<main class="home-container">
  <!-- Hero Section -->
  <section class="hero">
    <h1 class="welcome-title">
      Welcome to StoryTeller - Your AI-Powered Novel Writing Companion
    </h1>
    <p class="hero-description">
      Write, organize, and publish your novel with AI assistance that maintains
      perfect consistency across 80,000+ words
    </p>
    <!-- Hero image with fallback -->
    <div class="hero-image-placeholder">
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
  <section class="actions">
    <button class="btn-primary" onclick={handleCreateProject} type="button">
      Create New Project
    </button>
    <button class="btn-secondary" onclick={handleOpenProject} type="button">
      Open Existing Project
    </button>
  </section>

  <!-- Placeholder Messages -->
  {#if showCreateMessage || showOpenMessage}
    <div class="message-container">
      {#if showCreateMessage}
        <p class="message">Project wizard coming soon in Epic 2!</p>
      {/if}
      {#if showOpenMessage}
        <p class="message">Project opening coming soon in Epic 2!</p>
      {/if}
    </div>
  {/if}

  <!-- Empty State & Features -->
  <section class="features">
    <p class="empty-state">No projects yet - let's create your first novel!</p>
    <div class="feature-list">
      <div class="feature-item">✓ AI-Powered Writing</div>
      <div class="feature-item">✓ Story Bible Memory</div>
      <div class="feature-item">✓ Professional Export</div>
    </div>
    <div class="what-is">
      <strong>What is StoryTeller?</strong><br />
      StoryTeller is your intelligent companion for novel writing. It helps you write,
      organize, and maintain consistency across your entire novel using AI-powered Story
      Bible memory. Perfect for authors working on 80,000+ word manuscripts who need to
      track characters, locations, plot threads, and world-building details.
    </div>
  </section>
</main>

<style>
  :global(:root) {
    --font-fluent: 'Segoe UI', system-ui, sans-serif;
  }

  .home-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 48px 24px;
    font-family: var(--font-fluent);
    color: #323130;
    background-color: #faf9f8;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  /* Hero Section */
  .hero {
    text-align: center;
    padding: 24px 0;
  }

  .welcome-title {
    font-size: 28px;
    line-height: 36px;
    font-weight: 600;
    color: #323130;
    margin: 0 0 16px 0;
  }

  .hero-description {
    font-size: 18px;
    line-height: 24px;
    color: #605e5c;
    margin: 0 0 24px 0;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }

  .hero-image-placeholder {
    display: flex;
    justify-content: center;
    margin-top: 16px;
  }

  /* Primary Actions */
  .actions {
    display: flex;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  .btn-primary,
  .btn-secondary {
    font-family: var(--font-fluent);
    font-size: 14px;
    font-weight: 500;
    border: none;
    border-radius: 4px;
    padding: 12px 16px;
    cursor: pointer;
    transition: all 200ms ease;
  }

  .btn-primary {
    background-color: #0078d4;
    color: white;
  }

  .btn-primary:hover {
    background-color: #106ebe;
  }

  .btn-primary:active {
    background-color: #005a9e;
  }

  .btn-primary:focus {
    outline: 2px solid #0078d4;
    outline-offset: 2px;
  }

  .btn-secondary {
    background-color: #faf9f8;
    color: #323130;
    border: 1px solid #e1dfdd;
  }

  .btn-secondary:hover {
    background-color: #f3f2f1;
    border-color: #c8c6c4;
  }

  .btn-secondary:active {
    background-color: #edebe9;
  }

  .btn-secondary:focus {
    outline: 2px solid #0078d4;
    outline-offset: 2px;
  }

  /* Message Container */
  .message-container {
    text-align: center;
    padding: 12px 0;
  }

  .message {
    display: inline-block;
    background-color: #fff4ce;
    color: #323130;
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 14px;
    border: 1px solid #f7630c;
    animation: fadeIn 200ms ease-in;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Features Section */
  .features {
    text-align: center;
    padding: 24px 0;
  }

  .empty-state {
    font-size: 18px;
    line-height: 24px;
    color: #605e5c;
    margin: 0 0 24px 0;
    font-weight: 500;
  }

  .feature-list {
    display: flex;
    justify-content: center;
    gap: 24px;
    flex-wrap: wrap;
    margin-bottom: 32px;
  }

  .feature-item {
    font-size: 14px;
    line-height: 20px;
    color: #107c10;
    font-weight: 500;
  }

  .what-is {
    max-width: 700px;
    margin: 0 auto;
    padding: 24px;
    background-color: white;
    border-radius: 6px;
    border: 1px solid #e1dfdd;
    text-align: left;
    font-size: 14px;
    line-height: 20px;
    color: #323130;
  }

  .what-is strong {
    font-size: 16px;
    color: #323130;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .home-container {
      padding: 24px 16px;
      gap: 24px;
    }

    .welcome-title {
      font-size: 24px;
      line-height: 32px;
    }

    .hero-description {
      font-size: 16px;
      line-height: 22px;
    }

    .actions {
      flex-direction: column;
      align-items: center;
    }

    .btn-primary,
    .btn-secondary {
      width: 100%;
      max-width: 300px;
    }

    .feature-list {
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
  }
</style>
