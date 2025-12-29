# StoryTeller Source Tree Analysis

**Generated:** 2025-12-29
**Purpose:** Comprehensive guide to the project's directory structure and file organization

---

## Root Directory Structure

```
StoryTeller/
├── _bmad/                         # BMAD workflow system files (meta)
├── _bmad-output/                  # Generated documentation and artifacts
├── build/                         # Vite build output (gitignored)
├── node_modules/                  # npm dependencies (gitignored)
├── playwright-report/             # Playwright HTML reports
├── src/                          # Frontend source code (SvelteKit/Svelte)
├── src-tauri/                    # Backend source code (Rust/Tauri)
├── static/                        # Static assets served by SvelteKit
├── test-results/                  # Playwright test results (gitignored)
├── tests/                         # End-to-end tests (Playwright)
│
├── package.json                   # Frontend dependencies and scripts
├── pnpm-lock.yaml                # pnpm lockfile
├── pnpm-workspace.yaml           # pnpm workspace configuration
├── playwright.config.ts          # Playwright E2E test configuration
├── postcss.config.js             # PostCSS configuration for Tailwind
├── svelte.config.js              # SvelteKit configuration
├── tailwind.config.js            # Tailwind CSS v4 configuration
├── tsconfig.json                 # TypeScript configuration (strict mode)
├── vite.config.js                # Vite build + Vitest configuration
└── README.md                     # Project documentation
```

---

## Frontend Structure (`src/`)

### Complete Directory Tree

```
src/
├── lib/                          # Shared library code
│   ├── api/                      # Tauri command wrappers
│   │   └── projects.ts           # Project CRUD API
│   │
│   ├── components/               # Svelte components
│   │   ├── projects/            # Domain: Project management
│   │   │   ├── EmptyState.svelte
│   │   │   ├── EmptyState.test.ts
│   │   │   ├── ProjectCard.svelte
│   │   │   └── ProjectCard.test.ts
│   │   │
│   │   └── ui/                  # Reusable UI components
│   │       ├── badge/
│   │       │   ├── badge.svelte
│   │       │   ├── badge.test.ts
│   │       │   └── index.ts     # Barrel export
│   │       │
│   │       ├── button/
│   │       │   ├── button.svelte
│   │       │   ├── button.test.ts
│   │       │   └── index.ts
│   │       │
│   │       ├── card/
│   │       │   ├── card-content.svelte
│   │       │   ├── card-description.svelte
│   │       │   ├── card-footer.svelte
│   │       │   ├── card-header.svelte
│   │       │   ├── card-title.svelte
│   │       │   ├── card.svelte
│   │       │   ├── card.test.ts
│   │       │   └── index.ts     # Exports Card, CardHeader, CardTitle, etc.
│   │       │
│   │       ├── checkbox/
│   │       │   ├── checkbox.svelte
│   │       │   ├── checkbox.test.ts
│   │       │   └── index.ts
│   │       │
│   │       ├── container/
│   │       │   ├── container.svelte
│   │       │   ├── container.test.ts
│   │       │   └── index.ts
│   │       │
│   │       ├── dialog/
│   │       │   ├── dialog-close.svelte
│   │       │   ├── dialog-content.svelte
│   │       │   ├── dialog-description.svelte
│   │       │   ├── dialog-footer.svelte
│   │       │   ├── dialog-header.svelte
│   │       │   ├── dialog-overlay.svelte
│   │       │   ├── dialog-portal.svelte
│   │       │   ├── dialog-title.svelte
│   │       │   ├── dialog.svelte
│   │       │   ├── dialog.test.ts
│   │       │   └── index.ts
│   │       │
│   │       ├── form/
│   │       │   ├── form-control.svelte
│   │       │   ├── form-description.svelte
│   │       │   ├── form-field-errors.svelte
│   │       │   ├── form-field.svelte
│   │       │   ├── form-label.svelte
│   │       │   ├── form.svelte
│   │       │   ├── form.test.ts
│   │       │   └── index.ts
│   │       │
│   │       ├── header/
│   │       │   ├── header.svelte
│   │       │   ├── header.test.ts
│   │       │   └── index.ts
│   │       │
│   │       ├── icon/
│   │       │   ├── icon.svelte
│   │       │   ├── icon.test.ts
│   │       │   └── index.ts
│   │       │
│   │       ├── input/
│   │       │   ├── input.svelte
│   │       │   ├── input.test.ts
│   │       │   └── index.ts
│   │       │
│   │       ├── label/
│   │       │   ├── label.svelte
│   │       │   ├── label.test.ts
│   │       │   └── index.ts
│   │       │
│   │       ├── select/
│   │       │   ├── select-content.svelte
│   │       │   ├── select-item-indicator.svelte
│   │       │   ├── select-item.svelte
│   │       │   ├── select-trigger.svelte
│   │       │   ├── select.svelte
│   │       │   ├── select.test.ts
│   │       │   └── index.ts
│   │       │
│   │       ├── sidebar/
│   │       │   ├── sidebar.svelte
│   │       │   └── index.ts
│   │       │
│   │       ├── spinner/
│   │       │   ├── spinner.svelte
│   │       │   ├── spinner.test.ts
│   │       │   └── index.ts
│   │       │
│   │       ├── switch/
│   │       │   ├── switch.svelte
│   │       │   ├── switch.test.ts
│   │       │   └── index.ts
│   │       │
│   │       ├── textarea/
│   │       │   ├── textarea.svelte
│   │       │   ├── textarea.test.ts
│   │       │   └── index.ts
│   │       │
│   │       └── tooltip/
│   │           ├── tooltip-arrow.svelte
│   │           ├── tooltip-content.svelte
│   │           ├── tooltip-trigger.svelte
│   │           ├── tooltip.svelte
│   │           ├── tooltip.test.ts
│   │           └── index.ts
│   │
│   ├── utils/                    # Utility functions
│   │   ├── formatDate.ts        # Date formatting helper
│   │   ├── formatDate.test.ts   # Unit tests
│   │   └── cn.ts                # Class name utility (clsx + tailwind-merge)
│   │
│   └── __tests__/               # Shared test utilities
│       └── setup.ts             # Test environment setup
│
├── routes/                       # SvelteKit file-based routing
│   ├── +layout.svelte           # Root layout (imports global CSS)
│   ├── +page.svelte             # Home page (recent projects list)
│   └── dev/                     # Development-only routes
│       └── design-system/
│           └── +page.svelte     # UI component showcase
│
├── app.css                       # Global styles (Tailwind + Fluent Design tokens)
└── app.html                      # HTML template (Tauri entry point)
```

