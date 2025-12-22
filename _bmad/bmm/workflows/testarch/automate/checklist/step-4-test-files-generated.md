# Step 4: Test Files Generated

## Test File Structure

- [ ] Test files organized correctly:
  - [ ] `tests/e2e/` for E2E tests
  - [ ] `tests/api/` for API tests
  - [ ] `tests/component/` for component tests
  - [ ] `tests/unit/` for unit tests
  - [ ] `tests/support/` for fixtures/factories/helpers

## E2E Tests (If Applicable)

- [ ] E2E test files created in `tests/e2e/`
- [ ] All tests follow Given-When-Then format
- [ ] All tests have priority tags ([P0], [P1], [P2], [P3]) in test name
- [ ] All tests use data-testid selectors (not CSS classes)
- [ ] One assertion per test (atomic design)
- [ ] No hard waits or sleeps (explicit waits only)
- [ ] Network-first pattern applied (route interception BEFORE navigation)
- [ ] Clear Given-When-Then comments in test code

## API Tests (If Applicable)

- [ ] API test files created in `tests/api/`
- [ ] All tests follow Given-When-Then format
- [ ] All tests have priority tags in test name
- [ ] API contracts validated (request/response structure)
- [ ] HTTP status codes verified
- [ ] Response body validation includes required fields
- [ ] Error cases tested (400, 401, 403, 404, 500)
- [ ] JWT token format validated (if auth tests)

## Component Tests (If Applicable)

- [ ] Component test files created in `tests/component/`
- [ ] All tests follow Given-When-Then format
- [ ] All tests have priority tags in test name
- [ ] Component mounting works correctly
- [ ] Interaction testing covers user actions (click, hover, keyboard)
- [ ] State management validated
- [ ] Props and events tested

## Unit Tests (If Applicable)

- [ ] Unit test files created in `tests/unit/`
- [ ] All tests follow Given-When-Then format
- [ ] All tests have priority tags in test name
- [ ] Pure logic tested (no dependencies)
- [ ] Edge cases covered
- [ ] Error handling tested

## Quality Standards Enforced

- [ ] All tests use Given-When-Then format with clear comments
- [ ] All tests have descriptive names with priority tags
- [ ] No duplicate tests (same behavior tested multiple times)
- [ ] No flaky patterns (race conditions, timing issues)
- [ ] No test interdependencies (tests can run in any order)
- [ ] Tests are deterministic (same input always produces same result)
- [ ] All tests use data-testid selectors (E2E tests)
- [ ] No hard waits: `await page.waitForTimeout()` (forbidden)
- [ ] No conditional flow: `if (await element.isVisible())` (forbidden)
- [ ] No try-catch for test logic (only for cleanup)
- [ ] No hardcoded test data (use factories with faker)
- [ ] No page object classes (tests are direct and simple)
- [ ] No shared state between tests

## Network-First Pattern Applied

- [ ] Route interception set up BEFORE navigation (E2E tests with network requests)
- [ ] `page.route()` called before `page.goto()` to prevent race conditions
- [ ] Network-first pattern verified in all E2E tests that make API calls

---
