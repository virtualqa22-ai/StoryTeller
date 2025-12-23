# Epics 4-12 Continuation

This file contains the continuation of epics to be appended to epics.md

---

## Epic 4: Story Bible - Core Storage & Management

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

## Epic 5: Rich Text Editor & Writing Workspace

Authors can write and edit novel chapters in a professional rich text editor with auto-save, undo/redo, word count tracking, table of contents generation, and offline capability.

### Story 5.1: Design Chapters Database Schema [Tier 1]

As a development team,
I want a database schema for storing novel chapters with content and metadata,
So that the application can persist manuscript data reliably.

**Acceptance Criteria:**

**Given** the SQLite database is configured
**When** the team creates migration `V5__create_chapters_schema.sql`
**Then** the migration defines a `chapters` table with fields: id (PRIMARY KEY), project_id (INTEGER, FOREIGN KEY to projects.id), chapter_number (INTEGER NOT NULL), title (TEXT), content (TEXT, stores ProseMirror JSON document), word_count (INTEGER DEFAULT 0), is_generated (BOOLEAN DEFAULT 0, indicates AI-generated), generation_metadata (TEXT, JSON with AI generation details), created_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP), updated_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP), last_edited_at (TIMESTAMP)
**And** the schema includes a unique constraint on (project_id, chapter_number)
**And** the schema includes an index on (project_id, chapter_number) for ordered retrieval
**And** a `chapter_snapshots` table is defined for version history: id (PRIMARY KEY), chapter_id (INTEGER, FOREIGN KEY), snapshot_name (TEXT), content (TEXT, ProseMirror JSON), word_count (INTEGER), created_at (TIMESTAMP)

**Given** the chapters table is created
**When** the team tests the schema
**Then** chapter records can be inserted for a project
**And** chapters can be queried in order by chapter_number
**And** the content field stores valid ProseMirror JSON documents
**And** word_count is updated via trigger when content changes
**And** snapshots can be created and retrieved for any chapter

### Story 5.2: Build Main Workspace Layout [Tier 1]

As an author,
I want a three-column workspace layout for writing,
So that I have quick access to chapters, the editor, and Story Bible simultaneously.

**Acceptance Criteria:**

**Given** a project is open
**When** the main workspace renders
**Then** a three-column layout is displayed: Left sidebar (200px, resizable): Chapter list navigation, Main editor area (flexible width): ProseMirror rich text editor, Right sidebar (300px, resizable, collapsible): Story Bible panel
**And** the layout follows Fluent Design with proper spacing and visual hierarchy
**And** column widths are persisted per project

**Given** the left sidebar is displayed
**When** the chapter list renders
**Then** all chapters are displayed in order with: chapter number and title (e.g., "Chapter 1: The Beginning"), word count (e.g., "3,245 words"), progress indicator (if target word count is set), completion checkmark (if meets target)
**And** the currently open chapter is highlighted
**And** a "+" button to add a new chapter is displayed at the bottom

**Given** the main editor area is displayed
**When** the editor renders
**Then** a toolbar is displayed above the editor with formatting options
**And** the ProseMirror editor fills the remaining space
**And** a status bar is displayed below the editor showing: current word count, target word count (if set), auto-save status ("Saving..." or "Saved 2 seconds ago"), online/offline indicator

**Given** the right sidebar is displayed
**When** the Story Bible panel renders
**Then** the Story Bible UI (from Epic 4) is embedded in this panel
**And** a collapse button (chevron icon) allows hiding the panel
**And** when collapsed, only an expand button remains visible on the right edge
**And** the panel state (open/collapsed) is persisted per project

### Story 5.3: Implement Chapter Management (Create, Rename, Delete, Reorder) [Tier 1]

As an author,
I want to create, rename, delete, and reorder chapters,
So that I can structure my manuscript flexibly.

**Acceptance Criteria:**

**Given** the chapter list is displayed
**When** the user clicks the "+" button
**Then** a new chapter is created with: chapter_number = max(existing chapter_number) + 1, default title = "Chapter {number}", empty content (ProseMirror empty document), word_count = 0
**And** the new chapter is inserted into the database
**And** the chapter list updates to show the new chapter
**And** the editor switches to the new chapter
**And** a success toast is displayed: "Chapter {number} created"

**Given** the user right-clicks a chapter in the list
**When** the context menu opens
**Then** options are displayed: "Rename", "Duplicate", "Delete", "Create Snapshot"
**And** selecting an option performs the corresponding action

**Given** the user selects "Rename" from the context menu
**When** the rename dialog opens
**Then** an input field is displayed pre-filled with the current chapter title
**And** the user can edit the title
**And** clicking "Save" updates the chapter title in the database
**And** the chapter list updates to reflect the new title

**Given** the user selects "Delete" from the context menu
**When** the confirmation dialog opens
**Then** the dialog warns: "Delete Chapter {number}: {title}? This action cannot be undone."
**And** if confirmed, the chapter record is deleted from the database
**And** if the deleted chapter is currently open, the editor switches to the previous or next chapter
**And** chapter numbers are NOT automatically renumbered (preserve explicit numbering)

**Given** the chapter list is displayed
**When** the user drags a chapter entry
**Then** the chapter can be reordered by dragging to a new position
**And** a visual indicator shows the drop position
**And** dropping the chapter updates chapter_number for affected chapters
**And** the database is updated to reflect the new order
**And** the chapter list re-renders in the new order

### Story 5.4: Integrate ProseMirror Rich Text Editor [Tier 1]

As an author,
I want a professional rich text editor with formatting options,
So that I can write and format my manuscript beautifully.

**Acceptance Criteria:**

**Given** a chapter is open in the editor
**When** the ProseMirror editor is initialized
**Then** the editor uses a custom schema supporting: Paragraphs (default), Headings (H1, H2, H3), Bold, Italic, Underline, Blockquotes, Lists (ordered, unordered), Hard breaks (Shift+Enter)
**And** the editor loads the chapter content from the database (ProseMirror JSON)
**And** the editor has a minimum height of 400px
**And** the editor has a clean, distraction-free appearance with Fluent Design typography

**Given** the editor toolbar is displayed
**When** the user views formatting options
**Then** the following toolbar buttons are available: Bold (Ctrl+B / ⌘+B), Italic (Ctrl+I / ⌘+I), Underline (Ctrl+U / ⌘+U), Heading 1, Heading 2, Heading 3, Blockquote, Bullet List, Numbered List, Undo (Ctrl+Z / ⌘+Z), Redo (Ctrl+Y / ⌘+Shift+Z)
**And** active formatting is highlighted in the toolbar (e.g., Bold button is highlighted when cursor is in bold text)
**And** tooltips show keyboard shortcuts on hover

**Given** the user selects text in the editor
**When** formatting buttons are clicked
**Then** the selected text is formatted accordingly
**And** the formatting persists in the ProseMirror document state
**And** the formatted content is visible immediately
**And** formatting can be toggled on and off

**Given** the user types in the editor
**When** content is entered
**Then** typing is responsive with <16ms latency
**And** the editor maintains 60 FPS while typing
**And** basic autocomplete works (e.g., smart quotes, em dashes)
**And** word count updates in real-time in the status bar

### Story 5.5: Implement Word Count Tracking [Tier 1]

As an author,
I want real-time word count display and chapter target tracking,
So that I can monitor my writing progress.

**Acceptance Criteria:**

**Given** the author is writing in the editor
**When** the content changes
**Then** the word count is recalculated in real-time
**And** the word count is displayed in the status bar (e.g., "3,245 words")
**And** if a target word count is set for the chapter, both are shown (e.g., "3,245 / 5,000 words")
**And** a visual progress bar shows completion percentage

**Given** a target word count is configured for the project
**When** the chapter word count is compared to the target
**Then** the status bar indicates: Green text if within 90-110% of target, Amber text if 70-89% or 111-130% of target, Red text if below 70% or above 130% of target
**And** a tooltip provides specific guidance (e.g., "1,755 words below target")

**Given** the author reaches or exceeds the target word count
**When** the milestone is achieved
**Then** a celebratory animation is displayed (confetti, checkmark)
**And** a toast notification appears: "Chapter {number} complete! {word_count} words written."
**And** the chapter is marked as complete in the chapter list

**Given** the project has multiple chapters
**When** the user views the overall project progress
**Then** a project-level word count is calculated (sum of all chapter word counts)
**And** the project word count is displayed in the main workspace header
**And** a progress indicator shows percentage toward the total target word count

### Story 5.6: Implement Auto-Save (Every 30 Seconds) [Tier 1]

As an author,
I want the application to automatically save my work every 30 seconds,
So that I never lose writing progress.

**Acceptance Criteria:**

**Given** the author is writing in the editor
**When** content changes occur
**Then** a debounced auto-save timer starts (resets on each edit)
**And** after 30 seconds of inactivity OR 60 seconds since last save (whichever comes first), auto-save is triggered
**And** the status bar shows "Saving..." during the save operation
**And** the save completes in <200ms for chapters up to 10,000 words

**Given** auto-save is triggered
**When** the save operation runs
**Then** the chapter content (ProseMirror JSON) is serialized
**And** the content is written to the database (UPDATE chapters SET content=?, word_count=?, updated_at=?)
**And** the word_count field is updated based on the serialized content
**And** the updated_at timestamp is set to the current time
**And** after save completes, the status bar shows "Saved X seconds ago" (relative time)

**Given** multiple rapid edits occur
**When** the auto-save timer is running
**Then** only one save operation is performed (batches changes)
**And** the save includes all changes up to the point of save execution
**And** subsequent edits reset the timer for the next auto-save cycle

