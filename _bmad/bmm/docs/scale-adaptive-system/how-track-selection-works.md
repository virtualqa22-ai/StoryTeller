# How Track Selection Works

When you run `workflow-init`, it guides you through an educational choice:

## 1. Description Analysis

Analyzes your project description for complexity indicators and suggests an appropriate track.

## 2. Educational Presentation

Shows all three tracks with:

- Time investment
- Planning approach
- Benefits and trade-offs
- AI agent support level
- Concrete examples

## 3. Honest Recommendation

Provides tailored recommendation based on:

- Complexity keywords
- Greenfield vs brownfield
- User's description

## 4. User Choice

You choose the track that fits your situation. The system guides but never forces.

**Example:**

```
workflow-init: "Based on 'Add user dashboard with analytics', I recommend BMad Method.
               This involves multiple features and system design. The PRD + Architecture
               gives AI agents complete context for better code generation."

You: "Actually, this is simpler than it sounds. Quick Flow."

workflow-init: "Got it! Using Quick Flow with tech-spec."
```

---
