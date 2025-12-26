use log::info;
use rusqlite::Connection;
use std::path::PathBuf;

use super::error::DatabaseError;

pub fn get_database_path() -> Result<PathBuf, DatabaseError> {
    let app_data = dirs::data_dir().ok_or(DatabaseError::PathNotFound)?;
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

#[cfg(test)]
mod tests {
    use rusqlite::Connection;
    use tempfile::TempDir;

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
