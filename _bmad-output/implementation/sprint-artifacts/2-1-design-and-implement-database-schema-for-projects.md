# Story 2.1: Design and Implement Database Schema for Projects

Status: done

## Story

As a development team,
I want a comprehensive SQLite schema for storing novel projects with all configuration data,
So that we can persist project metadata, settings, and relationships to other entities.

## Acceptance Criteria

1. **Given** the SQLite database is configured with migrations
   **When** the team creates migration `V2__create_projects_schema.sql`
   **Then** the migration defines a `projects` table with fields: id (PRIMARY KEY), title (TEXT NOT NULL), author_name (TEXT), pen_name (TEXT), tagline (TEXT), genre (TEXT), subgenre (TEXT), target_audience (TEXT), tone (TEXT), point_of_view (TEXT), story_framework (TEXT), chapter_count (INTEGER), target_words_per_chapter (INTEGER), plot_premise (TEXT), language (TEXT DEFAULT 'en'), created_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP), updated_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP), file_path (TEXT NOT NULL UNIQUE), last_opened_at (TIMESTAMP)
   **And** the schema includes indexes on frequently queried fields (last_opened_at, created_at)
   **And** the migration includes a trigger to auto-update `updated_at` on row changes

2. **Given** the projects table is created
   **When** the team tests the schema with sample data
   **Then** project records can be inserted with all fields
   **And** records can be queried by id or file_path
   **And** records can be ordered by last_opened_at for recent projects list
   **And** the updated_at trigger fires correctly on UPDATE operations

## Tasks / Subtasks

