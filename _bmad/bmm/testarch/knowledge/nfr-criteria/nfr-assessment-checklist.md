# NFR Assessment Checklist

Before release gate:

- [ ] **Security** (Playwright E2E + Security Tools):
  - [ ] Auth/authz tests green (unauthenticated redirect, RBAC enforced)
  - [ ] Secrets never logged or exposed in errors
  - [ ] OWASP Top 10 validated (SQL injection blocked, XSS sanitized)
  - [ ] Security audit completed (vulnerability scan, penetration test if applicable)

- [ ] **Performance** (k6 Load Testing):
  - [ ] SLO/SLA targets met with k6 evidence (p95 <500ms, error rate <1%)
  - [ ] Load testing completed (expected load)
  - [ ] Stress testing completed (breaking point identified)
  - [ ] Spike testing completed (handles traffic spikes)
  - [ ] Endurance testing completed (no memory leaks under sustained load)

- [ ] **Reliability** (Playwright E2E + API Tests):
  - [ ] Error handling graceful (500 → user-friendly message + retry)
  - [ ] Retries implemented (3 attempts on transient failures)
  - [ ] Health checks monitored (/api/health endpoint)
  - [ ] Circuit breaker tested (opens after failure threshold)
  - [ ] Offline handling validated (network disconnection graceful)

- [ ] **Maintainability** (CI Tools):
  - [ ] Test coverage ≥80% (from CI coverage report)
  - [ ] Code duplication <5% (from jscpd CI job)
  - [ ] No critical/high vulnerabilities (from npm audit CI job)
  - [ ] Structured logging validated (Playwright validates telemetry headers)
  - [ ] Error tracking configured (Sentry/monitoring integration validated)

- [ ] **Ambiguous requirements**: Default to CONCERNS (force team to clarify thresholds and evidence)
- [ ] **NFR criteria documented**: Measurable thresholds defined (not subjective "fast enough")
- [ ] **Automated validation**: NFR tests run in CI pipeline (not manual checklists)
- [ ] **Tool selection**: Right tool for each NFR (k6 for performance, Playwright for security/reliability E2E, CI tools for maintainability)
