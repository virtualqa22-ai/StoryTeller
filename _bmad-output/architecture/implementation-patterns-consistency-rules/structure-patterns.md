# Structure Patterns

## Rust Module Organization - MANDATORY

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

## Svelte Project Organization - MANDATORY

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

## Test Organization - MANDATORY

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

## Tauri Commands Organization - MANDATORY

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
