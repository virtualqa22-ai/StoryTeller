# Email Authentication Testing Checklist

Before implementing email auth tests, verify:

- [ ] **Email service**: Mailosaur/Ethereal/MailHog configured with API keys
- [ ] **Link extraction**: Use built-in parsing (html.links[0].href) over regex
- [ ] **State preservation**: localStorage/session/cookies saved and restored
- [ ] **Session caching**: cypress-data-session or storageState prevents redundant emails
- [ ] **Negative flows**: Expired, invalid, reused, rapid requests tested
- [ ] **Quota awareness**: One email per run (not per test)
- [ ] **PII scrubbing**: Email IDs logged for debug, but scrubbed from artifacts
- [ ] **Timeout handling**: 30 second email retrieval timeout configured
