# Example 4: Maintainability NFR Validation (CI Tools, Not Playwright)

**Context**: Use proper CI tools for code quality validation (coverage, duplication, vulnerabilities)

**Implementation**:

```yaml
# .github/workflows/nfr-maintainability.yml
name: NFR - Maintainability

on: [push, pull_request]

jobs:
  test-coverage:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4

      - name: Install dependencies
        run: npm ci

      - name: Run tests with coverage
        run: npm run test:coverage

      - name: Check coverage threshold (80% minimum)
        run: |
          COVERAGE=$(jq '.total.lines.pct' coverage/coverage-summary.json)
          echo "Coverage: $COVERAGE%"
          if (( $(echo "$COVERAGE < 80" | bc -l) )); then
            echo "❌ FAIL: Coverage $COVERAGE% below 80% threshold"
            exit 1
          else
            echo "✅ PASS: Coverage $COVERAGE% meets 80% threshold"
          fi

  code-duplication:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4

      - name: Check code duplication (<5% allowed)
        run: |
          npx jscpd src/ --threshold 5 --format json --output duplication.json
          DUPLICATION=$(jq '.statistics.total.percentage' duplication.json)
          echo "Duplication: $DUPLICATION%"
          if (( $(echo "$DUPLICATION >= 5" | bc -l) )); then
            echo "❌ FAIL: Duplication $DUPLICATION% exceeds 5% threshold"
            exit 1
          else
            echo "✅ PASS: Duplication $DUPLICATION% below 5% threshold"
          fi

  vulnerability-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4

      - name: Install dependencies
        run: npm ci

      - name: Run npm audit (no critical/high vulnerabilities)
        run: |
          npm audit --json > audit.json || true
          CRITICAL=$(jq '.metadata.vulnerabilities.critical' audit.json)
          HIGH=$(jq '.metadata.vulnerabilities.high' audit.json)
          echo "Critical: $CRITICAL, High: $HIGH"
          if [ "$CRITICAL" -gt 0 ] || [ "$HIGH" -gt 0 ]; then
            echo "❌ FAIL: Found $CRITICAL critical and $HIGH high vulnerabilities"
            npm audit
            exit 1
          else
            echo "✅ PASS: No critical/high vulnerabilities"
          fi
```

**Playwright Tests for Observability (E2E Validation):**

```typescript
// tests/nfr/observability.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Maintainability NFR: Observability Validation', () => {
  test('critical errors are reported to monitoring service', async ({ page, context }) => {
    const sentryEvents: any[] = [];

    // Mock Sentry SDK to verify error tracking
    await context.addInitScript(() => {
      (window as any).Sentry = {
        captureException: (error: Error) => {
          console.log('SENTRY_CAPTURE:', JSON.stringify({ message: error.message, stack: error.stack }));
        },
      };
    });

    page.on('console', (msg) => {
      if (msg.text().includes('SENTRY_CAPTURE:')) {
        sentryEvents.push(JSON.parse(msg.text().replace('SENTRY_CAPTURE:', '')));
      }
    });

    // Trigger error by mocking API failure
    await context.route('**/api/products', (route) => {
      route.fulfill({ status: 500, body: JSON.stringify({ error: 'Database Error' }) });
    });

    await page.goto('/products');

    // Wait for error UI and Sentry capture
    await expect(page.getByText('Unable to load products')).toBeVisible();

    // Verify error was captured by monitoring
    expect(sentryEvents.length).toBeGreaterThan(0);
    expect(sentryEvents[0]).toHaveProperty('message');
    expect(sentryEvents[0]).toHaveProperty('stack');
  });

  test('API response times are tracked in telemetry', async ({ request }) => {
    const response = await request.get('/api/products?limit=10');

    expect(response.ok()).toBeTruthy();

    // Verify Server-Timing header for APM (Application Performance Monitoring)
    const serverTiming = response.headers()['server-timing'];

    expect(serverTiming).toBeTruthy();
    expect(serverTiming).toContain('db'); // Database query time
    expect(serverTiming).toContain('total'); // Total processing time
  });

  test('structured logging present in application', async ({ request }) => {
    // Make API call that generates logs
    const response = await request.post('/api/orders', {
      data: { productId: '123', quantity: 2 },
    });

    expect(response.ok()).toBeTruthy();

    // Note: In real scenarios, validate logs in monitoring system (Datadog, CloudWatch)
    // This test validates the logging contract exists (Server-Timing, trace IDs in headers)
    const traceId = response.headers()['x-trace-id'];
    expect(traceId).toBeTruthy(); // Confirms structured logging with correlation IDs
  });
});
```

**Key Points**:

- **Coverage/duplication**: CI jobs (GitHub Actions), not Playwright tests
- **Vulnerability scanning**: npm audit in CI, not Playwright tests
- **Observability**: Playwright validates error tracking (Sentry) and telemetry headers
- **Structured logging**: Validate logging contract (trace IDs, Server-Timing headers)
- **Separation of concerns**: Build-time checks (coverage, audit) vs runtime checks (error tracking, telemetry)

**Maintainability NFR Criteria**:

- ✅ PASS: Clean code (80%+ coverage from CI, <5% duplication from CI), observability validated in E2E, no critical vulnerabilities from npm audit
- ⚠️ CONCERNS: Duplication >5%, coverage 60-79%, or unclear ownership
- ❌ FAIL: Absent tests (<60%), tangled implementations (>10% duplication), or no observability

---
