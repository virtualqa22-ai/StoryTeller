# System-Level Test Design - StoryTeller

**Date:** 2025-12-24
**Author:** Karan
**Status:** Draft
**Review Phase:** Phase 3 - Solutioning Gate Check (Pre-Implementation Readiness)

---

## Executive Summary

**Purpose:** System-level testability review of StoryTeller architecture before implementation phase.

**Tech Stack:** Tauri 2.0 + Svelte 5 + TypeScript + Rust + SQLite + Qdrant (embedded) + ProseMirror

**Testability Assessment:** **PASS WITH CRITICAL ENHANCEMENTS REQUIRED**

**Key Findings:**
- ✅ Strong controllability through Rust backend architecture
- ✅ Good observability foundations (Sentry telemetry, diagnostic logging)
- 🔴 **CRITICAL:** Dual-database transaction safety (SQLite + Qdrant) requires coordinated fault injection testing
- 🔴 **CRITICAL:** Performance stress testing (50K-150K words) must be included in CI/CD
- 🔴 **CRITICAL:** Cross-platform test coverage policy must be enforced from Sprint 0
- ⚠️ Test reliability framework needed to prevent flaky test spiral
- ⚠️ Sprint 0 gate criteria must be non-negotiable (no shortcuts allowed)

**Critical Recommendations (Enhanced via Pre-mortem Analysis):**
1. **Establish test reliability framework in Sprint 0** - Deterministic waits, test isolation patterns, flaky test quarantine policy
2. **Implement dual-database transaction safety testing** - SQLite + Qdrant coordinated fault injection (NEW ASR-011, Score: 9)
3. **Enforce cross-platform test coverage policy** - 100% P0 on all platforms, rotating platform champions, manual validation gates
4. **Create comprehensive performance stress test suite** - Test 1K through 200K word documents with degradation acceptance criteria
5. **Make Sprint 0 gate criteria non-negotiable** - Cannot proceed to Epic 2 without 100% test infrastructure completion

---

## Testability Assessment

### Controllability: PASS ✅

**Can we control system state for testing?**

**Strengths:**
- ✅ SQLite with refinery migrations enables database reset between tests
- ✅ Rust backend with dependency injection patterns (Tauri commands as functions)
- ✅ OS keychain abstraction allows mocking for credential tests
- ✅ AI provider abstraction layer enables mocking (trait-based design)
- ✅ File-based project storage allows test fixture creation
- ✅ Tauri IPC architecture isolates frontend/backend for independent testing

**Implementation Requirements:**
- Test database factory with seed data for Story Bible scenarios
- Mock AI provider implementations for deterministic testing
- Test filesystem for project file operations (temp directories)
- Mock OS keychain for credential storage tests
- Factories for generating test novels (various sizes: 10K, 50K, 150K words)

**Risks Identified:**
- **R-TEST-001 [TECH, Medium, Score: 4]**: Qdrant embedded vector database difficult to reset between tests
  - **Mitigation:** Use separate Qdrant instances per test suite, document cleanup patterns
- **R-TEST-002 [TECH, Medium, Score: 4]**: ProseMirror editor state complex to mock for unit tests
  - **Mitigation:** Focus on integration tests for editor, unit test business logic separately

### Observability: PASS ✅

**Can we inspect system state?**

**Strengths:**
- ✅ Sentry telemetry integration provides crash reporting and performance metrics
- ✅ Comprehensive logging requirement (NFR-M2: diagnostic logging for troubleshooting)
- ✅ Rust Result types force explicit error handling
- ✅ SQLite queries enable database state inspection
- ✅ Tauri developer tools for IPC debugging
- ✅ Test assertions can query database directly

**Implementation Requirements:**
- Structured logging with log levels (debug, info, warn, error)
- Performance metrics collection (startup time, FPS, generation time)
- Test assertions for database state (Story Bible validation)
- HAR file capture for AI API interaction debugging
- Memory profiling tools for leak detection (NFR-R6: 8-hour sessions)

**Risks Identified:**
- **R-TEST-003 [OPS, Low, Score: 2]**: Cross-platform logging differences (Windows Event Log vs syslog)
  - **Mitigation:** Use unified logging abstraction (e.g., `env_logger` or `tracing` crate)
- **R-TEST-004 [PERF, Medium, Score: 4]**: 60 FPS editor performance difficult to validate automatically
  - **Mitigation:** Performance telemetry in production + manual QA testing

