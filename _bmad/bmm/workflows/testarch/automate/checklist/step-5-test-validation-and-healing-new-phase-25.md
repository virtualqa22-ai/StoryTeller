# Step 5: Test Validation and Healing (NEW - Phase 2.5)

## Healing Configuration

- [ ] Healing configuration checked:
  - [ ] `{auto_validate}` setting noted (default: true)
  - [ ] `{auto_heal_failures}` setting noted (default: false)
  - [ ] `{max_healing_iterations}` setting noted (default: 3)
  - [ ] `{use_mcp_healing}` setting noted (default: true)

## Healing Knowledge Fragments Loaded (If Healing Enabled)

- [ ] `test-healing-patterns.md` loaded (common failure patterns and fixes)
- [ ] `selector-resilience.md` loaded (selector refactoring guide)
- [ ] `timing-debugging.md` loaded (race condition fixes)

## Test Execution and Validation

- [ ] Generated tests executed (if `{auto_validate}` true)
- [ ] Test results captured:
  - [ ] Total tests run
  - [ ] Passing tests count
  - [ ] Failing tests count
  - [ ] Error messages and stack traces captured

## Healing Loop (If Enabled and Tests Failed)

- [ ] Healing loop entered (if `{auto_heal_failures}` true AND tests failed)
- [ ] For each failing test:
  - [ ] Failure pattern identified (selector, timing, data, network, hard wait)
  - [ ] Appropriate healing strategy applied:
    - [ ] Stale selector → Replaced with data-testid or ARIA role
    - [ ] Race condition → Added network-first interception or state waits
    - [ ] Dynamic data → Replaced hardcoded values with regex/dynamic generation
    - [ ] Network error → Added route mocking
    - [ ] Hard wait → Replaced with event-based wait
  - [ ] Healed test re-run to validate fix
  - [ ] Iteration count tracked (max 3 attempts)

## Unfixable Tests Handling

- [ ] Tests that couldn't be healed after 3 iterations marked with `test.fixme()` (if `{mark_unhealable_as_fixme}` true)
- [ ] Detailed comment added to test.fixme() tests:
  - [ ] What failure occurred
  - [ ] What healing was attempted (3 iterations)
  - [ ] Why healing failed
  - [ ] Manual investigation steps needed
- [ ] Original test logic preserved in comments

## Healing Report Generated

- [ ] Healing report generated (if healing attempted)
- [ ] Report includes:
  - [ ] Auto-heal enabled status
  - [ ] Healing mode (MCP-assisted or Pattern-based)
  - [ ] Iterations allowed (max_healing_iterations)
  - [ ] Validation results (total, passing, failing)
  - [ ] Successfully healed tests (count, file:line, fix applied)
  - [ ] Unable to heal tests (count, file:line, reason)
  - [ ] Healing patterns applied (selector fixes, timing fixes, data fixes)
  - [ ] Knowledge base references used

---
