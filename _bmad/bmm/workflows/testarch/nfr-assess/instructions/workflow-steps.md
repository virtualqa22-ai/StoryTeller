# Workflow Steps

## Step 1: Load Context and Knowledge Base

**Actions:**

1. Load relevant knowledge fragments from `{project-root}/_bmad/bmm/testarch/tea-index.csv`:
   - `nfr-criteria.md` - Non-functional requirements criteria and thresholds (security, performance, reliability, maintainability with code examples, 658 lines, 4 examples)
   - `ci-burn-in.md` - CI/CD burn-in patterns for reliability validation (10-iteration detection, sharding, selective execution, 678 lines, 4 examples)
   - `test-quality.md` - Test quality expectations for maintainability (deterministic, isolated, explicit assertions, length/time limits, 658 lines, 5 examples)
   - `playwright-config.md` - Performance configuration patterns: parallelization, timeout standards, artifact output (722 lines, 5 examples)
   - `error-handling.md` - Reliability validation patterns: scoped exceptions, retry validation, telemetry logging, graceful degradation (736 lines, 4 examples)

2. Read story file (if provided):
   - Extract NFR requirements
   - Identify specific thresholds or SLAs
   - Note any custom NFR categories

3. Read related BMad artifacts (if available):
   - `tech-spec.md` - Technical NFR requirements and targets
   - `PRD.md` - Product-level NFR context (user expectations)
   - `test-design.md` - NFR test plan and priorities

**Output:** Complete understanding of NFR targets, evidence sources, and validation criteria

---

## Step 2: Identify NFR Categories and Thresholds

**Actions:**

1. Determine which NFR categories to assess (default: performance, security, reliability, maintainability):
   - **Performance**: Response time, throughput, resource usage
   - **Security**: Authentication, authorization, data protection, vulnerability scanning
   - **Reliability**: Error handling, recovery, availability, fault tolerance
   - **Maintainability**: Code quality, test coverage, documentation, technical debt

2. Add custom NFR categories if specified (e.g., accessibility, internationalization, compliance)

3. Gather thresholds for each NFR:
   - From tech-spec.md (primary source)
   - From PRD.md (product-level SLAs)
   - From story file (feature-specific requirements)
   - From workflow variables (default thresholds)
   - Mark thresholds as UNKNOWN if not defined

4. Never guess thresholds - if a threshold is unknown, mark the NFR as CONCERNS

**Output:** Complete list of NFRs to assess with defined (or UNKNOWN) thresholds

---

## Step 3: Gather Evidence

**Actions:**

1. For each NFR category, discover evidence sources:

   **Performance Evidence:**
   - Load test results (JMeter, k6, Lighthouse)
   - Application metrics (response times, throughput, resource usage)
   - Performance monitoring data (New Relic, Datadog, APM)
   - Playwright performance traces (if applicable)

   **Security Evidence:**
   - Security scan results (SAST, DAST, dependency scanning)
   - Authentication/authorization test results
   - Penetration test reports
   - Vulnerability assessment reports
   - Compliance audit results

   **Reliability Evidence:**
   - Error logs and error rates
   - Uptime monitoring data
   - Chaos engineering test results
   - Failover/recovery test results
   - CI burn-in results (stability over time)

   **Maintainability Evidence:**
   - Code coverage reports (Istanbul, NYC, c8)
   - Static analysis results (ESLint, SonarQube)
   - Technical debt metrics
   - Documentation completeness
   - Test quality assessment (from test-review workflow)

2. Read relevant files from evidence directories:
   - `{test_results_dir}` for test execution results
   - `{metrics_dir}` for application metrics
   - `{logs_dir}` for application logs
   - CI/CD pipeline results (if `include_ci_results` is true)

3. Mark NFRs without evidence as "NO EVIDENCE" - never infer or assume

**Output:** Comprehensive evidence inventory for each NFR

---

## Step 4: Assess NFRs with Deterministic Rules