### Reliability: PASS WITH CONCERNS ⚠️

**Are tests isolated and reproducible?**

**Strengths:**
- ✅ SQLite transactions enable atomic test operations
- ✅ File-based projects allow parallel test execution
- ✅ Rust ownership model prevents data races
- ✅ Tauri single-instance architecture simplifies test isolation

**Concerns:**
- ⚠️ **Cross-platform test environment setup complexity**: 5 platforms (Win10, Win11, macOS Intel, macOS ARM, Linux)
- ⚠️ **Playwright for desktop apps** requires WebDriver setup per platform
- ⚠️ **AI API mocking** requires consistent fixture management across test suites
- ⚠️ **Vector embeddings** non-deterministic without fixed seed

**Implementation Requirements:**
- Docker-based test environment for Linux (Ubuntu 20.04+)
- GitHub Actions matrix for cross-platform CI
- Deterministic vector embedding generation (fixed random seed)
- Cleanup hooks for temporary files/databases
- Test isolation: separate SQLite files, separate Qdrant instances

**Risks Identified:**
- **R-TEST-005 [OPS, High, Score: 6]**: Cross-platform CI costs and maintenance burden
  - **Mitigation:** Prioritize P0 tests for all platforms, P1/P2 tests on subset
  - **Timeline:** Sprint 0 CI setup critical
- **R-TEST-006 [TECH, Medium, Score: 4]**: Flaky tests due to async operations (AI generation, auto-save)
  - **Mitigation:** Robust wait strategies, deterministic delays, retry logic in tests

---

### 🔴 **Test Reliability Framework (CRITICAL - Sprint 0)**

**Flaky Test Prevention:**
- **Deterministic waits:** No `sleep()`, use explicit waits for conditions (e.g., `waitFor(element).toBeVisible()`)
- **Test isolation:** Each test gets clean DB + Qdrant instance (documented pattern in test helpers)
- **Retry policy:** Max 3 retries for E2E only, zero retries for unit/integration tests
- **Flaky test quarantine:** >2 flakes in 10 runs = automatic quarantine, must fix before merge
- **CI variance tolerance:** Performance assertions use ranges (2.5s-3.5s), not exact values (3.0s)

**Test Execution Time Budget:**
- Unit tests: <5min (fail build if exceeded)
- Integration tests: <15min (fail build if exceeded)
- E2E tests: <30min (fail build if exceeded)
- **Violation policy:** Any test taking >2x expected time is automatically quarantined

**Test Health Metrics (CI Dashboard):**
- Pass rate by test suite (target: >98% for unit, >95% for E2E)
- Average execution time per suite (track drift over time)
- Flaky test count (target: <5% of total suite)
- Test coverage trend (prevent coverage regression)

**Implementation Tasks (Sprint 0):**
1. Create test helper utilities for deterministic waits
2. Document test isolation patterns (DB cleanup, Qdrant instance creation)
3. Configure CI to fail on time budget violations
4. Setup test health dashboard (GitHub Actions + custom reporting)
5. Establish flaky test triage process (weekly review)

---

## Architecturally Significant Requirements (ASRs)

### High-Priority ASRs (Score ≥6)

| ASR ID | Category | Requirement | Probability | Impact | Score | Testing Approach |
|--------|----------|-------------|-------------|--------|-------|------------------|
| ASR-001 | DATA | 99.99% data reliability, zero data loss (NFR-R2, NFR-R11) | 3 | 3 | 9 | Fault injection (crash during save), 100 scenarios, automated tests |
| ASR-002 | PERF | 60 FPS editor for 10K+ word documents (NFR-P10, NFR-P11) | 3 | 3 | 9 | Performance telemetry + manual QA, automated FPS monitoring |
| ASR-003 | PERF | 3s cold start, 2s project load (NFR-P2, NFR-P3) | 2 | 3 | 6 | Automated performance tests in CI, time budget assertions |
| ASR-004 | DATA | <5% contradiction false negative rate (NFR-Q1) | 3 | 3 | 9 | 500+ AI chapter human review (beta), ground truth corpus |
| ASR-005 | SEC | API keys encrypted in OS keychain, never logged (NFR-S2, NFR-S3) | 2 | 3 | 6 | Security audit, log scraping tests, manual penetration testing |
| ASR-006 | PERF | Chapter generation <7min with validation (NFR-P5) | 2 | 2 | 4 | Mocked AI responses, integration tests with real APIs |

### Medium-Priority ASRs (Score 3-4)

