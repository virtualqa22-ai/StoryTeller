# Dev Notes

## 🔥 CRITICAL ARCHITECTURE CONTEXT

**Database Foundation (Story 2.1 - COMPLETED):**
- Projects table schema with 19 fields exists in V2 migration
- Tauri commands available: `list_recent_projects`, `get_project`, `delete_project`
- Projects ordered by `last_opened_at DESC` with NULL handling
- Default limit: 10 projects
- All CRUD operations tested with 9 unit tests passing

**Frontend Technology Stack:**
- **Framework:** Svelte 5 with runes ($state, $derived, $effect)
- **Routing:** SvelteKit with adapter-static for Tauri
- **Styling:** Tailwind CSS v4.1.18 (CSS-first config)
- **Components:** bits-ui 1.0.0-next.98 (child snippets pattern)
- **State Management:** Svelte 5 runes only (no external stores)
- **TypeScript:** ~5.6.2 (strict mode)
- **Testing:** Vitest 4.0.16 (unit), Playwright 1.57.0 (E2E)

**Existing UI Components Available:**
- Button (src/lib/components/ui/button/) - variants: default, destructive, outline, secondary, ghost, link
- Card (src/lib/components/ui/card/) - Card, CardHeader, CardTitle, CardContent, CardFooter
- Badge (src/lib/components/ui/badge/) - use for genre labels
- Spinner (src/lib/components/ui/spinner/) - loading states
- PageLayout (src/lib/components/ui/container/) - page wrapper with header/sidebar/footer snippets

**Fluent Design Tokens (app.css):**
```css
/* Colors */
--color-brand-primary: #0078d4;
--color-brand-hover: #106ebe;
--color-brand-pressed: #005a9e;
--color-neutral-bg: #faf9f8;
--color-neutral-stroke: #e1dfdd;

/* Spacing (4px base unit) */
--spacing-fluent-xs: 4px;
--spacing-fluent-sm: 8px;
--spacing-fluent-md: 12px;
--spacing-fluent-lg: 16px;
--spacing-fluent-xl: 24px;

/* Border Radius */
--radius-fluent-sm: 2px;
--radius-fluent-md: 4px;
--radius-fluent-lg: 6px;

/* Elevation Shadows */
--shadow-fluent-2: 0 0.3px 0.9px rgba(0, 0, 0, 0.1), 0 1.6px 3.6px rgba(0, 0, 0, 0.13);
--shadow-fluent-4: 0 0.6px 1.8px rgba(0, 0, 0, 0.1), 0 3.2px 7.2px rgba(0, 0, 0, 0.13);
--shadow-fluent-8: 0 1.2px 3.6px rgba(0, 0, 0, 0.1), 0 6.4px 14.4px rgba(0, 0, 0, 0.13);

/* Typography */
--font-family-fluent: Segoe UI, system-ui, sans-serif;
--font-size-fluent-caption: 12px;
--font-size-fluent-body: 14px;
--font-size-fluent-subtitle: 18px;
--font-size-fluent-title: 28px;
```

## 📋 COPY-PASTE REFERENCE - Implementation Patterns

### TypeScript API Wrapper Pattern (src/lib/api/projects.ts)

```typescript
import { invoke } from '@tauri-apps/api/core';

/**
 * Project interface matching Rust Project struct
 */
export interface Project {
  id: number;
  title: string;
  author_name: string | null;
  pen_name: string | null;
  tagline: string | null;
  genre: string | null;
  subgenre: string | null;
  target_audience: string | null;
  tone: string | null;
  point_of_view: string | null;
  story_framework: string | null;
  chapter_count: number | null;
  target_words_per_chapter: number | null;
  plot_premise: string | null;
  language: string;
  created_at: string;
  updated_at: string;
  file_path: string;
  last_opened_at: string | null;
}

/**
 * Fetch recent projects ordered by last_opened_at DESC
 * @param limit - Number of projects to return (default: 10)
 * @returns Promise<Project[]>
 */
export async function listRecentProjects(limit?: number): Promise<Project[]> {
  return invoke<Project[]>('list_recent_projects', { limit });
}

/**
 * Get project by ID
 * @param id - Project ID
 * @returns Promise<Project>
 */
export async function getProject(id: number): Promise<Project> {
  return invoke<Project>('get_project', { id });
}

/**
 * Delete project by ID
 * @param id - Project ID
 * @returns Promise<void>
 */
export async function deleteProject(id: number): Promise<void> {
  return invoke<void>('delete_project', { id });
}
```

