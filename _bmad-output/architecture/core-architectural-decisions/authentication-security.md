# Authentication & Security

## Authentication: None Required

**Decision:** No authentication system needed

**Rationale:**
- Local-only desktop application (no server, no accounts)
- Single-user per installation
- No cloud sync, no shared data

## API Key Storage: OS Keychain

**Decision:** Use OS-level credential storage for AI provider API keys

**Implementation per Platform:**

**macOS:** Keychain Services
```rust
use security_framework::passwords::{set_generic_password, get_generic_password};

pub fn store_api_key(provider: &str, key: &str) -> Result<()> {
    set_generic_password("StoryTeller", provider, key.as_bytes())?;
    Ok(())
}
```

**Windows:** Windows Credential Manager
```rust
use windows::Win32::Security::Credentials::CredWriteW;

pub fn store_api_key(provider: &str, key: &str) -> Result<()> {
    // Windows Credential Manager API
    CredWriteW(&credential, 0)?;
    Ok(())
}
```

**Linux:** Secret Service API (via `secret-service` crate)
```rust
use secret_service::{SecretService, EncryptionType};

pub fn store_api_key(provider: &str, key: &str) -> Result<()> {
    let ss = SecretService::new(EncryptionType::Dh)?;
    let collection = ss.get_default_collection()?;
    collection.create_item("StoryTeller", provider, key)?;
    Ok(())
}
```

**Fallback:** Encrypted file if keychain unavailable
- AES-256-GCM encryption
- Key derived from machine-specific identifier
- Stored in app data directory

## Data Encryption at Rest

**Decision:** Minimal encryption (API keys only)

**Rationale:**
- Novel content stored in plain SQLite (user can encrypt disk if needed)
- API keys encrypted via OS keychain (see above)
- No sensitive user data (no passwords, no PII)
- Full-disk encryption (BitLocker/FileVault) is user's responsibility

**Future Consideration:**
- Optional project-level encryption (password-protected projects)
- Deferred to post-MVP based on user demand

## Tauri IPC Security

**Decision:** Use Tauri 2.0 capability system

**Configuration:**
```json
// src-tauri/capabilities/default.json
{
  "identifier": "default",
  "description": "Default capabilities",
  "windows": ["main"],
  "permissions": [
    "core:default",
    "fs:read-file",
    "fs:write-file",
    "dialog:open",
    "dialog:save",
    "shell:execute"
  ]
}
```

**Command Access Control:**
```rust
#[tauri::command]
#[requires(capability = "story-bible:write")]
async fn save_entity(entity: Entity) -> Result<EntityId> {
    // Only callable if capability granted
}
```

**Security Principles:**
- Principle of least privilege (only grant needed capabilities)
- No eval() or innerHTML in frontend (XSS prevention)
- Content Security Policy configured in tauri.conf.json
- Webview sandboxed by default
