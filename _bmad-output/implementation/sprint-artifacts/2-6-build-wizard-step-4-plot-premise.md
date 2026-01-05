# Story 2.6: Build Wizard Step 4 - Plot Premise

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As an author,
I want to provide a high-level plot premise in the wizard,
so that StoryTeller can use this context when generating content.

## Acceptance Criteria

1. **Progress Indicator Display (AC#1)**
   - **Given** the user is on Step 4 of the wizard
   - **When** the wizard displays Step 4
   - **Then** the progress indicator shows "Step 4 of 6: Plot Premise"

2. **Plot Premise Textarea with Guidance (AC#2)**
   - **Then** a large textarea is displayed with the label "Plot Premise"
   - **And** placeholder text provides guidance: "Describe your story's main plot in 2-3 paragraphs. Include the protagonist, their goal, the central conflict, and the stakes."
   - **And** a character counter is displayed below the textarea (e.g., "125 / 2000 characters")
   - **Note:** Markdown formatting support is explicitly out of scope for this story

3. **Character Counter Behavior (AC#3)**
   - **Given** the user is typing in the plot premise textarea
   - **When** the character count approaches the maximum (2000 characters)
   - **Then** the counter changes color to amber at 1800 characters
   - **And** the counter changes color to red at 1950 characters
   - **And** the user cannot type beyond 2000 characters

4. **Valid Plot Premise - Next Navigation (AC#4)**
   - **Given** the user has entered at least 100 characters in the plot premise
   - **When** the user clicks "Next"
   - **Then** the plot premise is saved to wizard state
   - **And** the wizard advances to Step 5

5. **Short Plot Premise - Warning Message (AC#5)**
   - **Given** the user has entered fewer than 100 characters
   - **When** the user clicks "Next"
   - **Then** a warning message is displayed in an inline alert: "We recommend at least 100 characters (about 2-3 sentences) for better AI-generated content. Continue anyway?"
   - **And** two action buttons are displayed: "Go Back to Edit" and "Continue Anyway"
   - **And** clicking "Go Back to Edit" dismisses the warning and returns focus to the textarea
   - **And** clicking "Continue Anyway" saves the plot premise and advances to Step 5

## Tasks / Subtasks

- [x] Implement Step 4 route/view with progress indicator (AC: #1)
  - [x] Add wizard step metadata and ARIA attributes for accessibility
  - [x] Ensure progress shows "Step 4 of 6: Plot Premise"

- [x] Build plot premise textarea with character counter (AC: #2, #3)
  - [x] Create textarea component with label "Plot Premise"
  - [x] Add placeholder text with guidance
  - [x] Implement real-time character counter (X / 2000)
  - [x] Implement character counter color transitions (amber at 1800, red at 1950)
  - [x] Enforce 2000 character maximum limit
  - [ ] Optional: Add basic markdown formatting support or preview (skipped - out of scope)

- [x] Implement validation and Next button logic (AC: #4, #5)
  - [x] If ≥100 characters: save to wizard state and advance to Step 5
  - [x] If <100 characters: show inline warning alert with "Continue anyway?" option
  - [x] Provide "Go Back to Edit" and "Continue Anyway" action buttons in warning alert
  - [x] "Go Back to Edit" dismisses warning and returns focus to textarea
  - [x] "Continue Anyway" proceeds to Step 5 with current plot premise

- [x] Implement Back and Cancel button handlers (consistency with other steps)
  - [x] Back button returns to Step 3
  - [x] Cancel button closes wizard with confirmation

- [x] Add unit tests for validation and character counting
  - [x] Test character counter updates correctly
  - [x] Test color transitions at 1800 and 1950 characters
  - [x] Test 2000 character limit enforcement
  - [x] Test validation for <100 characters warning display
  - [x] Test validation for ≥100 characters allowing progression
  - [x] Test "Go Back to Edit" button dismisses warning and focuses textarea
  - [x] Test "Continue Anyway" button proceeds to Step 5
  - [x] Test Back and Cancel button functionality

- [ ] Add E2E tests for wizard Step 4 flow (optional - unit tests provide sufficient coverage)
  - [ ] Test full happy path: enter plot premise ≥100 chars → Next → advances to Step 5
  - [ ] Test warning path: enter <100 chars → Next → warning displayed → Continue Anyway → advances to Step 5
  - [ ] Test warning dismissal path: enter <100 chars → Next → warning displayed → Go Back to Edit → textarea focused
  - [ ] Test character limit enforcement in browser

## Dev Notes

### Critical Implementation Context

**This story implements Step 4 of a 6-step wizard**. The wizard was progressively built in stories 2-3, 2-4, and 2-5. Step 4 focuses on capturing the author's plot premise with validation and guidance.

### Established Wizard Architecture Patterns

Based on analysis of Step 3 (story 2-5), the wizard follows these **exact patterns**:

1. **Component Structure** (from `step-3.svelte`):
   - Use Svelte 5 runes: `$props()`, `$state()`, `$derived()`
   - Props interface: `onNext`, `onBack`, `onCancel`
   - State variables with separate "touched" tracking for validation
   - Derived validation errors with `showValidation` flag
   - Handler functions that validate before calling `onNext`

2. **Validation Pattern**:
   ```typescript
   // Touch tracking
   let plotPremiseTouched = $state(false);
   let showValidation = $state(false);
   let showWarning = $state(false); // For <100 character warning

   // Minimum character threshold
   const MIN_CHARS = 100;

   // Derived error with conditional display
   const plotPremiseError = $derived(
     (showValidation || plotPremiseTouched) && plotPremise.length < MIN_CHARS
       ? 'We recommend at least 100 characters for better AI-generated content.'
       : ''
   );

   function handleNext() {
     showValidation = true;
     // Validate
     if (plotPremise.length < MIN_CHARS) {
       // Show inline warning alert
       showWarning = true;
       return;
     }
     onNext({ plotPremise });
   }

   function handleContinueAnyway() {
     showWarning = false;
     onNext({ plotPremise });
   }

   function handleGoBack() {
     showWarning = false;
     // Focus textarea (implementation detail)
   }
   ```

3. **UI Component Imports** (established in Step 3):
   ```typescript
   import Button from '$lib/components/ui/button/button.svelte';
   import Label from '$lib/components/ui/label/label.svelte';
   import FormItem from '$lib/components/ui/form/form-item.svelte';
   import FormMessage from '$lib/components/ui/form/form-message.svelte';
   import Textarea from '$lib/components/ui/textarea/textarea.svelte'; // NEW for this step
   import Alert from '$lib/components/ui/alert/alert.svelte'; // For inline warning (verify component exists)
   ```

4. **Accessibility Requirements** (from Step 3):
   - Progress indicator must have `role="progressbar"`, `aria-label`, `aria-valuenow="4"`, `aria-valuemin="1"`, `aria-valuemax="6"`
   - All interactive elements need `data-testid` attributes
   - Error messages use `FormMessage` component with `data-testid` for testing

5. **Layout and Styling**:
   - Root div: `class="p-6 space-y-6" data-testid="wizard-step-4"`
   - Navigation buttons in flex container with `justify-between`
   - Button order: Left side (Cancel, Back), Right side (Next/Continue)
   - Use semantic Tailwind tokens: `text-destructive`, `bg-muted`, `text-muted-foreground`

### Step 4 Specific Requirements

**Plot Premise Textarea:**
- Large textarea (recommend `rows="8"` or similar for 2-3 paragraph guidance)
- `maxlength="2000"` attribute to enforce character limit
- Bind to `plotPremise` state variable
- Track character count: `plotPremise.length`
- **Minimum character threshold: 100 characters** (updated from 50 for better quality)

**Character Counter Display:**
- Position below textarea
- Format: `{plotPremise.length} / 2000 characters`
- Color logic:
  - Default: `text-muted-foreground`
  - At 1800+ chars: `text-amber-500` or `text-amber-600`
  - At 1950+ chars: `text-destructive` (red)
- Use `$derived` for reactive color class

**Inline Warning Alert for <100 Characters:**
- **Required Implementation:** Use inline alert component (not modal/dialog)
- Display below the textarea, above navigation buttons when triggered
- Warning text: "We recommend at least 100 characters (about 2-3 sentences) for better AI-generated content. Continue anyway?"
- Two action buttons:
  1. "Go Back to Edit" (secondary/outline style) - dismisses warning and focuses textarea
  2. "Continue Anyway" (primary style) - proceeds to Step 5
- Use Alert component from UI library if available, otherwise create styled div with warning styles
- Add `data-testid="plot-premise-warning"` for testing

### Previous Story Intelligence (Story 2-5)

**Key Learnings from Story 2-5:**
- ✅ Svelte 5 runes (`$props`, `$state`, `$derived`) work perfectly
- ✅ Touch-based validation pattern prevents premature error display
- ✅ `showValidation` flag ensures errors show on Next button click
- ✅ Input sanitization (for numeric inputs) prevents negative values during typing
- ✅ ARIA attributes added to progress indicator for WCAG 2.1 AA compliance
- ✅ Comprehensive unit tests with `@testing-library/svelte` + Vitest
- ✅ All navigation buttons (Cancel, Back, Next) tested separately
- ✅ Detailed inline comments explaining type assertions

**Code Review Feedback Applied:**
- Added ARIA attributes to progress indicator
- Expanded test coverage for Back/Cancel buttons
- Input sanitization to prevent negative numbers (not applicable here, but pattern is established)
- Documented all modified files in File List section

**Files Modified in Story 2-5:**
1. `src/lib/components/wizard/step-3.svelte` (NEW)
2. `src/lib/components/wizard/wizard.svelte` (MODIFIED - added Step 3 integration)
3. `src/lib/components/wizard/types.ts` (MODIFIED - added Step 3 data structures)
4. `src/lib/components/wizard/index.ts` (MODIFIED - exported Step3 component)
5. `src/lib/components/wizard/step-3.test.ts` (NEW)
6. `src/routes/+page.svelte` (MODIFIED - imported WizardState type)

### Git Intelligence from Recent Commits

**Commit: 3edc84f - "Implemented 2-5 Wizard Step 3"**
- Modified 9 files total (6 modified, 3 new)
- Pattern: Each step creates `step-X.svelte`, `step-X.test.ts`, and updates `types.ts`, `index.ts`, `wizard.svelte`
- Test coverage: 13 tests for Step 3 (all passing)
- Story file created with detailed Dev Agent Record section

**Commit: 8e45b1d - "Story 2-4 completed"**
- Similar pattern to Step 3 implementation
- Established the validation and navigation patterns

**Commit: 6a09a1d - "feat(wizard): complete step 1 implementation with validation and tests"**
- Initial wizard architecture established
- Set precedent for progress indicator, validation, and testing

### Architecture Compliance

**Technology Stack (from project-context.md):**
- **Svelte 5.0.0** with runes-based reactivity ✅
- **TypeScript 5.6.2** strict mode ✅
- **Tailwind CSS 4.1.18** with semantic tokens ✅
- **Vitest 4.0.16** for unit tests ✅
- **Playwright 1.57.0** for E2E tests ✅

**Critical Svelte 5 Rules:**
- ❌ **DON'T** use `export let prop` (old Svelte syntax)
- ✅ **DO** use `let { prop } = $props()` rune
- ❌ **DON'T** use `<slot>` (old Svelte syntax)
- ✅ **DO** use `Snippet` type and `{@render}` syntax (not applicable to this step)
- ✅ **DO** use `$state()` for reactive component state
- ✅ **DO** use `$derived()` for computed values

**Tailwind CSS Rules:**
- ✅ Always use `cn()` helper from `$lib/utils` for class merging
- ✅ Use semantic color tokens: `bg-primary`, `text-destructive`, `text-muted-foreground`
- ❌ **DON'T** use raw colors like `bg-blue-500`
- ✅ Use Fluent Design spacing: `p-6`, `space-y-6`, `mt-1`, `gap-4`

**Testing Standards:**
- Unit tests co-located: `step-4.svelte` + `step-4.test.ts` in same folder
- Use `@testing-library/svelte` with `render()` and `screen.getByRole()`
- Add `data-testid` to all interactive elements and major containers
- Test validation logic, navigation buttons, and character counter behavior

### File Structure Requirements

**Expected New/Modified Files:**
1. `src/lib/components/wizard/step-4.svelte` (NEW) - Step 4 UI component
2. `src/lib/components/wizard/step-4.test.ts` (NEW) - Unit tests for Step 4
3. `src/lib/components/wizard/types.ts` (MODIFY) - Add `WizardStep4Data` interface
4. `src/lib/components/wizard/index.ts` (MODIFY) - Export Step4 component and types
5. `src/lib/components/wizard/wizard.svelte` (MODIFY) - Integrate Step 4 into wizard flow
6. `tests/e2e/wizard-step-4.spec.ts` (NEW - OPTIONAL) - E2E tests for Step 4

**Type Definitions to Add (types.ts):**
```typescript
export interface WizardStep4Data {
  plotPremise: string;
}
```

### Testing Requirements

**Unit Tests (step-4.test.ts):**
1. Test progress indicator renders "Step 4 of 6: Plot Premise"
2. Test ARIA attributes on progress indicator
3. Test placeholder text displays correctly
4. Test character counter updates reactively as user types
5. Test character counter color changes at 1800 characters
6. Test character counter color changes at 1950 characters
7. Test 2000 character limit enforcement (cannot type beyond)
8. Test Next button with ≥100 characters advances to Step 5
9. Test Next button with <100 characters shows inline warning
10. Test Back button calls `onBack` handler
11. Test Cancel button calls `onCancel` handler
12. Test warning "Continue Anyway" button advances to Step 5
13. Test warning "Go Back to Edit" button dismisses warning and focuses textarea
14. Test warning is not shown initially (only after Next click with <100 chars)

**E2E Tests (optional but recommended):**
- Full wizard flow from Step 1 → Step 4 → Step 5
- Character counter behavior in real browser environment
- Inline warning interaction with <100 characters (both "Continue Anyway" and "Go Back" paths)
- Focus behavior when "Go Back to Edit" is clicked

### Library & Framework Requirements

**UI Components to Use:**
- `Button` - from `$lib/components/ui/button/button.svelte`
- `Label` - from `$lib/components/ui/label/label.svelte`
- `FormItem` - from `$lib/components/ui/form/form-item.svelte`
- `FormMessage` - from `$lib/components/ui/form/form-message.svelte`
- `Textarea` - from `$lib/components/ui/textarea/textarea.svelte` (verify this exists, or use native `<textarea>`)
- `Alert` - from `$lib/components/ui/alert/alert.svelte` (verify this exists for inline warning)

**If `Textarea` component doesn't exist:**
- Create or use native `<textarea>` with consistent styling
- Apply classes: `w-full p-3 rounded-md border border-input bg-background text-sm resize-none`
- Follow Input component styling patterns from other steps

### Latest Technical Specifics

**Svelte 5 Reactivity (2025):**
- `$state()` creates reactive state
- `$derived()` creates computed values (replaces reactive declarations)
- No need for `$:` reactive statements
- Character counter should be `$derived` from `plotPremise.length`

**TypeScript Strict Mode:**
- All type assertions must be safe (validate before asserting)
- Props interface must include all required callback types
- Use explicit types for state variables

**Accessibility (WCAG 2.1 AA):**
- Progress indicator needs `role="progressbar"` with ARIA attributes
- Textarea should have associated label with `for` attribute
- Character counter should have `aria-live="polite"` for screen readers
- Error/warning messages should be announced to screen readers

### Project Context Reference

See comprehensive project rules and patterns:
- [Project Context](file:///c:/Users/KaRaN/trae-workspace/StoryTeller/_bmad-output/documentation/project-docs/project-context.md)
- [Epic 2: Project Setup & Configuration Wizard](file:///c:/Users/KaRaN/trae-workspace/StoryTeller/_bmad-output/planning/epics/epic-2-project-setup-configuration-wizard.md#L171-L202)
- [Previous Story (2-5)](file:///c:/Users/KaRaN/trae-workspace/StoryTeller/_bmad-output/implementation/sprint-artifacts/2-5-build-wizard-step-3-story-structure.md)

### Implementation Checklist

**Before Starting:**
- [ ] Read Step 3 implementation (`step-3.svelte`) to understand exact patterns
- [ ] Verify Textarea component exists in UI library
- [ ] Verify Alert component exists for inline warning (or plan custom styled warning)
- [ ] Review validation pattern from Step 3
- [ ] Understand minimum character threshold is 100 (not 50)

**During Implementation:**
- [ ] Use exact same component structure as Step 3
- [ ] Follow touch-based validation pattern
- [ ] Add all required `data-testid` attributes
- [ ] Implement character counter with color transitions (amber at 1800, red at 1950)
- [ ] Implement inline warning alert for <100 characters with "Go Back to Edit" and "Continue Anyway" buttons
- [ ] Ensure "Go Back to Edit" focuses the textarea
- [ ] Write comprehensive unit tests (target 14 tests including warning button behaviors)
- [ ] **Do NOT implement markdown formatting** (explicitly out of scope)

**After Implementation:**
- [ ] Run `pnpm check` to verify TypeScript types
- [ ] Run `pnpm test` to verify all unit tests pass
- [ ] Test manually in browser for character counter behavior
- [ ] Verify accessibility with keyboard navigation
- [ ] Update story file with Dev Agent Record

### Story Completion Status

**Status:** ready-for-dev

**Note:** This story is **ready for development** with comprehensive context provided. All architectural patterns, validation logic, testing requirements, and UI component dependencies have been documented. The developer has everything needed for flawless implementation based on established patterns from Steps 1-3.

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.5 (claude-sonnet-4-5-20250929)

### Debug Log References

- No blocking issues encountered
- All tests passing (14/14 unit tests)
- TypeScript validation clean
- Followed TDD approach (RED-GREEN-REFACTOR cycle)

### Completion Notes List

✅ **Implementation Summary:**
- Implemented Step 4 of wizard following established patterns from Steps 1-3
- Created plot premise textarea with 2000 character limit
- Implemented real-time character counter with color transitions (amber at 1800, red at 1950)
- Added validation with inline warning for <100 characters
- Warning includes "Go Back to Edit" (returns focus) and "Continue Anyway" (proceeds) buttons
- All ARIA attributes added for accessibility (WCAG 2.1 AA compliance)
- Followed Svelte 5 runes pattern ($props, $state, $derived)
- Used native <textarea> element with proper styling for better DOM control
- Comprehensive unit test coverage (14 tests, all passing)

✅ **Key Technical Decisions:**
- Used native `<textarea>` instead of Textarea component for direct DOM element binding (needed for focus() method)
- Implemented character counter using $derived reactive declaration
- Used inline custom-styled warning alert (no Alert component needed)
- Applied exact styling patterns from Step 3 for consistency

✅ **Testing Approach:**
- Followed TDD: wrote tests first (RED phase)
- Implemented component (GREEN phase)
- All 14 unit tests passing
- Used userEvent.paste() for long text strings (1800+, 1950+ chars) to avoid timeout
- Tested all acceptance criteria including warning flow and focus behavior

### File List

1. `src/lib/components/wizard/step-4.svelte` (NEW - Step 4 component)
2. `src/lib/components/wizard/step-4.test.ts` (NEW - 14 unit tests, all passing)
3. `src/lib/components/wizard/types.ts` (MODIFIED - added WizardStep4Data interface and updated WizardState)
4. `src/lib/components/wizard/index.ts` (MODIFIED - exported Step4 component and WizardStep4Data type)
5. `src/lib/components/wizard/wizard.svelte` (MODIFIED - integrated Step 4 into wizard flow)
6. `_bmad-output/implementation/sprint-artifacts/sprint-status.yaml` (MODIFIED - updated story 2-6 status to 'review')
7. `_bmad-output/implementation/sprint-artifacts/2-6-build-wizard-step-4-plot-premise.md` (NEW - this story file)

### Change Log

**2026-01-05 - Story 2-6 Implementation Complete**
- ✅ Created Step 4 component with plot premise textarea (2000 char limit)
- ✅ Implemented character counter with amber/red color transitions
- ✅ Added validation with inline warning alert for <100 characters
- ✅ Implemented "Go Back to Edit" and "Continue Anyway" warning actions
- ✅ Added comprehensive unit tests (14 tests, 100% pass rate)
- ✅ Integrated Step 4 into wizard navigation flow
- ✅ All acceptance criteria met and validated

**2026-01-05 - Code Review Fixes Applied**
- 🔧 Fixed `$derived` pattern: Changed `$derived(() => {...})` to `$derived.by(() => {...})` for idiomatic Svelte 5 reactivity
- 🔧 Added input trimming: Plot premise is now trimmed on save to prevent whitespace-only submissions
- 🔧 Fixed TypeScript validation errors in `step-2.test.ts`: Changed all `test.skip` to `it.skip` (10 instances)
- 📝 Updated File List: Added missing files (sprint-status.yaml, story file) - now documents all 7 changed files
- ✅ All unit tests passing (14/14 for Step 4)
- ✅ TypeScript validation (`pnpm check`) now passes
