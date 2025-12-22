# Principle

Treat expected failures explicitly: intercept network errors, assert UI fallbacks (error messages visible, retries triggered), and use scoped exception handling to ignore known errors while catching regressions. Test retry/backoff logic by forcing sequential failures (500 → timeout → success) and validate telemetry logging. Log captured errors with context (request payload, user/session) but redact secrets to keep artifacts safe for sharing.
