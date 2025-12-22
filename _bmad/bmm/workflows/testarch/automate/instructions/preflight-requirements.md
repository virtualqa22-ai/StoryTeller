# Preflight Requirements

**Flexible:** This workflow can run with minimal prerequisites. Only HALT if framework is completely missing.

## Required (Always)

- ✅ Framework scaffolding configured (run `framework` workflow if missing)
- ✅ Test framework configuration available (playwright.config.ts or cypress.config.ts)

## Optional (BMad-Integrated Mode)

- Story markdown with acceptance criteria (enhances coverage targeting)
- Tech spec or PRD (provides architectural context)
- Test design document (provides risk/priority context)

## Optional (Standalone Mode)

- Source code to analyze (feature implementation)
- Existing tests (for gap analysis)

**If framework is missing:** HALT with message: "Framework scaffolding required. Run `bmad tea *framework` first."

---
