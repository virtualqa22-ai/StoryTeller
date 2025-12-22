# Integration Points

- **Used in workflows**: `*nfr-assess` (automated NFR validation), `*trace` (gate decision Phase 2), `*test-design` (NFR risk assessment via Utility Tree)
- **Related fragments**: `risk-governance.md` (NFR risk scoring), `probability-impact.md` (NFR impact assessment), `test-quality.md` (maintainability standards), `test-levels-framework.md` (system-level testing for NFRs)
- **Tools by NFR Category**:
  - **Security**: Playwright (E2E auth/authz), OWASP ZAP, Burp Suite, npm audit, Snyk
  - **Performance**: k6 (load/stress/spike/endurance), Lighthouse (Core Web Vitals), Artillery
  - **Reliability**: Playwright (E2E error handling), API tests (retries, health checks), Chaos Engineering tools
  - **Maintainability**: GitHub Actions (coverage, duplication, audit), jscpd, Playwright (observability validation)

_Source: Test Architect course (NFR testing approaches, Utility Tree, Quality Scenarios), ISO/IEC 25010 Software Quality Characteristics, OWASP Top 10, k6 documentation, SRE practices_
