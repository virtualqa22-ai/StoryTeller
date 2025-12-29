# Data Serialization

## Rust → TypeScript (Response)

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

## TypeScript → Rust (Request)

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
