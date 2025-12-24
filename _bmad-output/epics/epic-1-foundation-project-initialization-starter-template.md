# Epic 1: Foundation - Project Initialization & Starter Template

Development team has a working Tauri 2.0 + Svelte 5 + TypeScript + Rust project scaffold with core architecture components ready for feature development.

### Story 1.1: Initialize Tauri + Svelte Project Scaffold [Tier 1]

As a development team,
I want to initialize the Tauri 2.0 + Svelte 5 + TypeScript + Rust project from the official starter template,
So that we have a working cross-platform desktop application foundation with proper build tooling.

**Acceptance Criteria:**

**Given** a clean development environment
**When** the team runs `pnpm create tauri-app storyteller --template svelte-ts`
**Then** the project initializes with Tauri 2.0, Svelte 5, TypeScript, and Rust configured
**And** `pnpm install` completes successfully
**And** `pnpm tauri dev` launches the app in development mode
**And** the app displays on Windows, macOS, and Linux
**And** Hot Module Replacement (HMR) works for Svelte components

**Given** the initialized project
**When** the team reviews the project structure
**Then** the following directories exist: `src/` (Svelte frontend), `src-tauri/` (Rust backend), `src-tauri/capabilities/` (Tauri 2.0 permission system)
**And** `package.json` includes scripts for dev, build, and test
**And** `tauri.conf.json` is configured with app metadata
**And** TypeScript strict mode is enabled in `tsconfig.json`

### Story 1.2: Configure SQLite Database with Migrations [Tier 1]

As a development team,
I want SQLite configured with rusqlite and refinery migration framework,
So that we have a reliable local database with version-controlled schema changes.

**Acceptance Criteria:**

**Given** the Tauri + Svelte project is initialized
**When** the team adds `rusqlite` (with bundled feature) and `refinery` to `src-tauri/Cargo.toml`
**Then** dependencies compile successfully
**And** SQLite database file path is configured as `{app_data}/storyteller.db`

**Given** the refinery migration framework is added
**When** the team creates the migrations directory at `src-tauri/migrations/`
**Then** the directory structure follows the pattern: `V{number}__{description}.sql`
**And** a sample migration `V1__init_schema.sql` is created with a test table
**And** migration runs automatically on app startup via Rust code
**And** migrations are idempotent (can run multiple times safely)

**Given** the migration system is configured
**When** the app starts for the first time
**Then** the SQLite database is created at the correct path
**And** migrations run successfully
**And** migration status is logged to console
**And** migration errors are caught and logged with clear messages

### Story 1.3: Setup Qdrant Embedded Vector Store [Tier 1]

As a development team,
I want Qdrant vector database configured in embedded Rust mode,
So that we can perform semantic search on Story Bible entries without external dependencies.

**Acceptance Criteria:**

**Given** the Tauri project with SQLite configured
**When** the team adds `qdrant-client` crate to `src-tauri/Cargo.toml`
**Then** the dependency compiles successfully

**Given** Qdrant client is added
**When** the team configures Qdrant in embedded mode
**Then** Qdrant is initialized with in-memory storage for development
**And** Qdrant is initialized with persistent storage (`{app_data}/qdrant/`) for production
**And** a test collection "story_bible_test" is created on startup
**And** the collection uses 384-dimensional vectors (sentence-transformers compatible)

**Given** Qdrant is configured
**When** the app starts
**Then** Qdrant initialization completes within 2 seconds
**And** connection status is logged to console
**And** errors are caught and logged with actionable messages
**And** the app continues running even if Qdrant fails to initialize (graceful degradation)

**Given** Qdrant is running
**When** the team performs a test vector insertion and search
**Then** the operation completes successfully
**And** search results are returned in <100ms for small datasets

### Story 1.4: Configure Testing Infrastructure [Tier 1]

As a development team,
I want Vitest, Playwright, and Rust testing configured with sample tests,
So that we have a complete testing framework for frontend, E2E, and backend code.

**Acceptance Criteria:**

**Given** the Tauri + Svelte project
**When** the team adds Vitest for frontend testing
**Then** `vitest` and `@vitest/ui` are added to `package.json`
**And** `vite.config.ts` is updated with Vitest configuration
**And** a sample component test exists at `src/lib/__tests__/App.test.ts`
**And** `pnpm test` runs all frontend tests
**And** tests run in watch mode during development

**Given** Vitest is configured
**When** the team adds Playwright for E2E testing
**Then** `@playwright/test` is added to `package.json`
**And** `playwright.config.ts` is created with Tauri-specific configuration
**And** a sample E2E test exists at `tests/e2e/app.spec.ts`
**And** the test launches the Tauri app and verifies basic functionality
**And** `pnpm test:e2e` runs all E2E tests

**Given** frontend and E2E testing are configured
**When** the team configures Rust backend testing
**Then** sample unit tests exist in `src-tauri/src/lib.rs`
**And** `cargo test` runs all Rust tests successfully
**And** Rust tests run in isolation (no external dependencies required)

