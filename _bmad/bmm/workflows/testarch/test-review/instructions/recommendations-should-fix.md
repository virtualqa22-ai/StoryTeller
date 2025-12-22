# Recommendations (Should Fix)

## 1. Use Data Factory for Test User (Lines 23, 32, 41)

**Severity**: P1 (High)
**Issue**: Hardcoded email `test@example.com` - maintainability risk
**Fix**: Create factory function for test users
**Knowledge**: See data-factories.md

```typescript
// ✅ Good (recommended)
import { createTestUser } from './factories/user-factory';

const testUser = createTestUser({ role: 'admin' });
await loginPage.login(testUser.email, testUser.password);
```

## 2. Extract Login Setup to Fixture (Lines 18-28)

**Severity**: P1 (High)
**Issue**: Login setup repeated across tests - DRY violation
**Fix**: Create fixture for authenticated state
**Knowledge**: See fixture-architecture.md

```typescript
// ✅ Good (recommended)
const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    const user = createTestUser();
    await loginPage.login(user.email, user.password);
    await use(page);
  },
});

test('user can access dashboard', async ({ authenticatedPage }) => {
  // Test starts already logged in
});
```
