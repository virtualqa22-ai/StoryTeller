# Waiver Management

**When to use waivers:**

- Time-boxed MVP releases (known gaps, follow-up planned)
- Low-risk P1 gaps with mitigation (manual testing, monitoring)
- Technical debt acknowledged by product/engineering leadership
- External dependencies blocking test automation

**Waiver approval process:**

1. Document gap and risk in gate decision
2. Propose mitigation plan (manual testing, follow-up stories, monitoring)
3. Request approval from stakeholder (EM, PM, QA lead)
4. Link approval evidence (email, chat thread, meeting notes)
5. Add waiver to gate decision document
6. Create follow-up stories to close gaps

**Waiver does NOT apply to:**

- P0 gaps (always blocking)
- Critical security issues (always blocking)
- Critical NFR failures (performance, data integrity)

---
