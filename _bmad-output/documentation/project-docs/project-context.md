---
project_name: 'StoryTeller'
user_name: 'Karan'
date: '2025-12-29'
sections_completed: ['technology_stack', 'language_rules', 'framework_rules', 'testing_rules', 'code_quality_rules', 'workflow_rules', 'critical_rules']
status: 'complete'
rule_count: 95
optimized_for_llm: true
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

**Core Technologies:**
- **Svelte 5.0.0** - Latest major version with runes-based reactivity model
- **SvelteKit 2.9.0** - Using adapter-static (SPA mode for Tauri)
- **TypeScript 5.6.2** - Strict mode enabled
- **Vite 6.0.3** - Build tool and dev server
- **Tauri v2** - Desktop application framework
- **Rust 2021 Edition** - Backend/native layer

**Frontend Dependencies:**
- **Tailwind CSS 4.1.18** - Utility-first styling with PostCSS
- **bits-ui 1.0.0-next.98** - Headless UI component primitives
- **lucide-svelte 0.562.0** - Icon library
- **clsx 2.1.1** + **tailwind-merge 3.4.0** - Class name utilities

**Backend Dependencies:**
- **rusqlite 0.32** - SQLite with bundled feature
- **refinery 0.8** - Database migrations
- **serde 1.x** + **serde_json 1.x** - Serialization
- **thiserror 2.0** - Error handling
- **log 0.4** + **env_logger 0.11** - Logging

**Testing:**
- **Vitest 4.0.16** - Unit tests (jsdom environment)
- **Playwright 1.57.0** - E2E tests (Chromium)
- **@testing-library/svelte 5.3.0** - Component testing utilities

**Critical Version Constraints:**
- Svelte 5 introduced breaking changes (runes, new component props API)
- Tailwind v4 uses different configuration approach (PostCSS-only)
- Tauri v2 requires specific SvelteKit adapter-static configuration
- TypeScript strict mode must be maintained for all new code

## Critical Implementation Rules

### Language-Specific Rules

**TypeScript Configuration:**
- **Strict mode is mandatory** - All code must pass `strict: true` checking
- **moduleResolution: "bundler"** - Required for SvelteKit path resolution
- **No manual path aliases in tsconfig.json** - SvelteKit handles `$lib` alias automatically
- **allowJs and checkJs enabled** - JavaScript files are also type-checked

**Import/Export Patterns:**
- **Barrel exports** - UI components use `index.ts` files with both named and aliased versions (e.g., `Card as Root`)
- **SvelteKit $lib alias** - Always use `$lib` for internal imports (e.g., `import { cn } from "$lib/utils"`)
- **Tauri API imports** - Use `@tauri-apps/api/core` for `invoke()`, not deprecated paths
- **Type-only imports** - Use `import type` for type-only imports to avoid runtime bloat

**Svelte 5 Runes (CRITICAL):**
- **Use `$props()` rune** - NOT the old `export let` syntax for component props
- **Use `Snippet` type** - For renderable children (replaces slots in many cases)
- **Use `$state()` rune** - For reactive state within components
- **`{@render}` syntax** - Use `{@render children()}` for Snippet rendering, not `<slot>`

**Error Handling:**
- **Rust side** - Use `thiserror` for error types, return `Result<T, E>` from commands
- **Tauri commands** - Let Tauri serialize errors automatically; graceful degradation on init failures
- **Frontend** - Wrap `invoke()` calls in try-catch, handle errors with user-friendly messages

### Framework-Specific Rules

**Svelte 5 Component Structure:**
- **Props declaration** - Always use `let { prop1, prop2, ...rest }: Props = $props()` destructuring pattern
- **Type Props interface** - Define a `Props` type with optional properties and `[key: string]: any` for rest props
- **Snippet children** - Accept children as `children?: Snippet | string` to support both render functions and text
- **Conditional Snippet rendering** - Use `{#if typeof children === "function"} {@render children()} {:else} {children} {/if}`

**SvelteKit SPA Configuration:**
- **Static adapter required** - Must use `@sveltejs/adapter-static` with `fallback: "index.html"` for Tauri
- **No SSR** - This is a client-side only app; avoid server-side specific APIs
- **Routes are pages** - File-based routing still works, but everything renders client-side

**Tauri Integration Patterns:**
- **Command invocation** - Always use `invoke<ReturnType>('command_name', { param })` with explicit return types
- **Graceful degradation** - Backend init failures should log warnings but not crash the app (see `init_database()` pattern)
- **Rust command handlers** - Must be registered in `invoke_handler!(tauri::generate_handler![...])` macro
- **Cross-platform paths** - Use `dirs` crate for app data paths, not hardcoded paths

