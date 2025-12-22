# Command Catalog

<details>
<summary><strong>Optional Playwright MCP Enhancements</strong></summary>

**Two Playwright MCP servers** (actively maintained, continuously updated):

- `playwright` - Browser automation (`npx @playwright/mcp@latest`)
- `playwright-test` - Test runner with failure analysis (`npx playwright run-test-mcp-server`)

**How MCP Enhances TEA Workflows**:

MCP provides additional capabilities on top of TEA's default AI-based approach:

1. `*test-design`:
   - Default: Analysis + documentation
   - **+ MCP**: Interactive UI discovery with `browser_navigate`, `browser_click`, `browser_snapshot`, behavior observation

   Benefit: Discover actual functionality, edge cases, undocumented features

2. `*atdd`, `*automate`:
   - Default: Infers selectors and interactions from requirements and knowledge fragments
   - **+ MCP**: Generates tests **then** verifies with `generator_setup_page`, `browser_*` tools, validates against live app

   Benefit: Accurate selectors from real DOM, verified behavior, refined test code

3. `*automate`:
   - Default: Pattern-based fixes from error messages + knowledge fragments
   - **+ MCP**: Pattern fixes **enhanced with** `browser_snapshot`, `browser_console_messages`, `browser_network_requests`, `browser_generate_locator`

   Benefit: Visual failure context, live DOM inspection, root cause discovery

**Config example**:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    },
    "playwright-test": {
      "command": "npx",
      "args": ["playwright", "run-test-mcp-server"]
    }
  }
}
```

**To disable**: Set `tea_use_mcp_enhancements: false` in `_bmad/bmm/config.yaml` OR remove MCPs from IDE config.

</details>

<details>
<summary><strong>Optional Playwright Utils Integration</strong></summary>

**Open-source Playwright utilities** from SEON Technologies (production-tested, npm published):

- **Package**: `@seontechnologies/playwright-utils` ([npm](https://www.npmjs.com/package/@seontechnologies/playwright-utils) | [GitHub](https://github.com/seontechnologies/playwright-utils))
- **Install**: `npm install -D @seontechnologies/playwright-utils`

**How Playwright Utils Enhances TEA Workflows**:

Provides fixture-based utilities that integrate into TEA's test generation and review workflows:

1. `*framework`:
   - Default: Basic Playwright scaffold
   - **+ playwright-utils**: Scaffold with api-request, network-recorder, auth-session, burn-in, network-error-monitor fixtures pre-configured

   Benefit: Production-ready patterns from day one

2. `*automate`, `*atdd`:
   - Default: Standard test patterns
   - **+ playwright-utils**: Tests using api-request (schema validation), intercept-network-call (mocking), recurse (polling), log (structured logging), file-utils (CSV/PDF)

   Benefit: Advanced patterns without boilerplate

3. `*test-review`:
   - Default: Reviews against core knowledge base (21 fragments)
   - **+ playwright-utils**: Reviews against expanded knowledge base (32 fragments: 21 core + 11 playwright-utils)

   Benefit: Reviews include fixture composition, auth patterns, network recording best practices

4. `*ci`:
   - Default: Standard CI workflow
   - **+ playwright-utils**: CI workflow with burn-in script (smart test selection) and network-error-monitor integration

   Benefit: Faster CI feedback, HTTP error detection

**Utilities available** (11 total): api-request, network-recorder, auth-session, intercept-network-call, recurse, log, file-utils, burn-in, network-error-monitor, fixtures-composition

**Enable during BMAD installation** by answering "Yes" when prompted, or manually set `tea_use_playwright_utils: true` in `_bmad/bmm/config.yaml`.

**To disable**: Set `tea_use_playwright_utils: false` in `_bmad/bmm/config.yaml`.

</details>

<br></br>

| Command        | Workflow README                                   | Primary Outputs                                                                               | Notes                                                | With Playwright MCP Enhancements                                                                             |
| -------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `*framework`   | [📖](../workflows/testarch/framework/README.md)   | Playwright/Cypress scaffold, `.env.example`, `.nvmrc`, sample specs                           | Use when no production-ready harness exists          | -                                                                                                            |
| `*ci`          | [📖](../workflows/testarch/ci/README.md)          | CI workflow, selective test scripts, secrets checklist                                        | Platform-aware (GitHub Actions default)              | -                                                                                                            |
| `*test-design` | [📖](../workflows/testarch/test-design/README.md) | Combined risk assessment, mitigation plan, and coverage strategy                              | Risk scoring + optional exploratory mode             | **+ Exploratory**: Interactive UI discovery with browser automation (uncover actual functionality)           |
| `*atdd`        | [📖](../workflows/testarch/atdd/README.md)        | Failing acceptance tests + implementation checklist                                           | TDD red phase + optional recording mode              | **+ Recording**: AI generation verified with live browser (accurate selectors from real DOM)                 |
| `*automate`    | [📖](../workflows/testarch/automate/README.md)    | Prioritized specs, fixtures, README/script updates, DoD summary                               | Optional healing/recording, avoid duplicate coverage | **+ Healing**: Pattern fixes enhanced with visual debugging + **+ Recording**: AI verified with live browser |
| `*test-review` | [📖](../workflows/testarch/test-review/README.md) | Test quality review report with 0-100 score, violations, fixes                                | Reviews tests against knowledge base patterns        | -                                                                                                            |
| `*nfr-assess`  | [📖](../workflows/testarch/nfr-assess/README.md)  | NFR assessment report with actions                                                            | Focus on security/performance/reliability            | -                                                                                                            |
| `*trace`       | [📖](../workflows/testarch/trace/README.md)       | Phase 1: Coverage matrix, recommendations. Phase 2: Gate decision (PASS/CONCERNS/FAIL/WAIVED) | Two-phase workflow: traceability + gate decision     | -                                                                                                            |

**📖** = Click to view detailed workflow documentation