**Given** a save operation fails (database error, disk full, etc.)
**When** the failure is detected
**Then** the user sees an error notification: "Auto-save failed: {reason}. Your changes are temporarily stored in memory."
**And** the application retries the save operation every 30 seconds
**And** unsaved changes are preserved in memory
**And** the status bar shows a warning indicator
**And** the user is prompted to save manually or resolve the issue

### Story 5.7: Implement Manual Save (Ctrl+S / ⌘+S) [Tier 1]

As an author,
I want to manually save my work at any time using a keyboard shortcut,
So that I can ensure important changes are persisted immediately.

**Acceptance Criteria:**

**Given** the author is writing in the editor
**When** the author presses Ctrl+S (Windows/Linux) or ⌘+S (macOS)
**Then** an immediate save is triggered regardless of auto-save timer
**And** the same save logic as auto-save is executed
**And** the status bar shows "Saving..." then "Saved" immediately
**And** a subtle visual feedback confirms the save (brief green flash in status bar)

**Given** no changes have been made since the last save
**When** the author presses Ctrl+S / ⌘+S
**Then** the status bar shows "No changes to save"
**And** no database write occurs (optimization)
**And** a brief toast notification confirms "Already saved"

**Given** the author is working on a chapter
**When** the author switches to a different chapter
**Then** the current chapter is automatically saved before switching
**And** the status bar confirms "Chapter {number} saved"
**And** the new chapter loads with its saved content

### Story 5.8: Implement Undo/Redo in Editor [Tier 1]

As an author,
I want undo and redo functionality in the editor,
So that I can experiment freely and revert changes.

**Acceptance Criteria:**

**Given** the author is writing in the editor
**When** the author makes changes
**Then** each change is recorded in ProseMirror's history plugin
**And** the undo stack maintains up to 100 edit actions per session
**And** the undo/redo state is preserved during auto-save (does not clear history)

**Given** the author has made edits
**When** the author presses Ctrl+Z (or ⌘+Z)
**Then** the most recent edit is undone
**And** the editor content updates immediately
**And** the word count updates accordingly
**And** the redo stack is updated (the undone action can be redone)
**And** the cursor position is restored to before the undone action

**Given** the author has undone one or more actions
**When** the author presses Ctrl+Y (Windows/Linux) or ⌘+Shift+Z (macOS)
**Then** the most recently undone action is redone
**And** the editor content and word count update accordingly
**And** the cursor position is restored

**Given** the author undoes actions and then makes a new edit
**When** the new edit occurs
**Then** the redo stack is cleared (cannot redo past the new edit)
**And** the new edit is added to the undo stack

**Given** the author closes and reopens a chapter
**When** the chapter loads
**Then** the undo/redo stacks are cleared (history does not persist across chapter sessions)
**And** the editor loads the last saved content

### Story 5.9: Implement Crash Recovery [Tier 1]

As an author,
I want the application to recover my unsaved work after a crash,
So that I never lose writing progress due to unexpected failures.

**Acceptance Criteria:**

**Given** the application is running
**When** content changes occur in the editor
**Then** a local crash recovery store is updated every 10 seconds
**And** the recovery store persists: Current chapter ID, ProseMirror document state (JSON), Timestamp of last update, Word count
**And** the recovery store is written to `{app_data}/crash_recovery/{project_id}.json`

**Given** the application crashes or is force-closed
**When** the application is restarted
**Then** the crash recovery system checks for recovery files
**And** if a recovery file exists and is newer than the last database save, the user sees a modal: "Unsaved work detected. Would you like to recover Chapter {number}? Last edited: {timestamp} (X minutes ago)"
**And** options are provided: "Recover" (restores the crash recovery content), "Discard" (deletes the recovery file), "View Changes" (shows diff between saved and recovered content)

**Given** the user clicks "Recover"
**When** the recovery is applied
**Then** the crash recovery content is loaded into the editor
**And** the chapter is marked as modified (unsaved changes indicator)
**And** the user is prompted to save manually
**And** a toast notification confirms: "Work recovered successfully. Press Ctrl+S to save."
**And** the crash recovery file is deleted after successful recovery

**Given** the user clicks "Discard"
**When** the discard action is performed
**Then** the crash recovery file is deleted
**And** the last saved version of the chapter is loaded
**And** no further recovery prompts are shown for this session

**Given** the application closes normally (user quits)
**When** the application shutdown occurs
**Then** all chapters are auto-saved if there are pending changes
**And** crash recovery files are deleted (since everything is saved)
**And** the next launch does not trigger recovery prompts

### Story 5.10: Implement Table of Contents Auto-Generation [Tier 1]

As an author,
I want an automatically generated table of contents,
So that I can navigate my manuscript structure easily.

**Acceptance Criteria:**

**Given** a project has multiple chapters
**When** the table of contents is generated
**Then** the TOC includes all chapters in order with: chapter number, chapter title, word count, completion status (checkmark if meets target)
**And** the TOC is accessible from the main workspace via a "TOC" button in the left sidebar

**Given** the user clicks the "TOC" button
**When** the table of contents modal opens
**Then** the full TOC is displayed in a scrollable list
**And** clicking any chapter in the TOC navigates to that chapter in the editor
**And** the currently open chapter is highlighted in the TOC
**And** a "Close" button or ESC key closes the modal

**Given** the author adds, removes, or reorders chapters
**When** the chapter structure changes
**Then** the TOC automatically updates to reflect the current structure
**And** no manual refresh is required

### Story 5.11: Implement Offline Mode Support [Tier 1]

As an author,
I want to write and edit my manuscript without an internet connection,
So that I can work anywhere without connectivity concerns.

**Acceptance Criteria:**

**Given** the author is working online
**When** the internet connection is lost
**Then** the application detects the offline state
**And** the status bar displays an "Offline" indicator (icon with tooltip)
**And** all writing and editing features continue to work normally
**And** auto-save and manual save continue to function (local database)
**And** AI-related features are disabled with clear messaging

**Given** the application is offline
**When** the user attempts to use AI generation features
**Then** a tooltip or disabled button state explains: "AI features require an internet connection"
**And** the user can still write and edit manually without interruption

**Given** the application is offline
**When** the internet connection is restored
**Then** the application detects the online state
**And** the status bar updates to show "Online"
**And** AI features are automatically re-enabled
**And** a toast notification appears: "You're back online. AI features are now available."

**Given** the author works offline for an extended period
**When** the application is closed and reopened
**Then** all work saved while offline is preserved
**And** the application opens in offline mode if no connection is available
**And** no data is lost due to offline operation

### Story 5.12: Implement Save Status Indicator [Tier 2]

As an author,
I want clear visual feedback about save status,
So that I always know whether my work is saved.

**Acceptance Criteria:**

**Given** the author is viewing the editor
**When** no unsaved changes exist
**Then** the status bar shows "Saved X seconds ago" (relative time, updates every 10 seconds)
**And** the save indicator is styled in neutral/green color

**Given** the author makes edits
**When** content changes occur
**Then** the status bar immediately shows "Unsaved changes"
**And** the indicator changes to amber color
**And** the chapter title in the sidebar shows an unsaved indicator (dot or asterisk)

**Given** auto-save is in progress
**When** the save operation is running
**Then** the status bar shows "Saving..." with a spinner animation
**And** the indicator is styled in blue color

**Given** a save operation completes successfully
**When** the save finishes
**Then** the status bar shows "Saved just now"
**And** the indicator changes to green color
**And** after 10 seconds, the text updates to "Saved X seconds ago"
**And** the unsaved indicator is removed from the chapter title

**Given** a save operation fails
**When** the failure is detected
**Then** the status bar shows "Save failed: {reason}"
**And** the indicator changes to red color
**And** a "Retry" button appears next to the status
**And** the unsaved changes indicator remains visible

### Story 5.13: Implement Chapter Snapshots [Tier 2]

As an author,
I want to create named snapshots of chapters before major revisions,
So that I can safely experiment and revert if needed.

**Acceptance Criteria:**

**Given** the author is editing a chapter
**When** the author right-clicks the chapter in the sidebar (or uses a menu option)
**Then** a "Create Snapshot" option is available
**And** clicking it opens a snapshot creation dialog

**Given** the snapshot creation dialog is open
**When** the author provides a snapshot name
**Then** an input field prompts for a snapshot name (e.g., "Before major revision")
**And** the current chapter content, word count, and timestamp are captured
**And** the snapshot is saved to the chapter_snapshots table
**And** a success toast confirms: "Snapshot '{name}' created"

**Given** snapshots exist for a chapter
**When** the author right-clicks the chapter
**Then** a "View Snapshots" option is available
**And** clicking it opens a snapshots modal

**Given** the snapshots modal is open
**When** the list of snapshots is displayed
**Then** each snapshot shows: snapshot name, creation date/time, word count at time of snapshot, "Restore", "View", and "Delete" buttons
**And** snapshots are sorted by creation date (newest first)

**Given** the author clicks "View" on a snapshot
**When** the snapshot viewer opens
**Then** the snapshot content is displayed in a read-only editor
**And** a side-by-side comparison is available showing the snapshot vs. current version
**And** a "Restore This Version" button is available

**Given** the author clicks "Restore" on a snapshot
**When** the confirmation dialog appears
**Then** the dialog warns: "Restore this snapshot? Your current chapter content will be replaced. Consider creating a snapshot of the current version first."
**And** if confirmed, the snapshot content replaces the current chapter content
**And** the chapter is marked as modified (unsaved)
**And** the author is prompted to save

### Story 5.14: Implement Chapter Comparison (Diff View) [Tier 2]

As an author,
I want to compare two versions of a chapter side-by-side,
So that I can see exactly what changed between versions.

**Acceptance Criteria:**

