# Step 1: Load Story Context and Requirements

## Actions

1. **Read Story Markdown**
   - Load story file from `{story_file}` variable
   - Extract acceptance criteria (all testable requirements)
   - Identify affected systems and components
   - Note any technical constraints or dependencies

2. **Load Framework Configuration**
   - Read framework config (playwright.config.ts or cypress.config.ts)
   - Identify test directory structure
   - Check existing fixture patterns
   - Note test runner capabilities

3. **Load Existing Test Patterns**
   - Search `{test_dir}` for similar tests
   - Identify reusable fixtures and helpers
   - Check data factory patterns
   - Note naming conventions

4. **Check Playwright Utils Flag**

   Read `{config_source}` and check `config.tea_use_playwright_utils`.

5. **Load Knowledge Base Fragments**

   **Critical:** Consult `{project-root}/_bmad/bmm/testarch/tea-index.csv` to load:

   **Core Patterns (Always load):**
   - `data-factories.md` - Factory patterns using faker (override patterns, nested factories, API seeding, 498 lines, 5 examples)
   - `component-tdd.md` - Component test strategies (red-green-refactor, provider isolation, accessibility, visual regression, 480 lines, 4 examples)
   - `test-quality.md` - Test design principles (deterministic tests, isolated with cleanup, explicit assertions, length limits, execution time optimization, 658 lines, 5 examples)
   - `test-healing-patterns.md` - Common failure patterns and healing strategies (stale selectors, race conditions, dynamic data, network errors, hard waits, 648 lines, 5 examples)
   - `selector-resilience.md` - Selector best practices (data-testid > ARIA > text > CSS hierarchy, dynamic patterns, anti-patterns, 541 lines, 4 examples)
   - `timing-debugging.md` - Race condition prevention and async debugging (network-first, deterministic waiting, anti-patterns, 370 lines, 3 examples)

   **If `config.tea_use_playwright_utils: true` (All Utilities):**
   - `overview.md` - Playwright utils for ATDD patterns
   - `api-request.md` - API test examples with schema validation
   - `network-recorder.md` - HAR record/playback for UI acceptance tests
   - `auth-session.md` - Auth setup for acceptance tests
   - `intercept-network-call.md` - Network interception in ATDD scenarios
   - `recurse.md` - Polling for async acceptance criteria
   - `log.md` - Logging in ATDD tests
   - `file-utils.md` - File download validation in acceptance tests
   - `network-error-monitor.md` - Catch silent failures in ATDD
   - `fixtures-composition.md` - Composing utilities for ATDD

   **If `config.tea_use_playwright_utils: false`:**
   - `fixture-architecture.md` - Test fixture patterns with auto-cleanup (pure function → fixture → mergeTests composition, 406 lines, 5 examples)
   - `network-first.md` - Route interception patterns (intercept before navigate, HAR capture, deterministic waiting, 489 lines, 5 examples)

**Halt Condition:** If story has no acceptance criteria or framework is missing, HALT with message: "ATDD requires clear acceptance criteria and test framework setup"

---
