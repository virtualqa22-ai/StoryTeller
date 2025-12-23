# Naming Conventions

## Rust Naming (Backend) - MANDATORY

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

## TypeScript Naming (Frontend) - MANDATORY

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

## Database Naming (SQL) - MANDATORY

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

## Tauri Command Naming - MANDATORY

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

## File Naming - MANDATORY

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