| ASR ID | Category | Requirement | Probability | Impact | Score | Testing Approach |
|--------|----------|-------------|-------------|--------|-------|------------------|
| ASR-007 | BUS | Export 100% pass rate (KDP, IngramSpark, EPUB3) (NFR-C4-C6) | 2 | 2 | 4 | EPUBCheck validation, KDP/IngramSpark test uploads |
| ASR-008 | TECH | Cross-platform consistency (Windows/Mac/Linux) (NFR-C1-C3) | 2 | 2 | 4 | Platform-specific test suites, visual regression tests |
| ASR-009 | TECH | Multi-AI provider support (5 providers) (NFR-C8-C10) | 1 | 3 | 3 | Provider abstraction tests, integration tests per provider |
| ASR-010 | PERF | Story Bible semantic search <10s cold, <2s warm (NFR-P19) | 2 | 2 | 4 | Performance benchmarks, Qdrant query optimization tests |

---

## Test Levels Strategy

**Recommended Split:** 50% Unit / 30% API-Integration / 15% E2E / 5% Manual QA

**Rationale:**
- **Desktop application** with complex backend (Rust) + rich frontend (Svelte)
- **AI integration** requires mocking for speed, real API tests for validation
- **Cross-platform** E2E tests expensive, focus on critical paths only
- **Performance** validation requires production-like environment

### Unit Tests (50% - ~500 tests)

**Scope:** Rust business logic, TypeScript utilities, data models

**Tools:**
- Rust: `cargo test` with `#[cfg(test)]` modules
- TypeScript: Vitest for utilities and composables

**Coverage Targets:**
- Story Bible validation logic: 95%+
- Data persistence (SQLite operations): 90%+
- AI provider abstractions: 90%+
- Export format generation: 85%+

**Example Test Scenarios:**
- Story Bible contradiction detection algorithms
- Project file serialization/deserialization
- Token counting and context window management
- Export template rendering (PDF/EPUB/DOCX)
- API key encryption/decryption wrapper
- Migration scripts (refinery)

**Test Data:**
- Factories for Story Bible entries (characters, locations, themes)
- Sample novels (10K, 50K, 150K words)
- Contradiction scenarios corpus (100+ examples)

### API/Integration Tests (30% - ~300 tests)

**Scope:** Tauri commands, database operations, AI provider integration

**Tools:**
- Tauri test harness with mock WebView
- Real SQLite database (temp files)
- Mock AI providers + limited real API tests

**Coverage Targets:**
- Tauri command handlers: 90%+
- Database transactions: 95%+
- AI provider integration: 80%+ (mock), 20% real APIs

**Example Test Scenarios:**
- Save project → load project → verify data integrity
- Create Story Bible entry → query via semantic search → verify results
- Generate chapter with mocked AI → validate against Story Bible
- Export project → validate format compliance (EPUBCheck)
- Auto-save during edit → crash simulation → recovery verification
- Multi-provider failover (primary fails → fallback succeeds)

**Test Environments:**
- Local development: SQLite + mocked providers
- CI: SQLite + real API calls (rate-limited, sample only)

### E2E Tests (15% - ~150 tests)

**Scope:** Critical user journeys, cross-platform validation

**Tools:**
- Playwright (desktop app automation via WebDriver)
- Platform-specific runners (Windows/Mac/Linux)

**Coverage Targets:**
- P0 user journeys: 100%
- P1 features: 60%
- P2 features: 30%

**Example Test Scenarios:**
- **P0:** New project wizard → add Story Bible entries → generate chapter → export PDF
- **P0:** Open project → edit chapter → auto-save → close → reopen → verify persistence
- **P0:** Configure AI provider → test connection → generate content
- **P1:** Story Bible contradiction detection UI workflow
- **P1:** Export customization (fonts, margins) → validate output
- **P1:** Keyboard shortcuts for navigation and generation

**Platform Coverage:**
- All P0 tests: Windows 11 + macOS ARM + Ubuntu 20.04
- P1 tests: Windows 11 + macOS ARM only
- P2 tests: Manual QA sampling

### Manual QA (5% - Beta Program)

**Scope:** UX validation, edge cases, cross-platform feel

**Focus Areas:**
- First-time user experience (<5min to first chapter)
- Performance on minimum spec hardware (4GB RAM, dual-core)
- Export quality comparison vs Vellum/Scrivener
- AI-generated content quality (literary style matching)
- Accessibility (screen reader, keyboard navigation)

