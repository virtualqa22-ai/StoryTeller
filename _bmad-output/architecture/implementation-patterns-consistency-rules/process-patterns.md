# Process Patterns

## Error Handling in Rust - MANDATORY

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

## Async Usage Patterns - MANDATORY

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

## Validation Layers - MANDATORY

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

## Loading State Patterns - MANDATORY

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
