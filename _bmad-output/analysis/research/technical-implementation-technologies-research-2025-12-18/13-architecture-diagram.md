# 13. Architecture Diagram

## 13.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     STORYTELLER DESKTOP APP                  │
│                        (Tauri + Rust)                        │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────────┐   ┌──────────────┐
│   FRONTEND   │    │   BACKEND        │   │  STORAGE     │
│  (Svelte 5)  │    │   (Rust)         │   │  (SQLite)    │
│              │    │                  │   │              │
│ • Lexical    │◄───┤ • API Router     │◄──┤ • Projects   │
│   Editor     │    │ • AI Orchestrator│   │ • Chapters   │
│ • Components │    │ • Export Engine  │   │ • Characters │
│ • UI State   │    │ • Validation     │   │ • Plot       │
└──────┬───────┘    └────────┬─────────┘   │ • Rules      │
       │                     │              └──────────────┘
       │                     │
       │            ┌────────▼─────────┐
       │            │  VECTOR DB       │
       │            │  (ChromaDB)      │
       │            │                  │
       │            │ • Story Bible    │
       │            │   Embeddings     │
       │            │ • Semantic       │
       │            │   Search         │
       └────────────┤                  │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │  EXTERNAL APIs   │
                    │                  │
                    │ • OpenAI GPT-4   │
                    │ • Claude API     │
                    │ • Gemini API     │
                    │ • User API Keys  │
                    └──────────────────┘
```

## 13.2 Data Flow for AI Generation

```
User writes → Chapter content saved to SQLite
                    ↓
            Story Bible Updated
          (Characters, Plots, Rules)
                    ↓
        Embeddings generated → ChromaDB
                    ↓
User requests AI generation (next chapter)
                    ↓
        ┌───────────────────────────────┐
        │  Context Assembly             │
        │  1. Retrieve recent chapters  │
        │  2. Semantic search Story     │
        │     Bible (relevant chars,    │
        │     plots, rules)              │
        │  3. Build generation prompt   │
        └───────────┬───────────────────┘
                    ↓
        ┌───────────────────────────────┐
        │  Pre-Generation Validation    │
        │  1. Check active plot threads │
        │  2. Verify character states   │
        │  3. Load applicable rules     │
        │  4. Validate continuity       │
        └───────────┬───────────────────┘
                    ↓
        ┌───────────────────────────────┐
        │  AI Model Call                │
        │  (Claude/GPT-4/Gemini)        │
        │  • Send assembled context     │
        │  • Request chapter generation │
        │  • Apply rate limiting        │
        └───────────┬───────────────────┘
                    ↓
        ┌───────────────────────────────┐
        │  Post-Generation Validation   │
        │  1. Check CRITICAL rule       │
        │     violations                │
        │  2. Verify character          │
        │     consistency               │
        │  3. Detect plot continuity    │
        │  4. Highlight warnings        │
        └───────────┬───────────────────┘
                    ↓
        Present to user for review/edit
                    ↓
        User approves → Save to SQLite
                    ↓
        Update Story Bible, re-embed
```

## 13.3 Export Pipeline Architecture

```
User clicks Export → Select format (PDF/EPUB)
                          ↓
              ┌───────────────────────┐
              │  Load Export Preset   │
              │  (or custom settings) │
              └───────────┬───────────┘
                          ↓
              ┌───────────────────────┐
              │  Gather Content       │
              │  • Chapters from DB   │
              │  • Metadata           │
              │  • Cover image        │
              │  • Front matter       │
              └───────────┬───────────┘
                          ↓
       ┌──────────────────┴──────────────────┐
       │                                     │
       ▼                                     ▼
┌──────────────┐                    ┌──────────────┐
│ PDF Export   │                    │ EPUB Export  │
│              │                    │              │
│ 1. Build HTML│                    │ 1. Generate  │
│    template  │                    │    EPUB3     │
│ 2. Apply CSS │                    │    structure │
│    styles    │                    │ 2. Package   │
│ 3. Puppeteer │                    │    content   │
│    render    │                    │ 3. Add       │
│ 4. 300 DPI   │                    │    metadata  │
│    output    │                    │ 4. Validate  │
│              │                    │    EPUBCheck │
└──────┬───────┘                    └──────┬───────┘
       │                                   │
       └───────────────┬───────────────────┘
                       ▼
              ┌────────────────┐
              │  Save File &   │
              │  Show Preview  │
              └────────────────┘
```

---
