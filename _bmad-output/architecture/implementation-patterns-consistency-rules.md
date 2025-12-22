# Implementation Patterns & Consistency Rules

## Purpose and Scope

This section defines mandatory patterns that **all AI agents must follow** when implementing StoryTeller features. These patterns prevent conflicts, ensure consistency, and enable multiple agents to work on the codebase without breaking each other's code.

**Critical Conflict Points Identified:** 20+ areas where different AI agents could make incompatible implementation choices.

## Naming Conventions

### Rust Naming (Backend) - MANDATORY

**Functions and Variables: snake_case**
```rust
// ✅ CORRECT
pub fn validate_story_bible(text: &str) -> ValidationResult { }
let entity_count = entities.len();
let user_preferences = load_preferences();

// ❌ WRONG
pub fn validateStoryBible(text: &str) -> ValidationResult { }
let entityCount = entities.len();
let userPreferences = load_preferences();
```

**Types, Structs, Enums, Traits: PascalCase**
```rust
// ✅ CORRECT
pub struct StoryBible { }
pub struct ValidationResult { }
pub enum EntityType { Character, Location, Theme }
pub trait ValidationEngine { }

// ❌ WRONG
pub struct story_bible { }
pub enum entity_type { character, location, theme }
```

**Constants: SCREAMING_SNAKE_CASE**
```rust
// ✅ CORRECT
const MAX_ENTITIES: usize = 10_000;
const DEFAULT_CHUNK_SIZE: usize = 2000;
const API_TIMEOUT_SECONDS: u64 = 30;

// ❌ WRONG
const maxEntities: usize = 10_000;
const default_chunk_size: usize = 2000;
```

**Modules: snake_case**
```rust
// ✅ CORRECT
mod story_bible;
mod ai_orchestrator;
mod export_engine;

// ❌ WRONG
mod StoryBible;
mod AIOrchestrator;
```

### TypeScript Naming (Frontend) - MANDATORY

**Variables and Functions: camelCase**
```typescript
// ✅ CORRECT
const editorState = new EditorState();
let wordCount = 0;
function validateContent(text: string): ValidationResult { }

// ❌ WRONG
const editor_state = new EditorState();
let word_count = 0;
function validate_content(text: string): ValidationResult { }
```

**Classes, Interfaces, Types: PascalCase**
```typescript
// ✅ CORRECT
class EditorState { }
interface ValidationResult { }
type EntityType = 'character' | 'location' | 'theme';

// ❌ WRONG
class editorState { }
interface validation_result { }
type entityType = 'character' | 'location';
```

**Svelte Components: PascalCase**
```typescript
// ✅ CORRECT
// File: StoryBibleValidator.svelte
// File: EditorToolbar.svelte
// File: EntityForm.svelte

// ❌ WRONG
// File: story-bible-validator.svelte  (kebab-case)
// File: storyBibleValidator.svelte    (camelCase)
// File: entity_form.svelte            (snake_case)
```

**Constants: SCREAMING_SNAKE_CASE**
```typescript
// ✅ CORRECT
const MAX_WORD_COUNT = 150_000;
const API_TIMEOUT_MS = 30_000;
const AUTOSAVE_INTERVAL_MS = 30_000;

// ❌ WRONG
const maxWordCount = 150_000;
const apiTimeoutMs = 30_000;
```

### Database Naming (SQL) - MANDATORY

**Tables: Plural snake_case**
```sql
-- ✅ CORRECT
CREATE TABLE entities (...)
CREATE TABLE prompt_templates (...)
CREATE TABLE relationships (...)
CREATE TABLE chapters (...)

-- ❌ WRONG
CREATE TABLE entity (...)              -- Singular
CREATE TABLE Entity (...)              -- PascalCase
CREATE TABLE promptTemplates (...)     -- camelCase
```

**Columns: snake_case**
```sql
-- ✅ CORRECT
CREATE TABLE entities (
    id INTEGER PRIMARY KEY,
    project_id INTEGER NOT NULL,
    entity_type TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- ❌ WRONG
CREATE TABLE entities (
    id INTEGER,
    projectId INTEGER,      -- camelCase
    EntityType TEXT,        -- PascalCase
    CreatedAt TIMESTAMP
);
```

**Indexes: idx_{table}_{columns}**
```sql
-- ✅ CORRECT
CREATE INDEX idx_entities_project_id ON entities(project_id);
CREATE INDEX idx_entities_name ON entities(name);
CREATE INDEX idx_chapters_project_id_order ON chapters(project_id, order);

-- ❌ WRONG
CREATE INDEX entities_project_id_index ON entities(project_id);
CREATE INDEX EntitiesProjectId ON entities(project_id);
```

