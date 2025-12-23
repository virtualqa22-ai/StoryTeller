# Example 3: Artifact Output Configuration

**Context**: When debugging failures in CI, configure artifacts (screenshots, videos, traces, HTML reports) to be captured on failure and stored in consistent locations for upload.

**Implementation**:

```typescript
// playwright.config.ts - Artifact configuration
import { defineConfig } from '@playwright/test';
import path from 'path';

export default defineConfig({
  // Output directory for test artifacts
  outputDir: path.resolve(__dirname, './test-results'),

  use: {
    // Screenshot on failure only (saves space)
    screenshot: 'only-on-failure',

    // Video recording on failure + retry
    video: 'retain-on-failure',

    // Trace recording on first retry (best debugging data)
    trace: 'on-first-retry',
  },

  reporter: [
    // HTML report (visual, interactive)
    [
      'html',
      {
        outputFolder: 'playwright-report',
        open: 'never', // Don't auto-open in CI
      },
    ],

    // JUnit XML (CI integration)
    [
      'junit',
      {
        outputFile: 'test-results/results.xml',
      },
    ],

    // List reporter (console output)
    ['list'],
  ],
});
```

```typescript
// playwright/support/fixtures/artifact-fixture.ts - Custom artifact capture
import { test as base } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export const test = base.extend({
  // Auto-capture console logs on failure
  page: async ({ page }, use, testInfo) => {
    const logs: string[] = [];

    page.on('console', (msg) => {
      logs.push(`[${msg.type()}] ${msg.text()}`);
    });

    await use(page);

    // Save logs on failure
    if (testInfo.status !== testInfo.expectedStatus) {
      const logsPath = path.join(testInfo.outputDir, 'console-logs.txt');
      fs.writeFileSync(logsPath, logs.join('\n'));
      testInfo.attachments.push({
        name: 'console-logs',
        contentType: 'text/plain',
        path: logsPath,
      });
    }
  },
});
```

```yaml
# .github/workflows/e2e.yml - CI artifact upload
name: E2E Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run tests
        run: npm run test
        env:
          TEST_ENV: staging

      # Upload test artifacts on failure
      - name: Upload test results
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: test-results
          path: test-results/
          retention-days: 30

      - name: Upload Playwright report
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

```typescript
// Example: Custom screenshot on specific condition
test('capture screenshot on specific error', async ({ page }) => {
  await page.goto('/checkout');

  try {
    await page.click('[data-testid="submit-payment"]');
    await expect(page.getByText('Order Confirmed')).toBeVisible();
  } catch (error) {
    // Capture custom screenshot with timestamp
    await page.screenshot({
      path: `test-results/payment-error-${Date.now()}.png`,
      fullPage: true,
    });
    throw error;
  }
});
```

**Key Points**:

- `screenshot: 'only-on-failure'` saves space (not every test)
- `video: 'retain-on-failure'` captures full flow on failures
- `trace: 'on-first-retry'` provides deep debugging data (network, DOM, console)
- HTML report at `playwright-report/` (visual debugging)
- JUnit XML at `test-results/results.xml` (CI integration)
- CI uploads artifacts on failure with 30-day retention
- Custom fixture can capture console logs, network logs, etc.
