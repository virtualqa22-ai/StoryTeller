# Domain Components

## ProjectCard
**Path:** `src/lib/components/projects/ProjectCard.svelte`
**Purpose:** Display card for a story project with metadata and progress
**Props:**
- `project: Project` - Project data object (required)
- `onclick?: () => void` - Click handler to open project
- `oncontextmenu?: (e: MouseEvent) => void` - Right-click handler for context menu

**Key Features:**
- Genre icon display
- Author name (pen name or real name)
- Progress bar (word count)
- Last opened timestamp (relative time)
- Hover effects and keyboard navigation
- Accessible with ARIA labels

**Usage:**
```svelte
<ProjectCard
  project={project}
  onclick={() => openProject(project.id)}
  oncontextmenu={handleContextMenu}
/>
```

**Dependencies:**
- `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter`
- `Badge`
- `$lib/utils/formatDate` (formatRelativeTime)
- `$lib/api/projects` (Project type)

**Tests:** `src/lib/components/projects/ProjectCard.test.ts`

**Referenced In:**
- `src/routes/+page.svelte` (Home screen)

---

## EmptyState
**Path:** `src/lib/components/projects/EmptyState.svelte`
**Purpose:** Display message when no projects exist
**Props:**
- `class?: string` - Additional CSS classes
- `title?: string` - Empty state heading
- `description?: string` - Empty state message
- `action?: Snippet` - Call-to-action button

**Key Features:**
- Centered layout
- Icon or illustration
- Primary action button
- Customizable messaging

**Usage:**
```svelte
<EmptyState
  title="No projects yet"
  description="Create your first story project to get started"
>
  {#snippet action()}
    <Button onclick={createProject}>Create Project</Button>
  {/snippet}
</EmptyState>
```

**Tests:** `src/lib/components/projects/EmptyState.test.ts`

**Referenced In:**
- `src/routes/+page.svelte` (Home screen when projects list is empty)

---
