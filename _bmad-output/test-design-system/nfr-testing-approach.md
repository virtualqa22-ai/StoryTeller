# NFR Testing Approach

## Security Testing

**Requirements:** NFR-S1-S19 (API key encryption, local-only storage, no PII in telemetry)

**Approach:**
- **Unit tests:** API key encryption/decryption wrappers
- **Integration tests:** OS keychain integration (mock + real)
- **Security audit:** Manual code review of credential handling
- **Log scraping tests:** Automated regex search for API keys in logs
- **Penetration testing:** Manual testing of IPC security boundaries

**Tools:**
- Rust: `keyring` crate tests
- Log analysis: Grep for patterns matching API key format
- Manual: Burp Suite for IPC traffic inspection (development only)

**Gate Criteria:**
- Zero API keys logged in any scenario
- 100% keychain integration success on all platforms
- TLS certificate validation enforced

## Performance Testing

**Requirements:** NFR-P1-P21 (3s cold start, 60 FPS editor, <7min chapter generation)

**Approach:**
- **Automated benchmarks:** Criterion.rs for Rust performance
- **CI performance gates:** Fail build if startup time >3.5s
- **Load testing:** k6 scripts for AI API rate limiting
- **Profiling:** Flamegraph for hot path identification
- **Telemetry:** Production FPS monitoring via Sentry

**Tools:**
- Rust: Criterion, cargo-flamegraph
- Frontend: Playwright performance API (timing measurements)
- Monitoring: Sentry performance metrics

**Gate Criteria:**
- Cold start <3s on all platforms (CI assertion)
- Project load <2s for 150K word novel
- 60 FPS editor on 10K word chapters (manual QA validation)
- Chapter generation <7min with real API (sampled, not every CI run)

**Challenges:**
- 60 FPS validation requires real hardware, not CI VMs
- AI generation time depends on provider (mocking required for deterministic tests)

---

## 🔴 **Performance Stress Test Suite (CRITICAL - Sprint 0)**

**Test Fixture Sizes (MANDATORY):**

| Fixture Name | Word Count | Purpose | CI Frequency |
|--------------|-----------|---------|--------------|
| **smoke** | 1K words | Typical chapter, smoke tests | Every PR |
| **p0** | 10K words | NFR compliance (NFR-P10) | Every PR |
| **p1** | 50K words | Half novel, stress test | Daily |
| **p2** | 100K words | Typical novel, real-world | Daily |
| **stress** | 150K words | Maximum supported | Weekly |
| **chaos** | 200K words | Graceful degradation test | Weekly |

**Performance Degradation Acceptance Criteria:**

| Document Size | Target FPS | Acceptable FPS | Unacceptable (Fail Build) |
|---------------|------------|----------------|---------------------------|
| <10K words    | 60 FPS     | 55+ FPS        | <50 FPS                  |
| 10K-50K words | 45 FPS     | 35+ FPS        | <30 FPS                  |
| 50K-100K words| 30 FPS     | 25+ FPS        | <20 FPS                  |
| 100K-150K words| 25 FPS    | 20+ FPS        | <15 FPS                  |
| >150K words   | Warning    | 15+ FPS        | <10 FPS (blocks typing)  |

**At 200K words:** Application displays warning: "Document size (200K words) exceeds recommended limit. Performance may be degraded. Consider splitting into multiple projects."

**Performance Regression Detection (CI - ENFORCED):**
- Benchmark every PR against baseline (10K word fixture)
- **Fail build if >10% slower than baseline** (no exceptions)
- Nightly stress tests (50K, 100K, 150K word fixtures)
- Performance telemetry in beta with percentile tracking (p50, p95, p99)
- Weekly performance review meeting (review trends, identify regressions)

**Additional Performance Tests:**
- **Cold start time:** <3s from launch to interactive (all platforms)
- **Project load time:** <2s for 150K word project (measured on CI hardware)
- **Auto-save latency:** <50ms typing interruption (imperceptible to user)
- **Export generation:** <60s for 150K word PDF/EPUB/DOCX
- **Story Bible search:** <10s cold start, <2s warm cache

**Implementation Tasks (Sprint 0):**
1. Create 6 test fixture novels (1K, 10K, 50K, 100K, 150K, 200K words)
2. Setup Criterion.rs benchmarks for all fixtures
3. Configure CI to fail on >10% performance regression
4. Create performance dashboard (track trends over sprints)
5. Document performance profiling workflow (flamegraph generation)

## Reliability Testing

**Requirements:** NFR-R2-R17 (99.99% data reliability, <1 crash/100 hours, crash recovery)

**Approach:**
- **Fault injection:** Crash during save, disk full, permission denied
- **Soak testing:** 8-hour continuous editing sessions (memory leak detection)
- **Chaos engineering:** Kill process, corrupt files, network failures
- **Automated recovery tests:** 100 crash scenarios with auto-recovery validation

**Tools:**
- Rust: `panic!` injection for crash simulation
- OS: Disk quota limits, file permission changes
- CI: Repeated test runs (nightly stress tests)

**Gate Criteria:**
- 99.99% data recovery in fault injection tests (99/100 scenarios)
- Zero unrecovered data loss in beta telemetry
- <1 crash/100 hours validated in beta program

## Maintainability Testing

**Requirements:** NFR-M1-M3, NFR-M10-M11, NFR-M14 (70%+ coverage, <30min test suite, 90%+ critical path coverage)

**Approach:**
- **Code coverage:** `cargo tarpaulin` for Rust, Vitest coverage for TypeScript
- **Test execution time:** CI time budget (30min max)
- **Test quality:** Mutation testing (cargo-mutants) for critical logic

**Tools:**
- Rust: tarpaulin, cargo-mutants
- TypeScript: Vitest coverage reports
- CI: GitHub Actions with time limits

**Gate Criteria:**
- 90%+ coverage on Story Bible validation, crash recovery, save/export logic
- 70%+ overall coverage
- Test suite completes in <30min on CI runners

---
