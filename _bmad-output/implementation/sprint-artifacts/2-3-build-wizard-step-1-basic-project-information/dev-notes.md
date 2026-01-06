# Dev Notes

## Previous Story Context (Epic 2, Stories 2.0-2.2)

**From Story 2.0 (SQLite Database with Migrations):**
- Database initialized at `{app_data}/StoryTeller/storyteller.db`
- Refinery migration framework configured with `rusqlite` feature
- Projects table schema already created in V2 migration (Story 2.1)

**From Story 2.1 (Database Schema for Projects):**
- Projects table exists with fields: `title` (TEXT NOT NULL), `author_name`, `pen_name`, `tagline`
- Schema includes automatic `updated_at` trigger
- Unique constraint on `file_path` field (used later in Story 2.8)

**From Story 2.2 (Home Screen with Recent Projects):**
- Home screen at `src/routes/+page.svelte` has "Create New Project" button
- Uses EmptyState component with `onCreateProject` callback prop

**Database Schema Reference:**
```sql
CREATE TABLE projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author_name TEXT,
    pen_name TEXT,
    tagline TEXT,
    -- other fields for later steps
);
```

## Architecture Decision: Modal Overlay

**Decision:** Wizard uses **Dialog modal overlay** on home screen, not a separate route.

**Rationale:** AC explicitly states "wizard displays as a modal dialog overlaying the home screen" (line 5 of acceptance criteria). A route would replace the entire page, violating this requirement.

**Implementation Pattern:**
```svelte
// In src/routes/+page.svelte - Add wizard state
import Dialog from '$lib/components/ui/dialog/dialog.svelte';
import WizardStep1 from '$lib/components/wizard/step-1.svelte';

let wizardOpen = $state(false);

// Update handleCreateProject - DO NOT use goto()
function handleCreateProject() {
    wizardOpen = true;  // Open modal overlay
}

<Dialog bind:open={wizardOpen} title="Create New Project" showClose={true}>
    <WizardStep1
        onNext={() => { /* Handle step completion */ }}
        onCancel={() => { wizardOpen = false; }}
    />
</Dialog>
```

## File Structure

**New Files to Create:**
```
src/lib/components/wizard/
├── index.ts                          # Barrel exports
├── step-1.svelte                     # Step 1 form component
└── types.ts                          # Wizard data interfaces
```

**Files to Modify:**
- `src/routes/+page.svelte` - Add Dialog wrapper and wizard state

## TypeScript Interfaces

```typescript
// src/lib/components/wizard/types.ts

/**
 * Step 1 form data matching database schema
 */
export interface WizardStep1Data {
    title: string;                      // Required, max 200 chars
    authorName: string | null;            // Optional
    penName: string | null;              // Optional
    tagline: string | null;               // Optional, max 150 chars
}

/**
 * Full wizard state for all 6 steps
 */
export interface WizardState {
    currentStep: 1 | 2 | 3 | 4 | 5 | 6;
    step1Data: WizardStep1Data | null;
    step2Data: WizardStep2Data | null;   // Added in Story 2.4
    step3Data: WizardStep3Data | null;   // Added in Story 2.5
    step4Data: WizardStep4Data | null;   // Added in Story 2.6
    step5Data: WizardStep5Data | null;   // Added in Story 2.7
    step6Data: WizardStep6Data | null;   // Added in Story 2.8
}
```

## Dialog Component Props

**Available props on Dialog component:**
```typescript
{
    open?: boolean;              // Bindable - controls modal visibility
    title?: string;             // Modal title displayed in header
    description?: string;        // Optional description below title
    showClose?: boolean;         // Show X close button (default: true)
    onOpenChange?: (open: boolean) => void;
}
```

**Child content:** Use `{@render children()}` or pass as props. Footer can be a snippet.

## Component Usage - Copy-Paste Reference

**All existing components at `src/lib/components/ui/`:**

### Input Component
```svelte
import Input from '$lib/components/ui/input/input.svelte';

// Correct bind pattern - Input uses internal bind:value
let title = $state("");

<Input
    id="title"
    bind:value={title}
    placeholder="Your novel title"
    maxlength={200}
    data-testid="novel-title-input"
/>
```

