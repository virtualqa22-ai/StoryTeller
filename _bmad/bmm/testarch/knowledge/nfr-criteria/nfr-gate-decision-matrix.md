# NFR Gate Decision Matrix

| Category            | PASS Criteria                                | CONCERNS Criteria                            | FAIL Criteria                                  |
| ------------------- | -------------------------------------------- | -------------------------------------------- | ---------------------------------------------- |
| **Security**        | Auth/authz, secret handling, OWASP verified  | Minor gaps with clear owners                 | Critical exposure or missing controls          |
| **Performance**     | Metrics meet SLO/SLA with profiling evidence | Trending toward limits or missing baselines  | SLO/SLA breached or resource leaks detected    |
| **Reliability**     | Error handling, retries, health checks OK    | Partial coverage or missing telemetry        | No recovery path or unresolved crash scenarios |
| **Maintainability** | Clean code, tests, docs shipped together     | Duplication, low coverage, unclear ownership | Absent tests, tangled code, no observability   |

**Default**: If targets or evidence are undefined → **CONCERNS** (force team to clarify before sign-off)
