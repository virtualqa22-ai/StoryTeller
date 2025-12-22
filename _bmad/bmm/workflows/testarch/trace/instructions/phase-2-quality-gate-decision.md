# PHASE 2: QUALITY GATE DECISION

This phase uses traceability results to make a quality gate decision (PASS/CONCERNS/FAIL/WAIVED) based on evidence and decision rules.

**When Phase 2 Runs:** Automatically after Phase 1 if `enable_gate_decision: true` (default: true)

**Skip Conditions:** If test execution results (`test_results`) not provided, warn and skip Phase 2.

---

## Step 7: Gather Quality Evidence

**Actions:**

1. **Load Phase 1 traceability results** (inherited context):
   - Coverage metrics (P0/P1/overall percentages)
   - Gap analysis (missing/partial tests)
   - Quality concerns (test quality flags)
   - Traceability matrix

2. **Load test execution results** (if `test_results` provided):
   - Read CI/CD test reports (JUnit XML, TAP, JSON)
   - Extract pass/fail counts by priority
   - Calculate pass rates:
     - **P0 pass rate**: `(P0 passed / P0 total) * 100`
     - **P1 pass rate**: `(P1 passed / P1 total) * 100`
     - **Overall pass rate**: `(All passed / All total) * 100`
   - Identify failing tests and map to criteria

3. **Load NFR assessment** (if `nfr_file` provided):
   - Read `nfr-assessment.md` or similar
   - Check critical NFR status (performance, security, scalability)
   - Flag any critical NFR failures

4. **Load supporting artifacts**:
   - `test-design.md` → Risk priorities, DoD checklist
   - `story-*.md` or `Epics.md` → Requirements context
   - `bmm-workflow-status.md` → Workflow completion status (if `check_all_workflows_complete: true`)

5. **Validate evidence freshness** (if `validate_evidence_freshness: true`):
   - Check timestamps of test-design, traceability, NFR assessments
   - Warn if artifacts are >7 days old

6. **Check prerequisite workflows** (if `check_all_workflows_complete: true`):
   - Verify test-design workflow complete
   - Verify trace workflow complete (Phase 1)
   - Verify nfr-assess workflow complete (if release-level gate)

**Output:** Consolidated evidence bundle with all quality signals

---

## Step 8: Apply Decision Rules

**If `decision_mode: "deterministic"`** (rule-based - default):

**Decision rules** (based on `workflow.yaml` thresholds):

1. **PASS** if ALL of the following are true:
   - P0 coverage ≥ `min_p0_coverage` (default: 100%)
   - P1 coverage ≥ `min_p1_coverage` (default: 90%)
   - Overall coverage ≥ `min_overall_coverage` (default: 80%)
   - P0 test pass rate = `min_p0_pass_rate` (default: 100%)
   - P1 test pass rate ≥ `min_p1_pass_rate` (default: 95%)
   - Overall test pass rate ≥ `min_overall_pass_rate` (default: 90%)
   - Critical NFRs passed (if `nfr_file` provided)
   - No unresolved security issues ≤ `max_security_issues` (default: 0)
   - No test quality red flags (hard waits, no assertions)

2. **CONCERNS** if ANY of the following are true:
   - P1 coverage 80-89% (below threshold but not critical)
   - P1 test pass rate 90-94% (below threshold but not critical)
   - Overall pass rate 85-89%
   - P2 coverage <50% (informational)
   - Some non-critical NFRs failing
   - Minor test quality concerns (large test files, inferred mappings)
   - **Note**: CONCERNS does NOT block deployment but requires acknowledgment

3. **FAIL** if ANY of the following are true:
   - P0 coverage <100% (missing critical tests)
   - P0 test pass rate <100% (failing critical tests)
   - P1 coverage <80% (significant gap)
   - P1 test pass rate <90% (significant failures)
   - Overall coverage <80%
   - Overall pass rate <85%
   - Critical NFRs failing (`max_critical_nfrs_fail` exceeded)
   - Unresolved security issues (`max_security_issues` exceeded)
   - Major test quality issues (tests with no assertions, pervasive hard waits)

4. **WAIVED** (only if `allow_waivers: true`):
   - Decision would be FAIL based on rules above
   - Business stakeholder has approved waiver
   - Waiver documented with:
     - Justification (time constraint, known limitation, acceptable risk)
     - Approver name and date
     - Mitigation plan (follow-up stories, manual testing)
   - Waiver evidence linked (email, Slack thread, ticket)

**Risk tolerance adjustments:**

- If `allow_p2_failures: true` → P2 test failures do NOT affect gate decision
- If `allow_p3_failures: true` → P3 test failures do NOT affect gate decision
- If `escalate_p1_failures: true` → P1 failures require explicit manager/lead approval

**If `decision_mode: "manual"`:**

- Present evidence summary to team
- Recommend decision based on rules above
- Team makes final call in meeting/chat
- Document decision with approver names

**Output:** Gate decision (PASS/CONCERNS/FAIL/WAIVED) with rule-based rationale

---

## Step 9: Document Decision and Evidence

**Actions:**

1. **Create gate decision document**:
   - Save to `gate_output_file` (default: `{output_folder}/gate-decision-{gate_type}-{story_id}.md`)
   - Use structure below

2. **Document structure**:

