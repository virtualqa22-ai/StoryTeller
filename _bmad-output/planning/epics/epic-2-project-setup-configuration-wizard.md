# Epic 2: Project Setup & Configuration Wizard

Authors can create new novel projects through a guided onboarding wizard, configuring genre, story framework, and all initial parameters. They can also open existing projects from a recent list.

### Story 2.0: Configure SQLite Database with Migrations [Tier 1]

As a development team,
I want SQLite configured with rusqlite and refinery migration framework,
So that we can persist project data reliably with version-controlled schema changes.

**Acceptance Criteria:**

**Given** the Tauri application is initialized
**When** the team adds `rusqlite` (with bundled feature) and `refinery` to `src-tauri/Cargo.toml`
**Then** dependencies compile successfully
**And** SQLite database file path is configured as `{app_data}/storyteller.db`

**Given** the refinery migration framework is added
**When** the team creates the migrations directory at `src-tauri/migrations/`
**Then** the directory structure follows the pattern: `V{number}__{description}.sql`
**And** migration V1__init_schema.sql exists but contains only framework setup (no tables yet)
**And** migrations run automatically on app startup via Rust code
**And** migrations are idempotent (can run multiple times safely)

**Given** the migration system is configured
**When** the app starts for the first time
**Then** the SQLite database is created at the correct path
**And** migrations run successfully
**And** migration status is logged to console
**And** migration errors are caught and logged with clear messages
**And** the app continues running even if migrations fail (graceful degradation)

**NOTE:** This story sets up the migration framework only. Story 2.1 will create the first real table (projects) when needed.

### Story 2.1: Design and Implement Database Schema for Projects [Tier 1]

As a development team,
I want a comprehensive SQLite schema for storing novel projects with all configuration data,
So that we can persist project metadata, settings, and relationships to other entities.

**Acceptance Criteria:**

**Given** the SQLite database is configured with migrations
**When** the team creates migration `V2__create_projects_schema.sql`
**Then** the migration defines a `projects` table with fields: id (PRIMARY KEY), title (TEXT NOT NULL), author_name (TEXT), pen_name (TEXT), tagline (TEXT), genre (TEXT), subgenre (TEXT), target_audience (TEXT), tone (TEXT), point_of_view (TEXT), story_framework (TEXT), chapter_count (INTEGER), target_words_per_chapter (INTEGER), plot_premise (TEXT), language (TEXT DEFAULT 'en'), created_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP), updated_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP), file_path (TEXT NOT NULL UNIQUE), last_opened_at (TIMESTAMP)
**And** the schema includes indexes on frequently queried fields (last_opened_at, created_at)
**And** the migration includes a trigger to auto-update `updated_at` on row changes

**Given** the projects table is created
**When** the team tests the schema with sample data
**Then** project records can be inserted with all fields
**And** records can be queried by id or file_path
**And** records can be ordered by last_opened_at for recent projects list
**And** the updated_at trigger fires correctly on UPDATE operations

### Story 2.2: Build Home Screen with Recent Projects List [Tier 1]

As an author,
I want to see a home screen showing my recent projects when I launch StoryTeller,
So that I can quickly resume work on my current novel.

**Acceptance Criteria:**

**Given** the application is launched with no projects
**When** the home screen renders
**Then** a welcome message is displayed: "Welcome to StoryTeller"
**And** two primary action buttons are shown: "Create New Project" (primary button) and "Open Existing Project" (secondary button)
**And** an empty state illustration is displayed
**And** the layout follows Fluent Design principles with proper spacing

**Given** the application has 1-5 recent projects
**When** the home screen renders
**Then** a "Recent Projects" section displays a card for each project
**And** each project card shows: project title, author/pen name, last modified date (relative time: "2 hours ago"), project thumbnail or genre icon, word count progress (e.g., "15,000 / 80,000 words")
**And** clicking a project card opens that project
**And** each card has a context menu with "Open", "Open in File Explorer", and "Remove from List" options
**And** the "Create New Project" button remains prominently displayed above the list

