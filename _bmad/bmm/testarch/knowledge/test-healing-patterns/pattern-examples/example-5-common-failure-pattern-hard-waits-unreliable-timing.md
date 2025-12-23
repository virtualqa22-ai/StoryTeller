# Example 5: Common Failure Pattern - Hard Waits (Unreliable Timing)

**Context**: Test fails intermittently with "timeout exceeded" or passes/fails randomly

**Diagnostic Signature**:

```typescript
// src/testing/healing/hard-wait-healing.ts

/**
 * Detect hard wait anti-pattern in test code
 */
export function detectHardWaits(testCode: string): Array<{ line: number; code: string }> {
  const lines = testCode.split('\n');
  const violations: Array<{ line: number; code: string }> = [];

  lines.forEach((line, index) => {
    if (line.includes('page.waitForTimeout(') || /cy\.wait\(\d+\)/.test(line) || line.includes('sleep(') || line.includes('setTimeout(')) {
      violations.push({ line: index + 1, code: line.trim() });
    }
  });

  return violations;
}

/**
 * Suggest event-based wait replacement
 */
export function suggestEventBasedWait(hardWaitLine: string): string {
  if (hardWaitLine.includes('page.waitForTimeout')) {
    return `
// ❌ Bad: Hard wait (flaky)
${hardWaitLine}

// ✅ Good: Wait for network response
await page.waitForResponse(resp => resp.url().includes('/api/') && resp.ok())

// OR wait for element state change
await page.getByTestId('loading-spinner').waitFor({ state: 'detached' })
await page.getByTestId('content').waitFor({ state: 'visible' })
    `.trim();
  }

  if (/cy\.wait\(\d+\)/.test(hardWaitLine)) {
    return `
// ❌ Bad: Hard wait (flaky)
${hardWaitLine}

// ✅ Good: Wait for aliased request
cy.intercept('GET', '/api/data').as('getData')
cy.visit('/page')
cy.wait('@getData') // Deterministic
    `.trim();
  }

  return 'Replace hard waits with event-based waits (waitForResponse, waitFor state changes)';
}
```

**Healing Implementation**:

```typescript
// tests/healing/hard-wait-healing.spec.ts
import { test, expect } from '@playwright/test';

test('heal hard wait with deterministic wait', async ({ page }) => {
  await page.goto('/dashboard');

  // ❌ Original (flaky): await page.waitForTimeout(3000)

  // ✅ Healed: Wait for loading spinner to disappear
  await page.getByTestId('loading-spinner').waitFor({ state: 'detached' });

  // OR wait for specific network response
  await page.waitForResponse((resp) => resp.url().includes('/api/dashboard') && resp.ok());

  await expect(page.getByText('Dashboard ready')).toBeVisible();
});

test('heal implicit wait with explicit network wait', async ({ page }) => {
  const responsePromise = page.waitForResponse('**/api/products');

  await page.goto('/products');

  // ❌ Original (race condition): await page.getByText('Product A').click()

  // ✅ Healed: Wait for network first
  await responsePromise;
  await page.getByText('Product A').click();

  await expect(page).toHaveURL(/\/products\/\d+/);
});
```

**Key Points**:

- Diagnosis: Test code contains `page.waitForTimeout()` or `cy.wait(number)`
- Fix: Replace with `waitForResponse()`, `waitFor({ state })`, or aliased intercepts
- Prevention: NEVER use hard waits, always use event-based/response-based waits
- Automation: Scan test code for hard wait patterns, suggest deterministic replacements

---
