# Phase 2 Edge Cases and Exceptions

## Missing Evidence

- [ ] If test-design.md missing, decision still possible with test results + trace
- [ ] If traceability-matrix.md missing, decision still possible with test results (but Phase 1 should provide it)
- [ ] If nfr-assessment.md missing, NFR validation marked as NOT ASSESSED
- [ ] If code coverage missing, coverage criterion marked as NOT ASSESSED
- [ ] User acknowledged gaps in evidence or provided alternative proof

## Stale Evidence

- [ ] Evidence freshness checked (if validate_evidence_freshness: true)
- [ ] Warnings issued for assessments >7 days old
- [ ] User acknowledged stale evidence or re-ran workflows
- [ ] Decision document notes any stale evidence used

## Conflicting Evidence

- [ ] Conflicts between test results and assessments resolved
- [ ] Most recent/authoritative source identified
- [ ] Conflict resolution documented in decision rationale
- [ ] User consulted if conflict cannot be resolved

## Waiver Scenarios

- [ ] Waiver only used for FAIL decision (not PASS or CONCERNS)
- [ ] Waiver has business justification (not technical convenience)
- [ ] Waiver has named approver with authority (VP/CTO/PO)
- [ ] Waiver has expiry date (does NOT apply to future releases)
- [ ] Waiver has remediation plan with concrete due date
- [ ] Security vulnerabilities are NOT waived (enforced)

---
