use rusqlite::Connection;
use super::error::DatabaseError;
use super::models::project::{Project, NewProject};

pub fn insert_project(conn: &Connection, project: &NewProject) -> Result<i64, DatabaseError> {
    conn.execute(
        "INSERT INTO projects (title, author_name, pen_name, tagline, genre, subgenre,
         target_audience, tone, point_of_view, story_framework, chapter_count,
         target_words_per_chapter, plot_premise, language, file_path, last_opened_at)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16)",
        rusqlite::params![
            project.title,
            project.author_name,
            project.pen_name,
            project.tagline,
            project.genre,
            project.subgenre,
            project.target_audience,
            project.tone,
            project.point_of_view,
            project.story_framework,
            project.chapter_count,
            project.target_words_per_chapter,
            project.plot_premise,
            project.language,
            project.file_path,
            project.last_opened_at,
        ],
    )
    .map_err(|e| DatabaseError::ConnectionError(e.to_string()))?;

    Ok(conn.last_insert_rowid())
}

pub fn get_project_by_id(conn: &Connection, id: i64) -> Result<Project, DatabaseError> {
    let project = conn.query_row(
        "SELECT id, title, author_name, pen_name, tagline, genre, subgenre, target_audience,
         tone, point_of_view, story_framework, chapter_count, target_words_per_chapter,
         plot_premise, language, created_at, updated_at, file_path, last_opened_at
         FROM projects WHERE id = ?1",
        [id],
        |row| Ok(Project::from(row)),
    )
    .map_err(|e| DatabaseError::ConnectionError(e.to_string()))?;

    Ok(project)
}

pub fn get_project_by_path(conn: &Connection, path: &str) -> Result<Project, DatabaseError> {
    let project = conn.query_row(
        "SELECT id, title, author_name, pen_name, tagline, genre, subgenre, target_audience,
         tone, point_of_view, story_framework, chapter_count, target_words_per_chapter,
         plot_premise, language, created_at, updated_at, file_path, last_opened_at
         FROM projects WHERE file_path = ?1",
        [path],
        |row| Ok(Project::from(row)),
    )
    .map_err(|e| DatabaseError::ConnectionError(e.to_string()))?;

    Ok(project)
}

pub fn get_recent_projects(conn: &Connection, limit: usize) -> Result<Vec<Project>, DatabaseError> {
    let mut stmt = conn
        .prepare(
            "SELECT id, title, author_name, pen_name, tagline, genre, subgenre, target_audience,
             tone, point_of_view, story_framework, chapter_count, target_words_per_chapter,
             plot_premise, language, created_at, updated_at, file_path, last_opened_at
             FROM projects
             ORDER BY
               CASE WHEN last_opened_at IS NULL THEN 0 ELSE 1 END DESC,
               last_opened_at DESC
             LIMIT ?1",
        )
        .map_err(|e| DatabaseError::ConnectionError(e.to_string()))?;

    let projects = stmt
        .query_map([limit], |row| Ok(Project::from(row)))
        .map_err(|e| DatabaseError::ConnectionError(e.to_string()))?
        .collect::<Result<Vec<Project>, _>>()
        .map_err(|e| DatabaseError::ConnectionError(e.to_string()))?;

    Ok(projects)
}

pub fn update_project(conn: &Connection, project: &Project) -> Result<(), DatabaseError> {
    conn.execute(
        "UPDATE projects SET title = ?1, author_name = ?2, pen_name = ?3, tagline = ?4,
         genre = ?5, subgenre = ?6, target_audience = ?7, tone = ?8, point_of_view = ?9,
         story_framework = ?10, chapter_count = ?11, target_words_per_chapter = ?12,
         plot_premise = ?13, language = ?14, file_path = ?15, last_opened_at = ?16
         WHERE id = ?17",
        rusqlite::params![
            project.title,
            project.author_name,
            project.pen_name,
            project.tagline,
            project.genre,
            project.subgenre,
            project.target_audience,
            project.tone,
            project.point_of_view,
            project.story_framework,
            project.chapter_count,
            project.target_words_per_chapter,
            project.plot_premise,
            project.language,
            project.file_path,
            project.last_opened_at,
            project.id,
        ],
    )
    .map_err(|e| DatabaseError::ConnectionError(e.to_string()))?;

    Ok(())
}

