# Epic 4: Story Bible - Core Storage & Management

Authors can create and manage their Story Bible—a persistent knowledge base of characters, settings, world rules, themes, and plot threads—organizing everything in one place with categories and favorites.

### Story 4.1: Design Story Bible Database Schema [Tier 1]

As a development team,
I want a comprehensive database schema for Story Bible entries,
So that authors can store and organize all their story knowledge systematically.

**Acceptance Criteria:**

**Given** the SQLite database is configured
**When** the team creates migration `V4__create_story_bible_schema.sql`
**Then** the migration defines a `story_bible_entries` table with fields: id (PRIMARY KEY), project_id (INTEGER, FOREIGN KEY to projects.id), entry_type (TEXT NOT NULL: 'character', 'setting', 'rule', 'theme', 'plot_thread'), title (TEXT NOT NULL), content (TEXT), metadata (TEXT, JSON format for type-specific fields), is_favorite (BOOLEAN DEFAULT 0), created_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP), updated_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP), embedding_vector_id (TEXT, reference to Qdrant vector)
**And** the schema includes indexes on (project_id, entry_type) and (project_id, is_favorite)
**And** a `story_bible_relationships` table is defined for linking entries: id (PRIMARY KEY), from_entry_id (INTEGER, FOREIGN KEY), to_entry_id (INTEGER, FOREIGN KEY), relationship_type (TEXT: 'character_to_plot', 'character_relationship', 'setting_connection'), created_at (TIMESTAMP)

**Given** the story_bible_entries table is created
**When** the team tests the schema
**Then** entries of all types can be inserted
**And** entries can be queried by type, project, or favorite status
**And** the metadata field stores JSON data specific to entry types (e.g., character: {"age": 25, "eye_color": "blue"})
**And** relationships between entries can be created and queried

### Story 4.2: Build Story Bible Navigation UI [Tier 1]

As an author,
I want a dedicated Story Bible panel in the main workspace,
So that I can easily browse and access my story knowledge while writing.

**Acceptance Criteria:**

**Given** the main workspace is open with a project
**When** the Story Bible panel is displayed
**Then** a right-side panel (300px wide, resizable) is shown with tabs for each category: Characters, Settings, Rules, Themes, Plot Threads
**And** a search bar is displayed at the top of the panel
**And** a "+" button is displayed to create new entries
**And** each tab displays a list of entries for that category

**Given** the Characters tab is selected
**When** entries are displayed
**Then** each character entry shows: character name, thumbnail/avatar (optional), brief description (first 50 chars of content), favorite star icon (clickable)
**And** clicking an entry expands it to show full details
**And** hovering over an entry shows a tooltip with quick info
**And** entries are sorted alphabetically by default (with favorites pinned to top)

**Given** the Story Bible panel is displayed
**When** the user resizes the panel
**Then** the panel width can be adjusted from 200px to 500px
**And** the resize handle provides visual feedback on hover
**And** the panel width preference is persisted for the project
**And** the main editor adjusts its width accordingly

**Given** the user clicks the "+" button
**When** a dropdown menu appears
**Then** options are displayed for each entry type: Add Character, Add Setting, Add Rule, Add Theme, Add Plot Thread
**And** selecting an option opens the create entry modal

### Story 4.3: Implement Create Story Bible Entry [Tier 1]

As an author,
I want to create new Story Bible entries with structured forms,
So that I can systematically document my story world.

**Acceptance Criteria:**

**Given** the user selects "Add Character" from the Story Bible panel
**When** the create character modal opens
**Then** the following fields are displayed: Name (required, text input), Role (dropdown: Protagonist, Antagonist, Supporting, Minor), Description (rich text area, 500 char limit), Physical Traits (textarea: appearance, age, etc.), Personality (textarea: traits, motivations), Backstory (textarea), Relationships (multi-select linking to other characters), First Appears in Chapter (dropdown of chapters)
**And** "Save" and "Cancel" buttons are displayed

**Given** the user selects "Add Setting"
**When** the create setting modal opens
**Then** the following fields are displayed: Name (required), Type (dropdown: Location, Time Period, World), Description (rich text area), Key Features (textarea), Atmosphere/Mood (text input), Associated Characters (multi-select)
**And** standard save/cancel buttons are displayed

**Given** the user selects "Add Rule"
**When** the create rule modal opens
**Then** the following fields are displayed: Title (required, e.g., "Magic System Rules"), Category (dropdown: World Building, Magic/Tech, Social/Cultural, Physical Laws), Description (rich text area), Exceptions (textarea)
**And** standard save/cancel buttons are displayed

**Given** the user fills in all required fields and clicks "Save"
**When** the entry is saved
**Then** the entry is inserted into the database with the current project_id
**And** an embedding vector is generated from the entry content and stored in Qdrant
**And** the entry appears in the appropriate category tab
**And** a success toast is displayed: "Character added to Story Bible"
**And** auto-save is triggered for the project

**Given** the user tries to save without filling required fields
**When** validation runs
**Then** required fields are highlighted with red borders
**And** an error message is displayed: "Please fill in all required fields"
**And** the modal remains open for corrections

