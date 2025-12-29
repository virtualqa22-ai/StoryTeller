# Story 2.0: Configure SQLite Database with Migrations

Status: done

## Story

As a development team,
I want SQLite configured with rusqlite and refinery migration framework,
So that we can persist project data reliably with version-controlled schema changes.

## Acceptance Criteria

1. **Given** the Tauri application is initialized
   **When** the team adds `rusqlite` (with bundled feature) and `refinery` to `src-tauri/Cargo.toml`
   **Then** dependencies compile successfully
   **And** SQLite database file path is configured as `{app_data}/storyteller.db`

2. **Given** the refinery migration framework is added
   **When** the team creates the migrations directory at `src-tauri/migrations/`
   **Then** the directory structure follows the pattern: `V{number}__{description}.sql`
   **And** migration V1__init_schema.sql exists but contains only framework setup (no tables yet)
   **And** migrations run automatically on app startup via Rust code
   **And** migrations are idempotent (can run multiple times safely)

3. **Given** the migration system is configured
   **When** the app starts for the first time
   **Then** the SQLite database is created at the correct path
   **And** migrations run successfully
   **And** migration status is logged to console
   **And** migration errors are caught and logged with clear messages
   **And** the app continues running even if migrations fail (graceful degradation)

**NOTE:** This story sets up the migration framework only. Story 2.1 will create the first real table (projects) when needed.

## Tasks / Subtasks

