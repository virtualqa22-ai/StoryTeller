# Epic 1: Installable Desktop Application

Authors can install StoryTeller on their computer (Windows, macOS, or Linux) and launch a functional desktop application with a welcoming home screen.

**FRs covered:** FR95-FR101, FR126, Architecture Requirements #1-3, #8-9 (Starter Template, Technology Stack, Basic UI, Testing)

**User Value:**
- Authors can download and install StoryTeller like any desktop app
- Application launches successfully on Windows, macOS, and Linux
- Home screen welcomes users and shows them what StoryTeller does
- Provides foundation for all future features with working cross-platform app

**Critical Notes:**
- **MUST BE FIRST:** Establishes working application foundation
- Initialize with: `pnpm create tauri-app storyteller --template svelte-ts`
- Creates installable desktop app with minimal but functional UI
- SQLite and Qdrant setup moved to epics that need them (just-in-time)

---

### Story 1.1: Initialize Cross-Platform Desktop Application [Tier 1]

As an author,
I want to install StoryTeller on my computer,
So that I can launch the application and begin my novel-writing journey.

**Acceptance Criteria:**

**Given** a user downloads the StoryTeller installer
**When** they run the installer on Windows, macOS, or Linux
**Then** the application installs successfully
**And** a desktop shortcut/application icon is created
**And** the application appears in the system's applications list
**And** file associations for .storyteller files are registered

**Given** StoryTeller is installed
**When** the user launches the application
**Then** the app starts within 3 seconds (NFR-P2)
**And** the application window opens with proper title and icon
**And** the window is resizable and follows platform conventions
**And** the application runs on Windows 10/11, macOS 11+, and Linux (Ubuntu 20.04+, Fedora 35+, Arch)

**Given** the application is running
**When** the development team checks the project structure
**Then** the project uses Tauri 2.0 + Svelte 5 + TypeScript + Rust
**And** `pnpm install` completes successfully
**And** `pnpm tauri dev` launches the app in development mode
**And** Hot Module Replacement (HMR) works for Svelte components
**And** TypeScript strict mode is enabled in `tsconfig.json`

### Story 1.2: Build Welcome Home Screen [Tier 1]

As an author,
I want to see a welcoming home screen when I launch StoryTeller,
So that I understand what the application does and feel ready to begin.

**Acceptance Criteria:**

**Given** the user launches StoryTeller for the first time
**When** the home screen renders
**Then** a welcome message is displayed: "Welcome to StoryTeller - Your AI-Powered Novel Writing Companion"
**And** a hero section explains the app's purpose: "Write, organize, and publish your novel with AI assistance that maintains perfect consistency across 80,000+ words"
**And** an illustration or hero image conveys creativity and writing
**And** the layout follows Fluent Design principles with proper spacing

**Given** the home screen is displayed
**When** the user views the main actions
**Then** a prominent "Create New Project" button is displayed (primary action)
**And** an "Open Existing Project" button is displayed (secondary action)
**And** both buttons are keyboard accessible (Tab navigation)
**And** both buttons have hover states and click feedback
**And** the "Create New Project" button is visually emphasized

**Given** the user has not created any projects yet
**When** they view the home screen
**Then** an empty state section shows: "No projects yet - let's create your first novel!"
**And** feature highlights are displayed: "✓ AI-Powered Writing", "✓ Story Bible Memory", "✓ Professional Export"
**And** a brief "What is StoryTeller?" explanation is visible
**And** all text uses the Fluent Design typography system

**Given** the home screen is rendered
**When** the user clicks "Create New Project"
**Then** a message is displayed: "Project wizard coming soon in Epic 2!"
**And** the button shows feedback but doesn't navigate anywhere yet

**Given** the home screen is rendered
**When** the user clicks "Open Existing Project"
**Then** a message is displayed: "Project opening coming soon in Epic 2!"
**And** the button shows feedback but doesn't navigate anywhere yet

### Story 1.3: Setup Tailwind CSS Design System [Tier 1]

As a development team,
I want Tailwind CSS configured with Fluent Design tokens,
So that we have a consistent styling system for building UI components.

**Acceptance Criteria:**

**Given** the Tauri + Svelte project is initialized
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
**When** the home screen is built using Tailwind classes
**Then** the component renders with correct styling
**And** Tailwind JIT compilation works (styles update on save)
**And** production build purges unused CSS (bundle <50KB)
**And** the styling follows Fluent Design visual language

