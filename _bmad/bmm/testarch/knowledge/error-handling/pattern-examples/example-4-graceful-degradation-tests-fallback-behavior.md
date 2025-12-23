# Example 4: Graceful Degradation Tests (Fallback Behavior)

**Context**: Validate application continues functioning when services are unavailable.

**Implementation**:

```typescript
// tests/e2e/graceful-degradation.spec.ts
import { test, expect } from '@playwright/test';

/**
 * Graceful Degradation Pattern
 * - Simulate service unavailability
 * - Validate fallback behavior
 * - Ensure user experience degrades gracefully
 * - Verify telemetry captures degradation events
 */

test.describe('Service Unavailability', () => {
  test('should display cached data when API is down', async ({ page }) => {
    // Arrange: Seed localStorage with cached data
    await page.addInitScript(() => {
      localStorage.setItem(
        'products_cache',
        JSON.stringify({
          data: [
            { id: 1, name: 'Cached Product 1' },
            { id: 2, name: 'Cached Product 2' },
          ],
          timestamp: Date.now(),
        }),
      );
    });

    // Mock API unavailable
    await page.route(
      '**/api/products',
      (route) => route.abort('connectionrefused'), // Simulate server down
    );

    // Act
    await page.goto('/products');

    // Assert: Cached data displayed
    await expect(page.getByTestId('product-list')).toBeVisible();
    await expect(page.getByText('Cached Product 1')).toBeVisible();

    // Assert: Stale data warning shown
    await expect(page.getByTestId('cache-warning')).toBeVisible();
    await expect(page.getByTestId('cache-warning')).toContainText(/showing.*cached|offline.*mode/i);

    // Assert: Retry button available
    await expect(page.getByTestId('refresh-button')).toBeVisible();
  });

  test('should show fallback UI when analytics service fails', async ({ page }) => {
    // Mock analytics service down (non-critical)
    await page.route('**/analytics/track', (route) => route.fulfill({ status: 503, body: 'Service unavailable' }));

    // Act: Navigate normally
    await page.goto('/dashboard');

    // Assert: Page loads successfully (analytics failure doesn't block)
    await expect(page.getByTestId('dashboard-content')).toBeVisible();

    // Assert: Analytics error logged but not shown to user
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    // Trigger analytics event
    await page.getByTestId('track-action-button').click();

    // Analytics error logged
    expect(consoleErrors).toContainEqual(expect.stringContaining('Analytics service unavailable'));

    // But user doesn't see error
    await expect(page.getByTestId('error-message')).not.toBeVisible();
  });

  test('should fallback to local validation when API is slow', async ({ page }) => {
    // Mock slow API (> 5 seconds)
    await page.route('**/api/validate-email', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 6000)); // 6 second delay
      route.fulfill({
        status: 200,
        body: JSON.stringify({ valid: true }),
      });
    });

    // Act: Fill form
    await page.goto('/signup');
    await page.getByTestId('email-input').fill('test@example.com');
    await page.getByTestId('email-input').blur();

    // Assert: Client-side validation triggers immediately (doesn't wait for API)
    await expect(page.getByTestId('email-valid-icon')).toBeVisible({ timeout: 1000 });

    // Assert: Eventually API validates too (but doesn't block UX)
    await expect(page.getByTestId('email-validated-badge')).toBeVisible({ timeout: 7000 });
  });

  test('should maintain functionality with third-party script failure', async ({ page }) => {
    // Block third-party scripts (Google Analytics, Intercom, etc.)
    await page.route('**/*.google-analytics.com/**', (route) => route.abort());
    await page.route('**/*.intercom.io/**', (route) => route.abort());

    // Act
    await page.goto('/');

    // Assert: App works without third-party scripts
    await expect(page.getByTestId('main-content')).toBeVisible();
    await expect(page.getByTestId('nav-menu')).toBeVisible();

    // Assert: Core functionality intact
    await page.getByTestId('nav-products').click();
    await expect(page).toHaveURL(/.*\/products/);
  });
});
```

**Key Points**:

- **Cached fallbacks**: Display stale data when API unavailable
- **Non-critical degradation**: Analytics failures don't block app
- **Client-side fallbacks**: Local validation when API slow
- **Third-party resilience**: App works without external scripts
- **User transparency**: Stale data warnings displayed

---
