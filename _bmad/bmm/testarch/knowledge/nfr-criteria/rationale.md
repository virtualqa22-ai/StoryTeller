# Rationale

**The Problem**: Teams ship features that "work" functionally but fail under load, expose security vulnerabilities, or lack error recovery. NFRs are treated as optional "nice-to-haves" instead of release blockers.

**The Solution**: Define explicit NFR criteria with automated validation. Security tests verify auth/authz and secret handling. Performance tests enforce SLO/SLA thresholds with profiling evidence. Reliability tests validate error handling, retries, and health checks. Maintainability is measured by test coverage, code duplication, and observability.

**Why This Matters**:

- Prevents production incidents (security breaches, performance degradation, cascading failures)
- Provides objective release criteria (no subjective "feels fast enough")
- Automates compliance validation (audit trail for regulated environments)
- Forces clarity on ambiguous requirements (default to CONCERNS)