**Given** the author is viewing snapshots for a chapter
**When** the author selects "Compare" on a snapshot
**Then** a comparison modal opens showing side-by-side panels: Left panel: Snapshot version (read-only), Right panel: Current version (read-only)
**And** differences are highlighted: Deleted text (red background in left panel), Added text (green background in right panel), Modified text (amber background in both panels)

**Given** the comparison view is displayed
**When** differences are highlighted
**Then** the user can scroll through both panels in sync
**And** a navigation bar shows difference counts (e.g., "5 additions, 3 deletions, 2 modifications")
**And** "Previous" and "Next" buttons allow jumping between differences
**And** a "Close" button exits the comparison view

**Given** the author views a comparison
**When** decisions are made about changes
**Then** the author can close the comparison and choose to: Keep current version (no action), Restore snapshot version (replaces current), Manually merge changes (copy/paste between versions)
**And** no automatic merging is performed (user retains full control)

### Story 5.15: Implement Focus Mode [Tier 2]

As an author,
I want a distraction-free focus mode,
So that I can concentrate fully on writing without UI clutter.

**Acceptance Criteria:**

**Given** the author is in the main workspace
**When** the author activates focus mode (button or F11 key)
**Then** the application transitions to fullscreen mode
**And** the left sidebar (chapter list) is hidden
**And** the right sidebar (Story Bible) is hidden
**And** the toolbar is minimized or hidden (appears on hover)
**And** only the editor remains visible with generous padding
**And** the status bar shows only essential info (word count, save status)

**Given** focus mode is active
**When** the author moves the mouse to the top of the screen
**Then** a minimized toolbar appears with: Exit focus mode button, Save button, Word count display, Undo/Redo buttons
**And** the toolbar auto-hides after 3 seconds of inactivity

**Given** focus mode is active
**When** the author presses F11 or ESC
**Then** focus mode exits
**And** the normal three-column layout is restored
**And** the chapter and Story Bible sidebars reappear
**And** the full toolbar is restored

**Given** focus mode is active
**When** the author writes
**Then** the editor provides a distraction-free experience with: Centered text (max-width 800px), Increased line height for readability, Subtle background (genre-themed or neutral), No animations or notifications (except save status)
**And** typing performance remains optimal (60 FPS, <16ms latency)

---

## Epic 6: AI-Powered Story Development & Generation

Authors can use AI to generate supporting characters, settings, themes, dialogue preferences, and full chapters (5,000-8,000 words), with all content assembled using relevant Story Bible context for consistency.

### Story 6.1: Design AI Generation Database Schema [Tier 1]

As a development team,
I want a database schema for tracking AI generation operations and history,
So that we can monitor, debug, and improve generation quality.

**Acceptance Criteria:**

**Given** the SQLite database is configured
**When** the team creates migration `V6__create_ai_generation_schema.sql`
**Then** the migration defines an `ai_generations` table with fields: id (PRIMARY KEY), project_id (INTEGER, FOREIGN KEY), chapter_id (INTEGER, FOREIGN KEY, NULL for non-chapter generations), generation_type (TEXT: 'chapter', 'character', 'setting', 'theme', 'dialogue_prefs'), provider_name (TEXT), model_name (TEXT), prompt_template (TEXT), context_summary (TEXT, brief description of assembled context), input_tokens (INTEGER), output_tokens (INTEGER), generation_time_ms (INTEGER), status (TEXT: 'in_progress', 'completed', 'failed', 'cancelled'), error_message (TEXT), created_at (TIMESTAMP), completed_at (TIMESTAMP)
**And** the schema includes indexes on (project_id, generation_type) and (status, created_at)
**And** a `generation_context_entries` table links which Story Bible entries were used: id (PRIMARY KEY), generation_id (INTEGER, FOREIGN KEY), story_bible_entry_id (INTEGER, FOREIGN KEY), relevance_score (REAL)

**Given** the schema is created
**When** the team tests generation tracking
**Then** generation records can be inserted when AI operations start
**And** records can be updated when operations complete or fail
**And** context entries can be linked to show which Story Bible entries influenced the generation

### Story 6.2: Implement Story Bible Context Assembly [Tier 1]

As a development team,
I want an intelligent context assembly system,
So that AI prompts include the most relevant Story Bible information.

**Acceptance Criteria:**

**Given** a chapter generation is requested
**When** the context assembly process begins
**Then** the system retrieves relevant Story Bible entries using: Semantic search via Qdrant (embeddings of the generation request vs. Story Bible vectors), Category-based inclusion (always include main characters, primary setting, key rules), Recency filtering (prioritize recently added/edited entries), Relationship traversal (include related entries for selected characters/settings)
**And** a relevance score is calculated for each entry (0.0 to 1.0)
**And** entries are ranked by relevance score

**Given** relevant entries are identified
**When** the context is assembled
**Then** the top 20 most relevant entries are selected (or fewer if under context token limit)
**And** entries are organized by category (Characters, Settings, Rules, Themes, Plot Threads)
**And** each entry is formatted as: **[Category] - Title**: Description/Content
**And** the assembled context is a markdown-formatted string

**Given** the context exceeds the AI provider's token limit
**When** pruning is necessary
**Then** lower-relevance entries are removed until the context fits
**And** essential entries (main protagonist, primary setting) are never removed
**And** a warning is logged: "Context pruned: removed {N} entries to fit token limit"
**And** the user is optionally notified if significant pruning occurred

**Given** the Story Bible is empty or has insufficient entries
**When** context assembly runs
**Then** the system assembles a minimal context using: Project genre, story framework, plot premise, target audience/tone
**And** a notification is shown to the user: "Limited Story Bible context. Consider adding characters and settings for better AI generation."

### Story 6.3: Create AI Prompt Templates [Tier 1]

As a development team,
I want structured prompt templates for different generation types,
So that AI outputs are consistent and high-quality.

**Acceptance Criteria:**

**Given** the application needs to generate a chapter
**When** the chapter generation prompt is constructed
**Then** the prompt template includes: System instruction (role: professional novelist, style guidance), Story Bible context (assembled relevant entries), Chapter context (chapter number, position in story framework, previous chapter summary), Generation request (word count target, any user guidance like "add more tension"), Output format instructions (plain text prose, no meta-commentary)
**And** the template is parameterized (uses variables for project-specific values)

**Given** the application needs to generate a character
**When** the character generation prompt is constructed
**Then** the prompt template includes: System instruction (role: character development specialist), Story Bible context (existing characters, settings, plot threads), Character generation request (role in story, relationship to existing characters), Output format (structured: name, description, traits, backstory, relationships)
**And** the user can provide seed information (e.g., "villain who opposes the protagonist")

**Given** the application needs to generate a setting
**When** the setting generation prompt is constructed
**Then** the prompt template includes: System instruction (role: worldbuilding expert), Story Bible context (genre, existing settings, world rules), Setting generation request (type: location/time period/world, purpose in story), Output format (structured: name, description, key features, atmosphere)
**And** the template ensures genre consistency (fantasy setting for fantasy novel, etc.)

**Given** a prompt template is used for generation
**When** the template is populated with actual data
**Then** all variables are replaced with project-specific values
**And** the final prompt is validated for token count
**And** if the prompt exceeds token limits, context pruning is applied
**And** the final prompt is logged (without API keys or sensitive data) for debugging

### Story 6.4: Implement Chapter Generation with Streaming [Tier 1]

As an author,
I want to generate full chapters using AI with real-time streaming,
So that I can see progress and cancel if the output is not what I want.

**Acceptance Criteria:**

**Given** the author has a chapter open in the editor
**When** the author clicks "Generate Chapter" (button or Ctrl+G / ⌘+G)
**Then** a generation configuration modal opens with options: Word count target (default: project target, adjustable 500-15000), User guidance (optional text input: "Make it darker", "Focus on character development"), Story Bible context preview (shows which entries will be included), "Generate" and "Cancel" buttons
**And** if no AI provider is configured, the user is prompted to set one up

**Given** the user clicks "Generate"
**When** the generation process starts
**Then** the modal closes and a generation progress panel opens in the editor area
**And** the editor content is hidden (or replaced) by the progress panel
**And** the progress panel shows: Progress bar (0-100%, updated as generation proceeds), Estimated time remaining (calculated from streaming rate), Real-time word count (updates as text streams in), Preview of generated text (last 200 characters, scrolling), "Cancel Generation" button

**Given** the AI provider streams the generated text
**When** text chunks are received
**Then** the progress bar updates based on estimated completion (word count / target)
**And** the preview area updates with the latest text
**And** the word count indicator updates in real-time
**And** the UI remains responsive (streaming on background thread)
**And** if the generation stalls (no data for 30 seconds), a "Connection timeout" warning is shown

**Given** the generation completes successfully
**When** the AI finishes
**Then** the progress panel is replaced by a "Generation Complete" preview panel
**And** the preview panel shows: Full generated text (scrollable, read-only), Final word count, "Accept", "Regenerate", and "Cancel" buttons
**And** the text is NOT automatically inserted into the editor (requires user approval)

**Given** the user clicks "Accept"
**When** the generated text is approved
**Then** the text is inserted into the editor (replacing any existing content with a warning first)
**And** the chapter is marked as is_generated = 1 in the database
**And** generation metadata (provider, model, tokens used) is saved
**And** the editor returns to normal edit mode
**And** a success toast appears: "Chapter generated successfully. You can now edit it."

**Given** the user clicks "Regenerate"
**When** the regeneration is requested
**Then** the preview panel closes and the generation process starts again
**And** the previous generated text is discarded
**And** the user can optionally provide different guidance

