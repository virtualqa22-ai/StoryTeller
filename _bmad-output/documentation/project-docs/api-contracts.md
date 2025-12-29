# StoryTeller API Contracts

**Generated:** 2025-12-29
**Protocol:** Tauri IPC (Inter-Process Communication)
**Serialization:** JSON (via serde)

---

## Overview

All communication between the frontend (TypeScript/Svelte) and backend (Rust/Tauri) happens through **Tauri commands**. These commands are registered in `src-tauri/src/lib.rs` and invoked from the frontend using the `invoke()` function.

### Communication Flow
```
Frontend (TypeScript)
    │
    │ invoke<ReturnType>(command, params)
    ▼
Tauri IPC Bridge (JSON serialization)
    │
    ▼
Backend (Rust)
    │
    │ #[tauri::command] function
    ▼
Return Result<T, String>
    │
    ▼
Tauri IPC Bridge (JSON deserialization)
    │
    ▼
Frontend receives Promise<ReturnType>
```

---

## Command Registration

**Location:** `src-tauri/src/lib.rs`

```rust
tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
        greet,                      // Demo command
        get_database_status,        // Database status query
        create_project,             // Create new project
        get_project,                // Get project by ID
        get_project_by_path,        // Get project by file path
        list_recent_projects,       // List recent projects
        update_project_metadata,    // Update project fields
        update_last_opened,         // Update last opened timestamp
        delete_project,             // Delete project by ID
    ])
    .run(tauri::generate_context!())
```

---

## API Reference

### 1. `greet`

**Purpose:** Demo command (returns greeting message)

**Handler:** `src-tauri/src/lib.rs:35`

#### Request
```typescript
invoke<string>("greet", { name: string })
```

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | Yes | Name to greet |

#### Response
```typescript
Promise<string>
```

**Returns:** Greeting message (e.g., "Hello, Alice! You've been greeted from Rust!")

#### Example
```typescript
const message = await invoke<string>("greet", { name: "Alice" });
// Returns: "Hello, Alice! You've been greeted from Rust!"
```

---

### 2. `get_database_status`

**Purpose:** Get database connection status and metadata

**Handler:** `src-tauri/src/db/commands/database_commands.rs:12`

#### Request
```typescript
invoke<DatabaseStatus>("get_database_status")
```

**Parameters:** None

#### Response
```typescript
interface DatabaseStatus {
    path: string;                    // Full path to database file
    exists: boolean;                 // Whether DB file exists
    connected: boolean;              // Whether connection is open
    migration_version: number | null; // Current schema version (null if no migrations)
}
```

#### Example
```typescript
const status = await invoke<DatabaseStatus>("get_database_status");
console.log(status);
// {
//   path: "C:\\Users\\Karan\\AppData\\Local\\StoryTeller\\storyteller.db",
//   exists: true,
//   connected: true,
//   migration_version: 2
// }
```

---

### 3. `create_project`

**Purpose:** Create a new project in the database

**Handler:** `src-tauri/src/db/commands/project_commands.rs:19`

#### Request
```typescript
invoke<number>("create_project", { project_data: NewProject })
```

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `project_data` | NewProject | Yes | Project data object |

**NewProject Type:**
```typescript
interface NewProject {
    title: string;                      // Required, non-empty
    author_name?: string | null;
    pen_name?: string | null;
    tagline?: string | null;            // Max 150 chars
    genre?: string | null;
    subgenre?: string | null;
    target_audience?: string | null;
    tone?: string | null;
    point_of_view?: string | null;
    story_framework?: string | null;
    chapter_count?: number | null;
    target_words_per_chapter?: number | null;
    plot_premise?: string | null;      // Max 2000 chars
    language?: string;                  // Default: "en"
    file_path: string;                  // Required, unique
    last_opened_at?: string | null;    // ISO 8601 timestamp
}
```

#### Response
```typescript
Promise<number>  // Returns project ID (ROWID)
```

#### Errors
- `"Project validation failed: [reason]"` - Invalid input data
- `"Failed to create project: [error]"` - Database error (e.g., duplicate file_path)

#### Example
```typescript
const projectId = await invoke<number>("create_project", {
    project_data: {
        title: "My Novel",
        author_name: "Jane Doe",
        genre: "Fantasy",
        chapter_count: 20,
        file_path: "/path/to/my-novel.story",
        language: "en"
    }
});
// Returns: 1 (project ID)
```

---

### 4. `get_project`

**Purpose:** Retrieve a project by its ID

**Handler:** `src-tauri/src/db/commands/project_commands.rs:30`

#### Request
```typescript
invoke<Project>("get_project", { id: number })
```

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | number | Yes | Project ID (ROWID) |

