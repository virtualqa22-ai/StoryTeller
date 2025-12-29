# Component Inventory

**Project:** StoryTeller
**Generated:** 2025-12-29
**Total Components:** 27 (25 UI + 2 Domain)

---

## Overview

This document catalogs all reusable Svelte components in the StoryTeller application, organized by category. Components follow Svelte 5 conventions using runes (`$props`, `$derived`, `$state`) and modern TypeScript patterns.

---

## Component Categories

### UI Components (25)
Generic, reusable UI primitives following Fluent Design principles

### Domain Components (2)
Application-specific components tied to business logic

---

## UI Components

### Layout Components

#### Container
**Path:** `src/lib/components/ui/container/container.svelte`
**Purpose:** Main content wrapper with responsive max-width
**Props:**
- `class?: string` - Additional CSS classes
- `children?: Snippet | string` - Content to render

**Usage:**
```svelte
<Container>
  <!-- Your content here -->
</Container>
```

**Tests:** `src/lib/components/ui/container/container.test.ts`

---

#### PageLayout
**Path:** `src/lib/components/ui/container/page-layout.svelte`
**Purpose:** Full-page layout wrapper with consistent padding and spacing
**Props:**
- `class?: string` - Additional CSS classes
- `children?: Snippet | string` - Page content

**Usage:**
```svelte
<PageLayout>
  <h1>Page Title</h1>
  <!-- Page content -->
</PageLayout>
```

**Tests:** Not yet implemented

---

#### Header
**Path:** `src/lib/components/ui/header/header.svelte`
**Purpose:** Application header with navigation and branding
**Props:**
- `class?: string` - Additional CSS classes
- `children?: Snippet | string` - Header content

**Usage:**
```svelte
<Header>
  <!-- Logo, navigation, etc. -->
</Header>
```

**Tests:** `src/lib/components/ui/header/header.test.ts`

---

#### Sidebar
**Path:** `src/lib/components/ui/sidebar/sidebar.svelte`
**Purpose:** Collapsible navigation sidebar
**Props:**
- `class?: string` - Additional CSS classes
- `children?: Snippet | string` - Sidebar content

**Usage:**
```svelte
<Sidebar>
  <!-- Navigation links -->
</Sidebar>
```

**Tests:** `src/lib/components/ui/sidebar/sidebar.test.ts`

---

### Interactive Components

#### Button
**Path:** `src/lib/components/ui/button/button.svelte`
**Purpose:** Primary interactive button with multiple variants and sizes
**Props:**
- `class?: string` - Additional CSS classes
- `variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"` - Visual style (default: "default")
- `size?: "default" | "sm" | "lg" | "icon"` - Button size (default: "default")
- `children?: Snippet | string` - Button label/content
- `...rest` - All native button attributes (onclick, disabled, type, etc.)

**Variants:**
- `default` - Primary brand button (blue background)
- `destructive` - Danger/delete actions (red background)
- `outline` - Secondary action (bordered, transparent)
- `secondary` - Alternative action (gray background)
- `ghost` - Subtle action (no background until hover)
- `link` - Text link styled as button

**Usage:**
```svelte
<Button onclick={handleClick}>Click Me</Button>
<Button variant="destructive" size="sm">Delete</Button>
<Button variant="outline">Cancel</Button>
```

**Tests:** `src/lib/components/ui/button/button.test.ts`

---

#### Input
**Path:** `src/lib/components/ui/input/input.svelte`
**Purpose:** Text input field with validation support
**Props:**
- `class?: string` - Additional CSS classes
- `type?: string` - Input type (text, password, email, etc.)
- `value?: string` - Input value
- `placeholder?: string` - Placeholder text
- `disabled?: boolean` - Disabled state
- `...rest` - All native input attributes

**Usage:**
```svelte
<Input type="text" placeholder="Enter title" bind:value={title} />
<Input type="email" placeholder="your@email.com" />
```

**Tests:** `src/lib/components/ui/input/input.test.ts`

---

#### Textarea
**Path:** `src/lib/components/ui/textarea/textarea.svelte`
**Purpose:** Multi-line text input
**Props:**
- `class?: string` - Additional CSS classes
- `value?: string` - Textarea value
- `placeholder?: string` - Placeholder text
- `rows?: number` - Number of visible rows
- `disabled?: boolean` - Disabled state
- `...rest` - All native textarea attributes

**Usage:**
```svelte
<Textarea placeholder="Enter description" rows={5} bind:value={description} />
```

**Tests:** `src/lib/components/ui/textarea/textarea.test.ts`

