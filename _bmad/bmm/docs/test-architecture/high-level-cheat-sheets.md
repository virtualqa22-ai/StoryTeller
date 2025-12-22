# High-Level Cheat Sheets

These cheat sheets map TEA workflows to the **BMad Method and Enterprise tracks** across the **4-Phase Methodology** (Phase 1: Analysis, Phase 2: Planning, Phase 3: Solutioning, Phase 4: Implementation).

**Note:** Quick Flow projects typically don't require TEA (covered in Overview). These cheat sheets focus on BMad Method and Enterprise tracks where TEA adds value.

**Legend for Track Deltas:**

- ➕ = New workflow or phase added (doesn't exist in baseline)
- 🔄 = Modified focus (same workflow, different emphasis or purpose)
- 📦 = Additional output or archival requirement

## Greenfield - BMad Method (Simple/Standard Work)

**Planning Track:** BMad Method (PRD + Architecture)
**Use Case:** New projects with standard complexity

| Workflow Stage             | Test Architect                                                    | Dev / Team                                                                          | Outputs                                                    |
| -------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| **Phase 1**: Discovery     | -                                                                 | Analyst `*product-brief` (optional)                                                 | `product-brief.md`                                         |
| **Phase 2**: Planning      | -                                                                 | PM `*prd` (creates PRD with FRs/NFRs)                                               | PRD with functional/non-functional requirements            |
| **Phase 3**: Solutioning   | Run `*framework`, `*ci` AFTER architecture and epic creation      | Architect `*architecture`, `*create-epics-and-stories`, `*implementation-readiness` | Architecture, epics/stories, test scaffold, CI pipeline    |
| **Phase 4**: Sprint Start  | -                                                                 | SM `*sprint-planning`                                                               | Sprint status file with all epics and stories              |
| **Phase 4**: Epic Planning | Run `*test-design` for THIS epic (per-epic test plan)             | Review epic scope                                                                   | `test-design-epic-N.md` with risk assessment and test plan |
| **Phase 4**: Story Dev     | (Optional) `*atdd` before dev, then `*automate` after             | SM `*create-story`, DEV implements                                                  | Tests, story implementation                                |
| **Phase 4**: Story Review  | Execute `*test-review` (optional), re-run `*trace`                | Address recommendations, update code/tests                                          | Quality report, refreshed coverage matrix                  |
| **Phase 4**: Release Gate  | (Optional) `*test-review` for final audit, Run `*trace` (Phase 2) | Confirm Definition of Done, share release notes                                     | Quality audit, Gate YAML + release summary                 |

<details>
<summary>Execution Notes</summary>

- Run `*framework` only once per repo or when modern harness support is missing.
- **Phase 3 (Solutioning)**: After architecture is complete, run `*framework` and `*ci` to setup test infrastructure based on architectural decisions.
- **Phase 4 starts**: After solutioning is complete, sprint planning loads all epics.
- **`*test-design` runs per-epic**: At the beginning of working on each epic, run `*test-design` to create a test plan for THAT specific epic/feature. Output: `test-design-epic-N.md`.
- Use `*atdd` before coding when the team can adopt ATDD; share its checklist with the dev agent.
- Post-implementation, keep `*trace` current, expand coverage with `*automate`, optionally review test quality with `*test-review`. For release gate, run `*trace` with Phase 2 enabled to get deployment decision.
- Use `*test-review` after `*atdd` to validate generated tests, after `*automate` to ensure regression quality, or before gate for final audit.

</details>

<details>
<summary>Worked Example – “Nova CRM” Greenfield Feature</summary>

1. **Planning (Phase 2):** Analyst runs `*product-brief`; PM executes `*prd` to produce PRD with FRs/NFRs.
2. **Solutioning (Phase 3):** Architect completes `*architecture` for the new module; `*create-epics-and-stories` generates epics/stories based on architecture; TEA sets up test infrastructure via `*framework` and `*ci` based on architectural decisions; gate check validates planning completeness.
3. **Sprint Start (Phase 4):** Scrum Master runs `*sprint-planning` to load all epics into sprint status.
4. **Epic 1 Planning (Phase 4):** TEA runs `*test-design` to create test plan for Epic 1, producing `test-design-epic-1.md` with risk assessment.
5. **Story Implementation (Phase 4):** For each story in Epic 1, SM generates story via `*create-story`; TEA optionally runs `*atdd`; Dev implements with guidance from failing tests.
6. **Post-Dev (Phase 4):** TEA runs `*automate`, optionally `*test-review` to audit test quality, re-runs `*trace` to refresh coverage.
7. **Release Gate:** TEA runs `*trace` with Phase 2 enabled to generate gate decision.

</details>

## Brownfield - BMad Method or Enterprise (Simple or Complex)

**Planning Tracks:** BMad Method or Enterprise Method
**Use Case:** Existing codebases - simple additions (BMad Method) or complex enterprise requirements (Enterprise Method)

**🔄 Brownfield Deltas from Greenfield:**

- ➕ Documentation (Prerequisite) - Document existing codebase if undocumented
- ➕ Phase 2: `*trace` - Baseline existing test coverage before planning
- 🔄 Phase 4: `*test-design` - Focus on regression hotspots and brownfield risks
- 🔄 Phase 4: Story Review - May include `*nfr-assess` if not done earlier

| Workflow Stage                     | Test Architect                                                               | Dev / Team                                                                          | Outputs                                                                |
| ---------------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **Documentation**: Prerequisite ➕ | -                                                                            | Analyst `*document-project` (if undocumented)                                       | Comprehensive project documentation                                    |
| **Phase 1**: Discovery             | -                                                                            | Analyst/PM/Architect rerun planning workflows                                       | Updated planning artifacts in `{output_folder}`                        |
| **Phase 2**: Planning              | Run ➕ `*trace` (baseline coverage)                                          | PM `*prd` (creates PRD with FRs/NFRs)                                               | PRD with FRs/NFRs, ➕ coverage baseline                                |
| **Phase 3**: Solutioning           | Run `*framework`, `*ci` AFTER architecture and epic creation                 | Architect `*architecture`, `*create-epics-and-stories`, `*implementation-readiness` | Architecture, epics/stories, test framework, CI pipeline               |
| **Phase 4**: Sprint Start          | -                                                                            | SM `*sprint-planning`                                                               | Sprint status file with all epics and stories                          |
| **Phase 4**: Epic Planning         | Run `*test-design` for THIS epic 🔄 (regression hotspots)                    | Review epic scope and brownfield risks                                              | `test-design-epic-N.md` with brownfield risk assessment and mitigation |
| **Phase 4**: Story Dev             | (Optional) `*atdd` before dev, then `*automate` after                        | SM `*create-story`, DEV implements                                                  | Tests, story implementation                                            |
| **Phase 4**: Story Review          | Apply `*test-review` (optional), re-run `*trace`, ➕ `*nfr-assess` if needed | Resolve gaps, update docs/tests                                                     | Quality report, refreshed coverage matrix, NFR report                  |
| **Phase 4**: Release Gate          | (Optional) `*test-review` for final audit, Run `*trace` (Phase 2)            | Capture sign-offs, share release notes                                              | Quality audit, Gate YAML + release summary                             |

<details>
<summary>Execution Notes</summary>

- Lead with `*trace` during Planning (Phase 2) to baseline existing test coverage before architecture work begins.
- **Phase 3 (Solutioning)**: After architecture is complete, run `*framework` and `*ci` to modernize test infrastructure. For brownfield, framework may need to integrate with or replace existing test setup.
- **Phase 4 starts**: After solutioning is complete and sprint planning loads all epics.
- **`*test-design` runs per-epic**: At the beginning of working on each epic, run `*test-design` to identify regression hotspots, integration risks, and mitigation strategies for THAT specific epic/feature. Output: `test-design-epic-N.md`.
- Use `*atdd` when stories benefit from ATDD; otherwise proceed to implementation and rely on post-dev automation.
- After development, expand coverage with `*automate`, optionally review test quality with `*test-review`, re-run `*trace` (Phase 2 for gate decision). Run `*nfr-assess` now if non-functional risks weren't addressed earlier.
- Use `*test-review` to validate existing brownfield tests or audit new tests before gate.

</details>

<details>
<summary>Worked Example – “Atlas Payments” Brownfield Story</summary>

1. **Planning (Phase 2):** PM executes `*prd` to create PRD with FRs/NFRs; TEA runs `*trace` to baseline existing coverage.
2. **Solutioning (Phase 3):** Architect triggers `*architecture` capturing legacy payment flows and integration architecture; `*create-epics-and-stories` generates Epic 1 (Payment Processing) based on architecture; TEA sets up `*framework` and `*ci` based on architectural decisions; gate check validates planning.
3. **Sprint Start (Phase 4):** Scrum Master runs `*sprint-planning` to load Epic 1 into sprint status.
4. **Epic 1 Planning (Phase 4):** TEA runs `*test-design` for Epic 1 (Payment Processing), producing `test-design-epic-1.md` that flags settlement edge cases, regression hotspots, and mitigation plans.
5. **Story Implementation (Phase 4):** For each story in Epic 1, SM generates story via `*create-story`; TEA runs `*atdd` producing failing Playwright specs; Dev implements with guidance from tests and checklist.
6. **Post-Dev (Phase 4):** TEA applies `*automate`, optionally `*test-review` to audit test quality, re-runs `*trace` to refresh coverage.
7. **Release Gate:** TEA performs `*nfr-assess` to validate SLAs, runs `*trace` with Phase 2 enabled to generate gate decision (PASS/CONCERNS/FAIL).

</details>

## Greenfield - Enterprise Method (Enterprise/Compliance Work)

**Planning Track:** Enterprise Method (BMad Method + extended security/devops/test strategies)
**Use Case:** New enterprise projects with compliance, security, or complex regulatory requirements

**🏢 Enterprise Deltas from BMad Method:**

- ➕ Phase 1: `*research` - Domain and compliance research (recommended)
- ➕ Phase 2: `*nfr-assess` - Capture NFR requirements early (security/performance/reliability)
- 🔄 Phase 4: `*test-design` - Enterprise focus (compliance, security architecture alignment)
- 📦 Release Gate - Archive artifacts and compliance evidence for audits

| Workflow Stage             | Test Architect                                                           | Dev / Team                                                                          | Outputs                                                            |
| -------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| **Phase 1**: Discovery     | -                                                                        | Analyst ➕ `*research`, `*product-brief`                                            | Domain research, compliance analysis, product brief                |
| **Phase 2**: Planning      | Run ➕ `*nfr-assess`                                                     | PM `*prd` (creates PRD with FRs/NFRs), UX `*create-ux-design`                       | Enterprise PRD with FRs/NFRs, UX design, ➕ NFR documentation      |
| **Phase 3**: Solutioning   | Run `*framework`, `*ci` AFTER architecture and epic creation             | Architect `*architecture`, `*create-epics-and-stories`, `*implementation-readiness` | Architecture, epics/stories, test framework, CI pipeline           |
| **Phase 4**: Sprint Start  | -                                                                        | SM `*sprint-planning`                                                               | Sprint plan with all epics                                         |
| **Phase 4**: Epic Planning | Run `*test-design` for THIS epic 🔄 (compliance focus)                   | Review epic scope and compliance requirements                                       | `test-design-epic-N.md` with security/performance/compliance focus |
| **Phase 4**: Story Dev     | (Optional) `*atdd`, `*automate`, `*test-review`, `*trace` per story      | SM `*create-story`, DEV implements                                                  | Tests, fixtures, quality reports, coverage matrices                |
| **Phase 4**: Release Gate  | Final `*test-review` audit, Run `*trace` (Phase 2), 📦 archive artifacts | Capture sign-offs, 📦 compliance evidence                                           | Quality audit, updated assessments, gate YAML, 📦 audit trail      |

<details>
<summary>Execution Notes</summary>

- `*nfr-assess` runs early in Planning (Phase 2) to capture compliance, security, and performance requirements upfront.
- **Phase 3 (Solutioning)**: After architecture is complete, run `*framework` and `*ci` with enterprise-grade configurations (selective testing, burn-in jobs, caching, notifications).
- **Phase 4 starts**: After solutioning is complete and sprint planning loads all epics.
- **`*test-design` runs per-epic**: At the beginning of working on each epic, run `*test-design` to create an enterprise-focused test plan for THAT specific epic, ensuring alignment with security architecture, performance targets, and compliance requirements. Output: `test-design-epic-N.md`.
- Use `*atdd` for stories when feasible so acceptance tests can lead implementation.
- Use `*test-review` per story or sprint to maintain quality standards and ensure compliance with testing best practices.
- Prior to release, rerun coverage (`*trace`, `*automate`), perform final quality audit with `*test-review`, and formalize the decision with `*trace` Phase 2 (gate decision); archive artifacts for compliance audits.

</details>

<details>
<summary>Worked Example – “Helios Ledger” Enterprise Release</summary>

1. **Planning (Phase 2):** Analyst runs `*research` and `*product-brief`; PM completes `*prd` creating PRD with FRs/NFRs; TEA runs `*nfr-assess` to establish NFR targets.
2. **Solutioning (Phase 3):** Architect completes `*architecture` with enterprise considerations; `*create-epics-and-stories` generates epics/stories based on architecture; TEA sets up `*framework` and `*ci` with enterprise-grade configurations based on architectural decisions; gate check validates planning completeness.
3. **Sprint Start (Phase 4):** Scrum Master runs `*sprint-planning` to load all epics into sprint status.
4. **Per-Epic (Phase 4):** For each epic, TEA runs `*test-design` to create epic-specific test plan (e.g., `test-design-epic-1.md`, `test-design-epic-2.md`) with compliance-focused risk assessment.
5. **Per-Story (Phase 4):** For each story, TEA uses `*atdd`, `*automate`, `*test-review`, and `*trace`; Dev teams iterate on the findings.
6. **Release Gate:** TEA re-checks coverage, performs final quality audit with `*test-review`, and logs the final gate decision via `*trace` Phase 2, archiving artifacts for compliance.

</details>