**Given** all testing frameworks are configured
**When** the team runs the complete test suite
**Then** frontend tests, E2E tests, and Rust tests all pass
**And** test results are clearly displayed with pass/fail status
**And** test execution completes in <30 seconds for initial test suite

### Story 1.5: Setup Tailwind CSS and Design System Foundation [Tier 1]

As a development team,
I want Tailwind CSS configured with Fluent Design tokens and base configuration,
So that we have a consistent styling system for building UI components.

**Acceptance Criteria:**

**Given** the Tauri + Svelte project
**When** the team adds Tailwind CSS
**Then** `tailwindcss`, `postcss`, and `autoprefixer` are added to `package.json`
**And** `tailwind.config.js` is created with Svelte file paths configured
**And** `postcss.config.js` is created with Tailwind plugin
**And** `src/app.css` imports Tailwind directives
**And** `src/main.ts` imports `app.css`

**Given** Tailwind is configured
**When** the team defines Fluent Design tokens in `tailwind.config.js`
**Then** custom colors are defined (primary, secondary, accent, neutral shades)
**And** custom spacing scale matches Fluent Design (4px base unit)
**And** custom border radius values are defined
**And** custom shadow values match Fluent elevation system
**And** typography scale is configured with recommended font families

**Given** Tailwind with Fluent tokens is configured
**When** the team creates a test component using Tailwind classes
**Then** the component renders with correct styling
**And** Tailwind JIT compilation works (styles update on save)
**And** production build purges unused CSS (bundle <50KB)
**And** dark mode utilities work correctly (`dark:` prefix)

### Story 1.6: Build Core Fluent Design Svelte Components [Tier 1]

As a development team,
I want 5-8 essential Svelte components built following Fluent Design Language,
So that we have a reusable component library for building the application UI.

**Acceptance Criteria:**

**Given** Tailwind CSS with Fluent tokens is configured
**When** the team creates core components in `src/lib/components/fluent/`
**Then** the following components exist with proper TypeScript types: Button.svelte (primary, secondary, ghost variants), Input.svelte (text input with label, error state, disabled state), Card.svelte (container with optional header, body, footer), Modal.svelte (overlay with backdrop, close button, trap focus), Toast.svelte (notification with success, warning, error, info variants)

**Given** the Button component is created
**When** the team reviews its implementation
**Then** it supports variants: `primary`, `secondary`, `ghost`
**And** it supports sizes: `sm`, `md`, `lg`
**And** it supports disabled state
**And** it has hover, focus, and active states matching Fluent Design
**And** it includes proper ARIA attributes for accessibility
**And** it has TypeScript props with proper types

**Given** the Input component is created
**When** the team reviews its implementation
**Then** it includes a label with proper `for` attribute
**And** it supports placeholder text
**And** it supports error state with error message display
**And** it supports disabled state
**And** it binds to Svelte's `bind:value` correctly
**And** focus states match Fluent Design (2px blue outline)

**Given** the Modal component is created
**When** the team reviews its implementation
**Then** it renders as a portal/overlay
**And** it includes a backdrop that closes modal on click
**And** it traps focus within the modal when open
**And** it closes on Escape key press
**And** it prevents body scroll when open
**And** it includes proper ARIA attributes (`role="dialog"`, `aria-modal="true"`)

**Given** all 5 core components are created
**When** the team creates a demo page using all components
**Then** all components render correctly
**And** components are responsive (work at 768px+ width)
**And** components support dark mode via Tailwind's `dark:` classes
**And** component file size is reasonable (<10KB per component)

### Story 1.7: Configure ProseMirror Editor Foundation [Tier 1]

As a development team,
I want ProseMirror editor library integrated with basic configuration,
So that we have the rich text editing foundation for the writing workspace.

**Acceptance Criteria:**

**Given** the Tauri + Svelte project with Tailwind CSS
**When** the team adds ProseMirror dependencies
**Then** the following packages are added to `package.json`: `prosemirror-state`, `prosemirror-view`, `prosemirror-model`, `prosemirror-schema-basic`, `prosemirror-keymap`, `prosemirror-history`

**Given** ProseMirror packages are installed
**When** the team creates a Svelte wrapper component at `src/lib/components/Editor.svelte`
**Then** the component initializes ProseMirror `EditorView` in an `onMount` lifecycle
**And** the editor uses basic schema (paragraphs, headings, bold, italic)
**And** the editor supports undo/redo via `prosemirror-history`
**And** the editor has basic keymap (Ctrl+B for bold, Ctrl+I for italic, Ctrl+Z/Y for undo/redo)
**And** the editor content is bound to a Svelte store or prop

**Given** the Editor component is created
**When** the team adds it to a test page
**Then** the editor renders with proper styling (Fluent Design typography)
**And** typing in the editor is responsive (<16ms latency)
**And** undo/redo works correctly
**And** keyboard shortcuts work (Ctrl+B, Ctrl+I, etc.)
**And** the editor supports basic copy/paste
**And** the editor has a minimum height of 300px

**Given** ProseMirror is working
**When** the team tests performance
**Then** the editor maintains 60 FPS while typing
**And** the editor handles documents up to 10,000 words without lag
**And** editor initialization completes in <200ms

---
