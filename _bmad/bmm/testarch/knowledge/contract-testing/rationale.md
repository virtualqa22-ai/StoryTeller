# Rationale

Traditional integration testing requires running both consumer and provider simultaneously, creating slow, flaky tests with complex setup. Contract testing decouples services: consumers define expectations (pact files), providers verify against those expectations independently. This enables parallel development, catches breaking changes early, and documents API behavior as executable specifications. Pair contract tests with API smoke tests to validate data mapping and UI rendering in tandem.