### Label Component
```svelte
import Label from '$lib/components/ui/label/label.svelte';

<Label for="title">Novel Title</Label>
```

### FormItem Component
```svelte
import FormItem from '$lib/components/ui/form/form-item.svelte';

<FormItem>
    <Label for="title">Novel Title</Label>
    <Input id="title" bind:value={title} maxlength={200} />
    {#if titleError}
        <FormMessage class="text-destructive">{titleError}</FormMessage>
    {/if}
</FormItem>
```

### FormMessage Component
```svelte
import FormMessage from '$lib/components/ui/form/form-message.svelte';

// Display validation errors with styling
<FormMessage class="text-destructive">Error message here</FormMessage>
```

### Button Component
```svelte
import Button from '$lib/components/ui/button/button.svelte';

<Button variant="default" onclick={handleNext}>Next</Button>
<Button variant="secondary" onclick={handleCancel}>Cancel</Button>
```

**Button variants:** default | destructive | outline | secondary | ghost | link
**Button sizes:** default | sm | lg | icon

## Svelte 5 Runes Pattern

```svelte
<script lang="ts">
    import { cn } from "$lib/utils";
    import { goto } from '$app/navigation';

    // ✅ Use $state() for reactive state
    let {
        title = $state(""),
        authorName = $state<string | null>(null),
        penName = $state<string | null>(null),
        tagline = $state<string | null>(null),
        errors = $state<Record<string, string>>({}),
    };

    // ✅ Use $derived() for computed values
    const maxTitleLength = 200;
    const maxTaglineLength = 150;

    const titleError = $derived(
        title.trim().length === 0 ? "Novel Title is required" : ""
    );

    const taglineError = $derived(
        tagline && tagline.length > maxTaglineLength ? `Max ${maxTaglineLength} characters` : ""
    );

    // ✅ Validate and advance
    function handleNext() {
        if (title.trim().length === 0) {
            errors.title = "Novel Title is required";
            // Return focus to title field
            const titleInput = document.getElementById('title') as HTMLInputElement;
            titleInput?.focus();
            return;
        }

        // Save step 1 data
        const step1Data: WizardStep1Data = {
            title: title,
            authorName: authorName,
            penName: penName,
            tagline: tagline
        };

        // Emit event to parent for navigation
        onNext(step1Data);
    }

    function handleCancel() {
        // Emit cancel event
        onCancel();
    }
</script>

<!-- ✅ Progress indicator -->
<div class="flex items-center justify-between mb-6">
    <span class="text-sm font-medium" role="progressbar">Step 1 of 6: Basic Information</span>
</div>

<!-- ✅ Form fields with validation -->
<FormItem>
    <Label for="title">Novel Title *</Label>
    <Input
        id="title"
        bind:value={title}
        maxlength={maxTitleLength}
        placeholder="Enter your novel title"
        class:border-destructive={!!titleError}
        data-testid="novel-title-input"
    />
    <div class="flex justify-between mt-1">
        {#if titleError}
            <FormMessage class="text-destructive text-xs">{titleError}</FormMessage>
        {:else}
            <span class="text-xs text-muted-foreground">Required field</span>
        {/if}
        <span class="text-xs text-muted-foreground">
            {title.length} / {maxTitleLength}
        </span>
    </div>
</FormItem>

<!-- Repeat pattern for other fields -->
<FormItem>
    <Label for="authorName">Author Name</Label>
    <Input id="authorName" bind:value={authorName} placeholder="Your real name" />
</FormItem>

<FormItem>
    <Label for="penName">Pen Name</Label>
    <Input id="penName" bind:value={penName} placeholder="Your pen name if different" />
</FormItem>

<FormItem>
    <Label for="tagline">Tagline</Label>
    <Input
        id="tagline"
        bind:value={tagline}
        maxlength={maxTaglineLength}
        placeholder="A one-sentence hook for your novel"
        data-testid="tagline-input"
    />
    <span class="text-xs text-muted-foreground text-right block">
        {tagline?.length || 0} / {maxTaglineLength}
    </span>
</FormItem>

<!-- ✅ Navigation buttons -->
<div class="flex justify-between mt-6">
    <Button variant="secondary" onclick={handleCancel} data-testid="cancel-button">
        Cancel
    </Button>
    <!-- Back button appears in steps 2-6 only -->
    <Button variant="default" onclick={handleNext} data-testid="next-button">
        Next
    </Button>
</div>
```

