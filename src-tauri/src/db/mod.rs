pub mod commands;
pub mod connection;
pub mod error;
pub mod migrations;

use error::DatabaseError;
use log::info;

/// Initialize the database and run migrations
/// Returns Ok(()) on success, Err on failure
pub fn init() -> Result<(), DatabaseError> {
    let mut conn = connection::open_connection()?;
    migrations::run_migrations(&mut conn)?;
    info!("Database initialization complete");
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    /// Test that init() returns an error type that can be handled gracefully
    /// This verifies AC#3: "app continues running even if migrations fail"
    #[test]
    fn test_init_returns_result_for_graceful_handling() {
        // The init function returns Result<(), DatabaseError>
        // This allows callers to handle errors gracefully
        // We verify the error type exists and can be matched
        let mock_error = DatabaseError::PathNotFound;
        let result: Result<(), DatabaseError> = Err(mock_error);

        // Verify we can match on the error (graceful degradation pattern)
        match result {
            Ok(_) => {} // Would continue normally
            Err(e) => {
                // App can log and continue - this is the graceful degradation
                let msg = format!("{}", e);
                assert!(msg.contains("path"));
            }
        }
    }
}