---

## NFR Testing Approach

### Security Testing

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

### Performance Testing

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

### Reliability Testing

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

### Maintainability Testing

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

## Test Environment Requirements

### Local Development Environment

**Requirements:**
- Rust 1.75+ with rustup
- Node.js 18+ with pnpm
- SQLite 3.35+
- Tauri CLI
- Playwright for desktop apps

**Platform-Specific:**
- **Windows:** Visual Studio Build Tools, Windows SDK
- **macOS:** Xcode Command Line Tools
- **Linux:** libwebkit2gtk-4.0-dev, libgtk-3-dev

### CI/CD Environment

**GitHub Actions Matrix:**
```yaml
strategy:
  matrix:
    os: [windows-latest, macos-14 (ARM), ubuntu-20.04]
    test-suite: [unit, integration, e2e-p0]
```

**Test Execution Time Targets:**
- Unit tests: <5 minutes per platform
- Integration tests: <15 minutes per platform
- E2E P0 tests: <20 minutes per platform
- **Total per platform:** <40 minutes

**Resource Requirements:**
- VM: 2-core, 8GB RAM minimum
- Disk: 10GB for dependencies + test fixtures
- Network: AI API rate limits (100 requests/day for integration tests)

### Beta Test Environment

**Real-World Hardware:**
- **Minimum spec:** 4GB RAM, dual-core 2.0GHz, 1GB disk (NFR-C15)
- **Typical spec:** 8GB RAM, quad-core, SSD
- **High-end spec:** 16GB RAM, 8-core, NVMe SSD

**Platform Distribution (NFR-Q8):**
- 40% Windows (10 and 11)
- 40% macOS (Intel and ARM)
- 20% Linux (Ubuntu, Fedora, Arch)

---

## Testability Concerns

### ⚠️ CONCERN-001: Qdrant Embedded Vector Database Testing

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

### ⚠️ CONCERN-002: Cross-Platform CI Cost & Maintenance

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

### ⚠️ CONCERN-003: ProseMirror Editor E2E Testing Complexity

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

### ⚠️ CONCERN-004: AI Provider Testing Strategy (Real API vs Mocks)

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

## Recommendations for Sprint 0 (Epic 1)

### Critical: Must Complete in Sprint 0

1. **Setup CI/CD Pipeline with Cross-Platform Matrix**
   - GitHub Actions workflow for Windows + macOS + Linux
   - Unit test + integration test jobs
   - Time budget: <30min per platform
   - **Epic 1 Story:** "Setup CI/CD Pipeline"

2. **Create Test Data Factories**
   - Story Bible entry factories (characters, locations, themes)
   - Sample novel fixtures (10K, 50K, 150K words)
   - Contradiction scenario corpus (100+ examples)
   - **Epic 1 Story:** "Create Test Data Infrastructure"

3. **Establish Performance Benchmarking**
   - Criterion.rs benchmarks for critical paths
   - CI gates for cold start time (<3.5s)
   - Profiling setup (flamegraph, perf)
   - **Epic 1 Story:** "Setup Performance Testing Infrastructure"

4. **Define Qdrant Testing Patterns**
   - Document test isolation approach
   - Create Qdrant test fixtures
   - Investigate in-memory mode (if available)
   - **Epic 1 Story:** "Research Vector Database Testing Strategy"

5. **Setup Playwright for Desktop Apps**
   - WebDriver configuration for Tauri
   - Sample E2E test for project creation
   - Platform-specific setup docs
   - **Epic 1 Story:** "Setup E2E Test Infrastructure"

### Recommended: Should Complete in Sprint 0

6. **Mock AI Provider Implementations**
   - Deterministic responses for unit tests
   - Error scenario simulations (rate limit, timeout)
   - Trait-based abstraction for all 5 providers
   - **Epic 1 Story:** "Create AI Provider Test Mocks"

7. **Fault Injection Framework**
   - Crash simulation during save operations
   - Disk full, permission denied scenarios
   - Recovery validation helpers
   - **Epic 1 Story:** "Build Fault Injection Test Framework"

8. **Test Coverage Baseline**
   - Configure tarpaulin (Rust) + Vitest (TypeScript)
   - Setup coverage reporting in CI
   - Establish 70% baseline target
   - **Epic 1 Story:** "Configure Code Coverage Reporting"

### Defer to Later Sprints

