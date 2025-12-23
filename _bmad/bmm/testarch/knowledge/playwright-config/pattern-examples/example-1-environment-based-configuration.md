# Example 1: Environment-Based Configuration

**Context**: When testing against multiple environments (local, staging, production), use a central config map that loads environment-specific settings and fails fast if `TEST_ENV` is invalid.

**Implementation**:

```typescript
// playwright.config.ts - Central config loader
import { config as dotenvConfig } from 'dotenv';
import path from 'path';

// Load .env from project root
dotenvConfig({
  path: path.resolve(__dirname, '../../.env'),
});

// Central environment config map
const envConfigMap = {
  local: require('./playwright/config/local.config').default,
  staging: require('./playwright/config/staging.config').default,
  production: require('./playwright/config/production.config').default,
};

const environment = process.env.TEST_ENV || 'local';

// Fail fast if environment not supported
if (!Object.keys(envConfigMap).includes(environment)) {
  console.error(`❌ No configuration found for environment: ${environment}`);
  console.error(`   Available environments: ${Object.keys(envConfigMap).join(', ')}`);
  process.exit(1);
}

console.log(`✅ Running tests against: ${environment.toUpperCase()}`);

export default envConfigMap[environment as keyof typeof envConfigMap];
```

```typescript
// playwright/config/base.config.ts - Shared base configuration
import { defineConfig } from '@playwright/test';
import path from 'path';

export const baseConfig = defineConfig({
  testDir: path.resolve(__dirname, '../tests'),
  outputDir: path.resolve(__dirname, '../../test-results'),
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['list'],
  ],
  use: {
    actionTimeout: 15000,
    navigationTimeout: 30000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  globalSetup: path.resolve(__dirname, '../support/global-setup.ts'),
  timeout: 60000,
  expect: { timeout: 10000 },
});
```

```typescript
// playwright/config/local.config.ts - Local environment
import { defineConfig } from '@playwright/test';
import { baseConfig } from './base.config';

export default defineConfig({
  ...baseConfig,
  use: {
    ...baseConfig.use,
    baseURL: 'http://localhost:3000',
    video: 'off', // No video locally for speed
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
```

```typescript
// playwright/config/staging.config.ts - Staging environment
import { defineConfig } from '@playwright/test';
import { baseConfig } from './base.config';

export default defineConfig({
  ...baseConfig,
  use: {
    ...baseConfig.use,
    baseURL: 'https://staging.example.com',
    ignoreHTTPSErrors: true, // Allow self-signed certs in staging
  },
});
```

```typescript
// playwright/config/production.config.ts - Production environment
import { defineConfig } from '@playwright/test';
import { baseConfig } from './base.config';

export default defineConfig({
  ...baseConfig,
  retries: 3, // More retries in production
  use: {
    ...baseConfig.use,
    baseURL: 'https://example.com',
    video: 'on', // Always record production failures
  },
});
```

```bash
# .env.example - Template for developers
TEST_ENV=local
API_KEY=your_api_key_here
DATABASE_URL=postgresql://localhost:5432/test_db
```

**Key Points**:

- Central `envConfigMap` prevents environment misconfiguration
- Fail-fast validation with clear error message (available envs listed)
- Base config defines shared settings, environment configs override
- `.env.example` provides template for required secrets
- `TEST_ENV=local` as default for local development
- Production config increases retries and enables video recording
