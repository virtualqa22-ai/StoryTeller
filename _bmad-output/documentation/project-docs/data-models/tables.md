# Tables

## `projects`

**Purpose:** Store project metadata and tracking information

**Location:** `src-tauri/migrations/V2__create_projects_schema.sql`

### Schema Definition

```sql
CREATE TABLE projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author_name TEXT,
    pen_name TEXT,
    tagline TEXT,
    genre TEXT,
    subgenre TEXT,
    target_audience TEXT,
    tone TEXT,
    point_of_view TEXT,
    story_framework TEXT,
    chapter_count INTEGER,
    target_words_per_chapter INTEGER,
    plot_premise TEXT,
    language TEXT DEFAULT 'en',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    file_path TEXT NOT NULL UNIQUE,
    last_opened_at TIMESTAMP
);
```

### Column Details

| Column | Type | Nullable | Default | Constraints | Description |
|--------|------|----------|---------|-------------|-------------|
| `id` | INTEGER | No | AUTO | PRIMARY KEY | Unique identifier (ROWID) |
| `title` | TEXT | No | - | NOT NULL | Project title |
| `author_name` | TEXT | Yes | NULL | - | Author's real name |
| `pen_name` | TEXT | Yes | NULL | - | Author's pen name |
| `tagline` | TEXT | Yes | NULL | Max 150 chars | Short project tagline |
| `genre` | TEXT | Yes | NULL | - | Primary genre |
| `subgenre` | TEXT | Yes | NULL | - | Subgenre classification |
| `target_audience` | TEXT | Yes | NULL | - | Target reader demographic |
| `tone` | TEXT | Yes | NULL | - | Writing tone/mood |
| `point_of_view` | TEXT | Yes | NULL | - | Narrative perspective |
| `story_framework` | TEXT | Yes | NULL | - | Story structure framework |
| `chapter_count` | INTEGER | Yes | NULL | - | Target number of chapters |
| `target_words_per_chapter` | INTEGER | Yes | NULL | - | Target words per chapter |
| `plot_premise` | TEXT | Yes | NULL | Max 2000 chars | Plot summary |
| `language` | TEXT | No | `'en'` | DEFAULT | Project language code (ISO 639-1) |
| `created_at` | TIMESTAMP | No | CURRENT_TIMESTAMP | AUTO | Creation timestamp |
| `updated_at` | TIMESTAMP | No | CURRENT_TIMESTAMP | AUTO | Last modification timestamp |
| `file_path` | TEXT | No | - | NOT NULL, UNIQUE | Path to project file on disk |
| `last_opened_at` | TIMESTAMP | Yes | NULL | - | Last opened timestamp |

### Indexes

```sql
CREATE INDEX idx_projects_last_opened ON projects(last_opened_at DESC);
CREATE INDEX idx_projects_created ON projects(created_at DESC);
```

**Purpose:**
- `idx_projects_last_opened`: Optimize sorting by recent activity
- `idx_projects_created`: Optimize sorting by creation date

**Query Performance:**
- `list_recent_projects` uses `idx_projects_last_opened` (indexed scan)
- Both indexes support DESC ordering (nulls last)

### Triggers

```sql
CREATE TRIGGER update_projects_timestamp
AFTER UPDATE ON projects
FOR EACH ROW
BEGIN
  UPDATE projects SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;
```

**Purpose:** Automatically update `updated_at` timestamp on any row modification

**Behavior:**
- Fires after every `UPDATE` statement
- Sets `updated_at` to current timestamp
- Does NOT fire on `INSERT` (uses DEFAULT value)

---
