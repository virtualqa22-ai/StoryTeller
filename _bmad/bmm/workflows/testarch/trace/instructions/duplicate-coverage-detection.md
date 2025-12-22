# Duplicate Coverage Detection

Use selective testing principles from `selective-testing.md`:

**Acceptable Overlap:**

- Unit tests for business logic + E2E tests for user journey (different aspects)
- API tests for contract + E2E tests for full workflow (defense in depth for critical paths)

**Unacceptable Duplication:**

- Same validation at multiple levels (e.g., E2E testing math logic better suited for unit tests)
- Multiple E2E tests covering identical user path
- Component tests duplicating unit test logic

**Recommendation Pattern:**

- Test logic at unit level
- Test integration at API/Component level
- Test user experience at E2E level
- Avoid testing framework behavior at any level

---
