# Example NFR Assessment

````markdown
# NFR Assessment - Story 1.3

**Feature:** User Authentication
**Date:** 2025-10-14
**Overall Status:** CONCERNS ⚠️ (1 HIGH issue)

# Executive Summary

**Assessment:** 3 PASS, 1 CONCERNS, 0 FAIL
**Blockers:** None
**High Priority Issues:** 1 (Security - MFA not enforced)
**Recommendation:** Address security concern before release

# Performance Assessment

## Response Time (p95)

- **Status:** PASS ✅
- **Threshold:** 500ms
- **Actual:** 320ms (64% of threshold)
- **Evidence:** Load test results (test-results/load-2025-10-14.json)
- **Findings:** Response time well below threshold across all percentiles

## Throughput

- **Status:** PASS ✅
- **Threshold:** 100 RPS
- **Actual:** 250 RPS (250% of threshold)
- **Evidence:** Load test results (test-results/load-2025-10-14.json)
- **Findings:** System handles 2.5x target load without degradation

# Security Assessment

## Authentication Strength

- **Status:** CONCERNS ⚠️
- **Threshold:** MFA enabled for all users
- **Actual:** MFA optional (not enforced)
- **Evidence:** Security audit (security-audit-2025-10-14.md)
- **Findings:** MFA is implemented but not enforced by default
- **Recommendation:** HIGH - Enforce MFA for all new accounts, provide migration path for existing users

## Data Protection

- **Status:** PASS ✅
- **Threshold:** PII encrypted at rest and in transit
- **Actual:** AES-256 at rest, TLS 1.3 in transit
- **Evidence:** Security scan (security-scan-2025-10-14.json)
- **Findings:** All PII properly encrypted

# Reliability Assessment

## Uptime

- **Status:** PASS ✅
- **Threshold:** 99.9% (three nines)
- **Actual:** 99.95% over 30 days
- **Evidence:** Uptime monitoring (uptime-report-2025-10-14.csv)
- **Findings:** Exceeds target with margin

## Error Rate

- **Status:** PASS ✅
- **Threshold:** < 0.1% (1 in 1000)
- **Actual:** 0.05% (1 in 2000)
- **Evidence:** Error logs (logs/errors-2025-10.log)
- **Findings:** Error rate well below threshold

# Maintainability Assessment

## Test Coverage

- **Status:** PASS ✅
- **Threshold:** >= 80%
- **Actual:** 87%
- **Evidence:** Coverage report (coverage/lcov-report/index.html)
- **Findings:** Coverage exceeds threshold with good distribution

## Code Quality

- **Status:** PASS ✅
- **Threshold:** >= 85/100
- **Actual:** 92/100
- **Evidence:** SonarQube analysis (sonarqube-report-2025-10-14.pdf)
- **Findings:** High code quality score with low technical debt

# Quick Wins

1. **Enforce MFA (Security)** - HIGH - 4 hours
   - Add configuration flag to enforce MFA for new accounts
   - No code changes needed, only config adjustment

# Recommended Actions

## Immediate (Before Release)

1. **Enforce MFA for all new accounts** - HIGH - 4 hours - Security Team
   - Add `ENFORCE_MFA=true` to production config
   - Update user onboarding flow to require MFA setup
   - Test MFA enforcement in staging environment

## Short-term (Next Sprint)

1. **Migrate existing users to MFA** - MEDIUM - 3 days - Product + Engineering
   - Design migration UX (prompt, incentives, deadline)
   - Implement migration flow with grace period
   - Communicate migration to existing users

# Evidence Gaps

- [ ] Chaos engineering test results (reliability)
  - Owner: DevOps Team
  - Deadline: 2025-10-21
  - Suggested evidence: Run chaos monkey tests in staging

- [ ] Penetration test report (security)
  - Owner: Security Team
  - Deadline: 2025-10-28
  - Suggested evidence: Schedule third-party pentest

# Gate YAML Snippet

```yaml
nfr_assessment:
  date: '2025-10-14'
  story_id: '1.3'
  categories:
    performance: 'PASS'
    security: 'CONCERNS'
    reliability: 'PASS'
    maintainability: 'PASS'
  overall_status: 'CONCERNS'
  critical_issues: 0
  high_priority_issues: 1
  medium_priority_issues: 0
  concerns: 1
  blockers: false
  recommendations:
    - 'Enforce MFA for all new accounts (HIGH - 4 hours)'
  evidence_gaps: 2
```
````