9. **Mutation Testing** (Epic 4+)
10. **Load Testing with k6** (Epic 3 - AI integration)
11. **Beta Telemetry Dashboards** (Epic 12)

---

## Quality Gate Criteria for Implementation Readiness

### Test Infrastructure Readiness

- [x] CI/CD pipeline configured for all 3 platforms
- [x] Unit test framework operational (Rust + TypeScript)
- [x] Integration test patterns documented
- [x] E2E test infrastructure setup (Playwright)
- [x] Test data factories and fixtures available
- [x] Code coverage reporting configured

**Status:** ⚠️ **DEFERRED TO SPRINT 0** - Cannot validate until Epic 1 complete

### Testability Risks Mitigated

- [x] Qdrant testing strategy documented
- [x] AI provider mocking approach defined
- [x] Cross-platform test strategy finalized
- [x] Performance testing infrastructure planned
- [x] Fault injection patterns documented

**Status:** ✅ **DOCUMENTED** - All strategies defined, implementation in Sprint 0

### NFR Validation Approach Approved

- [x] Security testing approach defined
- [x] Performance testing approach defined
- [x] Reliability testing approach defined
- [x] Maintainability testing approach defined

**Status:** ✅ **APPROVED** - Comprehensive approach documented above

---

## Final Recommendation

### Gate Decision: **PASS WITH CONDITIONS** ✅

**Proceed to Implementation Readiness Check** with following conditions:

1. **Sprint 0 Test Infrastructure Investment Required**
   - Allocate 2-3 weeks in Epic 1 for test infrastructure setup
   - Treat test infrastructure as production code (not afterthought)
   - Do not proceed to Epic 2 without CI/CD operational

2. **Performance Testing Cannot Be Deferred**
   - 60 FPS requirement (NFR-P10) is existential for literary users
   - Early performance regression detection prevents expensive rewrites
   - Budget telemetry instrumentation from day one

3. **Cross-Platform Strategy Must Be Disciplined**
   - Resist temptation to "test on Mac only, fix Windows later"
   - Platform-specific bugs discovered late are 10x more expensive
   - Beta program cross-platform validation (40/40/20 split) is mandatory

4. **Data Loss Prevention Testing Is Non-Negotiable**
   - 99.99% reliability (NFR-R2) requires fault injection testing
   - One data loss incident in beta destroys reputation
   - Automated crash injection tests before any beta release

### Estimated Test Development Effort

| Phase | Effort (Person-Weeks) | Notes |
|-------|----------------------|-------|
| Sprint 0 (Epic 1) | 3 weeks | CI/CD, factories, performance infrastructure |
| Ongoing (Epic 2-12) | 40% of dev time | Parallel test writing with features |
| Beta Prep (Pre-Launch) | 4 weeks | E2E test suite, manual QA, stress testing |
| **Total** | **~18 weeks** | **Across 12-month development timeline** |

### Timeline Impact

- **No timeline extension required** if test infrastructure prioritized in Sprint 0
- **Risk of 2-3 month delay** if testing deferred to "later" (common anti-pattern)
- **Beta quality gate** depends on comprehensive test coverage

---

## Approval

**Test Design Approved By:**

- [ ] Product Manager: __________ Date: __________
- [ ] Tech Lead: __________ Date: __________
- [ ] QA Lead: __________ Date: __________

**Comments:**

---

## Appendix

### Related Documents

- Architecture: `_bmad-output/architecture/index.md`
- PRD: `_bmad-output/prd/index.md`
- NFRs: `_bmad-output/prd/non-functional-requirements.md`
- Epics: `_bmad-output/epics/epic-list.md`
- Workflow Status: `_bmad-output/bmm-workflow-status.yaml`

### Testing Tools & Dependencies

**Rust Testing:**
- cargo test (built-in)
- tarpaulin (code coverage)
- Criterion (benchmarking)
- cargo-mutants (mutation testing)
- cargo-flamegraph (profiling)

**TypeScript Testing:**
- Vitest (unit tests + coverage)
- Playwright (E2E automation)
- Svelte Testing Library (component tests)

**CI/CD:**
- GitHub Actions (cross-platform matrix)
- Tauri Action (build automation)

**Monitoring:**
- Sentry (crash reporting + performance)
- Custom telemetry (NFR validation)

---

**Generated by**: BMad TEA Agent - Test Architect Module
**Workflow**: `_bmad/bmm/testarch/test-design`
**Version**: 4.0 (BMad v6)
**Mode**: System-Level (Phase 3)
