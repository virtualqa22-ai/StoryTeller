# Preflight: Detect Mode and Load Context

**Critical:** Determine mode before proceeding.

## Mode Detection

1. **Check for sprint-status.yaml**
   - If `{output_folder}/bmm-sprint-status.yaml` exists → **Epic-Level Mode** (Phase 4)
   - If NOT exists → Check workflow status

2. **Check workflow-status.yaml**
   - Read `{output_folder}/bmm-workflow-status.yaml`
   - If `implementation-readiness: required` or `implementation-readiness: recommended` → **System-Level Mode** (Phase 3)
   - Otherwise → **Epic-Level Mode** (Phase 4 without sprint status yet)

3. **Mode-Specific Requirements**

   **System-Level Mode (Phase 3 - Testability Review):**
   - ✅ Architecture document exists (architecture.md or tech-spec)
   - ✅ PRD exists with functional and non-functional requirements
   - ✅ Epics documented (epics.md)
   - ⚠️ Output: `{output_folder}/test-design-system.md`

   **Epic-Level Mode (Phase 4 - Per-Epic Planning):**
   - ✅ Story markdown with acceptance criteria available
   - ✅ PRD or epic documentation exists for context
   - ✅ Architecture documents available (optional but recommended)
   - ✅ Requirements are clear and testable
   - ⚠️ Output: `{output_folder}/test-design-epic-{epic_num}.md`

**Halt Condition:** If mode cannot be determined or required files missing, HALT and notify user with missing prerequisites.

---