## Complete Step-1 Component Template

```svelte
<script lang="ts">
    import Button from '$lib/components/ui/button/button.svelte';
    import Input from '$lib/components/ui/input/input.svelte';
    import Label from '$lib/components/ui/label/label.svelte';
    import FormItem from '$lib/components/ui/form/form-item.svelte';
    import FormMessage from '$lib/components/ui/form/form-message.svelte';
    import type { WizardStep1Data } from './types';

    interface Props {
        onNext: (data: WizardStep1Data) => void;
        onCancel: () => void;
    }

    let { onNext, onCancel }: Props = $props();

    let title = $state("");
    let authorName = $state<string | null>(null);
    let penName = $state<string | null>(null);
    let tagline = $state<string | null>(null);

    const maxTitleLength = 200;
    const maxTaglineLength = 150;

    const titleError = $derived(
        title.trim().length === 0 ? "Novel Title is required" : ""
    );

    const showTitleCounterRed = $derived(title.length >= maxTitleLength);
    const showTaglineCounterRed = $derived(
        tagline && tagline.length >= maxTaglineLength
    );

    function handleNext() {
        if (title.trim().length === 0) {
            const titleInput = document.getElementById('title') as HTMLInputElement;
            titleInput?.focus();
            return;
        }

        onNext({
            title: title,
            authorName: authorName,
            penName: penName,
            tagline: tagline
        });
    }
</script>

<div class="p-6 space-y-6">
    <!-- Progress Indicator -->
    <div class="flex items-center justify-between">
        <span class="text-sm font-medium">Step 1 of 6: Basic Information</span>
    </div>

    <!-- Novel Title (Required) -->
    <FormItem>
        <Label for="title">Novel Title</Label>
        <Input
            id="title"
            bind:value={title}
            maxlength={maxTitleLength}
            placeholder="Enter your novel title"
            data-testid="novel-title-input"
        />
        <div class="flex justify-between mt-1">
            {#if title.length === 0}
                <span class="text-xs text-muted-foreground">Required</span>
            {:else if titleError}
                <FormMessage class="text-destructive text-xs">{titleError}</FormMessage>
            {:else}
                <span></span>
            {/if}
            <span class="text-xs" class:text-destructive={showTitleCounterRed} class:text-muted-foreground={!showTitleCounterRed}>
                {title.length} / {maxTitleLength}
            </span>
        </div>
    </FormItem>

    <!-- Author Name (Optional) -->
    <FormItem>
        <Label for="authorName">Author Name</Label>
        <Input
            id="authorName"
            bind:value={authorName}
            placeholder="Your real name"
            data-testid="author-name-input"
        />
    </FormItem>

    <!-- Pen Name (Optional) -->
    <FormItem>
        <Label for="penName">Pen Name</Label>
        <Input
            id="penName"
            bind:value={penName}
            placeholder="Your pen name if different"
            data-testid="pen-name-input"
        />
    </FormItem>

    <!-- Tagline (Optional) -->
    <FormItem>
        <Label for="tagline">Tagline</Label>
        <Input
            id="tagline"
            bind:value={tagline}
            maxlength={maxTaglineLength}
            placeholder="A one-sentence hook for your novel"
            data-testid="tagline-input"
        />
        <span class="text-xs text-right block" class:text-destructive={showTaglineCounterRed} class:text-muted-foreground={!showTaglineCounterRed}>
            {tagline?.length || 0} / {maxTaglineLength}
        </span>
    </FormItem>

    <!-- Navigation Buttons -->
    <div class="flex justify-between pt-4">
        <Button variant="secondary" onclick={onCancel} data-testid="cancel-button">
            Cancel
        </Button>
        <Button variant="default" onclick={handleNext} data-testid="next-button">
            Next
        </Button>
    </div>
</div>
```