**Foreign Keys: {referenced_table}_id**
```sql
-- ✅ CORRECT
CREATE TABLE chapters (
    id INTEGER PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id),
    entity_id INTEGER REFERENCES entities(id)
);

-- ❌ WRONG
CREATE TABLE chapters (
    id INTEGER,
    fk_project INTEGER,     -- Unclear
    rel_entity INTEGER      -- Unclear
);
```

### Tauri Command Naming - MANDATORY

**Commands: snake_case (Rust convention)**
```rust
// ✅ CORRECT
#[tauri::command]
async fn validate_story_bible(text: String) -> Result<ValidationResult, AppError> { }

#[tauri::command]
async fn get_all_entities(project_id: i64) -> Result<Vec<Entity>, AppError> { }

#[tauri::command]
async fn generate_chapter(prompt: String) -> Result<String, AppError> { }

// ❌ WRONG
#[tauri::command]
async fn validateStoryBible(text: String) -> Result<ValidationResult, AppError> { }

#[tauri::command]
async fn getAllEntities(projectId: i64) -> Result<Vec<Entity>, AppError> { }
```

**Frontend Invoke: snake_case (matches Rust)**
```typescript
// ✅ CORRECT
import { invoke } from '@tauri-apps/api/core';

const result = await invoke<ValidationResult>('validate_story_bible', {
  text: content
});

const entities = await invoke<Entity[]>('get_all_entities', {
  projectId: currentProject.id
});

// ❌ WRONG
const result = await invoke('validateStoryBible', { text });  // Doesn't match Rust
```

### File Naming - MANDATORY

**Rust Files: snake_case.rs**
```
// ✅ CORRECT
src-tauri/src/
  story_bible.rs
  ai_orchestrator.rs
  export_engine.rs
  validation_test.rs

// ❌ WRONG
src-tauri/src/
  StoryBible.rs
  aiOrchestrator.rs
  Validation.test.rs
```

**TypeScript/Svelte: PascalCase for components, camelCase for utilities**
```
// ✅ CORRECT
src/lib/
  components/
    StoryBibleValidator.svelte
    EditorToolbar.svelte
  stores/
    editor.svelte.ts
    storyBible.svelte.ts
  utils/
    formatting.ts
    debounce.ts

// ❌ WRONG
src/lib/
  components/
    story-bible-validator.svelte  -- kebab-case
    editorToolbar.svelte          -- camelCase file
  stores/
    Editor.svelte.ts              -- PascalCase
```

**Test Files: Match source + .test or _test**
```
// ✅ CORRECT
src-tauri/src/
  story_bible.rs
  story_bible_test.rs

src/lib/
  components/StoryBibleValidator.svelte
  components/StoryBibleValidator.test.ts

// ❌ WRONG
src/lib/
  components/StoryBibleValidator.svelte
  tests/validator.test.ts  -- Name doesn't match source
```

## Structure Patterns

### Rust Module Organization - MANDATORY

**Domain-Driven Structure:**

```
src-tauri/src/
├── main.rs                 # App entry, Tauri builder, state initialization
├── lib.rs                  # Optional: library re-exports
│
├── commands.rs             # THIN wrappers only - delegate to services
│
├── story_bible/            # Story Bible domain
│   ├── mod.rs              # Public API exports
│   ├── entities.rs         # Entity models and CRUD
│   ├── validation.rs       # Contradiction detection logic
│   ├── vector_store.rs     # Qdrant client integration
│   ├── relationships.rs    # Entity relationship management
│   └── tests.rs            # Module-level integration tests
│
├── ai/                     # AI orchestration domain
│   ├── mod.rs
│   ├── orchestrator.rs     # Main coordination logic
│   ├── providers.rs        # Provider trait + implementations
│   ├── rate_limiter.rs     # Token bucket algorithm
│   ├── streaming.rs        # Stream response handling
│   ├── prompts.rs          # Prompt template management
│   └── tests.rs
│
├── export/                 # Export engine domain
│   ├── mod.rs
│   ├── pdf.rs              # Puppeteer sidecar coordinator
│   ├── epub.rs             # EPUB3 builder implementation
│   ├── docx.rs             # DOCX sidecar coordinator
│   ├── validation.rs       # EPUBCheck integration
│   └── tests.rs
│
├── db/                     # Database infrastructure
│   ├── mod.rs
│   ├── connection.rs       # SQLite connection pool
│   ├── migrations.rs       # refinery integration
│   └── schema.rs           # Rust type definitions for tables
│
├── ux_services/            # UX layer services
│   ├── mod.rs
│   ├── onboarding.rs       # First-run wizard logic
│   ├── style_profile.rs    # ONNX style analysis
│   ├── shortcuts.rs        # Keyboard shortcut management
│   └── tests.rs
│
└── utils/                  # Infrastructure utilities ONLY
    ├── mod.rs
    ├── crypto.rs           # OS keychain abstraction
    ├── telemetry.rs        # Sentry integration
    └── error.rs            # AppError type definition
```

