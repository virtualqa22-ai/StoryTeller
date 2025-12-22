# Prototype Requirements

## Figma Prototypes Needed

**Prototype 1: Onboarding Paths (Clickthrough)**
- Welcome screen with three options: Guided / Quick Start / Demo
- Guided wizard: 5 steps (project name, genre, word count target, Story Bible intro, writing tips)
- Quick Start: 1 screen (project name, genre) → writing interface
- Demo project: Pre-populated novel with Story Bible entries and sample validation

**Prototype 2: Story Bible Concept**
- Character entry card (Marcus: blue eyes, military background, fear of heights)
- Location entry card (Riverside Cafe: small coffee shop, wooden tables, jazz music)
- Plot entry card (Opening: Marcus discovers the conspiracy)
- List view showing all entries with color-coding (characters blue, locations green, plot purple)
- Suggestion system: "Add Marcus to your Story Bible?" toast notification

**Prototype 3: AI Generation with Validation (Interactive)**
- "Generate Next Scene" button
- Context assembly visualization: "Assembling story context... Found 12 character details, 5 plot points, 3 world rules"
- Generation progress: "Generating scene... Using Story Bible context to maintain consistency"
- Preview panel with generated content
- Validation results:
  - Layer 1: "✓ Validated against your Story Bible - No contradictions detected"
  - Layer 2 (expandable): "Checking 15 character details, 8 plot points..."
  - Layer 3 (expandable): "✓ Marcus's blue eyes - matches Chapter 3, ✓ Military background - matches Chapter 1..."
- Actions: [Regenerate] [Edit] [Accept] [Cancel]

**Prototype 4: Contradiction Resolution**
- Warning state: "⚠️ Story Inconsistency Detected"
- Side-by-side comparison:
  - Left: "Your Story Bible says: Marcus has blue eyes (Chapter 3)"
  - Right: "This generation says: 'Marcus's brown eyes...'"
- Actions: "Which is correct? [Blue - Keep Story Bible] [Brown - Update Story Bible] [I'll Fix It Myself]"

---
