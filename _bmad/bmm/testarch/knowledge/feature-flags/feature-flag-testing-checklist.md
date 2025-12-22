# Feature Flag Testing Checklist

Before merging flag-related code, verify:

- [ ] **Both states tested**: Enabled AND disabled variations covered
- [ ] **Cleanup automated**: afterEach removes targeting (no manual cleanup)
- [ ] **Unique test data**: Test users don't collide with production
- [ ] **Telemetry validated**: Analytics events fire for both variations
- [ ] **Error handling**: Graceful fallback when flag service unavailable
- [ ] **Flag metadata**: Owner, dates, dependencies documented in registry
- [ ] **Rollback plan**: Clear steps to disable flag in production
- [ ] **Expiry date set**: Removal date defined (or marked permanent)
