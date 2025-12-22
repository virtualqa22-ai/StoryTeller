# Step 1: Load Context (Mode-Aware)

**Mode-Specific Loading:**

## System-Level Mode (Phase 3)

1. **Read Architecture Documentation**
   - Load architecture.md or tech-spec (REQUIRED)
   - Load PRD.md for functional and non-functional requirements
   - Load epics.md for feature scope
   - Identify technology stack decisions (frameworks, databases, deployment targets)
   - Note integration points and external system dependencies
   - Extract NFR requirements (performance SLOs, security requirements, etc.)

2. **Check Playwright Utils Flag**

   Read `{config_source}` and check `config.tea_use_playwright_utils`.

   If true, note that `@seontechnologies/playwright-utils` provides utilities for test implementation. Reference in test design where relevant.

3. **Load Knowledge Base Fragments (System-Level)**

   **Critical:** Consult `{project-root}/_bmad/bmm/testarch/tea-index.csv` to load:
   - `nfr-criteria.md` - NFR validation approach (security, performance, reliability, maintainability)
   - `test-levels-framework.md` - Test levels strategy guidance
   - `risk-governance.md` - Testability risk identification
   - `test-quality.md` - Quality standards and Definition of Done

4. **Analyze Existing Test Setup (if brownfield)**
   - Search for existing test directories
   - Identify current test framework (if any)
   - Note testability concerns in existing codebase

## Epic-Level Mode (Phase 4)

1. **Read Requirements Documentation**
   - Load PRD.md for high-level product requirements
   - Read epics.md or specific epic for feature scope
   - Read story markdown for detailed acceptance criteria
   - Identify all testable requirements

2. **Load Architecture Context**
   - Read architecture.md for system design
   - Read tech-spec for implementation details
   - Read test-design-system.md (if exists from Phase 3)
   - Identify technical constraints and dependencies
   - Note integration points and external systems

3. **Analyze Existing Test Coverage**
   - Search for existing test files in `{test_dir}`
   - Identify coverage gaps
   - Note areas with insufficient testing
   - Check for flaky or outdated tests

4. **Load Knowledge Base Fragments (Epic-Level)**

   **Critical:** Consult `{project-root}/_bmad/bmm/testarch/tea-index.csv` to load:
   - `risk-governance.md` - Risk classification framework (6 categories: TECH, SEC, PERF, DATA, BUS, OPS), automated scoring, gate decision engine, owner tracking (625 lines, 4 examples)
   - `probability-impact.md` - Risk scoring methodology (probability × impact matrix, automated classification, dynamic re-assessment, gate integration, 604 lines, 4 examples)
   - `test-levels-framework.md` - Test level selection guidance (E2E vs API vs Component vs Unit with decision matrix, characteristics, when to use each, 467 lines, 4 examples)
   - `test-priorities-matrix.md` - P0-P3 prioritization criteria (automated priority calculation, risk-based mapping, tagging strategy, time budgets, 389 lines, 2 examples)

**Halt Condition (Epic-Level only):** If story data or acceptance criteria are missing, check if brownfield exploration is needed. If neither requirements NOR exploration possible, HALT with message: "Epic-level test design requires clear requirements, acceptance criteria, or brownfield app URL for exploration"

---
