# Example Review Summary

````markdown
# Test Quality Review: auth-login.spec.ts

**Quality Score**: 78/100 (B - Acceptable)
**Review Date**: 2025-10-14
**Recommendation**: Approve with Comments

# Executive Summary

Overall, the test demonstrates good structure and coverage of the login flow. However, there are several areas for improvement to enhance maintainability and prevent flakiness.

**Strengths:**

- Excellent BDD structure with clear Given-When-Then comments
- Good use of test IDs (1.3-E2E-001, 1.3-E2E-002)
- Comprehensive assertions on authentication state

**Weaknesses:**

- Hard wait detected (page.waitForTimeout(2000)) - flakiness risk
- Hardcoded test data (email: 'test@example.com') - use factories instead
- Missing fixture for common login setup - DRY violation

**Recommendation**: Address critical issue (hard wait) before merging. Other improvements can be addressed in follow-up PR.

# Critical Issues (Must Fix)

## 1. Hard Wait Detected (Line 45)

**Severity**: P0 (Critical)
**Issue**: `await page.waitForTimeout(2000)` introduces flakiness
**Fix**: Use explicit wait for element or network request instead
**Knowledge**: See test-quality.md, network-first.md

```typescript
// ❌ Bad (current)
await page.waitForTimeout(2000);
await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();

// ✅ Good (recommended)
await expect(page.locator('[data-testid="user-menu"]')).toBeVisible({ timeout: 10000 });
```
````
