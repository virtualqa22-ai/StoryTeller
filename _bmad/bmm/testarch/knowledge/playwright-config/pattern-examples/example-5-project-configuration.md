# Example 5: Project Configuration

**Context**: When testing across multiple browsers, devices, or configurations, use Playwright projects to run the same tests against different environments (chromium, firefox, webkit, mobile).

**Implementation**:

```typescript
// playwright.config.ts - Multiple browser projects
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    // Desktop browsers
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Mobile browsers
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 13'] },
    },

    // Tablet
    {
      name: 'tablet',
      use: { ...devices['iPad Pro'] },
    },
  ],
});
```

```typescript
// playwright.config.ts - Authenticated vs. unauthenticated projects
import { defineConfig } from '@playwright/test';
import path from 'path';

export default defineConfig({
  projects: [
    // Setup project (runs first, creates auth state)
    {
      name: 'setup',
      testMatch: /global-setup\.ts/,
    },

    // Authenticated tests (reuse auth state)
    {
      name: 'authenticated',
      dependencies: ['setup'],
      use: {
        storageState: path.resolve(__dirname, './playwright/.auth/user.json'),
      },
      testMatch: /.*authenticated\.spec\.ts/,
    },

    // Unauthenticated tests (public pages)
    {
      name: 'unauthenticated',
      testMatch: /.*unauthenticated\.spec\.ts/,
    },
  ],
});
```

```typescript
// playwright/support/global-setup.ts - Setup project for auth
import { chromium, FullConfig } from '@playwright/test';
import path from 'path';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Perform authentication
  await page.goto('http://localhost:3000/login');
  await page.fill('[data-testid="email"]', 'test@example.com');
  await page.fill('[data-testid="password"]', 'password123');
  await page.click('[data-testid="login-button"]');

  // Wait for authentication to complete
  await page.waitForURL('**/dashboard');

  // Save authentication state
  await page.context().storageState({
    path: path.resolve(__dirname, '../.auth/user.json'),
  });

  await browser.close();
}

export default globalSetup;
```

```bash
# Run specific project
npx playwright test --project=chromium
npx playwright test --project=mobile-chrome
npx playwright test --project=authenticated

# Run multiple projects
npx playwright test --project=chromium --project=firefox

# Run all projects (default)
npx playwright test
```

```typescript
// Usage: Project-specific test
import { test, expect } from '@playwright/test';

test('mobile navigation works', async ({ page, isMobile }) => {
  await page.goto('/');

  if (isMobile) {
    // Open mobile menu
    await page.click('[data-testid="hamburger-menu"]');
  }

  await page.click('[data-testid="products-link"]');
  await expect(page).toHaveURL(/.*products/);
});
```

```yaml
# .github/workflows/e2e-cross-browser.yml - CI cross-browser testing
name: E2E Tests (Cross-Browser)
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        project: [chromium, firefox, webkit, mobile-chrome]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx playwright install --with-deps

      - name: Run tests (${{ matrix.project }})
        run: npx playwright test --project=${{ matrix.project }}
```

**Key Points**:

- Projects enable testing across browsers, devices, and configurations
- `devices` from `@playwright/test` provide preset configurations (Pixel 5, iPhone 13, etc.)
- `dependencies` ensures setup project runs first (auth, data seeding)
- `storageState` shares authentication across tests (0 seconds auth per test)
- `testMatch` filters which tests run in which project
- CI matrix strategy runs projects in parallel (4x faster with 4 projects)
- `isMobile` context property for conditional logic in tests
