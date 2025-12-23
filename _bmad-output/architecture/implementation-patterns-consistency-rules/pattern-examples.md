# Pattern Examples

## Good Example: Story Bible Entity Creation

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

## Anti-Pattern Example: What NOT to Do

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
