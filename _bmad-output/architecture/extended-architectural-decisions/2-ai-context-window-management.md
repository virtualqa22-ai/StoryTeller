# 2. AI Context Window Management

## Problem Statement

StoryTeller supports 5 AI providers with vastly different context windows:
- GPT-4o: 128K tokens
- Claude 3.5: 200K tokens
- Gemini 1.5: 1M tokens
- Deepseek: 64K tokens
- Yandex GPT: 8K tokens

A 100K-word novel is ~130K tokens. Smart context management is required.

## Architectural Decisions

**Decision: Pinned Context vs. Rolling Window**
- **Pinned Context (Static):** Critical Story Bible facts (Names, defining traits, core plot points). NEVER evicted.
- **Rolling Context (Dynamic):** Narrative text (previous chapters). Evicted as "sliding window" to fit token budget.
- **Rationale:** Ensures consistencies like character names/eyes never "roll out" of memory.

**Decision: Provider recommendation when context is too large**
- App suggests switching providers when Story Bible exceeds provider limits
- Example: "Your Story Bible is too large for Yandex. Consider using Claude or Gemini for better results."

**Decision: No manual entity selection**
- Context prioritization is fully automatic with Pinned override
- Keeps UI simple, no "power user" complexity

**Decision: "Show what AI sees" debug feature**
- Available during beta for transparency
- Visualizes Pinned vs Rolling tokens


## Component Structure

```
src-tauri/src/ai/context/
├── mod.rs                # Public API
├── token_counter.rs      # Provider-specific token counting
├── prioritizer.rs        # Context relevance scoring
├── chunker.rs            # Text chunking strategies
├── compressor.rs         # Context compression
├── budget.rs             # Token budget allocation
└── tests.rs
```

## Token Budget Allocation

For a typical chapter generation request:

| Component | Small (8K) | Medium (64K) | Large (128K+) |
|-----------|------------|--------------|---------------|
| System prompt | 500 | 1,000 | 2,000 |
| Story Bible context | 2,000 | 20,000 | 50,000 |
| Current chapter | 1,500 | 15,000 | 30,000 |
| Previous chapters summary | 500 | 5,000 | 15,000 |
| User instructions | 500 | 1,000 | 2,000 |
| **Output reserve** | 3,000 | 22,000 | 29,000 |

## Context Prioritization Algorithm

```rust
pub async fn prioritize_context(
    &self,
    task: &GenerationTask,
    budget_tokens: usize,
) -> Vec<PrioritizedEntity> {
    // 1. Get entities mentioned in current chapter (highest priority)
    let mentioned = self.find_mentioned_entities(&task.current_text);

    // 2. Semantic search for related entities
    let query_embedding = self.embed(&task.user_prompt).await?;
    let semantic_matches = self.vector_store.search(query_embedding, 50).await?;

    // 3. Score each entity by:
    //    - Direct mention: +100 points
    //    - Semantic similarity: up to +50 points
    //    - Entity type relevance: up to +20 points
    //    - Recency bonus: up to +10 points

    // 4. Sort by score and pack into budget
    self.pack_to_budget(scored, budget_tokens)
}
```

## Text Chunking Strategies

```rust
pub enum ChunkingStrategy {
    Sentence { max_tokens: usize },      // Split by sentence boundaries
    Paragraph { max_tokens: usize },     // Split by paragraph
    Scene { max_tokens: usize },         // Split by scene breaks (###)
    SlidingWindow {                      // Sliding window with overlap
        window_tokens: usize,
        overlap_tokens: usize
    },
}
```

## Context Compression (for small context windows)

Progressive compression levels:
- 500+ tokens: Summary (name, type, key traits, relationships)
- 200+ tokens: Brief (name, type, one-line summary)
- 50+ tokens: Minimal (name, defining trait)
- <50 tokens: Name only

## Provider-Specific Handling

For Yandex (8K window):
- Maximum 5 entities (compressed to brief format)
- Only last paragraph of current text
- No history context
- Truncated user instructions (200 tokens max)

---
