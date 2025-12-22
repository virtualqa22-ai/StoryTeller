# CI Configuration Checklist

Before deploying your CI pipeline, verify:

- [ ] **Caching strategy**: node_modules, npm cache, browser binaries cached
- [ ] **Timeout budgets**: Each job has reasonable timeout (10-30 min)
- [ ] **Artifact retention**: 30 days for reports, 7 days for failure artifacts
- [ ] **Parallelization**: Matrix strategy uses fail-fast: false
- [ ] **Burn-in enabled**: Changed specs run 5-10x before merge
- [ ] **wait-on app startup**: CI waits for app (wait-on: '<http://localhost:3000>')
- [ ] **Secrets documented**: README lists required secrets (API keys, tokens)
- [ ] **Local parity**: CI scripts runnable locally (npm run test:ci)
