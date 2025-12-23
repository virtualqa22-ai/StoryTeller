# 6. Gamification & Motivation Service

## Problem Statement

Writing a novel is a long, solitary journey. StoryTeller needs a motivation system that tracks achievements, celebrates milestones, and maintains writing habits without feeling patronizing.

## Architectural Decisions

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

## Component Structure

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

## Event Sourcing Model

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

## Gamification State (Projection)

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

## Achievement Categories

| Category | Description |
|----------|-------------|
| Writing | Word count milestones (100, 1K, 5K, 20K, 50K, 100K, 500K) |
| Consistency | Streak milestones (7, 30, 90, 365 days) |
| StoryBible | Entity creation and validation achievements |
| Completion | Chapter and project completion |
| Mastery | Power user achievements (shortcuts, AI usage, marathon sessions) |

## Achievement Rarity

| Rarity | % of Users | Visual Treatment |
|--------|------------|------------------|
| Common | 50%+ | Gray border |
| Uncommon | 25-50% | Green border |
| Rare | 10-25% | Blue border |
| Epic | 1-10% | Purple border |
| Legendary | <1% | Gold border, special celebration |

## Celebration System

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

## Streak Tracking

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
