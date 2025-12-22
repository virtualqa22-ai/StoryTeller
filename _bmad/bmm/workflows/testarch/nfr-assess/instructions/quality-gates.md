# Quality Gates

## Release Blocker (FAIL)

- Critical NFR has FAIL status (security, reliability)
- Performance failure affects user experience severely
- Do not release until FAIL is resolved

## PR Blocker (HIGH CONCERNS)

- High-priority NFR has FAIL status
- Multiple CONCERNS exist
- Block PR merge until addressed

## Warning (CONCERNS)

- Any NFR has CONCERNS status
- Evidence is missing or incomplete
- Address before next release

## Pass (PASS)

- All NFRs have PASS status
- No blockers or concerns
- Ready for release

---
