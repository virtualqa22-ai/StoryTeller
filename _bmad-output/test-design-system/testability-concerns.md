# Testability Concerns

## ⚠️ CONCERN-001: Qdrant Embedded Vector Database Testing

**Issue:** Qdrant embedded mode lacks mature testing patterns in Rust ecosystem.

**Impact:** Story Bible semantic search (core differentiator) difficult to test reliably.

**Severity:** Medium (can work around, but adds complexity)

**Recommendations:**
1. Use separate Qdrant instances per test suite (port isolation)
2. Document cleanup patterns (delete collections after tests)
3. Create fixture embeddings with deterministic seed
4. Consider in-memory Qdrant for unit tests (if supported)
5. Integration tests with real Qdrant as smoke tests

**Blocking for Gate Check?** No - workarounds exist, but requires Sprint 0 investigation.

## ⚠️ CONCERN-002: Cross-Platform CI Cost & Maintenance

**Issue:** Testing 5 platforms (Win10, Win11, macOS Intel, macOS ARM, Linux) in CI is expensive.

**Impact:** CI costs could exceed $200/month on GitHub Actions.

**Severity:** Low (budget issue, not technical)

**Recommendations:**
1. P0 tests on all platforms (critical paths only)
2. P1 tests on Windows + macOS ARM only (most common)
3. P2 tests manual QA sampling
4. Nightly full matrix runs, not every PR
5. Self-hosted runners for Linux (cost savings)

**Blocking for Gate Check?** No - acceptable cost for quality assurance.

## ⚠️ CONCERN-003: ProseMirror Editor E2E Testing Complexity

**Issue:** ProseMirror (rich text editor) has complex DOM structure, difficult to automate.

**Impact:** E2E tests for editor interactions may be fragile (flaky tests).

**Severity:** Medium (reduces E2E test confidence)

**Recommendations:**
1. Focus unit tests on editor business logic (word count, auto-save triggers)
2. Integration tests on ProseMirror APIs (not DOM manipulation)
3. Limited E2E tests for critical workflows (type → auto-save → reload)
4. Manual QA for editor UX (60 FPS, responsiveness)
5. Performance telemetry in production to catch regressions

**Blocking for Gate Check?** No - hybrid approach mitigates risk.

## ⚠️ CONCERN-004: AI Provider Testing Strategy (Real API vs Mocks)

**Issue:** Balancing mocked AI tests (fast, deterministic) vs real API tests (slow, expensive, realistic).

**Impact:** Over-mocking risks missing real-world failures; over-reliance on real APIs slows CI.

**Severity:** Medium (test strategy tradeoff)

**Recommendations:**
1. **90% mocked providers** for unit/integration tests (speed + cost)
2. **10% real API calls** in CI (sampled, rate-limited)
3. **Nightly real API test suite** with all 5 providers
4. **Beta program** as primary real-world validation
5. **Provider abstraction layer** with trait-based testing

**Blocking for Gate Check?** No - strategy is sound, requires discipline.

---