#### Response
```typescript
Promise<Project>  // See Project type below
```

#### Errors
- `"Project not found with id [id]"` - No project with that ID exists

#### Example
```typescript
const project = await invoke<Project>("get_project", { id: 1 });
console.log(project.title); // "My Novel"
```

---

### 5. `get_project_by_path`

**Purpose:** Retrieve a project by its file path

**Handler:** `src-tauri/src/db/commands/project_commands.rs:41`

#### Request
```typescript
invoke<Project>("get_project_by_path", { path: string })
```

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | string | Yes | Project file path (must match exactly) |

#### Response
```typescript
Promise<Project>
```

#### Errors
- `"Project not found with path [path]"` - No project with that path exists

#### Example
```typescript
const project = await invoke<Project>("get_project_by_path", {
    path: "/path/to/my-novel.story"
});
```

---

### 6. `list_recent_projects`

**Purpose:** List projects ordered by last opened date (most recent first)

**Handler:** `src-tauri/src/db/commands/project_commands.rs:52`

#### Request
```typescript
invoke<Project[]>("list_recent_projects", { limit?: number })
```

**Parameters:**
| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `limit` | number | No | 10 | Maximum number of projects to return |

#### Response
```typescript
Promise<Project[]>  // Array of Project objects
```

**Ordering:** By `last_opened_at DESC` (nulls last), then `created_at DESC`

#### Example
```typescript
// Get 10 most recent projects
const projects = await invoke<Project[]>("list_recent_projects", { limit: 10 });

// Get all projects (pass very large limit)
const allProjects = await invoke<Project[]>("list_recent_projects", { limit: 1000 });
```

---

### 7. `update_project_metadata`

**Purpose:** Update a project's metadata fields

**Handler:** `src-tauri/src/db/commands/project_commands.rs:63`

#### Request
```typescript
invoke<void>("update_project_metadata", { project: Project })
```

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `project` | Project | Yes | Full project object with updated fields |

**Note:** The `id` field identifies which project to update. All other fields are overwritten.

#### Response
```typescript
Promise<void>  // No return value on success
```

#### Errors
- `"Project validation failed: [reason]"` - Invalid data
- `"Failed to update project: [error]"` - Database error

#### Example
```typescript
// Get project first
const project = await invoke<Project>("get_project", { id: 1 });

// Modify fields
project.title = "Updated Title";
project.chapter_count = 25;

// Save changes
await invoke("update_project_metadata", { project });
```

**Note:** The `updated_at` timestamp is automatically updated by a database trigger.

---

### 8. `update_last_opened`

**Purpose:** Update only the `last_opened_at` timestamp for a project

**Handler:** `src-tauri/src/db/commands/project_commands.rs:74`

#### Request
```typescript
invoke<void>("update_last_opened", { id: number })
```

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | number | Yes | Project ID to update |

#### Response
```typescript
Promise<void>
```

**Side Effect:** Sets `last_opened_at` to `CURRENT_TIMESTAMP`

#### Example
```typescript
// User opens project
await invoke("update_last_opened", { id: 1 });
```

---

### 9. `delete_project`

**Purpose:** Delete a project from the database

**Handler:** `src-tauri/src/db/commands/project_commands.rs:85`

#### Request
```typescript
invoke<void>("delete_project", { id: number })
```

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | number | Yes | Project ID to delete |

#### Response
```typescript
Promise<void>
```

#### Errors
- `"Failed to delete project: [error]"` - Database error

**Note:** This does NOT delete the actual project file on disk, only the database record.

#### Example
```typescript
await invoke("delete_project", { id: 1 });
```

---

## Data Types

### Project

**Location (TypeScript):** `src/lib/api/projects.ts`
**Location (Rust):** `src-tauri/src/db/models/project.rs`

```typescript
export interface Project {
    id: number;                             // Primary key
    title: string;                          // Required, non-empty
    author_name: string | null;
    pen_name: string | null;
    tagline: string | null;                 // Max 150 chars
    genre: string | null;
    subgenre: string | null;
    target_audience: string | null;
    tone: string | null;
    point_of_view: string | null;
    story_framework: string | null;
    chapter_count: number | null;
    target_words_per_chapter: number | null;
    plot_premise: string | null;            // Max 2000 chars
    language: string;                       // Default: "en"
    created_at: string;                     // ISO 8601 timestamp (auto-generated)
    updated_at: string;                     // ISO 8601 timestamp (auto-updated)
    file_path: string;                      // Required, unique
    last_opened_at: string | null;          // ISO 8601 timestamp
}
```

### NewProject

**Location (TypeScript):** `src/lib/api/projects.ts`
**Location (Rust):** `src-tauri/src/db/models/project.rs`

