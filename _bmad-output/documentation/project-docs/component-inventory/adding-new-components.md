# Adding New Components

## Component Structure
```
src/lib/components/
├── ui/                    # Generic UI components
│   ├── button/
│   │   ├── button.svelte
│   │   └── button.test.ts
│   └── ...
└── {domain}/              # Domain-specific components
    ├── ComponentName.svelte
    └── ComponentName.test.ts
```

## Component Template
```svelte
<script lang="ts">
    import { cn } from "$lib/utils";
    import type { Snippet } from "svelte";

    type Props = {
        class?: string;
        children?: Snippet | string;
        // ... other props
    };

    let {
        class: className,
        children,
        ...rest
    }: Props = $props();
</script>

<div class={cn("base-classes", className)} {...rest}>
    {#if typeof children === "function"}
        {@render children()}
    {:else}
        {children}
    {/if}
</div>
```

## Testing Template
```typescript
import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Component from './component.svelte';

describe('Component', () => {
    it('renders with default props', () => {
        render(Component);
        expect(screen.getByRole('...')).toBeInTheDocument();
    });

    it('handles interaction', async () => {
        const { component } = render(Component);
        // ... test logic
    });
});
```

---
