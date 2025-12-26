# Story 1.5: Build Core Svelte Component Library

Status: done

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

- [x] Task 1: Foundation & Dependencies
  - [x] Install `bits-ui` (next version for Svelte 5), `clsx`, `tailwind-merge`, and `lucide-svelte`
  - [x] Create `src/lib/utils.ts` with the `cn(...)` class merging utility
  - [x] Configure `src/lib/components/index.ts` for clean barrel exports

- [x] Task 2: Base "Primitive" Components
  - [x] Create `Icon` component (wrapper for Lucide)
  - [x] Create `Button` component (variants: default, secondary, ghost, destructive, outline; sizes: sm, default, lg) - *Must use `cn` for class merging*
  - [x] Create `Badge` / `Tag` component
  - [x] Create `Spinner` / `Loading` component
  - [x] Create `Card` component (Root, Header, Content, Footer parts)

- [x] Task 3: Form Input Components
  - [x] Create `Input` (text, password, email) with focus states
  - [x] Create `Label` component
  - [x] Create `Textarea` component
  - [x] Create `Checkbox` (use `bits-ui` Checkbox primitive)
  - [x] Create `Switch` / `Toggle` (use `bits-ui` Switch primitive if available, or HTML checkbox)
  - [x] Create `FormItem` wrapper (handles Label + Input + Error Message layout)

- [x] Task 4: Complex Interactive Components (Powered by Bits UI)
  - [x] Create `Select` / `Dropdown` (using `bits-ui` Select primitive) - Single select with search support if needed
  - [x] Create `Dialog` / `Modal` (using `bits-ui` Dialog primitive) - Must handle portal and focus trap
  - [x] Create `Tooltip` (using `bits-ui` Tooltip primitive)

- [x] Task 5: Layout Components
  - [x] Create `Header` (app navigation bar)
  - [x] Create `Sidebar` (collapsible navigation panel)
  - [x] Create `Container` / `PageLayout` (standard padding/centering)

- [x] Task 6: Design System Gallery (Verification)
  - [x] Create route `src/routes/dev/design-system/+page.svelte` (Dev-only route)
  - [x] Implement a "Kitchen Sink" view showcasing every component
  - [x] Section for "Typography", "Colors", "Buttons", "Inputs", "Feedback"
  - [x] Use this page to manually verify component appearance and interaction

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

### Implementation Notes - Task 2 (Basics)
- Implemented `Button` with full variants (default, destructive, outline, secondary, ghost, link) and sizes (sm, default, lg, icon).
- Implemented `Badge` with variants (default, secondary, destructive, outline).
- Implemented `Spinner` using Lucide's `Loader2`.
- Implemented `Icon` wrapper for easy Lucide icon usage with consistent sizing.
- Implemented full `Card` suite (Root, Header, Title, Description, Content, Footer).
- Verified `Button` and `Badge` with unit tests.

### Implementation Notes - Task 3 (Form Inputs)
- `Input` component with text/password/email types, focus ring states, proper Svelte 5 $bindable value.
- `Label` component with Snippet support for flexible children.
- `Textarea` with min-height and focus states.
- `Checkbox` using bits-ui 1.0.0-next.98 Checkbox.Root with child snippet for indicator.
- `Switch` using bits-ui Switch primitive with proper thumb animation.
- `FormItem`, `FormDescription`, `FormMessage` for consistent form layouts.
- All components use `cn()` for class merging and follow Svelte 5 runes patterns.

### Implementation Notes - Task 4 (Complex Interactive)
- `Select` using bits-ui Select primitive with type="single", items prop, Portal/Content/Viewport/Item structure.
- `Dialog` using bits-ui Dialog primitive with Portal, Overlay, Content, Title, Description, Close button. Handles focus trap automatically.
- `Tooltip` using bits-ui Tooltip with Provider/Root/Trigger/Portal/Content structure. Supports side and sideOffset props.
- Fixed bits-ui 1.0.0 API differences - uses `child` snippets instead of separate Indicator components.

### Implementation Notes - Task 5 (Layout)
- `Header` with left/right snippet slots for navigation elements, optional sticky positioning.
- `Sidebar` with collapsible support, toggle button, configurable width and side (left/right).
- `Container` with size variants (sm/md/lg/xl/full), optional padding and centering.
- `PageLayout` for full app layouts with header/sidebar/footer slots.

### Implementation Notes - Task 6 (Design System Gallery)
- Created `/dev/design-system` route with comprehensive kitchen sink view.
- Sections: Typography, Colors, Buttons (variants/sizes/states), Badges, Icons, Spinner, Cards, Form Inputs, Select, Dialog, Tooltip, Layout Components, Feedback states.
- All interactive components are functional with bound state.
- Visual demonstration of component variants and interactive behaviors.

