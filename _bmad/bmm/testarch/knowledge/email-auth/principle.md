# Principle

Email-based authentication (magic links, one-time codes, passwordless login) requires specialized testing with email capture services like Mailosaur or Ethereal. Extract magic links via HTML parsing or use built-in link extraction, preserve browser storage (local/session/cookies) when processing links, cache email payloads to avoid exhausting inbox quotas, and cover negative cases (expired links, reused links, multiple rapid requests). Log email IDs and links for troubleshooting, but scrub PII before committing artifacts.