---

#### Switch
**Path:** `src/lib/components/ui/switch/switch.svelte`
**Purpose:** Toggle switch for boolean values
**Props:**
- `class?: string` - Additional CSS classes
- `checked?: boolean` - Checked state
- `disabled?: boolean` - Disabled state
- `onchange?: (checked: boolean) => void` - Change handler

**Usage:**
```svelte
<Switch bind:checked={isDarkMode} />
<Switch checked={true} disabled />
```

**Tests:** `src/lib/components/ui/switch/switch.test.ts`

---

#### Checkbox
**Path:** `src/lib/components/ui/checkbox/checkbox.svelte`
**Purpose:** Checkbox input for boolean selections
**Props:**
- `class?: string` - Additional CSS classes
- `checked?: boolean` - Checked state
- `disabled?: boolean` - Disabled state
- `...rest` - All native checkbox attributes

**Usage:**
```svelte
<Checkbox bind:checked={agreedToTerms} />
```

**Tests:** `src/lib/components/ui/checkbox/checkbox.test.ts`

---

#### Select
**Path:** `src/lib/components/ui/select/select.svelte`
**Purpose:** Dropdown selection input
**Props:**
- `class?: string` - Additional CSS classes
- `value?: string` - Selected value
- `options?: Array<{value: string, label: string}>` - Select options
- `placeholder?: string` - Placeholder text
- `disabled?: boolean` - Disabled state

**Usage:**
```svelte
<Select
  options={[
    {value: 'thriller', label: 'Thriller'},
    {value: 'romance', label: 'Romance'}
  ]}
  bind:value={genre}
/>
```

**Tests:** `src/lib/components/ui/select/select.test.ts`

---

### Display Components

#### Card
**Path:** `src/lib/components/ui/card/card.svelte`
**Purpose:** Container with border, background, and shadow
**Props:**
- `class?: string` - Additional CSS classes
- `children?: Snippet | string` - Card content

**Usage:**
```svelte
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

**Tests:** `src/lib/components/ui/card/card.test.ts`

---

#### CardHeader
**Path:** `src/lib/components/ui/card/card-header.svelte`
**Purpose:** Top section of a card with padding
**Props:**
- `class?: string` - Additional CSS classes
- `children?: Snippet | string` - Header content

**Usage:**
```svelte
<CardHeader>
  <CardTitle>My Card</CardTitle>
  <CardDescription>Card subtitle</CardDescription>
</CardHeader>
```

**Tests:** Tested as part of Card component

---

#### CardTitle
**Path:** `src/lib/components/ui/card/card-title.svelte`
**Purpose:** Main heading within a card header
**Props:**
- `class?: string` - Additional CSS classes
- `children?: Snippet | string` - Title text

**Usage:**
```svelte
<CardTitle>Project Name</CardTitle>
```

**Tests:** Tested as part of Card component

---

#### CardDescription
**Path:** `src/lib/components/ui/card/card-description.svelte`
**Purpose:** Subtitle or description within a card header
**Props:**
- `class?: string` - Additional CSS classes
- `children?: Snippet | string` - Description text

**Usage:**
```svelte
<CardDescription>A brief summary</CardDescription>
```

**Tests:** Tested as part of Card component

---

#### CardContent
**Path:** `src/lib/components/ui/card/card-content.svelte`
**Purpose:** Main content area of a card
**Props:**
- `class?: string` - Additional CSS classes
- `children?: Snippet | string` - Content

**Usage:**
```svelte
<CardContent>
  <p>Main card content goes here</p>
</CardContent>
```

**Tests:** Tested as part of Card component

---

#### CardFooter
**Path:** `src/lib/components/ui/card/card-footer.svelte`
**Purpose:** Bottom section of a card (actions, metadata)
**Props:**
- `class?: string` - Additional CSS classes
- `children?: Snippet | string` - Footer content

**Usage:**
```svelte
<CardFooter>
  <Button>Action</Button>
