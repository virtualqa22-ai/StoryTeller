# Step 2: Identify Automation Targets

## Actions

1. **Determine What Needs Testing**

   **BMad-Integrated Mode (story available):**
   - Map acceptance criteria from story to test scenarios
   - Identify features implemented in this story
   - Check if story has existing ATDD tests (from `*atdd` workflow)
   - Expand beyond ATDD with edge cases and negative paths

   **Standalone Mode (no story):**
   - If `{target_feature}` specified: Analyze that specific feature
   - If `{target_files}` specified: Analyze those specific files
   - If `{auto_discover_features}` is true: Scan `{source_dir}` for features
   - Prioritize features with:
     - No test coverage (highest priority)
     - Complex business logic
     - External integrations (API calls, database, auth)
     - Critical user paths (login, checkout, etc.)

2. **Apply Test Level Selection Framework**

   **Knowledge Base Reference**: `test-levels-framework.md`

   For each feature or acceptance criterion, determine appropriate test level:

   **E2E (End-to-End)**:
   - Critical user journeys (login, checkout, core workflows)
   - Multi-system integration
   - Full user-facing scenarios
   - Characteristics: High confidence, slow, brittle

   **API (Integration)**:
   - Business logic validation
   - Service contracts and data transformations
   - Backend integration without UI
   - Characteristics: Fast feedback, stable, good balance

   **Component**:
   - UI component behavior (buttons, forms, modals)
   - Interaction testing (click, hover, keyboard)
   - State management within component
   - Characteristics: Fast, isolated, granular

   **Unit**:
   - Pure business logic and algorithms
   - Edge cases and error handling
   - Minimal dependencies
   - Characteristics: Fastest, most granular

3. **Avoid Duplicate Coverage**

   **Critical principle:** Don't test same behavior at multiple levels unless necessary
   - Use E2E for critical happy path only
   - Use API tests for business logic variations
   - Use component tests for UI interaction edge cases
   - Use unit tests for pure logic edge cases

   **Example:**
   - E2E: User can log in with valid credentials → Dashboard loads
   - API: POST /auth/login returns 401 for invalid credentials
   - API: POST /auth/login returns 200 and JWT token for valid credentials
   - Component: LoginForm disables submit button when fields are empty
   - Unit: validateEmail() returns false for malformed email addresses

4. **Assign Test Priorities**

   **Knowledge Base Reference**: `test-priorities-matrix.md`

   **P0 (Critical - Every commit)**:
   - Critical user paths that must always work
   - Security-critical functionality (auth, permissions)
   - Data integrity scenarios
   - Run in pre-commit hooks or PR checks

   **P1 (High - PR to main)**:
   - Important features with high user impact
   - Integration points between systems
   - Error handling for common failures
   - Run before merging to main branch

   **P2 (Medium - Nightly)**:
   - Edge cases with moderate impact
   - Less-critical feature variations
   - Performance/load testing
   - Run in nightly CI builds

   **P3 (Low - On-demand)**:
   - Nice-to-have validations
   - Rarely-used features
   - Exploratory testing scenarios
   - Run manually or weekly

   **Priority Variables:**
   - `{include_p0}` - Always include (default: true)
   - `{include_p1}` - High priority (default: true)
   - `{include_p2}` - Medium priority (default: true)
   - `{include_p3}` - Low priority (default: false)

5. **Create Test Coverage Plan**

   Document what will be tested at each level with priorities:

   ```markdown
   ## Test Coverage Plan

   ### E2E Tests (P0)

   - User login with valid credentials → Dashboard loads
   - User logout → Redirects to login page

   ### API Tests (P1)

   - POST /auth/login - valid credentials → 200 + JWT token
   - POST /auth/login - invalid credentials → 401 + error message
   - POST /auth/login - missing fields → 400 + validation errors

   ### Component Tests (P1)

   - LoginForm - empty fields → submit button disabled
   - LoginForm - valid input → submit button enabled

   ### Unit Tests (P2)

   - validateEmail() - valid email → returns true
   - validateEmail() - malformed email → returns false
   ```

---
