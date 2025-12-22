# Configuration Checklist

**Before deploying tests, verify**:

- [ ] Environment config map with fail-fast validation
- [ ] Standardized timeouts (action 15s, navigation 30s, expect 10s, test 60s)
- [ ] Artifact storage at `test-results/` and `playwright-report/`
- [ ] HTML + JUnit reporters configured
- [ ] `.env.example`, `.nvmrc`, browser versions committed
- [ ] Parallelization configured (workers, sharding)
- [ ] Projects defined for cross-browser/device testing (if needed)
- [ ] CI uploads artifacts on failure with 30-day retention

_Source: Playwright book repo, SEON configuration example, Murat testing philosophy (lines 216-271)._