### Relative Time Formatting Utility (src/lib/utils/formatDate.ts)

```typescript
/**
 * Format timestamp as relative time (e.g., "2 hours ago")
 * @param timestamp - ISO 8601 timestamp string or null
 * @returns Formatted relative time string
 */
export function formatRelativeTime(timestamp: string | null): string {
  if (!timestamp) return 'Never opened';

  const now = new Date();
  const then = new Date(timestamp);

  // Handle invalid dates
  if (isNaN(then.getTime())) return 'Unknown';

  // Handle future dates (clock skew)
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);
  if (seconds < 0) return 'just now';

  if (seconds < 60) return 'just now';
  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }
  if (seconds < 604800) {
    const days = Math.floor(seconds / 86400);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }

  // More than a week ago, show actual date
  return then.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
```

### Svelte 5 Runes Pattern (src/routes/+page.svelte)

```svelte
<script lang="ts">
  import { listRecentProjects, type Project } from '$lib/api/projects';
  import EmptyState from '$lib/components/projects/EmptyState.svelte';
  import ProjectCard from '$lib/components/projects/ProjectCard.svelte';
  import Spinner from '$lib/components/ui/spinner/spinner.svelte';
  import Button from '$lib/components/ui/button/button.svelte';

  // State management with Svelte 5 runes
  let projects = $state<Project[]>([]);
  let loading = $state(true);
  let error = $state<string | null>(null);

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
    // Project opening now implemented in Story 2.8 (navigates to main workspace)
  }

  function handleCreateProject() {
    console.log('Creating new project');
    // TODO: Implement wizard in Story 2.3
  }
</script>

<div class="min-h-screen bg-neutral-bg p-8">
  {#if loading}
    <div class="flex items-center justify-center h-screen">
      <Spinner size="lg" />
    </div>
  {:else if error}
    <div class="text-center p-8">
      <p class="text-danger text-lg">{error}</p>
      <Button onclick={loadProjects} class="mt-4">Retry</Button>
    </div>
  {:else if !hasProjects}
    <EmptyState />
  {:else}
    <div class="max-w-6xl mx-auto">
      <div class="mb-8 flex items-center justify-between">
        <h1 class="text-fluent-title font-semibold">Recent Projects</h1>
        <Button onclick={handleCreateProject} variant="default">
          Create New Project
        </Button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each projects as project (project.id)}
          <ProjectCard {project} onclick={() => handleProjectClick(project)} />
        {/each}
      </div>

      {#if hasMoreProjects}
        <div class="text-center mt-8">
          <Button variant="link">View All Projects</Button>
        </div>
      {/if}
    </div>
  {/if}
</div>
```

### ProjectCard Component (src/lib/components/projects/ProjectCard.svelte)

