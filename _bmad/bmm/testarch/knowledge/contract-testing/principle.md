# Principle

Contract testing validates API contracts between consumer and provider services without requiring integrated end-to-end tests. Store consumer contracts alongside integration specs, version contracts semantically, and publish on every CI run. Provider verification before merge surfaces breaking changes immediately, while explicit fallback behavior (timeouts, retries, error payloads) captures resilience guarantees in contracts.
