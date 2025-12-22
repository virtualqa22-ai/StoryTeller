# Step 2: Select Test Levels and Strategy

## Actions

1. **Analyze Acceptance Criteria**

   For each acceptance criterion, determine:
   - Does it require full user journey? → E2E test
   - Does it test business logic/API contract? → API test
   - Does it validate UI component behavior? → Component test
   - Can it be unit tested? → Unit test

2. **Apply Test Level Selection Framework**

   **Knowledge Base Reference**: `test-levels-framework.md`

   **E2E (End-to-End)**:
   - Critical user journeys (login, checkout, core workflow)
   - Multi-system integration
   - User-facing acceptance criteria
   - **Characteristics**: High confidence, slow execution, brittle

   **API (Integration)**:
   - Business logic validation
   - Service contracts
   - Data transformations
   - **Characteristics**: Fast feedback, good balance, stable

   **Component**:
   - UI component behavior (buttons, forms, modals)
   - Interaction testing
   - Visual regression
   - **Characteristics**: Fast, isolated, granular

   **Unit**:
   - Pure business logic
   - Edge cases
   - Error handling
   - **Characteristics**: Fastest, most granular

3. **Avoid Duplicate Coverage**

   Don't test same behavior at multiple levels unless necessary:
   - Use E2E for critical happy path only
   - Use API tests for complex business logic variations
   - Use component tests for UI interaction edge cases
   - Use unit tests for pure logic edge cases

4. **Prioritize Tests**

   If test-design document exists, align with priority levels:
   - P0 scenarios → Must cover in failing tests
   - P1 scenarios → Should cover if time permits
   - P2/P3 scenarios → Optional for this iteration

**Decision Point:** Set `primary_level` variable to main test level for this story (typically E2E or API)

---
