use keyring::{Entry, Error as KeyringError};

const SERVICE_NAME: &str = "com.storyteller.app";

/// Store API key securely in OS keychain
///
/// Uses platform-specific secure storage:
/// - macOS: Keychain
/// - Windows: Credential Manager
/// - Linux: Secret Service (libsecret)
#[tauri::command]
pub async fn store_api_key(provider: String, api_key: String) -> Result<(), String> {
    let entry = Entry::new(SERVICE_NAME, &provider)
        .map_err(|e| format!("Failed to access keychain: {}", e))?;

    entry.set_password(&api_key)
        .map_err(|e| format!("Failed to store API key: {}", e))?;

    Ok(())
}

/// Retrieve API key from OS keychain
///
/// Returns None if the key doesn't exist (not an error)
#[tauri::command]
pub async fn retrieve_api_key(provider: String) -> Result<Option<String>, String> {
    let entry = Entry::new(SERVICE_NAME, &provider)
        .map_err(|e| format!("Failed to access keychain: {}", e))?;

    match entry.get_password() {
        Ok(password) => Ok(Some(password)),
        Err(KeyringError::NoEntry) => Ok(None), // Key doesn't exist - not an error
        Err(e) => Err(format!("Failed to retrieve API key: {}", e))
    }
}

/// Delete API key from OS keychain
#[tauri::command]
pub async fn delete_api_key(provider: String) -> Result<(), String> {
    let entry = Entry::new(SERVICE_NAME, &provider)
        .map_err(|e| format!("Failed to access keychain: {}", e))?;

    match entry.delete_credential() {
        Ok(_) => Ok(()),
        Err(KeyringError::NoEntry) => Ok(()), // Already deleted - not an error
        Err(e) => Err(format!("Failed to delete API key: {}", e))
    }
}