## Home Screen Integration

**Update `src/routes/+page.svelte`:**

```svelte
<script lang="ts">
    // ... existing imports

    import Dialog from '$lib/components/ui/dialog/dialog.svelte';
    import WizardStep1 from '$lib/components/wizard/step-1.svelte';
    import type { WizardStep1Data } from '$lib/components/wizard/types';

    // ... existing state

    // Add wizard state
    let wizardOpen = $state(false);
    let wizardStep1Data = $state<WizardStep1Data | null>(null);

    // Update handleCreateProject
    function handleCreateProject() {
        wizardOpen = true;  // Open modal overlay
    }

    function handleWizardNext(data: WizardStep1Data) {
        wizardStep1Data = data;
        // TODO: Advance to Step 2 in Story 2.4
        // For now, show completion message
        console.log('Step 1 data saved:', data);
        alert('Step 1 complete! Step 2 coming in Story 2.4.');
        wizardOpen = false;
    }

    function handleWizardCancel() {
        wizardOpen = false;
    }
</script>

<!-- Add wizard dialog at bottom of template -->
<Dialog
    bind:open={wizardOpen}
    title="Create New Project"
    showClose={true}
    onOpenChange={(open) => { wizardOpen = open; }}
    data-testid="wizard-dialog"
>
    <WizardStep1
        onNext={handleWizardNext}
        onCancel={handleWizardCancel}
    />
</Dialog>
```

## Wizard Component Barrel Export

Create `src/lib/components/wizard/index.ts`:
```typescript
export { default as Step1 } from './step-1.svelte';
export type { WizardState, WizardStep1Data } from './types';
```

## Testing Requirements

### Unit Tests

Create `src/lib/components/wizard/step-1.test.ts`:
```typescript
import { render, screen } from '@testing-library/svelte';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { fireEvent } from '@testing-library/dom';
import Step1 from './step-1.svelte';
import type { WizardStep1Data } from './types';

describe('Wizard Step 1', () => {
    let onNext: ReturnType<typeof vi.fn>;
    let onCancel: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        onNext = vi.fn();
        onCancel = vi.fn();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders all form fields', () => {
        render(Step1, { onNext, onCancel });

        expect(screen.getByLabelText('Novel Title')).toBeDefined();
        expect(screen.getByLabelText('Author Name')).toBeDefined();
        expect(screen.getByLabelText('Pen Name')).toBeDefined();
        expect(screen.getByLabelText('Tagline')).toBeDefined();
        expect(screen.getByTestId('next-button')).toBeDefined();
        expect(screen.getByTestId('cancel-button')).toBeDefined();
    });

    it('shows progress indicator', () => {
        render(Step1, { onNext, onCancel });
        expect(screen.getByText('Step 1 of 6: Basic Information')).toBeDefined();
    });

    it('enforces title max length', () => {
        render(Step1, { onNext, onCancel });
        const titleInput = screen.getByTestId('novel-title-input') as HTMLInputElement;

        fireEvent.change(titleInput, { target: { value: 'A'.repeat(250) } });

        expect(titleInput.value).toHaveLength(200);
    });

    it('emits onCancel when Cancel clicked', () => {
        render(Step1, { onNext, onCancel });
        fireEvent.click(screen.getByTestId('cancel-button'));

        expect(onCancel).toHaveBeenCalled();
    });

    it('does not emit onNext when title is empty', () => {
        render(Step1, { onNext, onCancel });
        fireEvent.click(screen.getByTestId('next-button'));

        expect(onNext).not.toHaveBeenCalled();
    });
});
```

### E2E Tests

