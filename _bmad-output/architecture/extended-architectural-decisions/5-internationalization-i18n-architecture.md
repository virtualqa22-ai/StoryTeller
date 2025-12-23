# 5. Internationalization (i18n) Architecture

## Problem Statement

StoryTeller needs UI translation infrastructure, UTF-8 support, locale-aware formatting, RTL text support, and user font scaling.

## Architectural Decisions

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

## Component Structure

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

## Translation File Format

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

## i18n Store

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

## Locale-Aware Formatting

**Functions:**
- `formatDate(date, style)` - Date formatting
- `formatTime(date, style)` - Time formatting
- `formatDateTime(date, dateStyle, timeStyle)` - Combined
- `formatRelativeTime(date)` - "2 hours ago", "in 3 days"
- `formatNumber(value, options)` - Number with locale separators
- `formatWordCount(count)` - Word count with locale formatting

## RTL Support

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

## Font Scaling

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
