# Rationale

Tests fail for two reasons: genuine bugs or poor error handling in the test itself. Without explicit error handling patterns, tests become noisy (uncaught exceptions cause false failures) or silent (swallowing all errors hides real bugs). Scoped exception handling (Cypress.on('uncaught:exception'), page.on('pageerror')) allows tests to ignore documented, expected errors while surfacing unexpected ones. Resilience testing (retry logic, graceful degradation) ensures applications handle failures gracefully in production.
