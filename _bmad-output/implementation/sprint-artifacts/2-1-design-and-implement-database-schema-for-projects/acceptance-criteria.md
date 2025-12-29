# Acceptance Criteria

1. **Given** the SQLite database is configured with migrations
   **When** the team creates migration `V2__create_projects_schema.sql`
   **Then** the migration defines a `projects` table with fields: id (PRIMARY KEY), title (TEXT NOT NULL), author_name (TEXT), pen_name (TEXT), tagline (TEXT), genre (TEXT), subgenre (TEXT), target_audience (TEXT), tone (TEXT), point_of_view (TEXT), story_framework (TEXT), chapter_count (INTEGER), target_words_per_chapter (INTEGER), plot_premise (TEXT), language (TEXT DEFAULT 'en'), created_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP), updated_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP), file_path (TEXT NOT NULL UNIQUE), last_opened_at (TIMESTAMP)
   **And** the schema includes indexes on frequently queried fields (last_opened_at, created_at)
   **And** the migration includes a trigger to auto-update `updated_at` on row changes

2. **Given** the projects table is created
   **When** the team tests the schema with sample data
   **Then** project records can be inserted with all fields
   **And** records can be queried by id or file_path
   **And** records can be ordered by last_opened_at for recent projects list
   **And** the updated_at trigger fires correctly on UPDATE operations