pub fn update_last_opened(conn: &Connection, id: i64) -> Result<(), DatabaseError> {
    conn.execute(
        "UPDATE projects SET last_opened_at = CURRENT_TIMESTAMP WHERE id = ?1",
        [id],
    )
    .map_err(|e| DatabaseError::ConnectionError(e.to_string()))?;

    Ok(())
}

pub fn delete_project(conn: &Connection, id: i64) -> Result<(), DatabaseError> {
    conn.execute("DELETE FROM projects WHERE id = ?1", [id])
        .map_err(|e| DatabaseError::ConnectionError(e.to_string()))?;

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use rusqlite::Connection;
    use tempfile::TempDir;
    use std::thread;
    use std::time::Duration;

    fn setup_test_db() -> (TempDir, Connection) {
        let temp_dir = TempDir::new().unwrap();
        let db_path = temp_dir.path().join("test.db");
        let mut conn = Connection::open(&db_path).unwrap();
        crate::db::migrations::run_migrations(&mut conn).unwrap();
        (temp_dir, conn)
    }

    #[test]
    fn test_insert_project_all_fields() {
        let (_temp, conn) = setup_test_db();

        let project = NewProject {
            title: "Test Novel".to_string(),
            author_name: Some("Jane Doe".to_string()),
            pen_name: Some("J.D.".to_string()),
            tagline: Some("A thrilling adventure".to_string()),
            genre: Some("Fantasy".to_string()),
            subgenre: Some("Epic Fantasy".to_string()),
            target_audience: Some("Adult".to_string()),
            tone: Some("Dark,Serious".to_string()),
            point_of_view: Some("Third Person Limited".to_string()),
            story_framework: Some("Three-Act Structure".to_string()),
            chapter_count: Some(25),
            target_words_per_chapter: Some(3500),
            plot_premise: Some("A hero's journey begins...".to_string()),
            language: "en".to_string(),
            file_path: "/path/to/novel.storyteller".to_string(),
            last_opened_at: None,
        };

        let id = insert_project(&conn, &project).unwrap();
        assert!(id > 0);
    }

    #[test]
    fn test_insert_project_minimal_fields() {
        let (_temp, conn) = setup_test_db();

        let project = NewProject {
            title: "Minimal Novel".to_string(),
            author_name: None,
            pen_name: None,
            tagline: None,
            genre: None,
            subgenre: None,
            target_audience: None,
            tone: None,
            point_of_view: None,
            story_framework: None,
            chapter_count: None,
            target_words_per_chapter: None,
            plot_premise: None,
            language: "en".to_string(),
            file_path: "/path/to/minimal.storyteller".to_string(),
            last_opened_at: None,
        };

        let id = insert_project(&conn, &project).unwrap();
        assert!(id > 0);
    }

    #[test]
    fn test_unique_constraint_file_path() {
        let (_temp, conn) = setup_test_db();

        let project1 = NewProject {
            title: "Novel 1".to_string(),
            author_name: None,
            pen_name: None,
            tagline: None,
            genre: None,
            subgenre: None,
            target_audience: None,
            tone: None,
            point_of_view: None,
            story_framework: None,
            chapter_count: None,
            target_words_per_chapter: None,
            plot_premise: None,
            language: "en".to_string(),
            file_path: "/same/path.storyteller".to_string(),
            last_opened_at: None,
        };

        let project2 = NewProject {
            title: "Novel 2".to_string(),
            file_path: "/same/path.storyteller".to_string(),
            ..project1.clone()
        };

        insert_project(&conn, &project1).unwrap();
        let result = insert_project(&conn, &project2);
        assert!(result.is_err());
    }

    #[test]
    fn test_get_project_by_id() {
        let (_temp, conn) = setup_test_db();

        let new_project = NewProject {
            title: "Test Query".to_string(),
            author_name: None,
            pen_name: None,
            tagline: None,
            genre: None,
            subgenre: None,
            target_audience: None,
            tone: None,
            point_of_view: None,
            story_framework: None,
            chapter_count: None,
            target_words_per_chapter: None,
            plot_premise: None,
            language: "en".to_string(),
            file_path: "/path/query.storyteller".to_string(),
            last_opened_at: None,
        };

        let id = insert_project(&conn, &new_project).unwrap();
        let project = get_project_by_id(&conn, id).unwrap();
        assert_eq!(project.title, "Test Query");
    }

    #[test]
    fn test_get_project_by_path() {
        let (_temp, conn) = setup_test_db();

        let new_project = NewProject {
            title: "Path Query".to_string(),
            author_name: None,
            pen_name: None,
            tagline: None,
            genre: None,
            subgenre: None,
            target_audience: None,
            tone: None,
            point_of_view: None,
            story_framework: None,
            chapter_count: None,
            target_words_per_chapter: None,
            plot_premise: None,
            language: "en".to_string(),
            file_path: "/unique/path.storyteller".to_string(),
            last_opened_at: None,
        };

        insert_project(&conn, &new_project).unwrap();
        let project = get_project_by_path(&conn, "/unique/path.storyteller").unwrap();
        assert_eq!(project.title, "Path Query");
    }

    #[test]
    fn test_get_recent_projects_ordered() {
        let (_temp, conn) = setup_test_db();

        // Insert multiple projects with different last_opened_at
        for i in 1..=3 {
            let project = NewProject {
                title: format!("Project {}", i),
                author_name: None,
                pen_name: None,
                tagline: None,
                genre: None,
                subgenre: None,
                target_audience: None,
                tone: None,
                point_of_view: None,
                story_framework: None,
                chapter_count: None,
                target_words_per_chapter: None,
                plot_premise: None,
                language: "en".to_string(),
                file_path: format!("/path/project{}.storyteller", i),
                last_opened_at: None,
            };
            let id = insert_project(&conn, &project).unwrap();

            // Update last_opened_at with sufficient stagger for timestamp resolution (1s for SQLite)
            thread::sleep(Duration::from_secs(1));
            update_last_opened(&conn, id).unwrap();
        }

        let recent = get_recent_projects(&conn, 10).unwrap();
        assert_eq!(recent.len(), 3);
        // Most recent should be first
        assert_eq!(recent[0].title, "Project 3");
    }

    #[test]
    fn test_updated_at_trigger() {
        let (_temp, conn) = setup_test_db();

        let project = NewProject {
            title: "Trigger Test".to_string(),
            author_name: None,
            pen_name: None,
            tagline: None,
            genre: None,
            subgenre: None,
            target_audience: None,
            tone: None,
            point_of_view: None,
            story_framework: None,
            chapter_count: None,
            target_words_per_chapter: None,
            plot_premise: None,
            language: "en".to_string(),
            file_path: "/path/trigger.storyteller".to_string(),
            last_opened_at: None,
        };

        let id = insert_project(&conn, &project).unwrap();
        let before = get_project_by_id(&conn, id).unwrap();

        thread::sleep(Duration::from_secs(1));

        let mut updated = before.clone();
        updated.title = "Updated Title".to_string();
        update_project(&conn, &updated).unwrap();

        let after = get_project_by_id(&conn, id).unwrap();
        assert_ne!(before.updated_at, after.updated_at);
    }

    #[test]
    fn test_update_last_opened() {
        let (_temp, conn) = setup_test_db();

        let project = NewProject {
            title: "Last Opened Test".to_string(),
            author_name: None,
            pen_name: None,
            tagline: None,
            genre: None,
            subgenre: None,
            target_audience: None,
            tone: None,
            point_of_view: None,
            story_framework: None,
            chapter_count: None,
            target_words_per_chapter: None,
            plot_premise: None,
            language: "en".to_string(),
            file_path: "/path/last.storyteller".to_string(),
            last_opened_at: None,
        };

        let id = insert_project(&conn, &project).unwrap();
        update_last_opened(&conn, id).unwrap();

        let updated = get_project_by_id(&conn, id).unwrap();
        assert!(updated.last_opened_at.is_some());
    }

    #[test]
    fn test_delete_project() {
        let (_temp, conn) = setup_test_db();

        let project = NewProject {
            title: "Delete Test".to_string(),
            author_name: None,
            pen_name: None,
            tagline: None,
            genre: None,
            subgenre: None,
            target_audience: None,
            tone: None,
            point_of_view: None,
            story_framework: None,
            chapter_count: None,
            target_words_per_chapter: None,
            plot_premise: None,
            language: "en".to_string(),
            file_path: "/path/delete.storyteller".to_string(),
            last_opened_at: None,
        };

        let id = insert_project(&conn, &project).unwrap();
        delete_project(&conn, id).unwrap();

        let result = get_project_by_id(&conn, id);
        assert!(result.is_err());
    }
}
