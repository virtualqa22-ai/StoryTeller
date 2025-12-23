# Example 4: Test Length Limits

**Context**: When tests grow beyond 300 lines, they become hard to understand, debug, and maintain. Refactor long tests by extracting setup helpers, splitting scenarios, or using fixtures.

**Implementation**:

```typescript
// ❌ BAD: 400-line monolithic test (truncated for example)
test('complete user journey - TOO LONG', async ({ page, request }) => {
  // 50 lines of setup
  const admin = createUser({ role: 'admin' });
  await request.post('/api/users', { data: admin });
  await page.goto('/login');
  await page.fill('[data-testid="email"]', admin.email);
  await page.fill('[data-testid="password"]', 'password123');
  await page.click('[data-testid="login"]');
  await expect(page).toHaveURL('/dashboard');

  // 100 lines of user creation
  await page.goto('/admin/users');
  const newUser = createUser();
  await page.fill('[data-testid="email"]', newUser.email);
  // ... 95 more lines of form filling, validation, etc.

  // 100 lines of permissions assignment
  await page.click('[data-testid="assign-permissions"]');
  // ... 95 more lines

  // 100 lines of notification preferences
  await page.click('[data-testid="notification-settings"]');
  // ... 95 more lines

  // 50 lines of cleanup
  await request.delete(`/api/users/${newUser.id}`);
  // ... 45 more lines

  // TOTAL: 400 lines - impossible to understand or debug
});

// ✅ GOOD: Split into focused tests with shared fixture
// playwright/support/fixtures/admin-fixture.ts
export const test = base.extend({
  adminPage: async ({ page, request }, use) => {
    // Shared setup: Login as admin
    const admin = createUser({ role: 'admin' });
    await request.post('/api/users', { data: admin });

    await page.goto('/login');
    await page.fill('[data-testid="email"]', admin.email);
    await page.fill('[data-testid="password"]', 'password123');
    await page.click('[data-testid="login"]');
    await expect(page).toHaveURL('/dashboard');

    await use(page); // Provide logged-in page

    // Cleanup handled by fixture
  },
});

// Test 1: User creation (50 lines)
test('admin can create user', async ({ adminPage, seedUser }) => {
  await adminPage.goto('/admin/users');

  const newUser = createUser();
  await adminPage.fill('[data-testid="email"]', newUser.email);
  await adminPage.fill('[data-testid="name"]', newUser.name);
  await adminPage.click('[data-testid="role-dropdown"]');
  await adminPage.click('[data-testid="role-user"]');
  await adminPage.click('[data-testid="create-user"]');

  await expect(adminPage.getByText('User created')).toBeVisible();
  await expect(adminPage.getByText(newUser.email)).toBeVisible();

  // Verify in database
  const created = await seedUser({ email: newUser.email });
  expect(created.role).toBe('user');
});

// Test 2: Permission assignment (60 lines)
test('admin can assign permissions', async ({ adminPage, seedUser }) => {
  const user = await seedUser({ email: faker.internet.email() });

  await adminPage.goto(`/admin/users/${user.id}`);
  await adminPage.click('[data-testid="assign-permissions"]');
  await adminPage.check('[data-testid="permission-read"]');
  await adminPage.check('[data-testid="permission-write"]');
  await adminPage.click('[data-testid="save-permissions"]');

  await expect(adminPage.getByText('Permissions updated')).toBeVisible();

  // Verify permissions assigned
  const response = await adminPage.request.get(`/api/users/${user.id}`);
  const updated = await response.json();
  expect(updated.permissions).toContain('read');
  expect(updated.permissions).toContain('write');
});

// Test 3: Notification preferences (70 lines)
test('admin can update notification preferences', async ({ adminPage, seedUser }) => {
  const user = await seedUser({ email: faker.internet.email() });

  await adminPage.goto(`/admin/users/${user.id}/notifications`);
  await adminPage.check('[data-testid="email-notifications"]');
  await adminPage.uncheck('[data-testid="sms-notifications"]');
  await adminPage.selectOption('[data-testid="frequency"]', 'daily');
  await adminPage.click('[data-testid="save-preferences"]');

  await expect(adminPage.getByText('Preferences saved')).toBeVisible();

  // Verify preferences
  const response = await adminPage.request.get(`/api/users/${user.id}/preferences`);
  const prefs = await response.json();
  expect(prefs.emailEnabled).toBe(true);
  expect(prefs.smsEnabled).toBe(false);
  expect(prefs.frequency).toBe('daily');
});

// TOTAL: 3 tests × 60 lines avg = 180 lines
// Each test is focused, debuggable, and under 300 lines
```

**Key Points**:

- Split monolithic tests into focused scenarios (<300 lines each)
- Extract common setup into fixtures (auto-runs for each test)
- Each test validates one concern (user creation, permissions, preferences)
- Failures are easier to diagnose: "Permission assignment failed" vs "Complete journey failed"
- Tests can run in parallel (isolated concerns)
