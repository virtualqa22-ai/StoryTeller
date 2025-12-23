# Implementation Issues

## Problem: Existing tests breaking (Brownfield)

**Symptoms:**

- Regression test failures
- Previously working functionality broken
- Integration tests failing

**Solution:**

1. **Review changes against existing patterns**:
   - Check if new code follows existing conventions
   - Verify API contracts unchanged (unless intentionally versioned)
2. **Run test-review workflow** (TEA agent):
   - Analyzes test coverage
   - Identifies regression risks
   - Suggests fixes
3. **Add regression testing to DoD**:
   - All existing tests must pass
   - Add integration tests for new code
4. **Consider feature flags** for gradual rollout

## Problem: Story takes much longer than estimated

**Symptoms:**

- Story estimated 4 hours, took 12 hours
- Acceptance criteria harder than expected
- Hidden complexity discovered

**Solution:**
**This is normal!** Estimates are estimates. To handle:

1. **Continue until DoD met** - Don't compromise quality
2. **Document learnings in retrospective**:
   - What caused the overrun?
   - What should we watch for next time?
3. **Consider splitting story** if it's truly two stories
4. **Adjust future estimates** based on this data

**Don't stress about estimate accuracy** - use them for learning, not judgment.

## Problem: Integration points unclear

**Symptoms:**

- Not sure how to connect new code to existing
- Unsure which files to modify
- Multiple possible integration approaches

**Solution:**

1. **For brownfield**:
   - Ensure document-project captured existing architecture
   - Review architecture docs before implementing
2. **Check story file** - Should document integration points
3. **In tech-spec/architecture** - Explicitly document:
   - Which existing modules to modify
   - What APIs/services to integrate with
   - Data flow between new and existing code
4. **Run integration-planning workflow** (Level 3-4):
   - Architect agent creates integration strategy

## Problem: Inconsistent patterns being introduced

**Symptoms:**

- New code style doesn't match existing
- Different architectural approach
- Not following team conventions

**Solution:**

1. **Check convention detection** (Quick Spec Flow):
   - Should detect existing patterns
   - Asks for confirmation before proceeding
2. **Review documentation** - Ensure document-project captured patterns
3. **Use comprehensive story files** - Include pattern guidance in story
4. **Add to code-review checklist**:
   - Pattern adherence
   - Convention consistency
   - Style matching
5. **Run retrospective** to identify pattern deviations early

---