---

## Backend Structure (`src-tauri/`)

### Complete Directory Tree

```
src-tauri/
├── src/                          # Rust source code
│   ├── main.rs                  # Binary entry point (calls lib.rs::run())
│   ├── lib.rs                   # Library entry point (app initialization)
│   │
│   └── db/                      # Database layer
│       ├── mod.rs               # Module exports, public init() function
│       ├── connection.rs        # SQLite connection management
│       ├── error.rs             # Error types (thiserror)
│       ├── migrations.rs        # Refinery migration runner
│       ├── projects.rs          # Project CRUD implementation
│       │
│       ├── commands/            # Tauri command handlers
│       │   ├── mod.rs          # Command module exports
│       │   ├── database_commands.rs  # get_database_status command
│       │   └── project_commands.rs   # Project CRUD commands
│       │
│       └── models/              # Data structures
│           ├── mod.rs          # Model module exports
│           └── project.rs      # Project & NewProject structs
│
├── migrations/                   # SQL migration files (Refinery)
│   ├── V1__init_schema.sql     # Initial schema (refinery tracking table)
│   └── V2__create_projects_schema.sql  # Projects table + indexes + triggers
│
├── target/                       # Rust build output (gitignored)
├── Cargo.toml                    # Rust dependencies and crate metadata
├── Cargo.lock                    # Rust dependency lock file
├── build.rs                      # Tauri build script
└── tauri.conf.json              # Tauri configuration (app metadata, windows, etc.)
```

---

## Test Structure (`tests/`)

```
tests/
└── e2e/                          # Playwright end-to-end tests
    ├── home.spec.ts             # Home screen tests
    └── launch.spec.ts           # App launch tests
```

---

## Key File Details

### Configuration Files

| File | Purpose | Key Settings |
|------|---------|--------------|
| `package.json` | Frontend dependencies & scripts | `type: "module"`, scripts: `dev`, `build`, `test`, `test:e2e`, `tauri` |
| `pnpm-workspace.yaml` | pnpm workspace (empty, reserves for future monorepo) | - |
| `svelte.config.js` | SvelteKit configuration | `adapter-static` with `fallback: "index.html"` for SPA mode |
| `vite.config.js` | Vite + Vitest config | Svelte plugin, port 1420, jsdom test environment |
| `tsconfig.json` | TypeScript configuration | `strict: true`, `moduleResolution: "bundler"` |
| `tailwind.config.js` | Tailwind v4 configuration | PostCSS-only, custom Fluent Design tokens |
| `playwright.config.ts` | Playwright E2E configuration | Base URL: `http://localhost:1420`, Chromium only |
| `src-tauri/Cargo.toml` | Rust dependencies | Tauri v2, rusqlite, refinery, serde, thiserror, log |
| `src-tauri/tauri.conf.json` | Tauri app configuration | App metadata, window settings, IPC security |

