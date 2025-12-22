# Deterministic Assessment Rules

## PASS Rules

- Evidence exists
- Evidence meets or exceeds threshold
- No concerns flagged
- Quality is acceptable

**Example:**

```markdown
NFR: Response Time p95
Threshold: 500ms
Evidence: Load test result shows 350ms p95
Status: PASS ✅
```

---

## CONCERNS Rules

- Threshold is UNKNOWN
- Evidence is MISSING or INCOMPLETE
- Evidence is close to threshold (within 10%)
- Evidence shows intermittent issues
- Quality is marginal

**Example:**

```markdown
NFR: Response Time p95
Threshold: 500ms
Evidence: Load test result shows 480ms p95 (96% of threshold)
Status: CONCERNS ⚠️
Recommendation: Optimize before production - very close to threshold
```

---

## FAIL Rules

- Evidence exists BUT does not meet threshold
- Critical evidence is MISSING
- Evidence shows consistent failures
- Quality is unacceptable

**Example:**

```markdown
NFR: Response Time p95
Threshold: 500ms
Evidence: Load test result shows 750ms p95 (150% of threshold)
Status: FAIL ❌
Recommendation: BLOCKER - optimize performance before release
```

---