**Given** the application has 10+ recent projects
**When** the home screen renders
**Then** only the 10 most recent projects are displayed
**And** a "View All Projects" link is shown at the bottom
**And** projects are sorted by last_opened_at descending

### Story 2.3: Build Wizard Step 1 - Basic Project Information [Tier 1]

As an author,
I want to provide basic information about my novel in the first wizard step,
So that StoryTeller can configure my project with the right metadata.

**Acceptance Criteria:**

**Given** the user clicks "Create New Project"
**When** the wizard opens to Step 1
**Then** the wizard displays a progress indicator showing "Step 1 of 6: Basic Information"
**And** the following input fields are displayed with labels: "Novel Title" (required, text input), "Author Name" (optional, text input, placeholder: "Your real name"), "Pen Name" (optional, text input, placeholder: "Your pen name if different"), "Tagline" (optional, text input, placeholder: "A one-sentence hook for your novel", max 150 characters)
**And** all fields use the Fluent Design Input component
**And** the "Novel Title" field has real-time validation (min 1 character, max 200 characters)

**Given** the user is on Step 1
**When** the user leaves the "Novel Title" field empty and clicks "Next"
**Then** an error message is displayed: "Novel Title is required"
**And** the field is highlighted with a red border
**And** focus is returned to the "Novel Title" field
**And** the wizard does not advance to Step 2

**Given** the user has entered a valid novel title
**When** the user clicks "Next"
**Then** the form data is saved to a temporary wizard state
**And** the wizard advances to Step 2
**And** a "Back" button becomes enabled

### Story 2.4: Build Wizard Step 2 - Genre and Audience [Tier 1]

As an author,
I want to select my novel's genre and target audience in the wizard,
So that StoryTeller can provide genre-appropriate templates and suggestions.

**Acceptance Criteria:**

**Given** the user is on Step 2 of the wizard
**When** the wizard displays Step 2
**Then** the progress indicator shows "Step 2 of 6: Genre & Audience"
**And** a "Genre" dropdown is displayed with options: Thriller, Romance, Fantasy, Sci-Fi, Mystery, Horror, Literary Fiction, Historical Fiction, Other
**And** a "Subgenre" multiselect field is displayed (options populate based on selected genre)
**And** a "Target Audience" dropdown is displayed with options: Young Adult (YA), New Adult (NA), Adult, Middle Grade, Children
**And** a "Tone" multiselect field is displayed with options: Dark, Light, Humorous, Serious, Suspenseful, Romantic, Adventurous, Philosophical

**Given** the user selects "Fantasy" as the genre
**When** the subgenre field updates
**Then** subgenre options include: High Fantasy, Urban Fantasy, Epic Fantasy, Dark Fantasy, Sword & Sorcery, Magical Realism
**And** the user can select multiple subgenres

**Given** the user has selected at least a genre and target audience
**When** the user clicks "Next"
**Then** the selections are saved to wizard state
**And** the wizard advances to Step 3

**Given** the user has not selected a genre
**When** the user clicks "Next"
**Then** an error message is displayed: "Please select at least a genre"
**And** the genre dropdown is highlighted

### Story 2.5: Build Wizard Step 3 - Story Structure [Tier 1]

As an author,
I want to configure my story's structure and framework in the wizard,
So that StoryTeller understands my narrative approach and can provide appropriate guidance.

**Acceptance Criteria:**

**Given** the user is on Step 3 of the wizard
**When** the wizard displays Step 3
**Then** the progress indicator shows "Step 3 of 6: Story Structure"
**And** a "Point of View" dropdown is displayed with options: First Person, Third Person Limited, Third Person Omniscient, Multiple POV
**And** a "Story Framework" dropdown is displayed with options: Three-Act Structure, Five-Act Structure, Hero's Journey, Snowflake Method, Seven-Point Story Structure, Custom/Freeform
**And** each framework option has a tooltip with a brief description (e.g., "Three-Act Structure: Setup, Confrontation, Resolution")

