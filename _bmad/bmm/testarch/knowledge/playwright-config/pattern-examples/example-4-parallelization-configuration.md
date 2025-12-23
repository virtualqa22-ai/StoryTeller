# Example 4: Parallelization Configuration

**Context**: When tests run slowly in CI, configure parallelization with worker count, sharding, and fully parallel execution to maximize speed while maintaining stability.

**Implementation**:

```typescript
// playwright.config.ts - Parallelization settings
import { defineConfig } from '@playwright/test';
import os from 'os';

export default defineConfig({
  // Run tests in parallel within single file
  fullyParallel: true,

  // Worker configuration
  workers: process.env.CI
    ? 1 // Serial in CI for stability (or 2 for faster CI)
    : os.cpus().length - 1, // Parallel locally (leave 1 CPU for OS)

  // Prevent accidentally committed .only() from blocking CI
  forbidOnly: !!process.env.CI,

  // Retry failed tests in CI
  retries: process.env.CI ? 2 : 0,

  // Shard configuration (split tests across multiple machines)
  shard:
    process.env.SHARD_INDEX && process.env.SHARD_TOTAL
      ? {
          current: parseInt(process.env.SHARD_INDEX, 10),
          total: parseInt(process.env.SHARD_TOTAL, 10),
        }
      : undefined,
});
```

```yaml
# .github/workflows/e2e-parallel.yml - Sharded CI execution
name: E2E Tests (Parallel)
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        shard: [1, 2, 3, 4] # Split tests across 4 machines
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run tests (shard ${{ matrix.shard }})
        run: npm run test
        env:
          SHARD_INDEX: ${{ matrix.shard }}
          SHARD_TOTAL: 4
          TEST_ENV: staging

      - name: Upload test results
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: test-results-shard-${{ matrix.shard }}
          path: test-results/
```

```typescript
// playwright/config/serial.config.ts - Serial execution for flaky tests
import { defineConfig } from '@playwright/test';
import { baseConfig } from './base.config';

export default defineConfig({
  ...baseConfig,

  // Disable parallel execution
  fullyParallel: false,
  workers: 1,

  // Used for: authentication flows, database-dependent tests, feature flag tests
});
```

```typescript
// Usage: Force serial execution for specific tests
import { test } from '@playwright/test';

// Serial execution for auth tests (shared session state)
test.describe.configure({ mode: 'serial' });

test.describe('Authentication Flow', () => {
  test('user can log in', async ({ page }) => {
    // First test in serial block
  });

  test('user can access dashboard', async ({ page }) => {
    // Depends on previous test (serial)
  });
});
```

```typescript
// Usage: Parallel execution for independent tests (default)
import { test } from '@playwright/test';

test.describe('Product Catalog', () => {
  test('can view product 1', async ({ page }) => {
    // Runs in parallel with other tests
  });

  test('can view product 2', async ({ page }) => {
    // Runs in parallel with other tests
  });
});
```

**Key Points**:

- `fullyParallel: true` enables parallel execution within single test file
- Workers: 1 in CI (stability), N-1 CPUs locally (speed)
- Sharding splits tests across multiple CI machines (4x faster with 4 shards)
- `test.describe.configure({ mode: 'serial' })` for dependent tests
- `forbidOnly: true` in CI prevents `.only()` from blocking pipeline
- Matrix strategy in CI runs shards concurrently
