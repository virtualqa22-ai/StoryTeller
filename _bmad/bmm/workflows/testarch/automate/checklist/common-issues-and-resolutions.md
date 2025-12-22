# Common Issues and Resolutions

## Issue: BMad artifacts not found

**Problem:** Story, tech-spec, or PRD files not found when variables are set.

**Resolution:**

- **automate does NOT require BMad artifacts** - they are OPTIONAL enhancements
- If files not found, switch to Standalone Mode automatically
- Analyze source code directly without BMad context
- Continue workflow without halting

## Issue: Framework configuration not found

**Problem:** No playwright.config.ts or cypress.config.ts found.

**Resolution:**

- **HALT workflow** - framework is required
- Message: "Framework scaffolding required. Run `bmad tea *framework` first."
- User must run framework workflow before automate

## Issue: No automation targets identified

**Problem:** Neither story, target_feature, nor target_files specified, and auto-discover finds nothing.

**Resolution:**

- Check if source_dir variable is correct
- Verify source code exists in project
- Ask user to specify target_feature or target_files explicitly
- Provide examples: `target_feature: "src/auth/"` or `target_files: "src/auth/login.ts,src/auth/session.ts"`

## Issue: Duplicate coverage detected

**Problem:** Same behavior tested at multiple levels (E2E + API + Component).

**Resolution:**

- Review test level selection framework (test-levels-framework.md)
- Use E2E for critical happy path ONLY
- Use API for business logic variations
- Use Component for UI edge cases
- Remove redundant tests that duplicate coverage

## Issue: Tests have hardcoded data

**Problem:** Tests use hardcoded email addresses, passwords, or other data.

**Resolution:**

- Replace all hardcoded data with factory function calls
- Use faker for all random data generation
- Update data-factories to support all required test scenarios
- Example: `createUser({ email: faker.internet.email() })`

## Issue: Tests are flaky

**Problem:** Tests fail intermittently, pass on retry.

**Resolution:**

- Remove all hard waits (`page.waitForTimeout()`)
- Use explicit waits (`page.waitForSelector()`)
- Apply network-first pattern (route interception before navigation)
- Remove conditional flow (`if (await element.isVisible())`)
- Ensure tests are deterministic (no race conditions)
- Run burn-in loop (10 iterations) to detect flakiness

## Issue: Fixtures don't clean up data

**Problem:** Test data persists after test run, causing test pollution.

**Resolution:**

- Ensure all fixtures have cleanup in teardown phase
- Cleanup happens AFTER `await use(data)`
- Call deletion/cleanup functions (deleteUser, deleteProduct, etc.)
- Verify cleanup works by checking database/storage after test run

## Issue: Tests too slow

**Problem:** Tests take longer than 90 seconds (max_test_duration).

**Resolution:**

- Remove unnecessary waits and delays
- Use parallel execution where possible
- Mock external services (don't make real API calls)
- Use API tests instead of E2E for business logic
- Optimize test data creation (use in-memory database, etc.)

---
