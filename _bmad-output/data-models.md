# StoryTeller Data Models

**Generated:** 2025-12-29
**Database:** SQLite 3 with WAL mode
**Schema Version:** V2 (Refinery migrations)

---

## Database Schema

### Schema Version History

| Version | File | Description | Applied |
|---------|------|-------------|---------|
| V1 | `V1__init_schema.sql` | Refinery schema history table | Initial setup |
| V2 | `V2__create_projects_schema.sql` | Projects table with indexes and triggers | Current |

**Location:** `src-tauri/migrations/`

---

## Tables

### `projects`

**Purpose:** Store project metadata and tracking information

**Location:** `src-tauri/migrations/V2__create_projects_schema.sql`

#### Schema Definition

```sql
CREATE TABLE projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author_name TEXT,
    pen_name TEXT,
    tagline TEXT,
    genre TEXT,
    subgenre TEXT,
    target_audience TEXT,
    tone TEXT,
    point_of_view TEXT,
    story_framework TEXT,
    chapter_count INTEGER,
    target_words_per_chapter INTEGER,
    plot_premise TEXT,
    language TEXT DEFAULT 'en',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    file_path TEXT NOT NULL UNIQUE,
    last_opened_at TIMESTAMP
);
```

#### Column Details

| Column | Type | Nullable | Default | Constraints | Description |
|--------|------|----------|---------|-------------|-------------|
| `id` | INTEGER | No | AUTO | PRIMARY KEY | Unique identifier (ROWID) |
| `title` | TEXT | No | - | NOT NULL | Project title |
| `author_name` | TEXT | Yes | NULL | - | Author's real name |
| `pen_name` | TEXT | Yes | NULL | - | Author's pen name |
| `tagline` | TEXT | Yes | NULL | Max 150 chars | Short project tagline |
| `genre` | TEXT | Yes | NULL | - | Primary genre |
| `subgenre` | TEXT | Yes | NULL | - | Subgenre classification |
| `target_audience` | TEXT | Yes | NULL | - | Target reader demographic |
| `tone` | TEXT | Yes | NULL | - | Writing tone/mood |
| `point_of_view` | TEXT | Yes | NULL | - | Narrative perspective |
| `story_framework` | TEXT | Yes | NULL | - | Story structure framework |
| `chapter_count` | INTEGER | Yes | NULL | - | Target number of chapters |
| `target_words_per_chapter` | INTEGER | Yes | NULL | - | Target words per chapter |
| `plot_premise` | TEXT | Yes | NULL | Max 2000 chars | Plot summary |
| `language` | TEXT | No | `'en'` | DEFAULT | Project language code (ISO 639-1) |
| `created_at` | TIMESTAMP | No | CURRENT_TIMESTAMP | AUTO | Creation timestamp |
| `updated_at` | TIMESTAMP | No | CURRENT_TIMESTAMP | AUTO | Last modification timestamp |
| `file_path` | TEXT | No | - | NOT NULL, UNIQUE | Path to project file on disk |
| `last_opened_at` | TIMESTAMP | Yes | NULL | - | Last opened timestamp |

#### Indexes

```sql
CREATE INDEX idx_projects_last_opened ON projects(last_opened_at DESC);
CREATE INDEX idx_projects_created ON projects(created_at DESC);
```

**Purpose:**
- `idx_projects_last_opened`: Optimize sorting by recent activity
- `idx_projects_created`: Optimize sorting by creation date

**Query Performance:**
- `list_recent_projects` uses `idx_projects_last_opened` (indexed scan)
- Both indexes support DESC ordering (nulls last)

#### Triggers

```sql
CREATE TRIGGER update_projects_timestamp
AFTER UPDATE ON projects
FOR EACH ROW
BEGIN
  UPDATE projects SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;
```

**Purpose:** Automatically update `updated_at` timestamp on any row modification

**Behavior:**
- Fires after every `UPDATE` statement
- Sets `updated_at` to current timestamp
- Does NOT fire on `INSERT` (uses DEFAULT value)

---

## Rust Data Models

**Location:** `src-tauri/src/db/models/project.rs`

### `Project` Struct

**Purpose:** Represents a complete project row from database

```rust
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Project {
    pub id: i64,
    pub title: String,
    pub author_name: Option<String>,
    pub pen_name: Option<String>,
    pub tagline: Option<String>,
    pub genre: Option<String>,
    pub subgenre: Option<String>,
    pub target_audience: Option<String>,
    pub tone: Option<String>,
    pub point_of_view: Option<String>,
    pub story_framework: Option<String>,
    pub chapter_count: Option<i32>,
    pub target_words_per_chapter: Option<i32>,
    pub plot_premise: Option<String>,
    pub language: String,
    pub created_at: String,              // ISO 8601 format
    pub updated_at: String,              // ISO 8601 format
    pub file_path: String,
    pub last_opened_at: Option<String>,  // ISO 8601 format
}
```

#### Methods

```rust
impl Project {
    // Validate project data
    pub fn validate(&self) -> Result<(), String>

    // Calculate target word count (chapter_count * target_words_per_chapter)
    pub fn get_target_word_count(&self) -> i32
}
```