**Given** the user is on Step 3
**When** the wizard displays chapter configuration
**Then** a "Target Chapter Count" number input is displayed (default: 20, min: 1, max: 100)
**And** a "Target Words Per Chapter" number input is displayed (default: 3000, min: 500, max: 15000)
**And** a calculated "Total Target Word Count" is displayed (read-only, calculated as chapter_count × words_per_chapter)
**And** the calculation updates in real-time as the user changes values

**Given** the user has selected a story framework and configured chapter settings
**When** the user clicks "Next"
**Then** the selections are saved to wizard state
**And** the wizard advances to Step 4

### Story 2.6: Build Wizard Step 4 - Plot Premise [Tier 1]

As an author,
I want to provide a high-level plot premise in the wizard,
So that StoryTeller can use this context when generating content.

**Acceptance Criteria:**

**Given** the user is on Step 4 of the wizard
**When** the wizard displays Step 4
**Then** the progress indicator shows "Step 4 of 6: Plot Premise"
**And** a large textarea is displayed with the label "Plot Premise"
**And** placeholder text provides guidance: "Describe your story's main plot in 2-3 paragraphs. Include the protagonist, their goal, the central conflict, and the stakes."
**And** a character counter is displayed below the textarea (e.g., "125 / 2000 characters")
**And** the textarea supports markdown formatting (optional enhancement)

**Given** the user is typing in the plot premise textarea
**When** the character count approaches the maximum (2000 characters)
**Then** the counter changes color to amber at 1800 characters
**And** the counter changes color to red at 1950 characters
**And** the user cannot type beyond 2000 characters

**Given** the user has entered at least 50 characters in the plot premise
**When** the user clicks "Next"
**Then** the plot premise is saved to wizard state
**And** the wizard advances to Step 5

**Given** the user has entered fewer than 50 characters
**When** the user clicks "Next"
**Then** a warning message is displayed: "We recommend at least a few sentences for better AI-generated content. Continue anyway?"
**And** the user can choose to go back and add more or proceed

### Story 2.7: Build Wizard Step 5 - AI Provider Configuration [Tier 1]

As an author,
I want to optionally configure my AI provider API key in the wizard,
So that I can start generating content immediately after project creation.

**Acceptance Criteria:**

**Given** the user is on Step 5 of the wizard
**When** the wizard displays Step 5
**Then** the progress indicator shows "Step 5 of 6: AI Provider (Optional)"
**And** a prominent message is displayed: "You can configure this later from Settings"
**And** a "Skip this step" button is displayed prominently
**And** an "AI Provider" dropdown is displayed with options: OpenAI, Anthropic Claude, Google Gemini, Deepseek, Yandex, Custom Provider
**And** an "API Key" password input field is displayed (masked input)
**And** a "Test Connection" button is displayed next to the API key field

**Given** the user selects an AI provider and enters an API key
**When** the user clicks "Test Connection"
**Then** the application makes a test API call to verify the key
**And** a loading spinner is displayed during the test
**And** if successful, a green checkmark appears with the message "Connection successful"
**And** if failed, a red X appears with an error message explaining the issue (e.g., "Invalid API key" or "Network connection error")

**Given** the user clicks "Skip this step"
**When** the wizard advances
**Then** no API key is saved
**And** the wizard moves to Step 6
**And** a note is stored in wizard state that API configuration was skipped

**Given** the user has successfully tested an API key
**When** the user clicks "Next"
**Then** the API key is saved securely to OS credential storage
**And** the wizard advances to Step 6

### Story 2.8: Build Wizard Step 6 - Review and Create [Tier 1]

As an author,
I want to review all my project settings before finalizing creation,
So that I can ensure everything is configured correctly.

**Acceptance Criteria:**

