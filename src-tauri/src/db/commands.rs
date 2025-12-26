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
