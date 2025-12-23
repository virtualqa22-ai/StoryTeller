# Example 4: Selective Test Execution (Changed Files + Tags)

**Context**: Optimize CI by running only relevant tests based on file changes and tags.

**Implementation**:

```bash
#!/bin/bash
# scripts/selective-test-runner.sh
# Intelligent test selection based on changed files and test tags

set -e

BASE_BRANCH=${BASE_BRANCH:-main}
TEST_ENV=${TEST_ENV:-local}

echo "🎯 Selective Test Runner"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Base branch: $BASE_BRANCH"
echo "Environment: $TEST_ENV"
echo ""

# Detect changed files (all types, not just tests)
CHANGED_FILES=$(git diff --name-only $BASE_BRANCH...HEAD)

if [ -z "$CHANGED_FILES" ]; then
  echo "✅ No files changed. Skipping tests."
  exit 0
fi

echo "Changed files:"
echo "$CHANGED_FILES" | sed 's/^/  - /'
echo ""

# Determine test strategy based on changes
run_smoke_only=false
run_all_tests=false
affected_specs=""

# Critical files = run all tests
if echo "$CHANGED_FILES" | grep -qE '(package\.json|package-lock\.json|playwright\.config|cypress\.config|\.github/workflows)'; then
  echo "⚠️  Critical configuration files changed. Running ALL tests."
  run_all_tests=true

# Auth/security changes = run all auth + smoke tests
elif echo "$CHANGED_FILES" | grep -qE '(auth|login|signup|security)'; then
  echo "🔒 Auth/security files changed. Running auth + smoke tests."
  npm run test -- --grep "@auth|@smoke"
  exit $?

# API changes = run integration + smoke tests
elif echo "$CHANGED_FILES" | grep -qE '(api|service|controller)'; then
  echo "🔌 API files changed. Running integration + smoke tests."
  npm run test -- --grep "@integration|@smoke"
  exit $?

# UI component changes = run related component tests
elif echo "$CHANGED_FILES" | grep -qE '\.(tsx|jsx|vue)$'; then
  echo "🎨 UI components changed. Running component + smoke tests."

  # Extract component names and find related tests
  components=$(echo "$CHANGED_FILES" | grep -E '\.(tsx|jsx|vue)$' | xargs -I {} basename {} | sed 's/\.[^.]*$//')
  for component in $components; do
    # Find tests matching component name
    affected_specs+=$(find tests -name "*${component}*" -type f) || true
  done

  if [ -n "$affected_specs" ]; then
    echo "Running tests for: $affected_specs"
    npm run test -- $affected_specs --grep "@smoke"
  else
    echo "No specific tests found. Running smoke tests only."
    npm run test -- --grep "@smoke"
  fi
  exit $?

# Documentation/config only = run smoke tests
elif echo "$CHANGED_FILES" | grep -qE '\.(md|txt|json|yml|yaml)$'; then
  echo "📝 Documentation/config files changed. Running smoke tests only."
  run_smoke_only=true
else
  echo "⚙️  Other files changed. Running smoke tests."
  run_smoke_only=true
fi

# Execute selected strategy
if [ "$run_all_tests" = true ]; then
  echo ""
  echo "Running full test suite..."
  npm run test
elif [ "$run_smoke_only" = true ]; then
  echo ""
  echo "Running smoke tests..."
  npm run test -- --grep "@smoke"
fi
```

**Usage in GitHub Actions**:

```yaml
# .github/workflows/selective-tests.yml
name: Selective Tests
on: pull_request

jobs:
  selective-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Run selective tests
        run: bash scripts/selective-test-runner.sh
        env:
          BASE_BRANCH: ${{ github.base_ref }}
          TEST_ENV: staging
```

**Key Points**:

- **Intelligent routing**: Tests selected based on changed file types
- **Tag-based filtering**: Use @smoke, @auth, @integration tags
- **Fast feedback**: Only relevant tests run on most PRs
- **Safety net**: Critical changes trigger full suite
- **Component mapping**: UI changes run related component tests

---
