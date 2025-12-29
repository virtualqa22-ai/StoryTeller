# Security Notes

- **Parameterized Queries:** All SQL uses `rusqlite::params![]` (no SQL injection risk)
- **Input Validation:** Both frontend (TypeScript) and backend (Rust) validate inputs
- **IPC Allowlist:** Only registered commands can be invoked from frontend
- **No File Path Validation:** Currently, `file_path` is not validated for existence or safety (TODO)

---
