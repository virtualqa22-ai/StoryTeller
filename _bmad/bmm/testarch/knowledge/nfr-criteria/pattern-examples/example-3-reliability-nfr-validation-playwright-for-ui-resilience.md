# Example 3: Reliability NFR Validation (Playwright for UI Resilience)

**Context**: Automated reliability tests validating graceful degradation and recovery paths

**Implementation**:

```typescript
// tests/nfr/reliability.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Reliability NFR: Error Handling & Recovery', () => {
  test('app remains functional when API returns 500 error', async ({ page, context }) => {
    // Mock API failure
    await context.route('**/api/products', (route) => {
      route.fulfill({ status: 500, body: JSON.stringify({ error: 'Internal Server Error' }) });
    });

    await page.goto('/products');

    // User sees error message (not blank page or crash)
    await expect(page.getByText('Unable to load products. Please try again.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Retry' })).toBeVisible();

    // App navigation still works (graceful degradation)
    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page).toHaveURL('/');
  });

  test('API client retries on transient failures (3 attempts)', async ({ page, context }) => {
    let attemptCount = 0;

    await context.route('**/api/checkout', (route) => {
      attemptCount++;

      // Fail first 2 attempts, succeed on 3rd
      if (attemptCount < 3) {
        route.fulfill({ status: 503, body: JSON.stringify({ error: 'Service Unavailable' }) });
      } else {
        route.fulfill({ status: 200, body: JSON.stringify({ orderId: '12345' }) });
      }
    });

    await page.goto('/checkout');
    await page.getByRole('button', { name: 'Place Order' }).click();

    // Should succeed after 3 attempts
    await expect(page.getByText('Order placed successfully')).toBeVisible();
    expect(attemptCount).toBe(3);
  });

  test('app handles network disconnection gracefully', async ({ page, context }) => {
    await page.goto('/dashboard');

    // Simulate offline mode
    await context.setOffline(true);

    // Trigger action requiring network
    await page.getByRole('button', { name: 'Refresh Data' }).click();

    // User sees offline indicator (not crash)
    await expect(page.getByText('You are offline. Changes will sync when reconnected.')).toBeVisible();

    // Reconnect
    await context.setOffline(false);
    await page.getByRole('button', { name: 'Refresh Data' }).click();

    // Data loads successfully
    await expect(page.getByText('Data updated')).toBeVisible();
  });

  test('health check endpoint returns service status', async ({ request }) => {
    const response = await request.get('/api/health');

    expect(response.status()).toBe(200);

    const health = await response.json();
    expect(health).toHaveProperty('status', 'healthy');
    expect(health).toHaveProperty('timestamp');
    expect(health).toHaveProperty('services');

    // Verify critical services are monitored
    expect(health.services).toHaveProperty('database');
    expect(health.services).toHaveProperty('cache');
    expect(health.services).toHaveProperty('queue');

    // All services should be UP
    expect(health.services.database.status).toBe('UP');
    expect(health.services.cache.status).toBe('UP');
    expect(health.services.queue.status).toBe('UP');
  });

  test('circuit breaker opens after 5 consecutive failures', async ({ page, context }) => {
    let failureCount = 0;

    await context.route('**/api/recommendations', (route) => {
      failureCount++;
      route.fulfill({ status: 500, body: JSON.stringify({ error: 'Service Error' }) });
    });

    await page.goto('/product/123');

    // Wait for circuit breaker to open (fallback UI appears)
    await expect(page.getByText('Recommendations temporarily unavailable')).toBeVisible({ timeout: 10000 });

    // Verify circuit breaker stopped making requests after threshold (should be ≤5)
    expect(failureCount).toBeLessThanOrEqual(5);
  });

  test('rate limiting gracefully handles 429 responses', async ({ page, context }) => {
    let requestCount = 0;

    await context.route('**/api/search', (route) => {
      requestCount++;

      if (requestCount > 10) {
        // Rate limit exceeded
        route.fulfill({
          status: 429,
          headers: { 'Retry-After': '5' },
          body: JSON.stringify({ error: 'Rate limit exceeded' }),
        });
      } else {
        route.fulfill({ status: 200, body: JSON.stringify({ results: [] }) });
      }
    });

    await page.goto('/search');

    // Make 15 search requests rapidly
    for (let i = 0; i < 15; i++) {
      await page.getByPlaceholder('Search').fill(`query-${i}`);
      await page.getByRole('button', { name: 'Search' }).click();
    }

    // User sees rate limit message (not crash)
    await expect(page.getByText('Too many requests. Please wait a moment.')).toBeVisible();
  });
});
```

**Key Points**:

- Error handling: Graceful degradation (500 error → user-friendly message + retry button)
- Retries: 3 attempts on transient failures (503 → eventual success)
- Offline handling: Network disconnection detected (sync when reconnected)
- Health checks: `/api/health` monitors database, cache, queue
- Circuit breaker: Opens after 5 failures (fallback UI, stop retries)
- Rate limiting: 429 response handled (Retry-After header respected)

**Reliability NFR Criteria**:

- ✅ PASS: Error handling, retries, health checks verified (all 6 tests green)
- ⚠️ CONCERNS: Partial coverage (e.g., missing circuit breaker) or no telemetry
- ❌ FAIL: No recovery path (500 error crashes app) or unresolved crash scenarios

---