**Given** the user is on Step 6 of the wizard
**When** the wizard displays Step 6
**Then** the progress indicator shows "Step 6 of 6: Review & Create"
**And** a summary card displays all configured settings organized by category: "Basic Information" (title, author, pen name, tagline), "Genre & Audience" (genre, subgenre, target audience, tone), "Story Structure" (POV, framework, chapter count, words per chapter, total target words), "Plot Premise" (first 200 characters with "Read more" link), "AI Provider" (provider name if configured, or "Not configured - you can add this later")
**And** each section has an "Edit" link that takes the user back to that specific step

**Given** the user clicks an "Edit" link on the review page
**When** the user is taken back to that step
**Then** all previously entered data is preserved in the form fields
**And** after editing, clicking "Next" returns to the review page
**And** the updated information is reflected in the review

**Given** the user is satisfied with the settings on the review page
**When** the user clicks "Create Project"
**Then** a loading state is displayed with the message "Creating your project..."
**And** the following operations occur: (1) A new project record is inserted into the database, (2) A project file is created at `~/Documents/StoryTeller/Projects/{project_title}.storyteller`, (3) The project file is initialized with the wizard data
**And** if any operation fails, the user sees a specific error message with recovery options
**And** if all operations succeed, the wizard closes and the main workspace opens with the new project
**Note:** Story Bible and Qdrant initialization will be implemented in later epics per architectural documentation

**Given** the project is created successfully
**When** the main workspace opens
**Then** the project title is displayed in the title bar
**And** the user sees an empty chapter list with a "Create First Chapter" button
**And** a welcome toast notification is displayed: "Project created successfully! Ready to start writing."
### Story 2.9: Implement Language Selection [Tier 2]

As an author,
I want to select the language for my novel's content,
So that AI-generated text is in the correct language.

**Acceptance Criteria:**

**Given** the user is on Step 4 of the wizard (Plot Premise)
**When** the wizard displays Step 4
**Then** a "Content Language" dropdown is displayed below the plot premise
**And** the dropdown includes common languages: English, Spanish, French, German, Italian, Portuguese, Russian, Chinese (Simplified), Japanese, Korean, Arabic, Hindi, Other
**And** the default selection is "English"
**And** a note is displayed: "This affects AI-generated content, not the UI language"

**Given** the user selects a non-English language
**When** the wizard proceeds to later steps
**Then** the language selection is saved to the project configuration
**And** AI prompts will be instructed to generate content in the selected language

**Given** the project is created with a specific language
**When** AI generation occurs
**Then** all generated content (characters, settings, chapters) is in the specified language
**And** validation messages remain in the UI language (English by default)

### Story 2.10: Add Welcome Screen with Optional Demo Project [Tier 2]

As a first-time author,
I want to see a welcome screen with the option to explore a demo project,
So that I can learn how StoryTeller works before creating my own novel.

**Acceptance Criteria:**

**Given** the application is launched for the first time (no projects exist)
**When** the home screen renders
**Then** a welcome modal is displayed with the heading "Welcome to StoryTeller"
**And** the modal contains a brief introduction: "StoryTeller helps you write consistent, high-quality novels with AI-powered assistance and intelligent Story Bible management."
**And** the modal displays three options: "Create My First Project" (primary button), "Explore Demo Project" (secondary button), "Skip Tour" (text link)

**Given** the user clicks "Explore Demo Project"
**When** the demo project loads
**Then** a pre-configured project is opened with: A complete Story Bible (3 characters, 2 settings, 5 plot threads), 3 sample chapters (1 user-written, 2 AI-generated), Sample validation reports showing how contradiction detection works, A guided tutorial overlay highlighting key features
**And** a persistent banner is displayed at the top: "You're viewing a demo project. Ready to create your own? [Create Project]"
**And** the demo project is read-only (users cannot save changes)

**Given** the user clicks "Create My First Project"
**When** the wizard opens
**Then** the wizard proceeds normally to Step 1
**And** the welcome modal does not appear again for this user

**Given** the user clicks "Skip Tour"
**When** the modal closes
**Then** the user is taken to the standard home screen
**And** a preference is saved to not show the welcome modal again
**And** the user can still create a project normally

---