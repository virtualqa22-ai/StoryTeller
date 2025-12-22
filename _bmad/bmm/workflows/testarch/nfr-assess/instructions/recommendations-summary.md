# Recommendations Summary

- **Release Blocker:** None ✅
- **High Priority:** 1 (Enforce MFA before release)
- **Medium Priority:** 1 (Migrate existing users to MFA)
- **Next Steps:** Address HIGH priority item, then proceed to gate workflow

```

---

# Validation Checklist

Before completing this workflow, verify:

- ✅ All NFR categories assessed (performance, security, reliability, maintainability, custom)
- ✅ Thresholds defined or marked as UNKNOWN
- ✅ Evidence gathered for each NFR (or marked as MISSING)
- ✅ Status classified deterministically (PASS/CONCERNS/FAIL)
- ✅ No thresholds were guessed (marked as CONCERNS if unknown)
- ✅ Quick wins identified for CONCERNS/FAIL
- ✅ Recommended actions are specific and actionable
- ✅ Evidence gaps documented with owners and deadlines
- ✅ NFR assessment report generated and saved
- ✅ Gate YAML snippet generated (if enabled)
- ✅ Evidence checklist generated (if enabled)

---

# Notes

- **Never Guess Thresholds:** If a threshold is unknown, mark as CONCERNS and recommend defining it
- **Evidence-Based:** Every assessment must be backed by evidence (tests, metrics, logs, CI results)
- **Deterministic Rules:** Use consistent PASS/CONCERNS/FAIL classification based on evidence
- **Actionable Recommendations:** Provide specific steps, not generic advice
- **Gate Integration:** Generate YAML snippets that can be consumed by CI/CD pipelines

---

# Troubleshooting

## "NFR thresholds not defined"
- Check tech-spec.md for NFR requirements
- Check PRD.md for product-level SLAs
- Check story file for feature-specific requirements
- If thresholds truly unknown, mark as CONCERNS and recommend defining them

## "No evidence found"
- Check evidence directories (test-results, metrics, logs)
- Check CI/CD pipeline for test results
- If evidence truly missing, mark NFR as "NO EVIDENCE" and recommend generating it

## "CONCERNS status but no threshold exceeded"
- CONCERNS is correct when threshold is UNKNOWN or evidence is MISSING/INCOMPLETE
- CONCERNS is also correct when evidence is close to threshold (within 10%)
- Document why CONCERNS was assigned

## "FAIL status blocks release"
- This is intentional - FAIL means critical NFR not met
- Recommend remediation actions with specific steps
- Re-run assessment after remediation

---

# Related Workflows

- **testarch-test-design** - Define NFR requirements and test plan
- **testarch-framework** - Set up performance/security testing frameworks
- **testarch-ci** - Configure CI/CD for NFR validation
- **testarch-gate** - Use NFR assessment as input for quality gate decisions
- **testarch-test-review** - Review test quality (maintainability NFR)

---

<!-- Powered by BMAD-CORE™ -->
```
