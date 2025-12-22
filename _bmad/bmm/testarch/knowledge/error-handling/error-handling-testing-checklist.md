# Error Handling Testing Checklist

Before shipping error handling code, verify:

- [ ] **Scoped exception handling**: Only ignore documented errors (NetworkError, specific codes)
- [ ] **Rethrow unexpected**: Unknown errors fail tests (catch regressions)
- [ ] **Error UI tested**: User sees error messages for all error states
- [ ] **Retry logic validated**: Sequential failures test backoff and max attempts
- [ ] **Telemetry verified**: Errors logged with context (endpoint, status, user)
- [ ] **Secret redaction**: Logs don't contain passwords, tokens, PII
- [ ] **Graceful degradation**: Critical services down, app shows fallback UI
- [ ] **Non-critical failures**: Analytics/tracking failures don't block app
