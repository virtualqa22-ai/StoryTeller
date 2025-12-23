# Communication Patterns

## Tauri Event Naming - MANDATORY

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

## Event Payload Structure - MANDATORY

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

## State Update Patterns - MANDATORY

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

## Optimistic UI Pattern - MANDATORY

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
