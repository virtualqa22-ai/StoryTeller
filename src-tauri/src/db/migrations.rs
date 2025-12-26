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
}
