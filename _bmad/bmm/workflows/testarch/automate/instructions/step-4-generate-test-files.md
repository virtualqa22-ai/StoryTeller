# Step 4: Generate Test Files

## Actions

1. **Create Test File Structure**

   ```
   tests/
   ├── e2e/
   │   └── {feature-name}.spec.ts        # E2E tests (P0-P1)
   ├── api/
   │   └── {feature-name}.api.spec.ts    # API tests (P1-P2)
   ├── component/
   │   └── {ComponentName}.test.tsx      # Component tests (P1-P2)
   ├── unit/
   │   └── {module-name}.test.ts         # Unit tests (P2-P3)
   └── support/
       ├── fixtures/                      # Test fixtures
       ├── factories/                     # Data factories
       └── helpers/                       # Utility functions
   ```

2. **Write E2E Tests (If Applicable)**

   **Follow Given-When-Then format:**

   ```typescript
   import { test, expect } from '@playwright/test';

   test.describe('User Authentication', () => {
     test('[P0] should login with valid credentials and load dashboard', async ({ page }) => {
       // GIVEN: User is on login page
       await page.goto('/login');

       // WHEN: User submits valid credentials
       await page.fill('[data-testid="email-input"]', 'user@example.com');
       await page.fill('[data-testid="password-input"]', 'Password123!');
       await page.click('[data-testid="login-button"]');

       // THEN: User is redirected to dashboard
       await expect(page).toHaveURL('/dashboard');
       await expect(page.locator('[data-testid="user-name"]')).toBeVisible();
     });

     test('[P1] should display error for invalid credentials', async ({ page }) => {
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
   - Tag tests with priority: `[P0]`, `[P1]`, `[P2]`, `[P3]` in test name
   - One assertion per test (atomic tests)
   - Explicit waits (no hard waits/sleeps)
   - Network-first approach (route interception before navigation)
   - data-testid selectors for stability
   - Clear Given-When-Then structure

3. **Write API Tests (If Applicable)**

   ```typescript
   import { test, expect } from '@playwright/test';

   test.describe('User Authentication API', () => {
     test('[P1] POST /api/auth/login - should return token for valid credentials', async ({ request }) => {
       // GIVEN: Valid user credentials
       const credentials = {
         email: 'user@example.com',
         password: 'Password123!',
       };

       // WHEN: Logging in via API
       const response = await request.post('/api/auth/login', {
         data: credentials,
       });

       // THEN: Returns 200 and JWT token
       expect(response.status()).toBe(200);
       const body = await response.json();
       expect(body).toHaveProperty('token');
       expect(body.token).toMatch(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/); // JWT format
     });

     test('[P1] POST /api/auth/login - should return 401 for invalid credentials', async ({ request }) => {
       // GIVEN: Invalid credentials
       const credentials = {
         email: 'invalid@example.com',
         password: 'wrongpassword',
       };

       // WHEN: Attempting login
       const response = await request.post('/api/auth/login', {
         data: credentials,
       });

       // THEN: Returns 401 with error
       expect(response.status()).toBe(401);
       const body = await response.json();
       expect(body).toMatchObject({
         error: 'Invalid credentials',
       });
     });
   });
   ```

4. **Write Component Tests (If Applicable)**

   **Knowledge Base Reference**: `component-tdd.md`

   ```typescript
   import { test, expect } from '@playwright/experimental-ct-react';
   import { LoginForm } from './LoginForm';

   test.describe('LoginForm Component', () => {
     test('[P1] should disable submit button when fields are empty', async ({ mount }) => {
       // GIVEN: LoginForm is mounted
       const component = await mount(<LoginForm />);

       // WHEN: Form is initially rendered
       const submitButton = component.locator('button[type="submit"]');

       // THEN: Submit button is disabled
       await expect(submitButton).toBeDisabled();
     });

     test('[P1] should enable submit button when fields are filled', async ({ mount }) => {
       // GIVEN: LoginForm is mounted
       const component = await mount(<LoginForm />);

       // WHEN: User fills in email and password
       await component.locator('[data-testid="email-input"]').fill('user@example.com');
       await component.locator('[data-testid="password-input"]').fill('Password123!');

       // THEN: Submit button is enabled
       const submitButton = component.locator('button[type="submit"]');
       await expect(submitButton).toBeEnabled();
     });
   });
   ```

5. **Write Unit Tests (If Applicable)**

   ```typescript
   import { validateEmail } from './validation';

   describe('Email Validation', () => {
     test('[P2] should return true for valid email', () => {
       // GIVEN: Valid email address
       const email = 'user@example.com';

       // WHEN: Validating email
       const result = validateEmail(email);

       // THEN: Returns true
       expect(result).toBe(true);
     });

     test('[P2] should return false for malformed email', () => {
       // GIVEN: Malformed email addresses
       const invalidEmails = ['notanemail', '@example.com', 'user@', 'user @example.com'];

       // WHEN/THEN: Each should fail validation
       invalidEmails.forEach((email) => {
         expect(validateEmail(email)).toBe(false);
       });
     });
   });
   ```

6. **Apply Network-First Pattern (E2E tests)**

   **Knowledge Base Reference**: `network-first.md`

   **Critical pattern to prevent race conditions:**

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

7. **Enforce Quality Standards**

   **For every test:**
   - ✅ Uses Given-When-Then format
   - ✅ Has clear, descriptive name with priority tag
   - ✅ One assertion per test (atomic)
   - ✅ No hard waits or sleeps (use explicit waits)
   - ✅ Self-cleaning (uses fixtures with auto-cleanup)
   - ✅ Deterministic (no flaky patterns)
   - ✅ Fast (under {max_test_duration} seconds)
   - ✅ Lean (test file under {max_file_lines} lines)

   **Forbidden patterns:**
   - ❌ Hard waits: `await page.waitForTimeout(2000)`
   - ❌ Conditional flow: `if (await element.isVisible()) { ... }`
   - ❌ Try-catch for test logic (use for cleanup only)
   - ❌ Hardcoded test data (use factories)
   - ❌ Page objects (keep tests simple and direct)
   - ❌ Shared state between tests

---
