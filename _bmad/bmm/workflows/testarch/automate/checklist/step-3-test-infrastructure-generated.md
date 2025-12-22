# Step 3: Test Infrastructure Generated

## Fixture Architecture

- [ ] Existing fixtures checked in `tests/support/fixtures/`
- [ ] Fixture architecture created/enhanced (if `{generate_fixtures}` true)
- [ ] All fixtures use Playwright's `test.extend()` pattern
- [ ] All fixtures have auto-cleanup in teardown
- [ ] Common fixtures created/enhanced:
  - [ ] authenticatedUser (with auto-delete)
  - [ ] apiRequest (authenticated client)
  - [ ] mockNetwork (external service mocking)
  - [ ] testDatabase (with auto-cleanup)

## Data Factories

- [ ] Existing factories checked in `tests/support/factories/`
- [ ] Factory architecture created/enhanced (if `{generate_factories}` true)
- [ ] All factories use `@faker-js/faker` for random data (no hardcoded values)
- [ ] All factories support overrides for specific scenarios
- [ ] Common factories created/enhanced:
  - [ ] User factory (email, password, name, role)
  - [ ] Product factory (name, price, SKU)
  - [ ] Order factory (items, total, status)
- [ ] Cleanup helpers provided (e.g., deleteUser(), deleteProduct())

## Helper Utilities

- [ ] Existing helpers checked in `tests/support/helpers/` (if `{update_helpers}` true)
- [ ] Common utilities created/enhanced:
  - [ ] waitFor (polling for complex conditions)
  - [ ] retry (retry helper for flaky operations)
  - [ ] testData (test data generation)
  - [ ] assertions (custom assertion helpers)

---
