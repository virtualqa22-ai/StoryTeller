# 4. Accessibility (WCAG 2.1 AA) Architecture

## Problem Statement

StoryTeller must meet WCAG 2.1 AA compliance for screen reader users, keyboard navigation, visual impairments, and motor impairments.

## Architectural Decisions

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

## Component Structure

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

## Focus Management

**Focus Trap for Modals:**
- Trap focus within modal container
- Tab cycles through focusable elements
- Escape key releases focus and closes modal
- Previous focus restored on close

**Skip Link:**
- "Skip to main content" link at top of page
- Visible on focus for keyboard users
- Links to `#main-content` landmark

## Live Region Announcements

**Announcer Service:**
- Polite announcements for status updates
- Assertive announcements for errors and achievements
- Pre-built methods for common actions:
  - `announceAutoSave()`
  - `announceValidationComplete(warningCount)`
  - `announceChapterChange(chapterTitle)`
  - `announceGenerationComplete()`
  - `announceError(message)`

## Keyboard Navigation Patterns

**Roving Tabindex:**
- Used for lists and grids (Story Bible entity list, chapter list)
- Arrow keys move between items
- Only one item tabbable at a time
- Home/End jump to first/last item

## High Contrast Mode

**Three modes:**
- Normal (default)
- High Contrast Light (black on white, 2px borders)
- High Contrast Dark (white on black, yellow accents)

**Detection:**
- Respects OS `prefers-contrast: more` preference
- Manual override in settings

## Reduced Motion

**Implementation:**
- Respects OS `prefers-reduced-motion: reduce` preference
- All animations have duration 0 when enabled
- Confetti and celebrations disabled
- Provides `getAnimationDuration()` helper for components

## Font Scaling

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

## WCAG 2.1 AA Compliance Checklist

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
