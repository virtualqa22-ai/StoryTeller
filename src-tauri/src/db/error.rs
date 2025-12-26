use thiserror::Error;

#[derive(Error, Debug)]
pub enum DatabaseError {
    #[error("Failed to open database: {0}")]
    ConnectionError(String),

    #[error("Migration failed: {0}")]
    MigrationError(String),

    #[error("Database path not found")]
    PathNotFound,

    #[error("File system error: {0}")]
    IoError(#[from] std::io::Error),
}