### Story 4.4: Implement Edit Story Bible Entry [Tier 1]

As an author,
I want to edit existing Story Bible entries,
So that I can update my story knowledge as the narrative evolves.

**Acceptance Criteria:**

**Given** a Story Bible entry is displayed in the panel
**When** the user clicks the "Edit" button (or double-clicks the entry)
**Then** an edit modal opens pre-filled with the current entry data
**And** all fields are editable using the same form as the create modal
**And** the modal title shows "Edit {Entry Type}: {Entry Name}"

**Given** the user modifies entry fields
**When** the user clicks "Save"
**Then** the database record is updated with the new values
**And** the updated_at timestamp is set to the current time
**And** the embedding vector in Qdrant is regenerated if content changed
**And** the entry display in the panel updates to reflect changes
**And** a success toast is displayed: "{Entry Type} updated"
**And** auto-save is triggered

**Given** the user has made changes to an entry
**When** the user clicks "Cancel"
**Then** a confirmation prompt is displayed: "Discard changes?"
**And** if confirmed, the modal closes without saving
**And** if cancelled, the user remains in the edit modal

### Story 4.5: Implement View Story Bible Entry Details [Tier 1]

As an author,
I want to view full details of a Story Bible entry,
So that I can review all information without editing.

**Acceptance Criteria:**

**Given** the user clicks on a Story Bible entry in the panel
**When** the entry details are displayed
**Then** a detail view expands within the panel (or opens a modal)
**And** all entry fields are displayed in a read-only format with clear labels
**And** relationships to other entries are displayed as clickable links
**And** "Edit", "Delete", and "Close" buttons are displayed
**And** if the entry is a character, chapters where they appear are listed

**Given** the user clicks a relationship link (e.g., "Related to: Marcus [Character]")
**When** navigation occurs
**Then** the detail view switches to show the linked entry
**And** a breadcrumb trail is displayed for navigation history
**And** a "Back" button allows returning to the previous entry

**Given** the detail view is open
**When** the user clicks outside the detail area
**Then** the detail view collapses back to the entry list
**And** the entry remains selected with a highlight

### Story 4.6: Implement Search and Filter Story Bible [Tier 1]

As an author,
I want to search and filter Story Bible entries,
So that I can quickly find specific information.

**Acceptance Criteria:**

**Given** the Story Bible panel is open
**When** the user types in the search bar
**Then** results update in real-time (debounced by 300ms)
**And** the search is performed across all entry types (Name, Content, Metadata)
**And** matching entries are highlighted with the search term emphasized
**And** entries are ranked by relevance (exact matches first, then partial)
**And** search works even when viewing a specific category tab

**Given** search results are displayed
**When** the user clears the search (clicks X or deletes text)
**Then** all entries are displayed again
**And** the previous view state is restored

**Given** the user is viewing a specific category tab (e.g., Characters)
**When** filter options are available
**Then** a filter dropdown is displayed with options specific to the category
**And** for Characters: filter by Role (Protagonist, Antagonist, etc.)
**And** for Plot Threads: filter by Status (Active, Resolved, Planned)
**And** a "Favorites Only" toggle is available across all categories
**And** filters can be combined with search

**Given** filters are applied
**When** entries are displayed
**Then** only entries matching all selected filters are shown
**And** a clear filters button is displayed
**And** the active filter count is shown (e.g., "2 filters active")

### Story 4.7: Implement Plot Thread Tracking [Tier 2]

As an author,
I want to track plot threads with status and relationships,
So that I can manage story arcs and ensure resolution.

**Acceptance Criteria:**

**Given** the user creates a Plot Thread entry
**When** the create modal is displayed
**Then** additional fields specific to plot threads are shown: Status (dropdown: Planned, Active, Resolved, Abandoned), Priority (dropdown: Main Plot, Subplot, Minor), Chapters (multi-select: where this thread appears/will appear), Related Characters (multi-select), Related Settings (multi-select), Resolution Notes (textarea)
**And** standard save/cancel buttons are displayed

**Given** a plot thread is created
**When** the entry is saved
**Then** the status, priority, and relationships are stored in the metadata JSON field
**And** the entry appears in the Plot Threads tab with a status badge

**Given** the Plot Threads tab is displayed
**When** entries are shown
**Then** each entry displays: thread title, status badge (color-coded: green=Resolved, amber=Active, gray=Planned), priority indicator (icon or label), list of related characters (clickable links)
**And** entries are grouped by status by default
**And** a visual indicator shows which threads have no resolution yet

**Given** a plot thread status is updated to "Resolved"
**When** the entry is saved
**Then** the status badge updates to green
**And** a resolution date is automatically recorded
**And** the thread moves to the "Resolved" section if grouped by status

### Story 4.8: Implement Character Relationship Linking [Tier 2]

As an author,
I want to link characters to each other with relationship types,
So that I can visualize and manage character connections.

**Acceptance Criteria:**

**Given** the user is editing a character entry
**When** the Relationships field is displayed
**Then** the field shows a list of existing relationships with: Related character name (clickable link), Relationship type (dropdown: Family, Friend, Enemy, Ally, Romantic, Mentor/Student, Custom), Relationship description (short text), Remove button (X icon)
**And** an "Add Relationship" button is displayed

