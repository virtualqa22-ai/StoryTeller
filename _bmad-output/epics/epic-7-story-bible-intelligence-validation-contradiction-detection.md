# Epic 7: Story Bible Intelligence - Validation & Contradiction Detection

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
