# Extended Architectural Decisions

This document covers additional architectural decisions made to extend the core architecture, addressing gaps identified during review. These decisions complement the foundational architecture defined in the other architecture documents.

## Table of Contents

- [1. Backup & Data Recovery Architecture](#1-backup--data-recovery-architecture)
- [2. AI Context Window Management](#2-ai-context-window-management)
- [3. Editor Plugin Architecture](#3-editor-plugin-architecture)
- [4. Accessibility (WCAG 2.1 AA) Architecture](#4-accessibility-wcag-21-aa-architecture)
- [5. Internationalization (i18n) Architecture](#5-internationalization-i18n-architecture)
- [6. Gamification & Motivation Service](#6-gamification--motivation-service)

---

## 1. Backup & Data Recovery Architecture

### Problem Statement

StoryTeller has a **zero data loss requirement** (99.99% reliability). A single data loss incident during beta would destroy reputation. We need a comprehensive backup and recovery system.

### Architectural Decisions

**Decision: Automatic backup location (no user configuration)**
- Backups stored in `{app_data}/backups/` automatically
- Users cannot configure backup location (reduces complexity and support burden)
- Future consideration: Optional encrypted cloud backup

**Decision: Rolling window backup strategy**

| Backup Type | Interval | Retention | Purpose |
|-------------|----------|-----------|---------|
| Auto-save | 30 seconds | Current session | Crash recovery |
| Quick backup | 5 minutes | 10 rolling | Recent work recovery |
| Session backup | On close | 5 rolling | Session recovery |
| Daily backup | 24 hours | 7 rolling | Historical recovery |
| Manual export | User-initiated | Unlimited | Archive/transfer |

### Component Structure

```
src-tauri/src/backup/
├── mod.rs              # Public API
├── scheduler.rs        # Background backup scheduler
├── snapshot.rs         # Point-in-time snapshot creation
├── storage.rs          # Backup file management
├── recovery.rs         # Restore and conflict resolution
└── tests.rs
```

### Implementation Details

**SQLite Backup Implementation:**
- Uses SQLite Online Backup API for consistency
- Non-blocking, copy-on-write approach
- Allows concurrent reads during backup

```rust
pub async fn create_backup(
    source: &Connection,
    backup_path: &Path,
) -> Result<BackupMetadata, AppError> {
    let backup = source.backup(DatabaseName::Main, backup_path)?;

    while backup.step(100)? != Done {
        tokio::task::yield_now().await;
    }

    let metadata = BackupMetadata {
        id: Uuid::new_v4(),
        timestamp: Utc::now(),
        size_bytes: fs::metadata(backup_path)?.len(),
        project_count: count_projects(source)?,
        checksum: calculate_sha256(backup_path)?,
    };

    Ok(metadata)
}
```

**Backup File Structure:**

```
{app_data}/backups/
├── auto/                          # Auto-saves (volatile)
│   └── session_{timestamp}.db
├── rolling/                       # 5-minute rolling backups
│   ├── backup_001.db
│   └── backup_010.db
├── daily/                         # Daily backups
│   └── 2025-12-22.db
├── exports/                       # User-initiated exports
│   └── StoryTeller_Export_2025-12-22.zip
└── backup_index.json             # Metadata for all backups
```

**ZIP Export Format:**

```
StoryTeller_Export_2025-12-22.zip
├── storyteller.db                 # Main database
├── qdrant/                        # Vector store snapshot
│   └── collection_snapshot.tar
├── prompts/                       # Custom user prompts
│   └── *.md
├── manifest.json                  # Version, checksums, metadata
└── README.txt                     # Instructions for restore
```

**Recovery Flow:**
1. Show backup list with timestamp, project count, size, integrity status
2. Verify backup integrity (checksum validation)
3. Create safety backup of current state first
4. Restore database and rebuild vector indices
5. Show recovery report with items restored and any conflicts

**Conflict Resolution:**

```rust
pub enum ConflictResolution {
    KeepLocal,           // Discard backup version
    KeepBackup,          // Overwrite with backup
    KeepBoth,            // Duplicate with suffix
    AskUser(ConflictUI), // Show UI for each conflict
}
```

**Required Fault Injection Tests:**

| Test Scenario | Method | Expected Outcome |
|---------------|--------|------------------|
| Crash during save | Kill process mid-write | Recovery from last backup |
| Disk full | Mock fs with no space | Graceful error, no corruption |
| Corrupted backup | Inject bad bytes | Checksum failure, skip backup |
| Power loss simulation | SIGKILL during backup | WAL recovery works |

---

## 2. AI Context Window Management

### Problem Statement

StoryTeller supports 5 AI providers with vastly different context windows:
- GPT-4o: 128K tokens
- Claude 3.5: 200K tokens
- Gemini 1.5: 1M tokens
- Deepseek: 64K tokens
- Yandex GPT: 8K tokens

A 100K-word novel is ~130K tokens. Smart context management is required.

### Architectural Decisions

**Decision: Provider recommendation when context is too large**
- App suggests switching providers when Story Bible exceeds provider limits
- Example: "Your Story Bible is too large for Yandex. Consider using Claude or Gemini for better results."

**Decision: No manual entity selection**
- Context prioritization is fully automatic
- Keeps UI simple, no "power user" complexity

**Decision: "Show what AI sees" debug feature**
- Available during beta for transparency
- Helps users understand context window usage
- Can be hidden in production release

### Component Structure

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

### Token Budget Allocation

For a typical chapter generation request:

| Component | Small (8K) | Medium (64K) | Large (128K+) |
|-----------|------------|--------------|---------------|
| System prompt | 500 | 1,000 | 2,000 |
| Story Bible context | 2,000 | 20,000 | 50,000 |
| Current chapter | 1,500 | 15,000 | 30,000 |
| Previous chapters summary | 500 | 5,000 | 15,000 |
| User instructions | 500 | 1,000 | 2,000 |
| **Output reserve** | 3,000 | 22,000 | 29,000 |

### Context Prioritization Algorithm

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

### Text Chunking Strategies

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

### Context Compression (for small context windows)

Progressive compression levels:
- 500+ tokens: Summary (name, type, key traits, relationships)
- 200+ tokens: Brief (name, type, one-line summary)
- 50+ tokens: Minimal (name, defining trait)
- <50 tokens: Name only

### Provider-Specific Handling

For Yandex (8K window):
- Maximum 5 entities (compressed to brief format)
- Only last paragraph of current text
- No history context
- Truncated user instructions (200 tokens max)

---

## 3. Editor Plugin Architecture

### Problem Statement

ProseMirror is selected as the editor, but we need a plugin architecture for Story Bible integration, validation, and performance with large documents.

### Architectural Decisions

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

### Component Structure

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

### Custom Schema Nodes

**Manuscript-specific nodes:**
- `scene_break`: Horizontal rule for scene separation
- `chapter_heading`: Chapter header with number and title attributes
- `entity_mention`: Inline entity linked to Story Bible

**Custom marks:**
- `validation_warning`: Highlight with severity (error/warning/info) and message

### Plugin Specifications

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

### Keyboard Shortcuts

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

## 4. Accessibility (WCAG 2.1 AA) Architecture

### Problem Statement

StoryTeller must meet WCAG 2.1 AA compliance for screen reader users, keyboard navigation, visual impairments, and motor impairments.

### Architectural Decisions

**Decision: Automated accessibility testing (no manual screen reader testing available)**
- Use axe-core for automated WCAG compliance testing
- Integrate into CI pipeline
- Manual testing deferred to beta user feedback

**Decision: Skip accessibility statement for MVP**
- Can be added post-launch if needed

**Decision: User-defined font scaling with Large Text mode**
- Four scale options: Small (0.875x), Normal (1x), Large (1.25x), Extra Large (1.5x)
- Persisted in localStorage
- All UI elements scale proportionally

### Component Structure

```
src/lib/accessibility/
├── index.ts                    # Public API
├── focusManager.ts             # Focus trap and restoration
├── announcer.ts                # Live region announcements
├── keyboardNav.ts              # Keyboard navigation patterns
├── contrastTheme.ts            # High contrast mode
├── reducedMotion.ts            # Motion preferences
└── screenReaderUtils.ts        # ARIA helpers
```

### Focus Management

**Focus Trap for Modals:**
- Trap focus within modal container
- Tab cycles through focusable elements
- Escape key releases focus and closes modal
- Previous focus restored on close

**Skip Link:**
- "Skip to main content" link at top of page
- Visible on focus for keyboard users
- Links to `#main-content` landmark

### Live Region Announcements

**Announcer Service:**
- Polite announcements for status updates
- Assertive announcements for errors and achievements
- Pre-built methods for common actions:
  - `announceAutoSave()`
  - `announceValidationComplete(warningCount)`
  - `announceChapterChange(chapterTitle)`
  - `announceGenerationComplete()`
  - `announceError(message)`

### Keyboard Navigation Patterns

**Roving Tabindex:**
- Used for lists and grids (Story Bible entity list, chapter list)
- Arrow keys move between items
- Only one item tabbable at a time
- Home/End jump to first/last item

### High Contrast Mode

**Three modes:**
- Normal (default)
- High Contrast Light (black on white, 2px borders)
- High Contrast Dark (white on black, yellow accents)

**Detection:**
- Respects OS `prefers-contrast: more` preference
- Manual override in settings

### Reduced Motion

**Implementation:**
- Respects OS `prefers-reduced-motion: reduce` preference
- All animations have duration 0 when enabled
- Confetti and celebrations disabled
- Provides `getAnimationDuration()` helper for components

### Font Scaling

**Scale Options:**

| Scale | Multiplier | Base Font Size |
|-------|------------|----------------|
| Small | 0.875x | 14px |
| Normal | 1x | 16px |
| Large | 1.25x | 20px |
| Extra Large | 1.5x | 24px |

**CSS Implementation:**
- All sizes use `rem` units
- `--font-scale` CSS variable for proportional scaling
- Minimum touch target sizes scale with font

### WCAG 2.1 AA Compliance Checklist

| Criterion | Requirement | Implementation |
|-----------|-------------|----------------|
| 1.1.1 Non-text Content | Alt text for images | `aria-label` on icons |
| 1.3.1 Info and Relationships | Semantic structure | Proper headings, landmarks |
| 1.4.3 Contrast (Minimum) | 4.5:1 text contrast | High contrast themes |
| 1.4.11 Non-text Contrast | 3:1 UI contrast | Border colors, focus indicators |
| 2.1.1 Keyboard | All functionality via keyboard | Full keyboard navigation |
| 2.1.2 No Keyboard Trap | Can tab out | Focus manager with escape |
| 2.4.1 Bypass Blocks | Skip navigation | Skip link to main content |
| 2.4.3 Focus Order | Logical focus sequence | DOM order matches visual |
| 2.4.7 Focus Visible | Visible focus indicator | Custom focus-visible styles |
| 4.1.2 Name, Role, Value | Programmatic name/role | ARIA attributes on controls |

---

## 5. Internationalization (i18n) Architecture

### Problem Statement

StoryTeller needs UI translation infrastructure, UTF-8 support, locale-aware formatting, RTL text support, and user font scaling.

### Architectural Decisions

**Decision: Priority languages for future localization**
- English (MVP)
- Hindi, Gujarati, German, Japanese (post-MVP priority)
- RTL support for Arabic/Hebrew (infrastructure ready)

**Decision: AI-powered manuscript translation (future feature)**
- Users can translate their manuscript content via AI
- Separate from UI i18n

**Decision: Locale-specific number formatting**
- Word counts use locale formatting (50,000 vs 50.000)
- Dates and times localized
- Relative time formatting ("2 hours ago")

### Component Structure

```
src/lib/i18n/
├── index.ts                # Public API
├── store.svelte.ts         # Reactive locale state
├── translations/
│   ├── en.json             # English (default)
│   └── [future locales]
├── formatting.ts           # Date, number, pluralization
├── rtl.ts                  # RTL detection and support
└── fontScaling.ts          # User font size preferences
```

### Translation File Format

**ICU MessageFormat support:**

```json
{
  "editor": {
    "wordCount": "{count, plural, =0 {No words} =1 {1 word} other {# words}}",
    "lastSaved": "Last saved {time}",
    "validationWarnings": "{count, plural, =1 {1 issue} other {# issues}} found"
  }
}
```

### i18n Store

**Features:**
- Reactive locale state with Svelte 5 runes
- Automatic browser locale detection
- Persistent locale preference (localStorage)
- Dynamic RTL support (`dir="rtl"` on document)
- ICU plural formatting

**Usage:**

```typescript
import { t } from '$lib/i18n/store.svelte';

// Simple translation
t('common.save') // "Save"

// With interpolation
t('editor.lastSaved', { time: '2:30 PM' }) // "Last saved 2:30 PM"

// With pluralization
t('editor.wordCount', { count: 1500 }) // "1,500 words"
```

### Locale-Aware Formatting

**Functions:**
- `formatDate(date, style)` - Date formatting
- `formatTime(date, style)` - Time formatting
- `formatDateTime(date, dateStyle, timeStyle)` - Combined
- `formatRelativeTime(date)` - "2 hours ago", "in 3 days"
- `formatNumber(value, options)` - Number with locale separators
- `formatWordCount(count)` - Word count with locale formatting

### RTL Support

**CSS Logical Properties:**
- Use `padding-inline-start` instead of `padding-left`
- Use `border-inline-end` instead of `border-right`
- Use `text-align: start` instead of `text-align: left`

**Icon Flipping:**
- Directional icons (arrows, chevrons) flip automatically
- `shouldFlipIcon(iconName)` helper function

**Editor RTL:**
- ProseMirror supports RTL text direction
- Mixed content isolated with `unicode-bidi: isolate`

### Font Scaling

**Scale Options:**

| Scale | Label | Multiplier | Base Size |
|-------|-------|------------|-----------|
| small | Small | 0.875x | 14px |
| normal | Normal | 1x | 16px |
| large | Large | 1.25x | 20px |
| x-large | Extra Large | 1.5x | 24px |

**Implementation:**
- CSS variable `--font-scale` for multiplier
- CSS variable `--base-font-size` for root size
- All typography uses `rem` units
- Touch targets scale proportionally

---

## 6. Gamification & Motivation Service

### Problem Statement

Writing a novel is a long, solitary journey. StoryTeller needs a motivation system that tracks achievements, celebrates milestones, and maintains writing habits without feeling patronizing.

### Architectural Decisions

**Decision: Sound effects for celebrations (optional, off by default)**
- Celebration sounds for achievements
- Respects system `prefers-reduced-motion` preference
- User can disable in settings

**Decision: No leaderboards or social features**
- Purely single-user, personal motivation
- No community features, no data sharing
- Privacy-focused design

**Decision: Daily goals are optional**
- Users can set daily word count goals if desired
- No pressure or guilt for missing goals
- Streak tracking is informational, not punitive

### Component Structure

**Backend (Rust):**

```
src-tauri/src/gamification/
├── mod.rs                  # Public API
├── events.rs               # Event definitions (event sourcing)
├── event_store.rs          # SQLite event persistence
├── projections.rs          # State computed from events
├── achievements.rs         # Achievement definitions & logic
├── streaks.rs              # Streak tracking
├── milestones.rs           # Milestone definitions
└── tests.rs
```

**Frontend (Svelte):**

```
src/lib/gamification/
├── store.svelte.ts         # Reactive state
├── components/
│   ├── AchievementToast.svelte
│   ├── StreakCounter.svelte
│   ├── DailyGoalProgress.svelte
│   ├── ProgressRing.svelte
│   └── StatsPanel.svelte
└── celebrations/
    ├── confetti.ts         # Confetti animation
    └── sounds.ts           # Celebration sounds
```

### Event Sourcing Model

**All gamification state is computed from immutable events:**

```rust
pub enum GamificationEvent {
    WordsWritten { project_id, chapter_id, word_count, timestamp },
    ChapterCompleted { project_id, chapter_id, word_count, timestamp },
    WritingSessionStarted { session_id, project_id, timestamp },
    WritingSessionEnded { session_id, duration_minutes, words_written, timestamp },
    EntityCreated { project_id, entity_type, timestamp },
    ValidationPassed { project_id, chapter_id, consistency_score, timestamp },
    ProjectExported { project_id, format, word_count, timestamp },
    DailyGoalSet { goal_words, timestamp },
    DailyGoalAchieved { goal_words, actual_words, timestamp },
    StreakContinued { streak_days, timestamp },
    StreakBroken { previous_streak, timestamp },
    AchievementUnlocked { achievement_id, timestamp },
}
```

**Benefits:**
- State can be reconstructed at any point
- Full audit trail of user progress
- Easy to add new achievement types retroactively

### Gamification State (Projection)

```rust
pub struct GamificationState {
    // Lifetime stats
    pub total_words_written: u64,
    pub total_chapters_completed: u32,
    pub total_projects_exported: u32,
    pub total_writing_minutes: u64,

    // Streaks
    pub current_streak_days: u32,
    pub longest_streak_days: u32,

    // Daily progress (optional)
    pub daily_goal_words: u32,
    pub words_today: u32,
    pub daily_goal_achieved: bool,

    // Achievements
    pub unlocked_achievements: HashSet<String>,

    // Writing patterns
    pub words_by_day_of_week: [u64; 7],
    pub best_writing_day_words: u32,
}
```

### Achievement Categories

| Category | Description |
|----------|-------------|
| Writing | Word count milestones (100, 1K, 5K, 20K, 50K, 100K, 500K) |
| Consistency | Streak milestones (7, 30, 90, 365 days) |
| StoryBible | Entity creation and validation achievements |
| Completion | Chapter and project completion |
| Mastery | Power user achievements (shortcuts, AI usage, marathon sessions) |

### Achievement Rarity

| Rarity | % of Users | Visual Treatment |
|--------|------------|------------------|
| Common | 50%+ | Gray border |
| Uncommon | 25-50% | Green border |
| Rare | 10-25% | Blue border |
| Epic | 1-10% | Purple border |
| Legendary | <1% | Gold border, special celebration |

### Celebration System

**Visual Celebrations:**
- Toast notification for all achievements
- Confetti burst for Rare+ achievements
- Extended confetti for Legendary achievements
- Respects `prefers-reduced-motion`

**Sound Effects (optional):**
- Soft chime for Common/Uncommon
- Triumphant sound for Rare/Epic
- Fanfare for Legendary
- Disabled by default, enable in settings

**Accessibility:**
- All celebrations announced to screen readers
- Visual-only option for users who prefer no sounds
- Celebrations can be completely disabled

### Streak Tracking

**Rules:**
- Writing any words counts toward streak
- Streak continues if writing on consecutive days
- Streak breaks after missing a full day
- No guilt messaging - just informational

**Streak Update Logic:**

```rust
pub enum StreakUpdate {
    Started { new_streak: 1 },           // First time writing
    Continued { new_streak: n + 1 },     // Consecutive day
    Unchanged { streak: n },             // Same day
    Broken { previous: n, new: 1 },      // Missed day(s)
}
```

---

## Summary of Key Decisions

| Area | Key Decision | Rationale |
|------|--------------|-----------|
| Backup | Automatic location | Simplicity, no user confusion |
| Backup | 10 rolling + 7 daily | Balance coverage and storage |
| AI Context | Provider recommendations | Guide users to better results |
| AI Context | "Show what AI sees" | Beta transparency |
| Editor | Ctrl+Space for suggestions | Non-intrusive, IDE convention |
| Editor | Validation on by default | Core feature, easily disabled |
| Accessibility | axe-core automated testing | No manual screen reader access |
| Accessibility | Font scaling (4 levels) | User preference, accessibility |
| i18n | Hindi, Gujarati, German, Japanese | Priority post-MVP languages |
| i18n | Locale-specific formatting | Professional international support |
| Gamification | Sound effects (optional) | Celebration enhancement |
| Gamification | No leaderboards | Privacy, single-user focus |
| Gamification | Optional daily goals | No pressure, personal choice |
