# Example 2: Retry Validation Pattern (Network Resilience)

**Context**: Test that retry/backoff logic works correctly for transient failures.

**Implementation**:

```typescript
// tests/e2e/retry-resilience.spec.ts
import { test, expect } from '@playwright/test';

/**
 * Retry Validation Pattern
 * - Force sequential failures (500 → 500 → 200)
 * - Validate retry attempts and backoff timing
 * - Assert telemetry captures retry events
 */

test.describe('Network Retry Logic', () => {
  test('should retry on 500 error and succeed', async ({ page }) => {
    let attemptCount = 0;
    const attemptTimestamps: number[] = [];

    // Mock API: Fail twice, succeed on third attempt
    await page.route('**/api/products', (route) => {
      attemptCount++;
      attemptTimestamps.push(Date.now());

      if (attemptCount <= 2) {
        // First 2 attempts: 500 error
        route.fulfill({
          status: 500,
          body: JSON.stringify({ error: 'Server error' }),
        });
      } else {
        // 3rd attempt: Success
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ products: [{ id: 1, name: 'Product 1' }] }),
        });
      }
    });

    // Act: Navigate (should retry automatically)
    await page.goto('/products');

    // Assert: Data eventually loads after retries
    await expect(page.getByTestId('product-list')).toBeVisible();
    await expect(page.getByTestId('product-item')).toHaveCount(1);

    // Assert: Exactly 3 attempts made
    expect(attemptCount).toBe(3);

    // Assert: Exponential backoff timing (1s → 2s between attempts)
    if (attemptTimestamps.length === 3) {
      const delay1 = attemptTimestamps[1] - attemptTimestamps[0];
      const delay2 = attemptTimestamps[2] - attemptTimestamps[1];

      expect(delay1).toBeGreaterThanOrEqual(900); // ~1 second
      expect(delay1).toBeLessThan(1200);
      expect(delay2).toBeGreaterThanOrEqual(1900); // ~2 seconds
      expect(delay2).toBeLessThan(2200);
    }

    // Assert: Telemetry logged retry events
    const telemetryEvents = await page.evaluate(() => (window as any).__TELEMETRY_EVENTS__ || []);
    expect(telemetryEvents).toContainEqual(
      expect.objectContaining({
        event: 'api_retry',
        attempt: 1,
        endpoint: '/api/products',
      }),
    );
    expect(telemetryEvents).toContainEqual(
      expect.objectContaining({
        event: 'api_retry',
        attempt: 2,
      }),
    );
  });

  test('should give up after max retries and show error', async ({ page }) => {
    let attemptCount = 0;

    // Mock API: Always fail (test retry limit)
    await page.route('**/api/products', (route) => {
      attemptCount++;
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Persistent server error' }),
      });
    });

    // Act
    await page.goto('/products');

    // Assert: Max retries reached (3 attempts typical)
    expect(attemptCount).toBe(3);

    // Assert: Error UI displayed after exhausting retries
    await expect(page.getByTestId('error-message')).toBeVisible();
    await expect(page.getByTestId('error-message')).toContainText(/unable.*load|failed.*after.*retries/i);

    // Assert: Data not displayed
    await expect(page.getByTestId('product-list')).not.toBeVisible();
  });

  test('should NOT retry on 404 (non-retryable error)', async ({ page }) => {
    let attemptCount = 0;

    // Mock API: 404 error (should NOT retry)
    await page.route('**/api/products/999', (route) => {
      attemptCount++;
      route.fulfill({
        status: 404,
        body: JSON.stringify({ error: 'Product not found' }),
      });
    });

    await page.goto('/products/999');

    // Assert: Only 1 attempt (no retries on 404)
    expect(attemptCount).toBe(1);

    // Assert: 404 error displayed immediately
    await expect(page.getByTestId('not-found-message')).toBeVisible();
  });
});
```

**Cypress with retry interception**:

```javascript
// cypress/e2e/retry-resilience.cy.ts
describe('Network Retry Logic', () => {
  it('should retry on 500 and succeed on 3rd attempt', () => {
    let attemptCount = 0;

    cy.intercept('GET', '**/api/products', (req) => {
      attemptCount++;

      if (attemptCount <= 2) {
        req.reply({ statusCode: 500, body: { error: 'Server error' } });
      } else {
        req.reply({ statusCode: 200, body: { products: [{ id: 1, name: 'Product 1' }] } });
      }
    }).as('getProducts');

    cy.visit('/products');

    // Wait for final successful request
    cy.wait('@getProducts').its('response.statusCode').should('eq', 200);

    // Assert: Data loaded
    cy.get('[data-cy="product-list"]').should('be.visible');
    cy.get('[data-cy="product-item"]').should('have.length', 1);

    // Validate retry count
    cy.wrap(attemptCount).should('eq', 3);
  });
});
```

**Key Points**:

- **Sequential failures**: Test retry logic with 500 → 500 → 200
- **Backoff timing**: Validate exponential backoff delays
- **Retry limits**: Max attempts enforced (typically 3)
- **Non-retryable errors**: 404s don't trigger retries
- **Telemetry**: Log retry attempts for monitoring

---
