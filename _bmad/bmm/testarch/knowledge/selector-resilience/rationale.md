# Rationale

**The Problem**: Brittle selectors (CSS classes, nth-child, complex XPath) break when UI styling changes, elements are reordered, or design updates occur. This causes test maintenance burden and false negatives.

**The Solution**: Prioritize semantic selectors that reflect user intent (ARIA roles, accessible names, test IDs). Use dynamic filtering for lists instead of nth() indexes. Validate selectors during code review and refactor proactively.

**Why This Matters**:

- Prevents false test failures (UI refactoring doesn't break tests)
- Improves accessibility (ARIA roles benefit both tests and screen readers)
- Enhances readability (semantic selectors document user intent)
- Reduces maintenance burden (robust selectors survive design changes)