```svelte
<script lang="ts">
  import { formatRelativeTime } from '$lib/utils/formatDate';
  import type { Project } from '$lib/api/projects';
  import Card from '$lib/components/ui/card/card.svelte';
  import CardHeader from '$lib/components/ui/card/card-header.svelte';
  import CardTitle from '$lib/components/ui/card/card-title.svelte';
  import CardContent from '$lib/components/ui/card/card-content.svelte';
  import CardFooter from '$lib/components/ui/card/card-footer.svelte';
  import Badge from '$lib/components/ui/badge/badge.svelte';

  interface Props {
    project: Project;
    onclick?: () => void;
  }

  let { project, onclick }: Props = $props();

  // Calculate target word count
  const targetWords = (project.chapter_count || 20) * (project.target_words_per_chapter || 3000);
  const currentWords = 0; // TODO: Will be implemented in Epic 5
  const progress = `${currentWords.toLocaleString()} / ${targetWords.toLocaleString()} words`;

  // Get display name (pen name takes precedence)
  const authorName = project.pen_name || project.author_name || 'Unknown Author';

  // Format last opened time
  const lastOpened = formatRelativeTime(project.last_opened_at);

  // Genre icon mapping (use emoji placeholders)
  const genreIcons: Record<string, string> = {
    'Thriller': '🔪',
    'Romance': '❤️',
    'Fantasy': '🐉',
    'Sci-Fi': '🚀',
    'Mystery': '🔍',
    'Horror': '👻',
    'Literary Fiction': '📚',
    'Historical Fiction': '📜',
    'Other': '📖'
  };
  const genreIcon = project.genre ? (genreIcons[project.genre] || '📖') : '📖';
</script>

<Card
  class="cursor-pointer transition-all hover:shadow-fluent-8 hover:-translate-y-1 active:scale-99"
  data-testid="project-card"
  onclick={onclick}
  role="button"
  tabindex={0}
  aria-label={`Open project: ${project.title}`}
>
  <CardHeader>
    <div class="flex items-start justify-between">
      <span class="text-3xl" aria-hidden="true">{genreIcon}</span>
      {#if project.genre}
        <Badge variant="secondary" class="text-xs">{project.genre}</Badge>
      {/if}
    </div>
  </CardHeader>

  <CardContent class="space-y-2">
    <CardTitle class="text-fluent-subtitle line-clamp-2">
      {project.title}
    </CardTitle>
    <p class="text-sm text-neutral-600">by {authorName}</p>

    <div class="pt-2">
      <div class="w-full bg-neutral-200 rounded-full h-2 mb-1">
        <div
          class="bg-brand-primary h-2 rounded-full"
          style="width: 0%"
          aria-label={`Progress: 0%`}
        />
      </div>
      <p class="text-xs text-neutral-600">{progress}</p>
    </div>
  </CardContent>

  <CardFooter>
    <p class="text-xs text-neutral-500">Last opened {lastOpened}</p>
  </CardFooter>
</Card>
```

## 🗂️ Project Structure Notes

**Files to Create:**
```
src/lib/
├── api/
│   └── projects.ts              # NEW: TypeScript API wrappers
├── utils/
│   └── formatDate.ts            # NEW: Date formatting utilities
└── components/
    └── projects/                # NEW: Project-related components
        ├── ProjectCard.svelte
        └── EmptyState.svelte

src/routes/
└── +page.svelte                 # MODIFY: Replace placeholder with home screen

tests/e2e/
└── home.spec.ts                 # NEW: E2E tests for home screen
```

**Naming Conventions:**
- Components: PascalCase.svelte (ProjectCard.svelte)
- Utilities: camelCase.ts (formatDate.ts)
- Routes: +page.svelte, +layout.svelte
- Functions: camelCase (listRecentProjects, formatRelativeTime)

## 🧪 Testing Strategy

**Unit Tests (Vitest):**
- Test formatRelativeTime with various timestamps (null, past, edge cases)
- Test ProjectCard rendering with different project data
- Test EmptyState component rendering
- Target: 85%+ code coverage

**E2E Tests (Playwright):**
```typescript
// tests/e2e/home.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Home Screen', () => {
  test('displays welcome message when no projects', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Welcome to StoryTeller')).toBeVisible();
    await expect(page.locator('button:has-text("Create New Project")')).toBeVisible();
  });

  test('displays recent projects list', async ({ page }) => {
    // TODO: Setup test data via Tauri commands in test setup
    await page.goto('/');
    await expect(page.locator('[data-testid="project-card"]').first()).toBeVisible();
  });

  test('shows loading state initially', async ({ page }) => {
    await page.goto('/');
    // Loading state should appear briefly
    // This may be too fast to test reliably - consider mock delay
  });
});
```

## 🎯 Scope Boundaries

**This Story DOES:**
- Create home screen UI with empty state and recent projects list
- Implement TypeScript API wrappers for Tauri commands
- Create reusable ProjectCard component
- Display projects ordered by last_opened_at
- Show relative time ("2 hours ago") for last opened
- Add loading and error states
- Implement responsive layout (desktop focus)
- Write unit and E2E tests