- [x] Task 1: Add Rust dependencies (AC: #1)
  - [x] Add `rusqlite` with `bundled` feature to Cargo.toml
  - [x] Add `refinery` crate to Cargo.toml (with `rusqlite` feature - corrected from Dev Notes)
  - [x] Add `dirs` crate for cross-platform app data directory
  - [x] Add `thiserror` for error handling
  - [x] Add `log` and `env_logger` for logging
  - [x] Add `tempfile` to dev-dependencies for tests
  - [x] Run `cargo build` to verify compilation

- [x] Task 2: Create database module structure (AC: #1, #2)
  - [x] Create `src-tauri/src/db/` directory following architecture patterns
  - [x] Create `src-tauri/src/db/mod.rs` with public exports
  - [x] Create `src-tauri/src/db/connection.rs` for connection management
  - [x] Create `src-tauri/src/db/migrations.rs` for refinery integration
  - [x] Create `src-tauri/src/db/error.rs` for database error types
  - [x] Create `src-tauri/src/db/commands.rs` for Tauri commands
  - [x] Update `src-tauri/src/lib.rs` to include db module

- [x] Task 3: Create migrations directory and initial migration (AC: #2)
  - [x] Create `src-tauri/migrations/` directory
  - [x] Create `V1__init_schema.sql` with framework setup
  - [x] Verify migration file naming follows `V{number}__{description}.sql` pattern

- [x] Task 4: Implement database initialization (AC: #1, #3)
  - [x] Implement `get_database_path()` to locate app data directory
  - [x] Implement `init_database()` function that creates/opens `storyteller.db`
  - [x] Configure WAL mode for better performance
  - [x] Log database path on startup for debugging
  - [x] Add database initialization to Tauri app startup

- [x] Task 5: Implement migration runner (AC: #2, #3)
  - [x] Implement `run_migrations()` function using refinery
  - [x] Use `embed_migrations!` macro with proper module declaration
  - [x] Log migration status (which migrations ran, success/failure)
  - [x] Implement graceful error handling (app continues if migrations fail)
  - [x] Add migration execution on app startup after database init

- [x] Task 6: Add Tauri command for database status (AC: #3)
  - [x] Create `get_database_status` Tauri command
  - [x] Return database path, connection status, migration version
  - [x] Register command in invoke handler

- [x] Task 7: Write unit tests (AC: #2, #3)
  - [x] Test: Database file is created in correct location
  - [x] Test: WAL mode is enabled correctly
  - [x] Test: Migrations are idempotent (run twice without error)
  - [x] Test: Migrations create tracking table (refinery_schema_history)

- [x] Task 8: Validate and verify
  - [x] Run `cargo build` - compiles without errors
  - [x] Run `cargo test` - all 4 Rust unit tests pass
  - [x] Run `pnpm tauri build` - application builds (MSI + NSIS installers)

## Dev Notes

### Complete Cargo.toml Dependencies

**CRITICAL:** Copy this exact block to `src-tauri/Cargo.toml`:

```toml
[dependencies]
# Existing (keep these)
tauri = { version = "2", features = [] }
tauri-plugin-opener = "2"
serde = { version = "1", features = ["derive"] }
serde_json = "1"

# NEW: Database
rusqlite = { version = "0.32", features = ["bundled"] }
refinery = { version = "0.8", features = ["rusqlite"] }

# NEW: App data path
dirs = "6.0"

# NEW: Error handling & logging
thiserror = "2.0"
log = "0.4"
env_logger = "0.11"

[dev-dependencies]
tempfile = "3.14"
```

**NOTE:** The `rusqlite` feature flag on `refinery` enables the rusqlite integration. Do NOT use a separate `refinery-rusqlite` crate.

### Project Structure

```
src-tauri/
├── Cargo.toml              # Add dependencies here
├── migrations/             # SQL migration files
│   └── V1__init_schema.sql
└── src/
    ├── lib.rs              # Add: mod db; and init_database()
    ├── main.rs             # No changes needed
    └── db/                 # NEW: Database module
        ├── mod.rs          # Public exports
        ├── error.rs        # DatabaseError enum
        ├── connection.rs   # Connection management
        ├── migrations.rs   # refinery integration
        └── commands.rs     # Tauri commands
```

**Anti-Pattern:** Do NOT put database logic in `lib.rs` or a flat `db.rs` file.

### V1__init_schema.sql

Create `src-tauri/migrations/V1__init_schema.sql`:

```sql
-- StoryTeller Database Schema Initialization
-- Migration V1: Framework setup
-- refinery automatically creates its tracking table (refinery_schema_history)
-- Actual tables will be added in Story 2.1+

SELECT 1;
```

### Complete Implementation

#### src-tauri/src/db/error.rs

```rust
use thiserror::Error;

#[derive(Error, Debug)]
pub enum DatabaseError {
    #[error("Failed to open database: {0}")]
    ConnectionError(String),

    #[error("Migration failed: {0}")]
    MigrationError(String),

    #[error("Database path not found")]
    PathNotFound,

    #[error("File system error: {0}")]
    IoError(#[from] std::io::Error),
}
```

#### src-tauri/src/db/connection.rs

```rust
use rusqlite::Connection;
use std::path::PathBuf;
use log::info;
use super::error::DatabaseError;

pub fn get_database_path() -> Result<PathBuf, DatabaseError> {
    let app_data = dirs::data_dir()
        .ok_or(DatabaseError::PathNotFound)?;
    let db_dir = app_data.join("StoryTeller");
    std::fs::create_dir_all(&db_dir)?;
    Ok(db_dir.join("storyteller.db"))
}

pub fn open_connection() -> Result<Connection, DatabaseError> {
    let path = get_database_path()?;
    info!("Database location: {}", path.display());

    let conn = Connection::open(&path)
        .map_err(|e| DatabaseError::ConnectionError(e.to_string()))?;

    // Enable WAL mode for better performance
    conn.execute_batch("PRAGMA journal_mode=WAL; PRAGMA synchronous=NORMAL;")
        .map_err(|e| DatabaseError::ConnectionError(e.to_string()))?;

    Ok(conn)
}
```

#### src-tauri/src/db/migrations.rs

```rust
use rusqlite::Connection;
use log::{info, error};
use super::error::DatabaseError;

// CRITICAL: embed_migrations! creates a `migrations` module
// The path is relative to Cargo.toml (src-tauri/migrations/)
mod embedded {
    use refinery::embed_migrations;
    embed_migrations!("migrations");
}

pub fn run_migrations(conn: &mut Connection) -> Result<(), DatabaseError> {
    info!("Running database migrations...");

    match embedded::migrations::runner().run(conn) {
        Ok(report) => {
            let applied = report.applied_migrations();
            if applied.is_empty() {
                info!("Migrations: Already up to date");
            } else {
                info!("Migrations complete. Applied: {}", applied.len());
                for migration in applied {
                    info!("  - V{}: {}", migration.version(), migration.name());
                }
            }
            Ok(())
        }
        Err(e) => {
            error!("Migration failed: {}", e);
            Err(DatabaseError::MigrationError(e.to_string()))
        }
    }
}
```

#### src-tauri/src/db/commands.rs

```rust
use rusqlite::Connection;
use serde::Serialize;
use super::connection::get_database_path;

#[derive(Serialize)]
pub struct DatabaseStatus {
    pub path: String,
    pub exists: bool,
    pub connected: bool,
    pub migration_version: Option<i32>,
}

#[tauri::command]
pub fn get_database_status() -> DatabaseStatus {
    match get_database_path() {
        Ok(path) => {
            let exists = path.exists();

            // Actually test connection and get migration version
            let (connected, migration_version) = if exists {
                match Connection::open(&path) {
                    Ok(conn) => {
                        let version = conn
                            .query_row(
                                "SELECT MAX(version) FROM refinery_schema_history",
                                [],
                                |row| row.get::<_, i32>(0),
                            )
                            .ok();
                        (true, version)
                    }
                    Err(_) => (false, None),
                }
            } else {
                (false, None)
            };

            DatabaseStatus {
                path: path.display().to_string(),
                exists,
                connected,
                migration_version,
            }
        }
        Err(_) => DatabaseStatus {
            path: "unknown".to_string(),
            exists: false,
            connected: false,
            migration_version: None,
        },
    }
}
```

#### src-tauri/src/db/mod.rs

```rust
pub mod error;
pub mod connection;
pub mod migrations;
pub mod commands;

use log::{info, error};
use error::DatabaseError;

/// Initialize the database and run migrations
/// Returns Ok(()) on success, Err on failure
pub fn init() -> Result<(), DatabaseError> {
    let mut conn = connection::open_connection()?;
    migrations::run_migrations(&mut conn)?;
    info!("Database initialization complete");
    Ok(())
}
```

#### src-tauri/src/lib.rs (Updated)

```rust
mod db;

use log::{info, warn};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn init_database() {
    match db::init() {
        Ok(_) => info!("Database initialized successfully"),
        Err(e) => {
            warn!("Database initialization failed: {}. App will continue with limited functionality.", e);
            // App continues running - graceful degradation
        }
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    env_logger::init();

    // Initialize database before Tauri builder
    init_database();

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, db::commands::get_database_status])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

### Unit Tests

Add to `src-tauri/src/db/connection.rs`:

```rust
#[cfg(test)]
mod tests {
    use super::*;
    use tempfile::TempDir;
    use rusqlite::Connection;

    #[test]
    fn test_database_creation() {
        let temp_dir = TempDir::new().unwrap();
        let db_path = temp_dir.path().join("test.db");

        let conn = Connection::open(&db_path).unwrap();
        drop(conn); // Close connection
        assert!(db_path.exists());
    }

    #[test]
    fn test_wal_mode() {
        let temp_dir = TempDir::new().unwrap();
        let db_path = temp_dir.path().join("test.db");

        let conn = Connection::open(&db_path).unwrap();
        conn.execute_batch("PRAGMA journal_mode=WAL;").unwrap();

        let mode: String = conn
            .query_row("PRAGMA journal_mode;", [], |row| row.get(0))
            .unwrap();
        assert_eq!(mode, "wal");
    }
}
```

Add to `src-tauri/src/db/migrations.rs`:

```rust
#[cfg(test)]
mod tests {
    use super::*;
    use tempfile::TempDir;
    use rusqlite::Connection;

    #[test]
    fn test_migrations_idempotent() {
        let temp_dir = TempDir::new().unwrap();
        let db_path = temp_dir.path().join("test.db");
        let mut conn = Connection::open(&db_path).unwrap();

        // Run twice - should not error
        run_migrations(&mut conn).unwrap();
        run_migrations(&mut conn).unwrap();
    }

    #[test]
    fn test_migrations_create_tracking_table() {
        let temp_dir = TempDir::new().unwrap();
        let db_path = temp_dir.path().join("test.db");
        let mut conn = Connection::open(&db_path).unwrap();

        run_migrations(&mut conn).unwrap();

        // Verify refinery's tracking table exists
        let count: i32 = conn
            .query_row(
                "SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name='refinery_schema_history'",
                [],
                |row| row.get(0),
            )
            .unwrap();
        assert_eq!(count, 1);
    }
}
```

### Platform Notes

**Windows (Primary):** Database at `C:\Users\{user}\AppData\Roaming\StoryTeller\storyteller.db`

The `dirs` crate handles macOS/Linux paths automatically when cross-platform support is added in Epic 10.

### Scope Boundaries

**This story DOES:**
- Set up SQLite with rusqlite
- Configure refinery migration framework
- Create V1 migration (framework setup only)
- Implement graceful error handling
- Add database status command

**This story does NOT:**
- Create any application tables (Story 2.1)
- Implement connection pooling (not needed for single-user desktop app)
- Add rollback migrations (forward-only is sufficient)

### Previous Story Context

**From Story 0.1:** E2E tests work with Playwright web-layer approach. Testing commands: `pnpm check`, `pnpm test`, `pnpm test:e2e`

**From Epic 1:** Tauri 2.0 + Svelte 5 stack stable. 89 unit tests, 3 E2E tests passing.

### Verification Commands

```bash
# Rust compilation
cd src-tauri && cargo build

# Rust tests
cd src-tauri && cargo test

# Full application build
pnpm tauri build

# After running app, verify database exists (Windows):
# Check: %APPDATA%\StoryTeller\storyteller.db
```

### References

- [Data Architecture](/_bmad-output/architecture/core-architectural-decisions/data-architecture.md)
- [Structure Patterns](/_bmad-output/architecture/implementation-patterns-consistency-rules/structure-patterns.md)
- [Epic 2 Stories](/_bmad-output/planning/epics/epic-2-project-setup-configuration-wizard.md)
- [Epic 1 Retrospective](/_bmad-output/implementation/sprint-artifacts/epic-1-retro-2025-12-26.md)

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Dev Notes incorrectly stated `refinery-rusqlite` is a separate crate. It is actually a **feature flag** of the `refinery` crate. Corrected to: `refinery = { version = "0.8", features = ["rusqlite"] }`

### Completion Notes List

- Implemented SQLite database with rusqlite and refinery migration framework
- Database path: `{app_data}/StoryTeller/storyteller.db` (Windows: `%APPDATA%\StoryTeller\storyteller.db`)
- WAL mode enabled for better performance
- V1__init_schema.sql created with framework setup (no tables - Story 2.1 will add tables)
- Graceful degradation: app continues running if database initialization fails
- `get_database_status` Tauri command returns path, exists, connected (actual connection test), and migration_version per AC#3
- 5 Rust unit tests pass: database creation, WAL mode, migrations idempotent, tracking table creation, graceful degradation
- 89 frontend tests pass, 0 errors/warnings from svelte-check

### Code Review Fixes Applied (2025-12-26)

- **H1 Fixed:** Corrected Dev Notes - refinery uses feature flag `features = ["rusqlite"]`, not separate crate
- **M1 Fixed:** Added `Cargo.lock` to File List
- **M2 Fixed:** `get_database_status` now actually tests connection (opens db) instead of just checking file exists
- **M3 Fixed:** Added `migration_version: Option<i32>` to DatabaseStatus per AC#3 requirement
- **M4 Fixed:** Added `test_init_returns_result_for_graceful_handling` test in `mod.rs`

### File List

- `src-tauri/Cargo.toml` (modified - added dependencies)
- `src-tauri/Cargo.lock` (modified - auto-generated from dependency changes)
- `src-tauri/src/lib.rs` (modified - added db module, init_database, env_logger)
- `src-tauri/src/db/mod.rs` (new - includes graceful degradation test)
- `src-tauri/src/db/error.rs` (new)
- `src-tauri/src/db/connection.rs` (new)
- `src-tauri/src/db/migrations.rs` (new)
- `src-tauri/src/db/commands.rs` (new - returns migration_version per AC#3)
- `src-tauri/migrations/V1__init_schema.sql` (new)

## Change Log

- 2025-12-26: Implemented SQLite database with migrations (Story 2.0)
- 2025-12-26: Code review fixes - H1, M1-M4 addressed, 5 tests now passing, status → done

