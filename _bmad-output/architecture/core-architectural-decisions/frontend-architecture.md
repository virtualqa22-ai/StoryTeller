# Frontend Architecture

## Styling System: Tailwind CSS

**Decision:** Use Tailwind CSS for custom Fluent design components

**Version:** Tailwind CSS 4.x (CSS-first configuration)

**⚠️ IMPLEMENTATION NOTE (Story 1.3):**
Originally specified as Tailwind v3.4+ with JavaScript config, but **implemented with Tailwind v4.1.18** which uses CSS-first configuration via `@theme` directive. This was an implementation decision made during Story 1.3 that deviates from the original architecture plan.

**Rationale:**
- Rapid component development (2-3 weeks vs 4-5 weeks vanilla CSS)
- Consistent design tokens (Fluent colors, spacing, typography)
- Excellent Svelte + Vite integration
- JIT compiler = small bundle (~50KB after purge)
- Utility-first approach matches component-based architecture
- v4 CSS-first config provides better ergonomics and co-location with styles

**Installation:**
```bash
pnpm add -D tailwindcss postcss autoprefixer
pnpm add -D @tailwindcss/forms @tailwindcss/typography @tailwindcss/postcss
```

**PostCSS Configuration:**
```js
// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

**Fluent Design Token Configuration:**
```css
/* src/app.css */
@import "tailwindcss";

@theme {
  /* Fluent Design Colors */
  --color-brand-primary: #0078d4;
  --color-brand-hover: #106ebe;
  --color-brand-pressed: #005a9e;
  --color-neutral-bg: #faf9f8;
  --color-neutral-stroke: #e1dfdd;
  --color-success: #107c10;
  --color-warning: #f7630c;
  --color-danger: #d13438;

  /* Fluent Design Spacing (4px base unit) */
  --spacing-fluent-xs: 4px;
  --spacing-fluent-sm: 8px;
  --spacing-fluent-md: 12px;
  --spacing-fluent-lg: 16px;
  --spacing-fluent-xl: 24px;

  /* Fluent Design Border Radius */
  --radius-fluent-sm: 2px;
  --radius-fluent-md: 4px;
  --radius-fluent-lg: 6px;

  /* Fluent Design Typography */
  --font-family-fluent: Segoe UI, system-ui, sans-serif;
  --font-size-fluent-caption: 12px;
  --line-height-fluent-caption: 16px;
  --font-size-fluent-body: 14px;
  --line-height-fluent-body: 20px;
  --font-size-fluent-subtitle: 18px;
  --line-height-fluent-subtitle: 24px;
  --font-size-fluent-title: 28px;
  --line-height-fluent-title: 36px;

  /* Fluent Design Elevation Shadows */
  --shadow-fluent-2: 0 0.3px 0.9px rgba(0, 0, 0, 0.1), 0 1.6px 3.6px rgba(0, 0, 0, 0.13);
  --shadow-fluent-4: 0 0.6px 1.8px rgba(0, 0, 0, 0.1), 0 3.2px 7.2px rgba(0, 0, 0, 0.13);
  --shadow-fluent-8: 0 1.2px 3.6px rgba(0, 0, 0, 0.1), 0 6.4px 14.4px rgba(0, 0, 0, 0.13);
  --shadow-fluent-16: 0 2.4px 7.2px rgba(0, 0, 0, 0.1), 0 12.8px 28.8px rgba(0, 0, 0, 0.13);
  --shadow-fluent-64: 0 9.6px 28.8px rgba(0, 0, 0, 0.1), 0 51.2px 115.2px rgba(0, 0, 0, 0.13);
}
```

**Plugin Registration (Tailwind v4):**
Plugins are loaded automatically when installed in v4. No explicit registration needed in config.

**Component Example:**
```svelte
<script lang="ts">
  export let variant: 'primary' | 'secondary' = 'primary';
  export let disabled = false;
</script>

<button
  class="
    px-fluent-lg py-fluent-sm rounded-fluent-md
    font-fluent text-fluent-body font-medium
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-brand-primary
    disabled:opacity-50 disabled:cursor-not-allowed
    {variant === 'primary'
      ? 'bg-brand-primary text-white hover:bg-brand-hover active:bg-brand-pressed'
      : 'bg-neutral-bg text-gray-800 hover:bg-gray-100 border border-neutral-stroke'}
  "
  {disabled}
  on:click
>
  <slot />
