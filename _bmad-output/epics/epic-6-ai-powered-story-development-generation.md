# Epic 6: AI-Powered Story Development & Generation

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