**Rules:**
1. Business logic MUST be in domain modules (story_bible, ai, export)
2. utils/ for infrastructure only (NO domain logic)
3. commands.rs contains ONLY thin wrappers (1-5 lines each)
4. Each domain module has tests.rs for integration tests

**Anti-Pattern:**
```
src-tauri/src/
├── main.rs
├── validation.rs           # ❌ Which domain? Unclear!
├── models.rs               # ❌ All models in one file (unmaintainable)
├── helpers.rs              # ❌ Dumping ground (forbidden!)
├── utils.rs                # ❌ Domain logic mixed with utilities
```

### Svelte Project Organization - MANDATORY

**Feature-Based Structure:**

```
src/
├── lib/
│   ├── components/
│   │   ├── fluent/         # Reusable design system components
│   │   │   ├── Button.svelte
│   │   │   ├── Input.svelte
│   │   │   ├── Modal.svelte
│   │   │   ├── Card.svelte
│   │   │   ├── Toast.svelte
│   │   │   └── index.ts    # Barrel exports
│   │   │
│   │   ├── editor/         # Editor feature
│   │   │   ├── Editor.svelte
│   │   │   ├── EditorToolbar.svelte
│   │   │   ├── WordCounter.svelte
│   │   │   ├── AutoSaveIndicator.svelte
│   │   │   └── index.ts
│   │   │
│   │   ├── story-bible/    # Story Bible feature
│   │   │   ├── EntityList.svelte
│   │   │   ├── EntityForm.svelte
│   │   │   ├── ValidationPanel.svelte
│   │   │   ├── SuggestionSidebar.svelte
│   │   │   └── index.ts
│   │   │
│   │   ├── onboarding/     # Onboarding feature
│   │   │   ├── WelcomeStep.svelte
│   │   │   ├── PitchStep.svelte
│   │   │   ├── WizardContainer.svelte
│   │   │   └── index.ts
│   │   │
│   │   └── export/         # Export feature
│   │       ├── ExportDialog.svelte
│   │       ├── FormatSelector.svelte
│   │       ├── ProgressBar.svelte
│   │       └── index.ts
│   │
│   ├── stores/             # Global reactive state (Svelte runes)
│   │   ├── editor.svelte.ts
│   │   ├── storyBible.svelte.ts
│   │   ├── project.svelte.ts
│   │   ├── user.svelte.ts
│   │   └── ui.svelte.ts    # Global UI state (modals, toasts)
│   │
│   ├── api/                # Tauri command wrappers (typed)
│   │   ├── storyBible.ts
│   │   ├── ai.ts
│   │   ├── export.ts
│   │   ├── projects.ts
│   │   └── types.ts        # Shared TypeScript interfaces
│   │
│   └── utils/              # Pure utilities (no business logic)
│       ├── formatting.ts
│       ├── validation.ts
│       ├── debounce.ts
│       └── dates.ts
│
├── routes/                 # SvelteKit routes (if used)
│   └── +page.svelte
│
├── App.svelte              # Root component
└── main.ts                 # Frontend entry point
```

**Rules:**
1. Components grouped by feature (max 10 components per folder)
2. Barrel exports (index.ts) for clean imports
3. Stores are one file per domain (editor.svelte.ts, NOT editor/index.ts)
4. api/ wrappers provide type safety for Tauri commands
5. utils/ for pure functions only (NO state, NO side effects)

**Anti-Pattern:**
```
src/lib/
├── components/
│   ├── Button.svelte       # ❌ Flat structure (50+ files, hard to navigate)
│   ├── EntityList.svelte
│   ├── Editor.svelte
│   ├── ... 47 more files
```

### Test Organization - MANDATORY

**Co-Located Unit Tests:**

**Rust:**
```
src-tauri/src/
  story_bible/
    mod.rs
    validation.rs
    validation_test.rs      # ✅ Co-located OR tests/validation.rs
```