**Given** the user clicks "Cancel Generation" during streaming
**When** the cancellation is triggered
**Then** the AI API request is cancelled (if supported) or ignored
**And** partial generated text is preserved
**And** the user sees a confirmation: "Generation cancelled. Keep partial text?"
**And** if confirmed, the partial text is offered for acceptance
**And** if declined, the editor returns to the previous state

### Story 6.5: Implement Generate Characters, Settings, Themes [Tier 1]

As an author,
I want to use AI to generate supporting story elements,
So that I can quickly flesh out my story world.

**Acceptance Criteria:**

**Given** the author is viewing the Story Bible panel
**When** the author clicks "+" and selects "Generate Character with AI"
**Then** a generation dialog opens with: Character role dropdown (Protagonist, Antagonist, Supporting, Minor), Relationship to existing characters (multi-select), Brief description or seed idea (text input, optional), "Generate" and "Cancel" buttons
**And** a preview of the Story Bible context that will be used is shown

**Given** the user clicks "Generate" for a character
**When** the AI generation runs
**Then** the AI generates structured character data: Name, Physical description, Personality traits, Backstory, Relationships (to existing characters), Role in story
**And** a progress spinner is displayed during generation
**And** the generation completes in <30 seconds

**Given** the character generation completes
**When** the result is displayed
**Then** the user sees a preview of the generated character
**And** "Accept", "Regenerate", and "Edit Before Saving" buttons are available
**And** clicking "Accept" creates a new Story Bible entry with the generated data
**And** clicking "Edit Before Saving" opens the create entry modal pre-filled with the generated data
**And** the user can review and modify before saving

**Given** the author is viewing the Story Bible panel
**When** the author clicks "Generate Setting with AI"
**Then** a similar generation dialog opens with: Setting type (Location, Time Period, World), Purpose in story (text input), Existing setting relationships (optional), "Generate" and "Cancel" buttons
**And** the AI generates structured setting data (name, description, key features, atmosphere)
**And** the same preview/accept/edit workflow applies

**Given** the author is viewing the Story Bible panel
**When** the author clicks "Generate Themes with AI"
**Then** a generation dialog prompts for: Theme category (dropdown: Central Theme, Subtheme, Moral Question), Brief description (optional), "Generate" and "Cancel" buttons
**And** the AI generates theme suggestions: Theme statement, How it relates to the plot, Potential character arcs that explore this theme, Symbolic elements to reinforce the theme
**And** the user can accept, edit, or regenerate the theme

**Given** the user generates multiple story elements
**When** all generations are complete
**Then** each generated entry is linked appropriately in the Story Bible (characters to plot threads, settings to characters, etc.)
**And** embedding vectors are created for semantic search
**And** the Story Bible panel updates to show the new entries

### Story 6.6: Implement Style Profile Detection [Tier 2]

As an author,
I want StoryTeller to detect my writing style from existing chapters,
So that AI-generated content matches my voice.

**Acceptance Criteria:**

**Given** the author has written at least 5,000 words across multiple chapters
**When** the style profile detection is triggered (automatically or manually)
**Then** the system analyzes the author's written chapters using NLP techniques: Sentence length distribution (average, variance), Vocabulary richness (unique words / total words ratio), Common phrases and patterns, Dialogue tags frequency, Paragraph length distribution, Use of literary devices (metaphors, similes)
**And** a style profile is generated and stored in the project metadata

**Given** a style profile exists
**When** AI generation is requested
**Then** the generation prompt includes style guidance extracted from the profile: Average sentence length preference, Vocabulary complexity level, Typical paragraph structure, Dialogue style notes
**And** the AI is instructed to match these stylistic patterns

**Given** the author continues writing
**When** the style profile becomes outdated (e.g., after 20,000 new words)
**Then** the system offers to update the style profile
**And** a notification appears: "Update style profile with recent writing?"
**And** clicking "Update" re-analyzes recent chapters and updates the profile
**And** the updated profile is used for subsequent generations

**Given** the style profile is displayed
**When** the author reviews the detected style
**Then** a "Style Profile" section in Settings shows: Detected sentence length (e.g., "Average: 15 words, prefers variety"), Vocabulary level (e.g., "Moderate complexity"), Dialogue style (e.g., "Uses said/asked primarily, minimal adverbs"), Paragraph structure (e.g., "Short paragraphs, 3-4 sentences average")
**And** the author can manually adjust or override these settings

### Story 6.7: Implement Style Matching in AI Generation [Tier 2]

As an author,
I want AI-generated content to match my existing writing style,
So that the novel feels cohesive and authentic.

**Acceptance Criteria:**

**Given** a style profile has been detected
**When** a chapter is generated
**Then** the generation prompt includes specific style instructions: "Match the author's style: average sentence length {X} words, vocabulary level {Y}, paragraph length {Z} sentences.", "Use similar narrative techniques observed in the author's writing.", "Maintain consistency with the author's dialogue style."
**And** the AI provider processes these style instructions

**Given** a chapter is generated with style matching
**When** the generation completes
**Then** the generated text is analyzed for style adherence
**And** a style match score is calculated (0-100%)
**And** the score is displayed to the user: "Style match: 85% - Close match to your writing"
**And** if the score is low (<70%), a warning is shown: "This chapter may not match your usual style. Consider editing or regenerating."

**Given** the user reviews a generated chapter
**When** style mismatches are identified
**Then** the user can provide feedback: "This doesn't sound like me. Regenerate with stronger style matching."
**And** the feedback is logged for future improvement
**And** regeneration with increased style weight is offered

### Story 6.8: Implement Generation Preview Before Insertion [Tier 1]

As an author,
I want to preview all AI-generated content before it's inserted,
So that I maintain full control over my manuscript.

**Acceptance Criteria:**

**Given** any AI generation completes (chapter, character, setting, etc.)
**When** the result is ready
**Then** the content is displayed in a preview mode (read-only)
**And** the content is NOT automatically inserted or saved
**And** the user must explicitly approve before it affects the manuscript

**Given** a chapter generation preview is displayed
**When** the user reviews the content
**Then** the full generated text is shown in a scrollable panel
**And** the word count is displayed
**And** a warning is shown if existing content will be replaced: "This will replace your current chapter content. Consider creating a snapshot first."
**And** "Accept", "Regenerate", "Edit Before Accepting", and "Cancel" buttons are available

**Given** the user clicks "Edit Before Accepting"
**When** the edit mode is activated
**Then** the generated text is loaded into a temporary editor (not the main editor)
**And** the user can modify the text freely
**And** after edits, clicking "Accept" inserts the edited version
**And** the chapter is marked as "AI-generated then user-edited" (different from fully AI-generated)

**Given** a Story Bible entry generation preview is displayed
**When** the user reviews the content
**Then** the structured data (name, description, relationships) is shown
**And** the user can edit any fields before saving
**And** clicking "Accept" creates the Story Bible entry with the (optionally edited) data

**Given** the user clicks "Cancel" on any generation preview
**When** the cancellation occurs
**Then** the generated content is discarded completely
**And** no database changes are made
**And** the user returns to the previous state

### Story 6.9: Implement Show Context Used in Generation [Tier 2]

As an author,
I want to see which Story Bible entries were used for AI generation,
So that I can understand and verify the consistency logic.

**Acceptance Criteria:**

**Given** a chapter generation preview is displayed
**When** the user reviews the generated content
**Then** an "Info" tab is available in the preview panel
**And** clicking "Info" shows: AI provider and model used, Generation time and token counts, List of Story Bible entries included in the context (with relevance scores), Seed guidance provided by the user (if any)
**And** each Story Bible entry is clickable to view its details

**Given** the context info is displayed
**When** the user reviews the included entries
**Then** entries are grouped by category (Characters, Settings, Rules, etc.)
**And** each entry shows its relevance score (0-100%)
**And** entries are sorted by relevance score (highest first)
**And** a note explains: "These entries were selected based on semantic relevance to this chapter."

**Given** the user is viewing the context info
**When** the user identifies missing or irrelevant entries
**Then** the user can provide feedback: "This entry should have been included" or "This entry was not relevant"
**And** the feedback is logged for future context assembly improvement
**And** the user can manually regenerate with different context (advanced option)

### Story 6.10: Implement Context Pruning for Token Limits [Tier 1]

As a development team,
I want automatic context pruning when approaching token limits,
So that generation works reliably across different AI providers with different limits.

**Acceptance Criteria:**

**Given** the context assembly process has assembled relevant Story Bible entries
**When** the total token count (context + prompt template) is calculated
**Then** the system checks against the provider's context window limit (e.g., 8K, 128K, 200K tokens)
**And** if the total exceeds 80% of the limit, pruning is triggered

**Given** pruning is triggered
**When** the pruning algorithm runs
**Then** entries are prioritized for retention: Essential entries (main protagonist, primary setting, key rules): NEVER pruned, High-relevance entries (score > 0.7): pruned last, Medium-relevance entries (score 0.4-0.7): pruned if necessary, Low-relevance entries (score < 0.4): pruned first
**And** entries are removed in order of increasing relevance until under 75% of token limit
**And** the number of pruned entries is logged

**Given** pruning occurs
**When** the generation proceeds
**Then** the user is notified (if significant pruning occurred): "Context pruned: {N} entries removed to fit token limit. Generation will proceed with {M} entries."
**And** the user can optionally view which entries were pruned
**And** the generation continues with the pruned context

**Given** pruning removes critical information
**When** the user is notified
**Then** the warning is more prominent: "Warning: Significant context pruning occurred. Consider simplifying your Story Bible or using a provider with larger context window."
**And** options are provided: "Proceed Anyway", "Switch Provider", "Simplify Context"

### Story 6.11: Implement Warn Before Overwriting User Edits [Tier 1]

