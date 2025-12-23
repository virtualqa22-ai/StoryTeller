# Example 1: Deterministic Test Pattern

**Context**: When writing tests, eliminate all sources of non-determinism: hard waits, conditionals controlling flow, try-catch for flow control, and random data without seeds.

**Implementation**:

```typescript
// ❌ BAD: Non-deterministic test with conditionals and hard waits
test('user can view dashboard - FLAKY', async ({ page }) => {
  await page.goto('/dashboard');
  await page.waitForTimeout(3000); // NEVER - arbitrary wait

  // Conditional flow control - test behavior varies
  if (await page.locator('[data-testid="welcome-banner"]').isVisible()) {
    await page.click('[data-testid="dismiss-banner"]');
    await page.waitForTimeout(500);
  }

  // Try-catch for flow control - hides real issues
  try {
    await page.click('[data-testid="load-more"]');
  } catch (e) {
    // Silently continue - test passes even if button missing
  }

  // Random data without control
  const randomEmail = `user${Math.random()}@example.com`;
  await expect(page.getByText(randomEmail)).toBeVisible(); // Will fail randomly
});

// ✅ GOOD: Deterministic test with explicit waits
test('user can view dashboard', async ({ page, apiRequest }) => {
  const user = createUser({ email: 'test@example.com', hasSeenWelcome: true });

  // Setup via API (fast, controlled)
  await apiRequest.post('/api/users', { data: user });

  // Network-first: Intercept BEFORE navigate
  const dashboardPromise = page.waitForResponse((resp) => resp.url().includes('/api/dashboard') && resp.status() === 200);

  await page.goto('/dashboard');

  // Wait for actual response, not arbitrary time
  const dashboardResponse = await dashboardPromise;
  const dashboard = await dashboardResponse.json();

  // Explicit assertions with controlled data
  await expect(page.getByText(`Welcome, ${user.name}`)).toBeVisible();
  await expect(page.getByTestId('dashboard-items')).toHaveCount(dashboard.items.length);

  // No conditionals - test always executes same path
  // No try-catch - failures bubble up clearly
});

// Cypress equivalent
describe('Dashboard', () => {
  it('should display user dashboard', () => {
    const user = createUser({ email: 'test@example.com', hasSeenWelcome: true });

    // Setup via task (fast, controlled)
    cy.task('db:seed', { users: [user] });

    // Network-first interception
    cy.intercept('GET', '**/api/dashboard').as('getDashboard');

    cy.visit('/dashboard');

    // Deterministic wait for response
    cy.wait('@getDashboard').then((interception) => {
      const dashboard = interception.response.body;

      // Explicit assertions
      cy.contains(`Welcome, ${user.name}`).should('be.visible');
      cy.get('[data-cy="dashboard-items"]').should('have.length', dashboard.items.length);
    });
  });
});
```

**Key Points**:

- Replace `waitForTimeout()` with `waitForResponse()` or element state checks
- Never use if/else to control test flow - tests should be deterministic
- Avoid try-catch for flow control - let failures bubble up clearly
- Use factory functions with controlled data, not `Math.random()`
- Network-first pattern prevents race conditions
