# Test Quality Verification

For each mapped test, verify:

- [ ] Explicit assertions are present (not hidden in helpers)
- [ ] Test follows Given-When-Then structure
- [ ] No hard waits or sleeps (deterministic waiting only)
- [ ] Self-cleaning (test cleans up its data)
- [ ] File size < 300 lines
- [ ] Test duration < 90 seconds

Quality issues flagged:

- [ ] **BLOCKER** issues identified (missing assertions, hard waits, flaky patterns)
- [ ] **WARNING** issues identified (large files, slow tests, unclear structure)
- [ ] **INFO** issues identified (style inconsistencies, missing documentation)

Knowledge fragments referenced:

- [ ] `test-quality.md` for Definition of Done
- [ ] `fixture-architecture.md` for self-cleaning patterns
- [ ] `network-first.md` for Playwright best practices
- [ ] `data-factories.md` for test data patterns

---