</button>
```

**Timeline Impact:** Saves 2 weeks compared to vanilla CSS modules

## Editor Library: ProseMirror

**Decision:** Use ProseMirror for rich text editor

**Version:** ProseMirror 1.32+

**Rationale:**
- **Battle-tested:** Powers NYTimes, Atlassian, Guardian (9 years production)
- **60 FPS Proven:** Verified performance with 100K+ word documents
- **Framework-Agnostic:** Direct Svelte integration (no React wrapper overhead)
- **Virtualization:** Mature prosemirror-view-virtualized plugin
- **Extensibility:** Plugin system for Story Bible suggestions, validation warnings

**Installation:**
```bash
pnpm add prosemirror-state prosemirror-view prosemirror-model
pnpm add prosemirror-history prosemirror-commands prosemirror-keymap
pnpm add prosemirror-view-virtualized
```

**Core Implementation:**
```typescript
// src/lib/components/Editor.svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import { EditorState } from 'prosemirror-state';
  import { EditorView } from 'prosemirror-view';
  import { Schema } from 'prosemirror-model';
  import { history, undo, redo } from 'prosemirror-history';
  import { keymap } from 'prosemirror-keymap';
  import { virtualizedPlugin } from './plugins/virtualized';

  let editorContainer: HTMLDivElement;
  let view: EditorView;

  onMount(() => {
    const state = EditorState.create({
      schema: customSchema,
      plugins: [
        history(),
        keymap({ 'Mod-z': undo, 'Mod-y': redo }),
        virtualizedPlugin({
          chunkSize: 2000, // words per chunk
          viewportHeight: 800
        }),
        storyBiblePlugin(), // Custom: contextual suggestions
        validationPlugin(),  // Custom: inline warnings
      ]
    });

    view = new EditorView(editorContainer, {
      state,
      dispatchTransaction(transaction) {
        const newState = view.state.apply(transaction);
        view.updateState(newState);

        // Emit to Svelte for word count, auto-save, etc.
        if (transaction.docChanged) {
          onDocumentChange(newState.doc);
        }
      }
    });

    return () => view.destroy();
  });
</script>

<div bind:this={editorContainer} class="prose max-w-none" />
```

**Performance Optimization:**
- Virtual scrolling (render only visible 2000 words)
- Incremental parsing (parse edited nodes only)
- Debounced word count (300ms after typing stops)
- Lazy decoration rendering (validation warnings)

**Custom Plugins:**
```typescript
// Story Bible contextual suggestions
function storyBiblePlugin() {
  return new Plugin({
    view() {
      return {
        update(view, prevState) {
          const { selection } = view.state;
          const cursor = selection.$anchor;
          const text = cursor.parent.textContent;

          // Debounced: suggest entities after 300ms idle
          debouncedSuggest(text, cursor.pos);
        }
      };
    }
  });
}
```

**Timeline Impact:** +1 week learning curve (team ramp-up)

## State Management: Svelte 5 Runes (Primary)

**Decision:** Use Svelte 5 runes as primary state management

**Rationale:**
- Universal reactivity (works in .svelte.ts modules)
- Fine-grained reactivity (efficient updates)
- No external library needed
- Sufficient for desktop app complexity

**Global State Stores:**
```typescript
// src/lib/stores/editor.svelte.ts
// Note: $state and $derived are Svelte 5 compiler directives, NOT imports
// They are used directly without importing

export class EditorState {
  content = $state('');
  wordCount = $derived(this.content.split(/\s+/).length);
  chapterTitle = $state('Untitled Chapter');
  isDirty = $state(false);
  lastSaved = $state<Date | null>(null);

  updateContent(newContent: string) {
    this.content = newContent;
    this.isDirty = true;
  }

  markSaved() {
    this.isDirty = false;
    this.lastSaved = new Date();
  }
}

export const editorState = new EditorState();
```

**Usage in Components:**
```svelte
<script lang="ts">
  import { editorState } from '$lib/stores/editor.svelte';
</script>

<div>Word Count: {editorState.wordCount}</div>
<div>Last Saved: {editorState.lastSaved?.toLocaleTimeString()}</div>
{#if editorState.isDirty}
  <span class="text-warning">Unsaved changes</span>
{/if}
```

**Advanced State (If Needed):**
- If runes prove insufficient (unlikely), consider Zustand or Pinia
- Defer decision until Sprint 3-4 (YAGNI principle)

## Version Compatibility Matrix

Exact tested versions from Epic 1 implementation:

| Package | Spec | Notes |
|---------|------|-------|
| Tauri | ^2 | Uses @tauri-apps/api ^2, @tauri-apps/cli ^2 |
| Svelte | ^5.0.0 | Svelte 5 with runes ($state, $derived, $effect) |
| SvelteKit | ^2.9.0 | With adapter-static |
| Tailwind CSS | ^4.1.18 | CSS-first config via @theme directive (NOT JS config) |
| bits-ui | 1.0.0-next.98 | Uses child snippets, NOT Indicator components |
| Vitest | ^4.0.16 | With @testing-library/svelte |
| Playwright | ^1.57.0 | Web-layer testing only (NOT Electron API) |
| TypeScript | ~5.6.2 | Strict mode enabled |
| Vite | ^6.0.3 | With @sveltejs/vite-plugin-svelte |

### bits-ui 1.0.0 API Patterns

**Old Pattern (bits-ui 0.x) - DO NOT USE:**
```svelte
<Checkbox.Root>
  <Checkbox.Indicator>
    <Check />
  </Checkbox.Indicator>
</Checkbox.Root>
```

**Current Pattern (bits-ui 1.0.0-next.98):**
```svelte
<Checkbox.Root>
  {#snippet children({ checked })}
    {#if checked}
      <Check />
    {/if}
  {/snippet}
</Checkbox.Root>
```

### Tailwind v4 Configuration

Tailwind v4 uses CSS-first configuration via the `@theme` directive. **There is no tailwind.config.js file.**

Configuration is defined in `src/app.css`:
```css
@import "tailwindcss";

@theme {
  --color-brand-primary: #0078d4;
  /* ... other tokens */
}
```

See the Styling System section above for complete token definitions.

