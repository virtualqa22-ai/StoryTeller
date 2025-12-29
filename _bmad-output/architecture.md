# StoryTeller Architecture

**Generated:** 2025-12-29
**Architecture Type:** Desktop Application - Three-Layer Architecture with IPC Bridge

---

## Architecture Overview

StoryTeller follows a **three-layer architecture** optimized for desktop applications:

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│  (SvelteKit SPA - Client-Side Rendering)                    │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  UI          │  │  Routes      │  │  Components  │     │
│  │  Components  │  │  (Pages)     │  │  (Domain)    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│          │                 │                 │              │
│          └─────────────────┴─────────────────┘              │
│                         │                                    │
│                  ┌──────▼──────┐                            │
│                  │  API Layer  │                            │
│                  │  (Tauri     │                            │
│                  │   Invoke)   │                            │
│                  └──────┬──────┘                            │
└─────────────────────────┼─────────────────────────────────┘
                          │
            ┌─────────────▼─────────────┐
            │  IPC BRIDGE (Tauri Core)  │
            │  (Serialization/Security)  │
            └─────────────┬─────────────┘
                          │
┌─────────────────────────▼─────────────────────────────────┐
│                   APPLICATION LAYER                        │
│  (Rust/Tauri - Business Logic & Native Integration)       │
│                                                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │  Commands    │  │  Business    │  │  Native      │   │
│  │  (Handlers)  │  │  Logic       │  │  APIs        │   │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘   │
│         │                 │                 │             │
│         └─────────────────┴─────────────────┘             │
│                       │                                    │
└───────────────────────┼───────────────────────────────────┘
                        │
┌───────────────────────▼───────────────────────────────────┐
│                    DATA LAYER                              │
│  (SQLite - Persistent Storage)                            │
│                                                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │  Projects    │  │  Migrations  │  │  Indexes     │   │
│  │  Table       │  │  (Refinery)  │  │  & Triggers  │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
└───────────────────────────────────────────────────────────┘
```

---

## Layer Details

### 1. Presentation Layer (Frontend)

**Technology:** SvelteKit 2.9.0 + Svelte 5.0.0 + TypeScript

**Responsibilities:**
- User interface rendering
- User input handling
- Client-side state management
- Routing and navigation

**Key Patterns:**
- **SPA Mode:** Client-side rendering only (no SSR)
- **Component-Based:** Atomic design with ui/ and domain/ components
- **Runes-Based Reactivity:** Svelte 5 modern reactivity (`$state`, `$effect`, `$derived`)
- **Type-Safe:** TypeScript strict mode

**Structure:**
```
src/
├── routes/                      # Pages (file-based routing)
│   ├── +layout.svelte          # Root layout
│   └── +page.svelte            # Home page
│
├── lib/
│   ├── api/                    # Tauri command wrappers
│   ├── components/
│   │   ├── ui/                 # Reusable UI components (22 components)
│   │   └── projects/          # Domain-specific components
│   └── utils/                  # Utility functions
```

**Communication:**
- Calls Tauri commands via `invoke<T>(command, params)`
- Receives serialized JSON responses via Tauri bridge

---

### 2. Application Layer (Backend)

**Technology:** Rust 2021 Edition + Tauri v2

**Responsibilities:**
- Business logic execution
- Data validation
- Database operations
- Native OS integration
- Security and sandboxing

**Key Patterns:**
- **Command Pattern:** All frontend requests handled via Tauri commands
- **Result-Based Error Handling:** `Result<T, E>` for explicit error propagation
- **Graceful Degradation:** Non-critical failures log warnings but don't crash
- **Dependency Injection:** Database connection passed to command handlers

**Structure:**
```
src-tauri/src/
├── lib.rs                      # App initialization, command registration
├── main.rs                     # Binary entry point
└── db/
    ├── commands/               # Command handlers (Tauri IPC)
    │   ├── database_commands.rs
    │   └── project_commands.rs
    ├── connection.rs           # SQLite connection management
    ├── migrations.rs           # Migration runner
    ├── projects.rs             # CRUD implementation
    ├── models/                 # Data structures
    │   └── project.rs
    └── error.rs                # Error types
```

**Communication:**
- Receives commands from frontend via Tauri IPC
- Queries SQLite database via `rusqlite`
- Returns serialized results via `serde`

---

### 3. Data Layer (Database)

**Technology:** SQLite 3 with WAL mode

**Responsibilities:**
- Persistent data storage
- Data integrity (constraints, triggers)
- Query optimization (indexes)
- Schema versioning (migrations)

**Key Patterns:**
- **Migration-Based Schema:** Refinery tracks schema versions
- **Parameterized Queries:** SQL injection protection
- **WAL Mode:** Write-Ahead Logging for better performance
- **Automatic Timestamps:** Triggers update `updated_at` on changes

**Structure:**
```
src-tauri/migrations/
├── V1__init_schema.sql         # Refinery tracking table
└── V2__create_projects_schema.sql  # Projects table + indexes + triggers
```

**Schema:**
- **projects** table: 19 columns (metadata, timestamps, paths)
- **Indexes:** `last_opened_at DESC`, `created_at DESC`
- **Triggers:** Auto-update `updated_at` on row modification

---

## Cross-Layer Communication (IPC Bridge)

### Tauri IPC Architecture

```
Frontend                          Backend
┌────────────┐                   ┌────────────┐
│  invoke()  │──── Command ────▶│  Handler   │
│            │                   │  Function  │
│            │◀─── Result ──────│            │
└────────────┘                   └────────────┘
     ▲                                 │
     │         Serialization           │
     │         (serde_json)             │
     └──────────────┬──────────────────┘
                    │
              Tauri Core
         (Security, Threading)
