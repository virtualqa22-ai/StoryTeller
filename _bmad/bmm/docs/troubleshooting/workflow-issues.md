# Workflow Issues

## Problem: Workflow fails or hangs

**Symptoms:**

- Workflow starts but doesn't complete
- Agent stops responding mid-workflow
- Progress stalls

**Solution:**

1. **Check context limits** - Start fresh chat for complex workflows
2. **Verify prerequisites**:
   - Phase 2 needs Phase 1 complete (if used)
   - Phase 3 needs Phase 2 complete
   - Phase 4 needs Phase 3 complete (if Level 3-4)
3. **Restart workflow** - Load agent in new chat and restart
4. **Check status file** - Verify `bmm-workflow-status.md` or `sprint-status.yaml` is present and valid

## Problem: Agent says "workflow not found"

**Symptoms:**

- Request workflow by name
- Agent doesn't recognize it
- Menu doesn't show workflow

**Solution:**

1. Check spelling/format - Use exact workflow name or menu shortcut (`*prd` not `*PRD`)
2. Verify agent has workflow:
   - PM agent: prd, tech-spec
   - Architect agent: create-architecture, validate-architecture
   - SM agent: sprint-planning, create-story
3. Try menu number instead of name
4. Check you're using correct agent for workflow

## Problem: Sprint-planning workflow fails

**Symptoms:**

- Can't create sprint-status.yaml
- Epics not extracted from files
- Status file empty or incorrect

**Solution:**

1. **Verify epic files exist**:
   - Level 1: tech-spec with epic
   - Level 2-4: epics.md or sharded epic files
2. **Check file format**:
   - Epic files should be valid Markdown
   - Epic headers should be clear (## Epic Name)
3. **Run in Phase 4 only** - Ensure Phase 2/3 complete first
4. **Check file paths** - Epic files should be in correct output folder

---
