# Level Detection Problems

## Problem: workflow-init suggests wrong level

**Symptoms:**

- Detects Level 3 but you only need Level 1
- Suggests Level 1 but project is actually Level 2
- Can't figure out appropriate level

**Solution:**

1. **Override the suggestion** - workflow-init always asks for confirmation, just say "no" and choose correct level
2. **Be specific in description** - Use level keywords when describing:
   - "fix bug" → Level 0
   - "add small feature" → Level 1
   - "build dashboard" → Level 2
3. **Manual override** - You can always switch levels later if needed

**Example:**

```
workflow-init: "Level 3 project?"
You: "No, this is just adding OAuth login - Level 1"
workflow-init: "Got it, creating Level 1 workflow"
```

## Problem: Project level unclear

**Symptoms:**

- Between Level 1 and Level 2
- Not sure if architecture needed
- Story count uncertain

**Solution:**
**When in doubt, start smaller:**

- Choose Level 1 instead of Level 2
- You can always run `create-prd` later if needed
- Level 1 is faster, less overhead
- Easy to upgrade, hard to downgrade

**Decision criteria:**

- Single epic with related stories? → Level 1
- Multiple independent epics? → Level 2
- Need product-level planning? → Level 2
- Just need technical plan? → Level 1

## Problem: Old planning docs influencing level detection

**Symptoms:**

- Old Level 3 PRD in folder
- Working on new Level 0 bug fix
- workflow-init suggests Level 3

**Solution:**
workflow-init asks: "Is this work in progress or previous effort?"

- Answer: "Previous effort"
- Then describe your NEW work clearly
- System will detect level based on NEW work, not old artifacts

---