```

### Command Registration (src-tauri/src/lib.rs)
```rust
tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
        greet,
        get_database_status,
        create_project,
        get_project,
        get_project_by_path,
        list_recent_projects,
        update_project_metadata,
        update_last_opened,
        delete_project,
    ])
    .run(tauri::generate_context!())
```

### Type-Safe Wrappers (src/lib/api/projects.ts)
```typescript
export async function listRecentProjects(limit?: number): Promise<Project[]> {
    return await invoke<Project[]>("list_recent_projects", { limit });
}
```

---

## Design Patterns

### 1. Repository Pattern (Data Access)
**Location:** `src-tauri/src/db/projects.rs`

**Purpose:** Encapsulate database operations

**Example:**
```rust
pub fn create(conn: &Connection, project: &NewProject) -> Result<i64, DbError> {
    // SQL query logic
}

pub fn find_by_id(conn: &Connection, id: i64) -> Result<Project, DbError> {
    // SQL query logic
}
```

### 2. Command Pattern (IPC)
**Location:** `src-tauri/src/db/commands/project_commands.rs`

**Purpose:** Handle frontend requests

**Example:**
```rust
#[tauri::command]
pub async fn create_project(project_data: NewProject) -> Result<i64, String> {
    let conn = open_connection().map_err(|e| e.to_string())?;
    projects::create(&conn, &project_data).map_err(|e| e.to_string())
}
```

### 3. Error Handling Strategy

**Rust Side:**
- Use `thiserror` for domain errors
- Return `Result<T, DbError>` from repository layer
- Convert to `Result<T, String>` at command layer (serializable)

**Frontend Side:**
- Wrap `invoke()` in try-catch blocks
- Display user-friendly error messages
- Log errors for debugging

### 4. Graceful Degradation
**Location:** `src-tauri/src/lib.rs::init_database()`

**Pattern:**
```rust
match db::init() {
    Ok(_) => log::info!("Database initialized"),
    Err(e) => {
        log::error!("Database init failed: {}", e);
        // App continues running with limited functionality
    }
}
```

---

## Data Flow Examples

### Example 1: Fetching Recent Projects

```
┌─────────────┐
│ +page.svelte│ (Home Page)
└──────┬──────┘
       │ $effect() lifecycle
       │
       ▼
┌─────────────────────┐
│ listRecentProjects()│ (API Wrapper)
└──────┬──────────────┘
       │ invoke<Project[]>("list_recent_projects", { limit: 10 })
       │
       ▼
┌──────────────────────────┐
│ list_recent_projects()   │ (Tauri Command)
└──────┬───────────────────┘
       │ projects::list_recent()
       │
       ▼
┌──────────────────────────┐
│ projects.rs::list_recent()│ (Repository)
└──────┬───────────────────┘
       │ SQL: SELECT * FROM projects ORDER BY last_opened_at DESC LIMIT ?
       │
       ▼
┌──────────────┐
│ SQLite DB    │
└──────┬───────┘
       │ Rows
       │
       ▼ (Return path: serialize → IPC → update UI)
```

### Example 2: Creating a New Project

```
User Input (Form)
       │
       ▼
┌─────────────────────┐
│ createProject()     │ (API Wrapper)
└──────┬──────────────┘
       │ invoke<number>("create_project", { project_data })
       │
       ▼
┌──────────────────────────┐
│ create_project()         │ (Tauri Command)
│ - Validates input        │
└──────┬───────────────────┘
       │ projects::create()
       │
       ▼
┌──────────────────────────┐
│ projects.rs::create()    │ (Repository)
│ - Executes INSERT        │
│ - Returns ROWID          │
└──────┬───────────────────┘
       │ SQL: INSERT INTO projects VALUES (...)
       │
       ▼
┌──────────────┐
│ SQLite DB    │
│ - Trigger fires (set updated_at) │
└──────┬───────┘
       │ Row ID
       │
       ▼ (Return path: serialize → IPC → success callback)