**Actions:**

1. For each NFR, apply deterministic PASS/CONCERNS/FAIL rules:

   **PASS Criteria:**
   - Evidence exists AND meets defined threshold
   - No concerns flagged in evidence
   - Example: Response time is 350ms (threshold: 500ms) → PASS

   **CONCERNS Criteria:**
   - Threshold is UNKNOWN (not defined)
   - Evidence is MISSING or INCOMPLETE
   - Evidence is close to threshold (within 10%)
   - Evidence shows intermittent issues
   - Example: Response time is 480ms (threshold: 500ms, 96% of threshold) → CONCERNS

   **FAIL Criteria:**
   - Evidence exists BUT does not meet threshold
   - Critical evidence is MISSING
   - Evidence shows consistent failures
   - Example: Response time is 750ms (threshold: 500ms) → FAIL

2. Document findings for each NFR:
   - Status (PASS/CONCERNS/FAIL)
   - Evidence source (file path, test name, metric name)
   - Actual value vs threshold
   - Justification for status classification

3. Classify severity based on category:
   - **CRITICAL**: Security failures, reliability failures (affect users immediately)
   - **HIGH**: Performance failures, maintainability failures (affect users soon)
   - **MEDIUM**: Concerns without failures (may affect users eventually)
   - **LOW**: Missing evidence for non-critical NFRs

**Output:** Complete NFR assessment with deterministic status classifications

---

## Step 5: Identify Quick Wins and Recommended Actions

**Actions:**

1. For each NFR with CONCERNS or FAIL status, identify quick wins:
   - Low-effort, high-impact improvements
   - Configuration changes (no code changes needed)
   - Optimization opportunities (caching, indexing, compression)
   - Monitoring additions (detect issues before they become failures)

2. Provide recommended actions for each issue:
   - Specific steps to remediate (not generic advice)
   - Priority (CRITICAL, HIGH, MEDIUM, LOW)
   - Estimated effort (hours, days)
   - Owner suggestion (dev, ops, security)

3. Suggest monitoring hooks for gaps:
   - Add performance monitoring (APM, synthetic monitoring)
   - Add error tracking (Sentry, Rollbar, error logs)
   - Add security monitoring (intrusion detection, audit logs)
   - Add alerting thresholds (notify before thresholds are breached)

4. Suggest fail-fast mechanisms:
   - Add circuit breakers for reliability
   - Add rate limiting for performance
   - Add validation gates for security
   - Add smoke tests for maintainability

**Output:** Actionable remediation plan with prioritized recommendations

---

## Step 6: Generate Deliverables

**Actions:**

1. Create NFR assessment markdown file:
   - Use template from `nfr-report-template.md`
   - Include executive summary (overall status, critical issues)
   - Add NFR-by-NFR assessment (status, evidence, thresholds)
   - Add findings summary (PASS count, CONCERNS count, FAIL count)
   - Add quick wins section
   - Add recommended actions section
   - Add evidence gaps checklist
   - Save to `{output_folder}/nfr-assessment.md`

2. Generate gate YAML snippet (if enabled):

   ```yaml
   nfr_assessment:
     date: '2025-10-14'
     categories:
       performance: 'PASS'
       security: 'CONCERNS'
       reliability: 'PASS'
       maintainability: 'PASS'
     overall_status: 'CONCERNS'
     critical_issues: 0
     high_priority_issues: 1
     concerns: 2
     blockers: false
   ```

3. Generate evidence checklist (if enabled):
   - List all NFRs with MISSING or INCOMPLETE evidence
   - Assign owners for evidence collection
   - Suggest evidence sources (tests, metrics, logs)
   - Set deadlines for evidence collection

4. Update story file (if enabled and requested):
   - Add "NFR Assessment" section to story markdown
   - Link to NFR assessment report
   - Include overall status and critical issues
   - Add gate status

**Output:** Complete NFR assessment documentation ready for review and CI/CD integration

---
