# Visual Debugging Checklist

Before deploying tests to CI, ensure:

- [ ] **Artifact configuration**: `trace: 'on-first-retry'`, `screenshot: 'only-on-failure'`, `video: 'retain-on-failure'`
- [ ] **CI artifact upload**: GitHub Actions/GitLab CI configured to upload `test-results/` and `playwright-report/`
- [ ] **HAR recording**: Set up for flaky API tests (record once, replay deterministically)
- [ ] **Custom debug fixtures**: Console logs + network summary captured on failure
- [ ] **Accessibility integration**: axe-core violations visible in trace viewer
- [ ] **Trace viewer docs**: README explains how to open traces locally (`npx playwright show-trace`)
- [ ] **Inspector workflow**: Document `--debug` flag for interactive debugging
- [ ] **Storage optimization**: Artifacts deleted after 30 days (CI retention policy)
