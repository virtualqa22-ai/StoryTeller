# Example 1: GitHub Actions Workflow with Parallel Execution

**Context**: Production-ready CI/CD pipeline for E2E tests with caching, parallelization, and burn-in testing.

**Implementation**:

```yaml
# .github/workflows/e2e-tests.yml
name: E2E Tests
on:
  pull_request:
  push:
    branches: [main, develop]

env:
  NODE_VERSION_FILE: '.nvmrc'
  CACHE_KEY: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}

jobs:
  install-dependencies:
    name: Install & Cache Dependencies
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version-file: ${{ env.NODE_VERSION_FILE }}
          cache: 'npm'

      - name: Cache node modules
        uses: actions/cache@v4
        id: npm-cache
        with:
          path: |
            ~/.npm
            node_modules
            ~/.cache/Cypress
            ~/.cache/ms-playwright
          key: ${{ env.CACHE_KEY }}
          restore-keys: |
            ${{ runner.os }}-node-

      - name: Install dependencies
        if: steps.npm-cache.outputs.cache-hit != 'true'
        run: npm ci --prefer-offline --no-audit

      - name: Install Playwright browsers
        if: steps.npm-cache.outputs.cache-hit != 'true'
        run: npx playwright install --with-deps chromium

  test-changed-specs:
    name: Test Changed Specs First (Burn-In)
    needs: install-dependencies
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # Full history for accurate diff

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version-file: ${{ env.NODE_VERSION_FILE }}
          cache: 'npm'

      - name: Restore dependencies
        uses: actions/cache@v4
        with:
          path: |
            ~/.npm
            node_modules
            ~/.cache/ms-playwright
          key: ${{ env.CACHE_KEY }}

      - name: Detect changed test files
        id: changed-tests
        run: |
          CHANGED_SPECS=$(git diff --name-only origin/main...HEAD | grep -E '\.(spec|test)\.(ts|js|tsx|jsx)$' || echo "")
          echo "changed_specs=${CHANGED_SPECS}" >> $GITHUB_OUTPUT
          echo "Changed specs: ${CHANGED_SPECS}"

      - name: Run burn-in on changed specs (10 iterations)
        if: steps.changed-tests.outputs.changed_specs != ''
        run: |
          SPECS="${{ steps.changed-tests.outputs.changed_specs }}"
          echo "Running burn-in: 10 iterations on changed specs"
          for i in {1..10}; do
            echo "Burn-in iteration $i/10"
            npm run test -- $SPECS || {
              echo "❌ Burn-in failed on iteration $i"
              exit 1
            }
          done
          echo "✅ Burn-in passed - 10/10 successful runs"

      - name: Upload artifacts on failure
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: burn-in-failure-artifacts
          path: |
            test-results/
            playwright-report/
            screenshots/
          retention-days: 7

  test-e2e-sharded:
    name: E2E Tests (Shard ${{ matrix.shard }}/${{ strategy.job-total }})
    needs: [install-dependencies, test-changed-specs]
    runs-on: ubuntu-latest
    timeout-minutes: 30
    strategy:
      fail-fast: false # Run all shards even if one fails
      matrix:
        shard: [1, 2, 3, 4]
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version-file: ${{ env.NODE_VERSION_FILE }}
          cache: 'npm'

      - name: Restore dependencies
        uses: actions/cache@v4
        with:
          path: |
            ~/.npm
            node_modules
            ~/.cache/ms-playwright
          key: ${{ env.CACHE_KEY }}

      - name: Run E2E tests (shard ${{ matrix.shard }})
        run: npm run test:e2e -- --shard=${{ matrix.shard }}/4
        env:
          TEST_ENV: staging
          CI: true

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: test-results-shard-${{ matrix.shard }}
          path: |
            test-results/
            playwright-report/
          retention-days: 30

      - name: Upload JUnit report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: junit-results-shard-${{ matrix.shard }}
          path: test-results/junit.xml
          retention-days: 30

  merge-test-results:
    name: Merge Test Results & Generate Report
    needs: test-e2e-sharded
    runs-on: ubuntu-latest
    if: always()
    steps:
      - name: Download all shard results
        uses: actions/download-artifact@v4
        with:
          pattern: test-results-shard-*
          path: all-results/

      - name: Merge HTML reports
        run: |
          npx playwright merge-reports --reporter=html all-results/
          echo "Merged report available in playwright-report/"

      - name: Upload merged report
        uses: actions/upload-artifact@v4
        with:
          name: merged-playwright-report
          path: playwright-report/
          retention-days: 30

      - name: Comment PR with results
        if: github.event_name == 'pull_request'
        uses: daun/playwright-report-comment@v3
        with:
          report-path: playwright-report/
```

**Key Points**:

- **Install once, reuse everywhere**: Dependencies cached across all jobs
- **Burn-in first**: Changed specs run 10x before full suite
- **Fail-fast disabled**: All shards run to completion for full evidence
- **Parallel execution**: 4 shards cut execution time by ~75%
- **Artifact retention**: 30 days for reports, 7 days for failure debugging

---
