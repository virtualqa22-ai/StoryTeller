# Example 1: Common Failure Pattern - Stale Selectors (Element Not Found)

**Context**: Test fails with "Element not found" or "Locator resolved to 0 elements" errors

**Diagnostic Signature**:

```typescript
// src/testing/healing/selector-healing.ts

export type SelectorFailure = {
  errorMessage: string;
  stackTrace: string;
  selector: string;
  testFile: string;
  lineNumber: number;
};

/**
 * Detect stale selector failures
 */
export function isSelectorFailure(error: Error): boolean {
  const patterns = [
    /locator.*resolved to 0 elements/i,
    /element not found/i,
    /waiting for locator.*to be visible/i,
    /selector.*did not match any elements/i,
    /unable to find element/i,
  ];

  return patterns.some((pattern) => pattern.test(error.message));
}

/**
 * Extract selector from error message
 */
export function extractSelector(errorMessage: string): string | null {
  // Playwright: "locator('button[type=\"submit\"]') resolved to 0 elements"
  const playwrightMatch = errorMessage.match(/locator\('([^']+)'\)/);
  if (playwrightMatch) return playwrightMatch[1];

  // Cypress: "Timed out retrying: Expected to find element: '.submit-button'"
  const cypressMatch = errorMessage.match(/Expected to find element: ['"]([^'"]+)['"]/i);
  if (cypressMatch) return cypressMatch[1];

  return null;
}

/**
 * Suggest better selector based on hierarchy
 */
export function suggestBetterSelector(badSelector: string): string {
  // If using CSS class → suggest data-testid
  if (badSelector.startsWith('.') || badSelector.includes('class=')) {
    const elementName = badSelector.match(/class=["']([^"']+)["']/)?.[1] || badSelector.slice(1);
    return `page.getByTestId('${elementName}') // Prefer data-testid over CSS class`;
  }

  // If using ID → suggest data-testid
  if (badSelector.startsWith('#')) {
    return `page.getByTestId('${badSelector.slice(1)}') // Prefer data-testid over ID`;
  }

  // If using nth() → suggest filter() or more specific selector
  if (badSelector.includes('.nth(')) {
    return `page.locator('${badSelector.split('.nth(')[0]}').filter({ hasText: 'specific text' }) // Avoid brittle nth(), use filter()`;
  }

  // If using complex CSS → suggest ARIA role
  if (badSelector.includes('>') || badSelector.includes('+')) {
    return `page.getByRole('button', { name: 'Submit' }) // Prefer ARIA roles over complex CSS`;
  }

  return `page.getByTestId('...') // Add data-testid attribute to element`;
}
```

**Healing Implementation**:

```typescript
// tests/healing/selector-healing.spec.ts
import { test, expect } from '@playwright/test';
import { isSelectorFailure, extractSelector, suggestBetterSelector } from '../../src/testing/healing/selector-healing';

test('heal stale selector failures automatically', async ({ page }) => {
  await page.goto('/dashboard');

  try {
    // Original test with brittle CSS selector
    await page.locator('.btn-primary').click();
  } catch (error: any) {
    if (isSelectorFailure(error)) {
      const badSelector = extractSelector(error.message);
      const suggestion = badSelector ? suggestBetterSelector(badSelector) : null;

      console.log('HEALING SUGGESTION:', suggestion);

      // Apply healed selector
      await page.getByTestId('submit-button').click(); // Fixed!
    } else {
      throw error; // Not a selector issue, rethrow
    }
  }

  await expect(page.getByText('Success')).toBeVisible();
});
```

**Key Points**:

- Diagnosis: Error message contains "locator resolved to 0 elements" or "element not found"
- Fix: Replace brittle selector (CSS class, ID, nth) with robust alternative (data-testid, ARIA role)
- Prevention: Follow selector hierarchy (data-testid > ARIA > text > CSS)
- Automation: Pattern matching on error message + stack trace

---
