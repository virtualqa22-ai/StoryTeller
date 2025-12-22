# Step 3: Generate Test Infrastructure

## Actions

1. **Enhance Fixture Architecture**

   **Knowledge Base Reference**: `fixture-architecture.md`

   Check existing fixtures in `tests/support/fixtures/`:
   - If missing or incomplete, create fixture architecture
   - Use Playwright's `test.extend()` pattern
   - Ensure all fixtures have auto-cleanup in teardown

   **Common fixtures to create/enhance:**
   - **authenticatedUser**: User with valid session (auto-deletes user after test)
   - **apiRequest**: Authenticated API client with base URL and headers
   - **mockNetwork**: Network mocking for external services
   - **testDatabase**: Database with test data (auto-cleanup after test)

   **Example fixture:**

   ```typescript
   // tests/support/fixtures/auth.fixture.ts
   import { test as base } from '@playwright/test';
   import { createUser, deleteUser } from '../factories/user.factory';

   export const test = base.extend({
     authenticatedUser: async ({ page }, use) => {
       // Setup: Create and authenticate user
       const user = await createUser();
       await page.goto('/login');
       await page.fill('[data-testid="email"]', user.email);
       await page.fill('[data-testid="password"]', user.password);
       await page.click('[data-testid="login-button"]');
       await page.waitForURL('/dashboard');

       // Provide to test
       await use(user);

       // Cleanup: Delete user automatically
       await deleteUser(user.id);
     },
   });
   ```

2. **Enhance Data Factories**

   **Knowledge Base Reference**: `data-factories.md`

   Check existing factories in `tests/support/factories/`:
   - If missing or incomplete, create factory architecture
   - Use `@faker-js/faker` for all random data (no hardcoded values)
   - Support overrides for specific test scenarios

   **Common factories to create/enhance:**
   - User factory (email, password, name, role)
   - Product factory (name, price, description, SKU)
   - Order factory (items, total, status, customer)

   **Example factory:**

   ```typescript
   // tests/support/factories/user.factory.ts
   import { faker } from '@faker-js/faker';

   export const createUser = (overrides = {}) => ({
     id: faker.number.int(),
     email: faker.internet.email(),
     password: faker.internet.password(),
     name: faker.person.fullName(),
     role: 'user',
     createdAt: faker.date.recent().toISOString(),
     ...overrides,
   });

   export const createUsers = (count: number) => Array.from({ length: count }, () => createUser());

   // API helper for cleanup
   export const deleteUser = async (userId: number) => {
     await fetch(`/api/users/${userId}`, { method: 'DELETE' });
   };
   ```

3. **Create/Enhance Helper Utilities**

   If `{update_helpers}` is true:

   Check `tests/support/helpers/` for common utilities:
   - **waitFor**: Polling helper for complex conditions
   - **retry**: Retry helper for flaky operations
   - **testData**: Test data generation helpers
   - **assertions**: Custom assertion helpers

   **Example helper:**

   ```typescript
   // tests/support/helpers/wait-for.ts
   export const waitFor = async (condition: () => Promise<boolean>, timeout = 5000, interval = 100): Promise<void> => {
     const startTime = Date.now();
     while (Date.now() - startTime < timeout) {
       if (await condition()) return;
       await new Promise((resolve) => setTimeout(resolve, interval));
     }
     throw new Error(`Condition not met within ${timeout}ms`);
   };
   ```

---
