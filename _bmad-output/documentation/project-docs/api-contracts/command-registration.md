# Command Registration

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
