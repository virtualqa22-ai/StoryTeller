# Quality Criteria Decision Matrix

| Criterion          | PASS                      | WARN           | FAIL                | Knowledge Fragment      |
| ------------------ | ------------------------- | -------------- | ------------------- | ----------------------- |
| BDD Format         | Given-When-Then present   | Some structure | No structure        | test-quality.md         |
| Test IDs           | All tests have IDs        | Some missing   | No IDs              | traceability.md         |
| Priority Markers   | All classified            | Some missing   | No classification   | test-priorities.md      |
| Hard Waits         | No hard waits             | Some justified | Hard waits present  | test-quality.md         |
| Determinism        | No conditionals/random    | Some justified | Conditionals/random | test-quality.md         |
| Isolation          | Clean up, no shared state | Some gaps      | Shared state        | test-quality.md         |
| Fixture Patterns   | Pure fn → Fixture         | Some fixtures  | No fixtures         | fixture-architecture.md |
| Data Factories     | Factory functions         | Some factories | Hardcoded data      | data-factories.md       |
| Network-First      | Intercept before navigate | Some correct   | Race conditions     | network-first.md        |
| Assertions         | Explicit assertions       | Some implicit  | Missing assertions  | test-quality.md         |
| Test Length        | ≤300 lines                | 301-500 lines  | >500 lines          | test-quality.md         |
| Test Duration      | ≤1.5 min                  | 1.5-3 min      | >3 min              | test-quality.md         |
| Flakiness Patterns | No flaky patterns         | Some potential | Multiple patterns   | ci-burn-in.md           |

---
