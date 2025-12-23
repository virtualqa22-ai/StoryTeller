# Example 3: Diff-Based Test Selection (Changed Files Only)

**Context**: Run only tests affected by code changes for maximum speed.

**Implementation**:

```bash
#!/bin/bash
# scripts/test-changed-files.sh
# Intelligent test selection based on git diff

set -e

BASE_BRANCH=${BASE_BRANCH:-main}
TEST_ENV=${TEST_ENV:-local}

echo "🔍 Changed File Test Selector"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Base branch: $BASE_BRANCH"
echo "Environment: $TEST_ENV"
echo ""

# Get changed files
CHANGED_FILES=$(git diff --name-only $BASE_BRANCH...HEAD)

if [ -z "$CHANGED_FILES" ]; then
  echo "✅ No files changed. Skipping tests."
  exit 0
fi

echo "Changed files:"
echo "$CHANGED_FILES" | sed 's/^/  - /'
echo ""

# Arrays to collect test specs
DIRECT_TEST_FILES=()
RELATED_TEST_FILES=()
RUN_ALL_TESTS=false

# Process each changed file
while IFS= read -r file; do
  case "$file" in
    # Changed test files: run them directly
    *.spec.ts|*.spec.js|*.test.ts|*.test.js|*.cy.ts|*.cy.js)
      DIRECT_TEST_FILES+=("$file")
      ;;

    # Critical config changes: run ALL tests
    package.json|package-lock.json|playwright.config.ts|cypress.config.ts|tsconfig.json|.github/workflows/*)
      echo "⚠️  Critical file changed: $file"
      RUN_ALL_TESTS=true
      break
      ;;

    # Component changes: find related tests
    src/components/*.tsx|src/components/*.jsx)
      COMPONENT_NAME=$(basename "$file" | sed 's/\.[^.]*$//')
      echo "🧩 Component changed: $COMPONENT_NAME"

      # Find tests matching component name
      FOUND_TESTS=$(find tests -name "*${COMPONENT_NAME}*.spec.ts" -o -name "*${COMPONENT_NAME}*.cy.ts" 2>/dev/null || true)
      if [ -n "$FOUND_TESTS" ]; then
        while IFS= read -r test_file; do
          RELATED_TEST_FILES+=("$test_file")
        done <<< "$FOUND_TESTS"
      fi
      ;;

    # Utility/lib changes: run integration + unit tests
    src/utils/*|src/lib/*|src/helpers/*)
      echo "⚙️  Utility file changed: $file"
      RELATED_TEST_FILES+=($(find tests/unit tests/integration -name "*.spec.ts" 2>/dev/null || true))
      ;;

    # API changes: run integration + e2e tests
    src/api/*|src/services/*|src/controllers/*)
      echo "🔌 API file changed: $file"
      RELATED_TEST_FILES+=($(find tests/integration tests/e2e -name "*.spec.ts" 2>/dev/null || true))
      ;;

    # Type changes: run all TypeScript tests
    *.d.ts|src/types/*)
      echo "📝 Type definition changed: $file"
      RUN_ALL_TESTS=true
      break
      ;;

    # Documentation only: skip tests
    *.md|docs/*|README*)
      echo "📄 Documentation changed: $file (no tests needed)"
      ;;

    *)
      echo "❓ Unclassified change: $file (running smoke tests)"
      RELATED_TEST_FILES+=($(find tests -name "*smoke*.spec.ts" 2>/dev/null || true))
      ;;
  esac
done <<< "$CHANGED_FILES"

# Execute tests based on analysis
if [ "$RUN_ALL_TESTS" = true ]; then
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "🚨 Running FULL test suite (critical changes detected)"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  npm run test
  exit $?
fi

# Combine and deduplicate test files
ALL_TEST_FILES=(${DIRECT_TEST_FILES[@]} ${RELATED_TEST_FILES[@]})
UNIQUE_TEST_FILES=($(echo "${ALL_TEST_FILES[@]}" | tr ' ' '\n' | sort -u))

if [ ${#UNIQUE_TEST_FILES[@]} -eq 0 ]; then
  echo ""
  echo "✅ No tests found for changed files. Running smoke tests."
  npm run test:smoke
  exit $?
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎯 Running ${#UNIQUE_TEST_FILES[@]} test file(s)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

for test_file in "${UNIQUE_TEST_FILES[@]}"; do
  echo "  - $test_file"
done

echo ""
npm run test -- "${UNIQUE_TEST_FILES[@]}"
```

**GitHub Actions integration**:

```yaml
# .github/workflows/test-changed.yml
name: Test Changed Files
on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  detect-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0 # Full history for accurate diff

      - name: Get changed files
        id: changed-files
        uses: tj-actions/changed-files@v40
        with:
          files: |
            src/**
            tests/**
            *.config.ts
          files_ignore: |
            **/*.md
            docs/**

      - name: Run tests for changed files
        if: steps.changed-files.outputs.any_changed == 'true'
        run: |
          echo "Changed files: ${{ steps.changed-files.outputs.all_changed_files }}"
          bash scripts/test-changed-files.sh
        env:
          BASE_BRANCH: ${{ github.base_ref }}
          TEST_ENV: staging
```

**Key Points**:

- **Intelligent mapping**: Code changes → related tests
- **Critical file detection**: Config changes = full suite
- **Component mapping**: UI changes → component + E2E tests
- **Fast feedback**: Run only what's needed (< 2 min typical)
- **Safety net**: Unrecognized changes run smoke tests

---
