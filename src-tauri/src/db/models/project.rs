use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Project {
    pub id: i64,
    pub title: String,
    pub author_name: Option<String>,
    pub pen_name: Option<String>,
    pub tagline: Option<String>,
    pub genre: Option<String>,
    pub subgenre: Option<String>,
    pub target_audience: Option<String>,
    pub tone: Option<String>,
    pub point_of_view: Option<String>,
    pub story_framework: Option<String>,
    pub chapter_count: Option<i32>,
    pub target_words_per_chapter: Option<i32>,
    pub plot_premise: Option<String>,
    pub language: String,
    pub created_at: String, // ISO 8601 timestamp
    pub updated_at: String,
    pub file_path: String,
    pub last_opened_at: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NewProject {
    pub title: String,
    pub author_name: Option<String>,
    pub pen_name: Option<String>,
    pub tagline: Option<String>,
    pub genre: Option<String>,
    pub subgenre: Option<String>,
    pub target_audience: Option<String>,
    pub tone: Option<String>,
    pub point_of_view: Option<String>,
    pub story_framework: Option<String>,
    pub chapter_count: Option<i32>,
    pub target_words_per_chapter: Option<i32>,
    pub plot_premise: Option<String>,
    pub language: String,
    pub file_path: String,
    pub last_opened_at: Option<String>,
}

impl Project {
    pub fn validate(&self) -> Result<(), String> {
        // Validate title
        if self.title.trim().is_empty() {
            return Err("Title cannot be empty".to_string());
        }
        if self.title.len() > 200 {
            return Err("Title must be 200 characters or less".to_string());
        }

        // Validate file path
        if self.file_path.trim().is_empty() {
            return Err("File path cannot be empty".to_string());
        }
        if self.file_path.len() > 500 {
            return Err("File path is too long".to_string());
        }

        // Validate author name if present
        if let Some(author_name) = &self.author_name {
            if author_name.len() > 100 {
                return Err("Author name must be 100 characters or less".to_string());
            }
        }

        // Validate pen name if present
        if let Some(pen_name) = &self.pen_name {
            if pen_name.len() > 100 {
                return Err("Pen name must be 100 characters or less".to_string());
            }
        }

        // Validate tagline if present
        if let Some(tagline) = &self.tagline {
            if tagline.len() > 150 {
                return Err("Tagline must be 150 characters or less".to_string());
            }
        }

        // Validate genre if present
        if let Some(genre) = &self.genre {
            if genre.len() > 50 {
                return Err("Genre must be 50 characters or less".to_string());
            }
        }

        // Validate subgenre if present
        if let Some(subgenre) = &self.subgenre {
            if subgenre.len() > 100 {
                return Err("Subgenre must be 100 characters or less".to_string());
            }
        }

        // Validate target audience if present
        if let Some(target_audience) = &self.target_audience {
            if target_audience.len() > 50 {
                return Err("Target audience must be 50 characters or less".to_string());
            }
        }

        // Validate tone if present
        if let Some(tone) = &self.tone {
            if tone.len() > 50 {
                return Err("Tone must be 50 characters or less".to_string());
            }
        }

        // Validate point of view if present
        if let Some(point_of_view) = &self.point_of_view {
            if point_of_view.len() > 50 {
                return Err("Point of view must be 50 characters or less".to_string());
            }
        }

        // Validate story framework if present
        if let Some(story_framework) = &self.story_framework {
            if story_framework.len() > 50 {
                return Err("Story framework must be 50 characters or less".to_string());
            }
        }

        // Validate chapter count if present
        if let Some(chapter_count) = self.chapter_count {
            if chapter_count < 1 || chapter_count > 1000 {
                return Err("Chapter count must be between 1 and 1000".to_string());
            }
        }

        // Validate target words per chapter if present
        if let Some(target_words_per_chapter) = self.target_words_per_chapter {
            if target_words_per_chapter < 100 || target_words_per_chapter > 50000 {
                return Err("Target words per chapter must be between 100 and 50000".to_string());
            }
        }

        // Validate plot premise if present
        if let Some(plot_premise) = &self.plot_premise {
            if plot_premise.len() > 2000 {
                return Err("Plot premise must be 2000 characters or less".to_string());
            }
        }

        // Validate language
        if self.language.len() > 10 {
            return Err("Language code is too long".to_string());
        }

        // Validate timestamps
        if self.created_at.len() > 50 {
            return Err("Created at timestamp is too long".to_string());
        }
        if self.updated_at.len() > 50 {
            return Err("Updated at timestamp is too long".to_string());
        }

        // Validate last opened at if present
        if let Some(last_opened_at) = &self.last_opened_at {
            if last_opened_at.len() > 50 {
                return Err("Last opened at timestamp is too long".to_string());
            }
        }

        Ok(())
    }

    pub fn get_target_word_count(&self) -> i32 {
        self.chapter_count.unwrap_or(20) * self.target_words_per_chapter.unwrap_or(3000)
    }
}

impl From<&rusqlite::Row<'_>> for Project {
    fn from(row: &rusqlite::Row) -> Self {
        Project {
            id: row.get(0).unwrap(),
            title: row.get(1).unwrap(),
            author_name: row.get(2).unwrap(),
            pen_name: row.get(3).unwrap(),
            tagline: row.get(4).unwrap(),
            genre: row.get(5).unwrap(),
            subgenre: row.get(6).unwrap(),
            target_audience: row.get(7).unwrap(),
            tone: row.get(8).unwrap(),
            point_of_view: row.get(9).unwrap(),
            story_framework: row.get(10).unwrap(),
            chapter_count: row.get(11).unwrap(),
            target_words_per_chapter: row.get(12).unwrap(),
            plot_premise: row.get(13).unwrap(),
            language: row.get(14).unwrap(),
            created_at: row.get(15).unwrap(),
            updated_at: row.get(16).unwrap(),
            file_path: row.get(17).unwrap(),
            last_opened_at: row.get(18).unwrap(),
        }
    }
}