**TypeScript:**
```
src/lib/
  components/
    StoryBibleValidator.svelte
    StoryBibleValidator.test.ts  # ✅ Co-located
```

**Separate E2E Tests:**
```
tests/
  e2e/
    story-bible.spec.ts
    ai-generation.spec.ts
    export.spec.ts
  fixtures/
    sample-entities.json
    test-novel.txt
```

**Rule:** Unit tests co-located with source. Integration/E2E tests in separate `tests/` folder.

### Tauri Commands Organization - MANDATORY

**Thin Command Wrappers (commands.rs):**

```rust
// src-tauri/src/commands.rs
use crate::story_bible::StoryBibleService;
use crate::ai::AIOrchestrator;
use crate::error::AppError;
use tauri::State;

// ✅ CORRECT: 3-5 line wrappers
#[tauri::command]
async fn validate_story_bible(
    text: String,
    context: StoryBibleContext,
    state: State<'_, AppState>
) -> Result<ValidationResult, AppError> {
    state.story_bible
        .validate(&text, &context)
        .await
}

#[tauri::command]
async fn save_entity(
    entity: Entity,
    state: State<'_, AppState>
) -> Result<i64, AppError> {
    state.story_bible
        .save_entity(&entity)
        .await
}

// ❌ WRONG: Business logic in command
#[tauri::command]
async fn save_entity(entity: Entity) -> Result<i64, AppError> {
    // 50 lines of validation
    // 50 lines of database operations
    // 50 lines of vector store updates
    // This should be in story_bible service!
}
```

**Rule:** Commands are 3-5 line wrappers. ALL business logic in domain services.

## Format Patterns

### Tauri Result Types - MANDATORY

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

### JSON Serialization - MANDATORY

**serde with camelCase for Frontend Compatibility:**

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

### Date/Time Formats - MANDATORY

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

### Error Response Format - MANDATORY

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

## Communication Patterns

### Tauri Event Naming - MANDATORY

**Format: domain:action (kebab-case)**

```rust
// ✅ CORRECT
app.emit_all("story-bible:entity-created", payload)?;
app.emit_all("story-bible:entity-updated", payload)?;
app.emit_all("ai:generation-started", payload)?;
app.emit_all("ai:generation-progress", payload)?;
app.emit_all("ai:generation-complete", payload)?;
app.emit_all("editor:content-changed", payload)?;
app.emit_all("editor:auto-saved", payload)?;
app.emit_all("export:progress-updated", payload)?;
app.emit_all("export:complete", payload)?;

// ❌ WRONG
app.emit_all("entityCreated", payload)?;              // No domain
app.emit_all("StoryBible.EntityCreated", payload)?;   // Wrong separator
app.emit_all("ENTITY_CREATED", payload)?;             // Wrong case
app.emit_all("story_bible_entity_created", payload)?; // Wrong separator
```

**Frontend Listening:**
```typescript
import { listen } from '@tauri-apps/api/event';

// ✅ CORRECT
await listen<EntityCreatedPayload>('story-bible:entity-created', (event) => {
  console.log('Entity created:', event.payload);
  storyBibleState.addEntity(event.payload);
});

// ❌ WRONG
await listen('entityCreated', ...);  // Doesn't match backend
```

**Rule:** All events follow `domain:action` format. Consistent frontend/backend naming.

### Event Payload Structure - MANDATORY

**Typed Payloads with serde:**

```rust
// ✅ CORRECT: Define payload type
#[derive(Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct EntityCreatedPayload {
    pub entity_id: i64,
    pub entity_type: EntityType,
    pub project_id: i64,
    pub timestamp: String,  // ISO 8601
}

// Emit with typed payload
app.emit_all("story-bible:entity-created", EntityCreatedPayload {
    entity_id: entity.id,
    entity_type: entity.entity_type,
    project_id: entity.project_id,
    timestamp: Utc::now().to_rfc3339(),
})?;

// ❌ WRONG: Unstructured JSON
app.emit_all("entity-created", json!({
    "id": entity.id,  // Inconsistent field name
    "type": entity.entity_type,
}))?;
```

**Frontend Types:**
```typescript
interface EntityCreatedPayload {
  entityId: number;
  entityType: string;
  projectId: number;
  timestamp: string;
}

await listen<EntityCreatedPayload>('story-bible:entity-created', (event) => {
  const { entityId, entityType, timestamp } = event.payload;
  // Type-safe access
});
```

**Rule:** Every event has a strongly-typed payload. No `any` or untyped JSON.