**This Story Does NOT:**
- Implement project opening logic (Story 2.8 - now implemented)
- Implement "Create New Project" wizard (Story 2.3-2.8)
- Implement actual word count tracking (Epic 5)
- Implement "Open in File Explorer" (needs platform-specific code)
- Implement full context menu functionality (basic stub only)
- Implement "View All Projects" page (future enhancement)
- Implement project thumbnails (use genre icons/emojis for now)

**Temporary Stubs/Placeholders:**
- Word count: Always shows "0 / targetWords" (Epic 5 will track actual words)
- Genre icons: Emoji placeholders (📚, 🔍, ❤️, etc.)
- Project opening: Now implemented in Story 2.8 (navigates to main workspace)
- Create button: Console.log only (Story 2.3 implements wizard)
- Context menu: Visual only, no platform-specific actions yet

## 🔗 Previous Story Learnings (Story 2.1)

**Code Patterns to Follow:**
1. **Module Export Pattern:** Use `export` in module files, `pub mod` in Rust
2. **Validation Pattern:** Validate at both DB layer (constraints) and application layer (Rust methods)
3. **Test Pattern:** Use tempfile for database tests, clean up after tests
4. **Error Handling:** Use Result<T, String> for Tauri commands
5. **TypeScript Types:** Match Rust structs exactly, use optional (?) for nullable fields

**Files Modified in Story 2.1:**
- Created: migrations/V2__create_projects_schema.sql
- Created: db/models/project.rs, db/projects.rs, db/commands/project_commands.rs
- Modified: db/mod.rs, lib.rs (added module exports and command registration)
- Pattern: Follow same module organization for frontend code

**Testing Approach:**
- 9 Rust unit tests (CRUD operations, constraints, triggers)
- 7 integration tests (migration validation)
- All tests passing before merge
- Same rigor expected for frontend: unit tests + E2E tests

## 📚 References

- **Epic 2 Story Details:** [Source: _bmad-output/planning/epics/epic-2-project-setup-configuration-wizard.md#story-2-2]
- **Database Schema:** [Source: src-tauri/migrations/V2__create_projects_schema.sql]
- **Rust Project Model:** [Source: src-tauri/src/db/models/project.rs]
- **Tauri Commands:** [Source: src-tauri/src/db/commands/project_commands.rs]
- **Frontend Architecture:** [Source: _bmad-output/architecture/core-architectural-decisions/frontend-architecture.md]
- **UX Design Patterns:** [Source: _bmad-output/planning/ux-design/ux-patterns-micro-interactions.md]
- **Fluent Design Tokens:** [Source: src/app.css]
- **Existing UI Components:** [Source: src/lib/components/ui/]
- **Previous Story (2.1):** [Source: _bmad-output/implementation/sprint-artifacts/2-1-design-and-implement-database-schema-for-projects/index.md]

## 🚀 Library Versions & Latest Info

**Current Versions (package.json):**
- Svelte: ^5.0.0 (use runes: $state, $derived, $effect)
- SvelteKit: ^2.9.0 (adapter-static for Tauri)
- Tailwind CSS: ^4.1.18 (CSS-first config in app.css)
- TypeScript: ~5.6.2 (strict mode enabled)
- Vitest: ^4.0.16 (unit testing)
- Playwright: ^1.57.0 (E2E testing)
- bits-ui: 1.0.0-next.98 (use child snippets, not render props)
- @tauri-apps/api: ^2 (invoke function from '@tauri-apps/api/core')

**Key API Changes (Svelte 5):**
- Use `$state()` instead of `let` for reactive variables
- Use `$derived()` instead of reactive declarations ($:)
- Use `$effect()` instead of `onMount` for side effects
- Component props: Use `let { prop } = $props()` pattern
- Children: Use Snippet type, not Snippet | string (bits-ui convention)

**Tauri 2 API:**
- Import invoke from '@tauri-apps/api/core' (not '@tauri-apps/api')
- Use `invoke<T>(command, args)` for type-safe commands
- Commands registered in lib.rs with `tauri::generate_handler![]`
