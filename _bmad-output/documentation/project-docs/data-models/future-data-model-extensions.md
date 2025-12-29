# Future Data Model Extensions

## Planned Tables

**`chapters`**
- `id`, `project_id`, `title`, `chapter_number`, `content`, `word_count`
- One-to-many relationship with `projects`

**`characters`**
- `id`, `project_id`, `name`, `role`, `description`
- Many-to-one relationship with `projects`

**`scenes`**
- `id`, `chapter_id`, `title`, `setting`, `characters`
- Many-to-one relationship with `chapters`

**`tags`**
- `id`, `project_id`, `name`, `color`
- Many-to-many relationship with `projects` (via junction table)

---
