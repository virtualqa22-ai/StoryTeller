# Workflow Steps

## Step 1: Load Context and Knowledge Base

**Actions:**

1. Check playwright-utils flag:
   - Read `{config_source}` and check `config.tea_use_playwright_utils`

2. Load relevant knowledge fragments from `{project-root}/_bmad/bmm/testarch/tea-index.csv`:

   **Core Patterns (Always load):**
   - `test-quality.md` - Definition of Done (deterministic tests, isolated with cleanup, explicit assertions, <300 lines, <1.5 min, 658 lines, 5 examples)
   - `data-factories.md` - Factory functions with faker: overrides, nested factories, API-first setup (498 lines, 5 examples)
   - `test-levels-framework.md` - E2E vs API vs Component vs Unit appropriateness with decision matrix (467 lines, 4 examples)
   - `selective-testing.md` - Duplicate coverage detection with tag-based, spec filter, diff-based selection (727 lines, 4 examples)
   - `test-healing-patterns.md` - Common failure patterns: stale selectors, race conditions, dynamic data, network errors, hard waits (648 lines, 5 examples)
   - `selector-resilience.md` - Selector best practices (data-testid > ARIA > text > CSS hierarchy, anti-patterns, 541 lines, 4 examples)
   - `timing-debugging.md` - Race condition prevention and async debugging techniques (370 lines, 3 examples)

   **If `config.tea_use_playwright_utils: true` (All Utilities):**
   - `overview.md` - Playwright utils best practices
   - `api-request.md` - Validate apiRequest usage patterns
   - `network-recorder.md` - Review HAR record/playback implementation
   - `auth-session.md` - Check auth token management
   - `intercept-network-call.md` - Validate network interception
   - `recurse.md` - Review polling patterns
   - `log.md` - Check logging best practices
   - `file-utils.md` - Validate file operation patterns
   - `burn-in.md` - Review burn-in configuration
   - `network-error-monitor.md` - Check error monitoring setup
   - `fixtures-composition.md` - Validate mergeTests usage

   **If `config.tea_use_playwright_utils: false`:**
   - `fixture-architecture.md` - Pure function → Fixture → mergeTests composition with auto-cleanup (406 lines, 5 examples)
   - `network-first.md` - Route intercept before navigate to prevent race conditions (489 lines, 5 examples)
   - `playwright-config.md` - Environment-based configuration with fail-fast validation (722 lines, 5 examples)
   - `component-tdd.md` - Red-Green-Refactor patterns with provider isolation (480 lines, 4 examples)
   - `ci-burn-in.md` - Flaky test detection with 10-iteration burn-in loop (678 lines, 4 examples)

3. Determine review scope:
   - **single**: Review one test file (`test_file_path` provided)
   - **directory**: Review all tests in directory (`test_dir` provided)
   - **suite**: Review entire test suite (discover all test files)

4. Auto-discover related artifacts (if `auto_discover_story: true`):
   - Extract test ID from filename (e.g., `1.3-E2E-001.spec.ts` → story 1.3)
   - Search for story file (`story-1.3.md`)
   - Search for test design (`test-design-story-1.3.md` or `test-design-epic-1.md`)

5. Read story file for context (if available):
   - Extract acceptance criteria
   - Extract priority classification
   - Extract expected test IDs

**Output:** Complete knowledge base loaded, review scope determined, context gathered

---

## Step 2: Discover and Parse Test Files

**Actions:**

1. **Discover test files** based on scope:
   - **single**: Use `test_file_path` variable
   - **directory**: Use `glob` to find all test files in `test_dir` (e.g., `*.spec.ts`, `*.test.js`)
   - **suite**: Use `glob` to find all test files recursively from project root

2. **Parse test file metadata**:
   - File path and name
   - File size (warn if >15 KB or >300 lines)
   - Test framework detected (Playwright, Jest, Cypress, Vitest, etc.)
   - Imports and dependencies
   - Test structure (describe/context/it blocks)

3. **Extract test structure**:
   - Count of describe blocks (test suites)
   - Count of it/test blocks (individual tests)
   - Test IDs (if present, e.g., `test.describe('1.3-E2E-001')`)
   - Priority markers (if present, e.g., `test.describe.only` for P0)
   - BDD structure (Given-When-Then comments or steps)

4. **Identify test patterns**:
   - Fixtures used
   - Data factories used
   - Network interception patterns
   - Assertions used (expect, assert, toHaveText, etc.)
   - Waits and timeouts (page.waitFor, sleep, hardcoded delays)
   - Conditionals (if/else, switch, ternary)
   - Try/catch blocks
   - Shared state or globals

**Output:** Complete test file inventory with structure and pattern analysis

---

## Step 3: Validate Against Quality Criteria

**Actions:**

For each test file, validate against quality criteria (configurable via workflow variables):

### 1. BDD Format Validation (if `check_given_when_then: true`)

- ✅ **PASS**: Tests use Given-When-Then structure (comments or step organization)
- ⚠️ **WARN**: Tests have some structure but not explicit GWT
- ❌ **FAIL**: Tests lack clear structure, hard to understand intent

