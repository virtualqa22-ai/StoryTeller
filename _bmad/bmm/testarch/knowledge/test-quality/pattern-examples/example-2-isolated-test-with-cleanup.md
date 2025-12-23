# Example 2: Isolated Test with Cleanup

**Context**: When tests create data, they must clean up after themselves to prevent state pollution in parallel runs. Use fixture auto-cleanup or explicit teardown.

**Implementation**:

```typescript
// ❌ BAD: Test leaves data behind, pollutes other tests
test('admin can create user - POLLUTES STATE', async ({ page, apiRequest }) => {
  await page.goto('/admin/users');

  // Hardcoded email - collides in parallel runs
  await page.fill('[data-testid="email"]', 'newuser@example.com');
  await page.fill('[data-testid="name"]', 'New User');
  await page.click('[data-testid="create-user"]');

  await expect(page.getByText('User created')).toBeVisible();

  // NO CLEANUP - user remains in database
  // Next test run fails: "Email already exists"
});

// ✅ GOOD: Test cleans up with fixture auto-cleanup
// playwright/support/fixtures/database-fixture.ts
import { test as base } from '@playwright/test';
import { deleteRecord, seedDatabase } from '../helpers/db-helpers';

type DatabaseFixture = {
  seedUser: (userData: Partial<User>) => Promise<User>;
};

export const test = base.extend<DatabaseFixture>({
  seedUser: async ({}, use) => {
    const createdUsers: string[] = [];

    const seedUser = async (userData: Partial<User>) => {
      const user = await seedDatabase('users', userData);
      createdUsers.push(user.id); // Track for cleanup
      return user;
    };

    await use(seedUser);

    // Auto-cleanup: Delete all users created during test
    for (const userId of createdUsers) {
      await deleteRecord('users', userId);
    }
    createdUsers.length = 0;
  },
});

// Use the fixture
test('admin can create user', async ({ page, seedUser }) => {
  // Create admin with unique data
  const admin = await seedUser({
    email: faker.internet.email(), // Unique each run
    role: 'admin',
  });

  await page.goto('/admin/users');

  const newUserEmail = faker.internet.email(); // Unique
  await page.fill('[data-testid="email"]', newUserEmail);
  await page.fill('[data-testid="name"]', 'New User');
  await page.click('[data-testid="create-user"]');

  await expect(page.getByText('User created')).toBeVisible();

  // Verify in database
  const createdUser = await seedUser({ email: newUserEmail });
  expect(createdUser.email).toBe(newUserEmail);

  // Auto-cleanup happens via fixture teardown
});

// Cypress equivalent with explicit cleanup
describe('Admin User Management', () => {
  const createdUserIds: string[] = [];

  afterEach(() => {
    // Cleanup: Delete all users created during test
    createdUserIds.forEach((userId) => {
      cy.task('db:delete', { table: 'users', id: userId });
    });
    createdUserIds.length = 0;
  });

  it('should create user', () => {
    const admin = createUser({ role: 'admin' });
    const newUser = createUser(); // Unique data via faker

    cy.task('db:seed', { users: [admin] }).then((result: any) => {
      createdUserIds.push(result.users[0].id);
    });

    cy.visit('/admin/users');
    cy.get('[data-cy="email"]').type(newUser.email);
    cy.get('[data-cy="name"]').type(newUser.name);
    cy.get('[data-cy="create-user"]').click();

    cy.contains('User created').should('be.visible');

    // Track for cleanup
    cy.task('db:findByEmail', newUser.email).then((user: any) => {
      createdUserIds.push(user.id);
    });
  });
});
```

**Key Points**:

- Use fixtures with auto-cleanup via teardown (after `use()`)
- Track all created resources in array during test execution
- Use `faker` for unique data - prevents parallel collisions
- Cypress: Use `afterEach()` with explicit cleanup
- Never hardcode IDs or emails - always generate unique values
