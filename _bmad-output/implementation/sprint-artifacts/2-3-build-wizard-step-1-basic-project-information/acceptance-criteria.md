# Acceptance Criteria

**Given** user clicks "Create New Project" on home screen
**When** wizard opens to Step 1
**Then** the wizard displays as a modal dialog overlaying the home screen
**And** a progress indicator shows "Step 1 of 6: Basic Information"
**And** the following input fields are displayed with labels:
  - "Novel Title" (required, text input)
  - "Author Name" (optional, text input, placeholder: "Your real name")
  - "Pen Name" (optional, text input, placeholder: "Your pen name if different")
  - "Tagline" (optional, text input, placeholder: "A one-sentence hook for your novel", max 150 characters)
**And** all fields use the existing Fluent Design Input component from `src/lib/components/ui/input/`
**And** "Novel Title" field has real-time validation (min 1 character, max 200 characters)

**Given** user is on Step 1
**When** user leaves "Novel Title" field empty and clicks "Next"
**Then** an error message is displayed below the field: "Novel Title is required"
**And** the field is highlighted with a red border
**And** focus is returned to the "Novel Title" field
**And** the wizard does not advance to Step 2

**Given** user types more than 200 characters in "Novel Title"
**When** the character count exceeds 200
**Then** user cannot type beyond 200 characters (input is truncated)
**And** a character counter shows "200 / 200" and turns red

**Given** user has entered a valid novel title
**When** user clicks "Next"
**Then** form data is saved to a temporary wizard state in local component state
**And** the wizard advances to Step 2 (which will be implemented in Story 2.4)
**And** a "Back" button becomes enabled
**And** all form values are preserved for navigation back to Step 1

**Given** user is on Step 1
**When** user clicks "Cancel" or closes the dialog
**Then** the wizard modal closes without saving
**And** user returns to home screen
**And** any partially entered data is discarded
