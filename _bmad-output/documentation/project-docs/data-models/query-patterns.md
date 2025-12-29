# Query Patterns

## Common Queries

### List Recent Projects
```sql
SELECT * FROM projects
ORDER BY last_opened_at DESC NULLS LAST, created_at DESC
LIMIT ?;
```
**Uses:** `idx_projects_last_opened` index

### Find by ID
```sql
SELECT * FROM projects WHERE id = ?;
```
**Uses:** PRIMARY KEY (implicit index)

### Find by Path
```sql
SELECT * FROM projects WHERE file_path = ?;
```
**Uses:** UNIQUE constraint (implicit index)

### Create Project
```sql
INSERT INTO projects (title, file_path, ...) VALUES (?, ?, ...);
```
**Returns:** `last_insert_rowid()` (project ID)

### Update Project
```sql
UPDATE projects
SET title = ?, author_name = ?, ...
WHERE id = ?;
```
**Trigger:** Automatically updates `updated_at`

### Update Last Opened
```sql
UPDATE projects
SET last_opened_at = CURRENT_TIMESTAMP
WHERE id = ?;
```
**Trigger:** Also updates `updated_at`

### Delete Project
```sql
DELETE FROM projects WHERE id = ?;
```
**Cascade:** None (no child tables)

---
