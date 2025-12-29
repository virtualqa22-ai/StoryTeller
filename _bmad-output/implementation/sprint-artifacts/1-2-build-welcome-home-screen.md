# Story 1.2: Build Welcome Home Screen

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As an author,
I want to see a welcoming home screen when I launch StoryTeller,
So that I understand what the application does and feel ready to begin.

## Acceptance Criteria

**Given** the user launches StoryTeller for the first time
**When** the home screen renders
**Then** a welcome message is displayed: "Welcome to StoryTeller - Your AI-Powered Novel Writing Companion"
**And** a hero section explains the app's purpose: "Write, organize, and publish your novel with AI assistance that maintains perfect consistency across 80,000+ words"
**And** an illustration or hero image conveys creativity and writing
**And** if the hero image fails to load, a fallback placeholder is displayed
**And** the layout follows Fluent Design principles with proper spacing

**Given** the home screen is displayed
**When** the user views the main actions
**Then** a prominent "Create New Project" button is displayed (primary action)
**And** an "Open Existing Project" button is displayed (secondary action)
**And** both buttons are keyboard accessible (Tab navigation)
**And** both buttons have hover states and click feedback
**And** the "Create New Project" button is visually emphasized

**Given** the user has not created any projects yet
**When** they view the home screen
**Then** an empty state section shows: "No projects yet - let's create your first novel!"
**And** feature highlights are displayed: "✓ AI-Powered Writing", "✓ Story Bible Memory", "✓ Professional Export"
**And** a brief "What is StoryTeller?" explanation is visible
**And** all text uses the Fluent Design typography system

**Given** the home screen is rendered
**When** the user clicks "Create New Project"
**Then** a message is displayed: "Project wizard coming soon in Epic 2!"
**And** the message displays for 3 seconds then fades out
**And** the button shows feedback but doesn't navigate anywhere yet

**Given** the home screen is rendered
**When** the user clicks "Open Existing Project"
**Then** a message is displayed: "Project opening coming soon in Epic 2!"
**And** the message displays for 3 seconds then fades out
**And** the button shows feedback but doesn't navigate anywhere yet

## Tasks / Subtasks

- [x] Task 1: Design home screen layout structure (AC: 1, 2, 3)
  - [x] Create component file `src/routes/+page.svelte` (replace existing template)
  - [x] Structure layout with hero section, actions section, and feature highlights
  - [x] Apply Fluent Design spacing and typography tokens

- [x] Task 2: Implement welcome hero section (AC: 1)
  - [x] Add welcome message header: "Welcome to StoryTeller - Your AI-Powered Novel Writing Companion"
  - [x] Add hero description text explaining the app's purpose
  - [x] Add placeholder hero image/illustration (use SVG or placeholder)
  - [x] Apply Fluent typography classes

- [x] Task 3: Build primary action buttons (AC: 2)
  - [x] Create "Create New Project" button (primary variant)
  - [x] Create "Open Existing Project" button (secondary variant)
  - [x] Add click handlers with temporary placeholder messages
  - [x] Display placeholder messages as inline text below buttons with 3-second auto-fade
  - [x] Ensure keyboard accessibility (tab navigation, focus states)
  - [x] Add hover and active states with visual feedback

- [x] Task 4: Add empty state and feature highlights (AC: 3)
  - [x] Display empty state message: "No projects yet - let's create your first novel!"
  - [x] Add feature highlights with checkmarks
  - [x] Add "What is StoryTeller?" explanation section
  - [x] Style using Fluent Design tokens

- [x] Task 5: Test responsiveness and accessibility (AC: All)
  - [x] Test keyboard navigation (Tab through buttons)
  - [x] Verify hover states and click feedback
  - [x] Test button click handlers (placeholder messages with debouncing)
  - [x] Test window resizing behavior (layout should scale proportionally within 1280x800 window constraints)
  - [x] Verify Fluent Design compliance

## Dev Notes

### 🔥 CRITICAL: Previous Story Learnings (Story 1.1)

**Project Structure Established:**
- Working Tauri 2.0 + Svelte 5 project in `storyteller/` directory
- SvelteKit routing structure: `src/routes/+page.svelte` is the home screen
- Current `+page.svelte` has basic Tauri greeting template (will be replaced)
- Svelte 5 with Runes already working (`$state` used in existing code)

**Files Modified in Story 1.1:**
- `storyteller/package.json` - Contains Svelte 5, SvelteKit, Tauri dependencies
- `storyteller/src/routes/+page.svelte` - Current template file to be replaced
- `storyteller/src-tauri/tauri.conf.json` - App configuration
- `storyteller/src-tauri/icons/icon.png` - App icon already configured