As an author,
I want clear warnings before AI generation overwrites my manually edited content,
So that I never accidentally lose my work.

**Acceptance Criteria:**

**Given** a chapter has existing content that was user-written or user-edited
**When** the author clicks "Generate Chapter"
**Then** a warning modal is displayed before generation starts: "This chapter has existing content. Generating a new chapter will replace it. Consider creating a snapshot first."
**And** options are provided: "Create Snapshot & Generate" (recommended), "Generate Anyway" (dangerous), "Cancel"
**And** the default/recommended action is pre-selected

**Given** the user selects "Create Snapshot & Generate"
**When** the action is performed
**Then** a snapshot is automatically created with the name "Before AI Generation - {timestamp}"
**And** the generation process proceeds
**And** a confirmation toast shows: "Snapshot created. Generating chapter..."

**Given** the user selects "Generate Anyway"
**When** the action is confirmed
**Then** a second confirmation is required: "Are you absolutely sure? Your current content will be lost if you don't accept the generated version."
**And** if confirmed, the generation proceeds without creating a snapshot
**And** the risk is on the user (power user feature)

**Given** a generated chapter has been accepted and then user-edited
**When** the author attempts to regenerate
**Then** the same overwrite warning is shown
**And** the warning emphasizes: "You've made {N} edits to this AI-generated chapter. Regenerating will lose your edits."
**And** creating a snapshot is strongly encouraged

### Story 6.12: Implement Regeneration with User Guidance [Tier 1]

As an author,
I want to provide guidance when regenerating content,
So that I can steer the AI toward my desired outcome.

**Acceptance Criteria:**

**Given** a chapter generation preview is displayed (or a generated chapter is in the editor)
**When** the user clicks "Regenerate"
**Then** a regeneration dialog opens with: Previous user guidance (if any) pre-filled, New guidance text input (e.g., "Make it darker", "Add more tension", "Focus on character development"), "Regenerate" and "Cancel" buttons
**And** the dialog explains: "Your guidance will be added to the generation prompt to refine the output."

**Given** the user provides guidance like "Make it darker"
**When** the regeneration runs
**Then** the prompt template is modified to include: "Previous attempt did not meet expectations. User requests: {guidance}. Adjust tone, themes, and events accordingly."
**And** the generation proceeds with the updated prompt
**And** the guidance is logged for analysis

**Given** multiple regenerations occur for the same chapter
**When** the user provides different guidance each time
**Then** each guidance instance is logged (generation history)
**And** the system learns from the pattern (future improvement: suggest common guidance options)
**And** the user can view previous guidance attempts: "Attempt 1: Make it darker. Attempt 2: Add more character conflict."

**Given** the user provides guidance
**When** the new generation completes
**Then** the preview shows: "Generated with guidance: {guidance}"
**And** the user can compare this attempt with previous attempts (if desired)
**And** the user can continue regenerating with new guidance until satisfied

### Story 6.13: Track User Feedback on Generated Content [Tier 2]

As a development team,
I want to collect user feedback on AI-generated content quality,
So that we can measure and improve generation accuracy over time.

**Acceptance Criteria:**

**Given** a generated chapter is previewed or accepted
**When** the user reviews the content
**Then** a feedback option is available: "Rate this generation" (thumbs up/down) or 1-5 stars
**And** an optional comment field allows detailed feedback
**And** a "Submit Feedback" button sends the feedback

**Given** the user submits feedback
**When** the feedback is processed
**Then** the feedback is stored in the database: generation_id, rating (1-5), comment, timestamp
**And** the feedback is linked to the specific generation record
**And** a thank you message is displayed: "Thank you for your feedback! This helps us improve AI generation quality."

**Given** feedback is collected over time
**When** the development team reviews feedback
**Then** aggregated metrics are available: Average rating per provider/model, Common complaints or issues, Positive feedback patterns, Correlation between context size and quality ratings
**And** this data informs future improvements

---

## Epic 7: Story Bible Intelligence - Validation & Contradiction Detection

Authors receive real-time validation that AI-generated content is consistent with their Story Bible, with contradiction detection before, during, and after generation, plus guided setup and templates.

### Story 7.1: Design Validation Database Schema [Tier 1]

As a development team,
I want a database schema for storing validation results and contradiction reports,
So that we can track validation history and provide detailed reports to users.

**Acceptance Criteria:**

**Given** the SQLite database is configured
**When** the team creates migration `V7__create_validation_schema.sql`
**Then** the migration defines a `validation_runs` table with fields: id (PRIMARY KEY), project_id (INTEGER, FOREIGN KEY), generation_id (INTEGER, FOREIGN KEY, nullable), validation_type (TEXT: 'pre_generation', 'realtime', 'post_generation'), status (TEXT: 'passed', 'warnings', 'failed'), issues_found (INTEGER), critical_issues (INTEGER), created_at (TIMESTAMP), completed_at (TIMESTAMP)
**And** a `validation_issues` table is defined: id (PRIMARY KEY), validation_run_id (INTEGER, FOREIGN KEY), issue_type (TEXT: 'character_inconsistency', 'plot_contradiction', 'world_rule_violation', 'timeline_error'), severity (TEXT: 'critical', 'warning', 'suggestion'), description (TEXT), story_bible_entry_id (INTEGER, FOREIGN KEY, the conflicting entry), generated_text_excerpt (TEXT), suggested_fix (TEXT), is_resolved (BOOLEAN DEFAULT 0), user_action (TEXT: 'accepted', 'dismissed', 'manual_fix')

**Given** the schema is created
**When** validation runs occur
**Then** each validation creates a validation_runs record
**And** detected issues are recorded as validation_issues records
**And** issues are linked to the relevant Story Bible entries

### Story 7.2: Implement Pre-Generation Validation [Tier 1]

As an author,
I want validation to run before AI generation starts,
So that I'm warned about potential issues with my Story Bible setup.

**Acceptance Criteria:**

**Given** the author initiates chapter generation
**When** pre-generation validation runs
**Then** the system checks for: Empty or insufficient Story Bible (warning if < 5 entries), Missing essential entries (no protagonist, no primary setting), Conflicting entries (e.g., two characters with the same name), Incomplete plot threads (active threads with no recent mentions)
**And** validation completes in <5 seconds

**Given** pre-generation validation finds warnings
**When** the results are presented
**Then** a validation report modal is displayed before generation proceeds: "Validation Warnings Found", List of issues with severity indicators, Suggested actions for each issue, "Proceed Anyway", "Fix Issues First", "View Story Bible" buttons
**And** if only minor warnings exist, the user can proceed

**Given** pre-generation validation finds critical issues
**When** the results are presented
**Then** generation is blocked until issues are resolved
**And** the report explains: "Critical issues must be resolved before generation. These issues could result in inconsistent or contradictory content."
**And** the user must click "Fix Issues First" (generation cannot proceed)

**Given** the user clicks "View Story Bible" from the validation report
**When** navigation occurs
**Then** the Story Bible panel is opened and filtered to show only entries related to the issues
**And** the validation report remains accessible (pinned or minimized)
**And** after fixes, the user can re-run validation

### Story 7.3: Implement Post-Generation Validation [Tier 1]

As an author,
I want validation to run after AI generation completes,
So that I'm alerted to any inconsistencies before accepting the content.

**Acceptance Criteria:**

**Given** AI generation completes for a chapter
**When** post-generation validation runs
**Then** the system analyzes the generated text for: Character consistency (names, traits, relationships), Plot continuity (does this align with established plot threads?), World-building adherence (are world rules respected?), Timeline accuracy (does timing make sense?), Emotional arc progression (appropriate emotional beats for story position)
**And** validation completes within 15 seconds (15% overhead per NFR)

**Given** post-generation validation detects issues
**When** the issues are identified
**Then** each issue is categorized by type and severity
**And** the generated text excerpt containing the issue is identified
**And** the conflicting Story Bible entry is referenced
**And** a suggested fix is generated (if possible)

**Given** validation results are ready
**When** the generation preview is displayed
**Then** a "Validation" tab is available in the preview panel
**And** clicking "Validation" shows a detailed report: Summary (e.g., "3 warnings found, 1 critical issue"), List of issues grouped by severity, Each issue shows: Description (e.g., "Marcus's eye color changed from blue to brown"), Excerpt from generated text (highlighted), Conflicting Story Bible entry (clickable link), Suggested fix (e.g., "Change 'brown eyes' to 'blue eyes'")
**And** "Accept Despite Issues", "Regenerate", "Edit Before Accepting" buttons are available

**Given** a critical issue is found
**When** the user attempts to click "Accept"
**Then** a warning is displayed: "Critical validation issue detected. Are you sure you want to accept this content? It contradicts your Story Bible."
**And** the user can still accept (with full awareness of the issue)
**And** the issue is flagged for review

**Given** the user clicks "Edit Before Accepting"
**When** the edit mode opens
**Then** validation issues are highlighted in the text (e.g., red underline for critical, amber for warnings)
**And** hovering over a highlight shows the issue description and suggested fix
**And** the user can manually correct issues before accepting

### Story 7.4: Implement Contradiction Report Generation [Tier 1]

As an author,
I want detailed contradiction reports with references,
So that I can understand and resolve validation issues effectively.

**Acceptance Criteria:**

**Given** validation has detected issues
**When** the contradiction report is generated
**Then** the report includes for each issue: Issue ID (unique identifier), Severity level (critical, warning, suggestion), Issue type (character inconsistency, plot contradiction, world rule violation, timeline error), Description (clear explanation of the problem), Generated text excerpt (with issue highlighted), Story Bible source (the entry that was contradicted), Chapter and line number (where the issue occurs), Suggested resolution (actionable fix)
**And** the report is formatted as structured data (JSON) for programmatic access
**And** a human-readable version is displayed in the UI

