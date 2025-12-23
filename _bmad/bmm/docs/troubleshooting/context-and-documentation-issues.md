# Context and Documentation Issues

## Problem: AI agents lack codebase understanding (Brownfield)

**Symptoms:**

- Suggestions don't align with existing patterns
- Ignores available components
- Proposes approaches that conflict with architecture
- Doesn't reference existing code

**Solution:**

1. **Run document-project** - Critical for brownfield projects
   ```
   Load Analyst agent → run document-project
   Choose scan level: Deep (recommended for PRD prep)
   ```
2. **Verify docs/index.md exists** - This is master entry point for AI agents
3. **Check documentation completeness**:
   - Review generated docs/index.md
   - Ensure key systems are documented
4. **Run deep-dive on specific areas** if needed

## Problem: Have documentation but agents can't find it

**Symptoms:**

- README.md, ARCHITECTURE.md exist
- AI agents still ask questions answered in docs
- No docs/index.md file

**Solution:**
**Option 1: Quick fix (2-5min)**
Run `index-docs` task:

- Located at `bmad/core/tasks/index-docs.xml`
- Scans existing docs and generates index.md
- Lightweight, just creates navigation

**Option 2: Comprehensive (10-30min)**
Run document-project workflow:

- Discovers existing docs in Step 2
- Generates NEW AI-friendly documentation from codebase
- Creates index.md linking to BOTH existing and new docs

**Why this matters:** AI agents need structured entry point (index.md) to navigate docs efficiently.

## Problem: document-project takes too long

**Symptoms:**

- Exhaustive scan running for hours
- Impatient to start planning

**Solution:**
**Choose appropriate scan level:**

- **Quick (2-5min)** - Pattern analysis, no source reading - Good for initial overview
- **Deep (10-30min)** - Reads critical paths - **Recommended for most brownfield projects**
- **Exhaustive (30-120min)** - Reads all files - Only for migration planning or complete understanding

For most brownfield projects, **Deep scan is sufficient**.

---
