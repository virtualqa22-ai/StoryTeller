# Story 1.5: Build Core Svelte Component Library

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a development team,
I want a library of robust, reusable Svelte 5 components using headless primitives and a consistent design system,
So that we can build accessible, high-quality UI features quickly across all epics without reinventing complex interactions.

## Acceptance Criteria

**Given** the project is configured for Svelte 5 and Tailwind
**When** the team sets up the foundational libraries
**Then** `bits-ui`, `lucide-svelte`, `clsx`, and `tailwind-merge` are installed
**And** a `cn()` utility is available for safe Tailwind class merging

**Given** the component library structure exists
**When** the team builds the components
**Then** components are created in `src/lib/components/ui/` (shadcn-like structure recommended) or `src/lib/components/`
**And** components export a clean API via `src/lib/components/index.ts`
**And** specific complex components (`Modal`, `Select`, `Tooltip`) are built using `bits-ui` primitives to ensure full accessibility (focus trap, keyboard nav)

**Given** the components are built
**When** the developer visits the "Design System Gallery" page (`/dev/design-system`)
**Then** all components are visible in their various states (variants, sizes, error states)
**And** interactive components (`Modal`, `Select`) function correctly within this demo page

## Tasks / Subtasks

- [ ] Task 1: Foundation & Dependencies
  - [ ] Install `bits-ui` (next version for Svelte 5), `clsx`, `tailwind-merge`, and `lucide-svelte`
  - [ ] Create `src/lib/utils.ts` with the `cn(...)` class merging utility
  - [ ] Configure `src/lib/components/index.ts` for clean barrel exports

- [ ] Task 2: Base "Primitive" Components
  - [ ] Create `Icon` component (wrapper for Lucide)
  - [ ] Create `Button` component (variants: default, secondary, ghost, destructive, outline; sizes: sm, default, lg) - *Must use `cn` for class merging*
  - [ ] Create `Badge` / `Tag` component
  - [ ] Create `Spinner` / `Loading` component
  - [ ] Create `Card` component (Root, Header, Content, Footer parts)

- [ ] Task 3: Form Input Components
  - [ ] Create `Input` (text, password, email) with focus states
  - [ ] Create `Label` component
  - [ ] Create `Textarea` component
  - [ ] Create `Checkbox` (use `bits-ui` Checkbox primitive)
  - [ ] Create `Switch` / `Toggle` (use `bits-ui` Switch primitive if available, or HTML checkbox)
  - [ ] Create `FormItem` wrapper (handles Label + Input + Error Message layout)

- [ ] Task 4: Complex Interactive Components (Powered by Bits UI)
  - [ ] Create `Select` / `Dropdown` (using `bits-ui` Select primitive) - Single select with search support if needed
  - [ ] Create `Dialog` / `Modal` (using `bits-ui` Dialog primitive) - Must handle portal and focus trap
  - [ ] Create `Tooltip` (using `bits-ui` Tooltip primitive)

- [ ] Task 5: Layout Components
  - [ ] Create `Header` (app navigation bar)
  - [ ] Create `Sidebar` (collapsible navigation panel)
  - [ ] Create `Container` / `PageLayout` (standard padding/centering)

- [ ] Task 6: Design System Gallery (Verification)
  - [ ] Create route `src/routes/dev/design-system/+page.svelte` (Dev-only route)
  - [ ] Implement a "Kitchen Sink" view showcasing every component
  - [ ] Section for "Typography", "Colors", "Buttons", "Inputs", "Feedback"
  - [ ] Use this page to manually verify component appearance and interaction

## Dev Notes

### Technology Stack & Patterns
- **Svelte 5 Runes:** Use `$state`, `$props`, `$derived` exclusively.
- **Headless Primitives:** Use **`bits-ui`** for anything involving complex state or accessibility (Dialogs, Selects, Tooltips, Checkboxes). Do NOT write raw event listeners for these.
- **Styling:**
  - Use `tailwind-merge` + `clsx` (via `cn()`) for all component `class` props.
  - Example: `<div class={cn("bg-primary text-white", localClass)}>...</div>`
- **Icons:** `lucide-svelte`
- **Exports:** All usable components must be exported from `$lib/components`.

### Documentation & Verification
- **No Storybook:** We are avoiding the overhead of configuring Storybook.
- **in-App Gallery:** The `/dev/design-system` page is our source of truth for visual regression testing and development. Keep it maintained as new components are added.

### Previous Story Learnings (Story 1.4)
- **Tests:** While Unit Tests (Vitest) are good for logic, the *visual* and *interactive* verification is best done via the Gallery page + E2E tests later.
- **Directory Structure:** Keep it flat or grouped by logical domain (e.g., `ui/` for generic, `app/` for app-specific).

## Dev Agent Record
