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
            warn!(
                "Database initialization failed: {}. App will continue with limited functionality.",
                e
            );
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
