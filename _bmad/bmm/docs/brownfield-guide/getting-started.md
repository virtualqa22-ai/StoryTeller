# Getting Started

## Understanding Planning Tracks

For complete track details, see [Scale Adaptive System](./scale-adaptive-system.md).

**Brownfield tracks at a glance:**

| Track                 | Scope                      | Typical Stories | Key Difference                                  |
| --------------------- | -------------------------- | --------------- | ----------------------------------------------- |
| **Quick Flow**        | Bug fixes, small features  | 1-15            | Must understand affected code and patterns      |
| **BMad Method**       | Feature sets, integrations | 10-50+          | Integrate with existing architecture            |
| **Enterprise Method** | Enterprise expansions      | 30+             | Full system documentation + compliance required |

**Note:** Story counts are guidance, not definitions. Tracks are chosen based on planning needs.

## Track Selection for Brownfield

When you run `workflow-init`, it handles brownfield intelligently:

**Step 1: Shows what it found**

- Old planning docs (PRD, epics, stories)
- Existing codebase

**Step 2: Asks about YOUR work**

> "Are these works in progress, previous effort, or proposed work?"

- **(a) Works in progress** → Uses artifacts to determine level
- **(b) Previous effort** → Asks you to describe NEW work
- **(c) Proposed work** → Uses artifacts as guidance
- **(d) None of these** → You explain your work

**Step 3: Analyzes your description**

- Keywords: "fix", "bug" → Quick Flow, "dashboard", "platform" → BMad Method, "enterprise", "multi-tenant" → Enterprise Method
- Complexity assessment
- Confirms suggested track with you

**Key Principle:** System asks about YOUR current work first, uses old artifacts as context only.

**Example: Old Complex PRD, New Simple Work**

```
System: "Found PRD.md (BMad Method track, 30 stories, 6 months old)"
System: "Is this work in progress or previous effort?"
You: "Previous effort - I'm just fixing a bug now"
System: "Tell me about your current work"
You: "Update payment method enums"
System: "Quick Flow track (tech-spec approach). Correct?"
You: "Yes"
✅ Creates Quick Flow workflow
```

---