**Component Organization:**
- **Barrel exports** - Each UI component folder has `index.ts` exporting both named and aliased versions
- **Variant-based styling** - Use object maps for variants/sizes, apply with `cn()` utility
- **Base classes** - Define `baseClass` constant for shared styles, compose with `cn()`
- **data-testid attributes** - Add to all interactive elements and major containers for E2E tests

**State Management:**
- **Component-local state** - Use `$state()` rune for component-level reactive state
- **No global store yet** - Project doesn't use stores; state is passed via props or fetched directly
- **Database as source of truth** - Rust backend with SQLite holds persistent state

**Styling with Tailwind:**
- **Always use `cn()` helper** - Import from `$lib/utils`, merges classes with `clsx` + `tailwind-merge`
- **Semantic color tokens** - Use `bg-primary`, `text-primary-foreground`, etc., not raw colors
- **Design system variants** - Follow existing variant patterns (default, destructive, outline, secondary, ghost, link)

### Testing Rules

**Test Organization:**
- **Co-located tests** - Unit tests live alongside components: `button.svelte` + `button.test.ts` in same folder
- **E2E tests separate** - Playwright tests in `tests/e2e/` directory, not mixed with source
- **Naming convention** - Unit tests use `.test.ts` or `.spec.ts`, E2E uses `.spec.ts`
- **Test file structure** - Use `describe()` blocks to group related tests, descriptive `it()` names

**Vitest Unit Testing:**
- **Testing Library pattern** - Use `render()` from `@testing-library/svelte`, query with `screen.getByRole()`
- **Check classes for variants** - Test that variant props apply correct Tailwind classes
- **Test props spreading** - Verify that `...rest` props are properly forwarded to native elements
- **jsdom environment** - Configured globally in vite.config.js, no per-file setup needed

**Playwright E2E Testing:**
- **data-testid selectors** - Primary selector strategy for major UI elements (e.g., `[data-testid="empty-state"]`)
- **Role-based selectors** - Use `getByRole('button', { name: /pattern/i })` for accessible queries
- **Wait for elements** - Always use `waitForSelector()` with explicit timeouts (5000ms typical)
- **Test.skip pattern** - Mark tests requiring database setup with `test.skip()` and TODO comments
- **Descriptive test groups** - Use `test.describe()` with acceptance criteria references (e.g., "AC #1")

**Mock Usage:**
- **Tauri commands mocking** - Not yet implemented; tests use real backend or skip with TODO
- **No heavy mocking** - Prefer integration-style tests over heavily mocked unit tests

**Test Coverage:**
- **UI components priority** - All new UI components should have unit tests for variants and props
- **E2E for user flows** - Critical user journeys should have Playwright coverage

**Test Boundaries:**
- **Unit tests** - Component rendering, prop handling, variant styling, utility functions
- **E2E tests** - Full user flows, Tauri command integration, navigation, data persistence

### Code Quality & Style Rules

**File Naming Conventions:**
- **Svelte components** - kebab-case for files: `button.svelte`, `card-header.svelte`, `page-layout.svelte`
- **TypeScript/JavaScript** - kebab-case for utilities and modules: `utils.ts`, `format-date.ts`
- **Test files** - Match source file name with `.test.ts` suffix: `button.test.ts`, `utils.test.ts`
- **Barrel exports** - Always named `index.ts` in component folders
- **Route files** - SvelteKit conventions: `+page.svelte`, `+layout.svelte`, `+layout.ts`

**Code Organization:**
- **Component structure** - `src/lib/components/[category]/[ComponentName]/` pattern
- **UI components** - Live in `src/lib/components/ui/` with subfolders per component
- **Domain components** - Feature-specific components in `src/lib/components/[domain]/` (e.g., `projects/`)
- **Utilities** - `src/lib/utils/` for shared helper functions
- **API layer** - `src/lib/api/` for Tauri command wrappers
- **Routes** - `src/routes/` for pages and layouts

**Naming Conventions:**
- **Components** - PascalCase in code, kebab-case in filenames
- **Types/Interfaces** - PascalCase (e.g., `Props`, `Project`)
- **Functions** - camelCase (e.g., `listRecentProjects`, `formatDate`)
- **Variables** - camelCase for locals, SCREAMING_SNAKE_CASE for constants
- **Rust** - snake_case for functions/variables, PascalCase for types/structs

