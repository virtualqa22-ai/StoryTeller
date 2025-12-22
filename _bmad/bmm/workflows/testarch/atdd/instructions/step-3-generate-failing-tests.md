# Step 3: Generate Failing Tests

## Actions

1. **Create Test File Structure**

   ```
   tests/
   ├── e2e/
   │   └── {feature-name}.spec.ts        # E2E acceptance tests
   ├── api/
   │   └── {feature-name}.api.spec.ts    # API contract tests
   ├── component/
   │   └── {ComponentName}.test.tsx      # Component tests
   └── support/
       ├── fixtures/                      # Test fixtures
       ├── factories/                     # Data factories
       └── helpers/                       # Utility functions
   ```

2. **Write Failing E2E Tests (If Applicable)**

   **Use Given-When-Then format:**

   ```typescript
   import { test, expect } from '@playwright/test';

   test.describe('User Login', () => {
     test('should display error for invalid credentials', async ({ page }) => {
       // GIVEN: User is on login page
       await page.goto('/login');

       // WHEN: User submits invalid credentials
       await page.fill('[data-testid="email-input"]', 'invalid@example.com');
       await page.fill('[data-testid="password-input"]', 'wrongpassword');
       await page.click('[data-testid="login-button"]');

       // THEN: Error message is displayed
       await expect(page.locator('[data-testid="error-message"]')).toHaveText('Invalid email or password');
     });
   });
   ```

   **Critical patterns:**
   - One assertion per test (atomic tests)
   - Explicit waits (no hard waits/sleeps)
   - Network-first approach (route interception before navigation)
   - data-testid selectors for stability
   - Clear Given-When-Then structure

3. **Apply Network-First Pattern**

   **Knowledge Base Reference**: `network-first.md`

   ```typescript
   test('should load user dashboard after login', async ({ page }) => {
     // CRITICAL: Intercept routes BEFORE navigation
     await page.route('**/api/user', (route) =>
       route.fulfill({
         status: 200,
         body: JSON.stringify({ id: 1, name: 'Test User' }),
       }),
     );

     // NOW navigate
     await page.goto('/dashboard');

     await expect(page.locator('[data-testid="user-name"]')).toHaveText('Test User');
   });
   ```

4. **Write Failing API Tests (If Applicable)**

   ```typescript
   import { test, expect } from '@playwright/test';

   test.describe('User API', () => {
     test('POST /api/users - should create new user', async ({ request }) => {
       // GIVEN: Valid user data
       const userData = {
         email: 'newuser@example.com',
         name: 'New User',
       };

       // WHEN: Creating user via API
       const response = await request.post('/api/users', {
         data: userData,
       });

       // THEN: User is created successfully
       expect(response.status()).toBe(201);
       const body = await response.json();
       expect(body).toMatchObject({
         email: userData.email,
         name: userData.name,
         id: expect.any(Number),
       });
     });
   });
   ```

5. **Write Failing Component Tests (If Applicable)**

   **Knowledge Base Reference**: `component-tdd.md`

   ```typescript
   import { test, expect } from '@playwright/experimental-ct-react';
   import { LoginForm } from './LoginForm';

   test.describe('LoginForm Component', () => {
     test('should disable submit button when fields are empty', async ({ mount }) => {
       // GIVEN: LoginForm is mounted
       const component = await mount(<LoginForm />);

       // WHEN: Form is initially rendered
       const submitButton = component.locator('button[type="submit"]');

       // THEN: Submit button is disabled
       await expect(submitButton).toBeDisabled();
     });
   });
   ```

6. **Verify Tests Fail Initially**

   **Critical verification:**
   - Run tests locally to confirm they fail
   - Failure should be due to missing implementation, not test errors
   - Failure messages should be clear and actionable
   - All tests must be in RED phase before sharing with DEV

**Important:** Tests MUST fail initially. If a test passes before implementation, it's not a valid acceptance test.

---
