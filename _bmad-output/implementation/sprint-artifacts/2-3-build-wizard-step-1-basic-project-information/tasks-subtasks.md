# Tasks / Subtasks

- [x] Task 1: Create wizard step component (AC: 1, 2)
  - [x] Create `src/lib/components/wizard/types.ts` with `WizardStep1Data` and `WizardState` interfaces
  - [x] Create `src/lib/components/wizard/step-1.svelte` as Step 1 form component
  - [x] Implement progress indicator: "Step 1 of 6: Basic Information"
  - [x] Add `data-testid="wizard-dialog"` to Dialog in home screen

- [x] Task 2: Implement form fields with labels (AC: 1)
  - [x] Create "Novel Title" input with Label (required field)
  - [x] Create "Author Name" input with Label (optional, placeholder: "Your real name")
  - [x] Create "Pen Name" input with Label (optional, placeholder: "Your pen name if different")
  - [x] Create "Tagline" input with Label (optional, placeholder, max 150 chars)
  - [x] Use FormItem component for consistent `space-y-2` spacing
  - [x] Add `data-testid` attributes to all inputs for E2E testing

- [x] Task 3: Implement Novel Title validation (AC: 2, 3, 4)
  - [x] Bind title to local `$state()` rune
  - [x] Add character counter showing "X / 200"
  - [x] Implement `maxlength="200"` attribute
  - [x] Show error "Novel Title is required" when empty on Next click
  - [x] Add red counter color at max length
  - [x] Return focus to title field when validation fails

- [x] Task 4: Implement optional fields (AC: 1)
  - [x] Author Name: no validation required
  - [x] Pen Name: no validation required
  - [x] Tagline: add character counter (max 150)

- [x] Task 5: Implement wizard navigation buttons (AC: 5, 6)
  - [x] Add "Cancel" button (secondary variant) - closes modal without saving
  - [x] Add "Next" button (primary variant) - validates and advances
  - [x] NOTE: No "Back" button in Step 1 (appears in steps 2-6)
  - [x] On successful validation: call `onNext(step1Data)` callback

- [x] Task 6: Update home screen integration (AC: 1, 2, 3, 6)
  - [x] Import Dialog and WizardStep1 components in `src/routes/+page.svelte`
  - [x] Add `wizardOpen` state using `$state(false)`
  - [x] Update `handleCreateProject()` to set `wizardOpen = true` (DO NOT use goto)
  - [x] Add Dialog wrapper with WizardStep1 as child
  - [x] Implement `handleWizardNext(data)` to receive step 1 data
  - [x] Implement `handleWizardCancel()` to close modal

- [x] Task 7: Test form validation and user flows (AC: 2, 3, 4, 5, 6)
  - [x] Test: Empty title shows error and prevents Next
  - [x] Test: Valid title allows Next button callback to fire
  - [x] Test: Title character counter updates in real-time
  - [x] Test: Title truncates at 200 characters
  - [x] Test: Tagline character counter works
  - [x] Test: Cancel button closes modal without saving
  - [x] Test: Escape key closes modal (Dialog component handles this)
  - [x] Test: X close button closes modal

- [x] Task 8: Verify TypeScript and component patterns (AC: All)
- [x] Task 8a: Add utility function for date formatting
  - [x] Added formatDate() function to src/lib/utils.ts
  - [x] Formats dates using Intl.DateTimeFormat with US locale
  - [x] Used by project cards for relative date display
  - [x] Run `pnpm check` - verify TypeScript strict mode passes
  - [x] Ensure Svelte 5 runes used correctly (`$props()`, `$state()`, `$derived()`)
  - [x] Verify all existing UI components used correctly
  - [x] Confirm Tailwind classes follow design system patterns
  - [x] Check all data-testid attributes are present

- [x] Task 9: Write unit tests (Vitest)
  - [x] Create `src/lib/components/wizard/step-1.test.ts`
  - [x] Test: All form fields render with correct labels
  - [x] Test: Progress indicator displays
  - [x] Test: Title max length is enforced
  - [x] Test: onCancel callback fires on Cancel click
  - [x] Test: onNext callback does NOT fire with empty title
  - [x] Test: onNext callback fires with valid title

- [x] Task 10: Write E2E tests (Playwright)
  - [x] Create `tests/e2e/wizard-step-1.spec.ts`
  - [x] Test: Wizard opens from "Create New Project" button
  - [x] Test: Modal overlay displays over home screen
  - [x] Test: Validation shows error for empty title
  - [x] Test: Focus returns to title field on error
  - [x] Test: Cancel closes modal
  - [x] Test: Escape closes modal
  - [x] Test: Character counter displays for title
