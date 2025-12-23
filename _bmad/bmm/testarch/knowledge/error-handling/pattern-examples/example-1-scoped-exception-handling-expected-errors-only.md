# Example 1: Scoped Exception Handling (Expected Errors Only)

**Context**: Handle known errors (Network failures, expected 500s) without masking unexpected bugs.

**Implementation**:

```typescript
// tests/e2e/error-handling.spec.ts
import { test, expect } from '@playwright/test';

/**
 * Scoped Error Handling Pattern
 * - Only ignore specific, documented errors
 * - Rethrow everything else to catch regressions
 * - Validate error UI and user experience
 */

test.describe('API Error Handling', () => {
  test('should display error message when API returns 500', async ({ page }) => {
    // Scope error handling to THIS test only
    const consoleErrors: string[] = [];
    page.on('pageerror', (error) => {
      // Only swallow documented NetworkError
      if (error.message.includes('NetworkError: Failed to fetch')) {
        consoleErrors.push(error.message);
        return; // Swallow this specific error
      }
      // Rethrow all other errors (catch regressions!)
      throw error;
    });

    // Arrange: Mock 500 error response
    await page.route('**/api/users', (route) =>
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Internal server error',
          code: 'INTERNAL_ERROR',
        }),
      }),
    );

    // Act: Navigate to page that fetches users
    await page.goto('/dashboard');

    // Assert: Error UI displayed
    await expect(page.getByTestId('error-message')).toBeVisible();
    await expect(page.getByTestId('error-message')).toContainText(/error.*loading|failed.*load/i);

    // Assert: Retry button visible
    await expect(page.getByTestId('retry-button')).toBeVisible();

    // Assert: NetworkError was thrown and caught
    expect(consoleErrors).toContainEqual(expect.stringContaining('NetworkError'));
  });

  test('should NOT swallow unexpected errors', async ({ page }) => {
    let unexpectedError: Error | null = null;

    page.on('pageerror', (error) => {
      // Capture but don't swallow - test should fail
      unexpectedError = error;
      throw error;
    });

    // Arrange: App has JavaScript error (bug)
    await page.addInitScript(() => {
      // Simulate bug in app code
      (window as any).buggyFunction = () => {
        throw new Error('UNEXPECTED BUG: undefined is not a function');
      };
    });

    await page.goto('/dashboard');

    // Trigger buggy function
    await page.evaluate(() => (window as any).buggyFunction());

    // Assert: Test fails because unexpected error was NOT swallowed
    expect(unexpectedError).not.toBeNull();
    expect(unexpectedError?.message).toContain('UNEXPECTED BUG');
  });
});
```

**Cypress equivalent**:

```javascript
// cypress/e2e/error-handling.cy.ts
describe('API Error Handling', () => {
  it('should display error message when API returns 500', () => {
    // Scoped to this test only
    cy.on('uncaught:exception', (err) => {
      // Only swallow documented NetworkError
      if (err.message.includes('NetworkError')) {
        return false; // Prevent test failure
      }
      // All other errors fail the test
      return true;
    });

    // Arrange: Mock 500 error
    cy.intercept('GET', '**/api/users', {
      statusCode: 500,
      body: {
        error: 'Internal server error',
        code: 'INTERNAL_ERROR',
      },
    }).as('getUsers');

    // Act
    cy.visit('/dashboard');
    cy.wait('@getUsers');

    // Assert: Error UI
    cy.get('[data-cy="error-message"]').should('be.visible');
    cy.get('[data-cy="error-message"]').should('contain', 'error loading');
    cy.get('[data-cy="retry-button"]').should('be.visible');
  });

  it('should NOT swallow unexpected errors', () => {
    // No exception handler - test should fail on unexpected errors

    cy.visit('/dashboard');

    // Trigger unexpected error
    cy.window().then((win) => {
      // This should fail the test
      win.eval('throw new Error("UNEXPECTED BUG")');
    });

    // Test fails (as expected) - validates error detection works
  });
});
```

**Key Points**:

- **Scoped handling**: page.on() / cy.on() scoped to specific tests
- **Explicit allow-list**: Only ignore documented errors
- **Rethrow unexpected**: Catch regressions by failing on unknown errors
- **Error UI validation**: Assert user sees error message
- **Logging**: Capture errors for debugging, don't swallow silently

---
