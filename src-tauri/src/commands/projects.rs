use std::fs;
use std::path::Path;
use serde::{Deserialize, Serialize};
use tauri::State;
use crate::db::projects::{insert_project, get_project_by_path};
use crate::db::models::project::{NewProject, Project};
use crate::db::error::DatabaseError;
use crate::db::connection::DatabaseConnection;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CreateProjectRequest {
    pub title: String,
    pub author_name: Option<String>,
    pub pen_name: Option<String>,
    pub tagline: Option<String>,
    pub genre: Option<String>,
    pub subgenres: Option<Vec<String>>,
    pub target_audience: Option<String>,
    pub tones: Option<Vec<String>>,
    pub point_of_view: Option<String>,
    pub story_framework: Option<String>,
    pub chapter_count: Option<i32>,
    pub words_per_chapter: Option<i32>,
    pub plot_premise: Option<String>,
    pub ai_provider: Option<String>,
    pub language: String,
}

#[tauri::command]
pub async fn create_project(
    request: CreateProjectRequest,
    db: State<'_, DatabaseConnection>,
) -> Result<Project, String> {
    let conn = db.get_connection().map_err(|e| e.to_string())?;
    
    // Create the file path for the project
    let documents_dir = dirs::document_dir()
        .ok_or("Could not access Documents directory")?;
    
    let project_dir = documents_dir.join("StoryTeller").join("Projects");
    
    // Create the directory if it doesn't exist
    fs::create_dir_all(&project_dir)
        .map_err(|e| format!("Failed to create project directory: {}", e))?;
    
    // Create the project file path
    let safe_title = sanitize_filename(&request.title);
    let project_file_path = project_dir.join(format!("{}.storyteller", safe_title));
    let file_path_str = project_file_path.to_str()
        .ok_or("Invalid file path")?
        .to_string();
    
    // Check if a project with this path already exists
    if Path::new(&file_path_str).exists() {
        return Err("A project with this title already exists".to_string());
    }
    
    // Convert subgenres and tones to comma-separated strings
    let subgenre_str = request.subgenres
        .map(|subgenres| subgenres.join(","))
        .unwrap_or_default();
    
    let tone_str = request.tones
        .map(|tones| tones.join(","))
        .unwrap_or_default();
    
    // Create the NewProject struct
    let new_project = NewProject {
        title: request.title,
        author_name: request.author_name,
        pen_name: request.pen_name,
        tagline: request.tagline,
        genre: request.genre,
        subgenre: if subgenre_str.is_empty() { None } else { Some(subgenre_str) },
        target_audience: request.target_audience,
        tone: if tone_str.is_empty() { None } else { Some(tone_str) },
        point_of_view: request.point_of_view,
        story_framework: request.story_framework,
        chapter_count: request.chapter_count,
        target_words_per_chapter: request.words_per_chapter,
        plot_premise: request.plot_premise,
        language: request.language,
        file_path: file_path_str,
        last_opened_at: None,
    };
    
    // Validate the project before inserting
    let project: Project = new_project.clone().into();
    project.validate()
        .map_err(|e| format!("Validation error: {}", e))?;
    
    // Insert the project into the database
    let project_id = insert_project(&conn, &new_project)
        .map_err(|e| match e {
            DatabaseError::ConnectionError(msg) => format!("Database connection error: {}", msg),
            DatabaseError::QueryError(msg) => format!("Database query error: {}", msg),
            DatabaseError::ValidationError(msg) => format!("Validation error: {}", msg),
        })?;
    
    // Create the project file with initial content
    create_project_file(&file_path_str, &new_project)
        .map_err(|e| format!("Failed to create project file: {}", e))?;
    
    // Retrieve the created project to return
    let created_project = get_project_by_path(&conn, &file_path_str)
        .map_err(|e| format!("Failed to retrieve created project: {}", e.to_string()))?;
    
    Ok(created_project)
}

