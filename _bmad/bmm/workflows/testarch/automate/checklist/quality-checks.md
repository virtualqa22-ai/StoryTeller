# Quality Checks

## Test Design Quality

- [ ] Tests are readable (clear Given-When-Then structure)
- [ ] Tests are maintainable (use factories/fixtures, not hardcoded data)
- [ ] Tests are isolated (no shared state between tests)
- [ ] Tests are deterministic (no race conditions or flaky patterns)
- [ ] Tests are atomic (one assertion per test)
- [ ] Tests are fast (no unnecessary waits or delays)
- [ ] Tests are lean (files under {max_file_lines} lines)

## Knowledge Base Integration

- [ ] Test level selection framework applied (from `test-levels-framework.md`)
- [ ] Priority classification applied (from `test-priorities.md`)
- [ ] Fixture architecture patterns applied (from `fixture-architecture.md`)
- [ ] Data factory patterns applied (from `data-factories.md`)
- [ ] Selective testing strategies considered (from `selective-testing.md`)
- [ ] Flaky test detection patterns considered (from `ci-burn-in.md`)
- [ ] Test quality principles applied (from `test-quality.md`)

## Code Quality

- [ ] All TypeScript types are correct and complete
- [ ] No linting errors in generated test files
- [ ] Consistent naming conventions followed
- [ ] Imports are organized and correct
- [ ] Code follows project style guide
- [ ] No console.log or debug statements in test code

---
