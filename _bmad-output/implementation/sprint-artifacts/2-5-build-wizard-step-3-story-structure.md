# Story 2.5: Build Wizard Step 3 - Story Structure

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As an author,
I want to configure my story's structure and framework in the wizard,
so that StoryTeller understands my narrative approach and can provide appropriate guidance.

## Acceptance Criteria

1. Progress indicator shows "Step 3 of 6: Story Structure"
2. "Point of View" dropdown options: First Person, Third Person Limited, Third Person Omniscient, Multiple POV
3. "Story Framework" dropdown options: Three-Act Structure, Five-Act Structure, Hero's Journey, Snowflake Method, Seven-Point Story Structure, Custom/Freeform
4. Each framework option includes a tooltip with a brief description
5. Chapter configuration displays:
   - "Target Chapter Count" number input (default: 20, min: 1, max: 100)
   - "Target Words Per Chapter" number input (default: 3000, min: 500, max: 15000)
   - Read-only "Total Target Word Count" = chapter_count × words_per_chapter
   - Calculation updates in real time as values change
6. On Next: selections saved to wizard state and advances to Step 4

## Tasks / Subtasks

- [x] Implement Step 3 route/view with progress indicator (AC: 1)
  - [x] Add wizard step metadata and progress component
- [x] Build POV dropdown and bind to wizard state (AC: 2)
  - [x] Populate options and persist selection
- [x] Build Story Framework dropdown with tooltips (AC: 3–4)
  - [x] Provide brief descriptions per framework
- [x] Implement chapter configuration controls (AC: 5)
  - [x] Target Chapter Count input with bounds and default
  - [x] Target Words Per Chapter input with bounds and default
  - [x] Real-time computed Total Target Word Count display
- [x] Handle Next action to save and advance to Step 4 (AC: 6)
  - [x] Persist wizard state; enable Back navigation parity
- [x] Add unit tests for validation and computed fields
- [x] Add UX polish per Fluent Design system

## Dev Notes

- Use existing SvelteKit + Tauri patterns; follow Tailwind CSS design system established in Epic 1
- Persist wizard state to the app’s store and ensure idempotent navigation between steps
- Enforce numeric bounds and defaults via controlled inputs
- Computed total should update reactively without flicker; prefer derived store/computed

### Project Structure Notes

- Place Step 3 UI alongside existing wizard steps to maintain consistency
- Use standard component naming and path conventions
- Keep logic in view stores; components should remain presentational

### References

- Architecture overview: [index.md](file:///c:/Users/KaRaN/trae-workspace/StoryTeller/_bmad-output/architecture/index.md)
- Wizard steps context (Epic 2): [epic-2-project-setup-configuration-wizard.md](file:///c:/Users/KaRaN/trae-workspace/StoryTeller/_bmad-output/planning/epics/epic-2-project-setup-configuration-wizard.md#L144-L170)
- Project context: [project-context.md](file:///c:/Users/KaRaN/trae-workspace/StoryTeller/_bmad-output/documentation/project-docs/project-context.md)

## Dev Agent Record

### Agent Model Used

GPT-5-medium

### Debug Log References

### Completion Notes List

- Implemented Step 3 UI (POV, Framework, chapter controls) with validation
- Added reactive computed total and bounds per ACs
- Integrated tooltip for framework guidance
- Added unit tests; all tests pass locally
- Updated wizard flow to include Step 3 and advance to Step 4
- Status set to review

**Code Review Fixes Applied:**
- Fixed wizard back navigation to support step 4→3 transition
- Added ARIA attributes (aria-valuenow, aria-valuemin, aria-valuemax) to progress indicator for WCAG 2.1 compliance
- Removed unused test import from step-2.test.ts
- Added input sanitization to prevent negative numbers during typing (separate sanitize functions called on oninput)
- Expanded test coverage: added tests for Back button, Cancel button, negative number prevention, and ARIA attributes
- Added detailed inline comments explaining type assertions are safe after validation
- Updated File List to document all 7 modified files (was missing step-2.test.ts and +page.svelte)
- All 13 tests passing

### File List

- UI: src/lib/components/wizard/step-3.svelte (NEW)
- State: src/lib/components/wizard/wizard.svelte (MODIFIED - added Step 3 integration and step 4 back navigation)
- Types: src/lib/components/wizard/types.ts (MODIFIED - added Step 3 data structures)
- Barrel: src/lib/components/wizard/index.ts (MODIFIED - exported Step3 component and types)
- Tests: src/lib/components/wizard/step-3.test.ts (NEW)
- Tests: src/lib/components/wizard/step-2.test.ts (MODIFIED - cleaned up unused import)
- Page: src/routes/+page.svelte (MODIFIED - imported WizardState type instead of local definition)

### Change Log

- Added Step 3 component and integrated into wizard
- Extended types for Step 3 data structures
- Created tests for numeric inputs and required selections
