# Step 6: Generate Automation Summary

## Actions

1. **Create Automation Summary Document**

   Save to `{output_summary}` with:

   **BMad-Integrated Mode:**

   ````markdown
   # Automation Summary - {feature_name}

   **Date:** {date}
   **Story:** {story_id}
   **Coverage Target:** {coverage_target}

   ## Tests Created

   ### E2E Tests (P0-P1)

   - `tests/e2e/user-authentication.spec.ts` (2 tests, 87 lines)
     - [P0] Login with valid credentials → Dashboard loads
     - [P1] Display error for invalid credentials

   ### API Tests (P1-P2)

   - `tests/api/auth.api.spec.ts` (3 tests, 102 lines)
     - [P1] POST /auth/login - valid credentials → 200 + token
     - [P1] POST /auth/login - invalid credentials → 401 + error
     - [P2] POST /auth/login - missing fields → 400 + validation

   ### Component Tests (P1)

   - `tests/component/LoginForm.test.tsx` (2 tests, 45 lines)
     - [P1] Empty fields → submit button disabled
     - [P1] Valid input → submit button enabled

   ## Infrastructure Created

   ### Fixtures

   - `tests/support/fixtures/auth.fixture.ts` - authenticatedUser with auto-cleanup

   ### Factories

   - `tests/support/factories/user.factory.ts` - createUser(), deleteUser()

   ### Helpers

   - `tests/support/helpers/wait-for.ts` - Polling helper for complex conditions

   ## Test Execution

   ```bash
   # Run all new tests
   npm run test:e2e

   # Run by priority
   npm run test:e2e:p0  # Critical paths only
   npm run test:e2e:p1  # P0 + P1 tests
   ```
   ````

   ## Coverage Analysis

   **Total Tests:** 7
   - P0: 1 test (critical path)
   - P1: 5 tests (high priority)
   - P2: 1 test (medium priority)

   **Test Levels:**
   - E2E: 2 tests (user journeys)
   - API: 3 tests (business logic)
   - Component: 2 tests (UI behavior)

   **Coverage Status:**
   - ✅ All acceptance criteria covered
   - ✅ Happy path covered (E2E + API)
   - ✅ Error cases covered (API)
   - ✅ UI validation covered (Component)
   - ⚠️ Edge case: Password reset flow not yet covered (future story)

   ## Definition of Done
   - [x] All tests follow Given-When-Then format
   - [x] All tests use data-testid selectors
   - [x] All tests have priority tags
   - [x] All tests are self-cleaning (fixtures with auto-cleanup)
   - [x] No hard waits or flaky patterns
   - [x] Test files under 300 lines
   - [x] All tests run under 1.5 minutes each
   - [x] README updated with test execution instructions
   - [x] package.json scripts updated

   ## Next Steps
   1. Review generated tests with team
   2. Run tests in CI pipeline: `npm run test:e2e`
   3. Integrate with quality gate: `bmad tea *gate`
   4. Monitor for flaky tests in burn-in loop

   ````

   **Standalone Mode:**
   ```markdown
   # Automation Summary - {target_feature}

   **Date:** {date}
   **Target:** {target_feature} (standalone analysis)
   **Coverage Target:** {coverage_target}

   ## Feature Analysis

   **Source Files Analyzed:**
   - `src/auth/login.ts` - Login logic and validation
   - `src/auth/session.ts` - Session management
   - `src/auth/validation.ts` - Email/password validation

   **Existing Coverage:**
   - E2E tests: 0 found
   - API tests: 0 found
   - Component tests: 0 found
   - Unit tests: 0 found

   **Coverage Gaps Identified:**
   - ❌ No E2E tests for login flow
   - ❌ No API tests for /auth/login endpoint
   - ❌ No component tests for LoginForm
   - ❌ No unit tests for validateEmail()

   ## Tests Created

   {Same structure as BMad-Integrated Mode}

   ## Recommendations

   1. **High Priority (P0-P1):**
      - Add E2E test for password reset flow
      - Add API tests for token refresh endpoint
      - Add component tests for logout button

   2. **Medium Priority (P2):**
      - Add unit tests for session timeout logic
      - Add E2E test for "remember me" functionality

   3. **Future Enhancements:**
      - Consider contract testing for auth API
      - Add visual regression tests for login page
      - Set up burn-in loop for flaky test detection

   ## Definition of Done

   {Same checklist as BMad-Integrated Mode}
   ````

2. **Provide Summary to User**

   Output concise summary:

   ```markdown
   ## Automation Complete

   **Coverage:** {total_tests} tests created across {test_levels} levels
   **Priority Breakdown:** P0: {p0_count}, P1: {p1_count}, P2: {p2_count}, P3: {p3_count}
   **Infrastructure:** {fixture_count} fixtures, {factory_count} factories
   **Output:** {output_summary}

   **Run tests:** `npm run test:e2e`
   **Next steps:** Review tests, run in CI, integrate with quality gate
   ```

---

# Important Notes

## Dual-Mode Operation

**BMad-Integrated Mode** (story available):

- Uses story acceptance criteria for coverage targeting
- Aligns with test-design risk/priority assessment
- Expands ATDD tests with edge cases and negative paths
- Updates BMad status tracking

**Standalone Mode** (no story):

- Analyzes source code independently
- Identifies coverage gaps automatically
- Generates tests based on code analysis
- Works with any project (BMad or non-BMad)

**Auto-discover Mode** (no targets specified):

- Scans codebase for features needing tests
- Prioritizes features with no coverage
- Generates comprehensive test plan

## Avoid Duplicate Coverage

**Critical principle:** Don't test same behavior at multiple levels

**Good coverage:**

- E2E: User can login → Dashboard loads (critical happy path)
- API: POST /auth/login returns correct status codes (variations)
- Component: LoginForm validates input (UI edge cases)

**Bad coverage (duplicate):**

- E2E: User can login → Dashboard loads
- E2E: User can login with different emails → Dashboard loads (unnecessary duplication)
- API: POST /auth/login returns 200 (already covered in E2E)

Use E2E sparingly for critical paths. Use API/Component for variations and edge cases.

## Priority Tagging

**Tag every test with priority in test name:**

```typescript
test('[P0] should login with valid credentials', async ({ page }) => { ... });
test('[P1] should display error for invalid credentials', async ({ page }) => { ... });
test('[P2] should remember login preference', async ({ page }) => { ... });
```

**Enables selective test execution:**

```bash