# Step 2: Automation Targets Identification

## Target Determination

**BMad-Integrated Mode (if story available):**

- [ ] Acceptance criteria mapped to test scenarios
- [ ] Features implemented in story identified
- [ ] Existing ATDD tests checked (if any)
- [ ] Expansion beyond ATDD planned (edge cases, negative paths)

**Standalone Mode (if no story):**

- [ ] Specific feature analyzed (if `{target_feature}` specified)
- [ ] Specific files analyzed (if `{target_files}` specified)
- [ ] Features auto-discovered (if `{auto_discover_features}` true)
- [ ] Features prioritized by:
  - [ ] No test coverage (highest priority)
  - [ ] Complex business logic
  - [ ] External integrations (API, database, auth)
  - [ ] Critical user paths (login, checkout, etc.)

## Test Level Selection

- [ ] Test level selection framework applied (from `test-levels-framework.md`)
- [ ] E2E tests identified: Critical user journeys, multi-system integration
- [ ] API tests identified: Business logic, service contracts, data transformations
- [ ] Component tests identified: UI behavior, interactions, state management
- [ ] Unit tests identified: Pure logic, edge cases, error handling

## Duplicate Coverage Avoidance

- [ ] Same behavior NOT tested at multiple levels unnecessarily
- [ ] E2E used for critical happy path only
- [ ] API tests used for business logic variations
- [ ] Component tests used for UI interaction edge cases
- [ ] Unit tests used for pure logic edge cases

## Priority Assignment

- [ ] Test priorities assigned using `test-priorities.md` framework
- [ ] P0 tests: Critical paths, security-critical, data integrity
- [ ] P1 tests: Important features, integration points, error handling
- [ ] P2 tests: Edge cases, less-critical variations, performance
- [ ] P3 tests: Nice-to-have, rarely-used features, exploratory
- [ ] Priority variables respected:
  - [ ] `{include_p0}` = true (always include)
  - [ ] `{include_p1}` = true (high priority)
  - [ ] `{include_p2}` = true (medium priority)
  - [ ] `{include_p3}` = false (low priority, skip by default)

## Coverage Plan Created

- [ ] Test coverage plan documented
- [ ] What will be tested at each level listed
- [ ] Priorities assigned to each test
- [ ] Coverage strategy clear (critical-paths, comprehensive, or selective)

---
