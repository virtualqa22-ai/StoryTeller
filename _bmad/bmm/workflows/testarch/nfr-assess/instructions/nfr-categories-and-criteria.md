# NFR Categories and Criteria

## Performance

**Criteria:**

- Response time (p50, p95, p99 percentiles)
- Throughput (requests per second, transactions per second)
- Resource usage (CPU, memory, disk, network)
- Scalability (horizontal, vertical)

**Thresholds (Default):**

- Response time p95: 500ms
- Throughput: 100 RPS
- CPU usage: < 70% average
- Memory usage: < 80% max

**Evidence Sources:**

- Load test results (JMeter, k6, Gatling)
- APM data (New Relic, Datadog, Dynatrace)
- Lighthouse reports (for web apps)
- Playwright performance traces

---

## Security

**Criteria:**

- Authentication (login security, session management)
- Authorization (access control, permissions)
- Data protection (encryption, PII handling)
- Vulnerability management (SAST, DAST, dependency scanning)
- Compliance (GDPR, HIPAA, PCI-DSS)

**Thresholds (Default):**

- Security score: >= 85/100
- Critical vulnerabilities: 0
- High vulnerabilities: < 3
- Authentication strength: MFA enabled

**Evidence Sources:**

- SAST results (SonarQube, Checkmarx, Veracode)
- DAST results (OWASP ZAP, Burp Suite)
- Dependency scanning (Snyk, Dependabot, npm audit)
- Penetration test reports
- Security audit logs

---

## Reliability

**Criteria:**

- Availability (uptime percentage)
- Error handling (graceful degradation, error recovery)
- Fault tolerance (redundancy, failover)
- Disaster recovery (backup, restore, RTO/RPO)
- Stability (CI burn-in, chaos engineering)

**Thresholds (Default):**

- Uptime: >= 99.9% (three nines)
- Error rate: < 0.1% (1 in 1000 requests)
- MTTR (Mean Time To Recovery): < 15 minutes
- CI burn-in: 100 consecutive successful runs

**Evidence Sources:**

- Uptime monitoring (Pingdom, UptimeRobot, StatusCake)
- Error logs and error rates
- CI burn-in results (see `ci-burn-in.md`)
- Chaos engineering test results (Chaos Monkey, Gremlin)
- Incident reports and postmortems

---

## Maintainability

**Criteria:**

- Code quality (complexity, duplication, code smells)
- Test coverage (unit, integration, E2E)
- Documentation (code comments, README, architecture docs)
- Technical debt (debt ratio, code churn)
- Test quality (from test-review workflow)

**Thresholds (Default):**

- Test coverage: >= 80%
- Code quality score: >= 85/100
- Technical debt ratio: < 5%
- Documentation completeness: >= 90%

**Evidence Sources:**

- Coverage reports (Istanbul, NYC, c8, JaCoCo)
- Static analysis (ESLint, SonarQube, CodeClimate)
- Documentation audit (manual or automated)
- Test review report (from test-review workflow)
- Git metrics (code churn, commit frequency)

---
