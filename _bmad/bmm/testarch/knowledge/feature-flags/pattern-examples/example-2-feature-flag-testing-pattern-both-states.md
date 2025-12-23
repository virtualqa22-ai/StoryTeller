# Example 2: Feature Flag Testing Pattern (Both States)

**Context**: Comprehensive testing of feature flag variations with proper cleanup.

**Implementation**:

```typescript
// tests/e2e/checkout-feature-flag.spec.ts
import { test, expect } from '@playwright/test';
import { FLAGS } from '@/utils/feature-flags';

/**
 * Feature Flag Testing Strategy:
 * 1. Test BOTH enabled and disabled states
 * 2. Clean up targeting after each test
 * 3. Use dedicated test users (not production data)
 * 4. Verify telemetry events fire correctly
 */

test.describe('Checkout Flow - Feature Flag Variations', () => {
  let testUserId: string;

  test.beforeEach(async () => {
    // Generate unique test user ID
    testUserId = `test-user-${Date.now()}`;
  });

  test.afterEach(async ({ request }) => {
    // CRITICAL: Clean up flag targeting to prevent shared env pollution
    await request.post('/api/feature-flags/cleanup', {
      data: {
        flagKey: FLAGS.NEW_CHECKOUT_FLOW,
        userId: testUserId,
      },
    });
  });

  test('should use NEW checkout flow when flag is ENABLED', async ({ page, request }) => {
    // Arrange: Enable flag for test user
    await request.post('/api/feature-flags/target', {
      data: {
        flagKey: FLAGS.NEW_CHECKOUT_FLOW,
        userId: testUserId,
        variation: true, // ENABLED
      },
    });

    // Act: Navigate as targeted user
    await page.goto('/checkout', {
      extraHTTPHeaders: {
        'X-Test-User-ID': testUserId,
      },
    });

    // Assert: New flow UI elements visible
    await expect(page.getByTestId('checkout-v2-container')).toBeVisible();
    await expect(page.getByTestId('express-payment-options')).toBeVisible();
    await expect(page.getByTestId('saved-addresses-dropdown')).toBeVisible();

    // Assert: Legacy flow NOT visible
    await expect(page.getByTestId('checkout-v1-container')).not.toBeVisible();

    // Assert: Telemetry event fired
    const analyticsEvents = await page.evaluate(() => (window as any).__ANALYTICS_EVENTS__ || []);
    expect(analyticsEvents).toContainEqual(
      expect.objectContaining({
        event: 'checkout_started',
        properties: expect.objectContaining({
          variant: 'new_flow',
        }),
      }),
    );
  });

  test('should use LEGACY checkout flow when flag is DISABLED', async ({ page, request }) => {
    // Arrange: Disable flag for test user (or don't target at all)
    await request.post('/api/feature-flags/target', {
      data: {
        flagKey: FLAGS.NEW_CHECKOUT_FLOW,
        userId: testUserId,
        variation: false, // DISABLED
      },
    });

    // Act: Navigate as targeted user
    await page.goto('/checkout', {
      extraHTTPHeaders: {
        'X-Test-User-ID': testUserId,
      },
    });

    // Assert: Legacy flow UI elements visible
    await expect(page.getByTestId('checkout-v1-container')).toBeVisible();
    await expect(page.getByTestId('legacy-payment-form')).toBeVisible();

    // Assert: New flow NOT visible
    await expect(page.getByTestId('checkout-v2-container')).not.toBeVisible();
    await expect(page.getByTestId('express-payment-options')).not.toBeVisible();

    // Assert: Telemetry event fired with correct variant
    const analyticsEvents = await page.evaluate(() => (window as any).__ANALYTICS_EVENTS__ || []);
    expect(analyticsEvents).toContainEqual(
      expect.objectContaining({
        event: 'checkout_started',
        properties: expect.objectContaining({
          variant: 'legacy_flow',
        }),
      }),
    );
  });

  test('should handle flag evaluation errors gracefully', async ({ page, request }) => {
    // Arrange: Simulate flag service unavailable
    await page.route('**/api/feature-flags/evaluate', (route) => route.fulfill({ status: 500, body: 'Service Unavailable' }));

    // Act: Navigate (should fallback to default state)
    await page.goto('/checkout', {
      extraHTTPHeaders: {
        'X-Test-User-ID': testUserId,
      },
    });

    // Assert: Fallback to safe default (legacy flow)
    await expect(page.getByTestId('checkout-v1-container')).toBeVisible();

    // Assert: Error logged but no user-facing error
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    expect(consoleErrors).toContain(expect.stringContaining('Feature flag evaluation failed'));
  });
});
```

**Cypress equivalent**:

```javascript
// cypress/e2e/checkout-feature-flag.cy.ts
import { FLAGS } from '@/utils/feature-flags';

describe('Checkout Flow - Feature Flag Variations', () => {
  let testUserId;

  beforeEach(() => {
    testUserId = `test-user-${Date.now()}`;
  });

  afterEach(() => {
    // Clean up targeting
    cy.task('removeFeatureFlagTarget', {
      flagKey: FLAGS.NEW_CHECKOUT_FLOW,
      userId: testUserId,
    });
  });

  it('should use NEW checkout flow when flag is ENABLED', () => {
    // Arrange: Enable flag via Cypress task
    cy.task('setFeatureFlagVariation', {
      flagKey: FLAGS.NEW_CHECKOUT_FLOW,
      userId: testUserId,
      variation: true,
    });

    // Act
    cy.visit('/checkout', {
      headers: { 'X-Test-User-ID': testUserId },
    });

    // Assert
    cy.get('[data-testid="checkout-v2-container"]').should('be.visible');
    cy.get('[data-testid="checkout-v1-container"]').should('not.exist');
  });

  it('should use LEGACY checkout flow when flag is DISABLED', () => {
    // Arrange: Disable flag
    cy.task('setFeatureFlagVariation', {
      flagKey: FLAGS.NEW_CHECKOUT_FLOW,
      userId: testUserId,
      variation: false,
    });

    // Act
    cy.visit('/checkout', {
      headers: { 'X-Test-User-ID': testUserId },
    });

    // Assert
    cy.get('[data-testid="checkout-v1-container"]').should('be.visible');
    cy.get('[data-testid="checkout-v2-container"]').should('not.exist');
  });
});
```

**Key Points**:

- **Test both states**: Enabled AND disabled variations
- **Automatic cleanup**: afterEach removes targeting (prevent pollution)
- **Unique test users**: Avoid conflicts with real user data
- **Telemetry validation**: Verify analytics events fire correctly
- **Graceful degradation**: Test fallback behavior on errors

---