**Knowledge Fragment**: test-quality.md, tdd-cycles.md

---

### 2. Test ID Conventions (if `check_test_ids: true`)

- ✅ **PASS**: Test IDs present and follow convention (e.g., `1.3-E2E-001`, `2.1-API-005`)
- ⚠️ **WARN**: Some test IDs missing or inconsistent
- ❌ **FAIL**: No test IDs, can't trace tests to requirements

**Knowledge Fragment**: traceability.md, test-quality.md

---

### 3. Priority Markers (if `check_priority_markers: true`)

- ✅ **PASS**: Tests classified as P0/P1/P2/P3 (via markers or test-design reference)
- ⚠️ **WARN**: Some priority classifications missing
- ❌ **FAIL**: No priority classification, can't determine criticality

**Knowledge Fragment**: test-priorities.md, risk-governance.md

---

### 4. Hard Waits Detection (if `check_hard_waits: true`)

- ✅ **PASS**: No hard waits detected (no `sleep()`, `wait(5000)`, hardcoded delays)
- ⚠️ **WARN**: Some hard waits used but with justification comments
- ❌ **FAIL**: Hard waits detected without justification (flakiness risk)

**Patterns to detect:**

- `sleep(1000)`, `setTimeout()`, `delay()`
- `page.waitForTimeout(5000)` without explicit reason
- `await new Promise(resolve => setTimeout(resolve, 3000))`

**Knowledge Fragment**: test-quality.md, network-first.md

---

### 5. Determinism Check (if `check_determinism: true`)

- ✅ **PASS**: Tests are deterministic (no conditionals, no try/catch abuse, no random values)
- ⚠️ **WARN**: Some conditionals but with clear justification
- ❌ **FAIL**: Tests use if/else, switch, or try/catch to control flow (flakiness risk)

**Patterns to detect:**

- `if (condition) { test logic }` - tests should work deterministically
- `try { test } catch { fallback }` - tests shouldn't swallow errors
- `Math.random()`, `Date.now()` without factory abstraction

**Knowledge Fragment**: test-quality.md, data-factories.md

---

### 6. Isolation Validation (if `check_isolation: true`)

- ✅ **PASS**: Tests clean up resources, no shared state, can run in any order
- ⚠️ **WARN**: Some cleanup missing but isolated enough
- ❌ **FAIL**: Tests share state, depend on execution order, leave resources

**Patterns to check:**

- afterEach/afterAll cleanup hooks present
- No global variables mutated
- Database/API state cleaned up after tests
- Test data deleted or marked inactive

**Knowledge Fragment**: test-quality.md, data-factories.md

---

### 7. Fixture Patterns (if `check_fixture_patterns: true`)

- ✅ **PASS**: Uses pure function → Fixture → mergeTests pattern
- ⚠️ **WARN**: Some fixtures used but not consistently
- ❌ **FAIL**: No fixtures, tests repeat setup code (maintainability risk)

**Patterns to check:**

- Fixtures defined (e.g., `test.extend({ customFixture: async ({}, use) => { ... }})`)
- Pure functions used for fixture logic
- mergeTests used to combine fixtures
- No beforeEach with complex setup (should be in fixtures)

**Knowledge Fragment**: fixture-architecture.md

---

### 8. Data Factories (if `check_data_factories: true`)

- ✅ **PASS**: Uses factory functions with overrides, API-first setup
- ⚠️ **WARN**: Some factories used but also hardcoded data
- ❌ **FAIL**: Hardcoded test data, magic strings/numbers (maintainability risk)

**Patterns to check:**

- Factory functions defined (e.g., `createUser()`, `generateInvoice()`)
- Factories use faker.js or similar for realistic data
- Factories accept overrides (e.g., `createUser({ email: 'custom@example.com' })`)
- API-first setup (create via API, test via UI)

**Knowledge Fragment**: data-factories.md

---

### 9. Network-First Pattern (if `check_network_first: true`)

- ✅ **PASS**: Route interception set up BEFORE navigation (race condition prevention)
- ⚠️ **WARN**: Some routes intercepted correctly, others after navigation
- ❌ **FAIL**: Route interception after navigation (race condition risk)

**Patterns to check:**

- `page.route()` called before `page.goto()`
- `page.waitForResponse()` used with explicit URL pattern
- No navigation followed immediately by route setup

**Knowledge Fragment**: network-first.md

---

### 10. Assertions (if `check_assertions: true`)

- ✅ **PASS**: Explicit assertions present (expect, assert, toHaveText)
- ⚠️ **WARN**: Some tests rely on implicit waits instead of assertions
- ❌ **FAIL**: Missing assertions, tests don't verify behavior

**Patterns to check:**

- Each test has at least one assertion
- Assertions are specific (not just truthy checks)
- Assertions use framework-provided matchers (toHaveText, toBeVisible)

**Knowledge Fragment**: test-quality.md

---

### 11. Test Length (if `check_test_length: true`)

