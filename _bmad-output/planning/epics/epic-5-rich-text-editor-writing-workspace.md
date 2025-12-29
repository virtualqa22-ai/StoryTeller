# Epic 5: Rich Text Editor & Writing Workspace

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