```typescript
export interface NewProject {
    title: string;                          // Required
    author_name?: string | null;
    pen_name?: string | null;
    tagline?: string | null;                // Max 150 chars
    genre?: string | null;
    subgenre?: string | null;
    target_audience?: string | null;
    tone?: string | null;
    point_of_view?: string | null;
    story_framework?: string | null;
    chapter_count?: number | null;
    target_words_per_chapter?: number | null;
    plot_premise?: string | null;           // Max 2000 chars
    language?: string;                      // Default: "en"
    file_path: string;                      // Required, must be unique
    last_opened_at?: string | null;         // ISO 8601 timestamp
}
```

**Note:** Omits `id`, `created_at`, and `updated_at` (auto-generated by database).

### DatabaseStatus

**Location (TypeScript):** Inferred from command response
**Location (Rust):** `src-tauri/src/db/commands/database_commands.rs`

```typescript
interface DatabaseStatus {
    path: string;                           // Full path to SQLite DB file
    exists: boolean;                        // Whether file exists on disk
    connected: boolean;                     // Whether DB connection succeeded
    migration_version: number | null;       // Current migration version (null if no migrations)
}
```

---

## Error Handling

### Error Response Format
All Tauri commands return `Result<T, String>`. On error, the frontend receives a rejected Promise with the error string.

### Common Error Patterns

#### Validation Errors
```rust
"Project validation failed: title cannot be empty"
"Project validation failed: tagline exceeds 150 characters"
"Project validation failed: plot_premise exceeds 2000 characters"
"Project validation failed: file_path cannot be empty"
```

#### Database Errors
```rust
"Failed to create project: UNIQUE constraint failed: projects.file_path"
"Project not found with id 123"
"Project not found with path /nonexistent/path.story"
"Failed to update project: [rusqlite error]"
```

#### Frontend Error Handling Example
```typescript
try {
    const projectId = await invoke<number>("create_project", { project_data });
    console.log("Project created with ID:", projectId);
} catch (error) {
    if (error.includes("UNIQUE constraint")) {
        alert("A project with this file path already exists.");
    } else {
        alert(`Failed to create project: ${error}`);
    }
}
```

---

## API Wrappers (TypeScript)

**Location:** `src/lib/api/projects.ts`

### Purpose
Type-safe wrappers around raw `invoke()` calls with proper TypeScript types.

### Example Wrappers
```typescript
import { invoke } from "@tauri-apps/api/core";
import type { Project, NewProject } from "./types";

export async function listRecentProjects(limit = 10): Promise<Project[]> {
    return await invoke<Project[]>("list_recent_projects", { limit });
}

export async function createProject(projectData: NewProject): Promise<number> {
    return await invoke<number>("create_project", { project_data: projectData });
}

export async function getProject(id: number): Promise<Project> {
    return await invoke<Project>("get_project", { id });
}

export async function updateProject(project: Project): Promise<void> {
    await invoke("update_project_metadata", { project });
}

export async function deleteProject(id: number): Promise<void> {
    await invoke("delete_project", { id });
}

export async function updateLastOpened(id: number): Promise<void> {
    await invoke("update_last_opened", { id });
}
```

### Usage in Components
```svelte
<script lang="ts">
import { listRecentProjects, type Project } from "$lib/api/projects";

let projects: Project[] = $state([]);

$effect(() => {
    listRecentProjects(10).then(data => {
        projects = data;
    }).catch(error => {
        console.error("Failed to load projects:", error);
    });
});
</script>
```

---

## Performance Notes

- **Synchronous Database Operations:** All commands use blocking SQLite calls (sufficient for desktop app)
- **No Connection Pooling:** New connection opened per command (lightweight for SQLite)
- **Indexed Queries:** `list_recent_projects` uses indexed columns for fast sorting
- **Serialization Overhead:** Minimal (serde_json is fast, project objects are small)

---

## Security Notes

- **Parameterized Queries:** All SQL uses `rusqlite::params![]` (no SQL injection risk)
- **Input Validation:** Both frontend (TypeScript) and backend (Rust) validate inputs
- **IPC Allowlist:** Only registered commands can be invoked from frontend
- **No File Path Validation:** Currently, `file_path` is not validated for existence or safety (TODO)

---

## Future Enhancements

### Planned Commands
- `search_projects(query: string)` - Full-text search
- `export_project(id: number, format: string)` - Export to DOCX/PDF/ePub
- `import_project(path: string)` - Import existing project file
- `get_project_stats(id: number)` - Word count, chapter progress, etc.

### Optimization Opportunities
- Async command handlers (use `tokio` for async SQLite)
- Connection pooling (use `r2d2` or similar)
- Batch operations (bulk create/update/delete)

---

**Last Updated:** 2025-12-29
