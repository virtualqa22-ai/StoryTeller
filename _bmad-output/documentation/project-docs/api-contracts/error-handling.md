# Error Handling

## Error Response Format
All Tauri commands return `Result<T, String>`. On error, the frontend receives a rejected Promise with the error string.

## Common Error Patterns

### Validation Errors
```rust
"Project validation failed: title cannot be empty"
"Project validation failed: tagline exceeds 150 characters"
"Project validation failed: plot_premise exceeds 2000 characters"
"Project validation failed: file_path cannot be empty"
```

### Database Errors
```rust
"Failed to create project: UNIQUE constraint failed: projects.file_path"
"Project not found with id 123"
"Project not found with path /nonexistent/path.story"
"Failed to update project: [rusqlite error]"
```

### Frontend Error Handling Example
```typescript
try {
    const projectId = await invoke<number>("create_project", { project_data });
    console.log("Project created with ID:", projectId);
} catch (error) {
    if (error.includes("UNIQUE constraint")) {
        alert("A project with this file path already exists.");
    } else {
        alert(`Failed to create project: ${error}`);
    }
}
```

---
