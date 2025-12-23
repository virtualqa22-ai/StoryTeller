# Example 5: Execution Time Optimization

**Context**: When tests take longer than 1.5 minutes, they slow CI pipelines and feedback loops. Optimize by using API setup instead of UI navigation, parallelizing independent operations, and avoiding unnecessary waits.

**Implementation**:

```typescript
// ❌ BAD: 4-minute test (slow setup, sequential operations)
test('user completes order - SLOW (4 min)', async ({ page }) => {
  // Step 1: Manual signup via UI (90 seconds)
  await page.goto('/signup');
  await page.fill('[data-testid="email"]', 'buyer@example.com');
  await page.fill('[data-testid="password"]', 'password123');
  await page.fill('[data-testid="confirm-password"]', 'password123');
  await page.fill('[data-testid="name"]', 'Buyer User');
  await page.click('[data-testid="signup"]');
  await page.waitForURL('/verify-email'); // Wait for email verification
  // ... manual email verification flow

  // Step 2: Manual product creation via UI (60 seconds)
  await page.goto('/admin/products');
  await page.fill('[data-testid="product-name"]', 'Widget');
  // ... 20 more fields
  await page.click('[data-testid="create-product"]');

  // Step 3: Navigate to checkout (30 seconds)
  await page.goto('/products');
  await page.waitForTimeout(5000); // Unnecessary hard wait
  await page.click('[data-testid="product-widget"]');
  await page.waitForTimeout(3000); // Unnecessary
  await page.click('[data-testid="add-to-cart"]');
  await page.waitForTimeout(2000); // Unnecessary

  // Step 4: Complete checkout (40 seconds)
  await page.goto('/checkout');
  await page.waitForTimeout(5000); // Unnecessary
  await page.fill('[data-testid="credit-card"]', '4111111111111111');
  // ... more form filling
  await page.click('[data-testid="submit-order"]');
  await page.waitForTimeout(10000); // Unnecessary

  await expect(page.getByText('Order Confirmed')).toBeVisible();

  // TOTAL: ~240 seconds (4 minutes)
});

// ✅ GOOD: 45-second test (API setup, parallel ops, deterministic waits)
test('user completes order', async ({ page, apiRequest }) => {
  // Step 1: API setup (parallel, 5 seconds total)
  const [user, product] = await Promise.all([
    // Create user via API (fast)
    apiRequest
      .post('/api/users', {
        data: createUser({
          email: 'buyer@example.com',
          emailVerified: true, // Skip verification
        }),
      })
      .then((r) => r.json()),

    // Create product via API (fast)
    apiRequest
      .post('/api/products', {
        data: createProduct({
          name: 'Widget',
          price: 29.99,
          stock: 10,
        }),
      })
      .then((r) => r.json()),
  ]);

  // Step 2: Auth setup via storage state (instant, 0 seconds)
  await page.context().addCookies([
    {
      name: 'auth_token',
      value: user.token,
      domain: 'localhost',
      path: '/',
    },
  ]);

  // Step 3: Network-first interception BEFORE navigation (10 seconds)
  const cartPromise = page.waitForResponse('**/api/cart');
  const orderPromise = page.waitForResponse('**/api/orders');

  await page.goto(`/products/${product.id}`);
  await page.click('[data-testid="add-to-cart"]');
  await cartPromise; // Deterministic wait (no hard wait)

  // Step 4: Checkout with network waits (30 seconds)
  await page.goto('/checkout');
  await page.fill('[data-testid="credit-card"]', '4111111111111111');
  await page.fill('[data-testid="cvv"]', '123');
  await page.fill('[data-testid="expiry"]', '12/25');
  await page.click('[data-testid="submit-order"]');
  await orderPromise; // Deterministic wait (no hard wait)

  await expect(page.getByText('Order Confirmed')).toBeVisible();
  await expect(page.getByText(`Order #${product.id}`)).toBeVisible();

  // TOTAL: ~45 seconds (6x faster)
});

// Cypress equivalent
describe('Order Flow', () => {
  it('should complete purchase quickly', () => {
    // Step 1: API setup (parallel, fast)
    const user = createUser({ emailVerified: true });
    const product = createProduct({ name: 'Widget', price: 29.99 });

    cy.task('db:seed', { users: [user], products: [product] });

    // Step 2: Auth setup via session (instant)
    cy.setCookie('auth_token', user.token);

    // Step 3: Network-first interception
    cy.intercept('POST', '**/api/cart').as('addToCart');
    cy.intercept('POST', '**/api/orders').as('createOrder');

    cy.visit(`/products/${product.id}`);
    cy.get('[data-cy="add-to-cart"]').click();
    cy.wait('@addToCart'); // Deterministic wait

    // Step 4: Checkout
    cy.visit('/checkout');
    cy.get('[data-cy="credit-card"]').type('4111111111111111');
    cy.get('[data-cy="cvv"]').type('123');
    cy.get('[data-cy="expiry"]').type('12/25');
    cy.get('[data-cy="submit-order"]').click();
    cy.wait('@createOrder'); // Deterministic wait

    cy.contains('Order Confirmed').should('be.visible');
    cy.contains(`Order #${product.id}`).should('be.visible');
  });
});

// Additional optimization: Shared auth state (0 seconds per test)
// playwright/support/global-setup.ts
export default async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Create admin user once for all tests
  const admin = createUser({ role: 'admin', emailVerified: true });
  await page.request.post('/api/users', { data: admin });

  // Login once, save session
  await page.goto('/login');
  await page.fill('[data-testid="email"]', admin.email);
  await page.fill('[data-testid="password"]', 'password123');
  await page.click('[data-testid="login"]');

  // Save auth state for reuse
  await page.context().storageState({ path: 'playwright/.auth/admin.json' });

  await browser.close();
}

// Use shared auth in tests (instant)
test.use({ storageState: 'playwright/.auth/admin.json' });

test('admin action', async ({ page }) => {
  // Already logged in - no auth overhead (0 seconds)
  await page.goto('/admin');
  // ... test logic
});
```

**Key Points**:

- Use API for data setup (10-50x faster than UI)
- Run independent operations in parallel (`Promise.all`)
- Replace hard waits with deterministic waits (`waitForResponse`)
- Reuse auth sessions via `storageState` (Playwright) or `setCookie` (Cypress)
- Skip unnecessary flows (email verification, multi-step signups)
