# Performance Notes

- **Synchronous Database Operations:** All commands use blocking SQLite calls (sufficient for desktop app)
- **No Connection Pooling:** New connection opened per command (lightweight for SQLite)
- **Indexed Queries:** `list_recent_projects` uses indexed columns for fast sorting
- **Serialization Overhead:** Minimal (serde_json is fast, project objects are small)

---
