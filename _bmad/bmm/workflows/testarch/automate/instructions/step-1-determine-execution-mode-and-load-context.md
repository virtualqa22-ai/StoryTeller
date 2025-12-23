# Step 1: Determine Execution Mode and Load Context

## Actions

1. **Detect Execution Mode**

   Check if BMad artifacts are available:
   - If `{story_file}` variable is set → BMad-Integrated Mode
   - If `{target_feature}` or `{target_files}` set → Standalone Mode
   - If neither set → Auto-discover mode (scan codebase for features needing tests)

2. **Load BMad Artifacts (If Available)**

   **BMad-Integrated Mode:**
   - Read story markdown from `{story_file}`
   - Extract acceptance criteria and technical requirements
   - Load tech-spec.md if `{use_tech_spec}` is true
   - Load test-design.md if `{use_test_design}` is true
   - Load PRD.md if `{use_prd}` is true
   - Note: These are **optional enhancements**, not hard requirements

   **Standalone Mode:**
   - Skip BMad artifact loading
   - Proceed directly to source code analysis

3. **Load Framework Configuration**
   - Read test framework config (playwright.config.ts or cypress.config.ts)
   - Identify test directory structure from `{test_dir}`
   - Check existing test patterns in `{test_dir}`
   - Note test runner capabilities (parallel execution, fixtures, etc.)

4. **Analyze Existing Test Coverage**

   If `{analyze_coverage}` is true:
   - Search `{test_dir}` for existing test files
   - Identify tested features vs untested features
   - Map tests to source files (coverage gaps)
   - Check existing fixture and factory patterns

5. **Check Playwright Utils Flag**

   Read `{config_source}` and check `config.tea_use_playwright_utils`.

6. **Load Knowledge Base Fragments**

   **Critical:** Consult `{project-root}/_bmad/bmm/testarch/tea-index.csv` to load:

   **Core Testing Patterns (Always load):**
   - `test-levels-framework.md` - Test level selection (E2E vs API vs Component vs Unit with decision matrix, 467 lines, 4 examples)
   - `test-priorities-matrix.md` - Priority classification (P0-P3 with automated scoring, risk mapping, 389 lines, 2 examples)
   - `data-factories.md` - Factory patterns with faker (overrides, nested factories, API seeding, 498 lines, 5 examples)
   - `selective-testing.md` - Targeted test execution strategies (tag-based, spec filters, diff-based, promotion rules, 727 lines, 4 examples)
   - `ci-burn-in.md` - Flaky test detection patterns (10-iteration burn-in, sharding, selective execution, 678 lines, 4 examples)
   - `test-quality.md` - Test design principles (deterministic, isolated, explicit assertions, length/time limits, 658 lines, 5 examples)

   **If `config.tea_use_playwright_utils: true` (Playwright Utils Integration - All Utilities):**
   - `overview.md` - Playwright utils installation, design principles, fixture patterns
   - `api-request.md` - Typed HTTP client with schema validation
   - `network-recorder.md` - HAR record/playback for offline testing
   - `auth-session.md` - Token persistence and multi-user support
   - `intercept-network-call.md` - Network spy/stub with automatic JSON parsing
   - `recurse.md` - Cypress-style polling for async conditions
   - `log.md` - Playwright report-integrated logging
   - `file-utils.md` - CSV/XLSX/PDF/ZIP reading and validation
   - `burn-in.md` - Smart test selection (relevant for CI test generation)
   - `network-error-monitor.md` - Automatic HTTP error detection
   - `fixtures-composition.md` - mergeTests composition patterns

   **If `config.tea_use_playwright_utils: false` (Traditional Patterns):**
   - `fixture-architecture.md` - Test fixture patterns (pure function → fixture → mergeTests, auto-cleanup, 406 lines, 5 examples)
   - `network-first.md` - Route interception patterns (intercept before navigate, HAR capture, deterministic waiting, 489 lines, 5 examples)

   **Healing Knowledge (If `{auto_heal_failures}` is true):**
   - `test-healing-patterns.md` - Common failure patterns and automated fixes (stale selectors, race conditions, dynamic data, network errors, hard waits, 648 lines, 5 examples)
   - `selector-resilience/index.md` - Selector debugging and refactoring guide (data-testid > ARIA > text > CSS hierarchy, anti-patterns, 541 lines, 4 examples)
   - `timing-debugging.md` - Race condition identification and fixes (network-first, deterministic waiting, async debugging, 370 lines, 3 examples)

---