```

---

## Security Architecture

### 1. Tauri Security Model
- **IPC Allowlist:** Only registered commands can be invoked
- **CSP Headers:** Content Security Policy prevents XSS
- **No Node.js APIs:** Frontend is sandboxed webview (no fs, child_process, etc.)

### 2. SQL Injection Protection
- **Parameterized Queries:** All SQL uses `rusqlite::params![]`
- **No String Concatenation:** Never build SQL with user input strings

**Example:**
```rust
// Safe
conn.query_row(
    "SELECT * FROM projects WHERE id = ?",
    params![id],
    |row| Ok(Project::from(row))
)

// NEVER DO THIS
let query = format!("SELECT * FROM projects WHERE id = {}", id); // UNSAFE
```

### 3. Input Validation
- **Frontend:** TypeScript type checking
- **Backend:** Rust struct validation (`Project::validate()`)

---

## Performance Optimizations

### Database
- **WAL Mode:** Better concurrent read/write performance
- **Indexes:** `last_opened_at`, `created_at` columns indexed
- **Connection Reuse:** Single connection per operation (stateless)

### Frontend
- **Code Splitting:** SvelteKit automatic route-based splitting
- **Lazy Loading:** Components loaded on demand
- **Class Name Optimization:** `cn()` utility caches merged classes

### Build
- **Vite HMR:** Fast development feedback (<100ms updates)
- **Rust Release Mode:** Optimized binary (~5MB after strip)

---

## Scalability Considerations

### Current State (Single-User Desktop App)
- **Database:** SQLite (sufficient for thousands of projects)
- **State:** Component-local (no global store)
- **Concurrency:** Single-threaded SQLite with WAL mode

### Future Extensions
- **Cloud Sync:** Add cloud backend API (keep local-first)
- **Collaboration:** Multi-user support (introduce CRDT or OT)
- **Plugin System:** Tauri plugin API for extensibility

---

## Technology Constraints

### Tauri-Specific
- **Port 1420:** Vite dev server must use this port (strictPort: true)
- **Static Adapter:** SvelteKit must build static SPA (no SSR)
- **Command Registration:** New Rust commands must be added to `generate_handler![]` macro

### Svelte 5-Specific
- **Runes Required:** Must use `$props()`, `$state()`, not legacy syntax
- **Snippet Type:** Use `Snippet` for render props, not `<slot>`

### SQLite-Specific
- **File Locking:** Only one writer at a time (WAL mode helps)
- **Platform Paths:** Use `dirs` crate for cross-platform app data directory

---

## Architecture Decision Records (ADRs)

### ADR-001: Why SPA Mode?
**Decision:** Use SvelteKit with adapter-static (SPA mode)
**Rationale:** Tauri requires client-side rendering; SSR not supported in desktop apps
**Trade-offs:** No SEO benefits, but not needed for desktop app

### ADR-002: Why SQLite?
**Decision:** Use embedded SQLite database
**Rationale:** Local-first, no server required, sufficient performance
**Trade-offs:** Not suitable for multi-user (future: add cloud sync layer)

### ADR-003: Why Svelte 5 Runes?
**Decision:** Use modern Svelte 5 runes-based reactivity
**Rationale:** Better performance, simpler mental model, future-proof
**Trade-offs:** Breaking change from Svelte 4, steeper learning curve

### ADR-004: Why Rust for Backend?
**Decision:** Use Rust + Tauri for desktop backend
**Rationale:** Native performance, memory safety, cross-platform
**Trade-offs:** Longer compile times, Rust learning curve

---

## Component Interaction Diagram

```
┌───────────────────────────────────────────────────────────┐
│                    Frontend (Browser)                      │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐     │
│  │  +page.      │   │  Project    │   │  Button     │     │
│  │  svelte      │──▶│  Card       │──▶│  Component  │     │
│  └──────┬───────┘   └─────────────┘   └─────────────┘     │
│         │ calls                                            │
│         ▼                                                  │
│  ┌─────────────┐                                          │
│  │  projects.  │                                          │
│  │  ts (API)   │                                          │
│  └──────┬───────┘                                          │
└─────────┼──────────────────────────────────────────────────┘
          │ invoke()
          │
┌─────────▼──────────────────────────────────────────────────┐
│                    Backend (Rust)                           │
│  ┌─────────────┐                                           │
│  │  Tauri      │                                           │
│  │  Core       │                                           │
│  └──────┬───────┘                                           │
│         │ routes to                                        │
│         ▼                                                  │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐     │
│  │  project_   │──▶│  projects.  │──▶│  connection │     │
│  │  commands.rs│   │  rs (repo)  │   │  .rs        │     │
│  └─────────────┘   └─────────────┘   └──────┬───────┘     │
└────────────────────────────────────────────────┼───────────┘
                                                 │
┌────────────────────────────────────────────────▼───────────┐
│                    Database (SQLite)                        │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐     │
│  │  projects   │   │  Indexes    │   │  Triggers   │     │
│  │  table      │   │  (perf)     │   │  (auto-update)  │  │
│  └─────────────┘   └─────────────┘   └─────────────┘     │
└───────────────────────────────────────────────────────────┘
```

---

**Last Updated:** 2025-12-29
