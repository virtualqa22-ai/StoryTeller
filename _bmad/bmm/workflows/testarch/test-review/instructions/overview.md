# Overview

This workflow performs comprehensive test quality reviews using TEA's knowledge base of best practices. It validates tests against proven patterns for fixture architecture, network-first safeguards, data factories, determinism, isolation, and flakiness prevention. The review generates actionable feedback with quality scoring.

**Key Capabilities:**

- **Knowledge-Based Review**: Applies patterns from tea-index.csv fragments
- **Quality Scoring**: 0-100 score based on violations and best practices
- **Multi-Scope**: Review single file, directory, or entire test suite
- **Pattern Detection**: Identifies flaky patterns, hard waits, race conditions
- **Best Practice Validation**: BDD format, test IDs, priorities, assertions
- **Actionable Feedback**: Critical issues (must fix) vs recommendations (should fix)
- **Integration**: Works with story files, test-design, acceptance criteria

---