### State Update Patterns - MANDATORY

**Immutable Updates with Svelte Runes:**

```typescript
// ✅ CORRECT: Immutable pattern
// Note: $state and $derived are compiler directives, NOT imports

export class StoryBibleState {
  entities = $state<Entity[]>([]);

  addEntity(entity: Entity) {
    // Create new array (immutable)
    this.entities = [...this.entities, entity];
  }

  updateEntity(id: number, updates: Partial<Entity>) {
    // Map to new array
    this.entities = this.entities.map(e =>
      e.id === id ? { ...e, ...updates } : e
    );
  }

  removeEntity(id: number) {
    // Filter to new array
    this.entities = this.entities.filter(e => e.id !== id);
  }
}

// ❌ WRONG: Direct mutation
export class StoryBibleState {
  entities = $state<Entity[]>([]);

  addEntity(entity: Entity) {
    this.entities.push(entity);  // Mutation! May break reactivity
  }

  updateEntity(id: number, updates: Partial<Entity>) {
    const entity = this.entities.find(e => e.id === id);
    Object.assign(entity, updates);  // Mutation!
  }
}
```

**Rule:** Always create new objects/arrays. Never mutate existing data directly.

### Optimistic UI Pattern - MANDATORY

**Show Immediately, Sync in Background:**

```typescript
// ✅ CORRECT: Optimistic UI
async function addEntity(entity: Entity) {
  // 1. Generate temporary ID
  const tempId = `temp-${Date.now()}`;
  const optimisticEntity = { ...entity, id: tempId };

  // 2. Optimistic update (immediate UI feedback)
  storyBibleState.addEntity(optimisticEntity);

  try {
    // 3. Send to backend
    const savedEntity = await invoke<Entity>('save_entity', { entity });

    // 4. Replace optimistic with real (server-generated ID)
    storyBibleState.replaceEntity(tempId, savedEntity);

    toast.success('Character saved');

  } catch (error) {
    // 5. Rollback on failure
    storyBibleState.removeEntity(tempId);
    toast.error('Failed to save character');
  }
}

// ❌ WRONG: Wait for backend
async function addEntity(entity: Entity) {
  const savedEntity = await invoke('save_entity', { entity });  // User waits
  storyBibleState.addEntity(savedEntity);  // UI updates only after save
}
```

**Rule:** All create/update/delete operations use optimistic UI. User sees immediate feedback.

## Process Patterns

### Error Handling in Rust - MANDATORY

**Use Result, Never Panic in Production:**

```rust
// ✅ CORRECT: Propagate errors with ?
pub fn validate_entity(entity: &Entity) -> Result<ValidationResult, AppError> {
    let name = entity.name.validate()?;  // Propagates error
    let attributes = entity.attributes.validate()?;

    Ok(ValidationResult {
        score: calculate_score(&name, &attributes),
        contradictions: vec![],
    })
}

// ✅ CORRECT: Handle errors explicitly
pub fn process_entities(entities: Vec<Entity>) -> Result<(), AppError> {
    for entity in entities {
        match validate_entity(&entity) {
            Ok(result) => store_result(result)?,
            Err(e) => {
                log::warn!("Validation failed for {}: {}", entity.id, e);
                continue;  // Skip invalid, continue processing
            }
        }
    }
    Ok(())
}

// ❌ WRONG: Panic in production code
pub fn validate_entity(entity: &Entity) -> ValidationResult {
    let name = entity.name.validate().unwrap();  // PANIC!
    // ...
}

// ❌ WRONG: Ignoring errors
pub fn save_data(data: &str) {
    db.insert(data).ok();  // Error silently ignored!
}
```

**Exception: Panic ONLY for startup invariants**
```rust
// ✅ OK: Panic for impossible states at startup
fn main() {
    let config = load_config()
        .expect("Config file must exist at startup");

    tauri::Builder::default()
        // ...
}
```

**Rule:**
- Use Result for all recoverable errors
- Use ? operator to propagate
- panic/expect ONLY for startup invariants
- Log and handle errors, never ignore

### Async Usage Patterns - MANDATORY

**async for I/O, Sync for Pure Logic:**

