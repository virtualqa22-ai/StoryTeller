# Example Traceability Matrix

````markdown
# Traceability Matrix - Story 1.3

**Story:** User Authentication
**Date:** 2025-10-14
**Status:** 85% Coverage (1 HIGH gap)

# Coverage Summary

| Priority  | Total Criteria | FULL Coverage | Coverage % | Status  |
| --------- | -------------- | ------------- | ---------- | ------- |
| P0        | 3              | 3             | 100%       | ✅ PASS |
| P1        | 5              | 4             | 80%        | ⚠️ WARN |
| P2        | 4              | 3             | 75%        | ✅ PASS |
| P3        | 2              | 1             | 50%        | ✅ PASS |
| **Total** | **14**         | **11**        | **79%**    | ⚠️ WARN |

# Detailed Mapping

## AC-1: User can login with email and password (P0)

- **Coverage:** FULL ✅
- **Tests:**
  - `1.3-E2E-001` - tests/e2e/auth.spec.ts:12
    - Given: User has valid credentials
    - When: User submits login form
    - Then: User is redirected to dashboard
  - `1.3-UNIT-001` - tests/unit/auth-service.spec.ts:8
    - Given: Valid email and password hash
    - When: validateCredentials is called
    - Then: Returns user object

## AC-2: User sees error for invalid credentials (P0)

- **Coverage:** FULL ✅
- **Tests:**
  - `1.3-E2E-002` - tests/e2e/auth.spec.ts:28
    - Given: User has invalid password
    - When: User submits login form
    - Then: Error message is displayed
  - `1.3-UNIT-002` - tests/unit/auth-service.spec.ts:18
    - Given: Invalid password hash
    - When: validateCredentials is called
    - Then: Throws AuthenticationError

## AC-3: User can reset password via email (P1)

- **Coverage:** PARTIAL ⚠️
- **Tests:**
  - `1.3-E2E-003` - tests/e2e/auth.spec.ts:44
    - Given: User requests password reset
    - When: User clicks reset link
    - Then: User can set new password
- **Gaps:**
  - Missing: Email delivery validation
  - Missing: Expired token handling
  - Missing: Unit test for token generation
- **Recommendation:** Add `1.3-API-001` for email service integration and `1.3-UNIT-003` for token logic

# Gap Analysis

## Critical Gaps (BLOCKER)

- None ✅

## High Priority Gaps (PR BLOCKER)

1. **AC-3: Password reset email edge cases**
   - Missing tests for expired tokens, invalid tokens, email failures
   - Recommend: `1.3-API-001` (email service integration) and `1.3-E2E-004` (error paths)
   - Impact: Users may not be able to recover accounts in error scenarios

## Medium Priority Gaps (Nightly)

1. **AC-7: Session timeout handling** - UNIT-ONLY coverage (missing E2E validation)

# Quality Assessment

## Tests with Issues

- `1.3-E2E-001` ⚠️ - 145 seconds (exceeds 90s target) - Optimize fixture setup
- `1.3-UNIT-005` ⚠️ - 320 lines (exceeds 300 line limit) - Split into multiple test files

## Tests Passing Quality Gates

- 11/13 tests (85%) meet all quality criteria ✅

# Gate YAML Snippet

```yaml
traceability:
  story_id: '1.3'
  coverage:
    overall: 79%
    p0: 100%
    p1: 80%
    p2: 75%
    p3: 50%
  gaps:
    critical: 0
    high: 1
    medium: 1
    low: 1
  status: 'WARN' # P1 coverage below 90% threshold
  recommendations:
    - 'Add 1.3-API-001 for email service integration'
    - 'Add 1.3-E2E-004 for password reset error paths'
    - 'Optimize 1.3-E2E-001 performance (145s → <90s)'
```
````
