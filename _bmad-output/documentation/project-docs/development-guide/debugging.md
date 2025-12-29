# Debugging

## Frontend Debugging

### Browser DevTools
- Open DevTools in Tauri app: `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Option+I` (macOS)
- Console logs appear in DevTools console
- Network tab shows Tauri IPC calls

### Svelte DevTools
- Install Svelte DevTools browser extension (works in Tauri)
- Inspect component state and props

---

## Backend Debugging

### Logging
```rust
use log::{info, warn, error};

info!("Project created: {}", id);
warn!("Database connection slow");
error!("Failed to create project: {}", err);
```

**View logs:** Check terminal where `pnpm tauri dev` is running

### Rust Debugger
```bash
# Build with debug symbols
cargo build

# Run with debugger (VS Code: F5)
```

---