</CardFooter>
```

**Tests:** Tested as part of Card component

---

#### Badge
**Path:** `src/lib/components/ui/badge/badge.svelte`
**Purpose:** Small label for categories, status, or counts
**Props:**
- `class?: string` - Additional CSS classes
- `variant?: "default" | "secondary" | "destructive" | "outline"` - Visual style
- `children?: Snippet | string` - Badge text

**Usage:**
```svelte
<Badge>New</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="secondary">Draft</Badge>
```

**Tests:** `src/lib/components/ui/badge/badge.test.ts`

---

#### Spinner
**Path:** `src/lib/components/ui/spinner/spinner.svelte`
**Purpose:** Loading indicator
**Props:**
- `class?: string` - Additional CSS classes
- `size?: "sm" | "md" | "lg"` - Spinner size

**Usage:**
```svelte
<Spinner />
<Spinner size="lg" />
```

**Tests:** `src/lib/components/ui/spinner/spinner.test.ts`

---

#### Icon
**Path:** `src/lib/components/ui/icon/icon.svelte`
**Purpose:** Wrapper for Lucide icons
**Props:**
- `class?: string` - Additional CSS classes
- `name: string` - Lucide icon name
- `size?: number` - Icon size in pixels

**Usage:**
```svelte
<Icon name="heart" size={24} />
<Icon name="trash" class="text-red-500" />
```

**Tests:** `src/lib/components/ui/icon/icon.test.ts`

---

#### Tooltip
**Path:** `src/lib/components/ui/tooltip/tooltip.svelte`
**Purpose:** Hover tooltip for contextual information
**Props:**
- `class?: string` - Additional CSS classes
- `text: string` - Tooltip content
- `children?: Snippet` - Element to attach tooltip to

**Usage:**
```svelte
<Tooltip text="Delete project">
  <Button variant="ghost" size="icon">🗑️</Button>
</Tooltip>
```

**Tests:** `src/lib/components/ui/tooltip/tooltip.test.ts`

---

### Form Components

#### FormItem
**Path:** `src/lib/components/ui/form/form-item.svelte`
**Purpose:** Container for a form field with label and validation
**Props:**
- `class?: string` - Additional CSS classes
- `children?: Snippet` - Form field content

**Usage:**
```svelte
<FormItem>
  <Label>Project Title</Label>
  <Input bind:value={title} />
  <FormMessage error={titleError} />
</FormItem>
```

**Tests:** `src/lib/components/ui/form/form-item.test.ts`

---

#### FormDescription
**Path:** `src/lib/components/ui/form/form-description.svelte`
**Purpose:** Helper text for form fields
**Props:**
- `class?: string` - Additional CSS classes
- `children?: Snippet | string` - Description text

**Usage:**
```svelte
<FormDescription>Enter a unique title for your project</FormDescription>
```

**Tests:** Tested as part of FormItem

---

#### FormMessage
**Path:** `src/lib/components/ui/form/form-message.svelte`
**Purpose:** Validation error message display
**Props:**
- `class?: string` - Additional CSS classes
- `error?: string` - Error message to display
- `children?: Snippet | string` - Message content

**Usage:**
```svelte
<FormMessage error={validationError} />
```

**Tests:** Tested as part of FormItem

---

#### Label
**Path:** `src/lib/components/ui/label/label.svelte`
**Purpose:** Form field label
**Props:**
- `class?: string` - Additional CSS classes
- `for?: string` - Associated input ID
- `children?: Snippet | string` - Label text

**Usage:**
```svelte
<Label for="project-title">Project Title</Label>
<Input id="project-title" bind:value={title} />
```

**Tests:** `src/lib/components/ui/label/label.test.ts`

---

### Modal Components

#### Dialog
**Path:** `src/lib/components/ui/dialog/dialog.svelte`
**Purpose:** Modal dialog overlay
**Props:**
- `class?: string` - Additional CSS classes
- `open?: boolean` - Dialog open state
- `onclose?: () => void` - Close handler
- `children?: Snippet` - Dialog content

**Usage:**
```svelte
<Dialog bind:open={isDialogOpen}>
  <h2>Confirm Delete</h2>
  <p>Are you sure?</p>
  <Button onclick={() => isDialogOpen = false}>Cancel</Button>
</Dialog>
```

**Tests:** `src/lib/components/ui/dialog/dialog.test.ts`

---

#### DialogTrigger
**Path:** `src/lib/components/ui/dialog/dialog-trigger.svelte`
**Purpose:** Button that opens a dialog
**Props:**
- `class?: string` - Additional CSS classes
- `children?: Snippet` - Trigger button content

**Usage:**
```svelte
<DialogTrigger>
  <Button>Open Dialog</Button>