- ✅ **PASS**: Test file ≤200 lines (ideal), ≤300 lines (acceptable)
- ⚠️ **WARN**: Test file 301-500 lines (consider splitting)
- ❌ **FAIL**: Test file >500 lines (too large, maintainability risk)

**Knowledge Fragment**: test-quality.md

---

### 12. Test Duration (if `check_test_duration: true`)

- ✅ **PASS**: Individual tests ≤1.5 minutes (target: <30 seconds)
- ⚠️ **WARN**: Some tests 1.5-3 minutes (consider optimization)
- ❌ **FAIL**: Tests >3 minutes (too slow, impacts CI/CD)

**Note:** Duration estimation based on complexity analysis if execution data unavailable

**Knowledge Fragment**: test-quality.md, selective-testing.md

---

### 13. Flakiness Patterns (if `check_flakiness_patterns: true`)

- ✅ **PASS**: No known flaky patterns detected
- ⚠️ **WARN**: Some potential flaky patterns (e.g., tight timeouts, race conditions)
- ❌ **FAIL**: Multiple flaky patterns detected (high flakiness risk)

**Patterns to detect:**

- Tight timeouts (e.g., `{ timeout: 1000 }`)
- Race conditions (navigation before route interception)
- Timing-dependent assertions (e.g., checking timestamps)
- Retry logic in tests (hides flakiness)
- Environment-dependent assumptions (hardcoded URLs, ports)

**Knowledge Fragment**: test-quality.md, network-first.md, ci-burn-in.md

---

## Step 4: Calculate Quality Score

**Actions:**

1. **Count violations** by severity:
   - **Critical (P0)**: Hard waits without justification, no assertions, race conditions, shared state
   - **High (P1)**: Missing test IDs, no BDD structure, hardcoded data, missing fixtures
   - **Medium (P2)**: Long test files (>300 lines), missing priorities, some conditionals
   - **Low (P3)**: Minor style issues, incomplete cleanup, verbose tests

2. **Calculate quality score** (if `quality_score_enabled: true`):

```
Starting Score: 100

Critical Violations: -10 points each
High Violations: -5 points each
Medium Violations: -2 points each
Low Violations: -1 point each

Bonus Points:
+ Excellent BDD structure: +5
+ Comprehensive fixtures: +5
+ Comprehensive data factories: +5
+ Network-first pattern: +5
+ Perfect isolation: +5
+ All test IDs present: +5

Quality Score: max(0, min(100, Starting Score - Violations + Bonus))
```

3. **Quality Grade**:
   - **90-100**: Excellent (A+)
   - **80-89**: Good (A)
   - **70-79**: Acceptable (B)
   - **60-69**: Needs Improvement (C)
   - **<60**: Critical Issues (F)

**Output:** Quality score calculated with violation breakdown

---

## Step 5: Generate Review Report

**Actions:**

1. **Create review report** using `test-review-template.md`:

   **Header Section:**
   - Test file(s) reviewed
   - Review date
   - Review scope (single/directory/suite)
   - Quality score and grade

   **Executive Summary:**
   - Overall assessment (Excellent/Good/Needs Improvement/Critical)
   - Key strengths
   - Key weaknesses
   - Recommendation (Approve/Approve with comments/Request changes)

   **Quality Criteria Assessment:**
   - Table with all criteria evaluated
   - Status for each (PASS/WARN/FAIL)
   - Violation count per criterion

   **Critical Issues (Must Fix):**
   - Priority P0/P1 violations
   - Code location (file:line)
   - Explanation of issue
   - Recommended fix
   - Knowledge base reference

   **Recommendations (Should Fix):**
   - Priority P2/P3 violations
   - Code location (file:line)
   - Explanation of issue
   - Recommended improvement
   - Knowledge base reference

   **Best Practices Examples:**
   - Highlight good patterns found in tests
   - Reference knowledge base fragments
   - Provide examples for others to follow

   **Knowledge Base References:**
   - List all fragments consulted
   - Provide links to detailed guidance

2. **Generate inline comments** (if `generate_inline_comments: true`):
   - Add TODO comments in test files at violation locations
   - Format: `// TODO (TEA Review): [Issue description] - See test-review-{filename}.md`
   - Never modify test logic, only add comments

3. **Generate quality badge** (if `generate_quality_badge: true`):
   - Create badge with quality score (e.g., "Test Quality: 87/100 (A)")
   - Format for inclusion in README or documentation

4. **Append to story file** (if `append_to_story: true` and story file exists):
   - Add "Test Quality Review" section to story
   - Include quality score and critical issues
   - Link to full review report

**Output:** Comprehensive review report with actionable feedback

---

## Step 6: Save Outputs and Notify

**Actions:**

1. **Save review report** to `{output_file}`
2. **Save inline comments** to test files (if enabled)
3. **Save quality badge** to output folder (if enabled)
4. **Update story file** (if enabled)
5. **Generate summary message** for user:
   - Quality score and grade
   - Critical issue count
   - Recommendation

**Output:** All review artifacts saved and user notified

---
