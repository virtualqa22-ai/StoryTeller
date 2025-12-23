# Example 2: Burn-In Loop Pattern (Standalone Script)

**Context**: Reusable bash script for burn-in testing changed specs locally or in CI.

**Implementation**:

```bash
#!/bin/bash
# scripts/burn-in-changed.sh
# Usage: ./scripts/burn-in-changed.sh [iterations] [base-branch]

set -e  # Exit on error

# Configuration
ITERATIONS=${1:-10}
BASE_BRANCH=${2:-main}
SPEC_PATTERN='\.(spec|test)\.(ts|js|tsx|jsx)$'

echo "🔥 Burn-In Test Runner"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Iterations: $ITERATIONS"
echo "Base branch: $BASE_BRANCH"
echo ""

# Detect changed test files
echo "📋 Detecting changed test files..."
CHANGED_SPECS=$(git diff --name-only $BASE_BRANCH...HEAD | grep -E "$SPEC_PATTERN" || echo "")

if [ -z "$CHANGED_SPECS" ]; then
  echo "✅ No test files changed. Skipping burn-in."
  exit 0
fi

echo "Changed test files:"
echo "$CHANGED_SPECS" | sed 's/^/  - /'
echo ""

# Count specs
SPEC_COUNT=$(echo "$CHANGED_SPECS" | wc -l | xargs)
echo "Running burn-in on $SPEC_COUNT test file(s)..."
echo ""

# Burn-in loop
FAILURES=()
for i in $(seq 1 $ITERATIONS); do
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "🔄 Iteration $i/$ITERATIONS"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

  # Run tests with explicit file list
  if npm run test -- $CHANGED_SPECS 2>&1 | tee "burn-in-log-$i.txt"; then
    echo "✅ Iteration $i passed"
  else
    echo "❌ Iteration $i failed"
    FAILURES+=($i)

    # Save failure artifacts
    mkdir -p burn-in-failures/iteration-$i
    cp -r test-results/ burn-in-failures/iteration-$i/ 2>/dev/null || true
    cp -r screenshots/ burn-in-failures/iteration-$i/ 2>/dev/null || true

    echo ""
    echo "🛑 BURN-IN FAILED on iteration $i"
    echo "Failure artifacts saved to: burn-in-failures/iteration-$i/"
    echo "Logs saved to: burn-in-log-$i.txt"
    echo ""
    exit 1
  fi

  echo ""
done

# Success summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 BURN-IN PASSED"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "All $ITERATIONS iterations passed for $SPEC_COUNT test file(s)"
echo "Changed specs are stable and ready to merge."
echo ""

# Cleanup logs
rm -f burn-in-log-*.txt

exit 0
```

**Usage**:

```bash
# Run locally with default settings (10 iterations, compare to main)
./scripts/burn-in-changed.sh

# Custom iterations and base branch
./scripts/burn-in-changed.sh 20 develop

# Add to package.json
{
  "scripts": {
    "test:burn-in": "bash scripts/burn-in-changed.sh",
    "test:burn-in:strict": "bash scripts/burn-in-changed.sh 20"
  }
}
```

**Key Points**:

- **Exit on first failure**: Flaky tests caught immediately
- **Failure artifacts**: Saved per-iteration for debugging
- **Flexible configuration**: Iterations and base branch customizable
- **CI/local parity**: Same script runs in both environments
- **Clear output**: Visual feedback on progress and results

---