#### Validation Rules

**`validate()` Method:**
- `title` must not be empty
- `file_path` must not be empty
- `tagline` length <= 150 characters (if present)
- `plot_premise` length <= 2000 characters (if present)

**Example:**
```rust
let project = Project { /* ... */ };
project.validate()?; // Returns Err if invalid
```

#### Default Behavior

**`get_target_word_count()`:**
- If `chapter_count` and `target_words_per_chapter` are both set: returns their product
- If either is missing: returns default (20 chapters × 3000 words = 60,000 words)

---

### `NewProject` Struct

**Purpose:** Create a new project (omits auto-generated fields)

```rust
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NewProject {
    pub title: String,
    pub author_name: Option<String>,
    pub pen_name: Option<String>,
    pub tagline: Option<String>,
    pub genre: Option<String>,
    pub subgenre: Option<String>,
    pub target_audience: Option<String>,
    pub tone: Option<String>,
    pub point_of_view: Option<String>,
    pub story_framework: Option<String>,
    pub chapter_count: Option<i32>,
    pub target_words_per_chapter: Option<i32>,
    pub plot_premise: Option<String>,
    pub language: String,                // Default: "en"
    pub file_path: String,
    pub last_opened_at: Option<String>,
}
```

**Omitted Fields:**
- `id` - Auto-generated by database (AUTOINCREMENT)
- `created_at` - Auto-set by database (CURRENT_TIMESTAMP)
- `updated_at` - Auto-set by database (CURRENT_TIMESTAMP)

#### Validation

Uses the same `validate()` method as `Project` (shares validation logic).

---

## TypeScript Data Models

**Location:** `src/lib/api/projects.ts`

### `Project` Interface

```typescript
export interface Project {
    id: number;
    title: string;
    author_name: string | null;
    pen_name: string | null;
    tagline: string | null;
    genre: string | null;
    subgenre: string | null;
    target_audience: string | null;
    tone: string | null;
    point_of_view: string | null;
    story_framework: string | null;
    chapter_count: number | null;
    target_words_per_chapter: number | null;
    plot_premise: string | null;
    language: string;
    created_at: string;                 // ISO 8601 timestamp
    updated_at: string;                 // ISO 8601 timestamp
    file_path: string;
    last_opened_at: string | null;      // ISO 8601 timestamp
}
```

**Note:** Matches Rust `Project` struct exactly (serde serialization ensures type safety).

---

### `NewProject` Interface

```typescript
export interface NewProject {
    title: string;
    author_name?: string | null;
    pen_name?: string | null;
    tagline?: string | null;
    genre?: string | null;
    subgenre?: string | null;
    target_audience?: string | null;
    tone?: string | null;
    point_of_view?: string | null;
    story_framework?: string | null;
    chapter_count?: number | null;
    target_words_per_chapter?: number | null;
    plot_premise?: string | null;
    language?: string;
    file_path: string;
    last_opened_at?: string | null;
}
```

**Note:** Optional fields use `?:` syntax in TypeScript, matching Rust `Option<T>`.

---

## Data Serialization

### Rust → TypeScript (Response)

**Process:**
1. Rust function returns `Result<Project, String>`
2. Tauri automatically serializes `Project` using `serde_json`
3. JSON sent over IPC bridge
4. Frontend receives as TypeScript `Project`

**Example:**
```rust
// Rust
#[tauri::command]
pub async fn get_project(id: i64) -> Result<Project, String> {
    // Returns Project struct
    Ok(project)
}
```

```typescript
// TypeScript
const project = await invoke<Project>("get_project", { id: 1 });
// project is fully typed as Project interface
```

### TypeScript → Rust (Request)

**Process:**
1. Frontend calls `invoke()` with typed parameters
2. Tauri serializes parameters to JSON
3. JSON sent over IPC bridge
4. Rust deserializes using `serde` into struct

**Example:**
```typescript
// TypeScript
await invoke<number>("create_project", {
    project_data: {
        title: "My Novel",
        file_path: "/path/to/file.story",
        language: "en"
    }
});
```

```rust
// Rust
#[tauri::command]
pub async fn create_project(project_data: NewProject) -> Result<i64, String> {
    // project_data is fully deserialized NewProject
}
```

---

## Field Constraints & Validation

### Required Fields

| Field | Context | Validation |
|-------|---------|------------|
| `title` | Always | Must be non-empty |
| `file_path` | Always | Must be non-empty and unique |
| `language` | NewProject | Defaults to `"en"` if not provided |

### Optional Fields

All other fields are optional (can be `NULL`/`None`/`null`).

### Length Constraints

| Field | Max Length | Enforced Where |
|-------|-----------|----------------|
| `tagline` | 150 characters | Rust validation |
| `plot_premise` | 2000 characters | Rust validation |

**Note:** These are application-level constraints, NOT database constraints. SQLite TEXT columns have no inherent length limit.

### Unique Constraints

| Field | Constraint | Purpose |
|-------|-----------|---------|
| `file_path` | UNIQUE | Prevent duplicate project entries |