### Completion Notes
- All 6 tasks completed with full implementations.
- 89 unit tests passing across 19 test files.
- Type check passes with 0 errors and 0 warnings.
- All components exported via `$lib/components` barrel file.
- Design System Gallery provides visual verification for all components.

### Code Review Fixes Applied (2025-12-26)
- **H1-H3 FIXED**: Added comprehensive test coverage for all components that were missing tests:
  - Complex interactive: Select, Dialog, Tooltip, Checkbox, Switch
  - Layout: Header, Sidebar, Container, PageLayout
  - Form: FormItem, FormDescription, FormMessage, Label, Textarea
- **M1 FIXED**: Icon component reactive state warning - changed `const IconComponent = name` to `let IconComponent = $derived(name)`
- **M2 FIXED**: Design System Gallery a11y issues - replaced invalid `href="#"` with proper `<button>` elements in Sidebar demo
- **M4 FIXED**: Button test coverage expanded from 2 weak tests to 12 comprehensive tests covering all variants and sizes

## File List

### Foundation (Task 1)
- src/lib/utils.ts
- src/lib/utils.test.ts
- src/lib/components/index.ts
- package.json
- pnpm-lock.yaml

### Base Components (Task 2)
- src/lib/components/ui/button/button.svelte
- src/lib/components/ui/button/button.test.ts
- src/lib/components/ui/badge/badge.svelte
- src/lib/components/ui/badge/badge.test.ts
- src/lib/components/ui/spinner/spinner.svelte
- src/lib/components/ui/icon/icon.svelte
- src/lib/components/ui/card/card.svelte
- src/lib/components/ui/card/card-header.svelte
- src/lib/components/ui/card/card-title.svelte
- src/lib/components/ui/card/card-description.svelte
- src/lib/components/ui/card/card-content.svelte
- src/lib/components/ui/card/card-footer.svelte
- src/lib/components/ui/card/index.ts

### Form Input Components (Task 3)
- src/lib/components/ui/input/input.svelte
- src/lib/components/ui/input/input.test.ts
- src/lib/components/ui/label/label.svelte
- src/lib/components/ui/label/label.test.ts
- src/lib/components/ui/textarea/textarea.svelte
- src/lib/components/ui/textarea/textarea.test.ts
- src/lib/components/ui/checkbox/checkbox.svelte
- src/lib/components/ui/checkbox/checkbox.test.ts
- src/lib/components/ui/switch/switch.svelte
- src/lib/components/ui/switch/switch.test.ts
- src/lib/components/ui/form/form-item.svelte
- src/lib/components/ui/form/form-item.test.ts
- src/lib/components/ui/form/form-description.svelte
- src/lib/components/ui/form/form-description.test.ts
- src/lib/components/ui/form/form-message.svelte
- src/lib/components/ui/form/form-message.test.ts
- src/lib/components/ui/form/index.ts

### Complex Interactive Components (Task 4)
- src/lib/components/ui/select/select.svelte
- src/lib/components/ui/select/select.test.ts
- src/lib/components/ui/select/index.ts
- src/lib/components/ui/dialog/dialog.svelte
- src/lib/components/ui/dialog/dialog.test.ts
- src/lib/components/ui/dialog/dialog-trigger.svelte
- src/lib/components/ui/dialog/index.ts
- src/lib/components/ui/tooltip/tooltip.svelte
- src/lib/components/ui/tooltip/tooltip.test.ts
- src/lib/components/ui/tooltip/index.ts

### Layout Components (Task 5)
- src/lib/components/ui/header/header.svelte
- src/lib/components/ui/header/header.test.ts
- src/lib/components/ui/header/index.ts
- src/lib/components/ui/sidebar/sidebar.svelte
- src/lib/components/ui/sidebar/sidebar.test.ts
- src/lib/components/ui/sidebar/index.ts
- src/lib/components/ui/container/container.svelte
- src/lib/components/ui/container/container.test.ts
- src/lib/components/ui/container/page-layout.svelte
- src/lib/components/ui/container/page-layout.test.ts
- src/lib/components/ui/container/index.ts

### Design System Gallery (Task 6)
- src/routes/dev/design-system/+page.svelte

## Change Log
- 2025-12-26: Completed Tasks 3-6 - Form inputs, complex interactive components (Select, Dialog, Tooltip using bits-ui), layout components (Header, Sidebar, Container, PageLayout), and Design System Gallery with full kitchen sink view.
- 2025-12-26: Code review completed - Fixed all HIGH and MEDIUM issues. Added 75 new tests across 14 new test files. Fixed Icon reactive warning and Design System Gallery a11y issues. Story status: done.