**Given** the report is displayed in the UI
**When** the user views the report
**Then** issues are grouped by severity (critical first, then warnings, then suggestions)
**And** each issue is expandable to show full details
**And** clicking the Story Bible source link opens that entry in the Story Bible panel
**And** clicking the chapter reference opens that chapter in the editor (if saved)

**Given** the user reviews an issue
**When** resolution actions are available
**Then** the user can: Mark as "Not an Issue" (false positive feedback), Accept the generated text (override Story Bible), Update the Story Bible (change the conflicting entry), Manually edit the generated text
**And** the user's action is recorded in the validation_issues.user_action field

**Given** multiple validation runs occur over time
**When** the user views validation history
**Then** a "Validation History" section in Settings shows: List of recent validation runs (date, type, issues found), Aggregate statistics (total issues, resolution rate, false positive rate), Ability to view detailed reports for past runs
**And** this data helps track validation system performance

### Story 7.5: Implement Prevent Story Bible Editing During Generation [Tier 1]

As a development team,
I want to block Story Bible edits while AI generation is in progress,
So that we avoid race conditions and inconsistent context.

**Acceptance Criteria:**

**Given** an AI generation is in progress
**When** the author attempts to edit, create, or delete a Story Bible entry
**Then** the action is blocked
**And** a tooltip or modal explains: "Story Bible editing is disabled during AI generation to prevent inconsistencies. Estimated completion: {X} seconds."
**And** the UI visually indicates that Story Bible is locked (e.g., dimmed, lock icon)

**Given** Story Bible is locked during generation
**When** the author hovers over the Story Bible panel
**Then** a status message is displayed: "🔒 Locked during generation"
**And** the estimated time remaining is shown (if available)

**Given** the generation completes, is cancelled, or fails
**When** the final status is reached
**Then** the Story Bible is automatically unlocked
**And** a toast notification confirms: "Story Bible unlocked. You can now make edits."
**And** any pending edits the user attempted are not lost (buffered if possible, or user is notified to retry)

**Given** the generation is taking longer than expected (>5 minutes)
**When** the user is waiting
**Then** an option is provided: "Cancel Generation and Unlock Story Bible"
**And** clicking this cancels the generation and immediately unlocks the Story Bible
**And** partial generated content is preserved (if any)

### Story 7.6: Implement Validation Intensity Configuration [Tier 2]

As an author,
I want to configure validation intensity,
So that I can balance thoroughness with performance based on my needs.

**Acceptance Criteria:**

**Given** the user is in Settings → Validation
**When** the validation configuration is displayed
**Then** a "Validation Intensity" setting is available with options: Fast Mode (pre-generation and post-generation only, realtime disabled), Comprehensive Mode (all three validation layers enabled: pre, realtime, post), Custom Mode (user selects which layers to enable)
**And** the default is "Comprehensive Mode"
**And** performance implications are explained for each mode

**Given** the user selects "Fast Mode"
**When** the setting is saved
**Then** realtime validation during generation is disabled
**And** only pre-generation and post-generation validation run
**And** generation time is faster (no realtime overhead)
**And** a note explains: "Fast Mode reduces generation time but may miss issues that arise during generation."

**Given** the user selects "Comprehensive Mode"
**When** the setting is saved
**Then** all three validation layers are enabled
**And** validation runs before, during, and after generation
**And** maximum consistency checking is performed
**And** generation time includes the 15% realtime validation overhead

**Given** the user selects "Custom Mode"
**When** the configuration panel is displayed
**Then** checkboxes allow enabling/disabling: Pre-generation validation, Realtime validation, Post-generation validation
**And** the user can choose any combination
**And** estimated performance impact is shown for the selected configuration
**And** the configuration is saved per project

### Story 7.7: Implement Guided Story Bible Setup Tutorial [Tier 2]

As a first-time author,
I want a guided tutorial for setting up my Story Bible,
So that I understand how to create effective entries for consistency checking.

**Acceptance Criteria:**

**Given** a new project is created with an empty Story Bible
**When** the main workspace opens
**Then** a tutorial overlay is displayed highlighting the Story Bible panel
**And** the tutorial explains: "The Story Bible is your story's knowledge base. Add characters, settings, and rules here so StoryTeller can keep your novel consistent."
**And** options are provided: "Start Guided Setup" (recommended), "Add Entries Manually", "Skip Tutorial"

**Given** the user clicks "Start Guided Setup"
**When** the guided setup begins
**Then** the setup walks through creating essential entries step-by-step: Step 1: "Let's add your protagonist" → prompts for name, role, key traits, Step 2: "Add your primary setting" → prompts for location/world details, Step 3: "Add a key world rule" → prompts for a rule your story follows (e.g., "Magic requires sacrifice"), Step 4: "Add your main plot thread" → prompts for central conflict/goal
**And** each step includes examples and tips

**Given** the user completes the guided setup
**When** the setup finishes
**Then** the Story Bible has 4 essential entries (protagonist, setting, rule, plot thread)
**And** a success message is displayed: "Great! Your Story Bible is ready. Add more entries as your story develops."
**And** the tutorial overlay closes
**And** a preference is saved to not show the tutorial again
**And** the user can now use AI generation with a functional Story Bible

**Given** the user clicks "Skip Tutorial"
**When** the tutorial is skipped
**Then** the Story Bible remains empty
**And** the user can add entries manually
**And** a "Help" button in the Story Bible panel re-opens the tutorial if needed later

### Story 7.8: Implement Genre-Specific Story Bible Templates [Tier 2]

As an author,
I want pre-configured Story Bible templates for my genre,
So that I can quickly set up my Story Bible with relevant categories and examples.

**Acceptance Criteria:**

**Given** a new project is created with a specific genre (e.g., Fantasy)
**When** the Story Bible setup begins
**Then** the user is offered a genre template: "Use Fantasy Story Bible template? This includes common entries like magic systems, world rules, and character archetypes."
**And** options are provided: "Use Template", "Start from Scratch"

**Given** the user selects "Use Template"
**When** the template is applied
**Then** the Story Bible is pre-populated with template entries: For Fantasy: Magic system rules, World geography/cultures, Character archetypes (Hero, Mentor, Villain), Key locations (e.g., "Kingdom Capital", "Forbidden Forest"), For Thriller: Character motivations/secrets, Timeline (critical for thrillers), Red herrings and plot twists, Setting details (crime scenes, etc.), For Romance: Relationship dynamics, Character emotional arcs, Key romantic moments (meet-cute, first kiss, etc.), Secondary characters (friends, rivals)
**And** all template entries are placeholders that the user can edit or delete
**And** the entries are marked as "template" (user can clear all template entries if desired)

**Given** a template is applied
**When** the user reviews the entries
**Then** each entry has helpful placeholder text: "Example: Magic requires a personal sacrifice. Define your magic system's cost here."
**And** clicking "Edit" allows the user to replace the placeholder with their actual story details

**Given** the user modifies template entries
**When** edits are saved
**Then** the "template" marker is removed (entries become normal Story Bible entries)
**And** the entries are fully integrated into validation and context assembly

### Story 7.9: Implement Contradiction Detection Statistics Tracking [Tier 2]

As a development team,
I want to track contradiction detection statistics,
So that we can measure validation accuracy and identify improvement areas.

**Acceptance Criteria:**

**Given** validation runs occur over time
**When** issues are detected and resolved
**Then** the following statistics are tracked: Total validations run, Total issues detected, Issues by type (character inconsistency, plot contradiction, etc.), Issues by severity (critical, warning, suggestion), User actions (accepted, dismissed, manually fixed), False positives (user marked as "Not an Issue"), False negatives (user manually found contradictions validation missed)
**And** statistics are stored in aggregated form (not individual issue details)

**Given** statistics are collected
**When** the development team reviews metrics
**Then** a validation performance dashboard is available showing: Validation accuracy rate (1 - false positive rate), Issue detection rate (issues found / total validations), User satisfaction (inferred from acceptance rate), Improvement trends over time (as validation improves)
**And** this data informs algorithm tuning and training

**Given** the user is interested in validation performance
**When** the user views validation settings
**Then** an optional "Share Validation Statistics" toggle is available
**And** the toggle explains: "Help us improve validation by sharing anonymous statistics about validation accuracy. No manuscript content is shared."
**And** if enabled, aggregate statistics are sent to the development team (opt-in only)

### Story 7.10: Implement Real-Time Validation (During Generation) [Tier 2]

As an author,
I want validation to run during AI generation in real-time,
So that generation can be corrected or stopped early if major issues are detected.

**Acceptance Criteria:**

**Given** comprehensive validation mode is enabled
**When** AI generation is streaming
**Then** realtime validation runs on each text chunk as it arrives
**And** the validation checks for obvious contradictions (e.g., character name changes mid-generation)
**And** realtime validation adds maximum 15% overhead to generation time (per NFR)

**Given** realtime validation detects a critical issue during generation
**When** the issue is identified mid-stream
**Then** the generation is paused
**And** a modal is displayed: "Critical issue detected during generation: {description}. Options: Continue Anyway, Stop Generation, Regenerate with Correction"
**And** the issue details are shown (what was detected, what it contradicts)

**Given** the user selects "Continue Anyway"
**When** the decision is made
**Then** generation resumes from where it paused
**And** the issue is logged for post-generation validation
**And** the user can review and fix the issue after generation completes

**Given** the user selects "Stop Generation"
**When** the decision is made
**Then** the generation is cancelled immediately
**And** partial generated text is preserved
**And** the user can review what was generated before the issue occurred
**And** the user can attempt regeneration with different guidance

