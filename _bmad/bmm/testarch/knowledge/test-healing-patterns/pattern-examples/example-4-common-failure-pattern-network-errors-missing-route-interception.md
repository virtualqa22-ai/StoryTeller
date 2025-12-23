# Example 4: Common Failure Pattern - Network Errors (Missing Route Interception)

**Context**: Test fails with "API call failed" or "500 error" during test execution

**Diagnostic Signature**:

```typescript
// src/testing/healing/network-healing.ts

export type NetworkFailure = {
  errorMessage: string;
  url: string;
  statusCode: number;
  method: string;
};

/**
 * Detect network failure
 */
export function isNetworkFailure(error: Error): boolean {
  const patterns = [
    /api.*call.*failed/i,
    /request.*failed/i,
    /network.*error/i,
    /500.*internal server error/i,
    /503.*service unavailable/i,
    /fetch.*failed/i,
  ];

  return patterns.some((pattern) => pattern.test(error.message));
}

/**
 * Suggest route interception
 */
export function suggestRouteInterception(url: string, method: string): string {
  return `
// ❌ Bad: Real API call (unreliable, slow, external dependency)

// ✅ Good: Mock API response with route interception
await page.route('${url}', route => {
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({
      // Mock response data
      id: 1,
      name: 'Test User',
      email: 'test@example.com'
    })
  })
})

// Then perform action
await page.goto('/page')
  `.trim();
}
```

**Healing Implementation**:

```typescript
// tests/healing/network-healing.spec.ts
import { test, expect } from '@playwright/test';

test('heal network failure with route mocking', async ({ page, context }) => {
  // ✅ Healed: Mock API to prevent real network calls
  await context.route('**/api/products', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        products: [
          { id: 1, name: 'Product A', price: 29.99 },
          { id: 2, name: 'Product B', price: 49.99 },
        ],
      }),
    });
  });

  await page.goto('/products');

  // Test now reliable (no external API dependency)
  await expect(page.getByText('Product A')).toBeVisible();
  await expect(page.getByText('$29.99')).toBeVisible();
});

test('heal 500 error with error state mocking', async ({ page, context }) => {
  // Mock API failure scenario
  await context.route('**/api/products', (route) => {
    route.fulfill({ status: 500, body: JSON.stringify({ error: 'Internal Server Error' }) });
  });

  await page.goto('/products');

  // Verify error handling (not crash)
  await expect(page.getByText('Unable to load products')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Retry' })).toBeVisible();
});
```

**Key Points**:

- Diagnosis: Error message contains "API call failed", "500 error", or network-related failures
- Fix: Add `page.route()` or `cy.intercept()` to mock API responses
- Prevention: Mock ALL external dependencies (APIs, third-party services)
- Automation: Extract URL from error message, generate route interception code

---
