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
    // Remove or replace invalid characters for file names
    filename
        .chars()
        .map(|c| match c {
            '/' | '\\' | '<' | '>' | ':' | '"' | '|' | '?' | '*' | '^' => '_',
            c if c.is_control() => '_',
            _ => c,
        })
        .collect()
}

fn create_project_file(file_path: &str, project: &NewProject) -> Result<(), std::io::Error> {
    // Create a basic project file structure
    let project_content = format!(
        r#"{{"title": "{}", "author": "{}", "plotPremise": "{}", "created": "{}"}}"#,
        project.title,
        project.author_name.as_deref().unwrap_or(""),
        project.plot_premise.as_deref().unwrap_or(""),
        chrono::Utc::now().to_rfc3339()
    );
    
    fs::write(file_path, project_content)?;
    Ok(())
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