# Notes for TEA Agent

- **automate is flexible:** Can work with or without BMad artifacts (story, tech-spec, PRD are OPTIONAL)
- **Standalone mode is powerful:** Analyze any codebase and generate tests independently
- **Auto-discover mode:** Scan codebase for features needing tests when no targets specified
- **Framework is the ONLY hard requirement:** HALT if framework config missing, otherwise proceed
- **Avoid duplicate coverage:** E2E for critical paths only, API/Component for variations
- **Priority tagging enables selective execution:** P0 tests run on every commit, P1 on PR, P2 nightly
- **Network-first pattern prevents race conditions:** Route interception BEFORE navigation
- **No page objects:** Keep tests simple, direct, and maintainable
- **Use knowledge base:** Load relevant fragments (test-levels, test-priorities, fixture-architecture, data-factories, healing patterns) for guidance
- **Deterministic tests only:** No hard waits, no conditional flow, no flaky patterns allowed
- **Optional healing:** auto_heal_failures disabled by default (opt-in for automatic test healing)
- **Graceful degradation:** Healing works without Playwright MCP (pattern-based fallback)
- **Unfixable tests handled:** Mark with test.fixme() and detailed comments (not silently broken)
