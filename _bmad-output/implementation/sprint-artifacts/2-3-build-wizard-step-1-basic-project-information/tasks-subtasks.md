# Tasks / Subtasks

- [ ] Task 1: Create wizard step component (AC: 1, 2)
  - [ ] Create `src/lib/components/wizard/types.ts` with `WizardStep1Data` and `WizardState` interfaces
  - [ ] Create `src/lib/components/wizard/step-1.svelte` as Step 1 form component
  - [ ] Implement progress indicator: "Step 1 of 6: Basic Information"
  - [ ] Add `data-testid="wizard-dialog"` to Dialog in home screen

- [ ] Task 2: Implement form fields with labels (AC: 1)
  - [ ] Create "Novel Title" input with Label (required field)
  - [ ] Create "Author Name" input with Label (optional, placeholder: "Your real name")
  - [ ] Create "Pen Name" input with Label (optional, placeholder: "Your pen name if different")
  - [ ] Create "Tagline" input with Label (optional, placeholder, max 150 chars)
  - [ ] Use FormItem component for consistent `space-y-2` spacing
  - [ ] Add `data-testid` attributes to all inputs for E2E testing

- [ ] Task 3: Implement Novel Title validation (AC: 2, 3, 4)
  - [ ] Bind title to local `$state()` rune
  - [ ] Add character counter showing "X / 200"
  - [ ] Implement `maxlength="200"` attribute
  - [ ] Show error "Novel Title is required" when empty on Next click
  - [ ] Add red counter color at max length
  - [ ] Return focus to title field when validation fails

- [ ] Task 4: Implement optional fields (AC: 1)
  - [ ] Author Name: no validation required
  - [ ] Pen Name: no validation required
  - [ ] Tagline: add character counter (max 150)

- [ ] Task 5: Implement wizard navigation buttons (AC: 5, 6)
  - [ ] Add "Cancel" button (secondary variant) - closes modal without saving
  - [ ] Add "Next" button (primary variant) - validates and advances
  - [ ] NOTE: No "Back" button in Step 1 (appears in steps 2-6)
  - [ ] On successful validation: call `onNext(step1Data)` callback

- [ ] Task 6: Update home screen integration (AC: 1, 2, 3, 6)
  - [ ] Import Dialog and WizardStep1 components in `src/routes/+page.svelte`
  - [ ] Add `wizardOpen` state using `$state(false)`
  - [ ] Update `handleCreateProject()` to set `wizardOpen = true` (DO NOT use goto)
  - [ ] Add Dialog wrapper with WizardStep1 as child
  - [ ] Implement `handleWizardNext(data)` to receive step 1 data
  - [ ] Implement `handleWizardCancel()` to close modal

- [ ] Task 7: Test form validation and user flows (AC: 2, 3, 4, 5, 6)
  - [ ] Test: Empty title shows error and prevents Next
  - [ ] Test: Valid title allows Next button callback to fire
  - [ ] Test: Title character counter updates in real-time
  - [ ] Test: Title truncates at 200 characters
  - [ ] Test: Tagline character counter works
  - [ ] Test: Cancel button closes modal without saving
  - [ ] Test: Escape key closes modal (Dialog component handles this)
  - [ ] Test: X close button closes modal

- [ ] Task 8: Verify TypeScript and component patterns (AC: All)
  - [ ] Run `pnpm check` - verify TypeScript strict mode passes
  - [ ] Ensure Svelte 5 runes used correctly (`$props()`, `$state()`, `$derived()`)
  - [ ] Verify all existing UI components used correctly
  - [ ] Confirm Tailwind classes follow design system patterns
  - [ ] Check all data-testid attributes are present

- [ ] Task 9: Write unit tests (Vitest)
  - [ ] Create `src/lib/components/wizard/step-1.test.ts`
  - [ ] Test: All form fields render with correct labels
  - [ ] Test: Progress indicator displays
  - [ ] Test: Title max length is enforced
  - [ ] Test: onCancel callback fires on Cancel click
  - [ ] Test: onNext callback does NOT fire with empty title
  - [ ] Test: onNext callback fires with valid title

- [ ] Task 10: Write E2E tests (Playwright)
  - [ ] Create `tests/e2e/wizard-step-1.spec.ts`
  - [ ] Test: Wizard opens from "Create New Project" button
  - [ ] Test: Modal overlay displays over home screen
  - [ ] Test: Validation shows error for empty title
  - [ ] Test: Focus returns to title field on error
  - [ ] Test: Cancel closes modal
  - [ ] Test: Escape closes modal
  - [ ] Test: Character counter displays for title