**Behavior:** Attempting to insert duplicate `file_path` throws `UNIQUE constraint failed` error.

---

## Default Values

### Database Defaults

| Field | Default Value |
|-------|---------------|
| `language` | `'en'` |
| `created_at` | `CURRENT_TIMESTAMP` |
| `updated_at` | `CURRENT_TIMESTAMP` |

### Application Defaults

| Field | Default Value | Location |
|-------|---------------|----------|
| `chapter_count` | 20 | `Project::get_target_word_count()` |
| `target_words_per_chapter` | 3000 | `Project::get_target_word_count()` |

**Note:** These are not database defaults; they're fallback values used in calculations.

---

## Data Integrity

### Foreign Key Constraints
**None currently.** Future expansions may add:
- Characters table (FK to projects)
- Chapters table (FK to projects)
- Scenes table (FK to chapters)

### Referential Integrity
- Deleting a project only removes the database record
- Does NOT delete the actual project file on disk
- No cascade deletes (no child tables yet)

### Data Consistency
- `updated_at` automatically maintained by trigger
- Timestamps always in UTC (SQLite `CURRENT_TIMESTAMP`)
- Unique `file_path` prevents duplicates

---

## Query Patterns

### Common Queries

#### List Recent Projects
```sql
SELECT * FROM projects
ORDER BY last_opened_at DESC NULLS LAST, created_at DESC
LIMIT ?;
```
**Uses:** `idx_projects_last_opened` index

#### Find by ID
```sql
SELECT * FROM projects WHERE id = ?;
```
**Uses:** PRIMARY KEY (implicit index)

#### Find by Path
```sql
SELECT * FROM projects WHERE file_path = ?;
```
**Uses:** UNIQUE constraint (implicit index)

#### Create Project
```sql
INSERT INTO projects (title, file_path, ...) VALUES (?, ?, ...);
```
**Returns:** `last_insert_rowid()` (project ID)

#### Update Project
```sql
UPDATE projects
SET title = ?, author_name = ?, ...
WHERE id = ?;
```
**Trigger:** Automatically updates `updated_at`

#### Update Last Opened
```sql
UPDATE projects
SET last_opened_at = CURRENT_TIMESTAMP
WHERE id = ?;
```
**Trigger:** Also updates `updated_at`

#### Delete Project
```sql
DELETE FROM projects WHERE id = ?;
```
**Cascade:** None (no child tables)

---

## Data Migration Strategy

### Refinery Migration System

**Location:** `src-tauri/src/db/migrations.rs`

**Process:**
1. Embed SQL migration files at compile time
2. On app startup, run `migrations::run_migrations()`
3. Refinery checks `refinery_schema_history` table
4. Applies missing migrations in order (V1, V2, ...)

**Migration Naming:**
- Format: `V{version}__{description}.sql`
- Example: `V2__create_projects_schema.sql`
- Versions must be sequential

### Adding New Migrations

**Steps:**
1. Create `src-tauri/migrations/V3__description.sql`
2. Write SQL (CREATE TABLE, ALTER TABLE, etc.)
3. Rebuild app (migrations embedded at compile time)
4. On next launch, migration auto-applies

**Example Future Migration:**
```sql
-- V3__add_chapters_table.sql
CREATE TABLE chapters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    chapter_number INTEGER NOT NULL,
    word_count INTEGER DEFAULT 0,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    UNIQUE (project_id, chapter_number)
);

CREATE INDEX idx_chapters_project ON chapters(project_id);
```

---

## Future Data Model Extensions

### Planned Tables

**`chapters`**
- `id`, `project_id`, `title`, `chapter_number`, `content`, `word_count`
- One-to-many relationship with `projects`

**`characters`**
- `id`, `project_id`, `name`, `role`, `description`
- Many-to-one relationship with `projects`

**`scenes`**
- `id`, `chapter_id`, `title`, `setting`, `characters`
- Many-to-one relationship with `chapters`

**`tags`**
- `id`, `project_id`, `name`, `color`
- Many-to-many relationship with `projects` (via junction table)

---

## Performance Considerations

### Index Strategy
- Index columns used in `WHERE` clauses (`id`, `file_path`)
- Index columns used in `ORDER BY` clauses (`last_opened_at`, `created_at`)
- Index DESC order to match query patterns

### Query Optimization
- Use parameterized queries (avoid SQL parsing overhead)
- Limit result sets with `LIMIT` clause
- SQLite query planner uses indexes automatically

### WAL Mode Benefits
- Better concurrent read/write performance
- Readers don't block writers
- Writers don't block readers

---

## Security Notes

### SQL Injection Protection
- All queries use `rusqlite::params![]` (parameterized)
- Never concatenate user input into SQL strings

### Data Validation
- Enforce validation in Rust (`Project::validate()`)
- Catch errors before database operations
- Return user-friendly error messages

### File Path Safety
- `file_path` stored as string (not validated for existence)
- Future enhancement: validate paths for safety (no `..`, etc.)

---

**Last Updated:** 2025-12-29
