# Example 2: Common Failure Pattern - Race Conditions (Timing Errors)

**Context**: Test fails with "timeout waiting for element" or "element not visible" errors

**Diagnostic Signature**:

```typescript
// src/testing/healing/timing-healing.ts

export type TimingFailure = {
  errorMessage: string;
  testFile: string;
  lineNumber: number;
  actionType: 'click' | 'fill' | 'waitFor' | 'expect';
};

/**
 * Detect race condition failures
 */
export function isTimingFailure(error: Error): boolean {
  const patterns = [
    /timeout.*waiting for/i,
    /element is not visible/i,
    /element is not attached to the dom/i,
    /waiting for element to be visible.*exceeded/i,
    /timed out retrying/i,
    /waitForLoadState.*timeout/i,
  ];

  return patterns.some((pattern) => pattern.test(error.message));
}

/**
 * Detect hard wait anti-pattern
 */
export function hasHardWait(testCode: string): boolean {
  const hardWaitPatterns = [/page\.waitForTimeout\(/, /cy\.wait\(\d+\)/, /await.*sleep\(/, /setTimeout\(/];

  return hardWaitPatterns.some((pattern) => pattern.test(testCode));
}

/**
 * Suggest deterministic wait replacement
 */
export function suggestDeterministicWait(testCode: string): string {
  if (testCode.includes('page.waitForTimeout')) {
    return `
// ❌ Bad: Hard wait (flaky)
// await page.waitForTimeout(3000)

// ✅ Good: Wait for network response
await page.waitForResponse(resp => resp.url().includes('/api/data') && resp.status() === 200)

// OR wait for element state
await page.getByTestId('loading-spinner').waitFor({ state: 'detached' })
    `.trim();
  }

  if (testCode.includes('cy.wait(') && /cy\.wait\(\d+\)/.test(testCode)) {
    return `
// ❌ Bad: Hard wait (flaky)
// cy.wait(3000)

// ✅ Good: Wait for aliased network request
cy.intercept('GET', '/api/data').as('getData')
cy.visit('/page')
cy.wait('@getData')
    `.trim();
  }

  return `
// Add network-first interception BEFORE navigation:
await page.route('**/api/**', route => route.continue())
const responsePromise = page.waitForResponse('**/api/data')
await page.goto('/page')
await responsePromise
  `.trim();
}
```

**Healing Implementation**:

```typescript
// tests/healing/timing-healing.spec.ts
import { test, expect } from '@playwright/test';
import { isTimingFailure, hasHardWait, suggestDeterministicWait } from '../../src/testing/healing/timing-healing';

test('heal race condition with network-first pattern', async ({ page, context }) => {
  // Setup interception BEFORE navigation (prevent race)
  await context.route('**/api/products', (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify({ products: [{ id: 1, name: 'Product A' }] }),
    });
  });

  const responsePromise = page.waitForResponse('**/api/products');

  await page.goto('/products');
  await responsePromise; // Deterministic wait

  // Element now reliably visible (no race condition)
  await expect(page.getByText('Product A')).toBeVisible();
});

test('heal hard wait with event-based wait', async ({ page }) => {
  await page.goto('/dashboard');

  // ❌ Original (flaky): await page.waitForTimeout(3000)

  // ✅ Healed: Wait for spinner to disappear
  await page.getByTestId('loading-spinner').waitFor({ state: 'detached' });

  // Element now reliably visible
  await expect(page.getByText('Dashboard loaded')).toBeVisible();
});
```

**Key Points**:

- Diagnosis: Error contains "timeout" or "not visible", often after navigation
- Fix: Replace hard waits with network-first pattern or element state waits
- Prevention: ALWAYS intercept before navigate, use waitForResponse()
- Automation: Detect `page.waitForTimeout()` or `cy.wait(number)` in test code

---
