# Story 2.9: Implement Language Selection

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As an author,
I want to select the language for my novel's content,
so that AI-generated text is in the correct language.

## Acceptance Criteria

1. **Language Selection UI (AC#1)**
   - **Given** the user is on Step 4 of the wizard (Plot Premise)
   - **When** the wizard displays Step 4
   - **Then** a "Content Language" dropdown is displayed below the plot premise
   - **And** the dropdown includes common languages: English, Spanish, French, German, Italian, Portuguese, Russian, Chinese (Simplified), Japanese, Korean, Arabic, Hindi, Other
   - **And** the default selection is "English"
   - **And** a note is displayed: "This affects AI-generated content, not the UI language"

2. **Persistence and AI Context (AC#2)**
   - **Given** the user selects a non-English language
   - **When** the wizard proceeds to later steps
   - **Then** the language selection is saved to the project configuration
   - **And** AI prompts will be instructed to generate content in the selected language

3. **Generation Impact (AC#3)**
   - **Given** the project is created with a specific language
   - **When** AI generation occurs
   - **Then** all generated content (characters, settings, chapters) is in the specified language
   - **And** validation messages remain in the UI language (English by default)

## Tasks / Subtasks

- [ ] Update Wizard Types (AC: #1, #2)
  - [ ] Add `language` field to `WizardStep4Data` interface in `src/lib/components/wizard/types.ts`
  - [ ] Update default values/initial state

- [ ] Update Step 4 Component (AC: #1)
  - [ ] Import `Select` component or use native select
  - [ ] Add "Content Language" dropdown below Plot Premise textarea in `src/lib/components/wizard/step-4.svelte`
  - [ ] Populate with required language options
  - [ ] Set default value to "English"
  - [ ] Add explanatory note: "This affects AI-generated content, not the UI language"
  - [ ] Ensure layout is consistent with existing Step 4 elements

- [ ] Update Unit Tests for Step 4 (AC: #1)
  - [ ] Update `src/lib/components/wizard/step-4.test.ts`
  - [ ] Test that language dropdown renders with correct options
  - [ ] Test that default is English
  - [ ] Test that selection updates state
  - [ ] Test that language is passed to `onNext`

- [ ] Verify Project Creation with Language (AC: #2)
  - [ ] Ensure language selection is passed through wizard completion
  - [ ] Verify `create_project` command receives language parameter (if applicable) or it's stored in project metadata

## Dev Notes

### Implementation Context

This story enhances **Step 4 (Plot Premise)** by adding a language selection field. This is not a new step, but a modification to an existing one. The selected language needs to be stored in the project metadata so it can be used during AI generation.

### Architecture Patterns

- **Component Modification**: We are modifying `step-4.svelte`. We should maintain the existing patterns using Svelte 5 runes (`$props`, `$state`, `$derived`).
- **State Management**: The `language` field should be added to the step's state and validation logic (though it has a default, so validation might be trivial unless "Other" requires input).
- **Data Flow**: The language selection needs to propagate up to the main wizard state and eventually be sent to the backend when creating the project.

### Language Options
- English (default)
- Spanish
- French
- German
- Italian
- Portuguese
- Russian
- Chinese (Simplified)
- Japanese
- Korean
- Arabic
- Hindi
- Other

### Files to Modify
1. `src/lib/components/wizard/types.ts`
2. `src/lib/components/wizard/step-4.svelte`
3. `src/lib/components/wizard/step-4.test.ts`
4. `src/lib/components/wizard/wizard.svelte` (if explicit mapping is needed)
5. Backend structs if necessary (to store language in DB/Project file)

## Dev Agent Record

### Agent Model Used

Trae (Gemini-3-Pro-Preview)

### Completion Notes List

### File List