```rust
// ✅ CORRECT: async for I/O operations
pub async fn save_entity(entity: &Entity, db: &Pool) -> Result<i64> {
    let id = db.insert(entity).await?;  // Async: SQLite I/O
    let embedding = generate_embedding(&entity.description).await?;  // Async: ONNX
    vector_store.add(id, embedding).await?;  // Async: Qdrant I/O
    Ok(id)
}

// ✅ CORRECT: sync for pure logic
pub fn detect_contradictions(
    text: &str,
    entities: &[Entity]
) -> ValidationResult {
    // Pure computation, no I/O
    let contradictions = entities.iter()
        .filter_map(|e| check_contradiction(text, e))
        .collect();

    ValidationResult { contradictions }
}

// ❌ WRONG: Unnecessary async
pub async fn calculate_word_count(text: &str) -> usize {
    text.split_whitespace().count()  // No I/O, why async?
}

// ❌ WRONG: Blocking I/O without async
pub fn save_entity_sync(entity: &Entity) -> Result<i64> {
    db.blocking_insert(entity)  // Blocks entire async runtime!
}
```

**Rule:**
- Use async for I/O (database, network, file system, AI)
- Keep pure logic synchronous (calculations, transformations)
- Never mix blocking I/O in async context

### Validation Layers - MANDATORY

**Three-Layer Validation:**

```typescript
// Layer 1: Frontend Validation (UX feedback)
function validateEntityForm(data: FormData): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push({
      field: 'name',
      message: 'Name must be at least 2 characters'
    });
  }

  if (!data.entityType) {
    errors.push({
      field: 'entityType',
      message: 'Please select a character type'
    });
  }

  return errors;
}
```

```rust
// Layer 2: Backend Type Validation (Rust type system)
#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct EntityCreateRequest {
    pub name: String,               // Type ensures it's a string
    pub entity_type: EntityType,    // Enum ensures valid type
    pub description: Option<String>,
}

// Layer 3: Business Logic Validation
pub fn validate_entity_business_rules(
    entity: &Entity,
    existing_entities: &[Entity],
) -> Result<(), AppError> {
    // Check for duplicate names
    if existing_entities.iter().any(|e| e.name == entity.name) {
        return Err(AppError {
            code: "DUPLICATE_ENTITY".to_string(),
            message: format!("A {} named '{}' already exists",
                entity.entity_type, entity.name),
            details: None,
        });
    }

    // Check name length (business rule, not just type check)
    if entity.name.len() > 100 {
        return Err(AppError {
            code: "ENTITY_NAME_TOO_LONG".to_string(),
            message: "Character name must be under 100 characters".to_string(),
            details: Some(format!("Length: {}", entity.name.len())),
        });
    }

    Ok(())
}
```

**Rule:**
- **Frontend:** Immediate UX feedback, prevents bad submissions
- **Backend Types:** Compile-time safety (enums, required fields)
- **Business Logic:** Runtime domain rules (duplicates, constraints)
- **NEVER trust frontend validation alone** (always validate in backend)

### Loading State Patterns - MANDATORY

**Per-Feature Loading States:**

```typescript
// ✅ CORRECT: Specific loading states
export class StoryBibleState {
  entities = $state<Entity[]>([]);
  isLoadingEntities = $state(false);
  isSavingEntity = $state(false);
  isDeletingEntity = $state(false);
  isValidating = $state(false);

  async loadEntities(projectId: number) {
    this.isLoadingEntities = true;
    try {
      this.entities = await invoke('get_all_entities', { projectId });
    } catch (error) {
      toast.error('Failed to load entities');
      throw error;
    } finally {
      this.isLoadingEntities = false;
    }
  }

  async saveEntity(entity: Entity) {
    this.isSavingEntity = true;
    try {
      const saved = await invoke('save_entity', { entity });
      this.entities = [...this.entities, saved];
      return saved;
    } finally {
      this.isSavingEntity = false;
    }
  }
}

// ❌ WRONG: Global loading state
let isLoading = $state(false);  // What's loading? Unclear!

async function doSomething() {
  isLoading = true;  // Blocks entire UI
  await invoke('something');
  isLoading = false;
}
```

**UI Implementation:**
```svelte
<script>
  import { storyBibleState } from '$lib/stores/storyBible.svelte';
</script>

{#if storyBibleState.isLoadingEntities}
  <Spinner message="Loading characters..." />
{:else if storyBibleState.entities.length === 0}
  <EmptyState message="No characters yet" />
{:else}
  <EntityList entities={storyBibleState.entities} />
{/if}

<Button
  on:click={handleSave}
  loading={storyBibleState.isSavingEntity}
  disabled={storyBibleState.isSavingEntity}
>
  {storyBibleState.isSavingEntity ? 'Saving...' : 'Save Character'}
</Button>
```

**Rule:** Specific loading states per operation. Never generic "isLoading" that blocks entire UI.

## Enforcement Guidelines

