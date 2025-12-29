# Security Notes

## SQL Injection Protection
- All queries use `rusqlite::params![]` (parameterized)
- Never concatenate user input into SQL strings

## Data Validation
- Enforce validation in Rust (`Project::validate()`)
- Catch errors before database operations
- Return user-friendly error messages

## File Path Safety
- `file_path` stored as string (not validated for existence)
- Future enhancement: validate paths for safety (no `..`, etc.)

---

**Last Updated:** 2025-12-29
