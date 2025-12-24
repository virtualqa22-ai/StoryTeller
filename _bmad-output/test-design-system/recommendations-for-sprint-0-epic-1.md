# Recommendations for Sprint 0 (Epic 1)

## 🔴 **Sprint 0 Completion Gate (MANDATORY - NON-NEGOTIABLE)**

**CRITICAL MANDATE:** The following criteria MUST be 100% complete before proceeding to Epic 2. No exceptions, no shortcuts, no "we'll do it later." Product Manager and Tech Lead must sign off.

---

### **Technical Gate Criteria (Must be 100% complete):**

- [ ] **CI/CD pipeline operational on all 3 platforms** (Windows, macOS ARM, Linux)
- [ ] **Unit test framework passes sample test on CI** (Rust `cargo test` + TypeScript Vitest)
- [ ] **Integration test framework passes sample Tauri command test** (mock WebView + real SQLite)
- [ ] **E2E test framework passes sample project creation test** (Playwright + Tauri)
- [ ] **Code coverage reporting shows >0%** (infrastructure validated, not just configured)

### **Test Infrastructure Gate Criteria (Must be 100% complete):**

- [ ] **Story Bible test data factories** (characters, locations, themes) with 10+ variations each
- [ ] **Sample novel fixtures** (1K, 10K, 50K, 100K, 150K, 200K words) committed to repo
- [ ] **Contradiction scenario corpus** (100+ examples) documented and accessible
- [ ] **Mock AI provider implementations** (deterministic responses for all 5 providers)
- [ ] **Test database cleanup patterns** documented and validated in test helpers
- [ ] **Test reliability framework** implemented (deterministic waits, isolation patterns)

### **Performance Infrastructure Gate Criteria (Must be 100% complete):**

- [ ] **Criterion.rs benchmarks** run successfully in CI (smoke, p0, p1 fixtures)
- [ ] **Cold start time assertion** (<3.5s) implemented and passing on all platforms
- [ ] **Performance regression detection** configured (>10% slower = fail build)
- [ ] **Profiling setup documented** (flamegraph generation, usage instructions)
- [ ] **Performance test fixtures** (6 sizes) created and committed

### **Cross-Platform Gate Criteria (Must be 100% complete):**

- [ ] **Platform-specific test suites** defined (Windows/macOS/Linux)
- [ ] **CI matrix configured** with correct coverage percentages per priority
- [ ] **PR template** includes platform testing checklist
- [ ] **Platform rotation policy** documented and team acknowledged

### **Data Safety Gate Criteria (Must be 100% complete):**

- [ ] **Dual-database transaction strategy** decided (Option A/B/C from ASR-011)
- [ ] **Fault injection framework** operational (5 scenarios documented, testable)
- [ ] **Crash simulation** working (kill -9 during save, disk full)
- [ ] **Recovery validation helpers** implemented and tested

---

## **Definition of "Complete":**

- ✅ Code written, reviewed, merged to main
- ✅ Documentation written and reviewed by at least 1 other person
- ✅ At least 1 other team member has successfully used the infrastructure
- ✅ CI green on all platforms (Windows, macOS, Linux)
- ✅ No "TODO" comments or placeholder implementations

---

## **Enforcement Policy:**

**If Sprint 0 gate criteria are not 100% met:**
1. **Epic 2 stories CANNOT be started** (block in project management tool)
2. **Product Manager and Tech Lead must sign off** on gate completion
3. **Any pressure to skip = escalate to project stakeholders** with formal risk assessment
4. **Historical precedent:** 90% of projects that skip test infrastructure regret it 3 months later

**Sign-off Required:**

- [ ] **Product Manager:** __________ Date: __________
  - "I confirm Sprint 0 test infrastructure is 100% complete and Epic 2 can proceed"
- [ ] **Tech Lead:** __________ Date: __________
  - "I confirm all gate criteria are met, CI is operational, and test patterns are documented"

---

## **Epic 1 Stories (Suggested Breakdown):**

1. **Setup CI/CD Pipeline** (3 days)
   - GitHub Actions workflow for Windows + macOS + Linux
   - Unit test + integration test + E2E test jobs
   - Time budget enforcement (<30min per platform)

2. **Create Test Data Infrastructure** (4 days)
   - Story Bible entry factories (characters, locations, themes)
   - Sample novel fixtures (6 sizes: 1K through 200K words)
   - Contradiction scenario corpus (100+ examples)
   - Mock AI provider implementations

3. **Setup Performance Testing Infrastructure** (3 days)
   - Criterion.rs benchmarks for critical paths
   - CI gates for cold start time (<3.5s) and performance regression (>10%)
   - Profiling setup (flamegraph, perf)
   - Performance test fixtures (6 sizes)

4. **Research & Implement Dual-Database Testing Strategy** (3 days)
   - Investigate Qdrant testing patterns
   - Decide on ASR-011 approach (Option A/B/C)
   - Create Qdrant test fixtures with deterministic embeddings
   - Document test isolation approach

5. **Setup E2E Test Infrastructure** (2 days)
   - WebDriver configuration for Tauri desktop apps
   - Sample E2E test for project creation (smoke test)
   - Platform-specific setup docs (Windows, macOS, Linux)

6. **Build Fault Injection Test Framework** (3 days)
   - Crash simulation during save operations
   - Disk full, permission denied scenarios
   - Power loss simulation (kill -9)
   - Recovery validation helpers

7. **Configure Code Coverage & Test Reliability** (2 days)
   - tarpaulin (Rust) + Vitest (TypeScript) coverage reporting
   - Test health metrics dashboard
   - Flaky test quarantine policy implementation
   - Establish 70% baseline target

**Total Sprint 0 Effort:** ~20 days (4 weeks with 1 developer, or 2 weeks with 2 developers)

---

## **Defer to Later Sprints:**

- **Mutation Testing** (Epic 4+ - Story Bible validation)
- **Load Testing with k6** (Epic 3 - AI integration rate limiting)
- **Beta Telemetry Dashboards** (Epic 12 - Beta program)

---
