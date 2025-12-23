# Example 2: Timeout Standards

**Context**: When tests fail due to inconsistent timeout settings, standardize timeouts across all tests: action 15s, navigation 30s, expect 10s, test 60s. Expose overrides through fixtures rather than inline literals.

**Implementation**:

```typescript
// playwright/config/base.config.ts - Standardized timeouts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Global test timeout: 60 seconds
  timeout: 60000,

  use: {
    // Action timeout: 15 seconds (click, fill, etc.)
    actionTimeout: 15000,

    // Navigation timeout: 30 seconds (page.goto, page.reload)
    navigationTimeout: 30000,
  },

  // Expect timeout: 10 seconds (all assertions)
  expect: {
    timeout: 10000,
  },
});
```

```typescript
// playwright/support/fixtures/timeout-fixture.ts - Timeout override fixture
import { test as base } from '@playwright/test';

type TimeoutOptions = {
  extendedTimeout: (timeoutMs: number) => Promise<void>;
};

export const test = base.extend<TimeoutOptions>({
  extendedTimeout: async ({}, use, testInfo) => {
    const originalTimeout = testInfo.timeout;

    await use(async (timeoutMs: number) => {
      testInfo.setTimeout(timeoutMs);
    });

    // Restore original timeout after test
    testInfo.setTimeout(originalTimeout);
  },
});

export { expect } from '@playwright/test';
```

```typescript
// Usage in tests - Standard timeouts (implicit)
import { test, expect } from '@playwright/test';

test('user can log in', async ({ page }) => {
  await page.goto('/login'); // Uses 30s navigation timeout
  await page.fill('[data-testid="email"]', 'test@example.com'); // Uses 15s action timeout
  await page.click('[data-testid="login-button"]'); // Uses 15s action timeout

  await expect(page.getByText('Welcome')).toBeVisible(); // Uses 10s expect timeout
});
```

```typescript
// Usage in tests - Per-test timeout override
import { test, expect } from '../support/fixtures/timeout-fixture';

test('slow data processing operation', async ({ page, extendedTimeout }) => {
  // Override default 60s timeout for this slow test
  await extendedTimeout(180000); // 3 minutes

  await page.goto('/data-processing');
  await page.click('[data-testid="process-large-file"]');

  // Wait for long-running operation
  await expect(page.getByText('Processing complete')).toBeVisible({
    timeout: 120000, // 2 minutes for assertion
  });
});
```

```typescript
// Per-assertion timeout override (inline)
test('API returns quickly', async ({ page }) => {
  await page.goto('/dashboard');

  // Override expect timeout for fast API (reduce flakiness detection)
  await expect(page.getByTestId('user-name')).toBeVisible({ timeout: 5000 }); // 5s instead of 10s

  // Override expect timeout for slow external API
  await expect(page.getByTestId('weather-widget')).toBeVisible({ timeout: 20000 }); // 20s instead of 10s
});
```

**Key Points**:

- **Standardized timeouts**: action 15s, navigation 30s, expect 10s, test 60s (global defaults)
- Fixture-based override (`extendedTimeout`) for slow tests (preferred over inline)
- Per-assertion timeout override via `{ timeout: X }` option (use sparingly)
- Avoid hard waits (`page.waitForTimeout(3000)`) - use event-based waits instead
- CI environments may need longer timeouts (handle in environment-specific config)
