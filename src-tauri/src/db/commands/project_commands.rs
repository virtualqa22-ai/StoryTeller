use crate::db::{connection, projects, models::project::{Project, NewProject}};

/// Create a new project in the database
/// Returns the project ID on success
#[tauri::command]
pub fn create_project(project_data: NewProject) -> Result<i64, String> {
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

    let conn = connection::open_connection()
        .map_err(|e| e.to_string())?;
    projects::insert_project(&conn, &project_data)
        .map_err(|e| e.to_string())
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
