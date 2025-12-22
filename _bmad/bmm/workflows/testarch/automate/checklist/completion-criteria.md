# Completion Criteria

All of the following must be true before marking this workflow as complete:

- [ ] **Execution mode determined** (BMad-Integrated, Standalone, or Auto-discover)
- [ ] **Framework configuration loaded** and validated
- [ ] **Coverage analysis completed** (gaps identified if analyze_coverage true)
- [ ] **Automation targets identified** (what needs testing)
- [ ] **Test levels selected** appropriately (E2E, API, Component, Unit)
- [ ] **Duplicate coverage avoided** (same behavior not tested at multiple levels)
- [ ] **Test priorities assigned** (P0, P1, P2, P3)
- [ ] **Fixture architecture created/enhanced** with auto-cleanup
- [ ] **Data factories created/enhanced** using faker (no hardcoded data)
- [ ] **Helper utilities created/enhanced** (if needed)
- [ ] **Test files generated** at appropriate levels (E2E, API, Component, Unit)
- [ ] **Given-When-Then format used** consistently across all tests
- [ ] **Priority tags added** to all test names ([P0], [P1], [P2], [P3])
- [ ] **data-testid selectors used** in E2E tests (not CSS classes)
- [ ] **Network-first pattern applied** (route interception before navigation)
- [ ] **Quality standards enforced** (no hard waits, no flaky patterns, self-cleaning, deterministic)
- [ ] **Test README updated** with execution instructions and patterns
- [ ] **package.json scripts updated** with test execution commands
- [ ] **Test suite run locally** (if run_tests_after_generation true)
- [ ] **Tests validated** (if auto_validate enabled)
- [ ] **Failures healed** (if auto_heal_failures enabled and tests failed)
- [ ] **Healing report generated** (if healing attempted)
- [ ] **Unfixable tests marked** with test.fixme() and detailed comments (if any)
- [ ] **Automation summary created** and saved to correct location
- [ ] **Output file formatted correctly**
- [ ] **Knowledge base references applied** and documented (including healing fragments if used)
- [ ] **No test quality issues** (flaky patterns, race conditions, hardcoded data, page objects)

---