**Development Commands Working:**
- `pnpm install` - Install dependencies
- `pnpm tauri dev` - Launch dev mode with HMR
- `pnpm check` - TypeScript type checking
- `pnpm tauri build` - Build production installers

**Important Notes from Story 1.1:**
- HMR (Hot Module Replacement) is working - changes reflect instantly
- TypeScript strict mode is enabled
- Project uses SvelteKit (not plain Svelte) - follow SvelteKit conventions
- Window size configured: 1280x800, resizable

### 🏗️ Architecture Compliance

**Frontend Architecture (Source: `_bmad-output/architecture/core-architectural-decisions/frontend-architecture.md`):**

### 🔥 CRITICAL: SvelteKit Application Context

**This is a SvelteKit application, NOT plain Svelte:**
- Use SvelteKit routing conventions (+page.svelte files)
- No App.svelte or main.ts (those are plain Svelte concepts)
- Routing handled by file structure in `src/routes/`
- Global layouts in `src/routes/+layout.svelte` (if needed)
- Follow SvelteKit documentation for any framework-specific features

**Story 1.1 Note:** "Project uses SvelteKit (not plain Svelte) - follow SvelteKit conventions"

**Styling System:**
- **CRITICAL:** This story does NOT implement Tailwind yet (that's Story 1.3)
- **Use scoped Svelte styles (`<style>` blocks) for now**
- **⚠️ TEMPORARY: These Fluent Design values below will be replaced with Tailwind config in Story 1.3**
- **Prepare layout for easy Tailwind migration in Story 1.3**
- Use semantic CSS class names that map to Fluent Design concepts
- Avoid inline styles - use `<style>` blocks only

**State Management:**
- Use Svelte 5 Runes for local state: `$state()`, `$derived()`
- No external state libraries needed for this simple screen
- Example from existing code: `let greetMsg = $state("")`

**Fluent Design Principles to Follow (Manual CSS for now):**
- **Colors:**
  - Primary brand: `#0078d4`
  - Primary hover: `#106ebe`
  - Primary pressed: `#005a9e`
  - Neutral background: `#faf9f8`
  - Neutral stroke/border: `#e1dfdd`
- **Typography:**
  - Font family: Use CSS custom property `--font-fluent: 'Segoe UI', system-ui, sans-serif;` for easy Tailwind migration in Story 1.3
  - Title size: 28px / line-height 36px
  - Subtitle size: 18px / line-height 24px
  - Body size: 14px / line-height 20px
- **Spacing:**
  - Base unit: 4px
  - Common values: 8px, 12px, 16px, 24px
- **Border Radius:**
  - Small: 2px
  - Medium: 4px
  - Large: 6px
- **Button Design:**
  - Primary: Brand color background, white text
  - Secondary: Neutral background, gray text, border
  - Padding: 16px horizontal, 8-12px vertical
  - Transition: 200ms for hover/active states
  - Focus: 2px outline in brand color

### 📁 File Structure

**Current Structure (from Story 1.1):**
```
storyteller/
├── src/
│   ├── routes/
│   │   ├── +layout.ts             # SvelteKit layout config
│   │   └── +page.svelte           # ← MODIFY THIS FILE (home screen)
│   ├── lib/
│   │   └── components/            # ⚠️ Already exists from Story 1.1 init, reserved for Story 1.5
│   ├── app.html                   # HTML template
├── src-tauri/
│   ├── src/main.rs
│   ├── Cargo.toml
│   ├── tauri.conf.json
│   └── icons/icon.png
├── static/                        # ← Already exists from Story 1.1 initialization
├── package.json
├── tsconfig.json
└── vite.config.ts
```

**File to Modify:**
- `src/routes/+page.svelte` - Replace entire content with home screen

**Assets (Optional):**
- If adding hero image: Place in existing `static/` folder (e.g., `static/hero.svg`)
- Access in Svelte: `<img src="/hero.svg" alt="..." />`

### 📝 Content to Display

**"What is StoryTeller?" Section Text:**
```
What is StoryTeller?

StoryTeller is your intelligent companion for novel writing. It helps you write, organize, and maintain consistency across your entire novel using AI-powered Story Bible memory. Perfect for authors working on 80,000+ word manuscripts who need to track characters, locations, plot threads, and world-building details.
```

Use this exact text in the home screen implementation.

### 🎨 Recommended Home Screen Layout Structure

```svelte
<script lang="ts">
  // Use Svelte 5 runes for state
  let showCreateMessage = $state(false);
  let showOpenMessage = $state(false);

  function handleCreateProject() {
    showCreateMessage = true;
    // Will show: "Project wizard coming soon in Epic 2!"
  }

  function handleOpenProject() {
    showOpenMessage = true;
    // Will show: "Project opening coming soon in Epic 2!"
  }
</script>

<main class="home-container">
  <!-- Hero Section -->
  <section class="hero">
    <h1 class="welcome-title">Welcome to StoryTeller - Your AI-Powered Novel Writing Companion</h1>
    <p class="hero-description">
      Write, organize, and publish your novel with AI assistance that maintains
      perfect consistency across 80,000+ words
    </p>
    <!-- Optional: Hero image placeholder -->
  </section>

  <!-- Primary Actions -->
  <section class="actions">
    <button class="btn-primary" on:click={handleCreateProject}>
      Create New Project
    </button>
    <button class="btn-secondary" on:click={handleOpenProject}>
      Open Existing Project
    </button>
  </section>

  <!-- Empty State & Features -->
  <section class="features">
    <p class="empty-state">No projects yet - let's create your first novel!</p>
    <div class="feature-list">
      <div class="feature-item">✓ AI-Powered Writing</div>
      <div class="feature-item">✓ Story Bible Memory</div>
      <div class="feature-item">✓ Professional Export</div>
    </div>
    <div class="what-is">
      <strong>What is StoryTeller?</strong><br>
      StoryTeller is your intelligent companion for novel writing. It helps you write, organize, and maintain consistency across your entire novel using AI-powered Story Bible memory. Perfect for authors working on 80,000+ word manuscripts who need to track characters, locations, plot threads, and world-building details.
    </div>
  </section>

  <!-- Placeholder Messages -->
  {#if showCreateMessage}
    <div class="message">Project wizard coming soon in Epic 2!</div>
  {/if}
  {#if showOpenMessage}
    <div class="message">Project opening coming soon in Epic 2!</div>
  {/if}
</main>

<style>
  /* Apply Fluent Design tokens manually */
  /* Will be replaced with Tailwind classes in Story 1.3 */

  .home-container {
    /* Layout and spacing */
  }

  .btn-primary {
    background-color: #0078d4;
    color: white;
    /* Add hover, focus, active states */
  }

  /* ... more styles ... */
</style>
```

### 🚫 Anti-Patterns (Do Not Implement)

- ❌ **No Tailwind CSS yet** - That's Story 1.3. Use scoped `<style>` blocks.
- ❌ **No actual navigation** - Buttons show placeholder messages only.
- ❌ **No database/storage** - Just UI display, no persistence.
- ❌ **No external component libraries** - Build with native Svelte.
- ❌ **No complex state management** - Simple local state with `$state()` is sufficient.
- ❌ **No API calls or Rust commands** - Pure frontend UI only.

### ⚡ Button Click Handling

**IMPORTANT: Debounce button clicks to prevent rapid-fire placeholder messages**
- Implement 300ms debounce on button click handlers
- Prevents users from triggering multiple "coming soon" messages by clicking rapidly
- Example pattern:
```typescript
let lastClickTime = 0;
function handleCreateProject() {
  const now = Date.now();
  if (now - lastClickTime < 300) return; // Debounce 300ms
  lastClickTime = now;
  showCreateMessage = true;
  setTimeout(() => showCreateMessage = false, 3000); // Auto-hide after 3s
}
```

### ⚡ Performance Requirements

**NFR-P1: UI Interactions <150ms**
- Button visual feedback should be instant (<16ms CSS transition)
- Hover states should be immediate (no delay)
- Click feedback should show within one frame (60 FPS)
- Use CSS transitions (200ms) for smooth visual feedback
- Note: The 150ms limit applies to database operations (not applicable to this story - no database yet)

**NFR-C1-C3: Cross-Platform Rendering**
- Verify home screen renders correctly on Windows (primary test platform)
- Layout should be responsive to window resizing

### 🎯 Definition of Done

1. **Home screen replaces template:** `+page.svelte` no longer shows Tauri greeting.
2. **Welcome message visible:** "Welcome to StoryTeller..." displays correctly.
3. **Hero section complete:** Description and layout follow Fluent Design.
4. **Buttons functional:** Both buttons display placeholder messages on click.
5. **Keyboard accessible:** Tab navigation works, focus states visible.
6. **Empty state visible:** Feature highlights and "What is StoryTeller?" text displays.
7. **Visual polish:** Hover states, spacing, typography match Fluent Design principles.
8. **Dev mode works:** `pnpm tauri dev` launches with new home screen.
9. **No console errors:** TypeScript and runtime errors resolved.
10. **Ready for Story 1.3:** Layout structure allows easy Tailwind CSS integration.

### 📚 Reference Documentation

**Epic Context:**
- Source: `_bmad-output/planning/epics/epic-1-foundation-project-initialization-starter-template.md`
- Epic 1 establishes the foundational desktop application
- Story 1.2 creates the first user-facing screen
- Next: Story 1.3 adds Tailwind CSS styling system
- Next: Story 1.4 adds testing infrastructure
- Next: Story 1.5 builds reusable component library

**Architecture Decisions:**
- Source: `_bmad-output/architecture/core-architectural-decisions/frontend-architecture.md`
- Svelte 5 Runes for state management (no external libraries)
- Fluent Design principles for UI consistency
- ProseMirror for rich text editor (future epic)

**Git History Intelligence:**
- Last commit (0650101): "feat: complete story 1-1 implementation"
- Files modified: tauri.conf.json, +page.svelte, icons, sprint status
- Pattern: Story completion commits include story file + sprint status update

### 💡 Implementation Tips

**Svelte 5 Runes Usage:**
```typescript
// ✅ Correct - Svelte 5 Runes
let count = $state(0);
let doubled = $derived(count * 2);

// ❌ Wrong - Svelte 4 stores (deprecated)
import { writable } from 'svelte/store';
const count = writable(0);
```

**Fluent Design Button Pattern:**
```svelte
<button
  class="btn-primary"
  on:click={handleClick}
>
  Button Text
</button>

<style>
  .btn-primary {
    background-color: #0078d4;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 12px 16px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 200ms;
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
</style>
```

**Accessibility Checklist:**
- ✅ Buttons have semantic `<button>` elements (not `<div>` with click)
- ✅ Focus states are visible (outline on Tab focus)
- ✅ Text has sufficient contrast (WCAG AA compliance)
- ✅ Interactive elements have hover/active states

### 🔄 Testing Checklist

**Before Manual Testing:**
0. Run `pnpm check` - Verify TypeScript type checking passes with no errors

**Manual Testing (Run `pnpm tauri dev`):**
1. App launches and displays new home screen (not template)
2. Welcome message and hero text are visible
3. "Create New Project" button displays placeholder message on click
4. "Open Existing Project" button displays placeholder message on click
5. Tab key navigates between buttons (keyboard accessibility)
6. Hover over buttons shows visual feedback
7. Click buttons shows active/pressed state
8. Feature highlights display correctly
9. "What is StoryTeller?" explanation text is fully visible with complete content
10. No console errors in browser DevTools

**Prepare for Story 1.3:**
- Ensure CSS classes are semantic (e.g., `.btn-primary` instead of `.button1`)
- Layout structure should be easy to convert to Tailwind utility classes
- Avoid overly complex nested styles

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

**Manual Testing Executed:**
- Ran `pnpm check` - TypeScript validation passed (0 errors, 0 warnings)
- Launched app via `pnpm tauri dev` - Home screen rendered correctly
- Tested keyboard Tab navigation - Focus states visible on both buttons
- Tested "Create New Project" button - Placeholder message displayed with 3s fade
- Tested "Open Existing Project" button - Placeholder message displayed with 3s fade
- Verified hover states on both buttons - Visual feedback working
- Verified all text content displays correctly including "What is StoryTeller?" section
- No console errors observed in dev environment

### Completion Notes List

Implemented complete home screen with all acceptance criteria:
- Hero section with welcome message, description, and SVG placeholder image (storyteller/src/routes/+page.svelte:26-52)
- Primary/secondary buttons with Fluent Design styling (storyteller/src/routes/+page.svelte:55-62)
- Placeholder messages with 3s auto-fade and 300ms debounce (storyteller/src/routes/+page.svelte:7-21, 65-74)
- Empty state, feature highlights, "What is StoryTeller?" text (storyteller/src/routes/+page.svelte:77-91)
- Fluent Design tokens via CSS custom properties (storyteller/src/routes/+page.svelte:95-96)
- Keyboard accessibility with focus states (storyteller/src/routes/+page.svelte:175-177, 195-197)
- Responsive design with media queries (storyteller/src/routes/+page.svelte:276-308)
- Fixed Svelte 5 deprecation warnings (on:click → onclick)

Type checking: ✅ Pass (pnpm check)
All ACs satisfied. Ready for Story 1.3 Tailwind migration.

### File List

- storyteller/src/routes/+page.svelte

### Senior Developer Review (AI) - Code Review

**Date:** 2025-12-25
**Reviewer:** Amelia (BMad Senior Dev Agent)

**Fixes Applied:**
1. Fixed "What is StoryTeller?" section spacing (removed extra `<br />` tag) - storyteller/src/routes/+page.svelte:85
2. Added comprehensive manual testing documentation to Debug Log References
3. Updated story status from "review" to "done" after all fixes validated

**Review Findings:**
- TypeScript check: ✅ Pass (0 errors, 0 warnings)
- All acceptance criteria implemented and tested
- Fluent Design principles correctly applied
- Keyboard accessibility verified
- Code quality: Clean implementation with proper Svelte 5 Runes usage

**Outcome:** Approved (Status: done)
