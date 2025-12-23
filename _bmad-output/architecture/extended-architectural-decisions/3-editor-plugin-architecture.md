# 3. Editor Plugin Architecture

## Problem Statement

ProseMirror is selected as the editor, but we need a plugin architecture for Story Bible integration, validation, and performance with large documents.

## Architectural Decisions

**Decision: Optimistic UI for AI Operations**
- **Requirement:** Editor MUST remain responsive (60 FPS) even when AI Rate Limiter is throttling.
- **Implementation:** UI shows "Thinking..." state immediately; AI request is queued in Rust background thread. Main thread never blocked by IPC or Rate Limiting sleep.

**Decision: Keyboard shortcut for Story Bible suggestions (Ctrl+Space)**
- Suggestions do NOT appear automatically while typing
- Keeps UI clean and non-distracting
- Matches IDE conventions

**Decision: Validation on by default**
- Real-time validation enabled for all projects
- 2-second debounce to avoid performance impact
- Users can disable in settings if desired

**Decision: Keyboard shortcut for scene breaks (Ctrl+Shift+Enter)**
- Inserts scene break marker (horizontal rule)
- No auto-conversion of `---` text

## Component Structure

```
src/lib/components/editor/
├── Editor.svelte              # Main editor component
├── EditorToolbar.svelte       # Formatting toolbar
├── plugins/
│   ├── index.ts               # Plugin registration
│   ├── storyBiblePlugin.ts    # Entity suggestions (Ctrl+Space)
│   ├── validationPlugin.ts    # Contradiction warnings
│   ├── autoSavePlugin.ts      # Batched auto-save
│   ├── wordCountPlugin.ts     # Live word count
│   ├── virtualScrollPlugin.ts # Large document handling
│   └── manuscriptPlugin.ts    # Scene breaks, formatting
├── schema/
│   ├── index.ts               # ProseMirror schema
│   ├── nodes.ts               # Custom node types
│   └── marks.ts               # Custom mark types
└── decorations/
    ├── suggestionDecoration.ts
    ├── warningDecoration.ts
    └── entityHighlight.ts
```

## Custom Schema Nodes

**Manuscript-specific nodes:**
- `scene_break`: Horizontal rule for scene separation
- `chapter_heading`: Chapter header with number and title attributes
- `entity_mention`: Inline entity linked to Story Bible

**Custom marks:**
- `validation_warning`: Highlight with severity (error/warning/info) and message

## Plugin Specifications

**Story Bible Plugin:**
- Triggered by Ctrl+Space keyboard shortcut
- 300ms debounce on context extraction
- Shows top 5 relevant entities from Story Bible
- Entities scored by semantic similarity and direct mention

**Validation Plugin:**
- Runs automatically on document changes
- 2-second debounce (validation is expensive)
- Displays inline warning decorations
- Updates status bar with warning count

**Auto-Save Plugin:**
- Saves 2 seconds after last change
- Force save after 50 pending changes
- Non-blocking, batched transactions
- Shows "Unsaved changes" / "Saved at {time}" status

**Virtual Scroll Plugin:**
- Renders only visible content plus 500px buffer
- Collapses off-screen nodes to placeholders
- Maintains 60 FPS with 80K+ word documents
- Throttled scroll handler (~60fps)

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl+Space | Show Story Bible suggestions |
| Ctrl+Shift+Enter | Insert scene break |
| Ctrl+S | Save chapter |
| Ctrl+Z | Undo |
| Ctrl+Y | Redo |
| Ctrl+B | Bold |
| Ctrl+I | Italic |

---
