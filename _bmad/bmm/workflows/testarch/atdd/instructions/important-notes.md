# Important Notes

## Red-Green-Refactor Cycle

**RED Phase** (TEA responsibility):

- Write failing tests first
- Tests define expected behavior
- Tests must fail for right reason (missing implementation)

**GREEN Phase** (DEV responsibility):

- Implement minimal code to pass tests
- One test at a time
- Don't over-engineer

**REFACTOR Phase** (DEV responsibility):

- Improve code quality with confidence
- Tests provide safety net
- Extract duplications, optimize

## Given-When-Then Structure

**GIVEN** (Setup):

- Arrange test preconditions
- Create necessary data
- Navigate to starting point

**WHEN** (Action):

- Execute the behavior being tested
- Single action per test

**THEN** (Assertion):

- Verify expected outcome
- One assertion per test (atomic)

## Network-First Testing

**Critical pattern:**

```typescript
// ✅ CORRECT: Intercept BEFORE navigation
await page.route('**/api/data', handler);
await page.goto('/page');

// ❌ WRONG: Navigate then intercept (race condition)
await page.goto('/page');
await page.route('**/api/data', handler); // Too late!
```

## Data Factory Best Practices

**Use faker for all test data:**

```typescript
// ✅ CORRECT: Random data
email: faker.internet.email();

// ❌ WRONG: Hardcoded data (collisions, maintenance burden)
email: 'test@example.com';
```

**Auto-cleanup principle:**

- Every factory that creates data must provide cleanup
- Fixtures automatically cleanup in teardown
- No manual cleanup in test code

## One Assertion Per Test

**Atomic test design:**

```typescript
// ✅ CORRECT: One assertion
test('should display user name', async ({ page }) => {
  await expect(page.locator('[data-testid="user-name"]')).toHaveText('John');
});

// ❌ WRONG: Multiple assertions (not atomic)
test('should display user info', async ({ page }) => {
  await expect(page.locator('[data-testid="user-name"]')).toHaveText('John');
  await expect(page.locator('[data-testid="user-email"]')).toHaveText('john@example.com');
});
```

**Why?** If second assertion fails, you don't know if first is still valid.

## Component Test Strategy

**When to use component tests:**

- Complex UI interactions (drag-drop, keyboard nav)
- Form validation logic
- State management within component
- Visual edge cases

**When NOT to use:**

- Simple rendering (snapshot tests are sufficient)
- Integration with backend (use E2E or API tests)
- Full user journeys (use E2E tests)

## Knowledge Base Integration

**Core Fragments (Auto-loaded in Step 1):**

- `fixture-architecture.md` - Pure function → fixture → mergeTests patterns (406 lines, 5 examples)
- `data-factories.md` - Factory patterns with faker, overrides, API seeding (498 lines, 5 examples)
- `component-tdd.md` - Red-green-refactor, provider isolation, accessibility, visual regression (480 lines, 4 examples)
- `network-first.md` - Intercept before navigate, HAR capture, deterministic waiting (489 lines, 5 examples)
- `test-quality.md` - Deterministic tests, cleanup, explicit assertions, length/time limits (658 lines, 5 examples)
- `test-healing-patterns.md` - Common failure patterns: stale selectors, race conditions, dynamic data, network errors, hard waits (648 lines, 5 examples)
- `selector-resilience.md` - Selector hierarchy (data-testid > ARIA > text > CSS), dynamic patterns, anti-patterns (541 lines, 4 examples)
- `timing-debugging.md` - Race condition prevention, deterministic waiting, async debugging (370 lines, 3 examples)

**Reference for Test Level Selection:**

- `test-levels-framework.md` - E2E vs API vs Component vs Unit decision framework (467 lines, 4 examples)

**Manual Reference (Optional):**

- Use `tea-index.csv` to find additional specialized fragments as needed

---
