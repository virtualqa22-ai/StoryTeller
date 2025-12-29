# StoryTeller Development Guide

**Generated:** 2025-12-29
**For:** Developers working on the StoryTeller codebase

---

## Quick Start

### Prerequisites
- **Node.js 18+** (recommended: 20.x)
- **pnpm 8+** (package manager)
- **Rust 1.70+** (for Tauri backend)
- **Visual Studio C++ Build Tools** (Windows) or **Xcode** (macOS) or **build-essential** (Linux)

### Initial Setup
```bash
# Clone repository
git clone <repository-url>
cd StoryTeller

# Install frontend dependencies
pnpm install

# Verify Rust installation
rustc --version
cargo --version

# Install Tauri CLI (if not already installed)
pnpm add -g @tauri-apps/cli

# Run development mode
pnpm tauri dev
```

---

## Development Workflow

### Running the Application

#### Development Mode (Hot Reload)
```bash
# Start both Vite dev server and Tauri app
pnpm tauri dev

# Or run frontend only (no desktop app)
pnpm dev
```

**Note:** Dev server runs on port 1420 (Tauri requirement, strictPort: true).

#### Production Build
```bash
# Build web assets
pnpm build

# Build desktop application (creates installer)
pnpm tauri build
```

**Output:** Platform-specific installer in `src-tauri/target/release/bundle/`

---

### Code Quality Checks

#### TypeScript & Svelte Validation
```bash
# Check types and Svelte syntax
pnpm check

# Watch mode (continuous checking)
pnpm check:watch
```

#### Unit Tests
```bash
# Run all unit tests (Vitest)
pnpm test

# Watch mode
pnpm test:watch

# With UI
pnpm test:ui
```

#### End-to-End Tests
```bash
# Run Playwright E2E tests
pnpm test:e2e

# Debug mode (headed browser)
pnpm test:e2e --debug

# Specific test file
pnpm test:e2e tests/e2e/home.spec.ts
```

#### Rust Tests
```bash
# Run Rust unit tests
cd src-tauri
cargo test

# With output
cargo test -- --nocapture
```

---

## Project Structure

### Frontend (`src/`)

```
src/
├── lib/                         # Shared library code
│   ├── api/                     # Tauri command wrappers
│   ├── components/
│   │   ├── ui/                  # Reusable UI components
│   │   └── projects/           # Domain components
│   └── utils/                   # Utility functions
├── routes/                      # SvelteKit pages
│   ├── +layout.svelte          # Root layout
│   └── +page.svelte            # Home page
└── app.css                      # Global styles
```

### Backend (`src-tauri/`)

```
src-tauri/
├── src/
│   ├── lib.rs                  # App initialization
│   ├── main.rs                 # Entry point
│   └── db/                     # Database layer
│       ├── commands/           # Tauri command handlers
│       ├── models/             # Data structures
│       ├── connection.rs       # SQLite connection
│       ├── migrations.rs       # Migration runner
│       └── projects.rs         # CRUD operations
└── migrations/                  # SQL migration files
```

---

## Common Tasks

### Adding a New UI Component

**Steps:**
1. Create component folder: `src/lib/components/ui/my-component/`
2. Create files:
   - `my-component.svelte` (component logic)
   - `my-component.test.ts` (unit tests)
   - `index.ts` (barrel export)

**Example `my-component.svelte`:**
```svelte
<script lang="ts">
import { cn } from "$lib/utils";

interface Props {
    variant?: "default" | "primary";
    class?: string;
    [key: string]: any;
}

let { variant = "default", class: className, ...rest }: Props = $props();

const variantClasses = {
    default: "bg-gray-100 text-gray-900",
    primary: "bg-primary text-primary-foreground"
};
</script>

<div class={cn(variantClasses[variant], className)} {...rest}>
    {@render children?.()}
</div>
```

**Example `index.ts`:**
```typescript
import Root from "./my-component.svelte";

export { Root, Root as MyComponent };
```

**Example `my-component.test.ts`:**
```typescript
import { render, screen } from "@testing-library/svelte";
import { describe, it, expect } from "vitest";
import MyComponent from "./my-component.svelte";

describe("MyComponent", () => {
    it("renders with default variant", () => {
        render(MyComponent, { props: { children: "Test" } });
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("applies primary variant classes", () => {
        const { container } = render(MyComponent, {
            props: { variant: "primary" }
        });
        expect(container.firstChild).toHaveClass("bg-primary");
    });
});
```

---

### Adding a New Tauri Command

**Steps:**

1. **Define Rust function** in appropriate command file (e.g., `src-tauri/src/db/commands/project_commands.rs`)

