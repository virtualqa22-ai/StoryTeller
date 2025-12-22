# Validation

After completing all steps, verify:

- [ ] Execution mode determined (BMad-Integrated, Standalone, or Auto-discover)
- [ ] BMad artifacts loaded if available (story, tech-spec, test-design, PRD)
- [ ] Framework configuration loaded
- [ ] Existing test coverage analyzed (gaps identified)
- [ ] Knowledge base fragments loaded (test-levels, test-priorities, fixture-architecture, data-factories, selective-testing)
- [ ] Automation targets identified (what needs testing)
- [ ] Test levels selected appropriately (E2E, API, Component, Unit)
- [ ] Duplicate coverage avoided (same behavior not tested at multiple levels)
- [ ] Test priorities assigned (P0, P1, P2, P3)
- [ ] Fixture architecture created/enhanced (with auto-cleanup)
- [ ] Data factories created/enhanced (using faker)
- [ ] Helper utilities created/enhanced (if needed)
- [ ] E2E tests written (Given-When-Then, priority tags, data-testid selectors)
- [ ] API tests written (Given-When-Then, priority tags, comprehensive coverage)
- [ ] Component tests written (Given-When-Then, priority tags, UI behavior)
- [ ] Unit tests written (Given-When-Then, priority tags, pure logic)
- [ ] Network-first pattern applied (route interception before navigation)
- [ ] Quality standards enforced (no hard waits, no flaky patterns, self-cleaning, deterministic)
- [ ] Test README updated (execution instructions, priority tagging, patterns)
- [ ] package.json scripts updated (test execution commands)
- [ ] Test suite run locally (results captured)
- [ ] Tests validated (if auto_validate enabled)
- [ ] Failures healed (if auto_heal_failures enabled)
- [ ] Healing report generated (if healing attempted)
- [ ] Unfixable tests marked with test.fixme() (if any)
- [ ] Automation summary created (tests, infrastructure, coverage, healing, DoD)
- [ ] Output file formatted correctly

Refer to `checklist.md` for comprehensive validation criteria.
```
