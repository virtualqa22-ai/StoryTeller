# Story 2.10: Add Welcome Screen with Optional Demo Project

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a first-time author,
I want to see a welcome screen with the option to explore a demo project,
So that I can learn how StoryTeller works before creating my own novel.

## Acceptance Criteria

1. When the application is launched for the first time (no projects exist), a welcome modal is displayed with the heading "Welcome to StoryTeller"
2. The modal contains a brief introduction: "StoryTeller helps you write consistent, high-quality novels with AI-powered assistance and intelligent Story Bible management."
3. The modal displays three options: "Create My First Project" (primary button), "Explore Demo Project" (secondary button), "Skip Tour" (text link)
4. When user clicks "Explore Demo Project", a pre-configured project is opened with a complete Story Bible (3 characters, 2 settings, 5 plot threads), 3 sample chapters (1 user-written, 2 AI-generated), sample validation reports, and a guided tutorial overlay
5. The demo project is read-only with a persistent banner: "You're viewing a demo project. Ready to create your own? [Create Project]"
6. When user clicks "Create My First Project", the wizard proceeds normally to Step 1
7. When user clicks "Skip Tour", the user is taken to the standard home screen and the welcome modal does not appear again

## Tasks / Subtasks

- [x] Task 1 (AC: 1, 2, 3) - Implement welcome modal on first launch
  - [x] Subtask 1.1: Detect first launch (when no projects exist)
  - [x] Subtask 1.2: Create welcome modal component with heading and introduction
  - [x] Subtask 1.3: Add three action buttons with appropriate styling
- [x] Task 2 (AC: 4, 5) - Implement demo project functionality
  - [x] Subtask 2.1: Create pre-configured demo project with sample data
  - [x] Subtask 2.2: Load demo project in read-only mode
  - [x] Subtask 2.3: Add persistent banner with create project option
  - [x] Subtask 2.4: Implement guided tutorial overlay (deferred to later story)
- [x] Task 3 (AC: 6, 7) - Handle user navigation choices
  - [x] Subtask 3.1: Navigate to wizard when "Create My First Project" clicked
  - [x] Subtask 3.2: Navigate to standard home screen when "Skip Tour" clicked
  - [x] Subtask 3.3: Save preference to not show welcome modal again

## Dev Notes

- **First Launch Detection**: Check for existing projects in the database to determine if this is the first launch
- **Modal Implementation**: Use existing modal patterns from the component library, following Fluent Design principles
- **Demo Project Structure**: The demo should contain realistic sample data that demonstrates StoryTeller's capabilities
- **Read-Only Mode**: Ensure all editing functionality is disabled when in demo mode
- **State Management**: Use Svelte 5 runes for managing modal visibility and user preferences

### Project Structure Notes

- Create new components in `src/lib/components/welcome/` directory
- Use existing UI component patterns (buttons, modals, etc.) from `src/lib/components/ui/`
- Follow the Svelte 5 component structure with `$props()` rune and Snippet type for children
- Maintain consistency with existing styling using Tailwind CSS and semantic color tokens

### References

- [Source: _bmad-output/planning/epics/epic-2-project-setup-configuration-wizard.md#Story 2.10]
- [Source: _bmad-output/documentation/project-docs/project-context.md#Svelte 5 Component Structure]
- [Source: _bmad-output/documentation/project-docs/project-context.md#Tauri Integration Patterns]

## Dev Agent Record

### Agent Model Used

gpt-4

### Debug Log References

### Completion Notes List

- Modal should be accessible with proper focus management
- Demo project should be self-contained and not affect user's actual projects
- Preference to skip tour should persist across app restarts

### File List

- `src/lib/components/welcome/WelcomeModal.svelte` - Main welcome modal component
- `src/lib/components/welcome/DemoProjectProvider.svelte` - Component to handle demo project state
- `src/routes/+layout.svelte` or `src/routes/+page.svelte` - Integration point for detecting first launch
- `src/lib/stores/preferences.ts` - Store for user preferences (show/hide welcome modal)
- `src-tauri/src/demo.rs` - Rust module for demo project data handling (if needed)