---

## Component Organization Patterns

### UI Component Folder Structure
Each UI component follows this pattern:
```
component-name/
├── component-name.svelte        # Main component
├── component-name-subpart.svelte  # Sub-components (if composite)
├── component-name.test.ts       # Unit tests (Vitest)
└── index.ts                     # Barrel export (named + aliased)
```

**Barrel Export Example (`index.ts`):**
```typescript
import Root from "./card.svelte";
import Content from "./card-content.svelte";
import Header from "./card-header.svelte";
// ...

export {
    Root,
    Content,
    Header,
    // Aliased exports for convenience
    Root as Card,
    Content as CardContent,
    Header as CardHeader,
};
```

### Domain Component Organization
Domain-specific components (e.g., `projects/`) co-locate with related logic:
```
projects/
├── EmptyState.svelte            # Empty state UI
├── EmptyState.test.ts          # Unit tests
├── ProjectCard.svelte          # Project list item
└── ProjectCard.test.ts         # Unit tests
```

---

## Import Patterns

### SvelteKit `$lib` Alias
```typescript
// Always use $lib for internal imports
import { Button } from "$lib/components/ui/button";
import { cn } from "$lib/utils/cn";
import { listRecentProjects } from "$lib/api/projects";
```

### Tauri API Imports
```typescript
// Correct: Use specific subpaths
import { invoke } from "@tauri-apps/api/core";

// Wrong: Deprecated path
import { invoke } from "@tauri-apps/api/tauri";
```

### Type-Only Imports
```typescript
// Use type-only imports to avoid runtime bloat
import type { Project } from "$lib/api/projects";
```

---

## File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Svelte components | kebab-case | `button.svelte`, `project-card.svelte` |
| TypeScript/JavaScript | kebab-case | `format-date.ts`, `utils.ts` |
| Test files | Match source + `.test.ts` | `button.test.ts`, `utils.test.ts` |
| Barrel exports | Always `index.ts` | `components/ui/button/index.ts` |
| SvelteKit routes | SvelteKit convention | `+page.svelte`, `+layout.svelte` |
| Rust files | snake_case | `projects.rs`, `database_commands.rs` |
| SQL migrations | Refinery convention | `V1__init_schema.sql`, `V2__create_projects_schema.sql` |

---

## Critical Files for AI Agents

| File | Purpose | When to Read |
|------|---------|--------------|
| `_bmad-output/project-context.md` | **Implementation rules** | Before writing ANY code |
| `src/lib/api/projects.ts` | **Tauri command wrappers** | When adding new backend features |
| `src/lib/utils/cn.ts` | **Class name utility** | When styling components |
| `src-tauri/src/lib.rs` | **Command registration** | When adding new Tauri commands |
| `src-tauri/src/db/models/project.rs` | **Data model validation** | When modifying project schema |
| `src-tauri/migrations/*.sql` | **Database schema** | When adding new tables/columns |

---

## Dependency Locations

### Frontend Dependencies
- **Installed:** `node_modules/` (pnpm)
- **Lockfile:** `pnpm-lock.yaml`
- **Definition:** `package.json`

### Backend Dependencies
- **Installed:** `src-tauri/target/` (Cargo)
- **Lockfile:** `src-tauri/Cargo.lock`
- **Definition:** `src-tauri/Cargo.toml`

---

## Build Artifacts

### Development
- **Vite Dev Server:** Runs on port 1420
- **Tauri Dev Mode:** Builds Rust in debug mode, runs webview

### Production Build
- **Frontend:** `build/` (SvelteKit static output)
- **Backend:** `src-tauri/target/release/` (Rust binary)
- **Final App:** Platform-specific installer in `src-tauri/target/release/bundle/`

---

## Ignored Files (`.gitignore`)

- `node_modules/`
- `build/`
- `test-results/`
- `playwright-report/`
- `src-tauri/target/`
- `.svelte-kit/`
- `.env*`

---

## Navigation Quick Reference

| Task | File(s) |
|------|---------|
| Add new UI component | `src/lib/components/ui/[name]/` |
| Add new page | `src/routes/+page.svelte` |
| Modify layout | `src/routes/+layout.svelte` |
| Add Tauri command | `src-tauri/src/db/commands/*.rs` + register in `lib.rs` |
| Modify database schema | Create new migration in `src-tauri/migrations/V*__.sql` |
| Add utility function | `src/lib/utils/[name].ts` |
| Write unit test | Co-locate with source: `[name].test.ts` |
| Write E2E test | `tests/e2e/[name].spec.ts` |
| Modify global styles | `src/app.css` |
| Configure TypeScript | `tsconfig.json` |
| Configure Tailwind | `tailwind.config.js` |

---

**Last Updated:** 2025-12-29
