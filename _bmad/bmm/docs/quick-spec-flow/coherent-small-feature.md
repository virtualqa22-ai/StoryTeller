# Coherent Small Feature

**Best for:** Small features with 2-3 related user stories

## What You Get

1. **tech-spec.md** - Same comprehensive spec as single change projects
2. **epics.md** - Epic organization with story breakdown
3. **story-[epic-slug]-1.md** - First story
4. **story-[epic-slug]-2.md** - Second story
5. **story-[epic-slug]-3.md** - Third story (if needed)

## Quick Spec Flow Commands

```bash
# Start Quick Spec Flow
# Load PM agent and run tech-spec

# Optional: Organize stories as a sprint
# Load SM agent and run sprint-planning

# Implement story-by-story:
# Load DEV agent and run dev-story for each story
```

## Story Sequencing

Stories are **automatically validated** to ensure proper sequence:

- ✅ No forward dependencies (Story 2 can't depend on Story 3)
- ✅ Clear dependency documentation
- ✅ Infrastructure → Features → Polish order
- ✅ Backend → Frontend flow

## Example Small Feature Scenarios

- "Add OAuth social login (Google, GitHub, Twitter)"
- "Build user profile page with avatar upload"
- "Implement basic search with filters"
- "Add dark mode toggle to application"

---