fn sanitize_filename(filename: &str) -> String {
    // Trim whitespace and handle empty input
    let trimmed = filename.trim();
    if trimmed.is_empty() {
        return "unnamed_project".to_string();
    }
    
    // Remove or replace invalid characters for file names across different operating systems
    let sanitized: String = trimmed
        .chars()
        .map(|c| match c {
            // Windows reserved characters
            '/' | '\\' | '<' | '>' | ':' | '"' | '|' | '?' | '*' => '_',
            // Additional potentially problematic characters
            '^' | '[' | ']' | '{' | '}' | '`' | '~' | '@' | '#' | '%' | '&' | '+' | '=' | ',' => '_',
            // Control characters
            c if c.is_control() => '_',
            // Non-breaking space and other whitespace variations
            '\u{00A0}' | '\u{2000}'..='\u{200F}' | '\u{2028}'..='\u{2029}' => ' ',
            // Replace other potentially problematic characters
            c => c,
        })
        .collect();
    
    // Remove leading/trailing dots and spaces which are problematic on Windows
    let mut result = sanitized.trim_matches(&['.', ' ']).to_string();
    
    // If result is empty after trimming, return a default value
    if result.is_empty() {
        result = "unnamed_project".to_string();
    }
    
    // Ensure the filename is not one of the Windows reserved names
    let lower_result = result.to_lowercase();
    if is_windows_reserved_name(&lower_result) {
        result = format!("project_{}", result);
    }
    
    // Limit the length to avoid file system issues (most file systems have 255 char limits)
    if result.len() > 100 {
        result.truncate(100);
        // Ensure we don't cut in the middle of a multibyte character
        while result.len() < sanitized.len() && !result.is_char_boundary(result.len()) {
            result.pop();
        }
    }
    
    result
}

// Helper function to check if a filename is a Windows reserved name
fn is_windows_reserved_name(name: &str) -> bool {
    matches!(name, 
        "con" | "prn" | "aux" | "nul" | 
        "com1" | "com2" | "com3" | "com4" | "com5" | "com6" | "com7" | "com8" | "com9" | 
        "lpt1" | "lpt2" | "lpt3" | "lpt4" | "lpt5" | "lpt6" | "lpt7" | "lpt8" | "lpt9"
    )
}

fn create_project_file(file_path: &str, project: &NewProject) -> Result<(), std::io::Error> {
    // Sanitize project content to prevent injection attacks
    let sanitized_title = sanitize_json_string(&project.title);
    let sanitized_author = sanitize_json_string(&project.author_name.as_deref().unwrap_or(""));
    let sanitized_plot_premise = sanitize_json_string(&project.plot_premise.as_deref().unwrap_or(""));
    
    // Create a basic project file structure with sanitized content
    let project_content = format!(
        r#"{{"title": "{}", "author": "{}", "plotPremise": "{}", "created": "{}", "language": "{}", "genre": "{}", "target_audience": "{}", "point_of_view": "{}", "story_framework": "{}", "chapter_count": {}}}"#,
        sanitized_title,
        sanitized_author,
        sanitized_plot_premise,
        chrono::Utc::now().to_rfc3339(),
        sanitize_json_string(&project.language),
        sanitize_json_string(&project.genre.as_deref().unwrap_or("")),
        sanitize_json_string(&project.target_audience.as_deref().unwrap_or("")),
        sanitize_json_string(&project.point_of_view.as_deref().unwrap_or("")),
        sanitize_json_string(&project.story_framework.as_deref().unwrap_or("")),
        project.chapter_count.unwrap_or(0)
    );
    
    fs::write(file_path, project_content)?;
    Ok(())
}

// Helper function to sanitize strings for JSON output
fn sanitize_json_string(input: &str) -> String {
    input
        .replace('\\', "\\\\")  // Escape backslashes first
        .replace('"', "\\\"")   // Escape quotes
        .replace('\n', "\\n")   // Escape newlines
        .replace('\r', "\\r")   // Escape carriage returns
        .replace('\t', "\\t")   // Escape tabs
        .replace('\0', "\\u0000") // Escape null characters
}

impl From<NewProject> for Project {
    fn from(new_project: NewProject) -> Self {
        Project {
            id: 0, // Will be set by the database
            title: new_project.title,
            author_name: new_project.author_name,
            pen_name: new_project.pen_name,
            tagline: new_project.tagline,
            genre: new_project.genre,
            subgenre: new_project.subgenre,
            target_audience: new_project.target_audience,
            tone: new_project.tone,
            point_of_view: new_project.point_of_view,
            story_framework: new_project.story_framework,
            chapter_count: new_project.chapter_count,
            target_words_per_chapter: new_project.target_words_per_chapter,
            plot_premise: new_project.plot_premise,
            language: new_project.language,
            created_at: chrono::Utc::now().to_rfc3339(),
            updated_at: chrono::Utc::now().to_rfc3339(),
            file_path: new_project.file_path,
            last_opened_at: new_project.last_opened_at,
        }
    }
}