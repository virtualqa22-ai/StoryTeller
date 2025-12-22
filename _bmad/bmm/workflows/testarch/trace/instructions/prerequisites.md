# Prerequisites

**Required (Phase 1):**

- Acceptance criteria (from story file OR provided inline)
- Implemented test suite (or acknowledge gaps to be addressed)

**Required (Phase 2 - if `enable_gate_decision: true`):**

- Test execution results (CI/CD test reports, pass/fail rates)
- Test design with risk priorities (P0/P1/P2/P3)

**Recommended:**

- `test-design.md` (for risk assessment and priority context)
- `nfr-assessment.md` (for release-level gates)
- `tech-spec.md` (for technical implementation context)
- Test framework configuration (playwright.config.ts, jest.config.js, etc.)

**Halt Conditions:**

- If story lacks any implemented tests AND no gaps are acknowledged, recommend running `*atdd` workflow first
- If acceptance criteria are completely missing, halt and request them
- If Phase 2 enabled but test execution results missing, warn and skip gate decision

---