Create `tests/e2e/wizard-step-1.spec.ts`:
```typescript
import { test, expect } from '@playwright/test';

test.describe('Wizard Step 1', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('opens wizard modal from home screen', async ({ page }) => {
        await page.getByRole('button', { name: /create new project/i }).click();
        await expect(page.getByTestId('wizard-dialog')).toBeVisible();
        await expect(page.getByText('Step 1 of 6: Basic Information')).toBeVisible();
    });

    test('validates required title field', async ({ page }) => {
        await page.getByRole('button', { name: /create new project/i }).click();
        await page.getByTestId('next-button').click();

        await expect(page.getByText('Novel Title is required')).toBeVisible();
        const titleInput = page.getByTestId('novel-title-input');
        await expect(titleInput).toBeFocused();
    });

    test('closes modal on Cancel', async ({ page }) => {
        await page.getByRole('button', { name: /create new project/i }).click();
        await page.getByTestId('cancel-button').click();

        await expect(page.getByTestId('wizard-dialog')).not.toBeVisible();
    });

    test('closes modal on Escape key', async ({ page }) => {
        await page.getByRole('button', { name: /create new project/i }).click();
        await page.keyboard.press('Escape');

        await expect(page.getByTestId('wizard-dialog')).not.toBeVisible();
    });

    test('shows character counter for title', async ({ page }) => {
        await page.getByRole('button', { name: /create new project/i }).click();
        const titleInput = page.getByTestId('novel-title-input');

        await titleInput.fill('My Novel');

        await expect(page.getByText('8 / 200')).toBeVisible();
    });
});
```

## Accessibility Requirements

1. **Keyboard Navigation:**
   - Tab order: Title → Author Name → Pen Name → Tagline → Cancel → Next
   - Focus returns to title field on validation error
   - Escape key closes modal (handled by Dialog component)

2. **ARIA Labels:**
   - Dialog has `role="dialog"` (handled by Dialog component)
   - Progress indicator: `role="progressbar"`
   - Labels use `for` attribute to associate with inputs
   - All interactive elements have `data-testid` for testing

3. **Focus Management:**
   - Dialog traps focus when open (handled by Dialog component)
   - Validation error returns focus to title field

4. **Color Contrast:**
   - Error text: `text-destructive` (ensures WCAG compliance)
   - Focus rings: `ring-2`, `ring-ring` (visible on all inputs)

## Anti-Patterns (Do NOT Implement)

- ❌ **No database writes** - Data persistence is Story 2.8 (now implemented)
- ❌ **No new Rust commands** - Frontend-only story
- ❌ **No route navigation** - Use Dialog modal, not goto('/create-project')
- ❌ **No localStorage** - Wizard state in component only
- ❌ **No Node.js APIs** - No fs, path, process
- ❌ **No legacy Svelte** - Use `$state()`, `$derived()`, `$props()` runes only

## Definition of Done

1. Wizard modal opens from home screen "Create New Project" button
2. Dialog overlay displays with "Step 1 of 6: Basic Information" header
3. All 4 form fields render with proper labels and data-testid attributes
4. Title validation works: empty shows error, red border, returns focus
5. Character counters update in real-time, turn red at max
6. Cancel button closes modal (no data saved)
7. Next button validates title and calls onNext with step data
8. TypeScript passes: `pnpm check` with 0 errors
9. Svelte 5 runes used correctly (no legacy patterns)
10. Unit tests cover rendering and validation
11. E2E tests verify modal open, validation, and cancel flows

## Verification Commands

```bash
# TypeScript validation
pnpm check

# Run unit tests
pnpm test

# Run E2E tests
pnpm test:e2e

# Manual testing
pnpm tauri dev

# Verify:
# 1. Click "Create New Project" on home screen
# 2. Modal opens with "Step 1 of 6: Basic Information"
# 3. All 4 form fields visible
# 4. Click Next with empty title - error shows, focus returns
# 5. Type in title - error clears
# 6. Type 200+ chars - truncates at 200, counter turns red
# 7. Click Cancel - modal closes
# 8. Press Escape - modal closes
```

## References

- Epic 2: `_bmad-output/planning/epics/epic-2-project-setup-configuration-wizard.md`
- Project Context: `_bmad-output/documentation/project-docs/project-context.md`
- Previous Story 2.2: `_bmad-output/implementation/sprint-artifacts/2-2-build-home-screen-with-recent-projects-list/`
- Dialog Component: `src/lib/components/ui/dialog/dialog.svelte`