**Documentation Requirements:**
- **JSDoc for public APIs** - All exported functions should have JSDoc with `@param`, `@returns`, `@example`
- **Type annotations** - Rely on TypeScript types over comments where possible
- **Inline comments** - Only for non-obvious logic; prefer self-documenting code
- **TODO pattern** - Use `// TODO: description` for tests requiring future implementation

**Code Quality Checks:**
- **svelte-check** - Must pass before commits: `pnpm check`
- **TypeScript strict** - All code must satisfy strict mode
- **Run tests** - `pnpm test` for unit tests, `pnpm test:e2e` for E2E

### Development Workflow Rules

**Git/Repository:**
- **Git initialized** - Project is a git repository on `master` branch
- **Conventional commits** - Use type prefixes: `feat:`, `fix:`, `build:`, `test:`, `docs:`, `refactor:`
- **Scope optional** - Can include scope in parentheses: `feat(ui):`, `feat(db):`
- **Descriptive messages** - Clear description of what changed, not implementation details

**Package Manager:**
- **pnpm required** - Project uses `pnpm`, not npm or yarn
- **Lock file** - `pnpm-lock.yaml` must be committed
- **Scripts** - Use `pnpm dev`, `pnpm build`, `pnpm test`, `pnpm test:e2e`, `pnpm check`

**Build & Deployment:**
- **Vite dev server** - Port 1420 (Tauri requirement)
- **Static build** - `pnpm build` generates static SPA for Tauri
- **Desktop app** - `pnpm tauri build` creates platform-specific installers

**Pre-commit Checklist:**
- Run `pnpm check` - TypeScript and Svelte validation
- Run `pnpm test` - Unit tests must pass
- Run `pnpm test:e2e` - E2E tests should pass (may skip if DB not seeded)
- Ensure no console errors in dev mode

### Critical Don't-Miss Rules

**Anti-Patterns to Avoid:**
- **DON'T use old Svelte syntax** - Never use `export let prop` (use `$props()` rune), never use `<slot>` (use `Snippet` and `{@render}`)
- **DON'T import from wrong Tauri paths** - Avoid deprecated `@tauri-apps/api/tauri`, use specific subpaths like `@tauri-apps/api/core`
- **DON'T hardcode colors** - Never use raw Tailwind colors like `bg-blue-500`; always use semantic tokens like `bg-primary`
- **DON'T merge classes manually** - Never concatenate className strings; always use `cn()` helper from `$lib/utils`
- **DON'T use Node.js APIs** - This is a browser/Tauri app; no `fs`, `path`, `process` on frontend
- **DON'T assume SSR** - SvelteKit is in SPA mode; server-side rendering is disabled

**Edge Cases to Handle:**
- **Database initialization may fail** - Backend uses graceful degradation pattern; don't crash on DB errors
- **Tauri commands can fail** - Always wrap `invoke()` in try-catch blocks
- **Empty state vs loading state** - Distinguish between "no data yet" and "loading" in UI
- **Cross-platform paths** - Use `dirs` crate for paths, test on Windows/Mac/Linux
- **Port 1420 conflicts** - Vite fails if port is taken (strictPort: true); document for users

**Security Considerations:**
- **SQL injection protection** - Using rusqlite with parameterized queries (continue this pattern)
- **XSS protection** - Svelte auto-escapes by default; don't use `@html` unless necessary
- **File system access** - Only access files through Tauri commands with proper validation
- **User input validation** - Validate all user inputs on both frontend and backend

**Performance Gotchas:**
- **Don't recreate `cn()` instances** - Import the shared utility, don't inline `clsx(twMerge(...))`
- **Avoid unnecessary reactivity** - Only use `$state()` when data actually needs to be reactive
- **Component re-renders** - Be cautious with props spreading and ensure proper memoization where needed
- **Database queries** - Already using indices on `last_opened_at`; maintain this for new queries

**Tauri-Specific Edge Cases:**
- **Command registration** - New Rust commands MUST be added to `generate_handler![]` macro or they'll fail silently
- **Serialization limits** - Large data through Tauri commands may fail; consider chunking or streaming
- **Window lifecycle** - Handle app close/minimize properly; database connections persist

---

## Usage Guidelines

**For AI Agents:**
- Read this file before implementing any code
- Follow ALL rules exactly as documented
- When in doubt, prefer the more restrictive option
- Update this file if new patterns emerge

**For Humans:**
- Keep this file lean and focused on agent needs
- Update when technology stack changes
- Review quarterly for outdated rules
- Remove rules that become obvious over time

Last Updated: 2025-12-29
