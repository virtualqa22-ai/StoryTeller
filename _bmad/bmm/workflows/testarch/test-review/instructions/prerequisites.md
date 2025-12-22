# Prerequisites

**Required:**

- Test file(s) to review (auto-discovered or explicitly provided)
- Test framework configuration (playwright.config.ts, jest.config.js, etc.)

**Recommended:**

- Story file with acceptance criteria (for context)
- Test design document (for priority context)
- Knowledge base fragments available in tea-index.csv

**Halt Conditions:**

- If test file path is invalid or file doesn't exist, halt and request correction
- If test_dir is empty (no tests found), halt and notify user

---
