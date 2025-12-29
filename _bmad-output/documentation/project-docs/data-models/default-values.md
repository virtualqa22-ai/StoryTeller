# Default Values

## Database Defaults

| Field | Default Value |
|-------|---------------|
| `language` | `'en'` |
| `created_at` | `CURRENT_TIMESTAMP` |
| `updated_at` | `CURRENT_TIMESTAMP` |

## Application Defaults

| Field | Default Value | Location |
|-------|---------------|----------|
| `chapter_count` | 20 | `Project::get_target_word_count()` |
| `target_words_per_chapter` | 3000 | `Project::get_target_word_count()` |

**Note:** These are not database defaults; they're fallback values used in calculations.

---
