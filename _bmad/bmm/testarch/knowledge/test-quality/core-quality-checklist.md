# Core Quality Checklist

Every test must pass these criteria:

- [ ] **No Hard Waits** - Use `waitForResponse`, `waitForLoadState`, or element state (not `waitForTimeout`)
- [ ] **No Conditionals** - Tests execute the same path every time (no if/else, try/catch for flow control)
- [ ] **< 300 Lines** - Keep tests focused; split large tests or extract setup to fixtures
- [ ] **< 1.5 Minutes** - Optimize with API setup, parallel operations, and shared auth
- [ ] **Self-Cleaning** - Use fixtures with auto-cleanup or explicit `afterEach()` teardown
- [ ] **Explicit Assertions** - Keep `expect()` calls in test bodies, not hidden in helpers
- [ ] **Unique Data** - Use `faker` for dynamic data; never hardcode IDs or emails
- [ ] **Parallel-Safe** - Tests don't share state; run successfully with `--workers=4`

_Source: Murat quality checklist, Definition of Done requirements (lines 370-381, 406-422)._
