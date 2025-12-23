# Example 3: Telemetry Logging with Context (Sentry Integration)

**Context**: Capture errors with full context for production debugging without exposing secrets.

**Implementation**:

```typescript
// tests/e2e/telemetry-logging.spec.ts
import { test, expect } from '@playwright/test';

/**
 * Telemetry Logging Pattern
 * - Log errors with request context
 * - Redact sensitive data (tokens, passwords, PII)
 * - Integrate with monitoring (Sentry, Datadog)
 * - Validate error logging without exposing secrets
 */

type ErrorLog = {
  level: 'error' | 'warn' | 'info';
  message: string;
  context?: {
    endpoint?: string;
    method?: string;
    statusCode?: number;
    userId?: string;
    sessionId?: string;
  };
  timestamp: string;
};

test.describe('Error Telemetry', () => {
  test('should log API errors with context', async ({ page }) => {
    const errorLogs: ErrorLog[] = [];

    // Capture console errors
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        try {
          const log = JSON.parse(msg.text());
          errorLogs.push(log);
        } catch {
          // Not a structured log, ignore
        }
      }
    });

    // Mock failing API
    await page.route('**/api/orders', (route) =>
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Payment processor unavailable' }),
      }),
    );

    // Act: Trigger error
    await page.goto('/checkout');
    await page.getByTestId('place-order').click();

    // Wait for error UI
    await expect(page.getByTestId('error-message')).toBeVisible();

    // Assert: Error logged with context
    expect(errorLogs).toContainEqual(
      expect.objectContaining({
        level: 'error',
        message: expect.stringContaining('API request failed'),
        context: expect.objectContaining({
          endpoint: '/api/orders',
          method: 'POST',
          statusCode: 500,
          userId: expect.any(String),
        }),
      }),
    );

    // Assert: Sensitive data NOT logged
    const logString = JSON.stringify(errorLogs);
    expect(logString).not.toContain('password');
    expect(logString).not.toContain('token');
    expect(logString).not.toContain('creditCard');
  });

  test('should send errors to Sentry with breadcrumbs', async ({ page }) => {
    const sentryEvents: any[] = [];

    // Mock Sentry SDK
    await page.addInitScript(() => {
      (window as any).Sentry = {
        captureException: (error: Error, context?: any) => {
          (window as any).__SENTRY_EVENTS__ = (window as any).__SENTRY_EVENTS__ || [];
          (window as any).__SENTRY_EVENTS__.push({
            error: error.message,
            context,
            timestamp: Date.now(),
          });
        },
        addBreadcrumb: (breadcrumb: any) => {
          (window as any).__SENTRY_BREADCRUMBS__ = (window as any).__SENTRY_BREADCRUMBS__ || [];
          (window as any).__SENTRY_BREADCRUMBS__.push(breadcrumb);
        },
      };
    });

    // Mock failing API
    await page.route('**/api/users', (route) => route.fulfill({ status: 403, body: { error: 'Forbidden' } }));

    // Act
    await page.goto('/users');

    // Assert: Sentry captured error
    const events = await page.evaluate(() => (window as any).__SENTRY_EVENTS__);
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({
      error: expect.stringContaining('403'),
      context: expect.objectContaining({
        endpoint: '/api/users',
        statusCode: 403,
      }),
    });

    // Assert: Breadcrumbs include user actions
    const breadcrumbs = await page.evaluate(() => (window as any).__SENTRY_BREADCRUMBS__);
    expect(breadcrumbs).toContainEqual(
      expect.objectContaining({
        category: 'navigation',
        message: '/users',
      }),
    );
  });
});
```

**Cypress with Sentry**:

```javascript
// cypress/e2e/telemetry-logging.cy.ts
describe('Error Telemetry', () => {
  it('should log API errors with redacted sensitive data', () => {
    const errorLogs = [];

    // Capture console errors
    cy.on('window:before:load', (win) => {
      cy.stub(win.console, 'error').callsFake((msg) => {
        errorLogs.push(msg);
      });
    });

    // Mock failing API
    cy.intercept('POST', '**/api/orders', {
      statusCode: 500,
      body: { error: 'Payment failed' },
    });

    // Act
    cy.visit('/checkout');
    cy.get('[data-cy="place-order"]').click();

    // Assert: Error logged
    cy.wrap(errorLogs).should('have.length.greaterThan', 0);

    // Assert: Context included
    cy.wrap(errorLogs[0]).should('include', '/api/orders');

    // Assert: Secrets redacted
    cy.wrap(JSON.stringify(errorLogs)).should('not.contain', 'password');
    cy.wrap(JSON.stringify(errorLogs)).should('not.contain', 'creditCard');
  });
});
```

**Error logger utility with redaction**:

```typescript
// src/utils/error-logger.ts
type ErrorContext = {
  endpoint?: string;
  method?: string;
  statusCode?: number;
  userId?: string;
  sessionId?: string;
  requestPayload?: any;
};

const SENSITIVE_KEYS = ['password', 'token', 'creditCard', 'ssn', 'apiKey'];

/**
 * Redact sensitive data from objects
 */
function redactSensitiveData(obj: any): any {
  if (typeof obj !== 'object' || obj === null) return obj;

  const redacted = { ...obj };

  for (const key of Object.keys(redacted)) {
    if (SENSITIVE_KEYS.some((sensitive) => key.toLowerCase().includes(sensitive))) {
      redacted[key] = '[REDACTED]';
    } else if (typeof redacted[key] === 'object') {
      redacted[key] = redactSensitiveData(redacted[key]);
    }
  }

  return redacted;
}

/**
 * Log error with context (Sentry integration)
 */
export function logError(error: Error, context?: ErrorContext) {
  const safeContext = context ? redactSensitiveData(context) : {};

  const errorLog = {
    level: 'error' as const,
    message: error.message,
    stack: error.stack,
    context: safeContext,
    timestamp: new Date().toISOString(),
  };

  // Console (development)
  console.error(JSON.stringify(errorLog));

  // Sentry (production)
  if (typeof window !== 'undefined' && (window as any).Sentry) {
    (window as any).Sentry.captureException(error, {
      contexts: { custom: safeContext },
    });
  }
}
```

**Key Points**:

- **Context-rich logging**: Endpoint, method, status, user ID
- **Secret redaction**: Passwords, tokens, PII removed before logging
- **Sentry integration**: Production monitoring with breadcrumbs
- **Structured logs**: JSON format for easy parsing
- **Test validation**: Assert logs contain context but not secrets

---
