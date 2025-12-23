# Step 2: Scaffold CI Pipeline

## Actions

1. **Select CI Platform Template**

   Based on detection or user preference, use the appropriate template:

   **GitHub Actions** (`.github/workflows/test.yml`):
   - Most common platform
   - Excellent caching and matrix support
   - Free for public repos, generous free tier for private

   **GitLab CI** (`.gitlab-ci.yml`):
   - Integrated with GitLab
   - Built-in registry and runners
   - Powerful pipeline features

   **Circle CI** (`.circleci/config.yml`):
   - Fast execution with parallelism
   - Docker-first approach
   - Enterprise features

   **Jenkins** (`Jenkinsfile`):
   - Self-hosted option
   - Maximum customization
   - Requires infrastructure management

2. **Generate Pipeline Configuration**

   Use templates from `{installed_path}/` directory:
   - `github-actions-template.yml`
   - `gitlab-ci-template.yml`

   **Key pipeline stages:**

   ```yaml
   stages:
     - lint # Code quality checks
     - test # Test execution (parallel shards)
     - burn-in # Flaky test detection
     - report # Aggregate results and publish
   ```

3. **Configure Test Execution**

   **Parallel Sharding:**

   ```yaml
   strategy:
     fail-fast: false
     matrix:
       shard: [1, 2, 3, 4]

   steps:
     - name: Run tests
       run: npm run test:e2e -- --shard=${{ matrix.shard }}/${{ strategy.job-total }}
   ```

   **Purpose:** Splits tests into N parallel jobs for faster execution (target: <10 min per shard)

4. **Add Burn-In Loop**

   **Critical pattern from production systems:**

   ```yaml
   burn-in:
     name: Flaky Test Detection
     runs-on: ubuntu-latest
     steps:
       - uses: actions/checkout@v4

       - name: Setup Node
         uses: actions/setup-node@v4
         with:
           node-version-file: '.nvmrc'

       - name: Install dependencies
         run: npm ci

       - name: Run burn-in loop (10 iterations)
         run: |
           for i in {1..10}; do
             echo "🔥 Burn-in iteration $i/10"
             npm run test:e2e || exit 1
           done

       - name: Upload failure artifacts
         if: failure()
         uses: actions/upload-artifact@v4
         with:
           name: burn-in-failures
           path: test-results/
           retention-days: 30
   ```

   **Purpose:** Runs tests multiple times to catch non-deterministic failures before they reach main branch.

   **When to run:**
   - On pull requests to main/develop
   - Weekly on cron schedule
   - After significant test infrastructure changes

5. **Configure Caching**

   **Node modules cache:**

   ```yaml
   - name: Cache dependencies
     uses: actions/cache@v4
     with:
       path: ~/.npm
       key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
       restore-keys: |
         ${{ runner.os }}-node-
   ```

   **Browser binaries cache (Playwright):**

   ```yaml
   - name: Cache Playwright browsers
     uses: actions/cache@v4
     with:
       path: ~/.cache/ms-playwright
       key: ${{ runner.os }}-playwright-${{ hashFiles('**/package-lock.json') }}
   ```

   **Purpose:** Reduces CI execution time by 2-5 minutes per run.

6. **Configure Artifact Collection**

   **Failure artifacts only:**

   ```yaml
   - name: Upload test results
     if: failure()
     uses: actions/upload-artifact@v4
     with:
       name: test-results-${{ matrix.shard }}
       path: |
         test-results/
         playwright-report/
       retention-days: 30
   ```

   **Artifacts to collect:**
   - Traces (Playwright) - full debugging context
   - Screenshots - visual evidence of failures
   - Videos - interaction playback
   - HTML reports - detailed test results
   - Console logs - error messages and warnings

7. **Add Retry Logic**

   ```yaml
   - name: Run tests with retries
     uses: nick-invision/retry@v2
     with:
       timeout_minutes: 30
       max_attempts: 3
       retry_on: error
       command: npm run test:e2e
   ```

   **Purpose:** Handles transient failures (network issues, race conditions)

8. **Configure Notifications** (Optional)

   If `notify_on_failure` is enabled:

   ```yaml
   - name: Notify on failure
     if: failure()
     uses: 8398a7/action-slack@v3
     with:
       status: ${{ job.status }}
       text: 'Test failures detected in PR #${{ github.event.pull_request.number }}'
       webhook_url: ${{ secrets.SLACK_WEBHOOK }}
   ```

9. **Generate Helper Scripts**

   **Selective testing script** (`scripts/test-changed.sh`):

   ```bash
   #!/bin/bash
   # Run only tests for changed files

   CHANGED_FILES=$(git diff --name-only HEAD~1)

   if echo "$CHANGED_FILES" | grep -q "src/.*\.ts$"; then
     echo "Running affected tests..."
     npm run test:e2e -- --grep="$(echo $CHANGED_FILES | sed 's/src\///g' | sed 's/\.ts//g')"
   else
     echo "No test-affecting changes detected"
   fi
   ```

   **Local mirror script** (`scripts/ci-local.sh`):

   ```bash
   #!/bin/bash
   # Mirror CI execution locally for debugging

   echo "🔍 Running CI pipeline locally..."

   # Lint
   npm run lint || exit 1

   # Tests
   npm run test:e2e || exit 1

   # Burn-in (reduced iterations)
   for i in {1..3}; do
     echo "🔥 Burn-in $i/3"
     npm run test:e2e || exit 1
   done

   echo "✅ Local CI pipeline passed"
   ```

10. **Generate Documentation**

    **CI README** (`docs/ci.md`):
    - Pipeline stages and purpose
    - How to run locally
    - Debugging failed CI runs
    - Secrets and environment variables needed
    - Notification setup
    - Badge URLs for README

    **Secrets checklist** (`docs/ci-secrets-checklist.md`):
    - Required secrets list (SLACK_WEBHOOK, etc.)
    - Where to configure in CI platform
    - Security best practices

---