### All AI Agents MUST:

1. **Follow Naming Conventions:**
   - Rust: snake_case functions, PascalCase types
   - TypeScript: camelCase functions, PascalCase classes
   - SQL: snake_case tables/columns
   - Tauri: snake_case commands, domain:action events

2. **Follow Structure Patterns:**
   - Domain-based Rust modules
   - Feature-based Svelte components
   - Co-located unit tests
   - Thin command wrappers

3. **Use Type Safety:**
   - Enums for constrained values (EntityType, Provider)
   - Result<T, AppError> for all Tauri commands
   - Typed event payloads
   - No `any` types in TypeScript

4. **Implement Validation Layers:**
   - Frontend: UX validation
   - Backend: Type validation
   - Business: Domain rules
   - Never trust frontend alone

5. **Handle Errors Properly:**
   - Use Result in Rust, never panic
   - Structured AppError with code/message/details
   - User-friendly messages, technical details logged
   - All error paths tested

6. **Provide User Feedback:**
   - Loading states for operations >1s
   - Progress bars when progress available
   - Optimistic UI for create/update/delete
   - Toast for errors, Modal for confirmations

7. **Maintain Immutability:**
   - Never mutate arrays/objects directly
   - Create new instances for updates
   - Enables clean rollback and undo

8. **Respect Async Boundaries:**
   - async for I/O only
   - Pure logic stays synchronous
   - No blocking calls in async context

### Pattern Enforcement Methods

**Compile-Time Enforcement:**
- Rust type system (enums, Result types)
- TypeScript strict mode
- ESLint rules for naming conventions
- Clippy for Rust patterns

**Test-Time Enforcement:**
- Unit tests verify error handling
- Integration tests verify IPC contracts
- E2E tests verify UX patterns
- Performance tests verify loading states

**Code Review Enforcement:**
- Check for anti-patterns
- Verify pattern compliance
- Ensure test coverage

**Automated Checks:**
- ESLint + Prettier for TypeScript/Svelte
- Clippy + rustfmt for Rust
- SQL lint for migration files

## Pattern Examples

### Good Example: Story Bible Entity Creation

**Backend (Rust):**
```rust
// src-tauri/src/story_bible/entities.rs

use crate::error::AppError;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Entity {
    pub id: i64,
    pub project_id: i64,
    pub entity_type: EntityType,
    pub name: String,
    pub description: String,
    pub created_at: String,
}

#[derive(Serialize, Deserialize, Clone, Copy, PartialEq)]
pub enum EntityType {
    Character,
    Location,
    Theme,
}

pub async fn save_entity(
    entity: &Entity,
    db: &Connection,
    vector_store: &QdrantClient,
) -> Result<i64, AppError> {
    // Layer 3 validation
    validate_entity_business_rules(entity)?;

    // Save to SQLite
    let id = db.execute(
        "INSERT INTO entities (project_id, entity_type, name, description, created_at)
         VALUES (?1, ?2, ?3, ?4, ?5)",
        params![entity.project_id, entity.entity_type.to_string(),
                entity.name, entity.description, entity.created_at]
    )?;

    // Generate embedding and save to vector store
    let embedding = generate_embedding(&entity.description).await?;
    vector_store.add(id, embedding).await?;

    Ok(id)
}

// src-tauri/src/commands.rs
#[tauri::command]
async fn save_entity(
    entity: Entity,
    state: State<'_, AppState>
) -> Result<i64, AppError> {
    state.story_bible.save_entity(&entity).await  // Thin wrapper
}
```

**Frontend (TypeScript/Svelte):**
```typescript
// src/lib/api/storyBible.ts
import { invoke } from '@tauri-apps/api/core';

export interface Entity {
  id: number | string;  // string for temp IDs
  projectId: number;
  entityType: 'character' | 'location' | 'theme';
  name: string;
  description: string;
  createdAt: string;
}

export async function saveEntity(entity: Entity): Promise<Entity> {
  return await invoke<Entity>('save_entity', { entity });
}

// src/lib/stores/storyBible.svelte.ts
// Note: $state is a compiler directive, NOT an import
import { saveEntity } from '$lib/api/storyBible';

export class StoryBibleState {
  entities = $state<Entity[]>([]);
  isSavingEntity = $state(false);

  async addEntity(entity: Omit<Entity, 'id' | 'createdAt'>) {
    // Optimistic update
    const tempId = `temp-${Date.now()}`;
    const optimistic: Entity = {
      ...entity,
      id: tempId,
      createdAt: new Date().toISOString(),
    };

    this.entities = [...this.entities, optimistic];
    this.isSavingEntity = true;

    try {
      const saved = await saveEntity(optimistic);

      // Replace temp with real
      this.entities = this.entities.map(e =>
        e.id === tempId ? saved : e
      );

      return saved;

    } catch (error) {
      // Rollback
      this.entities = this.entities.filter(e => e.id !== tempId);
      throw error;

    } finally {
      this.isSavingEntity = false;
    }
  }
}
```

