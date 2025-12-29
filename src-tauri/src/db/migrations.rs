use log::{error, info};
use rusqlite::Connection;

use super::error::DatabaseError;

// embed_migrations! creates a `migrations` module
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

#[cfg(test)]
mod tests {
    use super::*;
    use rusqlite::Connection;
    use tempfile::TempDir;

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

    #[test]
    fn test_v2_migration_runs_after_v1() {
        let temp_dir = TempDir::new().unwrap();
        let db_path = temp_dir.path().join("test.db");
        let mut conn = Connection::open(&db_path).unwrap();

        run_migrations(&mut conn).unwrap();

        // Verify V2 was applied
        let version: i32 = conn
            .query_row(
                "SELECT MAX(version) FROM refinery_schema_history",
                [],
                |row| row.get(0),
            )
            .unwrap();
        assert!(version >= 2, "V2 migration should be applied");
    }

    #[test]
    fn test_projects_table_exists_after_migration() {
        let temp_dir = TempDir::new().unwrap();
        let db_path = temp_dir.path().join("test.db");
        let mut conn = Connection::open(&db_path).unwrap();

        run_migrations(&mut conn).unwrap();

        // Verify projects table exists
        let count: i32 = conn
            .query_row(
                "SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name='projects'",
                [],
                |row| row.get(0),
            )
            .unwrap();
        assert_eq!(count, 1);
    }

    #[test]
    fn test_projects_table_has_correct_columns() {
        let temp_dir = TempDir::new().unwrap();
        let db_path = temp_dir.path().join("test.db");
        let mut conn = Connection::open(&db_path).unwrap();

        run_migrations(&mut conn).unwrap();

        // Query column info
        let mut stmt = conn
            .prepare("PRAGMA table_info(projects)")
            .unwrap();

        let columns: Vec<String> = stmt
            .query_map([], |row| row.get::<_, String>(1))
            .unwrap()
            .collect::<Result<Vec<String>, _>>()
            .unwrap();

        // Verify required columns exist
        assert!(columns.contains(&"id".to_string()));
        assert!(columns.contains(&"title".to_string()));
        assert!(columns.contains(&"file_path".to_string()));
        assert!(columns.contains(&"language".to_string()));
        assert!(columns.contains(&"created_at".to_string()));
        assert!(columns.contains(&"updated_at".to_string()));
        assert!(columns.contains(&"last_opened_at".to_string()));
    }

    #[test]
    fn test_indexes_exist_on_projects() {
        let temp_dir = TempDir::new().unwrap();
        let db_path = temp_dir.path().join("test.db");
        let mut conn = Connection::open(&db_path).unwrap();

        run_migrations(&mut conn).unwrap();

        // Verify last_opened_at index exists
        let count: i32 = conn
            .query_row(
                "SELECT COUNT(*) FROM sqlite_master WHERE type='index' AND name='idx_projects_last_opened'",
                [],
                |row| row.get(0),
            )
            .unwrap();
        assert_eq!(count, 1, "idx_projects_last_opened should exist");

        // Verify created_at index exists
        let count: i32 = conn
            .query_row(
                "SELECT COUNT(*) FROM sqlite_master WHERE type='index' AND name='idx_projects_created'",
                [],
                |row| row.get(0),
            )
            .unwrap();
        assert_eq!(count, 1, "idx_projects_created should exist");
    }

    #[test]
    fn test_trigger_exists_and_fires() {
        let temp_dir = TempDir::new().unwrap();
        let db_path = temp_dir.path().join("test.db");
        let mut conn = Connection::open(&db_path).unwrap();

        run_migrations(&mut conn).unwrap();

        // Verify trigger exists
        let count: i32 = conn
            .query_row(
                "SELECT COUNT(*) FROM sqlite_master WHERE type='trigger' AND name='update_projects_timestamp'",
                [],
                |row| row.get(0),
            )
            .unwrap();
        assert_eq!(count, 1, "update_projects_timestamp trigger should exist");
    }
}
