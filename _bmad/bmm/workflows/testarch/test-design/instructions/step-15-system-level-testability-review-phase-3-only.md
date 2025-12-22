# Step 1.5: System-Level Testability Review (Phase 3 Only)

**Skip this step if Epic-Level Mode.** This step only executes in System-Level Mode.

## Actions

1. **Review Architecture for Testability**

   Evaluate architecture against these criteria:

   **Controllability:**
   - Can we control system state for testing? (API seeding, factories, database reset)
   - Are external dependencies mockable? (interfaces, dependency injection)
   - Can we trigger error conditions? (chaos engineering, fault injection)

   **Observability:**
   - Can we inspect system state? (logging, metrics, traces)
   - Are test results deterministic? (no race conditions, clear success/failure)
   - Can we validate NFRs? (performance metrics, security audit logs)

   **Reliability:**
   - Are tests isolated? (parallel-safe, stateless, cleanup discipline)
   - Can we reproduce failures? (deterministic waits, HAR capture, seed data)
   - Are components loosely coupled? (mockable, testable boundaries)

2. **Identify Architecturally Significant Requirements (ASRs)**

   From PRD NFRs and architecture decisions, identify quality requirements that:
   - Drive architecture decisions (e.g., "Must handle 10K concurrent users" → caching architecture)
   - Pose testability challenges (e.g., "Sub-second response time" → performance test infrastructure)
   - Require special test environments (e.g., "Multi-region deployment" → regional test instances)

   Score each ASR using risk matrix (probability × impact).

3. **Define Test Levels Strategy**

   Based on architecture (mobile, web, API, microservices, monolith):
   - Recommend unit/integration/E2E split (e.g., 70/20/10 for API-heavy, 40/30/30 for UI-heavy)
   - Identify test environment needs (local, staging, ephemeral, production-like)
   - Define testing approach per technology (Playwright for web, Maestro for mobile, k6 for performance)

4. **Assess NFR Testing Approach**

   For each NFR category:
   - **Security**: Auth/authz tests, OWASP validation, secret handling (Playwright E2E + security tools)
   - **Performance**: Load/stress/spike testing with k6, SLO/SLA thresholds
   - **Reliability**: Error handling, retries, circuit breakers, health checks (Playwright + API tests)
   - **Maintainability**: Coverage targets, code quality gates, observability validation

5. **Flag Testability Concerns**

   Identify architecture decisions that harm testability:
   - ❌ Tight coupling (no interfaces, hard dependencies)
   - ❌ No dependency injection (can't mock external services)
   - ❌ Hardcoded configurations (can't test different envs)
   - ❌ Missing observability (can't validate NFRs)
   - ❌ Stateful designs (can't parallelize tests)

   **Critical:** If testability concerns are blockers (e.g., "Architecture makes performance testing impossible"), document as CONCERNS or FAIL recommendation for gate check.

6. **Output System-Level Test Design**

   Write to `{output_folder}/test-design-system.md` containing:

   ```markdown
   # System-Level Test Design

   ## Testability Assessment

   - Controllability: [PASS/CONCERNS/FAIL with details]
   - Observability: [PASS/CONCERNS/FAIL with details]
   - Reliability: [PASS/CONCERNS/FAIL with details]

   ## Architecturally Significant Requirements (ASRs)

   [Risk-scored quality requirements]

   ## Test Levels Strategy

   - Unit: [X%] - [Rationale]
   - Integration: [Y%] - [Rationale]
   - E2E: [Z%] - [Rationale]

   ## NFR Testing Approach

   - Security: [Approach with tools]
   - Performance: [Approach with tools]
   - Reliability: [Approach with tools]
   - Maintainability: [Approach with tools]

   ## Test Environment Requirements

   [Infrastructure needs based on deployment architecture]

   ## Testability Concerns (if any)

   [Blockers or concerns that should inform solutioning gate check]

   ## Recommendations for Sprint 0

   [Specific actions for *framework and *ci workflows]
   ```

**After System-Level Mode:** Skip to Step 4 (Generate Deliverables) - Steps 2-3 are epic-level only.

---
