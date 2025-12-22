# Step 4: Build Data Infrastructure

## Actions

1. **Create Data Factories**

   **Knowledge Base Reference**: `data-factories.md`

   ```typescript
   // tests/support/factories/user.factory.ts
   import { faker } from '@faker-js/faker';

   export const createUser = (overrides = {}) => ({
     id: faker.number.int(),
     email: faker.internet.email(),
     name: faker.person.fullName(),
     createdAt: faker.date.recent().toISOString(),
     ...overrides,
   });

   export const createUsers = (count: number) => Array.from({ length: count }, () => createUser());
   ```

   **Factory principles:**
   - Use faker for random data (no hardcoded values)
   - Support overrides for specific scenarios
   - Generate complete valid objects
   - Include helper functions for bulk creation

2. **Create Test Fixtures**

   **Knowledge Base Reference**: `fixture-architecture.md`

   ```typescript
   // tests/support/fixtures/auth.fixture.ts
   import { test as base } from '@playwright/test';

   export const test = base.extend({
     authenticatedUser: async ({ page }, use) => {
       // Setup: Create and authenticate user
       const user = await createUser();
       await page.goto('/login');
       await page.fill('[data-testid="email"]', user.email);
       await page.fill('[data-testid="password"]', 'password123');
       await page.click('[data-testid="login-button"]');
       await page.waitForURL('/dashboard');

       // Provide to test
       await use(user);

       // Cleanup: Delete user
       await deleteUser(user.id);
     },
   });
   ```

   **Fixture principles:**
   - Auto-cleanup (always delete created data)
   - Composable (fixtures can use other fixtures)
   - Isolated (each test gets fresh data)
   - Type-safe

3. **Document Mock Requirements**

   If external services need mocking, document requirements:

   ```markdown
   ### Mock Requirements for DEV Team

   **Payment Gateway Mock**:

   - Endpoint: `POST /api/payments`
   - Success response: `{ status: 'success', transactionId: '123' }`
   - Failure response: `{ status: 'failed', error: 'Insufficient funds' }`

   **Email Service Mock**:

   - Should not send real emails in test environment
   - Log email contents for verification
   ```

4. **List Required data-testid Attributes**

   ```markdown
   ### Required data-testid Attributes

   **Login Page**:

   - `email-input` - Email input field
   - `password-input` - Password input field
   - `login-button` - Submit button
   - `error-message` - Error message container

   **Dashboard Page**:

   - `user-name` - User name display
   - `logout-button` - Logout button
   ```

---
