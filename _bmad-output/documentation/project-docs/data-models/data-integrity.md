# Data Integrity

## Foreign Key Constraints
**None currently.** Future expansions may add:
- Characters table (FK to projects)
- Chapters table (FK to projects)
- Scenes table (FK to chapters)

## Referential Integrity
- Deleting a project only removes the database record
- Does NOT delete the actual project file on disk
- No cascade deletes (no child tables yet)

## Data Consistency
- `updated_at` automatically maintained by trigger
- Timestamps always in UTC (SQLite `CURRENT_TIMESTAMP`)
- Unique `file_path` prevents duplicates

---
