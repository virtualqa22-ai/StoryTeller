# Automation Complete

**Mode:** {standalone_mode ? "Standalone" : "BMad-Integrated"}
**Target:** {story_id || target_feature || "Auto-discovered features"}

**Tests Created:**

- E2E: {e2e_count} tests ({p0_count} P0, {p1_count} P1, {p2_count} P2)
- API: {api_count} tests ({p0_count} P0, {p1_count} P1, {p2_count} P2)
- Component: {component_count} tests ({p1_count} P1, {p2_count} P2)
- Unit: {unit_count} tests ({p2_count} P2, {p3_count} P3)

**Infrastructure:**

- Fixtures: {fixture_count} created/enhanced
- Factories: {factory_count} created/enhanced
- Helpers: {helper_count} created/enhanced

**Documentation Updated:**

- ✅ Test README with execution instructions
- ✅ package.json scripts for test execution

**Test Execution:**

```bash
# Run all tests
npm run test:e2e

# Run by priority
npm run test:e2e:p0  # Critical paths only
npm run test:e2e:p1  # P0 + P1 tests

# Run specific file
npm run test:e2e -- {first_test_file}
```
````

**Coverage Status:**

- ✅ {coverage_percentage}% of features covered
- ✅ All P0 scenarios covered
- ✅ All P1 scenarios covered
- ⚠️ {gap_count} coverage gaps identified (documented in summary)

**Quality Checks:**

- ✅ All tests follow Given-When-Then format
- ✅ All tests have priority tags
- ✅ All tests use data-testid selectors
- ✅ All tests are self-cleaning
- ✅ No hard waits or flaky patterns
- ✅ All test files under {max_file_lines} lines

**Output File:** {output_summary}

**Next Steps:**

1. Review generated tests with team
2. Run tests in CI pipeline
3. Monitor for flaky tests in burn-in loop
4. Integrate with quality gate: `bmad tea *gate`

**Knowledge Base References Applied:**

- Test level selection framework (E2E vs API vs Component vs Unit)
- Priority classification (P0-P3)
- Fixture architecture patterns with auto-cleanup
- Data factory patterns using faker
- Selective testing strategies
- Test quality principles

```

---
