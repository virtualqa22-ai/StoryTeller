# Important Notes

## Knowledge Base Integration

**Critical:** Check configuration and load appropriate fragments.

Read `{config_source}` and check `config.tea_use_playwright_utils`.

**Core CI Patterns (Always load):**

- `ci-burn-in.md` - Burn-in loop patterns: 10-iteration detection, GitHub Actions workflow, shard orchestration, selective execution (678 lines, 4 examples)
- `selective-testing.md` - Changed test detection strategies: tag-based, spec filters, diff-based selection, promotion rules (727 lines, 4 examples)
- `visual-debugging/index.md` - Artifact collection best practices: trace viewer, HAR recording, custom artifacts, accessibility integration (522 lines, 5 examples)
- `test-quality.md` - CI-specific test quality criteria: deterministic tests, isolated with cleanup, explicit assertions, length/time optimization (658 lines, 5 examples)
- `playwright-config.md` - CI-optimized configuration: parallelization, artifact output, project dependencies, sharding (722 lines, 5 examples)

**If `config.tea_use_playwright_utils: true`:**

Load playwright-utils CI-relevant fragments:

- `burn-in.md` - Smart test selection with git diff analysis (very important for CI optimization)
- `network-error-monitor.md` - Automatic HTTP 4xx/5xx detection (recommend in CI pipelines)

Recommend:

- Add burn-in script for pull request validation
- Enable network-error-monitor in merged fixtures for catching silent failures
- Reference full docs in `*framework` and `*automate` workflows

## CI Platform-Specific Guidance

**GitHub Actions:**

- Use `actions/cache` for caching
- Matrix strategy for parallelism
- Secrets in repository settings
- Free 2000 minutes/month for private repos

**GitLab CI:**

- Use `.gitlab-ci.yml` in root
- `cache:` directive for caching
- Parallel execution with `parallel: 4`
- Variables in project CI/CD settings

**Circle CI:**

- Use `.circleci/config.yml`
- Docker executors recommended
- Parallelism with `parallelism: 4`
- Context for shared secrets

## Burn-In Loop Strategy

**When to run:**

- ✅ On PRs to main/develop branches
- ✅ Weekly on schedule (cron)
- ✅ After test infrastructure changes
- ❌ Not on every commit (too slow)

**Iterations:**

- **10 iterations** for thorough detection
- **3 iterations** for quick feedback
- **100 iterations** for high-confidence stability

**Failure threshold:**

- Even ONE failure in burn-in → tests are flaky
- Must fix before merging

## Artifact Retention

**Failure artifacts only:**

- Saves storage costs
- Maintains debugging capability
- 30-day retention default

**Artifact types:**

- Traces (Playwright) - 5-10 MB per test
- Screenshots - 100-500 KB per screenshot
- Videos - 2-5 MB per test
- HTML reports - 1-2 MB per run

## Selective Testing

**Detect changed files:**

```bash
git diff --name-only HEAD~1
```

**Run affected tests only:**

- Faster feedback for small changes
- Full suite still runs on main branch
- Reduces CI time by 50-80% for focused PRs

**Trade-off:**

- May miss integration issues
- Run full suite at least on merge

## Local CI Mirror

**Purpose:** Debug CI failures locally

**Usage:**

```bash
./scripts/ci-local.sh
```

**Mirrors CI environment:**

- Same Node version
- Same test command
- Same stages (lint → test → burn-in)
- Reduced burn-in iterations (3 vs 10)

---