**Component (Svelte):**
```svelte
<!-- src/lib/components/story-bible/EntityForm.svelte -->
<script lang="ts">
  import { Button, Input, Select } from '$lib/components/fluent';
  import { storyBibleState } from '$lib/stores/storyBible.svelte';
  import { toast } from '$lib/stores/ui.svelte';

  let formData = $state({
    name: '',
    entityType: 'character' as const,
    description: '',
  });

  let errors = $state<Record<string, string>>({});

  function validateForm(): boolean {
    errors = {};

    // Layer 1 validation (frontend)
    if (!formData.name || formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!formData.description || formData.description.trim().length < 10) {
      errors.description = 'Description must be at least 10 characters';
    }

    return Object.keys(errors).length === 0;
  }

  async function handleSubmit() {
    if (!validateForm()) return;

    try {
      await storyBibleState.addEntity({
        projectId: currentProject.id,
        ...formData,
      });

      toast.success('Character saved');
      formData = { name: '', entityType: 'character', description: '' };

    } catch (error) {
      toast.error(error.message);
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <Input
    label="Character Name"
    bind:value={formData.name}
    error={errors.name}
    required
  />

  <Select
    label="Type"
    bind:value={formData.entityType}
    options={[
      { value: 'character', label: 'Character' },
      { value: 'location', label: 'Location' },
      { value: 'theme', label: 'Theme' },
    ]}
  />

  <Input
    label="Description"
    type="textarea"
    bind:value={formData.description}
    error={errors.description}
    rows={4}
  />

  <Button
    type="submit"
    loading={storyBibleState.isSavingEntity}
    disabled={storyBibleState.isSavingEntity}
  >
    Save Character
  </Button>
</form>
```

**This example demonstrates:**
- ✅ Naming: snake_case (Rust), camelCase (TS), PascalCase (components)
- ✅ Structure: Service in domain module, thin command, typed API, Svelte store
- ✅ Format: AppError, serde camelCase, ISO dates
- ✅ Communication: Optimistic UI, immutable updates
- ✅ Process: Result propagation, 3-layer validation, specific loading state

### Anti-Pattern Example: What NOT to Do

```rust
// ❌ WRONG: Everything in one place, poor patterns

#[tauri::command]
async fn saveEntity(
    Name: String,  // ❌ PascalCase parameter
    Type: String,  // ❌ String instead of enum
    Desc: String,  // ❌ Abbreviated name
) -> String {  // ❌ String error instead of Result<T, AppError>

    // ❌ Business logic in command (should be in service)
    let conn = Connection::open("data.db").unwrap();  // ❌ Panic!

    // ❌ No validation
    let id = conn.execute(
        "INSERT INTO entity VALUES (?1, ?2, ?3)",  // ❌ Singular table name
        params![Name, Type, Desc]
    ).unwrap();  // ❌ Panic!

    // ❌ String return instead of structured response
    format!("Saved: {}", id)
}
```

**This violates:**
- Naming conventions (PascalCase params, singular table)
- Structure (logic in command)
- Format (String error, String response)
- Process (panic with unwrap, no validation)

## Pattern Compliance Checklist

Before submitting code, AI agents must verify:

- ✅ All names follow convention (Rust snake_case, TS camelCase, SQL snake_case)
- ✅ All commands are thin wrappers (business logic in services)
- ✅ All errors use Result<T, AppError>, no String errors
- ✅ All events use domain:action naming
- ✅ All state updates are immutable
- ✅ All async is I/O only, pure logic is sync
- ✅ All operations have specific loading states
- ✅ All validations have 3 layers (frontend, types, business)
- ✅ No anti-patterns (unwrap, string types, god objects, etc.)
- ✅ Tests cover happy path + error paths

**Pattern violations will cause:**
- Agent conflicts (different naming breaks integration)
- Type mismatches (camelCase vs snake_case)
- Runtime errors (missing validation, unhandled errors)
- Poor UX (no loading states, generic errors)
- Maintenance issues (circular deps, god objects)

**These patterns are MANDATORY for all StoryTeller implementation.**
