# Tasks / Subtasks

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
