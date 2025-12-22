# Example Gate Decisions

## Example 1: PASS (All Criteria Met)

```
Decision: ✅ PASS

Summary: All quality criteria met. Story 1.3 is ready for production deployment.

Evidence:
- P0 Coverage: 100% (5/5 criteria)
- P1 Coverage: 95% (19/20 criteria)
- Overall Coverage: 92% (24/26 criteria)
- P0 Pass Rate: 100% (12/12 tests)
- P1 Pass Rate: 98% (45/46 tests)
- Overall Pass Rate: 96% (67/70 tests)
- NFRs: All pass (performance, security, scalability)

Action: Deploy to production ✅
```

## Example 2: CONCERNS (Minor Gap, Non-Blocking)

```
Decision: ⚠️ CONCERNS

Summary: P1 coverage slightly below threshold (88% vs 90%). Recommend deploying with follow-up story.

Evidence:
- P0 Coverage: 100% ✅
- P1 Coverage: 88% ⚠️ (below 90%)
- Overall Coverage: 92% ✅
- Test Pass Rate: 96% ✅
- Gap: AC-5 (P1) missing E2E test

Action:
- Deploy to staging for validation
- Create follow-up story for AC-5 E2E test
- Monitor production for edge cases related to AC-5
```

## Example 3: FAIL (P0 Gap, Blocking)

```
Decision: ❌ FAIL

Summary: P0 coverage incomplete. Missing critical validation test. BLOCKING deployment.

Evidence:
- P0 Coverage: 80% ❌ (4/5 criteria, AC-2 missing)
- AC-2: "User cannot login with invalid credentials" (P0 priority)
- No tests validate login security for invalid credentials
- This is a critical security gap

Action:
- Add P0 test for AC-2: 1.3-E2E-004 (invalid credentials)
- Re-run traceability after test added
- Re-evaluate gate decision after P0 coverage = 100%

Deployment BLOCKED until P0 gap resolved ❌
```

## Example 4: WAIVED (Business Decision)

```
Decision: ⚠️ WAIVED

Summary: P1 coverage below threshold (75% vs 90%), but waived for MVP launch.

Evidence:
- P0 Coverage: 100% ✅
- P1 Coverage: 75% ❌ (below 90%)
- Gap: 5 P1 criteria missing E2E tests (error handling, edge cases)

Waiver:
- Approver: Jane Doe, Engineering Manager
- Date: 2025-01-15
- Justification: Time-boxed MVP for investor demo. Core functionality (P0) fully validated. P1 gaps are low-risk edge cases.
- Mitigation: Manual QA testing for P1 scenarios, follow-up stories created for automated tests in v1.1
- Evidence: Slack #engineering 2025-01-15 3:42pm

Action:
- Deploy to production with manual QA validation ✅
- Add 5 E2E tests for P1 gaps in v1.1 sprint
- Monitor production logs for edge case occurrences
```

---