**Given** the user selects "Regenerate with Correction"
**When** the decision is made
**Then** the generation is restarted from the beginning
**And** the validation issue is added to the generation context as a constraint: "Avoid: {issue description}"
**And** the regenerated content is validated again
**And** if the issue persists, the user is notified that the AI may not be following the constraint

**Given** realtime validation completes a full generation without issues
**When** the generation finishes
**Then** a validation success indicator is shown: "✓ No issues detected during generation"
**And** post-generation validation still runs (double-check)
**And** the user can proceed with confidence

---

## Epic 8: Professional Export Pipeline

Authors can export publication-ready novels in PDF (Amazon KDP/IngramSpark compliant), EPUB (EPUB3 standard), and DOCX (Word-compatible) formats with custom formatting, meeting professional publishing standards.

### Story 8.1: Design Export Metadata Schema [Tier 1]

As a development team,
I want a database schema for export configurations and history,
So that users can save export presets and track export operations.

**Acceptance Criteria:**

**Given** the SQLite database is configured
**When** the team creates migration `V8__create_export_schema.sql`
**Then** the migration defines an `export_presets` table with fields: id (PRIMARY KEY), project_id (INTEGER, FOREIGN KEY), preset_name (TEXT), format (TEXT: 'pdf', 'epub', 'docx'), settings_json (TEXT, JSON format with format-specific settings), created_at (TIMESTAMP)
**And** an `export_history` table is defined: id (PRIMARY KEY), project_id (INTEGER, FOREIGN KEY), export_preset_id (INTEGER, FOREIGN KEY, nullable), format (TEXT), file_path (TEXT), file_size_bytes (INTEGER), export_time_ms (INTEGER), status (TEXT: 'completed', 'failed'), error_message (TEXT), created_at (TIMESTAMP)
**And** the schema allows saving and reusing export configurations

### Story 8.2: Implement Puppeteer Sidecar for PDF Export [Tier 1]

As a development team,
I want Puppeteer configured as a sidecar process for PDF generation,
So that we can create Vellum-quality PDF exports with professional typography.

**Acceptance Criteria:**

**Given** the Tauri application is built
**When** the application is packaged
**Then** Puppeteer is bundled as a sidecar binary (Node.js + Puppeteer, ~120MB)
**And** the sidecar is configured in `tauri.conf.json` under `bundle.externalBin`
**And** the sidecar path is platform-specific (Windows: .exe, macOS: universal binary, Linux: elf)

**Given** the application needs to generate a PDF
**When** the PDF export is triggered
**Then** the Rust backend spawns the Puppeteer sidecar process
**And** the chapter content is formatted as HTML with CSS styles (professional book typography)
**And** the HTML is passed to Puppeteer via stdin or temp file
**And** Puppeteer renders the HTML to PDF using Chromium's print-to-PDF feature
**And** the PDF is saved to the specified output path
**And** the sidecar process is terminated after generation

**Given** the Puppeteer sidecar is running
**When** PDF generation occurs
**Then** the PDF output includes: Custom page size (6x9 inches for trade paperback, or user-configured), Proper margins (1 inch outer, 0.75 inch inner for binding, configurable), Professional typography (Georgia or user-selected serif font, proper leading/kerning), Page numbers (centered or outer corner, configurable), Chapter headings (styled with appropriate spacing), Title page with author information

**Given** the Puppeteer sidecar fails to start
**When** the error is detected
**Then** a clear error message is displayed: "PDF export failed: Puppeteer sidecar could not start. Please check your installation."
**And** diagnostic logs capture the sidecar stderr output
**And** the user is advised to reinstall the application if the issue persists

### Story 8.3: Implement PDF Export with Custom Settings [Tier 1]

As an author,
I want to export my novel as a PDF with custom formatting,
So that I can submit to Amazon KDP or IngramSpark with professional quality.

**Acceptance Criteria:**

**Given** the author opens the export dialog
**When** "Export as PDF" is selected
**Then** a PDF export configuration panel is displayed with settings: Page Size (dropdown: 6x9 Trade Paperback, 5x8 Digest, 5.5x8.5 US Trade, 8.5x11 Letter, Custom), Margins (sliders: Top, Bottom, Inner, Outer, in inches), Font (dropdown: Georgia, Garamond, Baskerville, Custom), Font Size (number input: 10-14pt), Line Spacing (dropdown: Single, 1.15, 1.5, Double), Include Title Page (checkbox), Include Table of Contents (checkbox), Page Numbering (dropdown: None, Centered, Outer Corner), Chapter Start (dropdown: New Page, Continuous)
**And** a live preview shows how the formatted pages will look
**And** "Export" and "Cancel" buttons are available

**Given** the author configures settings and clicks "Export"
**When** the export process begins
**Then** a file save dialog opens for the user to choose the output location
**And** the default filename is "{Project Title} - {Author Name}.pdf"
**And** after the user selects a location, the export starts
**And** a progress modal displays: "Exporting to PDF...", Progress bar (based on chapter completion), Estimated time remaining, "Cancel" button (cancels the export)

**Given** the PDF export is in progress
**When** chapters are processed
**Then** each chapter is converted to HTML with the configured styles
**And** the HTML is rendered to PDF pages via Puppeteer
**And** the progress bar updates as chapters complete
**And** the export completes within 60 seconds for manuscripts up to 150,000 words (per NFR)

**Given** the PDF export completes successfully
**When** the file is ready
**Then** a success notification is displayed: "PDF exported successfully! {file_size} MB"
**And** a "Open PDF" button is available to view the file
**And** an "Open Folder" button opens the file explorer to the export location
**And** the export is logged in export_history

**Given** the PDF export fails
**When** an error occurs (sidecar failure, disk space, etc.)
**Then** a clear error message is displayed with the specific issue
**And** the user is offered options: "Retry Export", "Change Settings", "View Logs"
**And** partial files are cleaned up (no incomplete PDFs left behind)

### Story 8.4: Implement KDP and IngramSpark Validation [Tier 1]

As an author,
I want my PDF exports validated against Amazon KDP and IngramSpark specifications,
So that I know my file will be accepted by these platforms.

**Acceptance Criteria:**

**Given** a PDF export completes
**When** validation is enabled (default for PDF exports)
**Then** the PDF is validated against KDP specifications: File size < 650 MB, Page dimensions within KDP supported sizes, Margins meet minimum requirements (0.25 inch minimum), No DRM or encryption, Fonts embedded properly, No form fields or JavaScript
**And** the PDF is validated against IngramSpark specifications: File size < 400 MB, Page dimensions match standard trim sizes, Bleed settings (if applicable), Proper color space (CMYK for color, Grayscale for B&W), Resolution 300 DPI minimum for images

**Given** validation passes all checks
**When** the results are presented
**Then** a success badge is displayed: "✓ KDP Compliant" and "✓ IngramSpark Compliant"
**And** a detailed validation report is available showing which checks passed

**Given** validation detects issues
**When** the results are presented
**Then** a warning is displayed: "⚠ Validation issues detected"
**And** specific issues are listed: "Page margins are below IngramSpark minimum (found 0.2 inch, require 0.25 inch)", "File size exceeds KDP recommendation (found 700 MB, recommend < 650 MB)"
**And** suggested fixes are provided for each issue
**And** the user can still use the file but is warned it may be rejected by the platform

**Given** the user wants to ensure compliance
**When** the user views export settings
**Then** a "Use KDP/IngramSpark Presets" button is available
**And** clicking it auto-configures settings to meet both platforms' specifications
**And** the user can then export with confidence

### Story 8.5: Implement EPUB3 Export [Tier 1]

As an author,
I want to export my novel as an EPUB3 file,
So that I can publish to Amazon Kindle, Apple Books, and other ebook retailers.

**Acceptance Criteria:**

**Given** the author opens the export dialog
**When** "Export as EPUB" is selected
**Then** an EPUB export configuration panel is displayed with settings: Include cover image (file upload, recommended 1600x2560px), Include table of contents (checkbox, default enabled), Metadata (author, publisher, ISBN, publication date), Font embedding (checkbox: embed custom fonts or use reader defaults), Chapter breaks (automatic based on chapter structure)
**And** a preview shows the EPUB structure (TOC, chapters)
**And** "Export" and "Cancel" buttons are available

**Given** the author configures settings and clicks "Export"
**When** the export process begins
**Then** a file save dialog opens for the .epub file
**And** the default filename is "{Project Title} - {Author Name}.epub"
**And** after the user selects a location, the export starts
**And** a progress modal displays: "Exporting to EPUB...", Progress bar, "Cancel" button

**Given** the EPUB export is in progress
**When** the Rust EPUB3 builder runs
**Then** the EPUB structure is created: mimetype file (application/epub+zip), META-INF/container.xml, Content files (XHTML for each chapter), content.opf (metadata and manifest), toc.ncx and nav.xhtml (table of contents), Embedded resources (cover image, fonts if selected)
**And** all files are packaged into a ZIP archive with .epub extension
**And** the export completes within 60 seconds for manuscripts up to 150,000 words

**Given** the EPUB export completes successfully
**When** the file is ready
**Then** EPUB validation runs automatically (EPUBCheck if available, or basic validation)
**And** if validation passes: "✓ EPUB3 Compliant"
**And** if validation fails: warnings are displayed with specific issues
**And** a success notification is displayed with "Open EPUB" and "Open Folder" buttons

**Given** the EPUB is validated
**When** EPUBCheck (or equivalent) runs
**Then** the EPUB is checked for: Valid EPUB3 structure, No missing files, Valid XHTML in content files, Proper metadata in content.opf, Accessible navigation (toc.ncx and nav.xhtml)
**And** validation results are displayed to the user

### Story 8.6: Implement DOCX Export [Tier 1]