```rust
#[tauri::command]
pub async fn my_new_command(param: String) -> Result<String, String> {
    // Your logic here
    Ok(format!("Processed: {}", param))
}
```

2. **Register command** in `src-tauri/src/lib.rs`

```rust
tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
        greet,
        // ... existing commands
        my_new_command,  // ADD HERE
    ])
    .run(tauri::generate_context!())
```

3. **Add TypeScript wrapper** in `src/lib/api/` (optional but recommended)

```typescript
// src/lib/api/my-module.ts
import { invoke } from "@tauri-apps/api/core";

export async function myNewCommand(param: string): Promise<string> {
    return await invoke<string>("my_new_command", { param });
}
```

4. **Use in component**

```svelte
<script lang="ts">
import { myNewCommand } from "$lib/api/my-module";

async function handleClick() {
    const result = await myNewCommand("test");
    console.log(result);
}
</script>
```

---

### Adding a Database Migration

**Steps:**

1. **Create migration file:** `src-tauri/migrations/V3__description.sql`

```sql
-- V3__add_new_field.sql
ALTER TABLE projects ADD COLUMN new_field TEXT;
```

2. **Rebuild app** (migrations are embedded at compile time)

```bash
cd src-tauri
cargo build
```

3. **Test migration** (runs automatically on next app launch)

```bash
pnpm tauri dev
```

**Important:**
- Migrations run ONCE per database
- Cannot modify existing migrations after they're applied
- Always test migrations on a copy of production database

---

### Adding a New Route (Page)

**Steps:**

1. **Create route file:** `src/routes/my-page/+page.svelte`

```svelte
<script lang="ts">
// Page logic
</script>

<h1>My New Page</h1>
```

2. **Navigate to route**

```svelte
<a href="/my-page">Go to My Page</a>
```

**Note:** SvelteKit uses file-based routing. File `src/routes/my-page/+page.svelte` creates route `/my-page`.

---

## Code Style Guide

### TypeScript

#### Import Order
1. External libraries
2. Tauri APIs
3. Local modules (`$lib/`)
4. Types (use `import type`)

```typescript
import { invoke } from "@tauri-apps/api/core";
import { Button } from "$lib/components/ui/button";
import type { Project } from "$lib/api/projects";
```

#### Naming Conventions
- **Variables/Functions:** camelCase (`myVariable`, `fetchData`)
- **Types/Interfaces:** PascalCase (`Project`, `ButtonProps`)
- **Constants:** SCREAMING_SNAKE_CASE (`MAX_RETRIES`)
- **Files:** kebab-case (`format-date.ts`, `button.svelte`)

---

### Svelte 5

#### Component Props (Runes)
```svelte
<script lang="ts">
interface Props {
    title: string;
    count?: number;
    children?: Snippet;
}

// Use $props() rune (NOT export let)
let { title, count = 0, children }: Props = $props();
</script>
```

#### Reactive State
```svelte
<script lang="ts">
// Use $state() for reactive variables
let count = $state(0);

// Use $derived() for computed values
let doubled = $derived(count * 2);

// Use $effect() for side effects
$effect(() => {
    console.log("Count changed:", count);
});
</script>
```

#### Rendering Children
```svelte
<!-- Use {@render} for Snippet children -->
{#if typeof children === "function"}
    {@render children()}
{:else}
    {children}
{/if}
```

---

### Rust

#### Function Naming
- snake_case for functions
- PascalCase for types/structs

```rust
pub fn create_project(conn: &Connection, project: &NewProject) -> Result<i64, DbError> {
    // ...
}

pub struct Project {
    pub id: i64,
    // ...
}
```

#### Error Handling
```rust
use thiserror::Error;

#[derive(Error, Debug)]
pub enum DbError {
    #[error("Database error: {0}")]
    SqliteError(#[from] rusqlite::Error),

    #[error("Project not found with id {0}")]
    ProjectNotFound(i64),
}
```

---

## Testing Guide

### Unit Testing (Vitest)

#### Component Tests
```typescript
import { render, screen } from "@testing-library/svelte";
import { describe, it, expect } from "vitest";
import Button from "./button.svelte";

describe("Button", () => {
    it("renders with text", () => {
        render(Button, { props: { children: "Click me" } });
        expect(screen.getByRole("button")).toHaveTextContent("Click me");
    });

    it("applies custom class", () => {
        const { container } = render(Button, {
            props: { class: "custom-class" }
        });
        expect(container.firstChild).toHaveClass("custom-class");
    });
});
```