</DialogTrigger>
```

**Tests:** Tested as part of Dialog component

---

## Domain Components

### ProjectCard
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

### EmptyState
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

## Component Patterns

### Svelte 5 Runes
All components use modern Svelte 5 runes:
- `$props()` - Component props declaration
- `$derived()` - Computed reactive values
- `$state()` - Component-local reactive state
- `$effect()` - Side effects (rare, avoided when possible)

### TypeScript
- Strict type checking enabled
- Props interfaces defined inline or as types
- Generic types for flexible components (e.g., `Snippet`)

### Styling
- Tailwind CSS utility classes
- Fluent Design tokens for colors and spacing
- `cn()` utility for conditional class merging
- Custom CSS variables defined in `app.css`

### Accessibility
- Semantic HTML elements
- ARIA labels and roles where needed
- Keyboard navigation support
- Focus visible states

---

## Component Testing

### Testing Stack
- **Unit Tests:** Vitest + @testing-library/svelte
- **E2E Tests:** Playwright

### Test Coverage
- ✅ Button
- ✅ Input
- ✅ Textarea
- ✅ Switch
- ✅ Checkbox
- ✅ Select
- ✅ Card (+ subcomponents)
- ✅ Badge
- ✅ Spinner
- ✅ FormItem
- ✅ Label
- ✅ Dialog
- ✅ Header
- ✅ Sidebar
- ✅ ProjectCard
- ✅ EmptyState
- ⏳ Icon (pending)
- ⏳ Tooltip (pending)
- ⏳ PageLayout (pending)
- ⏳ DialogTrigger (pending)

---

## Adding New Components

### Component Structure
```
src/lib/components/
├── ui/                    # Generic UI components
│   ├── button/
│   │   ├── button.svelte
│   │   └── button.test.ts
│   └── ...
└── {domain}/              # Domain-specific components
    ├── ComponentName.svelte
    └── ComponentName.test.ts
```

### Component Template
```svelte
<script lang="ts">
    import { cn } from "$lib/utils";
    import type { Snippet } from "svelte";

    type Props = {
        class?: string;
        children?: Snippet | string;
        // ... other props
    };

    let {
        class: className,
        children,
        ...rest
    }: Props = $props();
</script>

<div class={cn("base-classes", className)} {...rest}>
    {#if typeof children === "function"}
        {@render children()}
    {:else}
        {children}
    {/if}
</div>
```

### Testing Template
```typescript
import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Component from './component.svelte';

describe('Component', () => {
    it('renders with default props', () => {
        render(Component);
        expect(screen.getByRole('...')).toBeInTheDocument();
    });

    it('handles interaction', async () => {
        const { component } = render(Component);
        // ... test logic
    });
});
```

---

## Component Dependencies

### External Libraries
- **bits-ui:** Accessible component primitives (base for Dialog, Select, Checkbox)
- **lucide-svelte:** Icon library
- **clsx + tailwind-merge:** Conditional class utilities

### Internal Utilities
- `$lib/utils/cn` - Class name merger
- `$lib/utils/formatDate` - Date formatting utilities
- `$lib/api/projects` - Project type definitions

---

## Design System

### Colors (Fluent Design)
- `brand-primary`: #0078D4 (Microsoft Blue)
- `brand-secondary`: #2B88D8
- `neutral-*`: Gray scale (50-900)
- `semantic colors`: success, warning, error

### Typography
- Font: System fonts (SF Pro on macOS, Segoe UI on Windows)
- Scale: text-xs (12px) to text-4xl (36px)
- Weights: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Spacing
- Scale: 1 (4px) to 16 (64px)
- Common: px-4 py-2 (buttons), p-6 (cards), space-y-4 (sections)

### Shadows
- `shadow-fluent-2`: Subtle elevation
- `shadow-fluent-4`: Card elevation
- `shadow-fluent-8`: Dialog elevation
- `shadow-fluent-16`: Popover elevation

---

## Future Components

### Planned (Not Yet Implemented)
- **Dropdown Menu** - Context menus and action dropdowns
- **Toast** - Notification toasts
- **Progress** - Determinate/indeterminate progress indicators
- **Tabs** - Tab navigation
- **Accordion** - Collapsible content sections
- **Popover** - Floating content containers
- **Command Palette** - Quick actions via keyboard

---

## Component Maintenance

### Updating a Component
1. Read existing component and tests
2. Make changes following existing patterns
3. Update tests to cover new behavior
4. Run `pnpm check` to validate TypeScript
5. Run `pnpm test` to ensure tests pass
6. Update this inventory if props/behavior changes

### Deprecating a Component
1. Mark as deprecated in component documentation
2. Add console warning when component is used
3. Update all usages to new component
4. Remove after one version deprecation period

---

**Last Updated:** 2025-12-29
**Total Components:** 27
**Test Coverage:** 74% (20/27 components tested)