- [x] Task 1: Create V2 migration file (AC: #1)
  - [x] Create `src-tauri/migrations/V2__create_projects_schema.sql`
  - [x] Define `projects` table with all fields per Epic 2 requirements
  - [x] Add PRIMARY KEY constraint on id
  - [x] Add NOT NULL constraints on title and file_path
  - [x] Add UNIQUE constraint on file_path
  - [x] Set DEFAULT values for language ('en'), timestamps (CURRENT_TIMESTAMP)
  - [x] Create index on last_opened_at for recent projects query performance
  - [x] Create index on created_at for project list sorting
  - [x] Create trigger `update_projects_timestamp` to auto-update updated_at on changes

- [x] Task 2: Create Rust types for projects (AC: #2)
  - [x] Create `src-tauri/src/db/models/mod.rs` for model exports
  - [x] Create `src-tauri/src/db/models/project.rs` with Project struct
  - [x] Define Project struct matching database schema fields
  - [x] Implement `From<&rusqlite::Row>` for Project to map query results
  - [x] Add validation methods (e.g., validate_title, validate_file_path)
  - [x] Add helper methods (e.g., is_recent, get_target_word_count)
  - [x] Update `src-tauri/src/db/mod.rs` to export models module

- [x] Task 3: Implement database operations (AC: #2)
  - [x] Create `src-tauri/src/db/projects.rs` for CRUD operations
  - [x] Implement `insert_project(conn: &Connection, project: &NewProject) -> Result<i64>`
  - [x] Implement `get_project_by_id(conn: &Connection, id: i64) -> Result<Project>`
  - [x] Implement `get_project_by_path(conn: &Connection, path: &str) -> Result<Project>`
  - [x] Implement `get_recent_projects(conn: &Connection, limit: usize) -> Result<Vec<Project>>`
  - [x] Implement `update_project(conn: &Connection, project: &Project) -> Result<()>`
  - [x] Implement `update_last_opened(conn: &Connection, id: i64) -> Result<()>`
  - [x] Implement `delete_project(conn: &Connection, id: i64) -> Result<()>`
  - [x] Update `src-tauri/src/db/mod.rs` to export projects module

- [x] Task 4: Add Tauri commands for project management (AC: #2)
  - [x] Create `src-tauri/src/db/commands/project_commands.rs`
  - [x] Implement `create_project` command (returns project ID)
  - [x] Implement `get_project` command (by ID or path)
  - [x] Implement `list_recent_projects` command (returns last 10 by default)
  - [x] Implement `update_project_metadata` command
  - [x] Implement `delete_project` command
  - [x] Update `src-tauri/src/db/commands/mod.rs` to export project commands
  - [x] Register all commands in `src-tauri/src/lib.rs` invoke handler

- [x] Task 5: Write Rust unit tests (AC: #2)
  - [x] Test: Insert project with all fields
  - [x] Test: Insert project with minimal fields (only required)
  - [x] Test: UNIQUE constraint violation on file_path
  - [x] Test: Query project by id
  - [x] Test: Query project by file_path
  - [x] Test: Get recent projects ordered by last_opened_at DESC
  - [x] Test: Update project updates updated_at timestamp automatically
  - [x] Test: Update last_opened_at updates timestamp correctly
  - [x] Test: Delete project removes record

- [x] Task 6: Write integration tests for migration (AC: #1)
  - [x] Test: V2 migration runs successfully after V1
  - [x] Test: Projects table exists after migration
  - [x] Test: Projects table has all required columns with correct types
  - [x] Test: Indexes exist on last_opened_at and created_at
  - [x] Test: Trigger exists and fires on UPDATE

- [x] Task 7: Validate and verify
  - [x] Run `cargo build` - compiles without errors
  - [x] Run `cargo test` - all new tests pass
  - [x] Run `cargo test --lib` for unit tests only
  - [x] Run `pnpm check` - no TypeScript errors
  - [x] Run `pnpm test` - all frontend tests pass
  - [x] Manually test: Launch app, verify migration runs, check database file

## Dev Notes

### 🔥 CRITICAL ARCHITECTURE CONTEXT

**Database Foundation (Story 2.0 - COMPLETED):**
- SQLite database: `{app_data}/StoryTeller/storyteller.db` (Windows: `%APPDATA%\StoryTeller\storyteller.db`)
- Dependencies: `rusqlite = "0.32"` with `bundled` feature, `refinery = "0.8"` with `rusqlite` feature
- WAL mode enabled for performance
- V1__init_schema.sql exists (framework setup only, no tables)
- Module structure: `src-tauri/src/db/` with error.rs, connection.rs, migrations.rs, commands.rs, mod.rs
- Graceful degradation: app continues if database init fails
- 5 Rust unit tests passing

**This Story Creates V2 Migration:**
- V1 = framework setup (existing)
- V2 = projects table (THIS STORY)
- Refinery automatically tracks applied migrations

**Schema Design Principles:**
- Relational model for structured data
- Foreign keys enforced for referential integrity (future stories)
- Indexes on frequently queried columns
- NOT NULL, UNIQUE, CHECK constraints at database layer
- Rust type system validation at application layer
- Business logic validation in model methods

### 📋 COPY-PASTE REFERENCE - Exact Patterns from Story 2.0

**Module Export Pattern (db/mod.rs style):**
```rust
pub mod commands;
pub mod connection;
pub mod error;
pub mod migrations;
pub mod models;      // NEW
pub mod projects;    // NEW
```

**Command Registration Pattern (lib.rs:32):**
```rust
.invoke_handler(tauri::generate_handler![
    greet,
    db::commands::get_database_status,
    db::commands::project_commands::create_project,        // NEW
    db::commands::project_commands::get_project,           // NEW
    db::commands::project_commands::list_recent_projects,  // NEW
    db::commands::project_commands::update_project_metadata, // NEW
    db::commands::project_commands::delete_project,        // NEW
])
```

**Connection Reuse Pattern (connection.rs:194-200):**
```rust
use super::connection::open_connection;

pub fn create_project(project_data: NewProject) -> Result<i64, String> {
    let conn = open_connection()
        .map_err(|e| e.to_string())?;
    projects::insert_project(&conn, &project_data)
        .map_err(|e| e.to_string())
}
```

**DatabaseError Extension (existing variants from error.rs):**
```rust
// EXISTING variants - DO NOT recreate:
DatabaseError::ConnectionError(String)
DatabaseError::MigrationError(String)
DatabaseError::PathNotFound
DatabaseError::IoError (from std::io::Error)

// ADD if needed:
DatabaseError::NotFound
DatabaseError::InvalidData(String)
```

**embed_migrations! Pattern (migrations.rs:8-11):**
```rust
// CRITICAL: Must use nested module to avoid namespace collision
mod embedded {
    use refinery::embed_migrations;
    embed_migrations!("migrations");
}

// Then use as:
embedded::migrations::runner().run(conn)
```

**Test Pattern with tempfile (migrations.rs:42-51):**
```rust
use tempfile::TempDir;

#[test]
fn test_insert_project() {
    let temp_dir = TempDir::new().unwrap();
    let db_path = temp_dir.path().join("test.db");
    let mut conn = Connection::open(&db_path).unwrap();

    // Run migrations first
    crate::db::migrations::run_migrations(&mut conn).unwrap();

    // Your test logic here
}
```

### 🗂️ Projects Table Schema Deep Dive

**Required Fields (NOT NULL):**
- `id` - INTEGER PRIMARY KEY (auto-increment)
- `title` - TEXT NOT NULL (novel title)
- `file_path` - TEXT NOT NULL UNIQUE (path to .storyteller project file)

**Optional Metadata Fields:**
- `author_name` - TEXT (real name)
- `pen_name` - TEXT (pseudonym)
- `tagline` - TEXT (one-sentence hook, max 150 chars - validation in Rust)

**Genre Configuration (Wizard Step 2):**
- `genre` - TEXT (Thriller, Romance, Fantasy, Sci-Fi, Mystery, Horror, Literary Fiction, Historical Fiction, Other)
- `subgenre` - TEXT (comma-separated list, genre-specific options)
- `target_audience` - TEXT (Young Adult, New Adult, Adult, Middle Grade, Children)
- `tone` - TEXT (comma-separated: Dark, Light, Humorous, Serious, Suspenseful, Romantic, Adventurous, Philosophical)

**Story Structure (Wizard Step 3):**
- `point_of_view` - TEXT (First Person, Third Person Limited, Third Person Omniscient, Multiple POV)
- `story_framework` - TEXT (Three-Act Structure, Five-Act Structure, Hero's Journey, Snowflake Method, Seven-Point Story Structure, Custom/Freeform)
- `chapter_count` - INTEGER (default 20, min 1, max 100)
- `target_words_per_chapter` - INTEGER (default 3000, min 500, max 15000)

**Plot Context (Wizard Step 4):**
- `plot_premise` - TEXT (2-3 paragraphs, max 2000 chars - validation in Rust)

**Internationalization (Story 2.9):**
- `language` - TEXT DEFAULT 'en' (content language, affects AI generation)

**System Timestamps:**
- `created_at` - TIMESTAMP DEFAULT CURRENT_TIMESTAMP (immutable)
- `updated_at` - TIMESTAMP DEFAULT CURRENT_TIMESTAMP (auto-updated via trigger)
- `last_opened_at` - TIMESTAMP (nullable, updated when project opens)

**Performance Requirements:**
- Index on `last_opened_at DESC` for recent projects list (Story 2.2)
- Index on `created_at DESC` for project list sorting
- UNIQUE index on `file_path` prevents duplicate project files

### 📁 Project Structure to Create

```
src-tauri/src/db/
├── mod.rs              # ADD: pub mod models; pub mod projects;
├── error.rs            # EXTEND if needed (existing from Story 2.0)
├── connection.rs       # REUSE open_connection() (existing from Story 2.0)
├── migrations.rs       # NO CHANGES (existing from Story 2.0)
├── commands/           # NEW directory
│   ├── mod.rs          # NEW: pub mod project_commands;
│   └── project_commands.rs  # NEW: Tauri commands for projects
├── models/             # NEW directory
│   ├── mod.rs          # NEW: pub mod project;
│   └── project.rs      # NEW: Project, NewProject structs
└── projects.rs         # NEW: Project CRUD operations

src-tauri/migrations/
├── V1__init_schema.sql         # EXISTING (do not modify)
└── V2__create_projects_schema.sql  # NEW (this story)
```

### 🔧 Complete Implementation Patterns

#### V2__create_projects_schema.sql

```sql
-- StoryTeller Projects Table
-- Migration V2: Create projects table with full metadata support

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

-- Index for recent projects query (Story 2.2)
CREATE INDEX idx_projects_last_opened ON projects(last_opened_at DESC);

-- Index for project list sorting
CREATE INDEX idx_projects_created ON projects(created_at DESC);

-- Trigger to auto-update updated_at on changes
CREATE TRIGGER update_projects_timestamp
AFTER UPDATE ON projects
FOR EACH ROW
BEGIN
  UPDATE projects SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;
```

#### src-tauri/src/db/models/mod.rs

```rust
pub mod project;
```

#### src-tauri/src/db/models/project.rs

```rust
use serde::{Deserialize, Serialize};

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
    pub created_at: String, // ISO 8601 timestamp
    pub updated_at: String,
    pub file_path: String,
    pub last_opened_at: Option<String>,
}

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
    pub language: String,
    pub file_path: String,
    pub last_opened_at: Option<String>,
}

impl Project {
    pub fn validate(&self) -> Result<(), String> {
        if self.title.trim().is_empty() {
            return Err("Title cannot be empty".to_string());
        }
        if self.file_path.trim().is_empty() {
            return Err("File path cannot be empty".to_string());
        }
        if let Some(tagline) = &self.tagline {
            if tagline.len() > 150 {
                return Err("Tagline must be 150 characters or less".to_string());
            }
        }
        if let Some(premise) = &self.plot_premise {
            if premise.len() > 2000 {
                return Err("Plot premise must be 2000 characters or less".to_string());
            }
        }
        Ok(())
    }

    pub fn get_target_word_count(&self) -> i32 {
        self.chapter_count.unwrap_or(20) * self.target_words_per_chapter.unwrap_or(3000)
    }
}

impl From<&rusqlite::Row<'_>> for Project {
    fn from(row: &rusqlite::Row) -> Self {
        Project {
            id: row.get(0).unwrap(),
            title: row.get(1).unwrap(),
            author_name: row.get(2).unwrap(),
            pen_name: row.get(3).unwrap(),
            tagline: row.get(4).unwrap(),
            genre: row.get(5).unwrap(),
            subgenre: row.get(6).unwrap(),
            target_audience: row.get(7).unwrap(),
            tone: row.get(8).unwrap(),
            point_of_view: row.get(9).unwrap(),
            story_framework: row.get(10).unwrap(),
            chapter_count: row.get(11).unwrap(),
            target_words_per_chapter: row.get(12).unwrap(),
            plot_premise: row.get(13).unwrap(),
            language: row.get(14).unwrap(),
            created_at: row.get(15).unwrap(),
            updated_at: row.get(16).unwrap(),
            file_path: row.get(17).unwrap(),
            last_opened_at: row.get(18).unwrap(),
        }
    }
}
```

#### src-tauri/src/db/projects.rs

```rust
use rusqlite::Connection;
use super::error::DatabaseError;
use super::models::project::{Project, NewProject};

pub fn insert_project(conn: &Connection, project: &NewProject) -> Result<i64, DatabaseError> {
    conn.execute(
        "INSERT INTO projects (title, author_name, pen_name, tagline, genre, subgenre,
         target_audience, tone, point_of_view, story_framework, chapter_count,
         target_words_per_chapter, plot_premise, language, file_path, last_opened_at)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16)",
        rusqlite::params![
            project.title,
            project.author_name,
            project.pen_name,
            project.tagline,
            project.genre,
            project.subgenre,
            project.target_audience,
            project.tone,
            project.point_of_view,
            project.story_framework,
            project.chapter_count,
            project.target_words_per_chapter,
            project.plot_premise,
            project.language,
            project.file_path,
            project.last_opened_at,
        ],
    )
    .map_err(|e| DatabaseError::ConnectionError(e.to_string()))?;

    Ok(conn.last_insert_rowid())
}

pub fn get_project_by_id(conn: &Connection, id: i64) -> Result<Project, DatabaseError> {
    let project = conn.query_row(
        "SELECT id, title, author_name, pen_name, tagline, genre, subgenre, target_audience,
         tone, point_of_view, story_framework, chapter_count, target_words_per_chapter,
         plot_premise, language, created_at, updated_at, file_path, last_opened_at
         FROM projects WHERE id = ?1",
        [id],
        |row| Ok(Project::from(row)),
    )
    .map_err(|e| DatabaseError::ConnectionError(e.to_string()))?;

    Ok(project)
}

pub fn get_project_by_path(conn: &Connection, path: &str) -> Result<Project, DatabaseError> {
    let project = conn.query_row(
        "SELECT id, title, author_name, pen_name, tagline, genre, subgenre, target_audience,
         tone, point_of_view, story_framework, chapter_count, target_words_per_chapter,
         plot_premise, language, created_at, updated_at, file_path, last_opened_at
         FROM projects WHERE file_path = ?1",
        [path],
        |row| Ok(Project::from(row)),
    )
    .map_err(|e| DatabaseError::ConnectionError(e.to_string()))?;

    Ok(project)
}

pub fn get_recent_projects(conn: &Connection, limit: usize) -> Result<Vec<Project>, DatabaseError> {
    let mut stmt = conn
        .prepare(
            "SELECT id, title, author_name, pen_name, tagline, genre, subgenre, target_audience,
             tone, point_of_view, story_framework, chapter_count, target_words_per_chapter,
             plot_premise, language, created_at, updated_at, file_path, last_opened_at
             FROM projects ORDER BY last_opened_at DESC LIMIT ?1",
        )
        .map_err(|e| DatabaseError::ConnectionError(e.to_string()))?;

    let projects = stmt
        .query_map([limit], |row| Ok(Project::from(row)))
        .map_err(|e| DatabaseError::ConnectionError(e.to_string()))?
        .collect::<Result<Vec<Project>, _>>()
        .map_err(|e| DatabaseError::ConnectionError(e.to_string()))?;

    Ok(projects)
}

pub fn update_project(conn: &Connection, project: &Project) -> Result<(), DatabaseError> {
    conn.execute(
        "UPDATE projects SET title = ?1, author_name = ?2, pen_name = ?3, tagline = ?4,
         genre = ?5, subgenre = ?6, target_audience = ?7, tone = ?8, point_of_view = ?9,
         story_framework = ?10, chapter_count = ?11, target_words_per_chapter = ?12,
         plot_premise = ?13, language = ?14, file_path = ?15, last_opened_at = ?16
         WHERE id = ?17",
        rusqlite::params![
            project.title,
            project.author_name,
            project.pen_name,
            project.tagline,
            project.genre,
            project.subgenre,
            project.target_audience,
            project.tone,
            project.point_of_view,
            project.story_framework,
            project.chapter_count,
            project.target_words_per_chapter,
            project.plot_premise,
            project.language,
            project.file_path,
            project.last_opened_at,
            project.id,
        ],
    )
    .map_err(|e| DatabaseError::ConnectionError(e.to_string()))?;

    Ok(())
}

pub fn update_last_opened(conn: &Connection, id: i64) -> Result<(), DatabaseError> {
    conn.execute(
        "UPDATE projects SET last_opened_at = CURRENT_TIMESTAMP WHERE id = ?1",
        [id],
    )
    .map_err(|e| DatabaseError::ConnectionError(e.to_string()))?;

    Ok(())
}

pub fn delete_project(conn: &Connection, id: i64) -> Result<(), DatabaseError> {
    conn.execute("DELETE FROM projects WHERE id = ?1", [id])
        .map_err(|e| DatabaseError::ConnectionError(e.to_string()))?;

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use rusqlite::Connection;
    use tempfile::TempDir;
    use std::thread;
    use std::time::Duration;

    fn setup_test_db() -> (TempDir, Connection) {
        let temp_dir = TempDir::new().unwrap();
        let db_path = temp_dir.path().join("test.db");
        let mut conn = Connection::open(&db_path).unwrap();
        crate::db::migrations::run_migrations(&mut conn).unwrap();
        (temp_dir, conn)
    }

    #[test]
    fn test_insert_project_all_fields() {
        let (_temp, conn) = setup_test_db();

        let project = NewProject {
            title: "Test Novel".to_string(),
            author_name: Some("Jane Doe".to_string()),
            pen_name: Some("J.D.".to_string()),
            tagline: Some("A thrilling adventure".to_string()),
            genre: Some("Fantasy".to_string()),
            subgenre: Some("Epic Fantasy".to_string()),
            target_audience: Some("Adult".to_string()),
            tone: Some("Dark,Serious".to_string()),
            point_of_view: Some("Third Person Limited".to_string()),
            story_framework: Some("Three-Act Structure".to_string()),
            chapter_count: Some(25),
            target_words_per_chapter: Some(3500),
            plot_premise: Some("A hero's journey begins...".to_string()),
            language: "en".to_string(),
            file_path: "/path/to/novel.storyteller".to_string(),
            last_opened_at: None,
        };

        let id = insert_project(&conn, &project).unwrap();
        assert!(id > 0);
    }

    #[test]
    fn test_insert_project_minimal_fields() {
        let (_temp, conn) = setup_test_db();

        let project = NewProject {
            title: "Minimal Novel".to_string(),
            author_name: None,
            pen_name: None,
            tagline: None,
            genre: None,
            subgenre: None,
            target_audience: None,
            tone: None,
            point_of_view: None,
            story_framework: None,
            chapter_count: None,
            target_words_per_chapter: None,
            plot_premise: None,
            language: "en".to_string(),
            file_path: "/path/to/minimal.storyteller".to_string(),
            last_opened_at: None,
        };

        let id = insert_project(&conn, &project).unwrap();
        assert!(id > 0);
    }

    #[test]
    fn test_unique_constraint_file_path() {
        let (_temp, conn) = setup_test_db();

        let project1 = NewProject {
            title: "Novel 1".to_string(),
            author_name: None,
            pen_name: None,
            tagline: None,
            genre: None,
            subgenre: None,
            target_audience: None,
            tone: None,
            point_of_view: None,
            story_framework: None,
            chapter_count: None,
            target_words_per_chapter: None,
            plot_premise: None,
            language: "en".to_string(),
            file_path: "/same/path.storyteller".to_string(),
            last_opened_at: None,
        };

        let project2 = NewProject {
            title: "Novel 2".to_string(),
            file_path: "/same/path.storyteller".to_string(),
            ..project1.clone()
        };

        insert_project(&conn, &project1).unwrap();
        let result = insert_project(&conn, &project2);
        assert!(result.is_err());
    }

    #[test]
    fn test_get_project_by_id() {
        let (_temp, conn) = setup_test_db();

        let new_project = NewProject {
            title: "Test Query".to_string(),
            author_name: None,
            pen_name: None,
            tagline: None,
            genre: None,
            subgenre: None,
            target_audience: None,
            tone: None,
            point_of_view: None,
            story_framework: None,
            chapter_count: None,
            target_words_per_chapter: None,
            plot_premise: None,
            language: "en".to_string(),
            file_path: "/path/query.storyteller".to_string(),
            last_opened_at: None,
        };

        let id = insert_project(&conn, &new_project).unwrap();
        let project = get_project_by_id(&conn, id).unwrap();
        assert_eq!(project.title, "Test Query");
    }

    #[test]
    fn test_get_project_by_path() {
        let (_temp, conn) = setup_test_db();

        let new_project = NewProject {
            title: "Path Query".to_string(),
            author_name: None,
            pen_name: None,
            tagline: None,
            genre: None,
            subgenre: None,
            target_audience: None,
            tone: None,
            point_of_view: None,
            story_framework: None,
            chapter_count: None,
            target_words_per_chapter: None,
            plot_premise: None,
            language: "en".to_string(),
            file_path: "/unique/path.storyteller".to_string(),
            last_opened_at: None,
        };

        insert_project(&conn, &new_project).unwrap();
        let project = get_project_by_path(&conn, "/unique/path.storyteller").unwrap();
        assert_eq!(project.title, "Path Query");
    }

    #[test]
    fn test_get_recent_projects_ordered() {
        let (_temp, conn) = setup_test_db();

        // Insert multiple projects with different last_opened_at
        for i in 1..=3 {
            let project = NewProject {
                title: format!("Project {}", i),
                author_name: None,
                pen_name: None,
                tagline: None,
                genre: None,
                subgenre: None,
                target_audience: None,
                tone: None,
                point_of_view: None,
                story_framework: None,
                chapter_count: None,
                target_words_per_chapter: None,
                plot_premise: None,
                language: "en".to_string(),
                file_path: format!("/path/project{}.storyteller", i),
                last_opened_at: None,
            };
            let id = insert_project(&conn, &project).unwrap();

            // Update last_opened_at with stagger
            thread::sleep(Duration::from_millis(10));
            update_last_opened(&conn, id).unwrap();
        }

        let recent = get_recent_projects(&conn, 10).unwrap();
        assert_eq!(recent.len(), 3);
        // Most recent should be first
        assert_eq!(recent[0].title, "Project 3");
    }

    #[test]
    fn test_updated_at_trigger() {
        let (_temp, conn) = setup_test_db();

        let project = NewProject {
            title: "Trigger Test".to_string(),
            author_name: None,
            pen_name: None,
            tagline: None,
            genre: None,
            subgenre: None,
            target_audience: None,
            tone: None,
            point_of_view: None,
            story_framework: None,
            chapter_count: None,
            target_words_per_chapter: None,
            plot_premise: None,
            language: "en".to_string(),
            file_path: "/path/trigger.storyteller".to_string(),
            last_opened_at: None,
        };

        let id = insert_project(&conn, &project).unwrap();
        let before = get_project_by_id(&conn, id).unwrap();

        thread::sleep(Duration::from_secs(1));

        let mut updated = before.clone();
        updated.title = "Updated Title".to_string();
        update_project(&conn, &updated).unwrap();

        let after = get_project_by_id(&conn, id).unwrap();
        assert_ne!(before.updated_at, after.updated_at);
    }

    #[test]
    fn test_update_last_opened() {
        let (_temp, conn) = setup_test_db();

        let project = NewProject {
            title: "Last Opened Test".to_string(),
            author_name: None,
            pen_name: None,
            tagline: None,
            genre: None,
            subgenre: None,
            target_audience: None,
            tone: None,
            point_of_view: None,
            story_framework: None,
            chapter_count: None,
            target_words_per_chapter: None,
            plot_premise: None,
            language: "en".to_string(),
            file_path: "/path/last.storyteller".to_string(),
            last_opened_at: None,
        };

        let id = insert_project(&conn, &project).unwrap();
        update_last_opened(&conn, id).unwrap();

        let updated = get_project_by_id(&conn, id).unwrap();
        assert!(updated.last_opened_at.is_some());
    }

    #[test]
    fn test_delete_project() {
        let (_temp, conn) = setup_test_db();

        let project = NewProject {
            title: "Delete Test".to_string(),
            author_name: None,
            pen_name: None,
            tagline: None,
            genre: None,
            subgenre: None,
            target_audience: None,
            tone: None,
            point_of_view: None,
            story_framework: None,
            chapter_count: None,
            target_words_per_chapter: None,
            plot_premise: None,
            language: "en".to_string(),
            file_path: "/path/delete.storyteller".to_string(),
            last_opened_at: None,
        };

        let id = insert_project(&conn, &project).unwrap();
        delete_project(&conn, id).unwrap();

        let result = get_project_by_id(&conn, id);
        assert!(result.is_err());
    }
}
```

#### src-tauri/src/db/commands/mod.rs

```rust
pub mod project_commands;
```

#### src-tauri/src/db/commands/project_commands.rs

```rust
use crate::db::{connection, projects, models::project::{Project, NewProject}};

#[tauri::command]
pub fn create_project(project_data: NewProject) -> Result<i64, String> {
    let conn = connection::open_connection()
        .map_err(|e| e.to_string())?;
    projects::insert_project(&conn, &project_data)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_project(id: i64) -> Result<Project, String> {
    let conn = connection::open_connection()
        .map_err(|e| e.to_string())?;
    projects::get_project_by_id(&conn, id)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn list_recent_projects(limit: Option<usize>) -> Result<Vec<Project>, String> {
    let conn = connection::open_connection()
        .map_err(|e| e.to_string())?;
    projects::get_recent_projects(&conn, limit.unwrap_or(10))
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn update_project_metadata(project: Project) -> Result<(), String> {
    let conn = connection::open_connection()
        .map_err(|e| e.to_string())?;
    projects::update_project(&conn, &project)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn delete_project(id: i64) -> Result<(), String> {
    let conn = connection::open_connection()
        .map_err(|e| e.to_string())?;
    projects::delete_project(&conn, id)
        .map_err(|e| e.to_string())
}
```

#### Updates to src-tauri/src/db/mod.rs

Add these lines to the existing file:

```rust
pub mod commands;
pub mod connection;
pub mod error;
pub mod migrations;
pub mod models;      // ADD THIS
pub mod projects;    // ADD THIS
```

#### Updates to src-tauri/src/lib.rs

Replace the invoke_handler line (lib.rs:32) with:

```rust
.invoke_handler(tauri::generate_handler![
    greet,
    db::commands::get_database_status,
    db::commands::project_commands::create_project,
    db::commands::project_commands::get_project,
    db::commands::project_commands::list_recent_projects,
    db::commands::project_commands::update_project_metadata,
    db::commands::project_commands::delete_project,
])
```

### 🧪 Testing Strategy

**Unit Tests (Target: 90%+ coverage):**
- Test CRUD operations with temp database (using tempfile pattern from migrations.rs)
- Test constraints (NOT NULL, UNIQUE) trigger constraint violations
- Test trigger behavior (updated_at auto-update with sleep to verify timestamp change)
- Test indexes exist (query sqlite_master)

**Running Tests:**
```bash
cargo test                 # All tests
cargo test --lib          # Unit tests only
cargo test test_insert    # Specific test
cargo test -- --nocapture # Show output
```

**Migration Tests:**
- Test V2 runs after V1 (use tempfile + run_migrations pattern)
- Test table structure (query sqlite_master for columns, indexes, triggers)

### 🎯 Scope Boundaries

**This Story DOES:**
- Create V2 migration with projects table, indexes, trigger
- Implement Rust CRUD operations for projects
- Add Tauri commands for project management
- Write comprehensive unit tests (>90% coverage)
- Test trigger and index behavior

**This Story Does NOT:**
- Implement frontend UI (Story 2.2, 2.3-2.8)
- Create project files on disk (Story 2.8)
- Implement wizard flow (Story 2.3-2.8)
- Add foreign key relationships to other tables (Future epics)

### 📚 References

- Story 2.0: Database foundation implementation details (migrations pattern, module structure, error handling)
- Data Architecture: Schema design principles, validation layers, migration strategy
- Testing Architecture: Rust unit test patterns, test coverage targets (90%+)
- Epic 2 Stories: Wizard flow context, field requirements for wizard steps

## Dev Agent Record

### Agent Model Used
claude-opus-4-5-20251101

### Debug Log References
- Fixed module conflict by converting commands.rs to commands/ directory structure
- Fixed test failure in test_get_recent_projects_ordered by increasing sleep duration from 10ms to 1s for timestamp resolution
- Fixed ORDER BY query to handle NULL values correctly using CASE expression
- CODE REVIEW: Added get_project_by_path and update_last_opened Tauri commands (AC#2 requirement)
- CODE REVIEW: Added validation enforcement in create_project and update_project_metadata commands
- CODE REVIEW: Added doc comments to all Tauri commands
- CODE REVIEW: Removed unused re-export in commands/mod.rs

### Completion Notes List
- Created V2 migration with projects table schema (19 fields, 2 indexes, 1 trigger)
- Implemented Project and NewProject Rust structs with validation methods
- Implemented complete CRUD operations in projects.rs (7 functions)
- Created 7 Tauri commands for project management (added get_project_by_path, update_last_opened after review)
- Added validation enforcement in create_project and update_project_metadata commands
- Added doc comments to all Tauri commands for frontend developers
- Added 9 unit tests for CRUD operations in projects.rs (all passing)
- Added 7 integration tests for migration in migrations.rs (all passing)
- Total: 19 Rust tests passing, 89 frontend tests passing
- cargo build: successful with 1 warning (unused get_target_word_count method - reserved for future use)
- pnpm check: 0 errors, 0 warnings
- Code review fixes applied: added missing commands, validation, documentation

### File List
- src-tauri/migrations/V2__create_projects_schema.sql (created)
- src-tauri/src/db/models/mod.rs (created)
- src-tauri/src/db/models/project.rs (created)
- src-tauri/src/db/projects.rs (created)
- src-tauri/src/db/commands/mod.rs (created)
- src-tauri/src/db/commands/database_commands.rs (created - moved from commands.rs)
- src-tauri/src/db/commands/project_commands.rs (created, modified after review: added validation, 2 commands, doc comments)
- src-tauri/src/db/commands.rs (deleted - converted to commands/ directory)
- src-tauri/src/db/mod.rs (modified)
- src-tauri/src/lib.rs (modified - registered 7 project commands)
- src-tauri/src/db/migrations.rs (modified - added 7 migration tests)
