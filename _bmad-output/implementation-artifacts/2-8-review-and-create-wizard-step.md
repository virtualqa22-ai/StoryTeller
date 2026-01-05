# Story 2.8: Build Wizard Step 6 - Review and Create

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Dependencies

- Story 2.0-2.7 (Wizard Steps 1-5 must be completed)
- Database schema from Story 2.1 (Project creation requires database)
- Story Bible and Qdrant implementations may be deferred to later epics per architectural documentation

## Story

As an author,
I want to review all my project settings before finalizing creation,
so that I can ensure everything is configured correctly.

## Acceptance Criteria

1. **Review Page Display**: When the user is on Step 6 of the wizard, the progress indicator shows "Step 6 of 6: Review & Create", and a summary card displays all configured settings organized by category: "Basic Information" (title, author, pen name, tagline), "Genre & Audience" (genre, subgenre, target audience, tone), "Story Structure" (POV, framework, chapter count, words per chapter, total target words), "Plot Premise" (first 200 characters with "Read more" link), "AI Provider" (provider name if configured, or "Not configured - you can add this later")
2. **Edit Functionality**: When the user clicks an "Edit" link on the review page, they are taken back to that specific step with all previously entered data preserved in the form fields, and after editing, clicking "Next" returns to the review page with updated information reflected
3. **Project Creation Process**: When the user clicks "Create Project", a loading state is displayed with the message "Creating your project...", and the following operations occur: (1) A new project record is inserted into the database, (2) A project file is created at `~/Documents/StoryTeller/Projects/{project_title}.storyteller`, (3) The project file is initialized with the wizard data; if any operation fails, the user sees a specific error message with recovery options; if all operations succeed, the wizard closes and the main workspace opens with the new project. NOTE: Story Bible and Qdrant initialization will be implemented in later epics per architectural documentation.
4. **Success State**: When the project is created successfully, the main workspace opens with the project title displayed in the title bar, the user sees an empty chapter list with a "Create First Chapter" button, and a welcome toast notification is displayed: "Project created successfully! Ready to start writing."

## Tasks / Subtasks

- [ ] Create Step 6 UI component with progress indicator (AC: #1)
  - [ ] Implement progress indicator showing "Step 6 of 6: Review & Create"
  - [ ] Create summary card component with categorized settings display
  - [ ] Format Basic Information section (title, author, pen name, tagline)
  - [ ] Format Genre & Audience section (genre, subgenre, target audience, tone)
  - [ ] Format Story Structure section (POV, framework, chapter count, etc.)
  - [ ] Format Plot Premise section with character limit and "Read more" link
  - [ ] Format AI Provider section with conditional display
- [ ] Implement edit functionality for each section (AC: #2)
  - [ ] Add "Edit" links for each category that navigate to specific steps
  - [ ] Preserve form data when navigating back to previous steps
  - [ ] Update review page with modified information after editing
- [ ] Implement project creation workflow (AC: #3)
  - [ ] Create loading state with "Creating your project..." message
  - [ ] Implement database insertion for new project record
  - [ ] Create project file at `~/Documents/StoryTeller/Projects/{project_title}.storyteller`
  - [ ] Initialize project file with wizard data
  - [ ] Implement error handling with specific messages and recovery options
  - [ ] Close wizard and open main workspace on success
  - [ ] NOTE: Story Bible and Qdrant initialization will be implemented in later epics per architectural documentation
- [ ] Implement success state UI (AC: #4)
  - [ ] Display project title in application title bar
  - [ ] Show empty chapter list with "Create First Chapter" button
  - [ ] Display welcome toast notification with success message

## Dev Notes

- Follow Fluent Design principles for UI consistency with other wizard steps
- Ensure all data validation from previous steps is maintained in the review summary
- Use secure OS credential storage for API keys if configured
- Implement proper error boundaries and user feedback for each creation step
- Consider file path validation and handling for special characters in project title

### Project Structure Notes

- UI components should be placed in `src/components/wizard/` following existing wizard component patterns
- Database operations should use the rusqlite/refinery migration framework established in Story 2.0 and 2.1
- Project file creation should follow the structure defined in the architecture documents
- State management for the wizard should be consistent with Story 2.3-2.7 implementations

### References

- [Source: _bmad-output/planning/epics/epic-2-project-setup-configuration-wizard.md#Story-2.8-Build-Wizard-Step-6---Review-and-Create-Tier-1]
- [Source: _bmad-output/planning/epics/epic-2-project-setup-configuration-wizard.md#Story-2.0-Configure-SQLite-Database-with-Migrations-Tier-1]
- [Source: _bmad-output/planning/epics/epic-2-project-setup-configuration-wizard.md#Story-2.1-Design-and-Implement-Database-Schema-for-Projects-Tier-1]
- [Source: _bmad-output/planning/epics/epic-2-project-setup-configuration-wizard.md#Story-2.3-Build-Wizard-Step-1---Basic-Project-Information-Tier-1]
- [Source: _bmad-output/planning/epics/epic-2-project-setup-configuration-wizard.md#Story-2.4-Build-Wizard-Step-2---Genre-and-Audience-Tier-1]
- [Source: _bmad-output/planning/epics/epic-2-project-setup-configuration-wizard.md#Story-2.5-Build-Wizard-Step-3---Story-Structure-Tier-1]
- [Source: _bmad-output/planning/epics/epic-2-project-setup-configuration-wizard.md#Story-2.6-Build-Wizard-Step-4---Plot-Premise-Tier-1]
- [Source: _bmad-output/planning/epics/epic-2-project-setup-configuration-wizard.md#Story-2.7-Build-Wizard-Step-5---AI-Provider-Configuration-Tier-1]

## Dev Agent Record

### Agent Model Used

Manual Creation

### Debug Log References

### Completion Notes List

### File List

- src/components/wizard/WizardStep6.svelte (or similar UI component)
- src-tauri/src/database/projects.rs (database operations)
- src/lib/wizard/state.ts (wizard state management)
- src-tauri/src/projects/mod.rs (project file creation)
- src-tauri/src/story_bible/mod.rs (Story Bible initialization - to be implemented in later epic)
- src-tauri/src/qdrant/mod.rs (Qdrant collection creation - to be implemented in later epic)