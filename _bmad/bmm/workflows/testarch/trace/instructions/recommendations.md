# Recommendations

1. **Address High Priority Gap:** Add password reset edge case tests before PR merge
2. **Optimize Slow Test:** Refactor `1.3-E2E-001` to use faster fixture setup
3. **Split Large Test:** Break `1.3-UNIT-005` into focused test files
4. **Enhance P2 Coverage:** Add E2E validation for session timeout (currently UNIT-ONLY)

```

---

# Validation Checklist

Before completing this workflow, verify:

**Phase 1 (Traceability):**
- ✅ All acceptance criteria are mapped to tests (or gaps are documented)
- ✅ Coverage status is classified (FULL, PARTIAL, NONE, UNIT-ONLY, INTEGRATION-ONLY)
- ✅ Gaps are prioritized by risk level (P0/P1/P2/P3)
- ✅ P0 coverage is 100% or blockers are documented
- ✅ Duplicate coverage is identified and flagged
- ✅ Test quality is assessed (assertions, structure, performance)
- ✅ Traceability matrix is generated and saved

**Phase 2 (Gate Decision - if enabled):**
- ✅ Test execution results loaded and pass rates calculated
- ✅ NFR assessment results loaded (if applicable)
- ✅ Decision rules applied consistently (PASS/CONCERNS/FAIL/WAIVED)
- ✅ Gate decision document created with evidence
- ✅ Waiver documented if decision is WAIVED (approver, justification, mitigation)
- ✅ Workflow status updated (bmm-workflow-status.md)
- ✅ Stakeholders notified (if enabled)

---

# Notes

**Phase 1 (Traceability):**
- **Explicit Mapping:** Require tests to reference criteria explicitly (test IDs, describe blocks) for maintainability
- **Risk-Based Prioritization:** Use test-priorities framework (P0/P1/P2/P3) to determine gap severity
- **Quality Over Quantity:** Better to have fewer high-quality tests with FULL coverage than many low-quality tests with PARTIAL coverage
- **Selective Testing:** Avoid duplicate coverage - test each behavior at the appropriate level only

**Phase 2 (Gate Decision):**
- **Deterministic Rules:** Use consistent thresholds (P0=100%, P1≥90%, overall≥80%) for objectivity
- **Evidence-Based:** Every decision must cite specific metrics (coverage %, pass rates, NFRs)
- **Waiver Discipline:** Waivers require approver name, justification, mitigation plan, and evidence link
- **Non-Blocking CONCERNS:** Use CONCERNS for minor gaps that don't justify blocking deployment (e.g., P1 at 88% vs 90%)
- **Automate in CI/CD:** Generate YAML snippets that can be consumed by CI/CD pipelines for automated quality gates

---

# Troubleshooting

## "No tests found for this story"
- Run `*atdd` workflow first to generate failing acceptance tests
- Check test file naming conventions (may not match story ID pattern)
- Verify test directory path is correct

## "Cannot determine coverage status"
- Tests may lack explicit mapping to criteria (no test IDs, unclear describe blocks)
- Review test structure and add Given-When-Then narrative
- Add test IDs in format: `{STORY_ID}-{LEVEL}-{SEQ}` (e.g., 1.3-E2E-001)

## "P0 coverage below 100%"
- This is a **BLOCKER** - do not release
- Identify missing P0 tests in gap analysis
- Run `*atdd` workflow to generate missing tests
- Verify with stakeholders that P0 classification is correct

## "Duplicate coverage detected"
- Review selective testing principles in `selective-testing.md`
- Determine if overlap is acceptable (defense in depth) or wasteful (same validation at multiple levels)
- Consolidate tests at appropriate level (logic → unit, integration → API, journey → E2E)

## "Test execution results missing" (Phase 2)
- Phase 2 gate decision requires `test_results` (CI/CD test reports)
- If missing, Phase 2 will be skipped with warning
- Provide JUnit XML, TAP, or JSON test report path via `test_results` variable

## "Gate decision is FAIL but deployment needed urgently"
- Request business waiver (if `allow_waivers: true`)
- Document approver, justification, mitigation plan
- Create follow-up stories to address gaps
- Use WAIVED decision only for non-P0 gaps

---

# Related Workflows

**Prerequisites:**
- `testarch-test-design` - Define test priorities (P0/P1/P2/P3) before tracing (required for Phase 2)
- `testarch-atdd` or `testarch-automate` - Generate tests before tracing coverage

**Complements:**
- `testarch-nfr-assess` - Non-functional requirements validation (recommended for release gates)
- `testarch-test-review` - Review test quality issues flagged in traceability

**Next Steps:**
- If gate decision is PASS/CONCERNS → Deploy and monitor
- If gate decision is FAIL → Add missing tests, re-run trace workflow
- If gate decision is WAIVED → Deploy with mitigation, create follow-up stories

---

<!-- Powered by BMAD-CORE™ -->
```