**Given** the user clicks "Add Relationship"
**When** the relationship selector opens
**Then** a dropdown lists all other characters in the Story Bible
**And** the user can select a character
**And** a "Relationship Type" dropdown is displayed
**And** a "Description" text input is displayed (optional, e.g., "childhood friends")
**And** clicking "Add" creates the relationship

**Given** a relationship is created
**When** the entry is saved
**Then** a bidirectional relationship record is created in the story_bible_relationships table
**And** both characters show the relationship in their entry details
**And** the relationship appears when viewing either character

**Given** the user views a character with relationships
**When** the detail view is displayed
**Then** a "Relationships" section shows all connected characters
**And** clicking a related character opens that character's details
**And** relationship types are displayed with icons for quick recognition

### Story 4.9: Implement Auto-Extract Story Bible Suggestions [Tier 2]

As an author,
I want StoryTeller to automatically suggest Story Bible entries based on my writing,
So that I can quickly capture important story elements without interrupting my flow.

**Acceptance Criteria:**

**Given** the author is writing or has written a chapter
**When** the auto-extract feature runs (manual trigger or on save)
**Then** the application analyzes the chapter text using NLP techniques
**And** character names are extracted (capitalized names not in dictionary, appearing multiple times)
**And** location names are extracted (place names, "at the...", "in the...")
**And** the application generates a list of suggested Story Bible entries

**Given** suggestions are generated
**When** the suggestion panel is displayed
**Then** each suggestion shows: entry type (Character, Setting, etc.), extracted name/title, brief context (sentence where it appeared), confidence level (high, medium, low), "Add to Story Bible" button, "Ignore" button
**And** suggestions are sorted by confidence level
**And** the user can review multiple suggestions at once

**Given** the user clicks "Add to Story Bible" on a suggestion
**When** the action is performed
**Then** a create entry modal opens pre-filled with the suggested name and type
**And** the context sentence is added to the description field as a starting point
**And** the user can edit and save the entry as normal
**And** the suggestion is removed from the list

**Given** the user clicks "Ignore" on a suggestion
**When** the action is performed
**Then** the suggestion is removed from the list
**And** the application remembers this ignore decision (won't suggest the same item again for this project)
**And** a "Show Ignored" toggle allows reviewing ignored suggestions later

### Story 4.10: Implement Story Bible Integrity Validation [Tier 2]

As a development team,
I want automated integrity validation for Story Bible data,
So that the application maintains data consistency and detects corruption.

**Acceptance Criteria:**

**Given** a project is loaded
**When** the Story Bible is initialized
**Then** integrity checks run automatically: All entry records have valid project_id references, All relationships reference existing entry IDs, All embedding_vector_ids exist in Qdrant, No orphaned relationships (references to deleted entries), Metadata JSON is valid and parseable
**And** if validation passes, the project loads normally
**And** if validation fails, specific issues are logged

**Given** integrity validation detects issues
**When** the project load completes
**Then** the user sees a warning notification: "Story Bible integrity issues detected. Some entries may need attention."
**And** a "View Issues" button opens a report modal
**And** the report lists specific problems: "3 orphaned relationships found", "1 entry missing embedding vector", etc.
**And** suggested fixes are offered for each issue type

**Given** the user views the integrity report
**When** fix options are presented
**Then** the user can click "Auto-Fix" for resolvable issues (e.g., remove orphaned relationships)
**And** for issues requiring user input, clear instructions are provided
**And** after fixes are applied, validation re-runs automatically
**And** a success message confirms "All issues resolved"

### Story 4.11: Implement Story Bible Undo/Redo [Tier 2]

As an author,
I want undo/redo functionality for Story Bible changes,
So that I can safely experiment and recover from mistakes.

**Acceptance Criteria:**

**Given** the author is working with the Story Bible
**When** operations are performed (create, edit, delete entries)
**Then** each operation is recorded in an undo stack
**And** the undo stack maintains up to 50 operations per session
**And** operations include full state snapshots for reliable reversal

**Given** the author performs a Story Bible operation
**When** the author presses Ctrl+Z (or ⌘+Z)
**Then** the most recent operation is undone
**And** the Story Bible UI updates to reflect the reverted state
**And** the database is rolled back to the previous state
**And** embedding vectors are restored if applicable
**And** a toast notification shows "Undone: {operation description}"

**Given** the author has undone one or more operations
**When** the author presses Ctrl+Y (or ⌘+Shift+Z)
**Then** the most recently undone operation is redone
**And** the Story Bible UI and database are updated accordingly
**And** a toast notification shows "Redone: {operation description}"

**Given** the undo stack has multiple operations
**When** the author performs a new operation after undoing
**Then** the redo stack is cleared (cannot redo past the new operation)
**And** the new operation is added to the undo stack

**Given** the author closes and reopens a project
**When** the project loads
**Then** the undo/redo stacks are cleared (undo history does not persist across sessions)
**And** all Story Bible data reflects the last saved state

---
