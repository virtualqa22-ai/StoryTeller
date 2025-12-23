# Data Architecture

## Database: SQLite with rusqlite (Confirmed from Step 3)

**Version:** SQLite 3.44+
**Rust Crate:** `rusqlite` 0.30+

**Schema Design Approach:**
- Relational model for structured data (projects, entities, chapters, metadata)
- JSON columns for flexible data (Story Bible entity attributes, user preferences)
- Foreign keys enforced for referential integrity
- Indexes on frequently queried columns (entity names, timestamps)

**Tables Structure:**
```sql
-- Core tables
projects (id, name, genre, created_at, settings)
chapters (id, project_id, title, content, word_count, order)
entities (id, project_id, type, name, description, attributes)
relationships (id, entity_a_id, entity_b_id, type, description)
prompt_templates (id, name, version, template, variables, created_at)
shortcuts (id, action, keys, enabled)
telemetry_events (id, event_type, data, timestamp)

-- Metadata
schema_version (version, applied_at)
```

## Migration Strategy: refinery

**Decision:** Use `refinery` crate for SQL-based migrations

**Rationale:**
- Automatic version tracking (no manual schema_version management)
- Rollback support (critical for beta database evolution)
- SQL-first approach (matches rusqlite usage, no ORM DSL to learn)
- Lightweight (5 crates vs Diesel's 50+)
- No compile-time overhead (unlike Diesel macros)

**Implementation:**
```toml
[dependencies]
refinery = "0.8"
refinery-rusqlite = "0.8"
```

**Migration Files:**
```
src-tauri/migrations/
  V1__create_projects.sql
  V2__create_chapters.sql
  V3__create_entities.sql
  V4__create_relationships.sql
  V5__create_prompt_templates.sql
  V6__add_story_bible_validation.sql
```

**Migration Execution:**
```rust
use refinery::embed_migrations;

embed_migrations!("migrations");

pub fn run_migrations(conn: &mut rusqlite::Connection) -> Result<()> {
    migrations::runner().run(conn)?;
    Ok(())
}
```

**Rollback Strategy:**
- Each migration has corresponding down migration
- Automatic rollback on error during migration
- Manual rollback command for development: `refinery migrate --target V<N>`

## Data Validation Strategy

**Layer 1: Database Constraints**
- NOT NULL, UNIQUE, FOREIGN KEY constraints in schema
- CHECK constraints for valid enums (entity types, relationship types)

**Layer 2: Rust Type System**
```rust
pub struct Entity {
    pub id: EntityId,
    pub project_id: ProjectId,
    pub entity_type: EntityType, // Enum
    pub name: NonEmptyString,    // Validated type
    pub attributes: EntityAttributes, // Validated JSON
}

impl Entity {
    pub fn validate(&self) -> Result<()> {
        self.name.validate()?;
        self.attributes.validate()?;
        Ok(())
    }
}
```

**Layer 3: Story Bible Semantic Validation**
- Multi-layer contradiction detection (Step 2 requirement)
- Vector similarity for character/location consistency
- Rule-based validation (name spelling, attribute conflicts)

## Caching Strategy

**No Application-Level Cache:**
- SQLite is fast enough for desktop workload (<1000 projects)
- OS file system cache handles repeated reads
- Complexity not justified for single-user local app

**In-Memory Cache for Hot Data:**
- Current project metadata (loaded on project open)
- Prompt templates (loaded on app startup)
- User preferences (loaded once)

**Vector Store Cache:**
- Qdrant handles caching internally
- Embeddings cached in Qdrant's persistent storage
