# Example 2: Spec Filter Pattern (File-Based Selection)

**Context**: Run tests by file path pattern or directory for targeted execution.

**Implementation**:

```bash
#!/bin/bash
# scripts/selective-spec-runner.sh
# Run tests based on spec file patterns

set -e

PATTERN=${1:-"**/*.spec.ts"}
TEST_ENV=${TEST_ENV:-local}

echo "🎯 Selective Spec Runner"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Pattern: $PATTERN"
echo "Environment: $TEST_ENV"
echo ""

# Pattern examples and their use cases
case "$PATTERN" in
  "**/checkout*")
    echo "📦 Running checkout-related tests"
    npx playwright test --grep-files="**/checkout*"
    ;;
  "**/auth*"|"**/login*"|"**/signup*")
    echo "🔐 Running authentication tests"
    npx playwright test --grep-files="**/auth*|**/login*|**/signup*"
    ;;
  "tests/e2e/**")
    echo "🌐 Running all E2E tests"
    npx playwright test tests/e2e/
    ;;
  "tests/integration/**")
    echo "🔌 Running all integration tests"
    npx playwright test tests/integration/
    ;;
  "tests/component/**")
    echo "🧩 Running all component tests"
    npx playwright test tests/component/
    ;;
  *)
    echo "🔍 Running tests matching pattern: $PATTERN"
    npx playwright test "$PATTERN"
    ;;
esac
```

**Playwright config for file filtering**:

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // ... other config

  // Project-based organization
  projects: [
    {
      name: 'smoke',
      testMatch: /.*smoke.*\.spec\.ts/,
      retries: 0,
    },
    {
      name: 'e2e',
      testMatch: /tests\/e2e\/.*\.spec\.ts/,
      retries: 2,
    },
    {
      name: 'integration',
      testMatch: /tests\/integration\/.*\.spec\.ts/,
      retries: 1,
    },
    {
      name: 'component',
      testMatch: /tests\/component\/.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
```

**Advanced pattern matching**:

```typescript
// scripts/run-by-component.ts
/**
 * Run tests related to specific component(s)
 * Usage: npm run test:component UserProfile,Settings
 */

import { execSync } from 'child_process';

const components = process.argv[2]?.split(',') || [];

if (components.length === 0) {
  console.error('❌ No components specified');
  console.log('Usage: npm run test:component UserProfile,Settings');
  process.exit(1);
}

// Convert component names to glob patterns
const patterns = components.map((comp) => `**/*${comp}*.spec.ts`).join(' ');

console.log(`🧩 Running tests for components: ${components.join(', ')}`);
console.log(`Patterns: ${patterns}`);

try {
  execSync(`npx playwright test ${patterns}`, {
    stdio: 'inherit',
    env: { ...process.env, CI: 'false' },
  });
} catch (error) {
  process.exit(1);
}
```

**package.json scripts**:

```json
{
  "scripts": {
    "test:checkout": "playwright test **/checkout*.spec.ts",
    "test:auth": "playwright test **/auth*.spec.ts **/login*.spec.ts",
    "test:e2e": "playwright test tests/e2e/",
    "test:integration": "playwright test tests/integration/",
    "test:component": "ts-node scripts/run-by-component.ts",
    "test:project": "playwright test --project",
    "test:smoke-project": "playwright test --project smoke"
  }
}
```

**Key Points**:

- **Glob patterns**: Wildcards match file paths flexibly
- **Project isolation**: Separate projects have different configs
- **Component targeting**: Run tests for specific features
- **Directory-based**: Organize tests by type (e2e, integration, component)
- **CI optimization**: Run subsets in parallel CI jobs

---
