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
        if self.title.trim().is_empty() {
            return Err("Title cannot be empty".to_string());
        }
        if self.file_path.trim().is_empty() {
            return Err("File path cannot be empty".to_string());
        }
        if let Some(tagline) = &self.tagline {
            if tagline.len() > 150 {
                return Err("Tagline must be 150 characters or less".to_string());
            }
        }
        if let Some(premise) = &self.plot_premise {
            if premise.len() > 2000 {
                return Err("Plot premise must be 2000 characters or less".to_string());
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