#### Utility Tests
```typescript
import { describe, it, expect } from "vitest";
import { formatDate } from "./formatDate";

describe("formatDate", () => {
    it("formats ISO date to readable string", () => {
        const result = formatDate("2025-12-29T12:00:00Z");
        expect(result).toBe("Dec 29, 2025");
    });
});
```

---

### E2E Testing (Playwright)

#### Page Tests
```typescript
import { test, expect } from "@playwright/test";

test.describe("Home Screen", () => {
    test("displays empty state when no projects", async ({ page }) => {
        await page.goto("/");
        await expect(page.locator("[data-testid='empty-state']")).toBeVisible();
    });

    test("displays recent projects list", async ({ page }) => {
        // TODO: Seed database with test data
        await page.goto("/");
        await expect(page.locator("[data-testid='projects-grid']")).toBeVisible();
    });
});
```

#### Selectors Strategy
1. **data-testid** for major UI elements
2. **role-based** for accessibility (`getByRole("button")`)
3. **text content** as last resort

---

### Rust Testing

#### Unit Tests
```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_create_project() {
        let conn = Connection::open_in_memory().unwrap();
        // ... test logic
    }
}
```

#### Integration Tests
```rust
// tests/integration_test.rs
use storyteller_lib::db;

#[test]
fn test_full_workflow() {
    // Test complete CRUD workflow
}
```

---

## Debugging

### Frontend Debugging

#### Browser DevTools
- Open DevTools in Tauri app: `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Option+I` (macOS)
- Console logs appear in DevTools console
- Network tab shows Tauri IPC calls

#### Svelte DevTools
- Install Svelte DevTools browser extension (works in Tauri)
- Inspect component state and props

---

### Backend Debugging

#### Logging
```rust
use log::{info, warn, error};

info!("Project created: {}", id);
warn!("Database connection slow");
error!("Failed to create project: {}", err);
```

**View logs:** Check terminal where `pnpm tauri dev` is running

#### Rust Debugger
```bash
# Build with debug symbols
cargo build

# Run with debugger (VS Code: F5)
```

---

## Performance Optimization

### Frontend

#### Code Splitting
- SvelteKit automatically splits routes
- Lazy load heavy components:
```typescript
const HeavyComponent = import("./HeavyComponent.svelte");
```

#### Optimize Re-renders
- Use `$derived()` for computed values (memoization)
- Avoid unnecessary `$effect()` calls

---

### Backend

#### Database Queries
- Use indexes for frequent queries
- Limit result sets with `LIMIT`
- Use WAL mode for concurrent reads/writes

#### Tauri Commands
- Keep commands lightweight
- Offload heavy work to background threads (use `tokio::spawn`)

---

## Troubleshooting

### Common Issues

#### Port 1420 Already in Use
```bash
# Kill process using port 1420
# Windows
netstat -ano | findstr :1420
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :1420
kill -9 <PID>
```

#### Tauri Build Fails
```bash
# Clear Rust cache
cd src-tauri
cargo clean
cargo build
```

#### Migration Errors
- Check migration syntax (SQL must be valid SQLite)
- Ensure version numbers are sequential (V1, V2, V3, ...)
- Cannot modify already-applied migrations

---

## Deployment

### Building for Production

```bash
# Build desktop app
pnpm tauri build
```

**Output:**
- **Windows:** `.exe`, `.msi` in `src-tauri/target/release/bundle/`
- **macOS:** `.app`, `.dmg` in `src-tauri/target/release/bundle/`
- **Linux:** `.AppImage`, `.deb` in `src-tauri/target/release/bundle/`

### Code Signing (macOS/Windows)
- Configure signing in `src-tauri/tauri.conf.json`
- Requires developer certificate

---

## Git Workflow

### Branching Strategy
- **master** - Main development branch
- Feature branches: `feature/add-export`
- Bug fixes: `fix/crash-on-startup`

### Commit Messages
Follow Conventional Commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `test:` Tests
- `refactor:` Code refactoring
- `build:` Build system changes

**Example:**
```
feat(projects): add project export functionality

Implement PDF and DOCX export for projects using pandoc.
```

---

## Resources

### Documentation
- [Tauri Docs](https://tauri.app/)
- [SvelteKit Docs](https://kit.svelte.dev/)
- [Svelte 5 Docs](https://svelte-5-preview.vercel.app/)
- [Rust Book](https://doc.rust-lang.org/book/)

### Key Files
- `_bmad-output/project-context.md` - **Implementation rules for AI agents**
- `README.md` - Project overview
- `AUTO-COMMIT-README.md` - Auto-commit script documentation

---

**Last Updated:** 2025-12-29
