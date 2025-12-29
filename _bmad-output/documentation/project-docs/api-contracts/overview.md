# Overview

All communication between the frontend (TypeScript/Svelte) and backend (Rust/Tauri) happens through **Tauri commands**. These commands are registered in `src-tauri/src/lib.rs` and invoked from the frontend using the `invoke()` function.

## Communication Flow
```
Frontend (TypeScript)
    │
    │ invoke<ReturnType>(command, params)
    ▼
Tauri IPC Bridge (JSON serialization)
    │
    ▼
Backend (Rust)
    │
    │ #[tauri::command] function
    ▼
Return Result<T, String>
    │
    ▼
Tauri IPC Bridge (JSON deserialization)
    │
    ▼
Frontend receives Promise<ReturnType>
```

---