```markdown
# Quality Gate Decision: {gate_type} {story_id/epic_num/release_version}

**Decision**: [PASS / CONCERNS / FAIL / WAIVED]
**Date**: {date}
**Decider**: {decision_mode} (deterministic | manual)
**Evidence Date**: {test_results_date}

---

# Summary

[1-2 sentence summary of decision and key factors]

---

# Decision Criteria

| Criterion         | Threshold | Actual   | Status  |
| ----------------- | --------- | -------- | ------- |
| P0 Coverage       | ≥100%     | 100%     | ✅ PASS |
| P1 Coverage       | ≥90%      | 88%      | ⚠️ FAIL |
| Overall Coverage  | ≥80%      | 92%      | ✅ PASS |
| P0 Pass Rate      | 100%      | 100%     | ✅ PASS |
| P1 Pass Rate      | ≥95%      | 98%      | ✅ PASS |
| Overall Pass Rate | ≥90%      | 96%      | ✅ PASS |
| Critical NFRs     | All Pass  | All Pass | ✅ PASS |
| Security Issues   | 0         | 0        | ✅ PASS |

**Overall Status**: 7/8 criteria met → Decision: **CONCERNS**

---

# Evidence Summary

## Test Coverage (from Phase 1 Traceability)

- **P0 Coverage**: 100% (5/5 criteria fully covered)
- **P1 Coverage**: 88% (7/8 criteria fully covered)
- **Overall Coverage**: 92% (12/13 criteria covered)
- **Gap**: AC-5 (P1) missing E2E test

## Test Execution Results

- **P0 Pass Rate**: 100% (12/12 tests passed)
- **P1 Pass Rate**: 98% (45/46 tests passed)
- **Overall Pass Rate**: 96% (67/70 tests passed)
- **Failures**: 3 P2 tests (non-blocking)

## Non-Functional Requirements

- Performance: ✅ PASS (response time <500ms)
- Security: ✅ PASS (no vulnerabilities)
- Scalability: ✅ PASS (handles 10K users)

## Test Quality

- All tests have explicit assertions ✅
- No hard waits detected ✅
- Test files <300 lines ✅
- Test IDs follow convention ✅

---

# Decision Rationale

**Why CONCERNS (not PASS)**:

- P1 coverage at 88% is below 90% threshold
- AC-5 (P1 priority) missing E2E test for error handling scenario
- This is a known gap from test-design phase

**Why CONCERNS (not FAIL)**:

- P0 coverage is 100% (critical paths validated)
- Overall coverage is 92% (above 80% threshold)
- Test pass rate is excellent (96% overall)
- Gap is isolated to one P1 criterion (not systemic)

**Recommendation**:

- Acknowledge gap and proceed with deployment
- Add missing AC-5 E2E test in next sprint
- Create follow-up story: "Add E2E test for AC-5 error handling"

---

# Next Steps

- [ ] Create follow-up story for AC-5 E2E test
- [ ] Deploy to staging environment
- [ ] Monitor production for edge cases related to AC-5
- [ ] Update traceability matrix after follow-up test added

---

# References

- Traceability Matrix: `_bmad/output/traceability-matrix.md`
- Test Design: `_bmad/output/test-design-epic-2.md`
- Test Results: `ci-artifacts/test-report-2025-01-15.xml`
- NFR Assessment: `_bmad/output/nfr-assessment-release-1.2.md`
```

3. **Include evidence links** (if `require_evidence: true`):
   - Link to traceability matrix
   - Link to test execution reports (CI artifacts)
   - Link to NFR assessment
   - Link to test-design document
   - Link to relevant PRs, commits, deployments

4. **Waiver documentation** (if decision is WAIVED):
   - Approver name and role (e.g., "Jane Doe, Engineering Manager")
   - Approval date and method (e.g., "2025-01-15, Slack thread")
   - Justification (e.g., "Time-boxed MVP, missing tests will be added in v1.1")
   - Mitigation plan (e.g., "Manual testing by QA, follow-up stories created")
   - Evidence link (e.g., "Slack: #engineering 2025-01-15 3:42pm")

**Output:** Complete gate decision document with evidence and rationale

---

## Step 10: Update Status Tracking and Notify

**Actions:**

1. **Update workflow status** (if `append_to_history: true`):
   - Append gate decision to `bmm-workflow-status.md` under "Gate History" section
   - Format:

     ```markdown
     ## Gate History

     ### Story 1.3 - User Login (2025-01-15)

     - **Decision**: CONCERNS
     - **Reason**: P1 coverage 88% (below 90%)
     - **Document**: [gate-decision-story-1.3.md](_bmad/output/gate-decision-story-1.3.md)
     - **Action**: Deploy with follow-up story for AC-5
     ```

2. **Generate stakeholder notification** (if `notify_stakeholders: true`):
   - Create concise summary message for team communication
   - Include: Decision, key metrics, action items
   - Format for Slack/email/chat:

   ```
   🚦 Quality Gate Decision: Story 1.3 - User Login

   Decision: ⚠️ CONCERNS
   - P0 Coverage: ✅ 100%
   - P1 Coverage: ⚠️ 88% (below 90%)
   - Test Pass Rate: ✅ 96%

   Action Required:
   - Create follow-up story for AC-5 E2E test
   - Deploy to staging for validation

   Full Report: _bmad/output/gate-decision-story-1.3.md
   ```

3. **Request sign-off** (if `require_sign_off: true`):
   - Prompt for named approver (tech lead, QA lead, PM)
   - Document approver name and timestamp in gate decision
   - Block until sign-off received (interactive prompt)

**Output:** Status tracking updated, stakeholders notified, sign-off obtained (if required)

**Workflow Complete**: Both Phase 1 (traceability) and Phase 2 (gate decision) deliverables generated.

---
