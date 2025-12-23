# Frontend Architecture

## Styling System: Tailwind CSS

**Decision:** Use Tailwind CSS for custom Fluent design components

**Version:** Tailwind CSS 3.4+

**Rationale:**
- Rapid component development (2-3 weeks vs 4-5 weeks vanilla CSS)
- Consistent design tokens (Fluent colors, spacing, typography)
- Excellent Svelte + Vite integration
- JIT compiler = small bundle (~50KB after purge)
- Utility-first approach matches component-based architecture

**Installation:**
```bash
pnpm add -D tailwindcss postcss autoprefixer
pnpm add @tailwindcss/forms @tailwindcss/typography
npx tailwindcss init -p
```

**Fluent Design Token Configuration:**
```js
// tailwind.config.js
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0078d4',
          hover: '#106ebe',
          pressed: '#005a9e',
        },
        neutral: {
          bg: '#faf9f8',
          stroke: '#e1dfdd',
        },
        success: '#107c10',
        warning: '#f7630c',
        danger: '#d13438',
      },
      borderRadius: {
        'fluent-sm': '2px',
        'fluent-md': '4px',
        'fluent-lg': '6px',
      },
      spacing: {
        'fluent-xs': '4px',
        'fluent-sm': '8px',
        'fluent-md': '12px',
        'fluent-lg': '16px',
        'fluent-xl': '24px',
      },
      fontFamily: {
        'fluent': ['Segoe UI', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'fluent-caption': ['12px', '16px'],
        'fluent-body': ['14px', '20px'],
        'fluent-subtitle': ['18px', '24px'],
        'fluent-title': ['28px', '36px'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

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

