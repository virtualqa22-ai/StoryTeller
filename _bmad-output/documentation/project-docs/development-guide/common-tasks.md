# Common Tasks

## Adding a New UI Component

**Steps:**
1. Create component folder: `src/lib/components/ui/my-component/`
2. Create files:
   - `my-component.svelte` (component logic)
   - `my-component.test.ts` (unit tests)
   - `index.ts` (barrel export)

**Example `my-component.svelte`:**
```svelte
<script lang="ts">
import { cn } from "$lib/utils";

interface Props {
    variant?: "default" | "primary";
    class?: string;
    [key: string]: any;
}

let { variant = "default", class: className, ...rest }: Props = $props();

const variantClasses = {
    default: "bg-gray-100 text-gray-900",
    primary: "bg-primary text-primary-foreground"
};
</script>

<div class={cn(variantClasses[variant], className)} {...rest}>
    {@render children?.()}
</div>
```

**Example `index.ts`:**
```typescript
import Root from "./my-component.svelte";

export { Root, Root as MyComponent };
```

**Example `my-component.test.ts`:**
```typescript
import { render, screen } from "@testing-library/svelte";
import { describe, it, expect } from "vitest";
import MyComponent from "./my-component.svelte";

describe("MyComponent", () => {
    it("renders with default variant", () => {
        render(MyComponent, { props: { children: "Test" } });
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("applies primary variant classes", () => {
        const { container } = render(MyComponent, {
            props: { variant: "primary" }
        });
        expect(container.firstChild).toHaveClass("bg-primary");
    });
});
```

---

## Adding a New Tauri Command

**Steps:**

1. **Define Rust function** in appropriate command file (e.g., `src-tauri/src/db/commands/project_commands.rs`)

```rust
#[tauri::command]
pub async fn my_new_command(param: String) -> Result<String, String> {
    // Your logic here
    Ok(format!("Processed: {}", param))
}
```

2. **Register command** in `src-tauri/src/lib.rs`

```rust
tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
        greet,
        // ... existing commands
        my_new_command,  // ADD HERE
    ])
    .run(tauri::generate_context!())
```

3. **Add TypeScript wrapper** in `src/lib/api/` (optional but recommended)

```typescript
// src/lib/api/my-module.ts
import { invoke } from "@tauri-apps/api/core";

export async function myNewCommand(param: string): Promise<string> {
    return await invoke<string>("my_new_command", { param });
}
```

4. **Use in component**

```svelte
<script lang="ts">
import { myNewCommand } from "$lib/api/my-module";

async function handleClick() {
    const result = await myNewCommand("test");
    console.log(result);
}
</script>
```

---

## Adding a Database Migration

**Steps:**

1. **Create migration file:** `src-tauri/migrations/V3__description.sql`

```sql
-- V3__add_new_field.sql
ALTER TABLE projects ADD COLUMN new_field TEXT;
```

2. **Rebuild app** (migrations are embedded at compile time)

```bash
cd src-tauri
cargo build
```

3. **Test migration** (runs automatically on next app launch)

```bash
pnpm tauri dev
```

**Important:**
- Migrations run ONCE per database
- Cannot modify existing migrations after they're applied
- Always test migrations on a copy of production database

---

## Adding a New Route (Page)

**Steps:**

1. **Create route file:** `src/routes/my-page/+page.svelte`

```svelte
<script lang="ts">
// Page logic
</script>

<h1>My New Page</h1>
```

2. **Navigate to route**

```svelte
<a href="/my-page">Go to My Page</a>
```

**Note:** SvelteKit uses file-based routing. File `src/routes/my-page/+page.svelte` creates route `/my-page`.

---
