# PHASE 1: REQUIREMENTS TRACEABILITY

This phase focuses on mapping requirements to tests, analyzing coverage, and identifying gaps.

---

## Step 1: Load Context and Knowledge Base

**Actions:**

1. Load relevant knowledge fragments from `{project-root}/_bmad/bmm/testarch/tea-index.csv`:
   - `test-priorities-matrix.md` - P0/P1/P2/P3 risk framework with automated priority calculation, risk-based mapping, tagging strategy (389 lines, 2 examples)
   - `risk-governance.md` - Risk-based testing approach: 6 categories (TECH, SEC, PERF, DATA, BUS, OPS), automated scoring, gate decision engine, coverage traceability (625 lines, 4 examples)
   - `probability-impact.md` - Risk scoring methodology: probability × impact matrix, automated classification, dynamic re-assessment, gate integration (604 lines, 4 examples)
   - `test-quality.md` - Definition of Done for tests: deterministic, isolated with cleanup, explicit assertions, length/time limits (658 lines, 5 examples)
   - `selective-testing.md` - Duplicate coverage patterns: tag-based, spec filters, diff-based selection, promotion rules (727 lines, 4 examples)

2. Read story file (if provided):
   - Extract acceptance criteria
   - Identify story ID (e.g., 1.3)
   - Note any existing test design or priority information

3. Read related BMad artifacts (if available):
   - `test-design.md` - Risk assessment and test priorities
   - `tech-spec.md` - Technical implementation details
   - `PRD.md` - Product requirements context

**Output:** Complete understanding of requirements, priorities, and existing context

---

## Step 2: Discover and Catalog Tests

**Actions:**

1. Auto-discover test files related to the story:
   - Search for test IDs (e.g., `1.3-E2E-001`, `1.3-UNIT-005`)
   - Search for describe blocks mentioning feature name
   - Search for file paths matching feature directory
   - Use `glob` to find test files in `{test_dir}`

2. Categorize tests by level:
   - **E2E Tests**: Full user journeys through UI
   - **API Tests**: HTTP contract and integration tests
   - **Component Tests**: UI component behavior in isolation
   - **Unit Tests**: Business logic and pure functions

3. Extract test metadata:
   - Test ID (if present)
   - Describe/context blocks
   - It blocks (individual test cases)
   - Given-When-Then structure (if BDD)
   - Assertions used
   - Priority markers (P0/P1/P2/P3)

**Output:** Complete catalog of all tests for this feature

---

## Step 3: Map Criteria to Tests

**Actions:**

1. For each acceptance criterion:
   - Search for explicit references (test IDs, describe blocks mentioning criterion)
   - Map to specific test files and it blocks
   - Use Given-When-Then narrative to verify alignment
   - Document test level (E2E, API, Component, Unit)

2. Build traceability matrix:

   ```
   | Criterion ID | Description | Test ID     | Test File        | Test Level | Coverage Status |
   | ------------ | ----------- | ----------- | ---------------- | ---------- | --------------- |
   | AC-1         | User can... | 1.3-E2E-001 | e2e/auth.spec.ts | E2E        | FULL            |
   ```

3. Classify coverage status for each criterion:
   - **FULL**: All scenarios validated at appropriate level(s)
   - **PARTIAL**: Some coverage but missing edge cases or levels
   - **NONE**: No test coverage at any level
   - **UNIT-ONLY**: Only unit tests (missing integration/E2E validation)
   - **INTEGRATION-ONLY**: Only API/Component tests (missing unit confidence)

4. Check for duplicate coverage:
   - Same behavior tested at multiple levels unnecessarily
   - Flag violations of selective testing principles
   - Recommend consolidation where appropriate

**Output:** Complete traceability matrix with coverage classifications

---

## Step 4: Analyze Gaps and Prioritize

**Actions:**

1. Identify coverage gaps:
   - List criteria with NONE, PARTIAL, UNIT-ONLY, or INTEGRATION-ONLY status
   - Assign severity based on test-priorities framework:
     - **CRITICAL**: P0 criteria without FULL coverage (blocks release)
     - **HIGH**: P1 criteria without FULL coverage (PR blocker)
     - **MEDIUM**: P2 criteria without FULL coverage (nightly test gap)
     - **LOW**: P3 criteria without FULL coverage (acceptable gap)

2. Recommend specific tests to add:
   - Suggest test level (E2E, API, Component, Unit)
   - Provide test description (Given-When-Then)
   - Recommend test ID (e.g., `1.3-E2E-004`)
   - Explain why this test is needed

3. Calculate coverage metrics:
   - Overall coverage percentage (criteria with FULL coverage / total criteria)
   - P0 coverage percentage (critical paths)
   - P1 coverage percentage (high priority)
   - Coverage by level (E2E%, API%, Component%, Unit%)

4. Check against quality gates:
   - P0 coverage >= 100% (required)
   - P1 coverage >= 90% (recommended)
   - Overall coverage >= 80% (recommended)

**Output:** Prioritized gap analysis with actionable recommendations and coverage metrics

---

## Step 5: Verify Test Quality

**Actions:**

1. For each mapped test, verify:
   - Explicit assertions are present (not hidden in helpers)
   - Test follows Given-When-Then structure
   - No hard waits or sleeps
   - Self-cleaning (test cleans up its data)
   - File size < 300 lines
   - Test duration < 90 seconds

2. Flag quality issues:
   - **BLOCKER**: Missing assertions, hard waits, flaky patterns
   - **WARNING**: Large files, slow tests, unclear structure
   - **INFO**: Style inconsistencies, missing documentation

3. Reference knowledge fragments:
   - `test-quality.md` for Definition of Done
   - `fixture-architecture.md` for self-cleaning patterns
   - `network-first.md` for Playwright best practices
   - `data-factories.md` for test data patterns

**Output:** Quality assessment for each test with improvement recommendations

---

## Step 6: Generate Deliverables (Phase 1)

**Actions:**

1. Create traceability matrix markdown file:
   - Use template from `trace-template.md`
   - Include full mapping table
   - Add coverage status section
   - Add gap analysis section
   - Add quality assessment section
   - Add recommendations section
   - Save to `{output_folder}/traceability-matrix.md`

2. Generate gate YAML snippet (if enabled):

   ```yaml
   traceability:
     story_id: '1.3'
     coverage:
       overall: 85%
       p0: 100%
       p1: 90%
       p2: 75%
     gaps:
       critical: 0
       high: 1
       medium: 2
     status: 'PASS' # or "FAIL" if P0 < 100%
   ```

3. Create coverage badge/metric (if enabled):
   - Generate badge markdown: `![Coverage](https://img.shields.io/badge/coverage-85%25-green)`
   - Export metrics to JSON for CI/CD integration

4. Update story file (if enabled):
   - Add "Traceability" section to story markdown
   - Link to traceability matrix
   - Include coverage summary
   - Add gate status

**Output:** Complete Phase 1 traceability deliverables

**Next:** If `enable_gate_decision: true`, proceed to Phase 2. Otherwise, workflow complete.

---
