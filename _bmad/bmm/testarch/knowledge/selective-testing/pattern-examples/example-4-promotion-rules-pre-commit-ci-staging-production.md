# Example 4: Promotion Rules (Pre-Commit → CI → Staging → Production)

**Context**: Progressive test execution strategy across deployment stages.

**Implementation**:

```typescript
// scripts/test-promotion-strategy.ts
/**
 * Test Promotion Strategy
 * Defines which tests run at each stage of the development lifecycle
 */

export type TestStage = 'pre-commit' | 'ci-pr' | 'ci-merge' | 'staging' | 'production';

export type TestPromotion = {
  stage: TestStage;
  description: string;
  testCommand: string;
  timebudget: string; // minutes
  required: boolean;
  failureAction: 'block' | 'warn' | 'alert';
};

export const TEST_PROMOTION_RULES: Record<TestStage, TestPromotion> = {
  'pre-commit': {
    stage: 'pre-commit',
    description: 'Local developer checks before git commit',
    testCommand: 'npm run test:smoke',
    timebudget: '2',
    required: true,
    failureAction: 'block',
  },
  'ci-pr': {
    stage: 'ci-pr',
    description: 'CI checks on pull request creation/update',
    testCommand: 'npm run test:changed && npm run test:p0-p1',
    timebudget: '10',
    required: true,
    failureAction: 'block',
  },
  'ci-merge': {
    stage: 'ci-merge',
    description: 'Full regression before merge to main',
    testCommand: 'npm run test:regression',
    timebudget: '30',
    required: true,
    failureAction: 'block',
  },
  staging: {
    stage: 'staging',
    description: 'Post-deployment validation in staging environment',
    testCommand: 'npm run test:e2e -- --grep "@smoke"',
    timebudget: '15',
    required: true,
    failureAction: 'block',
  },
  production: {
    stage: 'production',
    description: 'Production smoke tests post-deployment',
    testCommand: 'npm run test:e2e:prod -- --grep "@smoke.*@p0"',
    timebudget: '5',
    required: false,
    failureAction: 'alert',
  },
};

/**
 * Get tests to run for a specific stage
 */
export function getTestsForStage(stage: TestStage): TestPromotion {
  return TEST_PROMOTION_RULES[stage];
}

/**
 * Validate if tests can be promoted to next stage
 */
export function canPromote(currentStage: TestStage, testsPassed: boolean): boolean {
  const promotion = TEST_PROMOTION_RULES[currentStage];

  if (!promotion.required) {
    return true; // Non-required tests don't block promotion
  }

  return testsPassed;
}
```

**Husky pre-commit hook**:

```bash
#!/bin/bash
# .husky/pre-commit
# Run smoke tests before allowing commit

echo "🔍 Running pre-commit tests..."

npm run test:smoke

if [ $? -ne 0 ]; then
  echo ""
  echo "❌ Pre-commit tests failed!"
  echo "Please fix failures before committing."
  echo ""
  echo "To skip (NOT recommended): git commit --no-verify"
  exit 1
fi

echo "✅ Pre-commit tests passed"
```

**GitHub Actions workflow**:

```yaml
# .github/workflows/test-promotion.yml
name: Test Promotion Strategy
on:
  pull_request:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  # Stage 1: PR tests (changed + P0-P1)
  pr-tests:
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v4
      - name: Run PR-level tests
        run: |
          npm run test:changed
          npm run test:p0-p1

  # Stage 2: Full regression (pre-merge)
  regression-tests:
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    timeout-minutes: 30
    steps:
      - uses: actions/checkout@v4
      - name: Run full regression
        run: npm run test:regression

  # Stage 3: Staging validation (post-deploy)
  staging-smoke:
    if: github.event_name == 'workflow_dispatch'
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v4
      - name: Run staging smoke tests
        run: npm run test:e2e -- --grep "@smoke"
        env:
          TEST_ENV: staging

  # Stage 4: Production smoke (post-deploy, non-blocking)
  production-smoke:
    if: github.event_name == 'workflow_dispatch'
    runs-on: ubuntu-latest
    timeout-minutes: 5
    continue-on-error: true # Don't fail deployment if smoke tests fail
    steps:
      - uses: actions/checkout@v4
      - name: Run production smoke tests
        run: npm run test:e2e:prod -- --grep "@smoke.*@p0"
        env:
          TEST_ENV: production

      - name: Alert on failure
        if: failure()
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: '🚨 Production smoke tests failed!'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

**Selection strategy documentation**:

````markdown
# Test Selection Strategy

# Test Promotion Stages

| Stage      | Tests Run           | Time Budget | Blocks Deploy | Failure Action |
| ---------- | ------------------- | ----------- | ------------- | -------------- |
| Pre-Commit | Smoke (@smoke)      | 2 min       | ✅ Yes        | Block commit   |
| CI PR      | Changed + P0-P1     | 10 min      | ✅ Yes        | Block merge    |
| CI Merge   | Full regression     | 30 min      | ✅ Yes        | Block deploy   |
| Staging    | E2E smoke           | 15 min      | ✅ Yes        | Rollback       |
| Production | Critical smoke only | 5 min       | ❌ No         | Alert team     |

# When Full Regression Runs

Full regression suite (`npm run test:regression`) runs in these scenarios:

- ✅ Before merging to `main` (CI Merge stage)
- ✅ Nightly builds (scheduled workflow)
- ✅ Manual trigger (workflow_dispatch)
- ✅ Release candidate testing

Full regression does NOT run on:

- ❌ Every PR commit (too slow)
- ❌ Pre-commit hooks (too slow)
- ❌ Production deployments (deploy-blocking)

# Override Scenarios

Skip tests (emergency only):

```bash
git commit --no-verify  # Skip pre-commit hook
gh pr merge --admin     # Force merge (requires admin)
```
````

```

**Key Points**:
- **Progressive validation**: More tests at each stage
- **Time budgets**: Clear expectations per stage
- **Blocking vs. alerting**: Production tests don't block deploy
- **Documentation**: Team knows when full regression runs
- **Emergency overrides**: Documented but discouraged

---

# Test Selection Strategy Checklist

Before implementing selective testing, verify:

- [ ] **Tag strategy defined**: @smoke, @p0-p3, @regression documented
- [ ] **Time budgets set**: Each stage has clear timeout (smoke < 5 min, full < 30 min)
- [ ] **Changed file mapping**: Code changes → test selection logic implemented
- [ ] **Promotion rules documented**: README explains when full regression runs
- [ ] **CI integration**: GitHub Actions uses selective strategy
- [ ] **Local parity**: Developers can run same selections locally
- [ ] **Emergency overrides**: Skip mechanisms documented (--no-verify, admin merge)
- [ ] **Metrics tracked**: Monitor test execution time and selection accuracy

# Integration Points

- Used in workflows: `*ci` (CI/CD setup), `*automate` (test generation with tags)
- Related fragments: `ci-burn-in.md`, `test-priorities-matrix.md`, `test-quality.md`
- Selection tools: Playwright --grep, Cypress @cypress/grep, git diff

_Source: 32+ selective testing strategies blog, Murat testing philosophy, SEON CI optimization_
```
