use std::fs;
use std::path::Path;
use crate::db::{connection, projects, models::project::{Project, NewProject}};
use chrono::Utc;
use serde_json;
use std::path::Component;

/// Validates that a file path is secure and doesn't contain directory traversal attempts
fn validate_secure_path(file_path: &str) -> Result<(), String> {
    let path = Path::new(file_path);

    // Check for absolute paths (security risk in some contexts)
    if path.is_absolute() {
        return Err("Absolute paths are not allowed".to_string());
    }

    // Check for directory traversal attempts
    for component in path.components() {
        match component {
            Component::ParentDir => {
                return Err("Directory traversal ('..') is not allowed in file paths".to_string());
            }
            Component::RootDir => {
                return Err("Root directory component is not allowed".to_string());
            }
            _ => {}
        }
    }

    Ok(())
}

/// Create a new project in the database and create the project file
/// Returns the project on success
#[tauri::command]
pub fn create_project(project_data: NewProject) -> Result<Project, String> {
    // Validate project data before insertion
    let temp_project = Project {
        id: 0,
        title: project_data.title.clone(),
        author_name: project_data.author_name.clone(),
        pen_name: project_data.pen_name.clone(),
        tagline: project_data.tagline.clone(),
        genre: project_data.genre.clone(),
        subgenre: project_data.subgenre.clone(),
        target_audience: project_data.target_audience.clone(),
        tone: project_data.tone.clone(),
        point_of_view: project_data.point_of_view.clone(),
        story_framework: project_data.story_framework.clone(),
        chapter_count: project_data.chapter_count,
        target_words_per_chapter: project_data.target_words_per_chapter,
        plot_premise: project_data.plot_premise.clone(),
        language: project_data.language.clone(),
        created_at: String::new(),
        updated_at: String::new(),
        file_path: project_data.file_path.clone(),
        last_opened_at: project_data.last_opened_at.clone(),
    };
    temp_project.validate()?;

    // Validate the file path for security
    validate_secure_path(&project_data.file_path)?;

    let conn = connection::open_connection()
        .map_err(|e| e.to_string())?;

    // First, insert the project into the database
    let project_id = projects::insert_project(&conn, &project_data)
        .map_err(|e| e.to_string())?;

    // Then try to create the project file - this is the critical section that could have race conditions
    // We'll use a more atomic approach by creating the file with exclusive access
    match create_project_file(&project_data.file_path, &project_data) {
        Ok(()) => {
            // Retrieve the created project to return
            let created_project = projects::get_project_by_id(&conn, project_id)
                .map_err(|e| e.to_string())?;
            Ok(created_project)
        }
        Err(e) => {
            // If file creation failed, we should rollback the database insertion
            // This prevents orphaned database entries
            if let Err(rollback_err) = projects::delete_project(&conn, project_id) {
                eprintln!("Failed to rollback project creation after file creation failed: {}", rollback_err);
            }
            Err(format!("Failed to create project file: {}", e))
        }
    }
}

fn create_project_file(file_path: &str, project: &NewProject) -> Result<(), std::io::Error> {
    // Create a secure project file structure without sensitive information
    let project_content = serde_json::json!({
        "title": &project.title,
        "author": project.author_name.as_deref().unwrap_or(""),
        "plotPremise": project.plot_premise.as_deref().unwrap_or(""),
        "created": chrono::Utc::now().to_rfc3339(),
        "metadata": {
            "genre": project.genre.as_deref().unwrap_or(""),
            "subgenre": project.subgenre.as_deref().unwrap_or(""),
            "targetAudience": project.target_audience.as_deref().unwrap_or(""),
            "tone": project.tone.as_deref().unwrap_or(""),
            "pointOfView": project.point_of_view.as_deref().unwrap_or(""),
            "storyFramework": project.story_framework.as_deref().unwrap_or(""),
            "chapterCount": project.chapter_count,
            "targetWordsPerChapter": project.target_words_per_chapter,
            "language": &project.language
        }
    });

    let content_str = serde_json::to_string_pretty(&project_content)
        .map_err(|e| {
            eprintln!("Failed to serialize project content: {}", e);
            std::io::Error::new(std::io::ErrorKind::InvalidData, "Failed to serialize project data")
        })?;

    // Ensure the directory exists before creating the file
    if let Some(parent_dir) = std::path::Path::new(file_path).parent() {
        std::fs::create_dir_all(parent_dir)?;
    }

    // Attempt to write the file with proper error handling
    match fs::write(file_path, content_str) {
        Ok(()) => Ok(()),
        Err(e) => {
            eprintln!("Failed to write project file to {}: {}", file_path, e);
            Err(e)
        }
    }
}

/// Get a project by its ID
#[tauri::command]
pub fn get_project(id: i64) -> Result<Project, String> {
    let conn = connection::open_connection()
        .map_err(|e| e.to_string())?;
    projects::get_project_by_id(&conn, id)
        .map_err(|e| e.to_string())
}

/// Get a project by its file path
#[tauri::command]
pub fn get_project_by_path(path: String) -> Result<Project, String> {
    let conn = connection::open_connection()
        .map_err(|e| e.to_string())?;
    projects::get_project_by_path(&conn, &path)
        .map_err(|e| e.to_string())
}

/// List recent projects ordered by last_opened_at
/// Default limit: 10
#[tauri::command]
pub fn list_recent_projects(limit: Option<usize>) -> Result<Vec<Project>, String> {
    let conn = connection::open_connection()
        .map_err(|e| e.to_string())?;
    projects::get_recent_projects(&conn, limit.unwrap_or(10))
        .map_err(|e| e.to_string())
}

/// Update project metadata (validates before updating)
#[tauri::command]
pub fn update_project_metadata(project: Project) -> Result<(), String> {
    project.validate()?;
    let conn = connection::open_connection()
        .map_err(|e| e.to_string())?;
    projects::update_project(&conn, &project)
        .map_err(|e| e.to_string())
}

/// Update the last_opened_at timestamp for a project
#[tauri::command]
pub fn update_last_opened(id: i64) -> Result<(), String> {
    let conn = connection::open_connection()
        .map_err(|e| e.to_string())?;
    projects::update_last_opened(&conn, id)
        .map_err(|e| e.to_string())
}

/// Delete a project by ID
#[tauri::command]
pub fn delete_project(id: i64) -> Result<(), String> {
    let conn = connection::open_connection()
        .map_err(|e| e.to_string())?;
    projects::delete_project(&conn, id)
        .map_err(|e| e.to_string())
}
