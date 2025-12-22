# Step 5: Execute, Validate & Heal Generated Tests (NEW - Phase 2.5)

**Purpose**: Automatically validate generated tests and heal common failures before delivery

## Actions

1. **Validate Generated Tests**

   Always validate (auto_validate is always true):
   - Run generated tests to verify they work
   - Continue with healing if config.tea_use_mcp_enhancements is true

2. **Run Generated Tests**

   Execute the full test suite that was just generated:

   ```bash
   npx playwright test {generated_test_files}
   ```

   Capture results:
   - Total tests run
   - Passing tests count
   - Failing tests count
   - Error messages and stack traces for failures

3. **Evaluate Results**

   **If ALL tests pass:**
   - ✅ Generate report with success summary
   - Proceed to Step 6 (Documentation and Scripts)

   **If tests FAIL:**
   - Check config.tea_use_mcp_enhancements setting
   - If true: Enter healing loop (Step 5.4)
   - If false: Document failures for manual review, proceed to Step 6

4. **Healing Loop (If config.tea_use_mcp_enhancements is true)**

   **Iteration limit**: 3 attempts per test (constant)

   **For each failing test:**

   **A. Load Healing Knowledge Fragments**

   Consult `tea-index.csv` to load healing patterns:
   - `test-healing-patterns.md` - Common failure patterns and fixes
   - `selector-resilience.md` - Selector debugging and refactoring
   - `timing-debugging.md` - Race condition identification and fixes

   **B. Identify Failure Pattern**

   Analyze error message and stack trace to classify failure type:

   **Stale Selector Failure:**
   - Error contains: "locator resolved to 0 elements", "element not found", "unable to find element"
   - Extract selector from error message
   - Apply selector healing (knowledge from `selector-resilience.md`):
     - If CSS class → Replace with `page.getByTestId()`
     - If nth() → Replace with `filter({ hasText })`
     - If ID → Replace with data-testid
     - If complex XPath → Replace with ARIA role

   **Race Condition Failure:**
   - Error contains: "timeout waiting for", "element not visible", "timed out retrying"
   - Detect missing network waits or hard waits in test code
   - Apply timing healing (knowledge from `timing-debugging.md`):
     - Add network-first interception before navigate
     - Replace `waitForTimeout()` with `waitForResponse()`
     - Add explicit element state waits (`waitFor({ state: 'visible' })`)

   **Dynamic Data Failure:**
   - Error contains: "Expected 'User 123' but received 'User 456'", timestamp mismatches
   - Identify hardcoded assertions
   - Apply data healing (knowledge from `test-healing-patterns.md`):
     - Replace hardcoded IDs with regex (`/User \d+/`)
     - Replace hardcoded dates with dynamic generation
     - Capture dynamic values and use in assertions

   **Network Error Failure:**
   - Error contains: "API call failed", "500 error", "network error"
   - Detect missing route interception
   - Apply network healing (knowledge from `test-healing-patterns.md`):
     - Add `page.route()` or `cy.intercept()` for API mocking
     - Mock error scenarios (500, 429, timeout)

   **Hard Wait Detection:**
   - Scan test code for `page.waitForTimeout()`, `cy.wait(number)`, `sleep()`
   - Apply hard wait healing (knowledge from `timing-debugging.md`):
     - Replace with event-based waits
     - Add network response waits
     - Use element state changes

   **C. MCP Healing Mode (If MCP Tools Available)**

   If Playwright MCP tools are available in your IDE:

   Use MCP tools for interactive healing:
   - `playwright_test_debug_test`: Pause on failure for visual inspection
   - `browser_snapshot`: Capture visual context at failure point
   - `browser_console_messages`: Retrieve console logs for JS errors
   - `browser_network_requests`: Analyze network activity
   - `browser_generate_locator`: Generate better selectors interactively

   Apply MCP-generated fixes to test code.

   **D. Pattern-Based Healing Mode (Fallback)**

   If MCP unavailable, use pattern-based analysis:
   - Parse error message and stack trace
   - Match against failure patterns from knowledge base
   - Apply fixes programmatically:
     - Selector fixes: Use suggestions from `selector-resilience.md`
     - Timing fixes: Apply patterns from `timing-debugging.md`
     - Data fixes: Use patterns from `test-healing-patterns.md`

   **E. Apply Healing Fix**
   - Modify test file with healed code
   - Re-run test to validate fix
   - If test passes: Mark as healed, move to next failure
   - If test fails: Increment iteration count, try different pattern

   **F. Iteration Limit Handling**

   After 3 failed healing attempts:

   Always mark unfixable tests:
   - Mark test with `test.fixme()` instead of `test()`
   - Add detailed comment explaining:
     - What failure occurred
     - What healing was attempted (3 iterations)
     - Why healing failed
     - Manual investigation needed

   ```typescript
   test.fixme('[P1] should handle complex interaction', async ({ page }) => {
     // FIXME: Test healing failed after 3 attempts
     // Failure: "Locator 'button[data-action="submit"]' resolved to 0 elements"
     // Attempted fixes:
     //   1. Replaced with page.getByTestId('submit-button') - still failing
     //   2. Replaced with page.getByRole('button', { name: 'Submit' }) - still failing
     //   3. Added waitForLoadState('networkidle') - still failing
     // Manual investigation needed: Selector may require application code changes
     // TODO: Review with team, may need data-testid added to button component
     // Original test code...
   });
   ```

   **Note**: Workflow continues even with unfixable tests (marked as test.fixme() for manual review)

5. **Generate Healing Report**

   Document healing outcomes:

   ```markdown
   ## Test Healing Report

   **Auto-Heal Enabled**: {auto_heal_failures}
   **Healing Mode**: {use_mcp_healing ? "MCP-assisted" : "Pattern-based"}
   **Iterations Allowed**: {max_healing_iterations}

   ### Validation Results

   - **Total tests**: {total_tests}
   - **Passing**: {passing_tests}
   - **Failing**: {failing_tests}

   ### Healing Outcomes

   **Successfully Healed ({healed_count} tests):**

   - `tests/e2e/login.spec.ts:15` - Stale selector (CSS class → data-testid)
   - `tests/e2e/checkout.spec.ts:42` - Race condition (added network-first interception)
   - `tests/api/users.spec.ts:28` - Dynamic data (hardcoded ID → regex pattern)

   **Unable to Heal ({unfixable_count} tests):**

   - `tests/e2e/complex-flow.spec.ts:67` - Marked as test.fixme() with manual investigation needed
     - Failure: Locator not found after 3 healing attempts
     - Requires application code changes (add data-testid to component)

   ### Healing Patterns Applied

   - **Selector fixes**: 2 (CSS class → data-testid, nth() → filter())
   - **Timing fixes**: 1 (added network-first interception)
   - **Data fixes**: 1 (hardcoded ID → regex)

   ### Knowledge Base References

   - `test-healing-patterns.md` - Common failure patterns
   - `selector-resilience.md` - Selector refactoring guide
   - `timing-debugging.md` - Race condition prevention
   ```

6. **Update Test Files with Healing Results**
   - Save healed test code to files
   - Mark unfixable tests with `test.fixme()` and detailed comments
   - Preserve original test logic in comments (for debugging)

---
