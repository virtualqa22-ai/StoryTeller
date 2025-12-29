# Code Style Guide

## TypeScript

### Import Order
1. External libraries
2. Tauri APIs
3. Local modules (`$lib/`)
4. Types (use `import type`)

```typescript
import { invoke } from "@tauri-apps/api/core";
import { Button } from "$lib/components/ui/button";
import type { Project } from "$lib/api/projects";
```

### Naming Conventions
- **Variables/Functions:** camelCase (`myVariable`, `fetchData`)
- **Types/Interfaces:** PascalCase (`Project`, `ButtonProps`)
- **Constants:** SCREAMING_SNAKE_CASE (`MAX_RETRIES`)
- **Files:** kebab-case (`format-date.ts`, `button.svelte`)

---

## Svelte 5

### Component Props (Runes)
```svelte
<script lang="ts">
interface Props {
    title: string;
    count?: number;
    children?: Snippet;
}

// Use $props() rune (NOT export let)
let { title, count = 0, children }: Props = $props();
</script>
```

### Reactive State
```svelte
<script lang="ts">
// Use $state() for reactive variables
let count = $state(0);

// Use $derived() for computed values
let doubled = $derived(count * 2);

// Use $effect() for side effects
$effect(() => {
    console.log("Count changed:", count);
});
</script>
```

### Rendering Children
```svelte
<!-- Use {@render} for Snippet children -->
{#if typeof children === "function"}
    {@render children()}
{:else}
    {children}
{/if}
```

---

## Rust

### Function Naming
- snake_case for functions
- PascalCase for types/structs

```rust
pub fn create_project(conn: &Connection, project: &NewProject) -> Result<i64, DbError> {
    // ...
}

pub struct Project {
    pub id: i64,
    // ...
}
```

### Error Handling
```rust
use thiserror::Error;

#[derive(Error, Debug)]
pub enum DbError {
    #[error("Database error: {0}")]
    SqliteError(#[from] rusqlite::Error),

    #[error("Project not found with id {0}")]
    ProjectNotFound(i64),
}
```

---
