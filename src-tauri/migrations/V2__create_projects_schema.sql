-- StoryTeller Projects Table
-- Migration V2: Create projects table with full metadata support

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

-- Index for recent projects query (Story 2.2)
CREATE INDEX idx_projects_last_opened ON projects(last_opened_at DESC);

-- Index for project list sorting
CREATE INDEX idx_projects_created ON projects(created_at DESC);

-- Trigger to auto-update updated_at on changes
CREATE TRIGGER update_projects_timestamp
AFTER UPDATE ON projects
FOR EACH ROW
BEGIN
  UPDATE projects SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;
