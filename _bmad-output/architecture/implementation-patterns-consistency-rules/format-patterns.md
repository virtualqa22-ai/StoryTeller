# Format Patterns

## Tauri Result Types - MANDATORY

**Custom AppError Type:**

```rust
// src-tauri/src/utils/error.rs
use serde::Serialize;

#[derive(Debug, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct AppError {
    pub code: String,
    pub message: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub details: Option<String>,
}

impl std::fmt::Display for AppError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "[{}] {}", self.code, self.message)
    }
}

impl std::error::Error for AppError {}

impl AppError {
    pub fn entity_not_found(id: i64) -> Self {
        Self {
            code: "ENTITY_NOT_FOUND".to_string(),
            message: format!("Entity with ID {} not found", id),
            details: None,
        }
    }

    pub fn validation_failed(details: String) -> Self {
        Self {
            code: "VALIDATION_FAILED".to_string(),
            message: "Story Bible validation detected contradictions".to_string(),
            details: Some(details),
        }
    }
}
```

**ALL Tauri Commands Return Result<T, AppError>:**

```rust
// ✅ CORRECT
#[tauri::command]
async fn get_entity(id: i64) -> Result<Entity, AppError> { }

// ❌ WRONG
#[tauri::command]
async fn get_entity(id: i64) -> Result<Entity, String> { }  // String error!
```

**Rule:** Every command uses AppError. No String errors.

## JSON Serialization - MANDATORY

**serde with camelCase for Frontend Compatibility:**

**RULE:** ALL Rust structs that are serialized to JSON (for API responses or Events) **MUST** use `#[serde(rename_all = "camelCase")]` or explicit per-field renames.
**Enforcement:** CI Pipeline will fail if this is missing on public structs.

```rust
// ✅ CORRECT
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Entity {
    pub id: i64,
    pub project_id: i64,       // Serialized as "projectId"
    pub entity_type: EntityType,   // Serialized as "entityType"
    pub name: String,
    pub created_at: String,    // ISO 8601 string
}

// Matches TypeScript:
interface Entity {
  id: number;
  projectId: number;    // camelCase matches serde
  entityType: string;
  name: string;
  createdAt: string;
}
```

**Rule:** All Rust structs sent to frontend use `#[serde(rename_all = "camelCase")]`.

## Date/Time Formats - MANDATORY

**SQLite: Unix Timestamps (INTEGER)**
```sql
CREATE TABLE entities (
    id INTEGER PRIMARY KEY,
    created_at INTEGER NOT NULL,  -- Unix timestamp: 1703251800
    updated_at INTEGER
);
```

**Rust: chrono with ISO String Serialization**
```rust
use chrono::{DateTime, Utc};

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Entity {
    pub id: i64,
    pub created_at: String,  // ISO 8601: "2025-12-22T10:30:00Z"
}

// Convert Unix timestamp → ISO string
pub fn timestamp_to_iso(timestamp: i64) -> String {
    DateTime::from_timestamp(timestamp, 0)
        .unwrap()
        .to_rfc3339()
}
```

**TypeScript: ISO Strings, Display as Localized**
```typescript
interface Entity {
  createdAt: string;  // ISO: "2025-12-22T10:30:00Z"
}

// Display to user
function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleString();
  // Output: "12/22/2025, 10:30:00 AM"
}
```

**Rule:**
- Store: Unix timestamps (SQLite)
- Transfer: ISO 8601 strings (JSON)
- Display: Localized (user's timezone/locale)

## Error Response Format - MANDATORY

**Two-Level Error Structure:**

```rust
// Backend
#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct AppError {
    pub code: String,              // Machine-readable: "ENTITY_NOT_FOUND"
    pub message: String,           // User-facing: "Character not found"
    pub details: Option<String>,   // Developer: Stack trace, context
}
```

**Frontend Handling:**
```typescript
interface AppError {
  code: string;      // "ENTITY_NOT_FOUND"
  message: string;   // "Character not found"
  details?: string;  // Technical details
}

try {
  await invoke('get_entity', { id });
} catch (error) {
  const appError = error as AppError;

  // User sees: message only
  toast.error(appError.message);

  // Developer sees: code + details
  console.error(`[${appError.code}]`, appError.details);

  // Telemetry gets: full error
  captureError(appError);
}
```

**Error Code Categories:**
```rust
// Naming convention: {DOMAIN}_{ERROR_TYPE}
"ENTITY_NOT_FOUND"
"ENTITY_DUPLICATE_NAME"
"VALIDATION_FAILED"
"AI_RATE_LIMIT_EXCEEDED"
"AI_GENERATION_FAILED"
"EXPORT_FORMAT_INVALID"
"EXPORT_EPUB_VALIDATION_FAILED"
```

**Rule:**
- Codes: SCREAMING_SNAKE_CASE with domain prefix
- Messages: User-friendly, actionable
- Details: Technical info for debugging only
