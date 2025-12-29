# Data Migration Strategy

## Refinery Migration System

**Location:** `src-tauri/src/db/migrations.rs`

**Process:**
1. Embed SQL migration files at compile time
2. On app startup, run `migrations::run_migrations()`
3. Refinery checks `refinery_schema_history` table
4. Applies missing migrations in order (V1, V2, ...)

**Migration Naming:**
- Format: `V{version}__{description}.sql`
- Example: `V2__create_projects_schema.sql`
- Versions must be sequential

## Adding New Migrations

**Steps:**
1. Create `src-tauri/migrations/V3__description.sql`
2. Write SQL (CREATE TABLE, ALTER TABLE, etc.)
3. Rebuild app (migrations embedded at compile time)
4. On next launch, migration auto-applies

**Example Future Migration:**
```sql
-- V3__add_chapters_table.sql
CREATE TABLE chapters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    chapter_number INTEGER NOT NULL,
    word_count INTEGER DEFAULT 0,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    UNIQUE (project_id, chapter_number)
);

CREATE INDEX idx_chapters_project ON chapters(project_id);
```

---
