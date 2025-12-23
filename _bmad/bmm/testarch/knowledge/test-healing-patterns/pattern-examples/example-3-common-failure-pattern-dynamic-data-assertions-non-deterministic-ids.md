# Example 3: Common Failure Pattern - Dynamic Data Assertions (Non-Deterministic IDs)

**Context**: Test fails with "Expected 'User 123' but received 'User 456'" or timestamp mismatches

**Diagnostic Signature**:

```typescript
// src/testing/healing/data-healing.ts

export type DataFailure = {
  errorMessage: string;
  expectedValue: string;
  actualValue: string;
  testFile: string;
  lineNumber: number;
};

/**
 * Detect dynamic data assertion failures
 */
export function isDynamicDataFailure(error: Error): boolean {
  const patterns = [
    /expected.*\d+.*received.*\d+/i, // ID mismatches
    /expected.*\d{4}-\d{2}-\d{2}.*received/i, // Date mismatches
    /expected.*user.*\d+/i, // Dynamic user IDs
    /expected.*order.*\d+/i, // Dynamic order IDs
    /expected.*to.*contain.*\d+/i, // Numeric assertions
  ];

  return patterns.some((pattern) => pattern.test(error.message));
}

/**
 * Suggest flexible assertion pattern
 */
export function suggestFlexibleAssertion(errorMessage: string): string {
  if (/expected.*user.*\d+/i.test(errorMessage)) {
    return `
// ❌ Bad: Hardcoded ID
// await expect(page.getByText('User 123')).toBeVisible()

// ✅ Good: Regex pattern for any user ID
await expect(page.getByText(/User \\d+/)).toBeVisible()

// OR use partial match
await expect(page.locator('[data-testid="user-name"]')).toContainText('User')
    `.trim();
  }

  if (/expected.*\d{4}-\d{2}-\d{2}/i.test(errorMessage)) {
    return `
// ❌ Bad: Hardcoded date
// await expect(page.getByText('2024-01-15')).toBeVisible()

// ✅ Good: Dynamic date validation
const today = new Date().toISOString().split('T')[0]
await expect(page.getByTestId('created-date')).toHaveText(today)

// OR use date format regex
await expect(page.getByTestId('created-date')).toHaveText(/\\d{4}-\\d{2}-\\d{2}/)
    `.trim();
  }

  if (/expected.*order.*\d+/i.test(errorMessage)) {
    return `
// ❌ Bad: Hardcoded order ID
// const orderId = '12345'

// ✅ Good: Capture dynamic order ID
const orderText = await page.getByTestId('order-id').textContent()
const orderId = orderText?.match(/Order #(\\d+)/)?.[1]
expect(orderId).toBeTruthy()

// Use captured ID in later assertions
await expect(page.getByText(\`Order #\${orderId} confirmed\`)).toBeVisible()
    `.trim();
  }

  return `Use regex patterns, partial matching, or capture dynamic values instead of hardcoding`;
}
```

**Healing Implementation**:

```typescript
// tests/healing/data-healing.spec.ts
import { test, expect } from '@playwright/test';

test('heal dynamic ID assertion with regex', async ({ page }) => {
  await page.goto('/users');

  // ❌ Original (fails with random IDs): await expect(page.getByText('User 123')).toBeVisible()

  // ✅ Healed: Regex pattern matches any user ID
  await expect(page.getByText(/User \d+/)).toBeVisible();
});

test('heal timestamp assertion with dynamic generation', async ({ page }) => {
  await page.goto('/dashboard');

  // ❌ Original (fails daily): await expect(page.getByText('2024-01-15')).toBeVisible()

  // ✅ Healed: Generate expected date dynamically
  const today = new Date().toISOString().split('T')[0];
  await expect(page.getByTestId('last-updated')).toContainText(today);
});

test('heal order ID assertion with capture', async ({ page, request }) => {
  // Create order via API (dynamic ID)
  const response = await request.post('/api/orders', {
    data: { productId: '123', quantity: 1 },
  });
  const { orderId } = await response.json();

  // ✅ Healed: Use captured dynamic ID
  await page.goto(`/orders/${orderId}`);
  await expect(page.getByText(`Order #${orderId}`)).toBeVisible();
});
```

**Key Points**:

- Diagnosis: Error message shows expected vs actual value mismatch with IDs/timestamps
- Fix: Use regex patterns (`/User \d+/`), partial matching, or capture dynamic values
- Prevention: Never hardcode IDs, timestamps, or random data in assertions
- Automation: Parse error message for expected/actual values, suggest regex patterns

---
