# Troubleshooting

## AI Agents Lack Codebase Understanding

**Symptoms:**

- Suggestions don't align with existing patterns
- Ignores available components
- Doesn't reference existing code

**Solution:**

1. Run `document-project` with Deep scan
2. Verify `docs/index.md` exists
3. Check documentation completeness
4. Run deep-dive on specific areas if needed

## Have Documentation But Agents Can't Find It

**Symptoms:**

- README.md, ARCHITECTURE.md exist
- AI agents ask questions already answered
- No `docs/index.md` file

**Solution:**

- **Quick fix:** Run `index-docs` task (2-5min)
- **Comprehensive:** Run `document-project` workflow (10-30min)

## Integration Points Unclear

**Symptoms:**

- Not sure how to connect new code to existing
- Unsure which files to modify

**Solution:**

1. Ensure `document-project` captured existing architecture
2. Check story files created by `create-story` - should include integration context
3. In tech-spec/architecture - explicitly document:
   - Which existing modules to modify
   - What APIs/services to integrate with
   - Data flow between new and existing code
4. Review architecture document for integration guidance

## Existing Tests Breaking

**Symptoms:**

- Regression test failures
- Previously working functionality broken

**Solution:**

1. Review changes against existing patterns
2. Verify API contracts unchanged (unless intentionally versioned)
3. Run `test-review` workflow (TEA agent)
4. Add regression testing to DoD
5. Consider feature flags for gradual rollout

## Inconsistent Patterns Being Introduced

**Symptoms:**

- New code style doesn't match existing
- Different architectural approach

**Solution:**

1. Check convention detection (Quick Spec Flow should detect patterns)
2. Review documentation - ensure `document-project` captured patterns
3. Use `create-story` workflow - it loads context from existing documentation
4. Add to code-review checklist: pattern adherence, convention consistency
5. Run retrospective to identify deviations early

---
