# Example 1: Security NFR Validation (Auth, Secrets, OWASP)

**Context**: Automated security tests enforcing authentication, authorization, and secret handling

**Implementation**:

```typescript
// tests/nfr/security.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Security NFR: Authentication & Authorization', () => {
  test('unauthenticated users cannot access protected routes', async ({ page }) => {
    // Attempt to access dashboard without auth
    await page.goto('/dashboard');

    // Should redirect to login (not expose data)
    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByText('Please sign in')).toBeVisible();

    // Verify no sensitive data leaked in response
    const pageContent = await page.content();
    expect(pageContent).not.toContain('user_id');
    expect(pageContent).not.toContain('api_key');
  });

  test('JWT tokens expire after 15 minutes', async ({ page, request }) => {
    // Login and capture token
    await page.goto('/login');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('ValidPass123!');
    await page.getByRole('button', { name: 'Sign In' }).click();

    const token = await page.evaluate(() => localStorage.getItem('auth_token'));
    expect(token).toBeTruthy();

    // Wait 16 minutes (use mock clock in real tests)
    await page.clock.fastForward('00:16:00');

    // Token should be expired, API call should fail
    const response = await request.get('/api/user/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });

    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.error).toContain('expired');
  });

  test('passwords are never logged or exposed in errors', async ({ page }) => {
    // Trigger login error
    await page.goto('/login');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('WrongPassword123!');

    // Monitor console for password leaks
    const consoleLogs: string[] = [];
    page.on('console', (msg) => consoleLogs.push(msg.text()));

    await page.getByRole('button', { name: 'Sign In' }).click();

    // Error shown to user (generic message)
    await expect(page.getByText('Invalid credentials')).toBeVisible();

    // Verify password NEVER appears in console, DOM, or network
    const pageContent = await page.content();
    expect(pageContent).not.toContain('WrongPassword123!');
    expect(consoleLogs.join('\n')).not.toContain('WrongPassword123!');
  });

  test('RBAC: users can only access resources they own', async ({ page, request }) => {
    // Login as User A
    const userAToken = await login(request, 'userA@example.com', 'password');

    // Try to access User B's order
    const response = await request.get('/api/orders/user-b-order-id', {
      headers: { Authorization: `Bearer ${userAToken}` },
    });

    expect(response.status()).toBe(403); // Forbidden
    const body = await response.json();
    expect(body.error).toContain('insufficient permissions');
  });

  test('SQL injection attempts are blocked', async ({ page }) => {
    await page.goto('/search');

    // Attempt SQL injection
    await page.getByPlaceholder('Search products').fill("'; DROP TABLE users; --");
    await page.getByRole('button', { name: 'Search' }).click();

    // Should return empty results, NOT crash or expose error
    await expect(page.getByText('No results found')).toBeVisible();

    // Verify app still works (table not dropped)
    await page.goto('/dashboard');
    await expect(page.getByText('Welcome')).toBeVisible();
  });

  test('XSS attempts are sanitized', async ({ page }) => {
    await page.goto('/profile/edit');

    // Attempt XSS injection
    const xssPayload = '<script>alert("XSS")</script>';
    await page.getByLabel('Bio').fill(xssPayload);
    await page.getByRole('button', { name: 'Save' }).click();

    // Reload and verify XSS is escaped (not executed)
    await page.reload();
    const bio = await page.getByTestId('user-bio').textContent();

    // Text should be escaped, script should NOT execute
    expect(bio).toContain('&lt;script&gt;');
    expect(bio).not.toContain('<script>');
  });
});

// Helper
async function login(request: any, email: string, password: string): Promise<string> {
  const response = await request.post('/api/auth/login', {
    data: { email, password },
  });
  const body = await response.json();
  return body.token;
}
```

**Key Points**:

- Authentication: Unauthenticated access redirected (not exposed)
- Authorization: RBAC enforced (403 for insufficient permissions)
- Token expiry: JWT expires after 15 minutes (automated validation)
- Secret handling: Passwords never logged or exposed in errors
- OWASP Top 10: SQL injection and XSS blocked (input sanitization)

**Security NFR Criteria**:

- ✅ PASS: All 6 tests green (auth, authz, token expiry, secret handling, SQL injection, XSS)
- ⚠️ CONCERNS: 1-2 tests failing with mitigation plan and owner assigned
- ❌ FAIL: Critical exposure (unauthenticated access, password leak, SQL injection succeeds)

---