As an author,
I want to export my novel as a DOCX file,
So that I can share it with editors or collaborators who use Microsoft Word.

**Acceptance Criteria:**

**Given** the author opens the export dialog
**When** "Export as DOCX" is selected
**Then** a DOCX export configuration panel is displayed with settings: Include title page (checkbox), Include table of contents (checkbox), Font (dropdown: Calibri, Times New Roman, Georgia, Arial), Font size (number input: 10-14pt), Line spacing (dropdown: Single, 1.5, Double), Page size (dropdown: Letter, A4), Margins (sliders: Top, Bottom, Left, Right in inches)
**And** "Export" and "Cancel" buttons are available

**Given** the author configures settings and clicks "Export"
**When** the export process begins
**Then** the Node.js sidecar with docx.js library is spawned
**And** a file save dialog opens for the .docx file
**And** the default filename is "{Project Title} - {Author Name}.docx"
**And** after the user selects a location, the export starts
**And** a progress modal displays: "Exporting to DOCX...", Progress bar, "Cancel" button

**Given** the DOCX export is in progress
**When** the docx.js library runs
**Then** a DOCX document is created with: Document properties (title, author, created date), Proper paragraph styles (Normal, Heading 1 for chapters, Title for title page), Formatted text (bold, italic preserved from ProseMirror content), Page breaks between chapters (if configured), Table of contents (if enabled, with links to chapters)
**And** the document is saved to the specified location
**And** the export completes within 60 seconds for manuscripts up to 150,000 words

**Given** the DOCX export completes successfully
**When** the file is ready
**Then** a success notification is displayed: "DOCX exported successfully!"
**And** "Open DOCX" button opens the file in the default application (Word, LibreOffice, etc.)
**And** "Open Folder" button opens the file explorer

**Given** the DOCX is opened in Microsoft Word
**When** the file is reviewed
**Then** all formatting is preserved (bold, italic, headings)
**And** chapters are properly separated (page breaks or continuous based on settings)
**And** the table of contents (if included) is functional with clickable links
**And** the document is fully editable in Word

### Story 8.7: Implement Export Preview [Tier 1]

As an author,
I want to preview my export before generating the full file,
So that I can verify formatting and catch issues early.

**Acceptance Criteria:**

**Given** the author is configuring an export (PDF, EPUB, or DOCX)
**When** a "Preview" button is available in the export settings
**Then** clicking "Preview" generates a sample export of the first 3 chapters
**And** the preview generation is fast (<10 seconds per NFR)
**And** the preview file is opened automatically in the default viewer

**Given** the preview is generated for PDF
**When** the preview opens
**Then** the author can see: Actual formatting (fonts, margins, page size), Title page and TOC (if enabled), First 3 chapters rendered exactly as the full export would be, Page numbering and chapter styling
**And** the author can verify settings before exporting the full manuscript

**Given** the preview is generated for EPUB
**When** the preview opens
**Then** an EPUB reader (system default or built-in viewer) displays the sample
**And** the author can see: Cover image, Table of contents, Chapter formatting, Font and spacing
**And** the author can navigate through the sample to verify layout

**Given** the preview is generated for DOCX
**When** the preview opens in Word (or equivalent)
**Then** the author can see the formatted document
**And** the author can verify paragraph styles, fonts, and spacing
**And** the author can close the preview and adjust settings if needed

**Given** the author is satisfied with the preview
**When** the author returns to the export settings
**Then** the settings remain unchanged (preview does not reset settings)
**And** the author can proceed with "Export" to generate the full file

### Story 8.8: Implement Export Readiness Validation [Tier 2]

As an author,
I want the application to check if my manuscript is ready for export,
So that I don't export incomplete or problematic content.

**Acceptance Criteria:**

**Given** the author clicks "Export"
**When** export readiness validation runs
**Then** the system checks for: Incomplete chapters (chapters with 0 words or far below target), Placeholder text (e.g., "[TODO: Add scene here]", "Lorem ipsum"), Validation errors (unresolved Story Bible contradictions if validations were run), Missing metadata (author name, project title)
**And** validation completes in <2 seconds

**Given** export readiness validation finds issues
**When** the results are presented
**Then** a readiness report modal is displayed: "Export Readiness Check", List of issues with severity (blocking vs. warnings), Suggested actions for each issue, "Fix Issues", "Export Anyway", "Cancel" buttons
**And** blocking issues prevent export (e.g., missing title)
**And** warnings allow export but are strongly discouraged (e.g., incomplete chapters)

**Given** blocking issues are found
**When** the user attempts to export
**Then** the "Export" action is disabled until issues are resolved
**And** the report explains: "Please resolve these issues before exporting"
**And** clicking "Fix Issues" navigates to the relevant section (e.g., Settings for missing metadata)

**Given** only warnings are found
**When** the user attempts to export
**Then** the "Export Anyway" button is enabled
**And** clicking it shows a final confirmation: "Are you sure? Your export may be incomplete or contain errors."
**And** if confirmed, the export proceeds

**Given** no issues are found
**When** export readiness validation completes
**Then** a success message is displayed: "✓ Ready to export"
**And** the export proceeds without additional prompts

### Story 8.9: Implement Custom Export Settings Presets [Tier 2]

As an author,
I want to save and reuse export configurations as presets,
So that I don't have to reconfigure settings every time I export.

**Acceptance Criteria:**

**Given** the author is configuring an export
**When** the author has set up custom settings (page size, fonts, margins, etc.)
**Then** a "Save as Preset" button is available
**And** clicking it opens a dialog prompting for a preset name (e.g., "KDP Trade Paperback")
**And** clicking "Save" stores the preset in the export_presets table

**Given** presets exist for a project
**When** the author opens the export dialog
**Then** a "Presets" dropdown is displayed
**And** selecting a preset auto-fills all export settings with the preset values
**And** the author can modify the preset settings without affecting the saved preset
**And** the author can overwrite the preset by clicking "Save as Preset" with the same name

**Given** common presets are useful
**When** the application is first installed
**Then** default presets are provided: "Amazon KDP - Trade Paperback (6x9)", "IngramSpark - Standard (6x9)", "Kindle EPUB - Standard", "Word Manuscript - Double Spaced"
**And** users can customize or delete these presets

**Given** the author wants to manage presets
**When** a "Manage Presets" button is available in the export dialog
**Then** clicking it opens a preset management modal
**And** the modal lists all saved presets with "Edit", "Delete", "Duplicate" buttons
**And** the author can rename, modify, or remove presets as needed

### Story 8.10: Implement Export Failure Handling and Recovery [Tier 1]

As an author,
I want clear error messages and recovery options when exports fail,
So that I can diagnose and fix issues without losing progress.

**Acceptance Criteria:**

**Given** an export operation is in progress
**When** a failure occurs (disk full, sidecar crash, timeout, etc.)
**Then** the export is immediately halted
**And** a specific error message is displayed: "Export failed: {specific reason}", Examples: "Disk full: {available space} MB remaining, need {required space} MB", "Puppeteer sidecar crashed: see logs for details", "Export timeout: operation exceeded 10 minutes"
**And** suggested actions are provided for each error type

**Given** the error is recoverable (e.g., disk space issue)
**When** the user is presented with recovery options
**Then** a "Retry Export" button is available
**And** clicking "Retry" attempts the export again (after the user resolves the issue)
**And** a "Change Export Location" button allows saving to a different drive/folder
**And** a "View Logs" button opens diagnostic logs for technical users

**Given** the error is not recoverable (e.g., sidecar binary missing)
**When** the user views the error
**Then** the message explains the issue clearly: "PDF export requires Puppeteer sidecar, which is missing or corrupted. Please reinstall StoryTeller."
**And** a "Reinstall Instructions" link provides guidance
**And** alternative formats are suggested: "You can still export to EPUB or DOCX."

**Given** an export times out (exceeds 10 minutes)
**When** the timeout is reached
**Then** the export is cancelled
**And** the user is informed: "Export timed out. This may indicate a performance issue or very large manuscript."
**And** options are provided: "Export in Sections" (export chapters in batches), "Simplify Formatting" (reduce complexity), "Contact Support"

**Given** partial export files exist after a failure
**When** the failure is handled
**Then** incomplete files are automatically deleted or moved to a "failed_exports" folder
**And** the user is assured: "No incomplete files were left behind"
**And** the next export attempt starts fresh

### Story 8.11: Implement Sample Chapter Export [Tier 2]

As an author,
I want to export a sample of my novel (first 3 chapters),
So that I can share a preview with beta readers or for marketing purposes.

**Acceptance Criteria:**

**Given** the author opens the export dialog
**When** an "Export Sample" option is available
**Then** a checkbox or separate button offers: "Export Sample (First 3 Chapters)"
**And** selecting this option limits the export to the first 3 chapters (or a user-specified range)

**Given** the author selects "Export Sample"
**When** the export configuration is displayed
**Then** a "Sample Range" selector allows choosing: First N chapters (default 3, adjustable 1-10), Specific chapters (multi-select: Chapter 1, 5, 10 for example), Percentage of manuscript (e.g., first 10%)
**And** the sample is clearly marked in the filename: "{Project Title} - Sample.pdf"

**Given** the sample export is generated
**When** the export completes
**Then** the sample file includes a notice on the title page or first page: "Sample Preview - First {N} Chapters" (optional, configurable)
**And** the sample is formatted identically to the full manuscript export
**And** the sample can be shared freely without exposing the full manuscript

**Given** the author exports a sample for marketing
**When** the sample is used
**Then** the file size is significantly smaller (only includes selected chapters)
**And** the sample provides a representative preview of the full novel's quality

---

(Continue with remaining Epics 9-12...)