### Story 1.4: Configure Testing Infrastructure [Tier 1]

As a development team,
I want Vitest and Playwright configured with sample tests,
So that we have a complete testing framework for frontend and E2E code.

**Acceptance Criteria:**

**Given** the Tauri + Svelte project is initialized
**When** the team adds Vitest for frontend testing
**Then** `vitest` and `@vitest/ui` are added to `package.json`
**And** `vite.config.ts` is updated with Vitest configuration
**And** a sample component test exists at `src/lib/__tests__/HomeScreen.test.ts`
**And** the test verifies the welcome message and primary buttons render
**And** `pnpm test` runs all frontend tests
**And** tests run in watch mode during development

**Given** Vitest is configured
**When** the team adds Playwright for E2E testing
**Then** `@playwright/test` is added to `package.json`
**And** `playwright.config.ts` is created with Tauri-specific configuration
**And** a sample E2E test exists at `tests/e2e/launch.spec.ts`
**And** the test launches the Tauri app and verifies home screen appears
**And** the test verifies "Create New Project" button is clickable
**And** `pnpm test:e2e` runs all E2E tests

**Given** all testing frameworks are configured
**When** the team runs the complete test suite
**Then** frontend tests and E2E tests all pass
**And** test results are clearly displayed with pass/fail status
**And** test execution completes in <30 seconds for initial test suite
**And** CI/CD pipeline can run tests automatically

### Story 1.5: Build Core Svelte Component Library (15-20 Components) [Tier 1]

As a development team,
I want a library of reusable Svelte components following Fluent Design,
So that we can build consistent UI features quickly across all epics.

**Acceptance Criteria:**

**Given** Tailwind and Fluent tokens are configured
**When** the team creates the component library structure
**Then** a `src/lib/components/` directory exists
**And** components are organized by category: `base/`, `forms/`, `layouts/`, `navigation/`

**Given** the component library structure exists
**When** the team builds base components
**Then** the following components are created with proper TypeScript types:
- `Button` (primary, secondary, text variants)
- `Input` (text, number, with validation states)
- `Dropdown` (single select with search)
- `Multiselect` (multiple selections)
- `Checkbox` and `Radio`
- `Card` (content container with shadow)
- `Modal` (overlay dialog)
- `Tooltip` (contextual help)
- `Icon` (SVG icon wrapper)
- `Spinner` (loading indicator)

**Given** base components are created
**When** the team builds form and layout components
**Then** the following components are created:
- `TextArea` (multi-line input)
- `FormField` (label + input + error message wrapper)
- `Sidebar` (navigation panel)
- `Header` (top navigation bar)
- `Footer` (bottom info bar)

**Given** all components are created
**When** the team adds component documentation
**Then** each component has a `.stories.ts` file showing usage examples
**And** each component has TypeScript props interface documented
**And** each component follows accessibility best practices (ARIA labels, keyboard nav)
**And** each component is tested with Vitest unit tests

**Given** the component library is complete
**When** the home screen uses these components
**Then** `Button`, `Card`, and layout components work correctly
**And** components are reusable across the application
**And** the home screen maintains 60 FPS performance (NFR-P1)

---

## Epic Summary

**User Value Delivered:**
- ✅ Authors can install StoryTeller on Windows, macOS, or Linux
- ✅ Application launches successfully with cross-platform support
- ✅ Welcoming home screen introduces the application
- ✅ Foundation established for all future feature development

**Technical Foundation:**
- ✅ Tauri 2.0 + Svelte 5 + TypeScript + Rust working
- ✅ Tailwind CSS with Fluent Design tokens configured
- ✅ 15-20 reusable UI components ready for feature development
- ✅ Testing infrastructure (Vitest + Playwright) operational

**Dependencies for Future Epics:**
- Epic 2 will add SQLite when projects need persistence
- Epic 4/6 will add Qdrant when Story Bible needs semantic search
- All epics can use the component library established here

**NFRs Addressed:**
- NFR-P2: Cold start <3 seconds
- NFR-P1: UI interactions <150ms
- NFR-C1-C3: Cross-platform support (Windows/macOS/Linux)
- NFR-C11-C14: OS compatibility requirements
- NFR-M7: Installation within 5 minutes
