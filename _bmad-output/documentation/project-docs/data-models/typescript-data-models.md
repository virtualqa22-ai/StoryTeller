# TypeScript Data Models

**Location:** `src/lib/api/projects.ts`

## `Project` Interface

```typescript
export interface Project {
    id: number;
    title: string;
    author_name: string | null;
    pen_name: string | null;
    tagline: string | null;
    genre: string | null;
    subgenre: string | null;
    target_audience: string | null;
    tone: string | null;
    point_of_view: string | null;
    story_framework: string | null;
    chapter_count: number | null;
    target_words_per_chapter: number | null;
    plot_premise: string | null;
    language: string;
    created_at: string;                 // ISO 8601 timestamp
    updated_at: string;                 // ISO 8601 timestamp
    file_path: string;
    last_opened_at: string | null;      // ISO 8601 timestamp
}
```

**Note:** Matches Rust `Project` struct exactly (serde serialization ensures type safety).

---

## `NewProject` Interface

```typescript
export interface NewProject {
    title: string;
    author_name?: string | null;
    pen_name?: string | null;
    tagline?: string | null;
    genre?: string | null;
    subgenre?: string | null;
    target_audience?: string | null;
    tone?: string | null;
    point_of_view?: string | null;
    story_framework?: string | null;
    chapter_count?: number | null;
    target_words_per_chapter?: number | null;
    plot_premise?: string | null;
    language?: string;
    file_path: string;
    last_opened_at?: string | null;
}
```

**Note:** Optional fields use `?:` syntax in TypeScript, matching Rust `Option<T>`.

---
